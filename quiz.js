/*
add basic jquery
*/

var quiz = {
	currentIndex: 0,
	userAnswers: [],
	
	displayQuestion: function(index) {
		//question
		var questionDiv = $("#question").text(""); //erase contents
		var questionh1 = $("<h1/>").attr({
			id: "questionh1"
			}).text(allQuestions[index].question);
		questionDiv.append(questionh1);
		
		//answers
		var answersDiv = $("#answers").text("");
		for (var i = 0; i < allQuestions[index].choices.length; i++) {
			
			var p = $("<p/>");
			answersDiv.append(p);
			
			var input = $("<input/>").attr({
				type: "radio",
				name: "answers",
				id: "answer" + i,
				value: i,
			});
			p.append(input);
			
			var label = $("<label/>").attr({
				"for": "answer" + i
			}).text(allQuestions[index].choices[i]);
			
			p.append(label);
		}
	},
	
	displayFinish: function() {
		var correctAnswers = 0;
		var totalAnswers = quiz.userAnswers.length
		
		//get all the answers and check them
		for (var i = 0; i < totalAnswers; i++) {
			if (quiz.userAnswers[i] == allQuestions[i].correctAnswer) {
				correctAnswers++;
			}
		}
		//remove everything and display result
		var wrapper = $("#wrapper").text("");
		var h1 = $("<h1/>").text("You got " + correctAnswers + " out of " + totalAnswers + " questions correct.");
		wrapper.append(h1);
		
		var p = $("<p/>");
		wrapper.append(p);
		
		
		if (correctAnswers <= (totalAnswers/2)) {
			p.text("That's pretty bad.");
			var img = $("<img/>").attr({
				src: "images/timlose.jpg"
			});
			wrapper.append(img);
			
		} else {
			p.text("That's pretty good.");
			var img = $("<img/>").attr({
				src: "images/timwin.gif"
			});
			wrapper.append(img);	
		}
		
	}
	
}

var allQuestions = [
	{
		question: "I'm gonna grill up some ______", 
		choices: ["birds.", "salmon.", "steak.", "brats."],
		correctAnswer: 3
	},
	{
		question: "What would make you a big hit with the dudes?",
		choices: ["Some sour cream and onion.", "Some key lime pie a la mode.", "A vegetable medley a crudites.", "Any kind of dessert."],
		correctAnswer: 1
	},
	{
		question: "Why don't you come by if you've got some _____-fried pizza dough.",
		choices: ["single", "double", "triple", "quadruple", "quintuple"],
		correctAnswer: 2
	},
	{
		question: "You know what I love are those...",
		choices: ["...hot mozzarella sticks.", "...<em>ridged chips</em>.", "...frozen meatballs",],
		correctAnswer: 0
	}
];



window.onload = function() {
	quiz.displayQuestion(quiz.currentIndex);
	$("#nextButton").on("click", function() {
		//store answer
		quiz.userAnswers[quiz.currentIndex] = $('input[name="answers"]:checked').val();
		//display next question
		if (quiz.currentIndex < allQuestions.length - 1) {
			quiz.currentIndex++;
			quiz.displayQuestion(quiz.currentIndex);
		} else {
			quiz.displayFinish();
		}
	});
}
 