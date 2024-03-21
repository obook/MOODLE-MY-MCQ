/*
*
* (C) obook 2020-2024
*
*/ 

export { StorageExists, StoreQuestion, RecallQuestion, StorageClear};

function StorageClear() {
  localStorage.clear();
}

function StorageExists(number) {
  var prefix = "storage_"+number+"_";
  var number_id = prefix + "id";
  if (localStorage.getItem(number_id)) {
    console.log("StorageExists ["+number_id+"]=TRUE for "+number+ " : "+localStorage.getItem(number_id));
    return(true);
  }
  else{
    console.log("StorageExists ["+number_id+"]=FALSE for "+number);   
  }
return(false);
}

function StoreQuestion(number) {
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

    localStorage.setItem(number_id, "set");
    localStorage.setItem(question_key, question);
    localStorage.setItem(answer1_key, reponse1);
    localStorage.setItem(answer2_key, reponse2);
    localStorage.setItem(answer3_key, reponse3);
    localStorage.setItem(answer4_key, reponse4);
    localStorage.setItem(feedback_key, feedback);
}

function RecallQuestion(number) {
  var prefix = "storage_"+number+"_";
  var number_id = prefix + "id";
  if (localStorage.getItem(number_id)) {
    console.log("RecallQuestion ["+number_id+"]=TRUE for "+number+ " : "+localStorage.getItem(number_id));

    $("#id_reponse1").val();
    $("#id_reponse2").val();
    $("#id_reponse3").val();
    $("#id_reponse4").val();
    $("#id_feedback").val();
    return(true);
  }
}
