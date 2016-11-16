function iduSetup(){
	//loads the json from the file, then sets the questions on the page
	$.getJSON("ARCH-TOOLS.json", setIDUPage);
	//wait for success
}

	// $(".answer3").on("click",function(){
	// 	$("#finish").collapse("show");
	// });

	function setIDUPage(json){
		//alert("Set page");
		var iduData = json.tests.IDU;
		$("#title").html(iduData.name);
		$("#finish").collapse("hide");
		$("#question2").collapse({toggle:false});
		$("#question3").collapse({toggle:false});
		$("#question4").collapse({toggle:false});
		$("#question5").collapse({toggle:false});
		$("#question6").collapse({toggle:false});
		$("#question7").collapse({toggle:false});
		//loop through the questions and set the text
		for(var index in iduData.questions){
			var question = iduData.questions[index];
			var text = question["text"];
			var num = question["number"];
			//set the question text
			$("#question" + num + "Text").html(text);
		}
		
		$(".answer1").on("click",function(){

			$("#question2").collapse("show");
		});

	    $(".answer2").on("click",function(){

	      $("#question3").collapse("show");
	    });

	    $(".answer3").on("click",function(){

	      $("#question4").collapse("show");
	    });

	    $(".answer4").on("click",function(){

	      $("#question5").collapse("show");
	    });

	    $(".answer5").on("click",function(){

	      $("#question6").collapse("show");
	    });

	    $(".answer6").on("click",function(){

	      $("#question7").collapse("show");
	    });

	}
