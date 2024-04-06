/*
*
* (C) obook 2020-2024
*
*/
$(function () {
    i18next
      .use(i18nextBrowserLanguageDetector)
      .init({
        debug: false,
        fallbackLng: 'en',
        resources: {
          en: {
            translation: {
              index: {
                    settings: 'Settings',
                    category: 'Category',
                    outcode: 'Code',
                    type1: 'One correct awswer',
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
                    code: '(copy into a text editor then import in questions bank)',
                    copy: 'COPY',
                    save: 'SAVE',
              }
            }
          },
          fr: {
            translation: {
                index: {
                    settings: 'Réglages',
                    category: 'Catégorie',
                    outcode: 'Sortie',
                    type1: 'Une question correcte',
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
                    code: '(copier dans un éditeur de texte puis l\'importer dans la banque de question)',
                    copy: 'COPIER',
                    save: 'SAUVEGARDER',
              }
            }
          },
        }
      }, (err, t) => {
        if (err)
            return console.error(err);
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });
        $('body').localize();
      });
  });