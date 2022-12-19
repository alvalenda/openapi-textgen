const { Configuration, OpenAIApi } = require("openai");

const fs = require("fs");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generate() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Tópico: História do vilão Deus Palha\n Deus Palha é um espírito da floresta que foi corrompido por ravenloft. Atualmente faz os habitantes do vilareijo Vale Dourado como raféns da sua vontade.\n Descrever detalhes.",
    temperature: 0.8,
    max_tokens: 3200,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });

  const data = response.data;
  const texto = data.choices.reduce(
    (acc, choice) => acc + " " + choice.text,
    ""
  );

  saveToTextFile(texto);
}

// função salva valor de variável em arquivo de text
function saveToTextFile(dataText) {
  dataText = dataText.trim();
  fs.writeFileSync(`./public/texto-${Date.now()}.txt`, dataText, (err) => {
    if (err) return console.log(err);
    console.log("Texto > ./public/texto.txt");
  });
}

generate();

/*
Lista de models disponíveis:
text-davinci-003
text-davinci-002
text-davinci-001
text-davinci-001
text-curie-001
text-babbage-001
text-ada-001
*/
