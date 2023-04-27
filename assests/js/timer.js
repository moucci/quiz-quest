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


/**
 * language per default
 * @type {string}
 */
let appLanguage = player.lang || 'fr_FR';

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
    options.headers.append('Accept', "application/json");

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

    $containerQuestion: HTMLElement,

    /**
     * @maxTime : maximum time limit  per seconde for one question
     */
    maxTime: 30,

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
     * @selectedQuestions index : Number
     */
    selectedQuestion: Number,

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

        this.$containerQuestion = document.querySelector('.text-question');

        //bind first question
        this.$containerQuestion.textContent = this.questions[0].text;

        //add listeners for for all buttons to  trigger answer
        this.$btnsAnswer.forEach(($el, key) => {

            //bind question  in btn
            $el.textContent = this.questions[0].answers[key].text;

            //bind event on button
            $el.addEventListener('click', (event) => {

                //get parent
                const $parent = event.target.parentNode;

                //get position
                this.idxAnswer = Array.prototype.indexOf.call($parent.children, event.target);

                //stop timer and check response
                this.stop_timer().check_answer();
            })
        })

        //set index question in quiz.indexAnswer
        this.selectedQuestion = 0;

        //set score  player in screen
        document.querySelector('.score .nb').textContent = parseInt(player.score);


        //hide loader
        document.querySelector('.rotate-infinite').remove();

        //show main
        document.querySelector('main').style.display = "flex";

        //start party
        quiz.start_timer();

    },

    /**
     * Get category from quiz.freefakeapi ;
     * @return {Promise<any>}
     */
    getCategory: async function () {
        let response = await fetch('https://quiz.freefakeapi.io/api/categories?random=false');
        let categories = await response.json();
        return categories;
    },

    /**
     * get questions from api/questions
     * @return {Promise<any>}
     */
    getQuestions: async function () {
        const response = await fetch('https://quiz.freefakeapi.io/api/categories/' + quiz.selectedCategorie + '/questions?limit=10');
        const questions = await response.json();
        return questions;
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
            this.openIframe("TIMEOUT");
            return;
        } else if (this.questions[this.selectedQuestion].answers[this.idxAnswer].is_correct) {
            //update paleyr score
            player.score = parseInt(player.score) +  10;
            document.querySelector('.score .nb').textContent = parseInt(player.score);
            //open success  page
            this.openIframe("SUCCESS");
            return;
        } else {
            this.openIframe();
        }

    },

    /**
     * methode open screen bg.html || babybad.html
     */
    openIframe: function (page) {

        let $iframe = document.querySelector('iframe');

        let path;

        //if  timeout open badbaby with timeout variable = true
        if (page === "TIMEOUT") {
            path = "badbaby.html?timeout=true&";
        } else if (page === "SUCCESS") {
            path = "BG.html?";
        } else {
            path = "badbaby.html?";
        }

        $iframe.src = path + '?id=' + this.selectedQuestion;

        $iframe.onload = function () {
            $iframe.style.display = "block";
            document.querySelector('.btn-next').style.display = "block"
        }

    },

    /**
     * close iframe and set next question
     */
    closeIframe: function () {
        let $iframe = document.querySelector('iframe');
        $iframe.src = '';
        $iframe.style.display = "none";
        document.querySelector('.btn-next').style.display = "none";
        $iframe.onload = null;

        //next question
        quiz.nextQuestion();


    },

    /**
     * methode to next question
     */
    nextQuestion: function () {

        //update question in quiz
        this.selectedQuestion++

        //if we have questions again
        if (this.selectedQuestion < 10) {

            //incrementation  of selected question
            //bind new index question in block .nb-question
            document.querySelector('.nb-question .value').textContent = this.selectedQuestion + 1;

            //change  to next question
            this.$containerQuestion.textContent = this.questions[this.selectedQuestion].text;

            //bind  next response
            this.questions[this.selectedQuestion].answers.forEach((value, index) => {
                this.$btnsAnswer[index].textContent = value.text;
            })

            //set idxAnswer to null
            this.idxAnswer = null;

            this.start_timer() ;
        } else {


            /**
             * function qui permet de mettre a jour le player dans le storage
             */
            localStorage.player = JSON.stringify(player);

            window.location.href = 'score.html';
        }


    }
}

//append data category to quiz.category
quiz.getCategory().then((apiCategories) => {

    //append data api to categories quiz
    quiz.categories = apiCategories;

    //get variable get in url path
    let _get = [];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        _get[key] = value;
    });

    //if user no  selected category , redirect to index.html
    if (!_get['cat'] || !quiz.categories.find(cat => cat.id === parseInt(_get['cat']))) {
        window.location.href = 'index.html';
    }
    //binding cat to quiz
    quiz.selectedCategorie = _get['cat'];

    /**
     * bind questions to quiz.questions and init quiz
     */
    quiz.getQuestions().then((apiQuestions) => {
        quiz.questions = apiQuestions;
        //init quiz
        quiz.init();
    }).catch(() => {


        alert("Une erreur est survenue lors de la récupération des questions, ce n'est pas de ma faute." +
            "Veuillez voir le problème avec #hugo");
    })
}).catch(() => {
    alert("Une erreur est survenue lors de la récupération des catégories, ce n'est pas de ma faute." +
        "Veuillez voir le problème avec #hugo");
});
















