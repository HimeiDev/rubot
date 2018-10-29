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

});

bot.login(config.token);
