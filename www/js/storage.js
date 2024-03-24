/*
*
* (C) obook 2020-2024
*
*/

let Question = {
  text: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  feedback: ""
};

export { StorageExists, StoreQuestion, RecallQuestion, StorageClear};

function StorageClear() {
  localStorage.clear();
}

function StorageMax(current=1) {
var max = 1;

  try {
    max = localStorage.getItem('storage_max');
  } catch (error) {
    console.log("StorageMax:getItem failed");
  }

  if(current>max)
    max = current;

  localStorage.setItem('storage_max', max);

  return max;
}

function StorageExists(number) {
  var number_id = "storage_"+number+"_id";

  try {
    localStorage.getItem('number_id');
  } catch (error) {
    console.log("StorageExists "+number+" :False");
    return false;
  }

return(true);
}

function StoreQuestion(number) {
    var max = "storage_max";
    var prefix = "storage_"+number+"_";
    var number_id = prefix + "id";
    var question_key = prefix + "question";
    var answer1_key = prefix + " answer1";
    var answer2_key = prefix + " answer2";
    var answer3_key = prefix + " answer3";
    var answer4_key = prefix + " answer4";
    var feedback_key = prefix + " feedback";

    console.log("Set storage : "+question_key + "= test");

    var question = $("#id_question").val();
    var reponse1 = $("#id_reponse1").val();
    var reponse2 = $("#id_reponse2").val();
    var reponse3 = $("#id_reponse3").val();
    var reponse4 = $("#id_reponse4").val();
    var feedback = $("#id_feedback").val();

    StorageMax(number);

    localStorage.setItem(number_id, "set");
    localStorage.setItem(question_key, question);
    localStorage.setItem(answer1_key, reponse1);
    localStorage.setItem(answer2_key, reponse2);
    localStorage.setItem(answer3_key, reponse3);
    localStorage.setItem(answer4_key, reponse4);
    localStorage.setItem(feedback_key, feedback);
}

function RecallQuestion(number) {
  let question = Object.create(Question);
  question=GetQuestion(number);

  if (!question)
    return(false);

  $("#id_question").val(question.text);
  $("#id_reponse1").val(question.answer1);
  $("#id_reponse2").val(question.answer2);
  $("#id_reponse3").val(question.answer3);
  $("#id_reponse4").val(question.answer4);
  $("#id_feedback").val(question.feedback);
 
return(true);
}

function GetQuestion(number) {
  var prefix = "storage_"+number+"_";

  if ( !StorageExists(number))
    return null;

    let question = Object.create(Question);
    var question_key = prefix + "question";
    var answer1_key = prefix + " answer1";
    var answer2_key = prefix + " answer2";
    var answer3_key = prefix + " answer3";
    var answer4_key = prefix + " answer4";
    var feedback_key = prefix + " feedback"; 

    question.text = localStorage.getItem(question_key);
    question.answer1 = localStorage.getItem(answer1_key);
    question.answer2 = localStorage.getItem(answer2_key);
    question.answer3 = localStorage.getItem(answer3_key);
    question.answer4 = localStorage.getItem(answer4_key);
    question.feedback = localStorage.getItem(feedback_key);

return(question);
}
