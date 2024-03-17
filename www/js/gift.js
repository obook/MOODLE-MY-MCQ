/*
*
* (C) obook 2020-2024
*
*/ 

import { EncodeSnippet, Html2GiftFilter } from "./snippet.js";
export { MakeGift };

var old_code = "";

function MakeQuestionTitle(s) {
let car;
    var splitters = ["\n", "?", ".", ":", "<br>", "..."];
    for (car of splitters) {
        if( s.includes(car) )
        {
            s = s.split(car)[0];
            console.log("On split sur le car ["+car+"], TITRE=["+s+"]")
            return s;
        }
    }
return("Question...");
}

function MakeGift(force=false, bank=true) {
    var numero = $("#id_numero").val().toString().padStart(2, '0') ;
    var theme = $("#id_theme").val();
    var question_object = $("#id_question");
	var question = EncodeSnippet(question_object.val());
    
    /* Title is from question's first line */
    var titre = numero+ " - " + MakeQuestionTitle(question_object.val());

    console.log("MakeGift");

    var type = $("#id_question_type").val(); /* 1,2,3 ou 4 bonnes réponses */
    var points = $("#id_points_negatifs").val(); /* 0 = sans points négatifs, 1 = avec points négatifs */
  
    var format_reponse = $("#id_format_reponse").val(); /* html ou plain */
    var format_question = $("#id_format_question").val(); /* html ou plain */
    var reponse1 = $("#id_reponse1").val();
    var reponse2 = $("#id_reponse2").val();
    var reponse3 = $("#id_reponse3").val();
    var reponse4 = $("#id_reponse4").val();
    var feedback = $("#id_feedback").val();
                 
    // console.log("id_points_negatifs = " + points );

    /*

        On va utiliser la premire ligne de la question pour fabriquer le titre

    */



    console.log("NEW TITLE=["+titre+"]")
	
	var code = "";

    if(bank) {
      code = code + "// Category<br>\n";
      code = "$CATEGORY: $course$/" + theme + "<br>\n<br>\n";
    }
    code = code + "// Question "+numero+"<br>\n";
    code = code + "::" + Html2GiftFilter( titre ) + "<br>\n";
    code = code + "::["+format_question+"] " + Html2GiftFilter(question) + "<br>\n";

    if( type == 1 ) // Une bonne réponse
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// One correct awswer : n°1, With negative points<br>\n{<br>\n";
            code = code + "&nbsp; = ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";
        }
        else
        {
            code = code + "// One correct awswer : n°1, Without negative points<br>\n{<br>\n";
            code = code + "&nbsp; = ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~ ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~ ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~ ["+format_reponse+"]] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";          
        }
    }
    else if( type == 2 ) // Deux bonnes réponses
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// Two correct awswers : n°1 et n°2, With negative points<br>\n{<br>\n";
            code = code + "&nbsp; ~%50% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%50% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";
        }
        else
        {
            code = code + "// Two correct awswers : n°1 et n°2, Without negative points<br>\n{<br>\n";
            code = code + "&nbsp; ~%50% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%50% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~ ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~ ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";           
        }
    }
    else if( type == 3 ) // Trois bonnes réponses
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// Three correct awswers : n°1, n°2 et n°3, With negative points<br>\n{<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-100% ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";
        }
        else
        {
            code = code + "// Three correct awswers : n°1, n°2 et n°3, Without negative points<br>\n{<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~ ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";          
        }
    }
    else // Quatre bonnes réponses
    {
        code = code + "// Four correct awswers<br>\n{<br>\n";
        code = code + "&nbsp; ~%25% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
        code = code + "&nbsp; ~%25% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
        code = code + "&nbsp; ~%25% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
        code = code + "&nbsp; ~%25% ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";
    }
    
    if( feedback )
    {
         code = code + "&nbsp; #### ["+format_reponse+"] " + Html2GiftFilter( feedback ) + "<br>\n";
    }
    
	code = code + "}";

    var code_object = $("#id_result");

    if( old_code != code || force )
    {
        code_object.html("<code>"+code+"<code>");
        old_code = code;
    }

}
