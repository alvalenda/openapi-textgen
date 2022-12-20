const { Configuration, OpenAIApi } = require("openai");
const { initialText } = require("./initial-text");

const fs = require("fs");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generate() {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt:
      "Tópico: Traduzir do inglês para o português do Brasil. Substituir Heather por Hérica e Shadowbrooke por RioNegro\n" +
      initialText,
    temperature: 0.8,
    max_tokens: 3200,
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  });

  const data = response.data;
  const texto =
    initialText + data.choices.reduce((acc, choice) => acc + choice.text, "");

  console.log(data.choices);
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

/*  **********************************************************************************
                                    Lista de models disponíveis:
                                    text-davinci-003
                                    text-davinci-002
                                    text-davinci-001
                                    text-davinci-001
                                    text-curie-001
                                    text-babbage-001
                                    text-ada-001
    **********************************************************************************  */
