$(document).ready(function(){
	//loads the json from the file, then sets the questions on the page
	$.getJSON("ARCH-TOOLS.json", setPage);
	//init, don't let them toggle
	$("#question2").collapse({toggle:false});
	$("#question3").collapse({toggle:false});

	$(".answer1").on("click",function(){
		$("#question2").collapse("show");
		$("#collapse2").collapse("show");
	});

	$(".answer2pos").on("click",function(){
		$("#question3").collapse("show");
		$("#collapse3").collapse("show");
	});

	$(".answer2neg").on("click",function(){
		$("#finish").collapse("show");
		$("#question3").collapse("hide");
		$("#collapse3").collapse("hide");
	});

	$(".answer3").on("click",function(){
		$("#finish").collapse("show");
	});

	function setPage(json){
		//alert("Set page");
		var iduData = json.tests.IDU;
		$("#title").html(iduData.name);
		//time to iterate through the questions
		var num = 1;
		foreach(var question in iduData.questions){
			//do different things based on the question
			if(question.type === "Radio"){
				addRadioButton(question, num);
			}
			num++;
		}
	}


	// $("#accordion").html("This is a test");
	// $("#accordion").html("Test 2");
	// $("#accordion").append("Test 3");
	}

	function addRadioButton(question, number){
		var html = "<div id=\"question" + number +
		"\" panel panel-default\"><div class=\"panel-heading\"  data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse" + number +
		"\"><h4 class=\"panel-title\"><a>Question " + number + "
		</a></h4></div><div id=\"collapse\"" + number +
		"\" class=\"panel-collapse collapse in\" data-parent=\"#accordion\"><div class=\"panel-body\">" + question.text +
		"<br/>div>label class=\"btn btn-primary\"><input class=\"answer\"" + number +
		;
	}
});
