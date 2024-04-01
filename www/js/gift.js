/*
*
* (C) obook 2020-2024
*
*/ 

import { EncodeSnippet, Html2GiftFilter, GetFirstLine} from "./snippet.js";
import { QuestionObj, GetCurrentQuestion } from "./question.js";
export { MakeGift };

let old_code = "";

function MakeGift(force=false, bank=true) {
    const questionobj = GetCurrentQuestion();
    if(!questionobj)
    {
        $("#id_code").html("");
        old_code = "";
        return;
    }

    let numero = questionobj.number.padStart(2, '0');
    let theme = $("#id_theme").val();
	let question = EncodeSnippet(questionobj.text);
    
    /* Title is from question's first line */
    let titre = numero+ " - " + GetFirstLine(questionobj.text);

    // console.log("MakeGift");

    let type = $("#id_question_type").val(); /* 1,2,3 ou 4 bonnes réponses */
    let points = $("#id_points_negatifs").val(); /* 0 = sans points négatifs, 1 = avec points négatifs */            
	let code = "";

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
            code = code + " = [html] " + Html2GiftFilter( questionobj.answer1, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " + Html2GiftFilter( questionobj.answer2, "html") + "<br>\n";
            code = code + " ~%-33.33333% [html] " + Html2GiftFilter( questionobj.answer3, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " +  Html2GiftFilter( questionobj.answer4, "html" ) + "<br>\n";
        }
        else
        {
            code = code + "// One correct awswer : n°1, Without negative points<br>\n{<br>\n";
            code = code + " = [html] " + Html2GiftFilter( questionobj.answer1, "html" ) + "<br>\n";
            code = code + " ~ [html] " + Html2GiftFilter( questionobj.answer2, "html" ) + "<br>\n";
            code = code + " ~ [html] " + Html2GiftFilter( questionobj.answer3, "html" ) + "<br>\n";
            code = code + " ~ [html]] " +  Html2GiftFilter( questionobj.answer4, "html" ) + "<br>\n";
        }
    }
    else if( type == 2 ) // Deux bonnes réponses
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// Two correct awswers : n°1 et n°2, With negative points<br>\n{<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( questionobj.answer1, "html" ) + "<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( questionobj.answer2, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " + Html2GiftFilter( questionobj.answer3, "html" ) + "<br>\n";
            code = code + " ~%-33.33333% [html] " +  Html2GiftFilter( questionobj.answer4, "html" ) + "<br>\n";
        }
        else
        {
            code = code + "// Two correct awswers : n°1 et n°2, Without negative points<br>\n{<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( questionobj.answer1, "html" ) + "<br>\n";
            code = code + " ~%50% [html] " + Html2GiftFilter( questionobj.answer2, "html" ) + "<br>\n";
            code = code + " ~ [html] " + Html2GiftFilter( questionobj.answer3, "html" ) + "<br>\n";
            code = code + " ~ [html] " +  Html2GiftFilter( questionobj.answer4, "html" ) + "<br>\n";
        }
    }
    else if( type == 3 ) // Trois bonnes réponses
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// Three correct awswers : n°1, n°2 et n°3, With negative points<br>\n{<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( questionobj.answer1, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( questionobj.answer2, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( questionobj.answer3, "html" ) + "<br>\n";
            code = code + " ~%-100% [html] " +  Html2GiftFilter( questionobj.answer4, "html" ) + "<br>\n";
        }
        else
        {
            code = code + "// Three correct awswers : n°1, n°2 et n°3, Without negative points<br>\n{<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( questionobj.answer1, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( questionobj.answer2, "html" ) + "<br>\n";
            code = code + " ~%33.33333% [html] " + Html2GiftFilter( questionobj.answer3, "html" ) + "<br>\n";
            code = code + " ~ [html] " +  Html2GiftFilter( questionobj.answer4, "html" ) + "<br>\n";
        }
    }
    else // Quatre bonnes réponses
    {
        code = code + "// Four correct awswers<br>\n{<br>\n";
        code = code + " ~%25% [html] " + Html2GiftFilter( questionobj.answer1, "html" ) + "<br>\n";
        code = code + " ~%25% [html] " + Html2GiftFilter( questionobj.answer2, "html" ) + "<br>\n";
        code = code + " ~%25% [html] " + Html2GiftFilter( questionobj.answer3, "html" ) + "<br>\n";
        code = code + " ~%25% [html] " +  Html2GiftFilter( questionobj.answer4, "html" ) + "<br>\n";
    }
    
    if( questionobj.feedback )
    {
         code = code + " #### [html] " + Html2GiftFilter( questionobj.feedback ) + "<br>\n";
    }
    
	code = code + "}";

    let code_object = $("#id_code");

    if( old_code != code || force )
    {
        code_object.html("<code>"+code+"<code>");
        old_code = code;
    }

}


function MakeQuestionsGift(number)
{




}