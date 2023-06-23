// Load config file
const config = require("./config.json");

const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Check executed times
const executedTimes = new Set();

// Main bot code
client.on("ready", () => {
	client.user.setActivity(config.activityStatus);
	console.log("Reminder bot is ready!");

	setInterval(() => {
		// Get current time
		const currentTime = new Date();

		// Format current time as "HH:mm"
		const currentFormattedTime = `${currentTime.getHours()}:${currentTime
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;

		// Check if current time is a reminder times
		for (let i = 0; i < config.servers.length; i++) {
			if (
				config.servers[i].reminderTimes.includes(currentFormattedTime) &&
				!executedTimes.has(currentFormattedTime)
			) {
				// Send message in updates channel
				client.channels.cache
					.get(config.servers[i].updateChannel)
					.send(
						config.servers[i].messages[
							Math.floor(Math.random() * config.servers[i].messages.length)
						]
					);

				// Reset executed times for next reminder
				executedTimes.add(currentFormattedTime);
			}
		}
	}, 1000);
	// Big thanks for CodeBlock for helping me to write this bot!
	// And of course all rights resrved to MaybeGal.
});

// Login to Discord using bot token
client.login(process.env.token);
