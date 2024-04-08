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
                head: {
                    description:'Moodle MCQ GIFT/XML Maker tool',
                    title: 'MCQ for Moodle',
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
                    question: 'Question',
                    samples : 'Samples',
                    reset: 'Reset',
                    editor: 'Editor',
                    preview: 'Preview',
                    answers: 'Answers',
                    answer1 : 'Answer 1 (correct)',
                    answer2 : 'Answer 2',
                    answer3 : 'Answer 3',
                    answer4 : 'Answer 4',
                    feedback:'Global feedback (optionnal)',
                    questiononly: 'Question only:',
                    copy: 'COPY',
                    save: 'EXPORT',
              }
            }
          },
          fr: {
            translation: {
                head: {
                    description:'Outil de fabrication de QCM pour Moodle',
                    title: 'QCM pour Moodle',
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
                    question: 'Question',
                    samples : 'Exemples',
                    reset: 'RAZ',
                    editor: 'Éditeur',
                    preview: 'Aperçu',
                    answers: 'Réponses',
                    answer1 : 'Réponse 1 (correcte)',
                    answer2 : 'Réponse 2',
                    answer3 : 'Réponse 3',
                    answer4 : 'Réponse 4',
                    feedback: 'Retour global (optionnel)',
                    questiononly: 'Question uniquement:',
                    copy: 'COPIER',
                    save: 'EXPORTER',
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
                    question: 'Frage',
                    samples : 'Proben',
                    reset: 'Zurücksetzen',
                    editor: 'Herausgeber',
                    preview: 'Vorschau',
                    answers: 'Antworten',
                    answer1 : 'Antwort 1 (richtig)',
                    answer2 : 'Antwort 2',
                    answer3 : 'Antwort 3',
                    answer4 : 'Antwort 4',
                    feedback:'Global Rückmeldung (optionnal)',
                    questiononly: 'Nur Frage:',
                    copy: 'KOPIEREN',
                    save: 'EXPORT',
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
                    question: 'प्रश्न',
                    samples : 'नमूने',
                    reset: 'रीसेट',
                    editor: 'संपादक',
                    preview: 'पूर्वावलोकन',
                    answers: 'उत्तर',
                    answer1 : 'उत्तर 1 (सही)',
                    answer2 : 'उत्तर 2',
                    answer3 : 'उत्तर 3',
                    answer4 : 'उत्तर 4',
                    feedback:'वैश्विक प्रतिक्रिया (वैकल्पिक)',
                    questiononly: 'केवल प्रश्न:',
                    copy: 'कॉपी',
                    save: 'सहेजें',
              }
            }
          },
        }
      }, (err, t) => {
        if (err)
            return console.error(err);
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });
        rerender();
      });
  });