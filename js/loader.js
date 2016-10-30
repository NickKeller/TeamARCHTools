$(document).ready(function(){
	//loads the json from the file, then sets the questions on the page
	$.getJSON("ARCH-TOOLS.json", setPage);

	// $(".answer3").on("click",function(){
	// 	$("#finish").collapse("show");
	// });

	function setPage(json){
		//alert("Set page");
		var iduData = json.tests.IDU;
		$("#title").html(iduData.name);
		//use jsrender to render the template
		var template = $.templates("#questionstemplate");
		var htmlOutput = template.render(iduData.questions);
		$("#accordion").html(htmlOutput);
		//init, don't let them toggle
		$("#question2").collapse("hide");
		$("#question3").collapse("hide");

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
	}


	// $("#accordion").html("This is a test");
	// $("#accordion").html("Test 2");
	// $("#accordion").append("Test 3");
});
