/*
*
* (C) obook 2020-2024
*
*/

import { Html2GiftFilter } from "./snippet.js";
export { MakePreview };

let old_apercu = "";
let old_apercu_title = "";

function MakePreview() {
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


    apercu = EncodePreview(question_object.val(), true);
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
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
        old_apercu = apercu;
    }
    
    let apercu_title;
    apercu_title = "Aperçu " + titre;

    if( old_apercu_title != apercu_title ) {
        $("#id_code_title").html(apercu_title);
        old_apercu_title = apercu_title;
    }
}

/*
Support multi codes snippets
 */
function EncodePreview(question)
{
    question = question.replace(/(\r\n|\r|\n)/g, '<br>');
    const regexp = /<pre><code>(.*?)<\/code><\/pre>/g;
    const codes = [...question.matchAll(regexp)];

    for (let i = 0; i < codes.length; i++) {
        let code = codes[i][1];
        let new_code = code;
        new_code = new_code.replaceAll("<br>","\n");
        new_code = new_code.replaceAll("<","&lt;");
        new_code = new_code.replaceAll(">","&gt;");
        question = question.replaceAll(code, new_code);
    }

    return(question);
}
