const fs = require("fs");
const csv = require("csv-parser");
import { Speech } from "../interfaces/speech.interface";

const enum StreamEvents {
  DATA = "data",
  END = "end",
  ERROR = "error",
}

// helper for writing the file at a specific destination
const fileDownloader = async (path: string, data: any) => {
  try {
    await fs.promises.writeFile(path, data);
  } catch (e) {
    throw e;
  }
};

// helper for reading the downloaded CSV file
const fileDataReader = async (filePath: string): Promise<any> => {
  let speeches: Speech[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on(StreamEvents.DATA, function (row: any) {
        const speech: Speech = {
          Redner: row["Redner"].trim() as Speech["Redner"],
          Thema: row[" Thema"].trim() as Speech["Thema"],
          Datum: row[" Datum"].trim() as Speech["Datum"],
          Wörter: row[" Wörter"].trim() as Speech["Wörter"],
        };
        speeches.push(speech);
      })
      .on(StreamEvents.END, () => {
        resolve(speeches);
      })
      .on(StreamEvents.ERROR, (error: any) => {
        reject(error);
      });
  });
};

export { fileDownloader, fileDataReader };
