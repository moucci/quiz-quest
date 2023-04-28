/**
 * @player : {}
 */
let player;

/**
 * get player in storage
 * @type {Object}
 */
let playerInStorage = localStorage.getItem('player');

/**
 * définir le jouer par defautfr_FR
 * qui se trouve dans le storage ou cree un nouveau
 */
if (playerInStorage === null) {
    //login  of user 
    player = {
        name: "anonyme",
        score: '0',
        lang: "en_US",
    }

    //save data in storage
    updateUserInStorage();

} else {
    player = JSON.parse(playerInStorage);
}

/**
 * bouton change lang
 */
let $btnLang = document.querySelector('.lang img');

$btnLang.addEventListener('click', (event) => {
    if (player.lang === 'fr_FR') {
        player.lang = 'en_US';
        event.target.src = 'assests/img/flag-en.svg';
    } else {
        player.lang = 'fr_FR';
        event.target.src = 'assests/img/flag-fr.svg';
    }
    localStorage.player = JSON.stringify(player);
})

//set btn lang
$btnLang.src = (player.lang === 'fr_FR') ? 'assests/img/flag-fr.svg' : 'assests/img/flag-en.svg'


/**
 * get element INPUT for name player
 * @type {Element}
 */
let input = document.querySelector(".anonime");

/**
 * get btn element  edit name
 * @type {Element}
 */
const btn_stylo = document.querySelector("#btn_edit_login");

/**
 * get block where display score
 * @type {Element}
 */
const displayScore = document.querySelector(".displayScore");

//set player name in input
input.value = player.name;
//set score in container
displayScore.textContent = player.score;

//bind event  click on  btn_stylo for edit name
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


        //save dada in storage
        updateUserInStorage();

    }
}


/**
 * function qui permet de mettre a jour le player dans le storage
 */
function updateUserInStorage() {
    localStorage.player = JSON.stringify(player);
}

/**
 * get loader element
 * @type {Element}
 */
let $loader = document.querySelector('.rotate-infinite');

/**
 * list des catégories
 */
let categories = [];

/**
 * Get category from quiz.freefakeapi ;
 * @return {Promise<any>}
 */

fetch('https://quiz.freefakeapi.io/api/categories?random=true', {
    headers: {
        'Accept': 'application/json',
        'Accept-Language': player.lang
    }
}).then((response) => {
    return response.json()
}).then((apiCategories) => {

    //add new data to categories ;
    categories = apiCategories;

    //generate 4 random  questegorie
    generateRandomCategory(categories);

    //stop loader
    $loader.classList.remove('rotate-infinite')

}).catch((err) => {
    console.log(err)
    alert("Une erreur est survenue lors de la récupération des catégories, ce n'est pas de ma faute." +
        "Veuillez voir le problème avec #hamid , walah c'est lui ");
});


/**
 * get all btn
 * @type {NodeListOf<Element>}
 */
let $list_btn_cat = document.querySelectorAll('.select_cat');

/**
 * function to  return 4 random item
 * @param arr
 * @return {*[]}
 */
function generateRandomCategory(arr) {

    let randomItems = [];

    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        randomItems.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
        $list_btn_cat[i].innerHTML = arr[i].name.replace(' ', '<br/>')
    }

    return randomItems;
}





fetch('api/Questions.json').then(response => {
    return response.json()
})
















