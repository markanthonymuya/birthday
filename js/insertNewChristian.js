$(document).ready(function(){
	$(".secondStep").hide();
	$("#recordBtn").hide();

	$("#nextBtn").click(function(){
		$("#nextBtn").hide();
		$(".firstStep").hide();
		$(".secondStep").show();
		$("#recordBtn").show();
	});

	$("#recordBtn").click(function(){
		var userInputForReg = {
			inputLastName: 		$("#inputLastName").val(),
			inputFirstName: 	$("#inputFirstName").val(),
			inputMiddleName: 	$("#inputMiddleName").val(),
			bdayMonth: 			$("#bdayMonth").val(),
			bdayDay: 			$("#bdayDay").val(),
			bdayYear: 			$("#bdayYear").val(),

			inputFatherName: 	$("#inputFatherName").val(),
			inputMotherName: 	$("#inputMotherName").val(),
			inputEmailAddress: 	$("#inputEmailAddress").val(),
			inputHomeAddress: 	$("#inputHomeAddress").val(),
			inputMinisterName: 	$("#inputMinisterName").val(),
			baptismMonth: 		$("#baptismMonth").val(),
			baptismDay: 		$("#baptismDay").val(),
			baptismYear: 		$("#baptismYear").val()
		};

		$.post("php/insertNewChristian.php", userInputForReg, function(json){
			alert("Data: " + json);
		});
	});
});