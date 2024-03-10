/*
*
* (C) obook 2020-2024
*
*/

import { Preview } from "./preview.js";
import { MakeGift } from "./gift.js";
import { MakeXML } from "./xml.js";
import { EncodeSnippet, Html2GiftFilter } from "./snippet.js";

export {Init, SetFormatOutput, Process};

var delay = 2
var counter = delay;
var clockId;
var old_header = "";
var format_gift = true;

function Init() {
  Process();
  clockId = setInterval(clock, 1000);
}

function clock() {
    counter--;
    if(counter == 0)
    {
        Process();
        counter = delay+1;
    }
}

function SetFormatOutput(value) {
    if (value == 'GIFT') {
        console.log("SetFormatOutput:GIFT");
        format_gift = true;
        Process();
    }
    else {
        console.log("SetFormatOutput:XML");
        format_gift = false;
        Process(); 
    }
}

function Process(force=false)
{
	console.log("Process start...");
	
	var numero = $("#id_numero").val();
	var titre = $("#id_titre").val();
	var theme = $("#id_theme").val();
	var titre = numero.toString().padStart(2, '0') + " - " + titre;
  // Réglage du titre de la fenêtre
  $(document).prop('title', theme);

	var header = theme + " : Q" + titre;
  if( old_header != header )
  {
      $("#id_header").html(header);
      old_header = header;
  }

  Preview();

  if(format_gift)
    MakeGift(force);
  else
    MakeXML(force);

  console.log("Process ended.");
}

Init();
