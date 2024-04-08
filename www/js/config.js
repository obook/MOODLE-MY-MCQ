/*
*
* (C) obook 2020-2024
*
*/

export { ConfigMax, ConfigTheme, ConfigFormatOutput, ConfigQuestionOnly, ConfigNegativePoints, ConfigClear};

let ConfigObjkey = "CONFv1.1";

function ConfigObject(version) {
    let conf = {
        version: ConfigObjkey,
        category: "Default bank category", /* Bank thema */
        format: "GIFT", /* GIFT or XML */ 
        questiononly: false, /* Print question only or not */
        max: 1, /* Maximum questions */
        negativepoints: true,
    };
return conf;
}

let conf = ConfigObject();

function LoadConfig() {
    if(!localStorage.getItem(ConfigObjkey)) /* La configuration n'existe pas */
        localStorage.setItem(ConfigObjkey, JSON.stringify(conf));
    else
        conf = JSON.parse(localStorage.getItem(ConfigObjkey));
return(conf);
}

function ConfigMax(number=null) {
    // Charger la config
    conf = LoadConfig();

    // Régler le max
    let max = conf.max;
    if( number > conf.max) {
        conf.max = number;
        localStorage.setItem(ConfigObjkey, JSON.stringify(conf));
    }
return(conf.max);
}

function ConfigTheme(category=null) {
    // Charger la config
    conf = LoadConfig();

    // Régler la catégorie
    if(category) {
        conf.category = category;
        localStorage.setItem(ConfigObjkey, JSON.stringify(conf));
    }
return(conf.category)
}

function ConfigFormatOutput(format=null) {
    // Charger la config
    conf = LoadConfig();

    // Régler la catégorie
    if(format) {
        conf.format = format;
        localStorage.setItem(ConfigObjkey, JSON.stringify(conf));
    }

return(conf.format)
}

function ConfigQuestionOnly(value=null) {
    // Charger la config
    conf = LoadConfig();

    // Régler la catégorie
    if(value != null) {
        conf.questiononly = value;
        localStorage.setItem(ConfigObjkey, JSON.stringify(conf));
    }

return(conf.questiononly)
}

function ConfigNegativePoints(negativepoints=null) { /* 1 = with , 0 = without */
    // Charger la config
    conf = LoadConfig();

    // Régler la catégorie
    if(negativepoints != null) {
        conf.negativepoints = negativepoints;
        localStorage.setItem(ConfigObjkey, JSON.stringify(conf));
    }

return(conf.negativepoints)
}

function ConfigClear() {
    // Charger la config
    conf = LoadConfig();
    conf.max = 1;
    localStorage.setItem(ConfigObjkey, JSON.stringify(conf));
}

