/*
*
* (C) obook 2020-2024
*
*/
export {EncodeSnippet, Html2GiftFilter, Html2XMLFilter, GetFirstLine};

/*
format :
"hml" for website
"text" for ? (ex-preview ?)
"file" for save to file
*/
function Html2GiftFilter(string, tofile=false) {
   /* if(!html)  ? 
        return(string);
*/
    string = string.replaceAll('=', '\\=');
    string = string.replaceAll(':', '\\:');
    string = string.replaceAll('{', '\\{');
    string = string.replaceAll('}', '\\}');
    string = string.replaceAll('~', '\\~');
    string = string.replaceAll('#', '\\#');
    // Line feed
    string = string.replaceAll('\u000A', '\\n');
    
    if(tofile)
    {
        return(string);
    }

    string = string.replaceAll('<', '&lt;');
    string = string.replaceAll('>', '&gt;');

return string;
}

function Html2XMLFilter(string, format) {
    if( format == "apercu" )
        return(string);
    string = string.replaceAll('<', '&lt;');
    string = string.replaceAll('>', '&gt;');
    // string = string.replaceAll('\t', '');
return string;
}

/*

Only support ONE source code.
tags "pre" and "code" in LOWCASE

preview = print for web

*/

function EncodeSnippet(question, tofile=false) {
let start_code = false;
let index_start = -1;
let index_end = -1;
let succeed = false;

    // console.log("EncodeSnippet:QUESTION=["+question+"] to file=",tofile);

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
                code = code.replaceAll("<","&lt;"); /* &amp;lt;" ? */
                code = code.replaceAll(">","&gt;");
            }
            else{
                code = code.replaceAll("<","&amp;lt;"); /* &amp;lt;" ? */
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
/*
    if (succeed == true)
        EncodeSnippet(question, preview);
  */  
return(question)
}

function GetFirstLine(s) {
let car;
    var splitters = ["\n", "?", ".", ":", "<br>", "..."];
    for (car of splitters) {
        if( s.includes(car) )
        {
            s = s.split(car)[0];
            return s;
        }
    }
return("Question...");
}
