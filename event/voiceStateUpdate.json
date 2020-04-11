const data = require('../src/data');
const Zmember = require('../json/member.json');
const GameMaster = require('../json/GameMaster.json');
const fs = require('fs');
const Request = require("request");

module.exports = {
  async join(newMember, oldMember, client){
    let joined = 0;
    if(joined == 1) return joined = 0;
    let search = Zmember.find(u => u.id === newMember.id);
    if(!search && newMember.channelID === '646112323693445120'){
      if(GameMaster[0].people == 0){
        let category = client.channels.cache.find(c => c.id === '567637052443721728' && c.type == "category");
        let Grole = await newMember.guild.roles.create({data:{name:'人狼ゲーム参加者'}});
        let LivingRooms = await newMember.guild.channels.create('リビングルーム', {
          type: 'text',
          parent: category,
          permissionOverwrites: [{
            id: '542631266256945153',
            deny: ['VIEW_CHANNEL']
          }, {
            id: newMember.guild.id,
            deny: ['VIEW_CHANNEL']
          },{
            id: Grole.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          }]
        }).then(ch => {
          ch.createWebhook('文月', 'https://i.imgur.com/LsVc3qU.png').then(webhook => {
            GameMaster[0].webhooktoken = webhook.token;
            GameMaster[0].webhookid = webhook.id;
            fs.writeFile('./GameMaster.json', JSON.stringify(GameMaster), function(err){if(err) console.log('error', err)});
            let channelID = webhook.channelID;
            let token = webhook.token;
            let id = webhook.id;
            let options = {
              url: `https://discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`,
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({
                username: "文月",
                content: "おおさぶいでござる、今夜はかなり冷え込むのぉ\nそういえば近頃、夜になると人狼と呼ばれる怪物がでて人を食っちまうそうだ\nまぁ今の時代そんなうわさ話を信じるやつはおらんだろうがな！\nわはははははｗｗｗｗでござる。",
              })
            }
            Request.post(options, (error, responce, body) => {
                
            });
          })
          GameMaster[0].LivingRoom = ch.id;
        })
        GameMaster[0].Grole = Grole.id;
      }
      console.log('参加: ' + JSON.stringify(Zmember));
      newMember.member.roles.add(GameMaster[0].Grole);
      let category = client.channels.cache.find(c => c.id == "567637052443721728" && c.type == "category");
      let createCh = await newMember.guild.channels.create(`${newMember.member.user.username}の部屋`, {
        type: 'text',
        parent: category,
        permissionOverwrites: [{
          id: newMember.guild.id,
          deny: ['VIEW_CHANNEL']
        }, {
          id: newMember.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }]
      }).then(channel => {
        channel.send(`<@${newMember.id}>さんのお部屋はこちらです`);
        Zmember.push({
          'id': newMember.id,
          'ch': channel.id,
          'role': '参加',
          'count': Zmember.length+1
        })
        let options = {
          url: `https://discordapp.com/api/webhooks/${GameMaster[0].webhookid}/${GameMaster[0].webhooktoken}`,
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            username: "入退出",
            content: `${newMember.member.user.username}さんが参加しました`,
          })
        }
        Request.post(options, (error, responce, body) => {
                
        });
        GameMaster[0].people++;
        data.changeChName('646112323693445120', `人狼 | 参加者: ${GameMaster[0].people}人`);
        newMember.member.voice.setChannel(null);
        joined = 1;
      })
    }else{
      console.log('退出: ' + JSON.stringify(Zmember));
      if(search && newMember.channelID === '646112323693445120'){
        let channel = client.channels.cache.get(search.ch);
        channel.delete();
        delete search.id;
        delete search.ch;
        delete search.role;
        newMember.member.roles.remove(GameMaster[0].Grole);
        if(GameMaster[0].people == 1){
          let LivingRoom = client.channels.cache.get(GameMaster[0].LivingRoom);
          let Grole = oldMember.guild.roles.cache.get(GameMaster[0].Grole);
          if(Grole) Grole.delete();
          if(LivingRoom) LivingRoom.delete();
          GameMaster[0].LivingRoom = 0;
          GameMaster[0].Grole = 0;
        }
        console.log(`new: ${newMember.id}\nold: ${oldMember.id}`)
        GameMaster[0].people--;
        data.changeChName('646112323693445120', `人狼 | 参加者: ${GameMaster[0].people}人`);
        newMember.member.voice.setChannel(null);
        joined = 1;
      }
    } 
  }
}
