import { Speech } from "../interfaces/speech.interface";

// get the author with the minimum speeches words

function getMinWortRedner(jsonResponseArray: Array<Speech[]>) {
  for (let index: number = 0; index < jsonResponseArray.length; index++) {
    const redners: any = jsonResponseArray[index].reduce(
      (redners: any, item: Speech) => {
        const wort = redners[item.Redner] || 0;
        redners[item.Redner] = wort + parseInt(item.Wörter);
        return redners;
      },
      {}
    );
    let totalWords: number[] = Object.values(redners);
    let minWortRedner: string =
      getKeyByValue(redners, getMin(totalWords)!) || "";
    return minWortRedner;
  }
}

// get the author with the most speeches in a year 2013
function getMostSpeechRedner(jsonResponseArray: Array<Speech[]>) {
  for (let index: number = 0; index < jsonResponseArray.length; index++) {
    const speeches = jsonResponseArray[index].reduce(
      (speeches: any, item: Speech) => {
        const speechNum: number = speeches[item.Redner] || 0;
        if (item.Datum.includes("2013")) {
          speeches[item.Redner] = speechNum + 1;
        }
        return speeches;
      },
      {}
    );
    let totalSpeeches: number[] = Object.values(speeches);
    let maxSpeechesRedner: string =
      getKeyByValue(speeches, getMax(totalSpeeches)!) || "";
    return maxSpeechesRedner;
  }
}

// get the author with the most speeches on Innere Sicherheit Topic
function getMostSecSpeechRedner(jsonResponseArray: Array<Speech[]>) {
  for (let index: number = 0; index < jsonResponseArray.length; index++) {
    const securitySpeeches = jsonResponseArray[index].reduce(
      (securitySpeeches: any, item: Speech) => {
        const speechNum: number = securitySpeeches[item.Redner] || 0;
        if (item.Thema == "Innere Sicherheit") {
          securitySpeeches[item.Redner] = speechNum + 1;
        }
        return securitySpeeches;
      },
      {}
    );
    let totalSecSpeeches: number[] = Object.values(securitySpeeches);
    let maxSecSpeechesRedner: string =
      getKeyByValue(securitySpeeches, getMax(totalSecSpeeches)!) || "";
    return maxSecSpeechesRedner;
  }
}

// helper function to get the key of the object by value
function getKeyByValue(object: any, value: number) {
  return Object.keys(object).find((key) => object[key] === value);
}

// helper fuction to get the minimum vlaue form the array
function getMin(arr: number[]) {
  if (arr.length == 0) {
    return null;
  }
  let min: number = Number.MAX_SAFE_INTEGER;
  let ambiguousFlag: boolean = false;
  arr.forEach((element) => {
    if (element < min) {
      min = element;
    } else if (element == min) {
      ambiguousFlag = true;
    }
  });
  return ambiguousFlag ? null : min;
}

// helper function to get the maximum value from the array
function getMax(arr: number[]) {
  if (arr.length == 0) {
    return null;
  }
  let max: number = Number.MIN_SAFE_INTEGER;
  let ambiguousFlag: boolean = false;
  arr.forEach((element) => {
    if (element > max) {
      max = element;
    } else if (element == max) {
      ambiguousFlag = true;
    }
  });
  return ambiguousFlag ? null : max;
}

export { getMinWortRedner, getMostSpeechRedner, getMostSecSpeechRedner };
