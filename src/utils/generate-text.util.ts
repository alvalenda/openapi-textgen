// this sets the instructions for openAI generation
export const instructions: string =
  "Tópico: Gerar um score que reflita a emoção da frase\n Emoções: frustrated, angry, tense, excited, delighted, happy, content, relaxed, calm, tired, bored, depressed\n Escala: 0.0 a 1.0\n Modelo: Circumplex model\n Formato: JSON{patientText: '', emotions: { emotion: value, emotion: value ... }}";

// This file is used to set the initial text of the editor.
export const patientText: string =
  "Te amo e não tem jeito, você me alucina. Te amo meu amor menina.";

/* 
frustrated, angry, tense, excited, delighted, happy, content, relaxed, calm, tired, bored, depressed
*/
