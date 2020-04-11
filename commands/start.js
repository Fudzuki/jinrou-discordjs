const { Command } = require('bot-framework');
const Sjobconfig = require('../json/Sjobconfig.json');
const Zjobconfig = require('../json/Zjobconfig.json');
const GameMaster = require('../json/GameMaster.json');
const Zmember = require('../json/member.json');
const data = require('../src/data');
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

module.exports = class extends Command {
  constructor(){
    super('start', { allowedIn: ['TextChannel'] })
  }
  async run(msg, lang, args, client, sendDeletable){
    if(!msg.member.roles.cache.has('626705321443852298')) return msg.channel.send('管理者コマンドです');
    if(GameMaster.status == 1) return sendDeletable('ゲームは既に開始されています')
    GameMaster.status = 1;
    GameMaster.day = 1;
    let members = 0;
    Sjobconfig.forEach(job => {
      members = members + job.membercount;
    })
    Zjobconfig.forEach(job => {
      members = members + job.membercount;
    })
    if(GameMaster[0].people != members) return msg.channel.send(`人数が足りていません\n${GameMaster[0].people}/${members}人`);
    let membercounts = [];
    for(let a = 1;a <= GameMaster[0].people;a++){
      membercounts.push({
        'number': a
      })
    }
    console.log(membercounts);
    Sjobconfig.forEach(job => {
      if(job.membercount != 0){
        for(let a = 1;a <= job.membercount;a++){
          let whiles = 0;
          while(whiles == 0){
            let r = Math.floor(Math.random() * ( GameMaster[0].people ) + 1);
            let searchnumber = membercounts.find(c => c.number == r);
            let searchmember = Zmember.find(u => u.count == r);
            if(searchnumber && searchmember){
              let Zchannel = msg.guild.channels.cache.get(searchmember.ch);
              Zchannel.send(`<@${searchmember.id}>さんの職業は${job.name}です`)
              job.member.push({
                'id': searchmember.id,
                'death': 0
              }) 
              fs.writeFile('/app/json/Sjobconfig.json', JSON.stringify(Sjobconfig), function(err){if(err) console.log('error', err)});
              delete searchnumber.number;
              whiles = 1;
            }
          }
        }
      }
    })
    Zjobconfig.forEach(job => {
      if(job.membercount != 0){
        for(let a = 1;a <= job.membercount;a++){
          let whiles = 0;
          while(whiles == 0){
            let r = Math.floor(Math.random() * ( GameMaster[0].people ) + 1);
            let searchnumber = membercounts.find(c => c.number == r);
            let searchmember = Zmember.find(u => u.count == r);
            console.log(membercounts);
            console.log(r)
            if(searchnumber && searchmember){
              let Zchannel = msg.guild.channels.cache.get(searchmember.ch);
              Zchannel.send(`<@${searchmember.id}>さんの職業は${job.name}です`)
              job.member.push({
                'id': searchmember.id,
                'death': 0
              })
              fs.writeFile('/app/json/Zjobconfig.json', JSON.stringify(Zjobconfig), function(err){if(err) console.log('error', err)});
              delete searchnumber.number;
              whiles = 1;
            }
          }
        }
      }
    })
    console.log(client.channels.cache)
    data.changeChName(client, '693218574608892004', '0日目 夜');
    msg.channel.send('人狼ゲームスタート処理完了しました\nゲームを開始します');
  }
}
