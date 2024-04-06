/*
*
* (C) obook 2020-2024
*
*/ 

import { Html2GiftFilter, GetFirstLine, EncodeSnippet} from "./snippet.js";
import { GetCurrentQuestion } from "./question.js";
import { GetQuestion } from "./storage.js";
import { ConfigMax } from "./config.js";
export { MakeGift, SaveGift };

let old_code = "";
let current_code = "";

/*
Print Gift code 
*/
function MakeGift(force=false, question_only=true) {
let code = "";

    const questionobj = GetCurrentQuestion();

    if(!questionobj)
    {
        $("#id_code").html("");
        old_code = "";
        return;
    }

    if(!question_only) {
        let theme = $("#id_theme").val();
        code = code + "// Category<br>\n";
        code = "$CATEGORY: $course$/" + theme + "<br>\n<br>\n";
    }

    code = code + EncodeGift(questionobj);

    if( old_code != code || force )
    {
        $("#id_code").html(code);
        current_code = code;
        old_code = code;
    }

}

function EncodeGift(questionobj, endline='<br>\n', format='html') {
let code = "";
let numero = questionobj.number.padStart(2, '0');
let titre = numero+ " - " + GetFirstLine(questionobj.text);

    let question = EncodeSnippet(questionobj.text);

    /* pas de <br> pour le fichier */
    code = code + "// Question "+numero+endline;
    code = code + "::" + Html2GiftFilter( titre ) + endline;
    /* Avec ,"text" : je n'ai pas les indentations dans le code, le code à copier est pourri
    */
    code = code + "::[html] " + Html2GiftFilter(question, format) + endline;

    /* aller cherche plutot dans la config ? */

    let type = $("#id_question_type").val(); /* 1,2,3 ou 4 bonnes réponses */
    let points = $("#id_points_negatifs").val(); /* 0 = sans points négatifs, 1 = avec points négatifs */  

    if( type == 1 ) { // Une bonne réponse
        if (points == 1) { /* Points négatifs */
            code = code + "// One correct awswer : n°1, With negative points"+endline+"{"+endline;
            code = code + " = " + Html2GiftFilter( questionobj.answer1, "html" ) + endline;
            code = code + " ~ %-33.33333% " + Html2GiftFilter( questionobj.answer2, "html") + endline;
            code = code + " ~ %-33.33333% " + Html2GiftFilter( questionobj.answer3, "html" ) + endline;
            code = code + " ~ %-33.33333% " +  Html2GiftFilter( questionobj.answer4, "html" ) + endline;
        }
        else {
            code = code + "// One correct awswer : n°1, Without negative points"+endline+"{"+endline;
            code = code + " = " + Html2GiftFilter( questionobj.answer1, "html" ) + endline;
            code = code + " ~ " + Html2GiftFilter( questionobj.answer2, "html" ) + endline;
            code = code + " ~ " + Html2GiftFilter( questionobj.answer3, "html" ) + endline;
            code = code + " ~] " +  Html2GiftFilter( questionobj.answer4, "html" ) + endline;
        }
    }
    else if( type == 2 ) { // Deux bonnes réponses
        if (points == 1) { /* Points négatifs */
            code = code + "// Two correct awswers : n°1 et n°2, With negative points"+endline+"{"+endline;
            code = code + " ~ %50% " + Html2GiftFilter( questionobj.answer1, "html" ) + endline;
            code = code + " ~ %50% " + Html2GiftFilter( questionobj.answer2, "html" ) + endline;
            code = code + " ~ %-33.33333% " + Html2GiftFilter( questionobj.answer3, "html" ) + endline;
            code = code + " ~ %-33.33333% " +  Html2GiftFilter( questionobj.answer4, "html" ) + endline;
        }
        else {
            code = code + "// Two correct awswers : n°1 et n°2, Without negative points"+endline+"{"+endline;
            code = code + " ~ %50% " + Html2GiftFilter( questionobj.answer1, "html" ) + endline;
            code = code + " ~ %50% " + Html2GiftFilter( questionobj.answer2, "html" ) + endline;
            code = code + " ~ " + Html2GiftFilter( questionobj.answer3, "html" ) + endline;
            code = code + " ~ " +  Html2GiftFilter( questionobj.answer4, "html" ) + endline;
        }
    }
    else if( type == 3 ) { // Trois bonnes réponses
        if (points == 1) { /* Points négatifs */
            code = code + "// Three correct awswers : n°1, n°2 et n°3, With negative points"+endline+"{"+endline;
            code = code + " ~ %33.33333% " + Html2GiftFilter( questionobj.answer1, "html" ) + endline;
            code = code + " ~ %33.33333% " + Html2GiftFilter( questionobj.answer2, "html" ) + endline;
            code = code + " ~ %33.33333% " + Html2GiftFilter( questionobj.answer3, "html" ) + endline;
            code = code + " ~ %-100% " +  Html2GiftFilter( questionobj.answer4, "html" ) + endline;
        }
        else {
            code = code + "// Three correct awswers : n°1, n°2 et n°3, Without negative points"+endline+"{"+endline;
            code = code + " ~ %33.33333% " + Html2GiftFilter( questionobj.answer1, "html" ) + endline;
            code = code + " ~ %33.33333% " + Html2GiftFilter( questionobj.answer2, "html" ) + endline;
            code = code + " ~ %33.33333% " + Html2GiftFilter( questionobj.answer3, "html" ) + endline;
            code = code + " ~ " +  Html2GiftFilter( questionobj.answer4, "html" ) + endline;
        }
    }
    else {// Quatre bonnes réponses
        code = code + "// Four correct awswers"+endline+"{"+endline;
        code = code + " ~ %25% " + Html2GiftFilter( questionobj.answer1, "html" ) + endline;
        code = code + " ~ %25% " + Html2GiftFilter( questionobj.answer2, "html" ) + endline;
        code = code + " ~ %25% " + Html2GiftFilter( questionobj.answer3, "html" ) + endline;
        code = code + " ~ %25% " +  Html2GiftFilter( questionobj.answer4, "html" ) + endline;
    }
    
    if( questionobj.feedback )
         code = code + " #### [html] " + Html2GiftFilter( questionobj.feedback ) + endline;
    
	code = code + "}";

return(code);
}

