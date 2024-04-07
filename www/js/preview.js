/*
*
* (C) obook 2020-2024
*
*/

import { Html2PreviewFilter } from "./snippet.js";
import { GetCurrentQuestion } from "./question.js";
export { MakePreview };

let old_apercu = "";

function MakePreview() {
let apercu;
const questionobj = GetCurrentQuestion();
let titre = $("#id_titre").val();

    if(!questionobj)
    {
        $("#id_preview").html("");
        old_apercu = "";
        return;
    }

    titre = questionobj.number + " - " + titre;

    apercu = EncodePreview(questionobj.text, true);
    apercu = apercu + "<br>\n<br>\n";	
    apercu = apercu + "a) &nbsp;&nbsp;" + Html2PreviewFilter( questionobj.answer1, false ) + "<br>\n";	
    apercu = apercu + "b) &nbsp;&nbsp;" + Html2PreviewFilter( questionobj.answer2, false ) + "<br>\n";
    apercu = apercu + "c) &nbsp;&nbsp;" + Html2PreviewFilter( questionobj.answer3, false ) + "<br>\n";
    apercu = apercu + "d) &nbsp;&nbsp;" + Html2PreviewFilter( questionobj.answer4, false ) + "<br>\n";
    
    if( questionobj.feedback ) {
            apercu = apercu + "<br>\nFeedback: " + questionobj.feedback;
    }
    
    if( old_apercu != apercu ) {
        let math = document.getElementById("id_preview");
        $("#id_preview").html(apercu);
        try {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
        } catch (error) {
            console.error("MathJax.Hub.Queue:", error);
        }
        old_apercu = apercu;
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
