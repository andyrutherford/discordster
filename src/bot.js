require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client();

client.on('ready', () => {
  console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) => {
  console.log(`[${message.author.tag.split('#')[0]}] ${message.content}`);
  if (message.content === 'hi bot') {
    message.channel.send('hi');
  }
});

client.login(process.env.DISCORD_TOKEN);
