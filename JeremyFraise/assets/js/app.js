/**
 * TIM - QUIZ
 * @author: Prénom Nom;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, c’est une bonne réponse !",
        "negative": "Désolé, ce n’est pas la bonne réponse"
    },
    "explications": {
        "Q1": "Explications de la question 1",
        "Q2": "Explications de la question 2",
        "Q3": "Explications de la question 3"
    },
    "bonnesReponses": [
        "Q1A",
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
    debuterQuiz: function () { },
    validerReponse: function (idReponse) { },
    afficherResultats: function () { }
}