let errsend2 = function(client, content){
  let search = client.channels.cache.get('691265494208217098');
  search.send(content);
}

module.exports = {
  async errsend(client, content){
    let search = client.channels.cache.get('691265494208217098');
    search.send(content);
  },
  async changeChName(client, id, name){
    console.log(client)
    let search = client.channels.cache.get(id);
    if(search){
      search.setName(name);
    }else{
      errsend2(client, 'チャンネルが見つかりませんでした');
    }
  }
}
