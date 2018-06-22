var userPick;
var correctAnswer = 0;
var incorrectAnswer = 0;
var question = 0;
var count = 30;

var questionBox = [{
    question: "What color does blue and yellow make?",
    answers: ["red", "green", "yellow", "pink"],
    validAnswer: 1
  }, {
    question: "Which X-men has the highest Intelligence Quotient",
    answers: ["Gambit", "Jubilee", "Beast", "Hulk"],
    validAnswer: 2

  }, {
    question: "What is the name of Spongebob's pet snail?",
    answers: ["Gary", "Larry", "Harry", "Barry"],
    validAnswer: 0
  }
];

$("#btn-start").click(function() {
  $(this).hide();
  counter = setInterval(timer, 1000);
  displayTrivia();
});

function timer() {
  count--;
  if (count <= 0) {
    clearInterval(counter);
    alert("Wrong!");
    incorrectAnswer++;
    return;
  }

  $("#timer").html("Time remaining: " + "00:" + count + "s");
}


function displayTrivia() {
  $("#questions").html(questionBox[0].question);

  var answersArr = questionBox[0].answers;
  var buttonsArr = [];

  for (i = 0; i < answersArr.length; i++) {
    var button = $('<button>');
    button.text(answersArr[i]);
    button.attr('data-id', i);
    $('#answers-section').append(button);
  }

}

$('#answers-section').on('click', 'button', function(e) {
    userPick = $(this).data("id");
    questionBox[0].validAnswer;
    if (userPick != questionBox[0].validAnswer) {

      // $('#answers-section').text("Wrong. The correct answer is "+ questionBox.answers[questionBox[0].validAnswer]);
      $('#answers-section').text("Wrong. The correct answer is Green! (Click here for next question)");
      incorrectAnswer++;
      question++
      $('#incorrect-score').html("Incorrect: " + incorrectAnswer);



    } else if (userPick === questionBox[0].validAnswer) {
      $('#answers-section').text("Correct!!!  (Click here for next question)");
      correctAnswer++;
      question++;
      $('#correct-score').html("Correct: " + correctAnswer);
    }
    //
    // $('#answers-section').on('click', 'button', function(e) {
    //     userPick = $(this).data("id");
    //     questionBox[question].validAnswer;
    //     if (userPick != questionBox[question].validAnswer) {
    //
    //       // $('#answers-section').text("Wrong. The correct answer is "+ questionBox.answers[questionBox[0].validAnswer]);
    //       $('#answers-section').text("Wrong. The correct answer is Green!");
    //       incorrectAnswer++;
    //       $('#incorrect-score').html("Incorrect: " + incorrectAnswer);
    //
    //     } else if (userPick === questionBox[question].validAnswer) {
    //       $('#answers-section').text("Correct!!!");
    //       correctAnswer++;
    //       $('#correct-score').html("Correct: " + correctAnswer);
    //     }
    // });

});
