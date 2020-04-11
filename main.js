const discord = require('discord.js');
const Request = require("request");
const client = new discord.Client();
const fs = require('fs');
const data = require('./src/data');
const dispatcher = require('bot-framework/dispatcher')
const Zmember = require('./json/member.json');
const GameMaster = require('./json/GameMaster.json');
const lang = require('./lang/en.json')
let prefix = 's!';

client.on('ready', () => {
  console.log('bot is ready!');
});

client.on('message', msg => {
  if(msg.bot || msg.system) return;
  dispatcher(msg, require('./lang/ja.json'), prefix, '460208854362357770', prefix, client)
});

let joined = 0;

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  require('./event/voiceStateUpdate.js').join(newMember, oldMember, client);
  fs.writeFile('./json/member.json', JSON.stringify(Zmember), function(err){if(err) console.log('error', err)});
  fs.writeFile('./json/GameMaster.json', JSON.stringify(GameMaster), function(err){if(err) console.log('error', err)});
})

client.login(process.env.DISCORD_BOT_TOKEN);
