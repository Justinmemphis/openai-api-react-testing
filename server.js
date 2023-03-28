const express = require('express');
const openAI = require('openai');

require('dotenv').config();

const bp = require('body-parser');

const path = require('path');

const app = express();
const port = 8000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/submit', (req, res) => {
	const prompt = req.query.prompt;

	openai.createCompletion({
		model: "Text-davinci-003",
		prompt: prompt,
		temperature: 0.4,
		max_tokens: 150,
		frequency_penalty: 0,
		presence_penalty: 0.6
	})
	.then((response) => {
		res.send(response.data.choices);
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
