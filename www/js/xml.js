 /*
*
* (C) obook 2020-2024
*
*/

import { EncodeSnippet, Html2XMLFilter, GetFirstLine} from "./snippet.js";
export { MakeXML };

var old_code = "";

function MakeXML(force=false, bank=true) {
    var numero = $("#id_numero").val().toString().padStart(2, '0') ;
	var theme = $("#id_theme").val();
	var titre = numero + " - " + titre;
    var question_object = $("#id_question");
	var question = EncodeSnippet(question_object.val());

    /* Title is from question's first line */
    var titre = numero+ " - " + GetFirstLine(question_object.val());

    // console.log("MakeXML");

    var type = $("#id_question_type").val(); /* 1,2,3 ou 4 bonnes réponses */
    var points = $("#id_points_negatifs").val(); /* 0 = sans points négatifs, 1 = avec points négatifs */

    var reponse1 = $("#id_reponse1").val();
    var reponse2 = $("#id_reponse2").val();
    var reponse3 = $("#id_reponse3").val();
    var reponse4 = $("#id_reponse4").val();
    var feedback = $("#id_feedback").val();

	var code = "";

    if(bank)
    {
        code = Html2XMLFilter("<?xml version=\"1.0\" ?>\n<quiz>\n");
        // Bank
        code = code + Html2XMLFilter("<question type=\"category\">\n <category>\n  <text>$course$/"+theme+"</text>\n </category>\n</question>\n");
    }

    // Question
    code = code + Html2XMLFilter("<!-- Question "+numero+" -->\n");
    code = code + Html2XMLFilter("<question type=\"multichoice\">\n");
    code = code + Html2XMLFilter("    <name><text>"+titre+"</text></name>\n");
    code = code + Html2XMLFilter("    <questiontext format=\"html\">\n<text><![CDATA["+question+"]]></text>\n</questiontext>\n");

    if( feedback )
    {
         code = code + Html2XMLFilter("<generalfeedback format=\"html\"\><text>") + Html2XMLFilter( feedback ) + Html2XMLFilter("</text></generalfeedback>\n");
    }

    code = code + Html2XMLFilter("<single>true</single>\n");

    code = code + Html2XMLFilter("    <answer fraction=\"100\" format=\"html\"\><text>")+ Html2XMLFilter( reponse1, "html" ) + Html2XMLFilter("</text></answer>\n");
    code = code + Html2XMLFilter("    <answer fraction=\"-33.33333\" format=\"html\"\><text>") + Html2XMLFilter( reponse2, "html" ) + Html2XMLFilter("</text></answer>\n");
    code = code + Html2XMLFilter("    <answer fraction=\"-33.33333\" format=\"html\"\><text>") + Html2XMLFilter( reponse3, "html" ) + Html2XMLFilter("</text></answer>\n");
    code = code + Html2XMLFilter("    <answer fraction=\"-33.33333\" format=\"html\"\><text>") + Html2XMLFilter( reponse4, "html" ) + Html2XMLFilter("</text></answer>\n");

    /// fin question
    code = code + Html2XMLFilter("</question>\n");
    if(bank)
    {
        // Fin  XML
        code = code + Html2XMLFilter("</quiz>");
    }

    var code_object = $("#id_code");

    if( old_code != code || force )
    {
        code_object.html("<pre class='result'><code>"+code+"<code></pre>");
        // code_object.html(code);
        old_code = code;
    }
}
