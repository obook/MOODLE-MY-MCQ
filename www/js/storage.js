/*
*
* (C) obook 2020-2024
*
*/

let Question = {
  number: 0, /* >= 1 */
  format: "", /* GIFT ou XML */ 
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

function StorageExists(number) {
  let key = "Q"+ number;

  try {
    localStorage.getItem(key);
  } catch (error) {
    console.log("StorageExists "+number+" :False");
    return false;
  }

return(true);
}

/* Store as Qn key, where n is a number >= 1
*/
function StoreQuestion(number) {
  let key = "Q"+ number;
  let questionobj = Object.create(Question);
  
    questionobj.number = number;
    questionobj.format = $("#sliderOutput").val();
    questionobj.text = $("#id_question").val();
    questionobj.answer1 = $("#id_reponse1").val();
    questionobj.answer2 = $("#id_reponse2").val();
    questionobj.answer3 = $("#id_reponse3").val();
    questionobj.answer4 = $("#id_reponse4").val();
    questionobj.feedback = $("#id_feedback").val();

    if(questionobj.text)
      localStorage.setItem(key, JSON.stringify(questionobj));
}

function RecallQuestion(number) {
  
  if ( !StorageExists(number))
    return false;

  let key = "Q"+ number;
  let questionobj = Object.create(Question);
  questionobj = JSON.parse(localStorage.getItem(key));

  if(!questionobj.text)
    return(false);

  $("#id_question").val(questionobj.text);
  $("#id_reponse1").val(questionobj.answer1);
  $("#id_reponse2").val(questionobj.answer2);
  $("#id_reponse3").val(questionobj.answer3);
  $("#id_reponse4").val(questionobj.answer4);
  $("#id_feedback").val(questionobj.feedback);

return(true);
}