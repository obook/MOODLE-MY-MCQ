/*
*
* (C) obook 2020-2024
*
*/

import { EncodeSnippet, Html2GiftFilter } from "./snippet.js";
export { Preview };

var old_apercu = "";
var old_apercu_title = "";

function Preview() {
var apercu;
var numero = $("#id_numero").val();
var titre = $("#id_titre").val();
var titre = numero + " - " + titre;
var question_object = $("#id_question");
var reponse1 = $("#id_reponse1").val();
var reponse2 = $("#id_reponse2").val();
var reponse3 = $("#id_reponse3").val();
var reponse4 = $("#id_reponse4").val();
var feedback = $("#id_feedback").val();

// A voir, les retours à la ligne, hors code, ne sont pas dans le preview

    //console.log("Question 1 = ["+question_object.val()+"]");

    apercu = EncodeSnippet(question_object.val(), true);
    
    //console.log("Question 2 = ["+question_object.val()+"]");

    var find = apercu.replaceAll("\n","<br>\r\n");
    
    //console.log("apercu.replaceAll="+find );

    apercu = apercu + "<br>\n<br>\n";	
    apercu = apercu + "a) &nbsp;&nbsp;" + Html2GiftFilter( reponse1, "apercu" ) + "<br>\n";	
    apercu = apercu + "b) &nbsp;&nbsp;" + Html2GiftFilter( reponse2, "apercu" ) + "<br>\n";
    apercu = apercu + "c) &nbsp;&nbsp;" + Html2GiftFilter( reponse3, "apercu" ) + "<br>\n";
    apercu = apercu + "d) &nbsp;&nbsp;" + Html2GiftFilter( reponse4, "apercu" ) + "<br>\n";
    
    if( feedback ) {
            apercu = apercu + "<br>\nFeedback: " + feedback;
    }
    
    if( old_apercu != apercu ) {
        var math = document.getElementById("id_apercu");
        $("#id_apercu").html(apercu);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]); /* MathJax not found ! */
        old_apercu = apercu;
        /* $("#id_apercu").trigger("create"); */
    }
    
    var apercu_title;
    apercu_title = "Aperçu " + titre;

    if( old_apercu_title != apercu_title )
    {
        $("#id_apercu_title").html(apercu_title);
        old_apercu_title = apercu_title;
    }
}
    