v# TIM Quiz

## Objectifs
- Développer individuellement un quiz en amélioration progressive et *Mobile First*.
- Utiliser avec à propos des grilles css et des flexbox.
- Intégrer des images réactives en utilisant `picture`, `source` et ses attributs.
- Contrôler la qualité du code html: corriger les erreurs et appliquer des techniques d'accessibilité des contenus et des formulaires.

## En amélioration progressive
1. __Version «PAUVRE» - État initial sans javascript__
> Le Quiz est un formulaire qui affiche au départ les 3 questions et le bouton __*Voir le résultat*__. L'intro et le résultat ne sont pas présents.
  
Pour être pleinement fonctionnelle cette version devrait être complétée par un script côté serveur (en PHP par exemple) qui reçoit les données du formulaire et les traite. Ce script ne sera pas réalisé dans le cadre de ce cours. Les résultats ne seront donc pas présentés si le javascript est désactivé. 
  
2. __Version «RICHE» - État initial avec javascript__
Au chargement de la page, l'intro s'affiche, les questions sont cachées.  
Un bouton __*Débuter le quiz*__ est ajouté par javascript.  
Le fonctionnement de la version «RICHE» est décrit dans les sections suivantes. 

## Départ
- Le dossier de départ __*quiz-tim*__ contient la page d'entrée du portail. Cette page étant commune à tous les quiz, elle ne sera pas modifiée.
- Le sous-dossier __*githubUSERNAME*__ doit contenir TOUT les fichiers de votre quiz. 
- RENOMMER le dossier __*githubUSERNAME*__ selon votre nom d'utilisateur github.
- INITIER le versionnage de votre dossier avec git et créer le dépôt distant sur github.
- Le dépôt distant doit être privé et vous devez ajouter l'utilisateur __*evefevrier*__ comme collaboratrice. 

## Les données
1. __Les questions et les choix de réponses sont dans le HTML.__
2. Un objet JSON contient les rétroactions, les réponses et les explications.
Cet objet (à compléter) fait partie du code javascript du [fichier de départ app.js](githubUSERNAME/assets/js/app.js) 


## Déroulement 
1. Au clic du bouton __*Débuter le quiz*__,   
l'introduction est cachée et la première question s'affiche ainsi qu'un bouton __*Valider la réponse*__. Ce bouton est __désactivé__ (attribut `disabled`).
2. Lorsqu'un choix a été fait parmi les boutons radio,  
le bouton __*Valider la réponse*__ est activé.
3. Au clic du bouton __*Valider la réponse*__ :   
   - VÉRIFIER est-ce la bonne réponse?  
        - si oui on affiche la rétro positive   
        - si non on effiche la rétro négative  
    - dans les 2 cas le bouton __*Valider la réponse*__ est remplacé par un bouton __*Passer à la question suivante*__, ainsi, l'utilisateur ne peut pas changer sa réponse.  
3. Au clic du bouton __*Passer à la question suivante*__ :
    - On affiche la prochaine question et fait disparaitre les autres
    - Répéter les opérations décrites aux points 2 et 3 pour toutes les questions
   - À la dernière question, au lieu d'un bouton __*Passer à la question suivante*__ on aura un bouton __*Voir le résultat*__.

Ce déroulement peut être observé dans le [prototype réalisé par Nicole McClure](https://snhqh6.axshare.com/#id=g2y17t&p=portail_timquiz)

### Interactions avec l'utilisateur
Prévoir de petites animations et transitions pour guider et inciter l'utilisateur à poursuivre la tâche. Un cours dans le dernier tiers de la session sera dédié à l'animation et aux transitions. 

### Première étape : HTML de la version pauvre
Au final, l'intégralité du quiz incluant l'intro et les résultats sont dans le fichier __*index.html*__.   
Cependant la première étape de travail étant la version «PAUVRE» du quiz, les contenus à baliser en HTML sont donc uniquement le formulaire avec ses 3 questions et son bouton de soumission. Voir les captures-écrans proposées en exemple dans le dossier __*assets*__. Notez que cet exemple ne respecte pas les spécifications du nombre de choix de réponses par question et de la présence d'images dans les choix de réponses.  
[Exemple écran étroit](_ressources_/_captures-ecran-d-un-exemple/sans-javascript/etroit.png)  
[Exemple écran large](_ressources_/_captures-ecran-d-un-exemple/sans-javascript/large.png)  
  
Le balisage de la version pauvre doit être complété pour mercredi le 5 avril AVANT le début du cours.  

#### Ressource
[Un démo pour le balisage d'une première question](githubUSERNAME/_ressources_/demo-question.html)

### Architecture des fichiers CSS
Les styles CSS doivent être assemblés dans le fichier __*style.css*__.
Le fichier maître que vous pourrez signer avec votre nom et prénom. 
Ce fichier doit importer tout d'abord les polices de caractères et ensuite, dans cet ordre:
- le fichier __*normalize.css*__ (harmonise entre autres le rendu des éléments de formulaire html5 - NE PAS le modifier)
- le fichier __*utilitaires.css*__ (contient les variables, le box-sizing et les classes d'accessibilité - MODIFIER)
- le fichier __*base.css*__ (contient les styles de base commun à tous les quiz - NE PAS le modifier)
- le fichier __*typo.css*__ (contient la stratégie de base décimale pour les tailles de police ainsi que le principe de redimensionnement des textes selon la taille de l'écran - MODIFIER)
- le fichier __*grille.css*__ (contient les styles de mise en page pour le quiz - CRÉER)
