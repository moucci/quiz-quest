
let player;

let playerInStorage = localStorage.getItem('player');

/**
 * définir le jouer par defaut
 * qui se trouve dans le storage ou cree un nouveau 
 */
if (playerInStorage === null) {
    //login  of user 
    player = {
        name: "anonyme",
        score: '0'
    }
} else {
    player = JSON.parse(playerInStorage);
}


let input = document.querySelector(".anonime");

const btn_stylo = document.querySelector("#btn_edit_login");
const displayScore = document.querySelector(".displayScore");

input.value = player.name;
displayScore.textContent = player.score;

btn_stylo.addEventListener("click", enableinput)

/**
 * function active champ input pour changer le pseudo 
 */
function enableinput() {


    let pathImg = "assests/img/btnVld.png";


    let img = this.querySelector("img");


    if (input.disabled) {

        input.disabled = false;
        img.setAttribute('src', pathImg);
        this.style.opacity = "1"

    } else {

        input.disabled = true;
        img.setAttribute('src', 'assests/img/stylo.svg');
        this.style.opacity = "0.5"

        if (input.value.length !== 0) {
            player.name = input.value;
        }


        updateUserInStorage()

    }
}



/**
 * function qui permet de mettre a jour le player dans le storage
 */
function updateUserInStorage() {
    localStorage.player = JSON.stringify(player);
}



/**
 * list des catégories 
 */
let cat = [
    "php",
    "linux",
    "windows",
    "javaScript", "macOs",
    "systems d'exploitation",
    " HTML / CSS",
    "MySQL",
    "Développement Web"
]; 


let list_btn_cat = document.querySelectorAll('.select_cat'); 


function generateRandomQuestions(arr) {

    let randomItems = [];
  
    for(let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      randomItems.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);

      let  indexBtn = i + 1

    //   document.querySelector('.select_cat:nth-child('+indexBtn+')').textContent = arr[i]


      list_btn_cat[i].innerHTML = arr[i].replace(' ', '<br/>')


    }
  
    return randomItems;
  }


  generateRandomQuestions(cat)

  list_btn_cat[0].addEventListener('click' , function(){

    window.location.href = 'questions?cat=php'

  })












