/**
 * language per default
 * @type {string}
 */
let appLanguage = 'fr_FR';

/**
 * save original methode fetch
 */
const {fetch: originalFetch} = window;

/**
 * Methode Interceptor to append Custom header
 * @param args
 * @return {Promise<Response>}
 */
window.fetch = async (...args) => {
    //extract arguments
    let [resource, options] = args;
    //check option
    options = options || {};
    //check headers in options
    options.headers = options.headers || new Headers();

    //append new header lang
    options.headers.append('Accept-Language', appLanguage);

    //execute original fetch
    let response = await originalFetch(resource, options);
    //return response
    return response;
};

/**
 * @type {{init: quiz.init, start_timer: quiz.start_timer, $timer: null, stop_timer: quiz.stop_timer, $timerTxt: null, deg: number, timer_rotate: ((function(HTMLElement, number): boolean)|*), count: number, questions: {}}}
 */
let quiz = {

    /**
     * @timer : HTMLElement => block global timer
     */
    $timer: HTMLElement,

    /**
     * @timerTxt : HTMLElement  => block text timer
     */
    $timerTxt: HTMLElement,

    /**
     * @btnsAnswer : Array HTMLElement => btn trigger to answer quiz
     */
    $btnsAnswer: Array,

    /**
     * @maxTime : maximum time limit  per seconde for one question
     */
    maxTime: 10,

    /**
     * @countTime : Number => seconde number under timer graph
     */
    countTime: 0,

    /**
     * @deg : Number => degree rotation for timer and arrow
     */
    deg: 0,

    /**
     * @idxAnswer Number | NULL => binding index response from button
     */
    idxAnswer: null,

    /**
     * empty Array : questions for quiz
     */
    questions: [
        {
            "id": 24,
            "text": "Lequel de ces sélecteurs a la spécificité la plus élevée ?",
            "answers": [
                {
                    "text": "#content",
                    "is_correct": true
                },
                {
                    "text": ":first-child",
                    "is_correct": false
                },
                {
                    "text": "main",
                    "is_correct": false
                },
                {
                    "text": ".col",
                    "is_correct": false
                }
            ]
        }
    ],

    /**
     * @cat  : Array => content cat per default
     */
    categories: [],

    /**
     * @selectedCategories | number =>  binding from url _Get['cat']
     */
    selectedCategorie: Number,

    /**
     * reference on interval timer
     */
    refIntervalTimer: null,

    /**
     * Function init quiz
     */
    init: function () {

        //set counter Time
        this.countTime = this.maxTime;

        //set  element html
        this.$timer = document.querySelector('.timer-graphic');

        this.$timerTxt = document.querySelector('.timer-seconde');

        this.$btnsAnswer = document.querySelectorAll('.btn-answer');

        //add listeners for for all buttons to  trigger answer
        this.$btnsAnswer.forEach(($el, key) => {
            $el.addEventListener('click', (event) => {
                //get parent
                const $parent = event.target.parentNode;
                //get position
                this.indexAnswer = Array.prototype.indexOf.call(parent.children, event.target);
                this.stop_timer().check_answer();
            })
        })
    },

    /**
     * function start timer and timer rotate
     * @return  void
     */
    start_timer: function () {
        this.refIntervalTimer = setInterval(() => {
            this.countTime--;
            this.deg += 360 / this.maxTime;
            if (this.countTime >= 0) {
                this.timer_rotate(this.$timer, this.deg);
                this.$timerTxt.innerHTML = this.countTime + "S";
                this.animateTimer(this.deg);
            } else {
                this.stop_timer().check_answer();
            }
        }, 1000);
    },

    /**
     *
     * @param deg : number of degree from $timer
     */
    animateTimer: function (deg) {
        if (deg > 45 && this.deg < 90) {
            this.$timer.style.animation = "zoom-in-zoom-level-1 0.75s ease infinite";
        } else if (deg > 90 && deg < 180) {
            this.$timer.style.animation = "zoom-in-zoom-level-1 0.50s ease infinite";
        } else if (deg > 180 && deg < 225) {
            this.$timer.style.animation = "zoom-in-zoom-level-1 0.25s ease infinite";
        } else if (deg > 260) {
            let timeAnimation = (360 - deg) * (0.7 / 360) + 0.1;
            this.$timer.style.animation = "zoom-in-zoom-level-1 " + timeAnimation + "s ease infinite";
        } else {
            return false;
        }
    },

    /**
     * function stop timer & reset timer with arrow and conic position
     * @return  this
     */
    stop_timer: function () {
        clearInterval(this.refIntervalTimer);
        this.countTime = this.maxTime;
        this.deg = 0
        this.timer_rotate(this.$timer, 0);
        this.$timerTxt.innerHTML = this.maxTime + "S";
        this.$timer.style.animation = "zoom-in-zoom-level-1 30s ease infinite";

        // Retourner l'objet modifié
        return this;

    },

    /**
     * function rotate arrow timer & edit conic gradiant
     * @param $el : HTMLElement reference of html element  timer
     * @param deg : number
     * @return boolean
     */
    timer_rotate: function ($el, deg) {

        // debugger ;

        let arrow = $el.querySelector('.arrow')
        let conic = $el.querySelector(".circle")
        arrow.style.transform = "rotate(" + deg + "deg)";
        conic.style.backgroundImage = "repeating-conic-gradient(from 0deg,  #343434 0deg " + deg + "deg,#FFD005 " + deg + "deg 360deg )";
    },

    /**
     * methode for check response
     */
    check_answer: function () {

        //if timeout display badbaby
        if (this.idxAnswer === null) {
            this.openIframe(0);
            return;
        }


    },

    /**
     * methode
     */
    openIframe: function (page) {

        let $iframe = document.querySelector('iframe');

        //if  timeout open badbaby with timeout variable = true
        if (page === 0) {
            $iframe.src = 'badbaby.html?timeout=true&id=';
            $iframe.style.display = "block";
            return false
        }


    },

}

/**
 * Get category from cat.json ;
 * @return {Promise<any>}
 */
async function getCategory() {
    let response = await fetch('https://quiz.freefakeapi.io/api/categories?random=false');
    let categories = await response.json();
    return categories;
};

//append data category to quiz.category
getCategory().then(apiCategories => quiz.categories = apiCategories);

//get variable get in url path
let _get = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    _get[key] = value;
});

//if user no  selected category , redirect to index.html
if (!_get['cat'] ||  ! quiz.categories.find(cat => cat.id === _get[cat])) {
     window.location.href = 'index.html';
}
//binding cat to quiz
quiz.selectedCategorie = _get['cat'];


/**
 * get questions from api/questions
 * @return {Promise<any>}
 */
async function getQuestions() {
    const response = await fetch('https://quiz.freefakeapi.io/api/categories/' + quiz.selectedCategorie+ '/questions?limit=10');
    const questions = await response.json();
    return questions;
}

/**
 * bind questions to quiz.questions
 */
getQuestions().then(apiQuestions => quiz.questions = apiQuestions)


console.log(quiz)
//when  cat is loaded init quiz
quiz.init();














