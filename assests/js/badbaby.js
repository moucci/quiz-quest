let checker = {

    /**
     *
     *
     */
    _init: function () {

        this.$containerTxt = document.querySelector('.txt-badbaby');

        //get variable get in url path
        let _get = []
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            _get[key] = value;
        });

        //bind value if present
        this.indexAnswer = (_get['idx']) ? _get['idx'] : this.indexAnswer;
        this.statusTimeOut = (_get['timeout']) ? Boolean(_get['timeout']) : this.statusTimeOut;

        //append new data in  html
        this.appendTxt();
    },

    /**
     * @containerTxt : HTMLElement
     */
    $containerTxt: HTMLElement,


    /**
     * status Of  TimeOut from timer.js after opened Iframe
     * @params get from url , per default false
     */
    statusTimeOut: false,

    /**
     * index of response From Timer.js after opend Iframe
     * @params get from url , per default 0
     */
    indexAnswer: 0,


    /**
     * Object for dynamic text
     * @type {{text: {value: string, timeout: boolean}}}
     */
    textBadAnswer: [
        {
            value: "Mauvaise reponse",
            timeout: false
        }, {
            value: "Null a chier ",
            timeout: true
        }

    ],


    appendTxt: function () {


        // debugger ;

        this.textBadAnswer.forEach((ob)=>{
            if(ob.timeout === this.statusTimeOut){
                this.$containerTxt.textContent = ob.value ;
            }
        })



        // return ;
        // this.$containerTxt.textContent = Object.values(this.textBadAnswer)


    }


}

checker._init();












