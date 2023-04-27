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
    window.location.href = "index.html";
}

/**
 * Set Player
 * @player : {}
 */
let player = JSON.parse(playerInStorage);

document.querySelector('.score_txt span').textContent = player.score  ;

