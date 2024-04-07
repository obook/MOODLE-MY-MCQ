/*
*
* (C) obook 2020-2024
*
*/

import { QuestionObj, GetCurrentQuestion, SetCurrentQuestion} from "./question.js";
export { StorageExists, StorageClear};

function StorageClear() {
  localStorage.clear();
}

function StorageExists(number) {
  let key = "Q"+ number;

  try {
    if (localStorage.getItem(key))
      return(true);
  } catch (error) {
      console.log("StorageExists error trig !");
  }

  // console.log("StorageExists "+number+" :False");
return(false);
}
