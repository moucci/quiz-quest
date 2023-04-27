// // Sélection du bouton suivant
// let btnSuivant = document.querySelector('.btn-next');
// tesur = "TES SUR"
// textContent = "FINIR"
// btnSuivant.addEventListener('click', function(){
//     btnSuivant.textContent = "FINIR";
//     if(btnSuivant === textContent) {
//         btnSuivant.addEventListener('click', function(){
//             btnSuivant.textContent = "TES SUR"
//         })
//     }

// })

// btnSuivant.addEventListener('click', function() {
//   // Récupérer l'URL de la page actuelle
//   let currentUrl = window.location.href;
  
//   // Vérifier si la page actuelle est la dernière question
//   if (currentUrl === 'http://127.0.0.1:5501/derniere-question.html') {
//     // Si c'est la dernière question, rediriger l'utilisateur vers une autre page
//     window.location.href = 'http://127.0.0.1:5501/fin-du-quiz.html';
//   } else {
//     // Si ce n'est pas la dernière question, rediriger l'utilisateur vers la page suivante
//     // (en supposant que la page suivante a le nom "question-2.html", "question-3.html", etc.)
//     let currentQuestionNumber = currentUrl.substring(currentUrl.lastIndexOf('-') + 1, currentUrl.lastIndexOf('.'));
//     let nextQuestionNumber = parseInt(currentQuestionNumber) + 1;
//     let nextUrl = currentUrl.substring(0, currentUrl.lastIndexOf('-') + 1) + nextQuestionNumber + '.html';
//     window.location.href = nextUrl;
// //   }
  
//   // Modifier le texte du bouton en "Finir" si c'est la dernière question
//   if (currentUrl === 'http://127.0.0.1:5501/derniere-question.html') {
//     btnSuivant.textContent = 'Finir';
//   }
// });


// let _get = []
//         window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
//             _get[key] = value;
//         });

//         this.indexAnswer = (_get['idx']) ? _get['idx'] : this.indexAnswer;
//         this.statusTimeOut = (_get['timeout']) ? Boolean(_get['timeout']) : this.statusTimeOut;



      







