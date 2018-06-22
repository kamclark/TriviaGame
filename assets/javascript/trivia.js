$(document).ready(function(){

  $("#remaining-time").hide();
  $("#start").on('click', trivia.StartGame);
  $(document).on('click' , '.option', trivia.CheckAnswer);

})

var trivia = {
  correct: 0,
  incorrect: 0,
  currentSet: 0,
  timer: 15,
  timerOn: false,
  timerId : '',
  // questions options and answers data
  questions: {
    q1: "What color does blue and yellow make?",
    q2: "Which X-men has the highest Intelligence Quotient?",
    q3: "What is the name of Spongebob's pet snail?",
    q4: "What does CSS stand for?"
  },
  options: {
    q1: ["red", "green", "yellow", "pink"],
    q2: ["Gambit", "Jubilee", "Beast", "Hulk"],
    q3: ["Gary", "Larry", "Harry", "Barry"],
    q4: ["Crunchy Soft Shell", "Cascading Stylesheets", "IDK", "Carrie Smith Sutherland"]
  },
  answers: {
    q1: 'green',
    q2: 'Beast',
    q3: 'Gary',
    q4: 'Cascading Stylesheets'
  },

  // initialize game
  StartGame : function() {
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    clearInterval(trivia.timerId);

    $('#game').show();

    //  empty results
    $('#results').html('');

    // show timer
    $('#timer').text(trivia.timer);

    // remove start
    $('#start').hide();

    $('#remaining-time').show();

    // first question
    trivia.NextQuestion();
  },

  // method to loop through and display questions and options
  NextQuestion : function() {

    // set timer to 20 seconds each question
    trivia.timer = 10;
     $('#timer').removeClass('time-low');
    $('#timer').text(trivia.timer);

    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.TimerRunning, 1000);
    }

    // gets all the questions from current index
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    // gets all the choices from current indexx
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // adds choices in HTML
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-dark btn-lg">'+key+'</button>'));
    })
  },
  // runs time
  TimerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 5){
          $('#timer').addClass('time-low');
        }
    }

    else if(trivia.timer === -1){
      trivia.incorrect++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.AnswerResult, 4500);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){

      // adds results with HTML
      $('#results')
        if (trivia.correct === 0 ) {
          $('#results').html('<h3>Try Harder!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>' +
          '<p>Click Start to begin again!')
        }

        else if (trivia.correct === 4) {
          $('#results').html('<h3>PERFECT!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>' +
          '<p>Click Start to begin again!')
        }

        else {
          $('#results').html('<h3>Not half bad!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>' +
          '<p>Click Start to begin again!')
        }

      // hide gameplay area
      $('#game').hide();

      // show start button so you can begin a new game
      $('#start').show();
    }

  },
  // evaluates answer selected
  CheckAnswer: function(){

    var resultId;

    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if($(this).text() === currentAnswer){
      // changes correct answer button to green
      $(this).addClass('btn-success').removeClass('btn-dark');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.AnswerResult, 2000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }

    else{
      // changes incorrect answer button to red
      $(this).addClass('btn-danger').removeClass('btn-dark');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.AnswerResult, 4500);
      $('#results').html('<h3>Sorry. The correct answer is: '+ currentAnswer +'</h3>');
    }

  },
  AnswerResult : function() {


    // move on to next question
    trivia.currentSet++;

    $('.option').remove();
    $('#results h3').remove();

    // poses new question
    trivia.NextQuestion();


  }
}
