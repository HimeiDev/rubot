// Dependencies
const discord = require('discord.js');
const ytdl = require('ytdl-core');
const superagent = require("superagent");
const bot = new discord.Client({disableEveryone: true});
const config = require('./config.json');

// Startup of the bot
bot.on("ready", async () => {
  console.log(`ok im online on ${bot.guilds.size} servers`);
  bot.user.setActivity(`with ruby ^-^`, {type: "STREAMING"});
  
  let activeNumber = 0;
  
  setInterval(function() {
    if (activeNumber === 0) {
      bot.user.setActivity(`cute stuff oki`, {type: "WATCHING"});
      activeNumber = 1;
    } else if (activeNumber === 1) {
      bot.user.setActivity(`to cute loli asmr`, {type: "LISTENING"});
      activeNumber = 0;
    } else if (activeNumber === 2) {
      bot.user.setActivity(`with Ruby and Akemi ^-^`, {type: "STREAMING"});
      activeNumber = 1;
    } else if (activeNumber === 3) {
      bot.user.setActivity(`with ${bot.users.size} cuties~!`, {type: "PLAYING"});
      activeNumber = 0;
    }
  }, 10 * 1000); // 1000 defines MS, 3 is the amount of seconds that will be converted in MS
  
});

// Commands and other parameters
bot.on("message", async message => {
  const prefix = config.prefix;

  if(message.author.bot) return; // Ignores bots
  if(message.channel.type === "dm") return; // Ignores DMs
  let messageArray = message.content.split(" "); 
  let cmd = messageArray[0];
  let args = messageArray.slice(1); 
  if (!message.content.startsWith(prefix)) return; // Prevents users from using commands with similar prefixes

  if(cmd === `${prefix}test`){
    message.channel.send('crist is gay lol');
  }
  if(cmd === `${prefix}help`){
    let embed = new discord.RichEmbed()
    .setColor("ff0000")
    .addField("Commands List (8):", "`>test`, `>help`, `>botinfo`, `>suggest`, `>play`, `>leave`, `>repo`, `>hug`");
    message.channel.send(embed);
  }
  if(cmd === `${prefix}botinfo`){
  let embed = new discord.RichEmbed()
    .setTitle("Bot Info")
    .setColor("ff0000")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Name", `${bot.user.username}`)
    .addField("Version", `0.0.5 Alpha`)
    .addField("Developed by", `<@306104099185623042> & <@330863976504229899>`)
    .addField("Created on", "28th of October 2018");
  message.channel.send(embed);
  }
  if(cmd === `${prefix}suggest`){
    let suggestiontext = args.slice(0).join(" ");
    if (!suggestiontext) return message.channel.send(`Please enter a valid suggestion following the command!`);
    let suggestion = new discord.RichEmbed()
    .setTitle(`${message.author.username} with ID ${message.author.id}`)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor("ff0000")
    .setDescription(`${suggestiontext}`);
bot.guilds.get("496990452369588224").channels.get("506885418512285699").send(suggestion);
    message.reply(`tysm for your suggestion~!`);
}
  if(cmd === `${prefix}play`){
   if (!message.member.voiceChannel) return message.channel.send('You are not connected to a voice channel!');
    if (message.guild.me.voiceChannel) return message.channel.send('I am already connected to a voice channel!');
    if (!args[0]) return message.channel.send('You must give me a url to the song you would like to listen to!');
    let validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send('This URL is invalid!');
    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));
    message.channel.send(`Now Playing: ${info.title}`);
 }
  if(cmd === `${prefix}leave`){
  if (!message.member.voiceChannel) return message.channel.send('You are not connected to a voice channel!');
    if (!message.guild.me.voiceChannel) return message.channel.send('I am not connected to a voice channel, use `>play <URL>` to play something!');
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('You are not connected to the same voice channel!');
    message.guild.me.voiceChannel.leave();
    message.channel.send('bai...~');
  }
  if(cmd === `${prefix}repo`){
  message.reply('here is my Github repository link: https://github.com/cristpz/rubot');
  }
  if(cmd === `${prefix}hug`) {
    let {body} = await superagent
  .get(`https://nekos.life/api/v2/img/hug`);

  let hugembed = new discord.RichEmbed()
  .setColor("ff0000")
  .setTitle(`${message.author.username} hugs ${message.mentions.members.first().user.username}`)
  .setImage(body.url);

  message.channel.send(hugembed);

     }

});

bot.login(process.env.BOT_TOKEN);
