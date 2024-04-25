/*
*
* (C) obook 2020-2024
*
*/
export {EncodeSnippet, Html2GiftFilter, Html2AnswerFilter, Html2XMLFilter, Html2PreviewFilter, GetFirstLine};

function GiftFilter(string) {
    string = string.replaceAll('=', '\\=');
    string = string.replaceAll(':', '\\:');
    string = string.replaceAll('{', '\\{');
    string = string.replaceAll('}', '\\}');
    string = string.replaceAll('~', '\\~');
    string = string.replaceAll('#', '\\#');
return(string);
}

function Html2GiftFilter(string, tofile=false) {

    string = GiftFilter(string);

    // Line feed
    string = string.replaceAll('\u000A', '\\n');

    if(tofile) {
        return(string);
    }

    string = string.replaceAll('<', '&lt;');
    string = string.replaceAll('>', '&gt;');

return(string);
}

function Html2AnswerFilter(string, tofile=false) {
    string = GiftFilter(string);

     if(tofile) {
        string = string.replaceAll('<', '&lt;');
        string = string.replaceAll('>', '&gt;');
     }
     else {
        string = string.replaceAll('<', '&amp;lt;');
        string = string.replaceAll('>', '&amp;gt;');       
     }
return(string);
}
 
function Html2PreviewFilter(string) {
    string = string.replaceAll('<', '&lt;');
    string = string.replaceAll('>', '&gt;');
return(string);
 }

function Html2XMLFilter(string, format) {
    if( format == "apercu" )
        return(string);
    string = string.replaceAll('<', '&lt;');
    string = string.replaceAll('>', '&gt;');
    // string = string.replaceAll('\t', '');
return(string);
}

/*

Only support ONE source code.
tags "pre" and "code" in LOWCASE

tofile=false => print inside webpage

*/

function EncodeSnippet(question, tofile=false) {
let start_code = false;
let index_start = -1;
let index_end = -1;
let succeed = false;

    // console.log("EncodeSnippet:QUESTION=["+question+"] to file=",tofile);

    // test

    //EncodeSnippetNew(question, tofile);

    for (let i = 0; i < question.length-1; i++) {
        let c = question[i];
        let start_tag_code = question.slice(i, i+6).toLowerCase();
        let end_tag_code = question.slice(i, i+7).toLowerCase();

        if ( start_tag_code.indexOf("<code>") == 0 ) {
            // console.log("ScanForCode début '<code>' détecté.")
            start_code = true;
            index_start = i;
        }
        else if ( end_tag_code.indexOf("</code>") == 0 ) {
            // console.log("ScanForCode fin '</code>' détecté.")
            start_code = false;
            index_end = i;

            let begin = question.slice(0, index_start+6);
            let code = question.slice(index_start+6, index_end);
            let end = question.slice(index_end, question.length);

            begin = begin.replace(/(\r\n|\r|\n)/g, '<br>\n');

            if(tofile) {
                code = code.replaceAll("<","&lt;");
                code = code.replaceAll(">","&gt;");
            }
            else{
                code = code.replaceAll("<","&amp;lt;");
                code = code.replaceAll(">","&amp;gt;");               
            }

            /*
            if (tofile)
               code = code.replaceAll(" ","nbsp;");
            */

            end = end.replace(/(\r\n|\r|\n)/g, '<br>\n');

            question = begin+code+end;
            succeed = true;

        /*   
            console.log("EncodeSnippet:BEGIN=["+begin+"]");
            console.log("EncodeSnippet:CODE=["+code+"]");
            console.log("EncodeSnippet:END=["+end+"]");
            console.log("EncodeSnippet:NEW QUESTION=["+question+"]");
    
        */
            break;
        }
    }
return(question)
}

/*
Support multi codes snippets : problèmes à l'export
 */
function EncodeSnippetProjet(question, tofile=false)
{
    question = question.replace(/(\r\n|\r|\n)/g, '<br>');
    const regexp = /<pre><code>(.*?)<\/code><\/pre>/g;
    const codes = [...question.matchAll(regexp)];

    for (let i = 0; i < codes.length; i++) {

        let code = codes[i][1];
        let new_code = code;

        //console.log("EncodeSnippetNew:code #",i," = [", code,"]\n********************************************");

        if(tofile) {
            new_code = new_code.replaceAll("<","&lt;");
            new_code = new_code.replaceAll(">","&gt;");
        }
        else{
            new_code = new_code.replaceAll("<","&amp;lt;");
            new_code = new_code.replaceAll(">","&amp;gt;");               
        }

        question = question.replaceAll(code, new_code);

        //console.log("EncodeSnippetNew:Newcode #",i," = [", code,"]\n********************************************");

    }

    return(question);
}


function GetFirstLine(str) {
let car;
    var splitters = [".", "?", "!", ":", "&", "<", "...", "\n"]; /* Priority order */
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < splitters.length; j++) {
            if (str[i]==splitters[j]) {
                return str.substring(0, i);
            }
        }
    }
return("Question...");
}
