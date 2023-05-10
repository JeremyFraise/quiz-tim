/**
 * @file Initialise le quiz
 * @author: Jeremy Fraser;
 * @version 1
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */

const objJSON = {
    "retroactions": {
        "positive": "Bravo!",
        "negative": "Mince!"
    },
    "explications": {
        "Q1": "En effet, le réalisme n’est pas un principe fondamental de l’animation. Il s'agit en réalité d'une approche parmi tant d'autre du style de l'art. Le niveau de détails d’une oeuvre est lié au style et à l’atmosphère que l’artiste souhaite transmettre.",
        "Q2": "Il s'agit du principe de compression/étirement. Au moment d'attérir, la balle s'étire en longueur et puis se compresse en hauteur alors que lors du rebond, la balle se décompresse et retrouve sa taille d'origine.",
        "Q3": "Il s'agit donc du principe d'anticipation. Le saut que prend l'objet vient après une courte préparation, annonçant l'action."
    },
    "bonnesReponses": [
        "Q1D",
        "Q2D",
        "Q3A"
    ],
    "messages": {
        "note0": "Tu pourrait faire mieux. Je te suggère de recommencer pour augmenter ton score",
        "note33": "Tu pourrais faire mieux. Je te suggère de recommencer pour augmenter ton score",
        "note66": "Tu as une bonne connaissance générale de l'animation",
        "note100": "Tu es un fin connaisseur!"
    }
};

/* Objet Quiz */

