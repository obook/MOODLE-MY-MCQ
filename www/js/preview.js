/*
*
* (C) obook 2020-2024
*
*/

import { EncodeSnippet, EncodePreview, Html2GiftFilter } from "./snippet.js";
export { Preview };

let old_apercu = "";
let old_apercu_title = "";

function Preview() {
let apercu;
let numero = $("#id_numero").val();
let titre = $("#id_titre").val();
titre = numero + " - " + titre;
let question_object = $("#id_question");
let reponse1 = $("#id_reponse1").val();
let reponse2 = $("#id_reponse2").val();
let reponse3 = $("#id_reponse3").val();
let reponse4 = $("#id_reponse4").val();
let feedback = $("#id_feedback").val();

// A voir, les retours à la ligne, hors code, ne sont pas dans le preview

    //console.log("Question 1 = ["+question_object.val()+"]");

    apercu = EncodePreview(question_object.val(), true);
    
    //console.log("Question 2 = ["+question_object.val()+"]");

    // let find = apercu.replaceAll("\n","<br>\r\n");
    
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
        let math = document.getElementById("id_preview");
        $("#id_preview").html(apercu);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]); /* MathJax not found ! */
        old_apercu = apercu;
        /* $("#id_code").trigger("create"); */
    }
    
    let apercu_title;
    apercu_title = "Aperçu " + titre;

    if( old_apercu_title != apercu_title )
    {
        $("#id_code_title").html(apercu_title);
        old_apercu_title = apercu_title;
    }
}
