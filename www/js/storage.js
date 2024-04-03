/*
*
* (C) obook 2020-2024
*
*/

import { QuestionObj, GetCurrentQuestion, SetCurrentQuestion} from "./question.js";
export { StorageExists, StoreQuestion, RecallQuestion, StorageClear, ConfigObj, StorageConfig};

let ConfigObj = {
  category: "My bank category", /* Bank thema */
  format: "GIFT", /* GIFT or XML */ 
  questiononly: false, /* Print question only or not */
};

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
  
  if ( !StorageExists(number))
    return false;

  let key = "Q"+ number;
  let questionobj = Object.create(QuestionObj);
  questionobj = JSON.parse(localStorage.getItem(key));

  if(!questionobj.text)
    return(false);

  // console.log("RecallQuestion "+number);

  SetCurrentQuestion(questionobj);

return(true);
}

function StorageConfig(category=null) {
let key = "Conf";
let configobj = Object.create(ConfigObj);

 // save
  if(category) {
    configobj.category = category;
    localStorage.setItem(key, JSON.stringify(configobj));
    return configobj;
  }

  //recall
  configobj = JSON.parse(localStorage.getItem(key));

return(configobj);
}

/* A voir : gestion des erreurs */

function SetBankName(name)
{
  let key = "Conf";
  let configobj = Object.create(ConfigObj);
  configobj = JSON.parse(localStorage.getItem(key));
  configobj.category = name;
  localStorage.setItem(key, JSON.stringify(configobj));
}

function GetBankName()
{
  let key = "Conf";
  let configobj = Object.create(ConfigObj);
  configobj = JSON.parse(localStorage.getItem(key));
  if( configobj)
    return configobj.category;
return("My bank category");
}

////////////// Projet ...

function StorageMax() {
let i = 1;
while (StorageExists(i)) {
  i++;
  }
return(i);
}

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