const quiz = {
    intNumeroQuestion: 1,
    intNoQuestion: 0,
    intNbBonnesReponses: 0,
    intNbQuestions: 3,
    
    refDepart: document.querySelector('.depart'),
    refReponseChoisie: null,
    refLabelReponseChoisi: null,
    refResultat: document.querySelector('.resultat'),

    arrLabelChoixCourant: null,
    arrQuestion: document.querySelectorAll(".question"),
    arrLabelChoixTotal: document.querySelectorAll(".texteQuestion"),
    arrChoixQuestion: document.querySelectorAll('.choixQuestion'),
    arrDescriptionQuestion: document.querySelectorAll('.descriptionCache'),
    arrPositionBonnesReponses: new Array(3, 3, 0),

    /**
     * Initialise le jeu
     */
    initierQuiz: function () {

        // Afficher l'intro  
        this.refDepart.classList.remove('cache');
        for(let index = 0; index < this.arrQuestion.length; index++) {
            this.arrQuestion[index].classList.add('cache');
        }

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'Démarrer le quiz';
        refBoutonStart.classList.add('boutonDepart')
        this.refDepart.appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.arrQuestion.forEach(function (refQuestion) {
            refQuestion.classList.add('cache');
        })

        // Cache le bouton pour soumettre
        const refBtnSubmit = document.getElementById('btnSubmit');
        refBtnSubmit.classList.add('cache');

        // this.refCtnBoutonSubmit.classList.add('cache');

        const refConteneur = document.querySelector(".conteneurResultat"); 

        const refCtnBoutonRecommencer = document.createElement('div');
        refCtnBoutonRecommencer.classList.add('ctnBoutonRecommencer');
        // Y ajouter le bouton de validation de la question 
        refCtnBoutonRecommencer.innerHTML = '<button type="button" class="ctnBoutonRecommencer__bouton">Recommencer le quiz</button>';
        // Ajouter un écouteur d'événement au bouton
        refConteneur.append(refCtnBoutonRecommencer);
        refCtnBoutonRecommencer.querySelector('.ctnBoutonRecommencer__bouton').addEventListener('click', this.reinitialiserQuiz.bind(this));

    },

    /**
     * Cache la page de départ
     */
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refDepart.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion();
    },

    /**
     * Affiche la première question et crée un bouton pour valider la réponse
     */
    afficherQuestion: function () {
        this.arrLabelChoixCourant = document.querySelectorAll("#question" + this.intNumeroQuestion + " .texteQuestion");
        // Afficher la question
        this.arrQuestion[this.intNoQuestion].classList.remove('cache');
        // Créer un paragraphe
        const refCtnBouton = document.createElement('div');
        refCtnBouton.classList.add('ctnBouton');
        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
        this.arrQuestion[this.intNoQuestion].appendChild(refCtnBouton);
        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },

    /**
     * Affiche l'image associé à la réponse sélectionnée
     * @param {number} intNoRep 
     */
    selectionImage: function (intNoRep) {

        // Récupère le bouton de la question
        const refCtnBouton = document.querySelector(".ctnBouton__bouton");
        // Ajoute la classe visuallyhidden aux descriptions qui ne l'ont plus (ex: Après avoir changé de choix de réponse, la description de la réponse choisi auparavant sera caché.)
        for(let index = 0; index < this.arrDescriptionQuestion.length; index++) {
            if(this.arrDescriptionQuestion[index].classList != 'cache') {
                this.arrDescriptionQuestion[index].classList.add('cache');
                this.arrDescriptionQuestion[index].classList.remove('animationDescription');
            }
        }
        // Enlève la classe visuallyhidden à la description de l'input selectionné
        this.arrDescriptionQuestion[intNoRep].classList.remove('cache');
        this.arrDescriptionQuestion[intNoRep].classList.add('animationDescription');
        this.arrLabelChoixTotal[intNoRep].scrollIntoView() // Solution trouvé sur https://stackoverflow.com/questions/5007530/how-do-i-scroll-to-an-element-using-javascript
        // Récupère l'input de la réponse sélectionnée
        this.refReponseChoisie = this.arrChoixQuestion[intNoRep];
        this.refLabelReponseChoisi = this.arrLabelChoixTotal[intNoRep];
        // Active le bouton de validation
        refCtnBouton.disabled = false;
    },


    /**
     * Valider la réponse choisie par l'utilisateur
     * @param {object} refBouton 
     */
    validerReponse: function (refBouton) {

        // À l'aide du intBonneReponseCourante qui recupère la position de la réponse correspondant à la question dans le arrPositionBonnesReponses, on cible le label de la réponse
        let intBonneReponseReponseCourante = this.arrPositionBonnesReponses[this.intNoQuestion];
        let refLabelBonneReponse = this.arrLabelChoixCourant[intBonneReponseReponseCourante];

        // Cible le bouton de la question
        const refBoutonCourant = refBouton.currentTarget;
        // this.arrLabelChoixCourant = document.querySelectorAll("#question" + this.intNumeroQuestion + " .texteQuestion");
       
        let strIdReponse = this.refReponseChoisie.id;
        let strQuestion = strIdReponse.substr(0,2);


        // Vérifie si l'utilisateur a déjà répondu et qu'il est prêt à poursuivre
        if(refBoutonCourant.innerText == "Poursuivre") {
            refBoutonCourant.remove();
            this.arrQuestion[this.intNoQuestion].classList.add("cache");
            this.arrQuestion[this.intNoQuestion].querySelector('.enonceQuestion').scrollIntoView();
            this.intNoQuestion++;
            this.intNumeroQuestion++;
            // Si l'utilisateur est encore aux trois questions
            if(this.intNoQuestion < this.intNbQuestions) {
                this.arrLabelChoixCourant = document.querySelectorAll("#question" + this.intNumeroQuestion + " .texteQuestion");
                this.arrQuestion[this.intNoQuestion].classList.remove("cache");

                const refCtnBouton = document.createElement('div');
                refCtnBouton.classList.add('ctnBouton');
                // Y ajouter le bouton de validation de la question 
                refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
                this.arrQuestion[this.intNoQuestion].appendChild(refCtnBouton);
                // Ajouter un écouteur d'événement au bouton
                refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
            }
            // Sinon il a terminé
            else{
               this.afficherResultats();
            }

        }
        else{
            // Vérifie l'exactitude de la réponse
            if(strIdReponse === objJSON.bonnesReponses[this.intNoQuestion]) {
                // Ajoute la classe bonneReponse au label du choix sélectionné (this.refLabelReponseChoisi)
                this.refLabelReponseChoisi.classList.add('bonneReponse');
                // Dévoile les rétroactions
                document.querySelector('#question' + this.intNumeroQuestion + ' .messageBonneReponse').classList.remove('cache');
                document.querySelector('#question' + this.intNumeroQuestion + ' .messageBonneReponse h3').innerText = objJSON.retroactions.positive;
                document.querySelector('#question' + this.intNumeroQuestion + ' .messageBonneReponse p').innerText = objJSON.explications[strQuestion];

                this.intNbBonnesReponses++;
            }
            else {
                // Ajoute la classe mauvaiseReponse au choix sélectionné (this.refReponseChoisie) et dévoile la vrai réponse (refLabelBonneReponse)
                refLabelBonneReponse.classList.add('bonneReponse');
                this.refLabelReponseChoisi.classList.add('mauvaiseReponse');
                // Dévoile les rétroactions
                document.querySelector('#question' + this.intNumeroQuestion + ' .messageMauvaiseReponse').classList.remove('cache');
                document.querySelector('#question' + this.intNumeroQuestion + ' .messageMauvaiseReponse h3').innerText = objJSON.retroactions.negative;
                document.querySelector('#question' + this.intNumeroQuestion + ' .messageMauvaiseReponse p').innerText = objJSON.explications[strQuestion];
            };

            // Change le texte du bouton
            refBoutonCourant.innerText = "Poursuivre";
            let arrChoixCourant = document.querySelectorAll('#question' + this.intNumeroQuestion + ' .choix .choixQuestion');
            
            // Enlève les états sur les choix de réponses en plus de désactiver ces derniers 
            for(let index = 0; index < this.arrLabelChoixCourant.length; index++) {
                this.arrLabelChoixCourant[index].classList.remove('testeQuestion__etat');
                arrChoixCourant[index].checked = false;
                arrChoixCourant[index].disabled = true;
            };

        };

    },

    /**
     * Affiche la page résultat avec les rétroactions appropriés
     */
    afficherResultats: function () {
        // Révèle la page résultat
        this.refResultat.classList.remove("cache"); 

        const refH3Resultat = document.querySelector(".resultat__h3");
        const refRetroactionResultat = document.querySelector(".resultat__retroaction")
        const refSpanResultat = document.getElementById("resultatSur3");
        refSpanResultat.innerText = this.intNbBonnesReponses;

        // Ajoute les rétroactions selon le nombre de bonnes réponses
        switch(this.intNbBonnesReponses) {

            case 0:
                refH3Resultat.innerText = "Dommage..."
                refRetroactionResultat.innerText = objJSON.messages.note0;
            break;

            case 1:
                refH3Resultat.innerText = "Zut!"
                refRetroactionResultat.innerText = objJSON.messages.note33;
            break;

            case 2:
                refH3Resultat.innerText = "Presque!!"
                refRetroactionResultat.innerText = objJSON.messages.note66;
            break;

            case 3:
                refH3Resultat.innerText = "Bravo!!!"
                refRetroactionResultat.innerText = objJSON.messages.note100;
            break;
        }

    },

    /**
     * Reintialise les valeurs du quiz et appelle la fonction afficherQuestion()
     */
    reinitialiserQuiz: function() {
        
        // Reintialise le contenu des rétroactions de bonne ou mauvaise réponse
        for(let index = 1; index <= 3; index++) {
            document.querySelector('#question' + index + ' .messageBonneReponse h3').innerText = "";
            document.querySelector('#question' + index + ' .messageBonneReponse p').innerText = "";
            document.querySelector('#question' + index + ' .messageBonneReponse').classList.add('cache');

            document.querySelector('#question' + index + ' .messageMauvaiseReponse h3').innerText = "";
            document.querySelector('#question' + index + ' .messageMauvaiseReponse p').innerText = "";
            document.querySelector('#question' + index + ' .messageMauvaiseReponse').classList.add('cache');
        }
        

        this.intNumeroQuestion = 1;
        this.intNbBonnesReponses = 0;
        this.intNoQuestion = 0;

        this.refResultat.classList.add('cache');

        

        // Ajoute les classes d'états et enlève les classes bonne/mauvaise réponse au choix de réponses en plus de réactiver ces derniers.
        for(let intNoChoix = 0; intNoChoix < this.arrChoixQuestion.length; intNoChoix++) {
            this.arrLabelChoixTotal[intNoChoix].classList.add("testeQuestion__etat");
            this.arrLabelChoixTotal[intNoChoix].classList.remove("bonneReponse");
            this.arrLabelChoixTotal[intNoChoix].classList.remove("mauvaiseReponse");
            this.arrChoixQuestion[intNoChoix].disabled = false;   
            this.arrChoixQuestion[intNoChoix].checked = false;
        };

        this.afficherQuestion();

    },

    /**
     * Empêche l'envoi du formulaire
     * @param {object} e 
     */
    empecherEnvoiFormulaire: function (e) {
        e.preventDevault();
    },
    
    
};
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});
for(let index = 0; index < quiz.arrChoixQuestion.length; index++) {
    quiz.arrChoixQuestion[index].addEventListener('change', function() {
        quiz.selectionImage(index);
    });
};
// Corrigé please :(
document.querySelector("form").addEventListener("submit", function() {
    quiz.empecherEnvoiFormulaire(objEvenement);
});
    

// Problêmes rencontrés -> Dans les questions 2 et 3, les choix ne sont pas disabled après la validation du choix de rép.