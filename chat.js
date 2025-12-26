const tmi = require('tmi.js');

const chat = document.getElementById("chat");
const lifetime = 15000;

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: ['CeiLciuZ']
});

client.connect();

client.on('connected', () => {
  console.log("CONNECTED TO TWITCH");
});

client.on('message', (channel, tags, message, self) => {
  if (self) return;

  const div = document.createElement('div');
	div.className = 'msg';
	div.innerHTML = `<span class="user">${tags['display-name']}:</span> ${message}`;
	chat.appendChild(div);

	setTimeout(() => div.remove(), lifetime);
});

