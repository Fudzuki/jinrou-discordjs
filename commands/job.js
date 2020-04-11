const { Command } = require('bot-framework');
const Sjobconfig = require('../json/Sjobconfig.json');
const Zjobconfig = require('../json/Zjobconfig.json');
const fs = require('fs');

module.exports = class extends Command {
  constructor(){
    super('job', { allowedIn: ['TextChannel'] })
  }
  async run(msg, lang, args, sendDeletable){
    if(args[1] === 'list'){
      msg.channel.send('```'+Sjobconfig.map(job => `${job.name}: ${job.membercount}`).join('\n')+'```');
      msg.channel.send('```'+Zjobconfig.map(job => `${job.name}: ${job.membercount}`).join('\n')+'```');
      return;
    }
    if(!msg.member.roles.cache.has('626705321443852298')) return msg.channel.send('管理者コマンドです');
    if(!args[1] || !args[2]) return msg.channel.send('引数が足りません');
    let search = Sjobconfig.find(job => job.name === args[1]);
    let search2 = Zjobconfig.find(job => job.name === args[1]);
    if(search){
      if(!isNaN(args[2])){
        search.membercount = args[2];
        msg.channel.send(`${args[1]}を${args[2]}に変更しました`);
        fs.writeFile('/app/json/Sjobconfig.json', JSON.stringify(Sjobconfig), function(err){if(err) console.log('error', err)});
      }else{
        msg.channel.send('これは数値ではありません');
      }
    }else if(search2){
      if(!isNaN(args[2])){
        search2.membercount = args[2];
        msg.channel.send(`${args[1]}を${args[2]}に変更しました`);
        fs.writeFile('/app/json/Zjobconfig.json', JSON.stringify(Zjobconfig), function(err){if(err) console.log('error', err)});
      }else{
        msg.channel.send('これは数値ではありません');
      }
    }else{
      msg.channel.send('そのような職業はありません');
    }
  }
}
