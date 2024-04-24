/*
*
* (C) obook 2020-2024
*
* from https://dev.to/adrai/the-progressive-guide-to-jquery-internationalization-i18n-using-i18next-3dc3
*
*/
const lngs = {
    en: { nativeName: 'English' },
    fr: { nativeName: 'French' },
    de: { nativeName: 'German' },
    hi: { nativeName: 'Hindi' },
  };
  
const rerender = () => {
    $('body').localize();
    $('title').text($.t('head.title'))
    $('meta[name=description]').attr('content', $.t('head.description'))
  }

$(function () {
    i18next
      .use(i18nextBrowserLanguageDetector)
      .init({
        debug: false,
        fallbackLng: 'en',
        resources: {
          en: {
            translation: {
              key : '{{what}} is {{how}}',
                head: {
                    description:'Moodle MCQ GIFT/XML Maker tool',
                    title: 'MCQ-Moodle',
                },
                nav: {
                  home: 'Home',
                  page1: 'Page One',
                  page2: 'Page Two',
                  page3: 'Page Three',
                },
              index: {
                    settings: 'Settings',
                    category: 'Category',
                    outcode: 'Code',
                    type1: 'One correct awswer',
                    type2: 'Two correct awswer',
                    type3: 'Three correct awswer',
                    type4: 'Four correct awswer',
                    withnegativepoints : 'With negative points',
                    withoutnegativepoints:'Without negative points',
                    close: 'Close',
                    save: 'Save',
                    question: 'Question',
                    samples : 'Samples',
                    reset: 'Reset',
                    editor: 'Editor',
                    preview: 'Preview',
                    answers: 'Answers',
                    answer1 : 'Answer a',
                    answer2 : 'Answer b',
                    answer3 : 'Answer c',
                    answer4 : 'Answer d',
                    feedback:'Global feedback (optionnal)',
                    questiononly: 'Question only:',
                    copy: 'COPY',
                    save: 'EXPORT',
                    clear: 'Clear all ?',
              },
              sample : {
                python: "Question about Python function.<pre><code>def Syracuse(n):\n    if n%2==0:\n        n = n//2\n    else:\n        n = 3*n+1\n    return n </code></pre>What return Syracuse(100)?",
                html: "Question about HTML.<pre><code><html>\n    <body>\n        ... Clic !</button>\n        <h1><span id=\"number\">2000</span></h1>\n    </body>\n</html></code></pre>What missing?",
                math: "Some math samples\n Inline \\( \\sqrt{2} \\)\nDisplayed $$ 2x^2-3x+1 $$"
              }
            }
          },
          fr: {
            translation: {
                head: {
                    description:'Outil de fabrication de QCM pour Moodle',
                    title: 'QCM-Moodle',
                },
                index: {
                    settings: 'Réglages',
                    category: 'Catégorie',
                    outcode: 'Sortie',
                    type1: 'Une question correcte',
                    type2: 'Deux questions correctes',
                    type3: 'Trois questions correctes',
                    type4: 'Quatre questions correctes',
                    withnegativepoints : 'Avec points négatifs',
                    withoutnegativepoints:'Sans points négatifs',
                    close: 'Fermer',
                    save: 'Enregistrer',
                    question: 'Question',
                    samples : 'Exemples',
                    reset: 'RAZ',
                    editor: 'Éditeur',
                    preview: 'Aperçu',
                    answers: 'Réponses',
                    answer1 : 'Réponse a',
                    answer2 : 'Réponse b',
                    answer3 : 'Réponse c',
                    answer4 : 'Réponse d',
                    feedback: 'Retour global (optionnel)',
                    questiononly: 'Question uniquement:',
                    copy: 'COPIER',
                    export: 'EXPORTER',
                    clear: 'Tout effacer ?',
              },
              sample : {
                python: "Voici du code Python.<pre><code>def Syracuse(n):\n    if n%2==0:\n        n = n//2\n    else:\n        n = 3*n+1\n    return n </code></pre>Que retourne Syracuse(100)?",
                html: "Voici du code HTML.<pre><code><html>\n    <body>\n        ... Clic !</button>\n        <h1><span id=\"number\">2000</span></h1>\n    </body>\n</html></code></pre>Que manque t-il?",
                math: "Exemple pour les mathématiques\n Mode Inline \\( \\sqrt{2} \\) (intégré)\n Mode Displayed $$ 2x^2-3x+1 $$"
              }
            }
          },
          de: {
            translation: {
                head: {
                    description:'Moodle MCQ GIFT/XML Maker tool',
                    title: 'MCQ for Moodle',
                },
              index: {
                    settings: 'Einstellungen',
                    category: 'Kategorie',
                    outcode: 'Code',
                    type1: 'Eine richtige Antwort',
                    type2: 'Zwei richtige Antworten',
                    type3: 'Drei richtige Antworten',
                    type4: 'Vier richtige Antworten',
                    withnegativepoints : 'Mit negativen Punkten',
                    withoutnegativepoints:'Ohne negative Punkte',
                    close: 'Schließen',
                    save: 'Speichern',
                    question: 'Frage',
                    samples : 'Proben',
                    reset: 'Zurücksetzen',
                    editor: 'Herausgeber',
                    preview: 'Vorschau',
                    answers: 'Antworten',
                    answer1 : 'Antwort a',
                    answer2 : 'Antwort b',
                    answer3 : 'Antwort c',
                    answer4 : 'Antwort d',
                    feedback:'Global Rückmeldung (optionnal)',
                    questiononly: 'Nur Frage:',
                    copy: 'KOPIEREN',
                    export: 'EXPORT',
                    clear: 'Alles löschen ?',
              },
              sample : {
                python: "Frage zur Python-Funktion.<pre><code>def Syracuse(n):\n    if n%2==0:\n        n = n//2\n    else:\n        n = 3*n+ 1\n    return n </code></pre>Was gibt Syracuse(100) zurück?",
                html: "Frage zur HTML.<pre><code><html>\n    <body>\n        ... Clic !</button>\n        <h1><span id=\"number\">2000</span></h1>\n    </body>\n</html></code></pre>What missing?",
                math: "Beispiel für Mathematik\n Inline \\( \\sqrt{2} \\)\nDisplayed $$ 2x^2-3x+1 $$"
              }
            }
          },
          hi: {
            translation: {
                head: {
                    description:'मूडल एमसीक्यू गिफ्ट/एक्सएमएल मेकर टूल',
                    title: 'MCQ for Moodle',
                },
              index: {
                    settings: 'सेटिंग्स',
                    category: 'श्रेणी',
                    outcode: 'कोड',
                    type1: 'एक सही उत्तर',
                    type2: 'दो सही उत्तर',
                    type3: 'तीन सही उत्तर',
                    type4: 'चार सही उत्तर',
                    withnegativepoints : 'नकारात्मक बिंदुओं के साथ',
                    withoutnegativepoints: 'नकारात्मक बिंदुओं के बिना',
                    close: 'बंद करें',
                    save: 'बचाना',
                    question: 'प्रश्न',
                    samples : 'नमूने',
                    reset: 'रीसेट',
                    editor: 'संपादक',
                    preview: 'पूर्वावलोकन',
                    answers: 'उत्तर',
                    answer1 : 'उत्तर a',
                    answer2 : 'उत्तर b',
                    answer3 : 'उत्तर c',
                    answer4 : 'उत्तर d',
                    feedback:'वैश्विक प्रतिक्रिया (वैकल्पिक)',
                    questiononly: 'केवल प्रश्न:',
                    copy: 'कॉपी',
                    export: 'सहेजें',
                    clear: 'सभी साफ करें ?',
              }
            },
            sample : {
              python: "Python के बारे में प्रश्न<pre><code>def Syracuse(n):\n    if n%2==0:\n        n = n//2\n    else:\n        n = 3*n+1\n    return n </code></pre>क्या वापसी Syracuse(100)?",
              html: "HTML के बारे में प्रश्न.<pre><code><html>\n    <body>\n        ... Clic !</button>\n        <h1><span id=\"number\">2000</span></h1>\n    </body>\n</html></code></pre>क्या कमी है?",
              math: "गणित के लिए उदाहरण\n इनलाइन मोड\n Inline \\( \\sqrt{2} \\)\nDisplayed $$ 2x^2-3x+1 $$"
            }
          },
        }
      }, (err, t) => {
        if (err)
            return console.error(err);
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });
/*
        // fill language switcher
        Object.keys(lngs).map((lng) => {
          const opt = new Option(lngs[lng].nativeName, lng);
          if (lng === i18next.resolvedLanguage) {
            opt.setAttribute("selected", "selected");
          }
          $('#languageSwitcher').append(opt);
        });

        $('#languageSwitcher').change((a, b, c) => {
          const chosenLng = $(this).find("option:selected").attr('value');

          console.log("chosenLng=", chosenLng, "a,b,c=", a, b, c);

          let newchosenLng = "de";

          i18next.changeLanguage(newchosenLng, () => {
            rerender();
          });
        });

*/
        rerender();
      });
  });