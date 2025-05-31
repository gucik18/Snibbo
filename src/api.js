import axios from "axios"
import { LANGUAGES_VERSIONS } from "./constants";

let API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston"
})

export let executeCode = async (sourceCode, language) => {
  let response = await API.post("/execute",{
      "language": language,
      "version":  LANGUAGES_VERSIONS[language],
      "files": [
        {
          "content": sourceCode
        }
      ],
  });
  return response.data;
}