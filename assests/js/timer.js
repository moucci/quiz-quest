/**
 * function rotate arrow timer & edit conic gradiant
 * @param $el : HTMLElement reference of html element  timer
 * @param deg : number
 * @return boolean
 */
timer_rotate = function ($el, deg) {
    let arrow = $el.querySelector('.arrow')
    let conic = $el.querySelector(".circle")
    arrow.style.transform = "rotate(" + deg + "deg)";
    conic.style.backgroundImage = "repeating-conic-gradient(from 0deg,  #343434 0deg " + deg + "deg,#FFD005 " + deg + "deg 360deg )";
}

//get Html element timer
let $timer = document.querySelector('.timer-graphic');
let $timerTxt = document.querySelector('.timer-seconde');

/**
 * function start timer and timer rotate
 * @return  void
 */
start_timer = () => {
    //set timer
    let count = 30;
    let deg = 0;
    let timer_trigger = setInterval(() => {
        count--;
        deg += 12;
        if (count >= 0) {
            timer_rotate($timer, deg);
            $timerTxt.innerHTML = count + "S";
        } else {
            clearInterval(timer_trigger);
            count = 30;
            timer_rotate($timer, 0);
            $timerTxt.innerHTML = count + "S";
        }
    }, 1000);
}

// start_timer();

/**
 * function stop timer & reset timer with arrow and conic position
 * @return  void
 */
stop_timer = function () {


}




