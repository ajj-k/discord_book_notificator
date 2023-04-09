import { Message, Client } from "discord.js";
import dotenv from "dotenv";
import { databaseInitialSettings } from "./db/db_settings";

dotenv.config();
databaseInitialSettings();
const profileModel = require("./model/profileSchema");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
})

client.once("ready", () => {
  console.log("Ready!");
  console.log(client.user?.tag);
})

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("!!!Ping")) {
    message.channel.send("Pong!");
  }

})

client.on("interactionCreate", async interaction => {
  const profileData = await profileModel.findOne({
    _id: interaction.user.id
  });
  if (!profileData) {
    const profile = await profileModel.create({
      _id: interaction.user.id,
      name: interaction.user.username,
      avatar: interaction.user.displayAvatarURL(),
    });
    profile.save();
    console.log("saved database:" + interaction.user.tag);
  }
  if (!interaction.isCommand()) return;
  
})

client.login(process.env.TOKEN);