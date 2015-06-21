var quiz = {
	currentIndex: 0,
	userAnswers: [],
	
	displayQuestion: function(index) {
		//question
		var questionDiv = $("#question").text(""); //erase contents
		var questionh1 = $("<h1/>").attr({
			id: "questionh1"
			}).text(timanderic[index].question);
		questionDiv.append(questionh1);
		
		//answers
		var answersDiv = $("#answers").text("");
		for (var i = 0; i < timanderic[index].choices.length; i++) {
			
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
			}).text(timanderic[index].choices[i]);
			
			p.append(label);
		}
	},
	
	displayFinish: function() {
		var correctAnswers = 0;
		var totalAnswers = quiz.userAnswers.length
		
		//get all the answers and check them
		for (var i = 0; i < totalAnswers; i++) {
			if (quiz.userAnswers[i] == timanderic[i].correctAnswer) {
				correctAnswers++;
			}
		}
		//remove everything and display result
		var wrapper = $("#wrapper").text("");
		var h1 = $("<h1/>").text("You got " + correctAnswers + " out of " + totalAnswers + " questions correct.");
		wrapper.append(h1);
		
		var p = $("<p/>");
		wrapper.append(p);
		
		//if you get 50% or less
		if (correctAnswers <= (totalAnswers/2)) {
			p.text("That's pretty bad.");
			var img = $("<img/>").attr({
				src: "images/timlose.jpg"
			});
			wrapper.append(img);
		
		//if you get over 50%
		} else {
			p.text("That's pretty good.");
			var img = $("<img/>").attr({
				src: "images/timwin.gif"
			});
			wrapper.append(img);	
		}
		
	}
	
}


window.onload = function() {
	quiz.displayQuestion(quiz.currentIndex);
	$("#nextButton").on("click", function() {
		//store answer
		quiz.userAnswers[quiz.currentIndex] = $('input[name="answers"]:checked').val();
		//display next question
		if (quiz.currentIndex < timanderic.length - 1) {
			quiz.currentIndex++;
			quiz.displayQuestion(quiz.currentIndex);
		} else {
			quiz.displayFinish();
		}
		
	});
}
 