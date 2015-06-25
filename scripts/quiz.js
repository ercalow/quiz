/*
TO DO
	choose which quiz you want
	restart button
		wipe all quiz properties
	do different animations. can i randomize?
		
	test on IE9
		
	get rid of radio buttons
	center
	make it look good 
	rwd 
		text too small on phone
		do i need jquery mobile?
	
*/

var quiz = {
	currentIndex: 0,
	userAnswers: [],
	

	displayQuestion: function(index) {
		//get wrapper
		var wrapper = $("#wrapper");
		
		//image
		var img = $("<img/>").attr({
				src: "images/tim.jpg"
			});
		wrapper.append(img);
		
		//create question
		var questionDiv = $("<div/>").attr({
			id: "question"
		});
		var questionh1 = $("<h1/>").attr({
			id: "questionh1"
		}).html(timanderic[index].question);
		wrapper.append(questionDiv);
		questionDiv.append(questionh1);
		
		//create answers
		var answersDiv = $("<div/>").attr({
			id: "answers"
		});
		wrapper.append(answersDiv);
		
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
		
		var nextButton = $("<button/>").attr({
			id: "nextButton",
		}).html("NEXT");
		wrapper.append(nextButton);
		
		//event listener for next button
		$("#nextButton").on("click", function() {
			//store answer
			quiz.userAnswers[quiz.currentIndex] = $('input[name="answers"]:checked').val();
			//slide up and erase
			$("#wrapper").fadeOut("fast", function() {
					wrapper.html("");
					if (quiz.currentIndex < timanderic.length - 1) {
						quiz.currentIndex++;
						quiz.displayQuestion(quiz.currentIndex);
					} else {
						quiz.displayFinish();
					}
				});
		});
		
		//display all
		wrapper.fadeIn("fast");
	},
	
	displayFinish: function() {
		var correctAnswers = 0;
		var totalAnswers = this.userAnswers.length 
		
		//get all the answers and check them
		for (var i = 0; i < totalAnswers; i++) {
			if (this.userAnswers[i] == timanderic[i].correctAnswer) {
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
		
		//restart button
		var restartButton = $("<button/>").attr({
			id: "restartButton",
		}).html("RESTART");

		wrapper.append(restartButton);
		restartButton.on("click", quiz.restart);
		
		//display all
		//display all
		$("#wrapper").fadeIn("fast");
	},
	
	restart: function() {
		//reset score
		quiz.currentIndex = 0;
		quiz.userAnswers = [];
		
		//empty 
		
		var wrapper = $("#wrapper");
		wrapper.fadeOut("slow", function() {
			wrapper.html("");
			quiz.displayQuestion(quiz.currentIndex);
		});
		
		
		
	}
};


window.onload = function() {
	
	//set start event listener
	$("#startButton").on("click", function() {
		$(this).css("display", "none");
		quiz.displayQuestion(quiz.currentIndex);
	});
	
	
}


 