$(document).ready(function() {

    // Define necessary variables
    // sets start point of countdown timer
    var countdownStart = 15;
    // define a variable to refer to specific area on page
    var arena = $("#quiz-area");

    // Capture the click events
    $(document).on('click', '#start-over', function(e) {
        game.reset();
    });
    
    $(document).on('click', '.answer-button', function(e) {
        game.clicked(e);
    });
    
    $(document).on('click', '#start-button', function(e) {
        game.loadQuestion();
    });

    // Record questions & answers in a questions variable (an array)
    var questions =  [{
        question: "Which NBA player was crucial in the discovery of his fellow Cameroonians Joel Embiid and Pascal Siakam?",
        answers: ["Luc Richard Mbah a Moute", "Serge Ibaka", "Desagana Diop", "Dikembe Mutombo"],
        correctAnswer: "Luc Richard Mbah a Moute",
        image: "assets/images/lrmam.jpg",
        blurb: "Both Embiid and Siakam were really discovered after attending Luc Mbah a Moute's basketball camp in Cameroon. After flashing their potential there, both were invited to the big Basketball Without Borders camp, where they began their path to the NBA."
    }, {
        question: "How many points did Klay Thompson score in the 3rd quarter vs. the Kings, setting a new NBA record for points in a quarter?",
        answers: [28, 34, 37, 39],
        correctAnswer: 37,
        image: "assets/images/klay.gif",
        blurb: "In a run-of-the-mill January home game against Sacramento, Thompson caught fire in the 3rd quarter. He set NBA records for points (37) and three-pointers (9) in a quarter, and tied the record for field goals made (13/13)."
    }, {
        question: "In the history of the NBA, only 4 guards have won the Defensive Player of the Year Award. Which one of these players did NOT win the award?",
        answers: ["Sidney Moncrief", "Gary Payton", "Alvin Robertson", "John Stockton"],
        correctAnswer: "John Stockton",
        image: "assets/images/stockton.jpg",
        blurb: "Despite retiring as the NBA's all-time leader in steals, Stockton never won a DPOY award."
    }, {
        question: "What team made history as the lowest seed (6th) to win the championship?",
        answers: ["New York Knicks", "Detroit Pistons", "Houston Rockets", "San Antonio Spurs"],
        correctAnswer: "Houston Rockets",
        image: "assets/images/hakeem.gif",
        blurb: "After winning the 1994 title, the Rockets started the 1994-95 season hot but finished the season cold after swinging a mid-season trade for Clyde Drexler. Houston entered the playoffs as the 6-seed but quickly found their stride and eventually swept the finals against the Shaq & Penny-led Orlando Magic."
    }, {
        question: "Kareem Abdul-Jabbar is the NBA's all-time leading scorer, but he entered the league under a different name. What was it?",
        answers: ["James Russell", "Lew Alcindor", "Harold Miner", "Jeremiah Johnson"],
        correctAnswer: "Lew Alcindor",
        image: "assets/images/lew.jpg",
        blurb: "In 1971, the day after winning his first NBA championship, Lew Alcindor adopted the Muslim name Kareem Abdul-Jabbar."
    }, {
        question: "The NBA now has The Stepien Rule to prevent teams from trading all of its future first-round picks. The rule was named after Ted Stepien, the owner of which NBA franchise?",
        answers: ["Cleveland Cavaliers", "Dallas Mavericks", "Utah Jazz", "Washington Bullets"],
        correctAnswer: "Cleveland Cavaliers",
        image: "assets/images/cavs.jpg",
        blurb: "Stepien only owned the Cavs from 1980-83, but his tenure was so inept that he managed to get a rule named after him. The Cavs traded several years' worth of first-round picks (including a pick that eventually turned into James Worthy)."
    }, {
        question: "Which team drafted Kobe Bryant?",
        answers: ["Los Angeles Lakers", "Los Angeles Clippers", "Atlanta Hawks", "Charlotte Hornets"],
        correctAnswer: "Charlotte Hornets",
        image: "assets/images/kobe-draft.jpg",
        blurb: "The Hornets selected Kobe with the 13th pick in the trade, but then traded him to the Lakers in exchange for Vlade Divac."
    }, {
        question: "Before Tim Duncan became on of the greatest basketball players of all-time, his first athletic love was a different sport. What was it?",
        answers: ["Swimming", "Cricket", "Soccer", "Volleyball"],
        correctAnswer: "Swimming",
        image: "assets/images/duncan.jpg",
        blurb: "Duncan didn't start playing basketball until he was 14, and was a champion swimmer in his youth. Hurricane Hugo made all the local pools unusable, so Duncan eventually turned to basketball."
    }];

    // Build a game object that contains all of the game functions and variables
    var game = {
        questions: questions,
        countdown: countdownStart,
        correct: 0,
        incorrect: 0,
        currentQuestion: 0,
        runCountdown: function(){
            $("#timer").html("<h2>Time Remaining: " + game.countdown);
            game.countdown--;
        
            if (game.countdown === 0) {
                game.timesUp();
            }
        },
        loadQuestion: function(){
            timer = setInterval(game.runCountdown, 1000);
            arena.html("<h3>" + questions[this.currentQuestion].question + "</h3>");
            for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
                arena.append("<button type='button' class='btn btn-warning btn-lg answer-button' id='button'" + "data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
            }
        },
        nextQuestion: function(){
            game.countdown = countdownStart;
            $('#counter-number').html(game.countdown);
            game.currentQuestion++;
            game.loadQuestion();
        },
        timesUp: function(){
            clearInterval(timer);
            $('#counter-number').html(game.countdown);
            $("#timer").empty();
            arena.html("<h2>Shot Clock Violation!</h2>");
            arena.append("<h3>The correct answer was: " + questions[this.currentQuestion].correctAnswer);
            arena.append("<img src='" + questions[this.currentQuestion].image + "' />");
            if (game.currentQuestion === questions.length - 1){
                setTimeout(game.results, 5 * 1000);
              } else {
                setTimeout(game.nextQuestion, 5 * 1000);
              }
        },
        results: function() {
            clearInterval(timer);
            arena.html("<h2>Game over! Your final results:</h2>");
            $('#counter-number').html(game.countdown);
            arena.append("<h3>Shots made: " + game.correct + "</h3>");
            arena.append("<h3>Shots missed: " + game.incorrect + "</h3>");
            arena.append("<h3>Shot-clock violations: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
            arena.append("<h3>Field-Goal Percentage: " + ((game.correct / questions.length)*100) + "%");
            arena.append("<br><button type='button' class='btn btn-danger' id='start-over'>Rematch</button>");
        },
        clicked: function(e){
            clearInterval(timer);
            if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
            this.answeredCorrectly();
            } else {
            this.answeredIncorrectly();
            }
        },
        answeredIncorrectly: function() {
            game.incorrect++;
            clearInterval(timer);
            $("#timer").empty();
            arena.html("<h2>Clank!</h2>");
            arena.append("<h3>The correct answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
            arena.append("<img src='" + questions[game.currentQuestion].image + "' />");
            arena.append("<p>" + questions[game.currentQuestion].blurb + "</p>");
            if (game.currentQuestion === questions.length - 1) {
                setTimeout(game.results, 5 * 1000);
            } else {
                setTimeout(game.nextQuestion, 5 * 1000);           
            }
        },
        answeredCorrectly: function(){
            clearInterval(timer);
            game.correct++;
            $("#timer").empty();
            arena.html('<h2>Swish!</h2>');
            arena.append("<img src='" + questions[game.currentQuestion].image + "' />");
            arena.append("<p>" + questions[game.currentQuestion].blurb + "</p>");
        
            if (game.currentQuestion === questions.length - 1){
              setTimeout(game.results, 5 * 1000);
            } else {
              setTimeout(game.nextQuestion, 5 * 1000);
            }
          },
        reset: function(){
            this.currentQuestion = 0;
            this.counter = countdownStart;
            this.correct = 0;
            this.incorrect = 0;
            this.loadQuestion();
        }
    };

    

    // var startButton = document.getElementById('startButton'),
    // questionTitle = document.getElementsByClassName("question"),
    // score = document.getElementsByClassName("score"),
    // timer = document.getElementsByClassName("timer"),
    // buttonOne = document.getElementById('buttonOne'),
    // buttonTwo = document.getElementById('buttonTwo'),
    // buttonThree = document.getElementById('buttonThree'),
    // buttonFour = document.getElementById('buttonFour'),
    // buttonArray = [buttonOne, buttonTwo, buttonThree, buttonFour],
    // gameIndex = 0,
    // userScore = 0,
    // timerIndex = 10,
    // questions = [
    //     'Which NBA player was crucial in the discovery of his fellow Cameroonians Joel Embiid and Pascal Siakam?',
    //     'How many points did Klay Thompson score in a quarter, setting a new NBA record?',
    // ],
    // answers = [
    //     ['Luc Richard Mbah a Moute', 'Serge Ibaka', 'Desagana Diop', 'Dikembe Mutombo'],
    //     [28, 34, 37, 39],
    // ],
    // correctAnswers = [0,2],
    // gameAnswers = [];

    // startButton.addEventListener('click', function() {
    //     alert(test);

    // });

});