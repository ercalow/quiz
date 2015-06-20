var quiz = {
	currentIndex: 0,
	userAnswers: [],
	
	displayQuestion: function(index) {
		//question
		var questionDiv = document.getElementById("question");
		questionDiv.innerHTML = ""; //erase contents
		var questionh1 = document.createElement("h1");
		questionDiv.appendChild(questionh1);
		questionh1.innerHTML = allQuestions[index].question;
		questionh1.setAttribute("id", "questionh1");
		
		//answers
		var answersDiv = document.getElementById("answers");
		answersDiv.innerHTML = ""; //erase contents
		for (var i=0; i<allQuestions[index].choices.length; i++) {
			
			var p = document.createElement("p");
			answersDiv.appendChild(p);
			
			var input = document.createElement("input");
			input.setAttribute("type", "radio");
			input.setAttribute("name", "answers");
			var inputID = "answer" + i;
			var inputValue = i;
			input.setAttribute("id", inputID);
			input.setAttribute("value", inputValue);
			p.appendChild(input);
			
			var label = document.createElement("label");
			label.setAttribute("for", inputID);
			label.innerHTML = allQuestions[index].choices[i];
			p.appendChild(label);
		}
	},
	
	displayFinish: function() {
		var correctAnswers = 0;
		var totalAnswers = quiz.userAnswers.length
		
		//get all the answers and check them
		for (var i=0; i < totalAnswers; i++) {
			if (quiz.userAnswers[i] == allQuestions[i].correctAnswer) {
				correctAnswers++;
			}
		}
		//remove everything and display result
		var wrapper = document.getElementById("wrapper");
		wrapper.innerHTML = "";
		var h1 = document.createElement("h1");
		wrapper.appendChild(h1);
		h1.innerHTML = "You got " + correctAnswers + " out of " + totalAnswers + " questions correct.";
		
		var p = document.createElement("p");
		wrapper.appendChild(p);
		
		if (correctAnswers <= (totalAnswers/2)) {
			p.innerHTML = "That's pretty bad. <br>"
			var img = document.createElement("img");
			p.appendChild(img);
			img.setAttribute("src", "images/timlose.jpg");
			
		} else {
			p.innerHTML = "That's pretty good. <br>"
			var img = document.createElement("img");
			p.appendChild(img);
			img.setAttribute("src", "images/timwin.gif");
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
	quiz.displayQuestion(0);
	var nextButton = document.getElementById("nextButton");
	nextButton.onclick = function() {
		//get answer
		quiz.userAnswers[quiz.currentIndex] = document.querySelector('input[name="answers"]:checked').value;
		
		//display next question
		if (quiz.currentIndex < allQuestions.length - 1) {
			quiz.currentIndex++;
			quiz.displayQuestion(quiz.currentIndex);
		} else {
			quiz.displayFinish();
		}
	};
}
 