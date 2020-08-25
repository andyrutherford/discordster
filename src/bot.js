require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});
const PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.username} has logged in.`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  console.log(`[${message.author.tag.split('#')[0]}] ${message.content}`);
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermissions('KICK_MEMBERS'))
        return message.reply(
          'You do not have permissions to use that command.'
        );
      if (args.length === 0) return message.reply('Please provide an ID.');

      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('I cannot do that.'));
      } else {
        message.channel.send('That member was not found.');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermissions('BAN_MEMBERS'))
        return message.reply(
          'You do not have permissions to use that command.'
        );
      if (args.length === 0) return message.reply('Please provide an ID.');
      try {
        await message.guild.members.ban(args[0]);
        message.channel.send('User was banned');
      } catch (error) {
        console.log(error);
        message.channel.send('An error occurred.');
      }
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '747656376515428455') {
    switch (name) {
      case '🍑':
        member.roles.add('747174926502650265');
        break;
      case '🍌':
        member.roles.add('747267025503969920');
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '747656376515428455') {
    switch (name) {
      case '🍑':
        member.roles.remove('747174926502650265');
        break;
      case '🍌':
        member.roles.remove('747267025503969920');
        break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
