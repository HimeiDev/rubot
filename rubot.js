// Dependencies
const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.json');

// Startup of the bot
bot.on("ready", async () => {
  console.log(`ok im online on ${bot.guilds.size} servers`);
  bot.user.setActivity(`Ruby is an epic gamer 😎`, {type: "STREAMING"});
});

// Commands and other parameters
bot.on("message", async message => {
  const prefix = config.prefix;

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}test`){
    message.channel.send('crist is gay lol');
  }
  if(cmd === `${prefix}botinfo`){
  let infoembed = new Discord.RichEmbed()
    .setTitle("Bot Info")
    .setColor("#ff0000")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Name", `${bot.user.username}`)
    .addField("Version", `${package.version}`)
    .addField("Developed by", `<@306104099185623042> & <@330863976504229899>`)
    .addField("Created on", "28th of October 2018");
  message.channel.send(infoembed)
  }

});

bot.login(process.env.BOT_TOKEN);
