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
    maxTime: 3,

    /**
     * @countTime : Number => seconde number under timer graph
     */
    countTime: 0,


    /**
     * @deg : Number => degree rotation for timer and arrow
     */
    deg: 0,


    idxAnswer: null,


    /**
     * Function init quiz
     */
    init: function () {

        this.countTime = this.maxTime;

        //init element html

        this.$timer = document.querySelector('.timer-graphic');

        this.$timerTxt = document.querySelector('.timer-seconde');

        this.$btnsAnswer = document.querySelectorAll('.btn-answer');

        //add listeners for for all buttons to  trigger answer
        this.$btnsAnswer.forEach(($el, key) => {
            $el.addEventListener('click', () => {
                //stop timer
                debugger ;
                this.stop_timer().check_answer();
                // this.openIframe()
            })
        })
    },


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
     * reference on interval timer
     */
    refIntervalTimer: null,

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

        //if timeout
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
        if(page === 0 ){
            $iframe.src= 'badbaby.html?timeout=true&id=';
            $iframe.style.display = "block";
            return false
        }




    },


}


//init quiz
quiz.init();

//start timer
quiz.start_timer();












