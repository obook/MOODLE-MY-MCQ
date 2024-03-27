/*
*
* (C) obook 2020-2024
*
*/ 

import { EncodeSnippet, Html2GiftFilter, GetFirstLine} from "./snippet.js";
export { MakeGift };

var old_code = "";

function MakeGift(force=false, bank=true) {
    var numero = $("#id_numero").val().toString().padStart(2, '0') ;
    var theme = $("#id_theme").val();
    var question_object = $("#id_question");
	var question = EncodeSnippet(question_object.val());
    
    /* Title is from question's first line */
    var titre = numero+ " - " + GetFirstLine(question_object.val());

    console.log("MakeGift");

    var type = $("#id_question_type").val(); /* 1,2,3 ou 4 bonnes réponses */
    var points = $("#id_points_negatifs").val(); /* 0 = sans points négatifs, 1 = avec points négatifs */
  
    var reponse1 = $("#id_reponse1").val();
    var reponse2 = $("#id_reponse2").val();
    var reponse3 = $("#id_reponse3").val();
    var reponse4 = $("#id_reponse4").val();
    var feedback = $("#id_feedback").val();
                 
	var code = "";

    if(bank) {
      code = code + "// Category<br>\n";
      code = "$CATEGORY: $course$/" + theme + "<br>\n<br>\n";
    }
    code = code + "// Question "+numero+"<br>\n";
    code = code + "::" + Html2GiftFilter( titre ) + "<br>\n";
    code = code + "::[html] " + Html2GiftFilter(question) + "<br>\n";

    if( type == 1 ) // Une bonne réponse
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// One correct awswer : n°1, With negative points<br>\n{<br>\n";
            code = code + " = [html] " + Html2GiftFilter( reponse1, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " + Html2GiftFilter( reponse2, "html") + "<br>\n";
            code = code + " ~%-33.33333% [html] " + Html2GiftFilter( reponse3, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " +  Html2GiftFilter( reponse4, "html" ) + "<br>\n";
        }
        else
        {
            code = code + "// One correct awswer : n°1, Without negative points<br>\n{<br>\n";
            code = code + " = [html] " + Html2GiftFilter( reponse1, "html" ) + "<br>\n";
            code = code + " ~ [html] " + Html2GiftFilter( reponse2, "html" ) + "<br>\n";
            code = code + " ~ [html] " + Html2GiftFilter( reponse3, "html" ) + "<br>\n";
            code = code + " ~ [html]] " +  Html2GiftFilter( reponse4, "html" ) + "<br>\n";
        }
    }
    else if( type == 2 ) // Deux bonnes réponses
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// Two correct awswers : n°1 et n°2, With negative points<br>\n{<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( reponse1, "html" ) + "<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( reponse2, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " + Html2GiftFilter( reponse3, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " +  Html2GiftFilter( reponse4, "html" ) + "<br>\n";
        }
        else
        {
            code = code + "// Two correct awswers : n°1 et n°2, Without negative points<br>\n{<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( reponse1, "html" ) + "<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( reponse2, "html" ) + "<br>\n";
            code = code + " ~ [html] " + Html2GiftFilter( reponse3, "html" ) + "<br>\n";
            code = code + " ~ [html] " +  Html2GiftFilter( reponse4, "html" ) + "<br>\n";
        }
    }
    else if( type == 3 ) // Trois bonnes réponses
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// Three correct awswers : n°1, n°2 et n°3, With negative points<br>\n{<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( reponse1, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( reponse2, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( reponse3, "html" ) + "<br>\n";
            code = code + " ~%-100% [html] " +  Html2GiftFilter( reponse4, "html" ) + "<br>\n";
        }
        else
        {
            code = code + "// Three correct awswers : n°1, n°2 et n°3, Without negative points<br>\n{<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( reponse1, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( reponse2, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( reponse3, "html" ) + "<br>\n";
            code = code + " ~ [html] " +  Html2GiftFilter( reponse4, "html" ) + "<br>\n";
        }
    }
    else // Quatre bonnes réponses
    {
        code = code + "// Four correct awswers<br>\n{<br>\n";
        code = code + " ~%25% [html] " + Html2GiftFilter( reponse1, "html" ) + "<br>\n";
        code = code + " ~%25% [html] " + Html2GiftFilter( reponse2, "html" ) + "<br>\n";
        code = code + " ~%25% [html] " + Html2GiftFilter( reponse3, "html" ) + "<br>\n";
        code = code + " ~%25% [html] " +  Html2GiftFilter( reponse4, "html" ) + "<br>\n";
    }
    
    if( feedback )
    {
         code = code + " #### [html] " + Html2GiftFilter( feedback ) + "<br>\n";
    }
    
	code = code + "}";

    var code_object = $("#id_result");

    if( old_code != code || force )
    {
        code_object.html("<code>"+code+"<code>");
        old_code = code;
    }

}
