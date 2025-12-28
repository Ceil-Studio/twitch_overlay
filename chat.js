const tmi = require('tmi.js');

const chat = document.getElementById('chat');

const client = new tmi.Client({
  connection: { secure: true, reconnect: true },
  channels: ['CeiLciuZ']
});

client.connect();

// Escape HTML (anti XSS)
function escapeHTML(str) {
  return str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');
}

function renderMessage(message, emotes) {
  // 1️⃣ escape le message
  const safeMessage = escapeHTML(message);

  if (!emotes) return safeMessage;

  let result = '';
  let lastIndex = 0;

  const emotePositions = [];

  for (const id in emotes) {
    emotes[id].forEach(pos => {
      const [start, end] = pos.split('-').map(Number);
      emotePositions.push({ id, start, end });
    });
  }

  emotePositions.sort((a, b) => a.start - b.start);

  emotePositions.forEach(emote => {
    result += safeMessage.substring(lastIndex, emote.start);

    result += `<img class="emote" src="https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0">`;

    lastIndex = emote.end + 1;
  });

  result += safeMessage.substring(lastIndex);

  return result;
}

client.on('message', (channel, tags, message, self) => {
  if (self) return;

  const div = document.createElement('div');
  div.className = 'message';

  const safeUser = escapeHTML(tags['display-name'] || 'user');
  const renderedMessage = renderMessage(message, tags.emotes);

  div.innerHTML = `<span class="user">${safeUser}:</span> ${renderedMessage}`;

  chat.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 20000);
});
