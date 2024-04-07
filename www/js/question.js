/*
*
* (C) obook 2020-2024
*
*/

export {QuestionObj, GetCurrentQuestion, SetCurrentQuestion, ClearCurrentQuestion, StoreQuestion, GetQuestion, RecallQuestion};
import {StorageExists} from "./storage.js";

let QuestionObj = {
    number: 0, /* >= 1 */
    format: "", /* GIFT or XML */ 
    text: "", /* Question text */
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    feedback: ""
  };

  /*
  Usage : const questionobj = GetCurrentQuestion();
  */
function GetCurrentQuestion() {
let questionobj = Object.create(QuestionObj);
    
    questionobj.text = $("#id_question").val();
    
    if(!questionobj.text)
        return(null);

    questionobj.number = $("#id_numero").val();
    questionobj.format = $("#sliderOutput").val();
    questionobj.answer1 = $("#id_reponse1").val();
    questionobj.answer2 = $("#id_reponse2").val();
    questionobj.answer3 = $("#id_reponse3").val();
    questionobj.answer4 = $("#id_reponse4").val();
    questionobj.feedback = $("#id_feedback").val();

return(questionobj);
}

function SetCurrentQuestion(varObj) {
    $("#id_numero").val(varObj.number);
    $("#id_question").val(varObj.text);
    $("#id_reponse1").val(varObj.answer1);
    $("#id_reponse2").val(varObj.answer2);
    $("#id_reponse3").val(varObj.answer3);
    $("#id_reponse4").val(varObj.answer4);
    $("#id_feedback").val(varObj.feedback);
}

function ClearCurrentQuestion(number=null) {
    $("#id_titre").val("");
    $("#id_question").val("");
    $("#id_reponse1").val("");
    $("#id_reponse2").val("");
    $("#id_reponse3").val("");
    $("#id_reponse4").val("");
    $("#id_feedback").val("");

    if(number)
        $("#id_numero").val(number);

    $("#id_code").html("");
    $("#id_preview").html("");
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

