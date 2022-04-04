import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { fileDataReader, fileDownloader } from "../helper/file-handling";
import {
  getMinWortRedner,
  getMostSpeechRedner,
  getMostSecSpeechRedner,
} from "../helper/question-helper";
import { Speech } from "../interfaces/speech.interface";

const evaluate = async (req: Request, res: Response) => {
  let urlsArray: string[] = req.query.url as string[];
  let jsonResponseArray: Array<Speech[]> = [];

  for (let i = 0; i < urlsArray.length; i++) {
    let response: AxiosResponse = await axios.get(urlsArray[i]);
    let fileName = `file-${i}`;
    let filePath = `files/${fileName}.csv`;

    try {
      // download the file
      await fileDownloader(filePath, response.data);

      console.log("file downloaded");
      // read the downloaded file
      jsonResponseArray[i] = await fileDataReader(filePath);
    } catch (e: any) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  }
  // process the file to answer the questions
  // least wordy
  let minWortRedner: string = getMinWortRedner(jsonResponseArray)!;
  // most speeches in year
  let maxSpeechesRedner: string = getMostSpeechRedner(jsonResponseArray)!;
  // most speeches on
  let maxSecSpeechesRedner: string = getMostSecSpeechRedner(jsonResponseArray)!;
  // send the reponse
  return res.status(200).json({
    mostSpeeches: maxSpeechesRedner == "" ? null : maxSpeechesRedner,
    mostSecurity: maxSecSpeechesRedner == "" ? null : maxSecSpeechesRedner,
    leastWordy: minWortRedner == " " ? null : minWortRedner,
  });
};

export default { evaluate };
