import * as dotenv from "dotenv";
import * as fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import { CreateDataResponse } from "types/CreateDataResponse";
import { fileSetup } from "./utils/file-setup.util";
import { instructions, patientText } from "./utils/generate-text.util";

dotenv.config();

const configuration: Configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi: OpenAIApi = new OpenAIApi(configuration);

async function generate(): Promise<void> {
  const response = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt: instructions + patientText,
    temperature: 0.8,
    max_tokens: 3500,
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  });

  const data: CreateDataResponse = response.data;

  data.patientText = patientText;

  const texto: string = JSON.stringify(
    data.choices.reduce((acc, choice) => acc + choice.text, ""),
    null,
    2
  );

  saveToTextFile(texto);
}

// função salva valor de variável em arquivo de text
function saveToTextFile(dataText: string): void {
  dataText = dataText.trim();
  try {
    fs.writeFileSync(fileSetup.dir + fileSetup.fileName, dataText);
    console.log(`Texto > ${fileSetup.dir + fileSetup.fileName}`);
  } catch (err: any) {
    err.message = "Erro ao salvar arquivo de texto.";
  }
}

generate().catch((err) => console.error(err.message));

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
