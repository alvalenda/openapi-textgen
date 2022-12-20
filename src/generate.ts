import { Configuration, OpenAIApi } from "openai";
import { initialText, instructions } from "./utils/generate-text.util";
import { fileSetup } from "./utils/file-setup.util";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const configuration: Configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai: OpenAIApi = new OpenAIApi(configuration);

async function generate(): Promise<void> {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: instructions + initialText,
    temperature: 0.8,
    max_tokens: 3500,
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  });

  const data = response.data;
  const texto: string =
    initialText + data.choices.reduce((acc, choice) => acc + choice.text, "");

  console.log(data.choices);
  saveToTextFile(texto);
}

// função salva valor de variável em arquivo de text
function saveToTextFile(dataText: string): void {
  dataText = dataText.trim();
  try {
    fs.writeFileSync(fileSetup.dir + fileSetup.fileName, dataText);
    console.log(`Texto > ${fileSetup.dir + fileSetup.fileName}`);
  } catch (err) {
    console.error(err);
  }
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