/* Bugs :

// Code incorrect créé

// Question 01
::01 - Consider the following Python program.
::[html] Consider the following Python program.<br>\n<pre><code>x\=4\nif&amp;nbsp;3*x-6&lt;0&amp;nbsp;\:\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;x\=1\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;r\=-1\nelse&amp;nbsp;\:\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;if&amp;nbsp;(true)&amp;nbsp;\:\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;print("coucou"')\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;x\=-1\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;r\=1</code></pre>What does the variable \( r \) contain at the end of the program?
// One correct awswer : n°1, With negative points
{
 = [html] 5
 ~%-33.33333% [html] 0
 ~%-33.33333% [html] x
 ~%-33.33333% [html] 2
}

// Code correct

// Question 01
::01 - Première question...
::[html] Première question...<br>\nConsider the following Python program.<br>\n<pre><code>x\=4\nif&nbsp;3*x-6<0&nbsp;\:\n&nbsp;&nbsp;&nbsp;&nbsp;x\=1\n&nbsp;&nbsp;&nbsp;&nbsp;r\=-1\nelse&nbsp;\:\n&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(true)&nbsp;\:\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("coucou")\n&nbsp;&nbsp;&nbsp;&nbsp;x\=-1\n&nbsp;&nbsp;&nbsp;&nbsp;r\=1</code></pre>What does the variable r contain at the end of the program?
// One correct awswer : n°1, With negative points
{
 = [html] 5
 ~%-33.33333% [html] 0
 ~%-33.33333% [html] x
 ~%-33.33333% [html] 2
}


// Code Moodle

// question: 579  name: Question depuis Moodle
::Question depuis Moodle::[html]<p dir\="ltr" style\="text-align\: left;">Voici du code...</p><p dir\="ltr" style\="text-align\: left;"></p><pre><code>x\=4\nif 3*x-6&lt;0 \:\n    x\=1\n    r\=-1\nelse \:\n    if (true) \:\n        print("coucou")\n    x\=-1\n    r\=1</code></pre><br><p></p><p dir\="ltr" style\="text-align\: left;">Voila !</p><p dir\="ltr" style\="text-align\: left;"><br></p>{
	=<p dir\="ltr" style\="text-align\: left;">A</p>
	~<p dir\="ltr" style\="text-align\: left;">B</p>
	~<p dir\="ltr" style\="text-align\: left;">C</p>
	~<p dir\="ltr" style\="text-align\: left;">D</p>
}


RESTE EN BUG :

Dans l'affichage du code, les doubles espaces dans la partie code sont affichés comme un seul espace, 
-> bien que le bouton copier fonctionne !
-> le copier coller ne fonctionne plus
*/

const SaveGift = (filename) => {
let questions = "";

    /* Build all questions */
    let max = ConfigMax();

    let theme = $("#id_theme").val();
    questions = "// Category\n";
    questions = questions + "$CATEGORY: $course$/" + theme ;

    for (let number = 1; number <= max; number++) {

        let questionobj = GetQuestion(number);
        if(questionobj) {
            let code = EncodeGift(questionobj, "\n", 'file');
            questions = questions+"\n\n"+code;
        }
    }

    const link = document.createElement("a");
    const file = new Blob([questions], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = filename+".txt";
    link.click();
    URL.revokeObjectURL(link.href);
 };
