var quiz = {
	currentIndex: 0,
	userAnswers: [],

	displayQuestion: function(index) {
		//create question
		var questionDiv = $("#question");
		var questionh1 = $("<h1/>").attr({
			id: "questionh1"
			}).html(timanderic[index].question);
		questionDiv.append(questionh1);
		
		//create answers
		var answersDiv = $("#answers");
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
			}).html(timanderic[index].choices[i]);
			
			p.append(label);
		}
		
		//display all
		$("#wrapper").slideDown("fast");
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
		//erase contents
		var wrapper = $("#wrapper").html("");
		
		//score
		var h1 = $("<h1/>").html("You got " + correctAnswers + " out of " + totalAnswers + " questions correct.");
		wrapper.append(h1);
		
		var p = $("<p/>");
		wrapper.append(p);
		
		//if you get 50% or less
		if (correctAnswers <= (totalAnswers/2)) {
			p.html("That's pretty bad.");
			var img = $("<img/>").attr({
				src: "images/timlose.jpg"
			});
			wrapper.append(img);
		
		//if you get over 50%
		} else {
			p.html("That's pretty good.");
			var img = $("<img/>").attr({
				src: "images/timwin.gif"
			});
			wrapper.append(img);	
		}
		
		//display all
		//display all
		$("#wrapper").slideDown("fast");
	}
}


window.onload = function() {
	
	$("#startButton").on("click", function() {
		$(this).css("display", "none");
		quiz.displayQuestion(quiz.currentIndex);
	});
	
	
	$("#nextButton").on("click", function() {
		//store answer
		quiz.userAnswers[quiz.currentIndex] = $('input[name="answers"]:checked').val();
		//slide up and erase
		$("#wrapper").slideUp("fast", function() {
				$("#question").html("");
				$("#answers").html("")
				if (quiz.currentIndex < timanderic.length - 1) {
					quiz.currentIndex++;
					quiz.displayQuestion(quiz.currentIndex);
				} else {
					quiz.displayFinish();
				}
			});
		//display next question
		
		
	});
}
 