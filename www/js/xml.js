 /*
*
* (C) obook 2020-2024
*
*/

import { EncodeSnippet, Html2XMLFilter } from "./snippet.js";
export { MakeXML };

var old_code = "";

function MakeXML(force=false) {
    var numero = $("#id_numero").val().toString().padStart(2, '0') ;
	var titre = $("#id_titre").val();
	var theme = $("#id_theme").val();
	var titre = numero + " - " + titre;
    var question_object = $("#id_question");
	var question = EncodeSnippet(question_object.val());

    console.log("MakeXML");

    // Il faut remplacer < par &lt; à l'intérieur de <pre><code></code></pre>

    var type = $("#id_question_type").val(); /* 1,2,3 ou 4 bonnes réponses */
    var points = $("#id_points_negatifs").val(); /* 0 = sans points négatifs, 1 = avec points négatifs */

    /*
    
    Ce qui fonctionne pour du code HTML source dans Atto :
    
    <pre>&lt;code&gt;&lt;button onclick=&quot;afficher_reponse()&quot;&gt;Cliquez ici &lt;/button&gt;&lt;/code&gt;</pre>
    
    MIEUX : il faut un commutateur par question : HTML ou PLAIN, exemple :
    
    = [plain] <button onclick\="afficher_reponse()">Cliquez ici </button>
    
    */
    
    var format_reponse = $("#id_format_reponse").val(); /* html ou plain */
    var format_question = $("#id_format_question").val(); /* html ou plain */
    var reponse1 = $("#id_reponse1").val();
    var reponse2 = $("#id_reponse2").val();
    var reponse3 = $("#id_reponse3").val();
    var reponse4 = $("#id_reponse4").val();
    var feedback = $("#id_feedback").val();
                 
    // console.log("id_points_negatifs = " + points );
	
	var code;

    code = Html2XMLFilter("<?xml version=\"1.0\" ?>\n<quiz>\n");

    // Bank

    code = code + Html2XMLFilter("<question type=\"category\">\n\t<category>\n\t\t<text>$course$/"+theme+"</text>\n\t</category>\n</question>\n");

    // Question
    code = code + Html2XMLFilter("<!-- Question "+numero+" -->\n");
    code = code + Html2XMLFilter("<question type=\"multichoice\">\n");
    code = code + Html2XMLFilter("\t<name><text>"+titre+"</text></name>\n");
    code = code + Html2XMLFilter("\t<questiontext format=\""+format_question+"\">\n<text><![CDATA["+question+"]]></text>\n</questiontext>\n");

    if( feedback )
    {
         code = code + Html2XMLFilter("<generalfeedback format=\""+format_reponse+"\"><text>") + Html2XMLFilter( feedback ) + Html2XMLFilter("</text></generalfeedback>\n");
    }

    code = code + Html2XMLFilter("<single>true</single>\n");

    code = code + Html2XMLFilter("\t<answer fraction=\"100\" format=\""+format_reponse+"\"><text>")+ Html2XMLFilter( reponse1, format_reponse ) + Html2XMLFilter("</text></answer>\n");
    code = code + Html2XMLFilter("\t<answer fraction=\"-33.33333\" format=\""+format_reponse+"\"><text>") + Html2XMLFilter( reponse2, format_reponse ) + Html2XMLFilter("</text></answer>\n");
    code = code + Html2XMLFilter("\t<answer fraction=\"-33.33333\" format=\""+format_reponse+"\"><text>") + Html2XMLFilter( reponse3, format_reponse ) + Html2XMLFilter("</text></answer>\n");
    code = code + Html2XMLFilter("\t<answer fraction=\"-33.33333\" format=\""+format_reponse+"\"><text>") + Html2XMLFilter( reponse4, format_reponse ) + Html2XMLFilter("</text></answer>\n");

    /// fin question
    code = code + Html2XMLFilter("</question>\n");

    // Fin  XML
    code = code + Html2XMLFilter("</quiz>");

    var code_object = $("#id_result");

    if( old_code != code || force )
    {
        code_object.html("<pre class='result'><code>"+code+"<code></pre>");
        // code_object.html(code);
        old_code = code;
    }


}
