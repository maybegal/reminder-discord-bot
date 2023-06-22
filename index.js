const config = require("./config.json");

const {
  Client,
  GatewayIntentBits,
  Message,
  TextChannel,
} = require("discord.js");
require("dotenv/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Send random message from the messages list
function sendRandomMessage() {
  return config.servers.ofekDigital.messages[
    Math.floor(Math.random() * config.servers.ofekDigital.messages.length)
  ];
}

// Check executed times
const executedTimes = new Set();

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
    if (
      config.servers.ofekDigital.reminderTimes.includes(currentFormattedTime) &&
      !executedTimes.has(currentFormattedTime)
    ) {
      // Send message in updates channel
      client.channels.cache
        .get(config.servers.ofekDigital.channelId)
        .send(sendRandomMessage());

      // Reset executed times for next reminder
      executedTimes.add(currentFormattedTime);
    }
  }, 1000);
  // Big thanks for CodeBlock for helping me to write this bot!
  // And of course all rights resrved to MaybeGal.
});

client.login(config.botToken);
