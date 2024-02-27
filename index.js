var delay = 2
var counter = delay;
var intervalId = null;

function clock() 
{
    counter--;
    if(counter == 0)
    {
        Process();
        counter = delay+1;
    }
}

function Html2GiftFilter(string, format)
{
    if( format == "apercu" )
        return(string);
    
    string = string.replace(/:/g, '\:')
    string = string.replace(/{/g, '\\{')
    string = string.replace(/}/g, '\\}')
    string = string.replace(/=/g, '\\=')
    string = string.replace(/~/g, '\\~')
    string = string.replace(/#/g, '\\#')
    string = string.replace(/</g, '&lt;')
    string = string.replace(/>/g, '&gt;')
return string;
}

var old_apercu = "";
var old_apercu_title = "";
var old_code = "";
var old_header = "";
    
function Process()
{
	console.log("Formattage");
	
/* Création du résultat 
	
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

	*/
	
	var numero = $("#id_numero").val();
	var titre = $("#id_titre").val();
	var theme = $("#id_theme").val();
	var titre = numero + " - " + titre;
	var question = $("#id_question").val();
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
	code = "$CATEGORY: $course$/" + theme + "<br>\n<br>\n";
	code = code + "::" + Html2GiftFilter( titre ) + "<br>\n";
	code = code + "::["+format_question+"] " + Html2GiftFilter( question ) + "<br>\n";
	
    if( type == 1 ) // Une bonne réponse
    {
        if (points == 1) /* Points négatifs */
        {
            code = code + "// Une seule bonne réponse : n°1, avec points négatifs<br>\n{<br>\n";
            code = code + "&nbsp; = ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";
        }
        else
        {
            code = code + "// Une seule bonne réponse : n°1, sans points négatifs<br>\n{<br>\n";
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
            code = code + "// Deux bonnes réponses : n°1 et n°2, avec points négatifs<br>\n{<br>\n";
            code = code + "&nbsp; ~%50% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%50% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-33.33333% ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";
        }
        else
        {
            code = code + "// Deux bonnes réponses : n°1 et n°2, sans points négatifs<br>\n{<br>\n";
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
            code = code + "// Trois bonnes réponses : n°1, n°2 et n°3, avec points négatifs<br>\n{<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%-100% ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";
        }
        else
        {
            code = code + "// Trois bonnes réponses : n°1, n°2 et n°3, sans points négatifs<br>\n{<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse1, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse2, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~%33.33333% ["+format_reponse+"] " + Html2GiftFilter( reponse3, format_reponse ) + "<br>\n";
            code = code + "&nbsp; ~ ["+format_reponse+"] " +  Html2GiftFilter( reponse4, format_reponse ) + "<br>\n";          
        }
    }
    else // Quatre bonnes réponses
    {
        code = code + "// Quatres bonnes réponses<br>\n{<br>\n";
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
	
    if( old_code != code )
    {
        $("#id_result").html("<code>"+code+"<code>");
        old_code = code;
    }
	
	var apercu;
	
	apercu = question;
	apercu = apercu + "<br>\n<br>\n";	
	apercu = apercu + "a. &nbsp;&nbsp;" + Html2GiftFilter( reponse1, "apercu" ) + "<br>\n";	
	apercu = apercu + "b. &nbsp;&nbsp;" + Html2GiftFilter( reponse2, "apercu" ) + "<br>\n";
	apercu = apercu + "c. &nbsp;&nbsp;" + Html2GiftFilter( reponse3, "apercu" ) + "<br>\n";
	apercu = apercu + "d. &nbsp;&nbsp;" + Html2GiftFilter( reponse4, "apercu" ) + "<br>\n";
    
    if( feedback )
    {
         apercu = apercu + "<br>\nFeedback: " + feedback;
    }

    if( old_apercu != apercu )
    {
        var math = document.getElementById("id_apercu");
        $("#id_apercu").html(apercu);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
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

intervalId = setInterval(clock, 1000);
