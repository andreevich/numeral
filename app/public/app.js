(function () {
    "use strict";

    function App(minValue, maxValue) {
        var startArr = [];
        var mixArr = [];
        var min = minValue;
        var max = maxValue + 1;
        var currentNumber;

        var mix = document.querySelector('#mix');
        var start = document.querySelector('#start');
        var game = document.querySelector('.game');
        var answerList = document.querySelector('.answers ul');
        var question = document.querySelector('.question span');

        return {
            mix: function () {
                mixArr = [];
                while (startArr.length != 0) {
                    var rand = Math.floor(Math.random() * startArr.length);
                    var item = startArr[rand];
                    mixArr.push(item);
                    startArr.splice(rand, 1);
                }
            },

            randomItem: function () {
                return Math.floor(Math.random() * max + min);
            },

            loadSound: function () {

                var options = {
                    spritemap: {
                        "n0": {
                            "start": 0,
                            "end": 2.5
                        },
                        "n1": {
                            "start": 3,
                            "end": 5.5
                        },
                        "n2": {
                            "start": 6,
                            "end": 8.5
                        },
                        "n3": {
                            "start": 9,
                            "end": 11.5
                        },
                        "n4": {
                            "start": 12,
                            "end": 14.5
                        },
                        "n5": {
                            "start": 15,
                            "end": 17.5
                        },
                        "n6": {
                            "start": 18,
                            "end": 20.2
                        },
                        "n7": {
                            "start": 20.5,
                            "end": 23
                        },
                        "n8": {
                            "start": 23.5,
                            "end": 26.2
                        },
                        "n9": {
                            "start": 26.3,
                            "end": 29.2
                        },
                        "n10": {
                            "start": 29.3,
                            "end": 32.5
                        }

                    },
                    src: [
                        {
                            media: 'audio/mp4',
                            path: 'm4a/numbers.m4a'
                        }
                    ]
                };

                boombox.setup();
                var self = this;
                boombox.load('sound', options, function (err, audio) {
                    if (!err) {
                        console.log(audio);
                        self.newQuery()
                    }
                    else {
                        console.log(err)
                    }
                });
            },

            init: function () {
                startArr = [];
                for (var i = min; i < max; i++) {
                    startArr.push(i);
                }
                this.mix();
                this.loadSound();
            },

            template: function () {
                var numbers = '';
                mixArr.forEach(function (el) {
                    numbers += '<span class="number">' + el + '</span>'
                });
                return numbers;
            },

            checkAnswer: function (selectedValue) {
                return selectedValue == currentNumber ? true : false;
            },

            controls: function () {
                var self = this;


                mix.addEventListener('click', function () {
                    self.init();
                    self.drow();
                    self.drow();
                }, false);

                game.addEventListener('click', function () {
                    var selectedValue = +event.target.innerHTML;
                    var className;
                    if (self.checkAnswer(selectedValue)) {
                        className = 'right-answer';
                        self.newQuery()
                    }
                    else {
                        className = 'bad-answer';
                    }
                    event.target.classList.add(className);
                    answerList.innerHTML += '<li class="' + className + '">' + selectedValue + '</li>';
                }, false);
            },
            newQuery: function () {
                this.clearLog();
                currentNumber = this.randomItem();
                question.innerHTML = currentNumber;
                boombox.pool['sound-n' + currentNumber].play();
            },
            drow: function () {
                document.querySelector('.game').innerHTML = this.template();
                this.clearLog();
            },

            clearLog: function () {
                answerList.innerHTML = "";
                document.querySelectorAll('.right-answer').forEach(function (el) {
                    el.classList.remove('right-answer');
                });
                document.querySelectorAll('.bad-answer').forEach(function (el) {
                    el.classList.remove('bad-answer');
                });
            },

            start: function () {
                this.init();
                this.controls();
                this.drow();
            }
        }
    }


    var app = App(0, 10);
    app.start();

})();