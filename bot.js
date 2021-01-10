const Discord = require('discord.js');
const config = require('./config.json');
const express = require('express');
const { handleResponse } = require('./actions');
const client = new Discord.Client();


// If token is in environment variable or in config file
const TOKEN = process.env.TOKEN || config.TOKEN;
const COMMAND = /^!\w+/;

client.on('ready', () => {
	console.log('Bot is Ready...');
});

client.on('message', (msg) => {
	// Is a message not from the bot
	if (msg.author.id !== client.user.id && msg.content.match(COMMAND)) {
		const response = handleResponse(msg);
		if (!!response) {
			msg.reply(response);
		}
	}
});

client.login(TOKEN);

if (process.env.ISREP === 'true') {
    const PORT = process.env.PORT || 8080;
    const app = express();
    app.get('/', (req, res) => res.send('...'));
    app.listen(PORT);
}
