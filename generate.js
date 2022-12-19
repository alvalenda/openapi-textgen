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
      "Topic: História de um Personagem\nHistória em três setenças: Um ladino especializado em enfrentar usuários de magia que viveu até sua vida adulta sob lavagem cerebral de um culto religoso de Shar até ser liberto por sacerdotisas de Selune.",
    temperature: 0.8,
    max_tokens: 60,
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
  fs.writeFileSync("./public/texto.txt", dataText, (err) => {
    if (err) return console.log(err);
    console.log("Texto > ./public/texto.txt");
  });
}

generate();
