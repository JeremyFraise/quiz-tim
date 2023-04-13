/**
 * TIM - QUIZ
 * @author: Jeremy Fraser;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const arrQuestion = document.querySelectorAll('.choixQuestion');
const arrDescriptionQuestion = document.querySelectorAll('.texteQuestion div');

const objJSON = {
    "retroactions": {
        "positive": "Bravo, c’est une bonne réponse !",
        "negative": "Désolé, ce n’est pas la bonne réponse"
    },
    "explications": {
        "Q1": "En effet, le réalisme n’est pas un principe fondamental de l’animation. Il s'agit en réalité d'une approche parmi tant d'autre du style de l'art. Le niveau de détails d’une oeuvre est lié au style et à l’atmosphère que l’artiste souhaite transmettre.",
        "Q2": "Explications de la question 2",
        "Q3": "Explications de la question 3"
    },
    "bonnesReponses": [
        "Q1D",
        "Q2C",
        "Q3B"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note33": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note66": "Bravo, vous avez une bonne connaissance générale de ...",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};

/* Objet Quiz */
const quiz = {

    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,
    refDepart: document.querySelector('.depart'),
    arrQuestion: document.querySelectorAll(".question"),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),
    // arrBoutonsQuestions: document.querySelectorAll('#btnValider'),

    initierQuiz: function () {
        // Afficher l'intro  
        this.refDepart.classList.remove('visuallyhidden');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'Démarrer le quiz';
        this.refDepart.appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.arrQuestion.forEach(function (refQuestion) {
            console.log(refQuestion.classList);
            refQuestion.classList.add('visuallyhidden');
        })
        // Cacher le bouton de soumission du formulaire
        this.refCtnBoutonSubmit.classList.add('visuallyhidden');
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refDepart.classList.add('visuallyhidden');
        // Afficher la première question
        this.afficherQuestion(this.intNoQuestion);
    },
    afficherQuestion: function (numeroQuestion) {
        // Mettre à jour le numéro de la question
        this.intNoQuestion = numeroQuestion;
        // Afficher la question
        this.arrQuestion[numeroQuestion].classList.remove('visuallyhidden');
        // Créer un paragraphe
        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');
        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
        this.arrQuestion[numeroQuestion].appendChild(refCtnBouton);
        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },

    /**
     * Affiche l'image associé à la réponse sélectionner
     * @param {number} intNoDiv 
     */
    selectionImage: function (intNoDiv) {

        const refCtnBouton = document.querySelector(".ctnBouton__bouton");

        for(let index = 0; index < arrDescriptionQuestion.length; index++) {

            if(arrDescriptionQuestion[index].classList != 'visuallyhidden') {
                arrDescriptionQuestion[index].classList.add('visuallyhidden');
            }
        }
        arrDescriptionQuestion[intNoDiv].classList.remove('visuallyhidden');

        refCtnBouton.disabled = false;

    },



    validerReponse: function (idReponse) {

        console.log(idReponse);
        let strQuestion = idReponse.substr(0,2);
        console.log(strQuestion);

        // Vérifie si l'utilisateur est près à poursuivre le jeu
        if(this.arrBoutonsQuestions[0].innerText == "Poursuivre") {
            console.log("ajoute et enlève class")
            this.arrQuestion[0].classList.add("visuallyhidden");
            this.arrQuestion[1].classList.remove("visuallyhidden");

        }
        else{
            if(idReponse != "") {
                if(idReponse === objJSON.bonnesReponses[0]) {
                    document.querySelector('#question1 .messageBonneReponse').classList.remove('visuallyhidden');
                    document.querySelector('#question1 .messageBonneReponse h3').innerText = objJSON.retroactions.positive;
                    document.querySelector('#question1 .messageBonneReponse p').innerText = objJSON.explications[strQuestion];
                }
                else {
                    document.querySelector('#question1 .messageMauvaiseReponse').classList.remove('visuallyhidden');
                    document.querySelector('#question1 .messageMauvaiseReponse h3').innerText = objJSON.retroactions.negative;
                    document.querySelector('#question1 .messageMauvaiseReponse p').innerText = objJSON.explications.strQuestion;
                }
                this.arrBoutonsQuestions[0].innerText = "Poursuivre";
            }
        }
    },

    afficherResultats: function () {
        // Contenu
    }
    
};
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});
// document.getElementById('btnCommencer').addEventListener('click', function() {
//      quiz.debuterQuiz();
// });
for(let index = 0; index < arrQuestion.length; index++) {
    arrQuestion[index].addEventListener('click', function() {
        quiz.selectionImage(index);
    });
}
    

