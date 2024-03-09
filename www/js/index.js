/*
*
* (C) obook 2020-2024
*
*/

import { Preview } from "./preview.js";
import { EncodeSnippet, Html2GiftFilter } from "./snippet.js";

var delay = 2
var counter = delay;
var clockId;

var format_gift = true;

var old_code = "";
var old_header = "";

function clock() {
    counter--;
    if(counter == 0)
    {
        Process();
        counter = delay+1;
    }
}

function SetFormatOutput(value) {
    if (value == 'GIFT') {
        console.log("SetFormatOutput:GIFT");
        format_gift = true;
        Process();
    }
    else {
        console.log("SetFormatOutput:XML");
        format_gift = false;
        Process(); 
    }
}

function Process()
{
	console.log("Process start...");
	
/* Création du résultat


GIFT
----
	
:: 11 - Échange pour trier
::["+format_reponse+"] Combien d'échange effectue la fonction Python suivante pour trier un tableau de 10 éléments au pire des cas ?
<br><br>
def tri(tab):<br>
&nbsp;&nbsp;for i in range (1, len(teb)):<br>
&nbsp;&nbsp;&nbsp;&nbsp;for j in range (len(tab)-i):<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if tab[j]>tab[j+]:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tab[j], tab[j+1] \= tab[j+1], tab[j] # échange des contenus<br>
{
= 45
~%-33.33333% 100
~%-33.33333% 10
~%-33.33333% 55
	####La couleur se trouve entre l'orange et le vert dans le spectre est le jaune.
}

Attention, encoder les deux points : avec \: !

Question avec du code HTML, on remarque les \n :

::06 - Attribut id::[plain]On considère le formulaire HTML suivant \: \n\n<form action\="action.php" method\="get" name\="prenom">\nPrénom \: <input type\="text" id\="champ1" name\="p"/> <br/>\n<input type\="hidden" name\="util" value\="1549"/>\n<input value\="Envoi du prénom" type\="submit"/>\n</form>\n\nLe prénom entré par l'utilisateur est contenu dans \:

XML
---

<!-- question: 680  -->
  <question type="multichoice">
    <name>
      <text>90 - Considere the code below</text>
    </name>
    <questiontext format="html">
      <text><![CDATA[Considere the code below:
<pre><code>class&nbsp;Voop&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String[]&nbsp;arg)&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doStuff(1);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;do&nbsp;Stuff(1,&nbsp;2);
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;insert&nbsp;code&nbsp;here
}</code></pre>
Which of the flollowing line(s) if inserted in line 6 above will compile?]]></text>
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber></idnumber>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    <showstandardinstruction>0</showstandardinstruction>
    <correctfeedback format="html">
      <text></text>
    </correctfeedback>
    <partiallycorrectfeedback format="html">
      <text></text>
    </partiallycorrectfeedback>
    <incorrectfeedback format="html">
      <text></text>
    </incorrectfeedback>
    <answer fraction="100" format="html">
      <text>static void doStuff(int... doArgs) { }</text>
      <feedback format="html">
        <text></text>
      </feedback>
    </answer>
    <answer fraction="-33.33333" format="html">
      <text>static void doStuff(int[] doArgs) { }</text>
      <feedback format="html">
        <text></text>
      </feedback>
    </answer>
    <answer fraction="-33.33333" format="html">
      <text>static void doStuff(int x, int... doArgs) { }</text>
      <feedback format="html">
        <text></text>
      </feedback>
    </answer>
    <answer fraction="-33.33333" format="html">
      <text>static void doStuff(int... doArgs, int y) { }</text>
      <feedback format="html">
        <text></text>
      </feedback>
    </answer>
  </question>
  
	*/
	
	var numero = $("#id_numero").val();
	var titre = $("#id_titre").val();
	var theme = $("#id_theme").val();
	var titre = numero + " - " + titre;
    var question_object = $("#id_question");
	var question = EncodeSnippet(question_object.val());

    // Il faut remplacer < par &lt; à l'intérieur de <pre><code></code></pre>

    var type = $("#id_question_type").val(); /* 1,2,3 ou 4 bonnes réponses */
    var points = $("#id_points_negatifs").val(); /* 0 = sans points négatifs, 1 = avec points négatifs */
	
	var header = theme + " : Q" + titre;
    if( old_header != header )
    {
        $("#id_header").html(header);
        old_header = header;
    }
    
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
    code = code + "// Category<br>\n";
	code = "$CATEGORY: $course$/" + theme + "<br>\n<br>\n";
	code = code + "::" + Html2GiftFilter( titre ) + "<br>\n";
    code = code + "// Question<br>\n";
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

    if( old_code != code )
    {
        code_object.html("<code>"+code+"<code>");
        old_code = code;
    }

    Preview();

    console.log("Process ended.");
}

clockId = setInterval(clock, 1000);
