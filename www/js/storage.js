/*
*
* (C) obook 2020-2024
*
*/

import { QuestionObj, GetCurrentQuestion, SetCurrentQuestion} from "./question.js";
export { StorageExists, StoreQuestion, GetQuestion, RecallQuestion, StorageClear};

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

  console.log("StorageExists "+number+" :False");
return(false);
}

/* Store as Qn key, where n is a number >= 1
*/
function StoreQuestion(number) {
  let key = "Q"+ number;
  let questionobj = GetCurrentQuestion();

  if(questionobj)
    localStorage.setItem(key, JSON.stringify(questionobj));

    // Test StorageWalk();
}

function RecallQuestion(number) {
  
  let questionobj = GetQuestion(number);
  SetCurrentQuestion(questionobj);

return(true);
}

function GetQuestion(number) {
  
  if ( !StorageExists(number))
    return false;

  let key = "Q"+ number;
  let questionobj = Object.create(QuestionObj);
  questionobj = JSON.parse(localStorage.getItem(key));

  if(!questionobj.text)
    return(null);

return(questionobj);
}

////////////// Projet ...

function StorageWalk() {
let max = StorageMax();
let questionobj = Object.create(Question);

  for (let number = 1; number < max; number++) {
    let questionobj = number.create(Question);
    let key = "Q"+ index;
    questionobj = JSON.parse(localStorage.getItem(key));
    console.log("Walk-> Get "+number+"="+questionobj.text)
  }
 }