const { contextBridge } = require('electron');
const tmi = require('tmi.js');

console.log("PRELOAD LOADED");

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: ['CeiLciuZ']
});

client.on('connected', () => {
  console.log("TWITCH CONNECTED");
});

client.on('disconnected', (reason) => {
  console.log("TWITCH DISCONNECTED", reason);
});

client.connect();

contextBridge.exposeInMainWorld('twitch', {
  onMessage: (callback) => {
    client.on('message', (channel, tags, message, self) => {
      if (!self) {
        console.log("MSG:", tags['display-name'], message);
        callback({
          user: tags['display-name'],
          message
        });
      }
    });
  }
});

