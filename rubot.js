// Dependencies
const discord = require('discord.js');
const bot = new discord.Client({disableEveryone: true});
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
  let embed = new discord.RichEmbed()
    .setTitle("Bot Info")
    .setColor("ff0000")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Name", `${bot.user.username}`)
    .addField("Version", `0.0.1 Pre-Alpha`)
    .addField("Developed by", `<@306104099185623042> & <@330863976504229899>`)
    .addField("Created on", "28th of October 2018");
  message.channel.send(embed);
  }
  if(cmd === `${prefix}suggest`){
    let suggestiontext = args.slice(0).join(" ");
    if (!suggestiontext) return message.channel.send(`Please enter a valid suggestion following the command!`);
    let suggestion = new discord.RichEmbed()
    .setTitle(`${message.author}`)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor("ff0000")
    .setDescription(`${suggestiontext}`);
bot.guilds.get("496990452369588224").channels.get("506885418512285699").send(suggestion);
}

});

bot.login(process.env.BOT_TOKEN);
