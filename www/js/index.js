/*
*
* (C) obook 2020-2024
*
*/

import { MakePreview } from "./preview.js";
import { MakeGift, SaveGift } from "./gift.js";
import { MakeXML } from "./xml.js";
import { ClearCurrentQuestion } from "./question.js";
import { GetFirstLine} from "./snippet.js";
import { StorageExists, StoreQuestion, RecallQuestion, StorageClear} from "./storage.js";
import { ConfigMax, ConfigTheme, ConfigFormatOutput, ConfigQuestionOnly} from "./config.js";

export {Init, SetFormatOutput, SetQuestionOnly, QuestionNumberChanged, ClearAll, SaveCode};

var delay = 2
var counter = delay;
var clockId;
var old_header = "";
var format_gift = true;
var question_only = true;
var actual_question_number = 1;

function Init() {
  $("#sliderOutput").val(ConfigFormatOutput());
  question_only = ConfigQuestionOnly(); /* true or false */
  if(question_only) {
    $("#sliderBank").val('ON');
  }
  else {
    $("#sliderBank").val('OFF');
  }
  
  $("#id_theme").val(ConfigTheme());
  RecallQuestion(actual_question_number);
  Process(true, question_only);
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
        Process(false, question_only);
        counter = delay+1;
    }
}

function SetFormatOutput(value) {
    if (value == 'GIFT') {
        console.log("SetFormatOutput:GIFT");
        format_gift = true;
        Process(true, question_only);
    }
    else {
        console.log("SetFormatOutput:XML");
        format_gift = false;
        Process(true, question_only); 
    }

    ConfigFormatOutput(value);
}

function SetQuestionOnly(value) {
  console.log("SetQuestionOnly:", value); /* OFF = with bank */

  if (value == 'OFF')
      question_only = false;
  else
      question_only = true;

  console.log("SetQuestionOnly:", question_only);

  Process(true, question_only);

  ConfigQuestionOnly(question_only);
}

function QuestionNumberChanged(number) {
  if( StorageExists(number) ) {
    RecallQuestion(number);
    // console.log("QuestionNumberChanged "+number+" RecallQuestion OK");
    /* Resize textarea */
    $("#id_question").height("0px");
    $("#id_question").height( $("#id_question")[0].scrollHeight);
  }
  else {
    ClearCurrentQuestion();
  }
  ConfigMax(number);
  Process();
}

function Process(force=false, question_only=false) {
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
    MakeGift(force, question_only);
  else
    MakeXML(force, question_only);

  StoreQuestion(numero);

  ConfigTheme(theme); // créé une nouvelle config

  //console.log("Process ended.");
}

function SaveCode() {
  SaveGift(ConfigTheme());
}

Init();
