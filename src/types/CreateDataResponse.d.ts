import { CreateCompletionResponse } from "openai";

export interface CreateDataResponse extends CreateCompletionResponse {
  patientText?: string;
}
