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
		$("#finish").collapse("hide");
		//loop through the questions and set the text
		for(var index in iduData.questions){
			var question = iduData.questions[index];
			var text = question["text"];
			var num = question["number"];
			//set the question text
			$("#question" + num + "Text").html(text);
			$("#question" + num).collapse({toggle:false});
			$(".answer" + num).on("click", function(){
				$("#question" + (num + 1)).collapse("show");
				$("#collapse" + (num + 1)).collapse("show");
			});

		}
	}
});
