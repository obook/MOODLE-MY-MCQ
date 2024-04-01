/*
*
* (C) obook 2020-2024
*
*/

import { MakePreview } from "./preview.js";
import { MakeGift } from "./gift.js";
import { MakeXML } from "./xml.js";
import { ClearCurrentQuestion } from "./question.js";
import { GetFirstLine} from "./snippet.js";
import { StorageExists, StoreQuestion, RecallQuestion, StorageClear} from "./storage.js";

export {Init, SetFormatOutput, SetBankOutput, QuestionNumberChanged, Process, ClearAll};

var delay = 2
var counter = delay;
var clockId;
var old_header = "";
var format_gift = true;
var print_bank = true;
var actual_question_number = 1;
var last_question_number = 1;

function Init() {
  $("#sliderOutput").val('GIFT');
  $("#sliderBank").val('OFF');
  RecallQuestion(actual_question_number);
  Process(true, print_bank);
  clockId = setInterval(clock, 1000);
}

function ClearAll() {
  StorageClear();
  ClearCurrentQuestion(1);
}

function clock() {
    counter--;
    if(counter == 0)
    {
        Process(false, print_bank);
        counter = delay+1;
    }
}

function SetFormatOutput(value) {
    if (value == 'GIFT') {
        console.log("SetFormatOutput:GIFT");
        format_gift = true;
        Process(true, print_bank);
    }
    else {
        console.log("SetFormatOutput:XML");
        format_gift = false;
        Process(true, print_bank); 
    }
}

function SetBankOutput(value) {
  if (value == 'OFF') {
      console.log("SetBankOutput:TRUE");
      print_bank = true;
      Process(true, print_bank);
  }
  else {
      console.log("SetBankOutput:FALSE");
      print_bank = false;
      Process(true, print_bank);
  }
}

function QuestionNumberChanged(number) {
  if( StorageExists(number) ) {
    RecallQuestion(number);
    console.log("QuestionNumberChanged "+number+" RecallQuestion OK");
    /* Resize textarea */
    $("#id_question").height("0px");
    $("#id_question").height( $("#id_question")[0].scrollHeight);
  }
  else {
    ClearCurrentQuestion();
  }
  Process();
  last_question_number = number;
}

function Process(force=false, bank=true) {
	//console.log("Process start...");
	var question_object = $("#id_question");
	var numero = $("#id_numero").val();
	var theme = $("#id_theme").val();
  var titre = numero.padStart(2, '0')+ " - " + GetFirstLine(question_object.val());
  // Réglage du titre de la fenêtre
  $(document).prop('title', theme);

  if ($("#sliderOutput").val() == 'GIFT') {
    format_gift = true;
    $("#id_outype").html("GIFT");
  }
  else {
    format_gift = false;
    $("#id_outype").html("XML");
  }

	var header = theme + " : Q" + titre;
  if( old_header != header )  {
      $("#id_header").html(header);
      old_header = header;
  }

  MakePreview();

  if(format_gift)
    MakeGift(force, bank);
  else
    MakeXML(force, bank);

  StoreQuestion(numero);

  //console.log("Process ended.");
}

Init();
