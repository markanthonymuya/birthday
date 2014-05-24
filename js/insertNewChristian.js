$(document).ready(function(){
	$(".secondStep").hide();
	$("#recordBtn").hide();

	$("#nextBtn").click(function(){
		$("#nextBtn").hide();
		$(".firstStep").hide();
		$(".secondStep").show();
		$("#recordBtn").show();
		$("#inputFatherName").focus();
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
		alert(userInputForReg);
		$.post("php/insertNewChristian.php", userInputForReg, function(json){
			console.log(json);
			if(json.queryStatus == "success"){
				alert("Data: " + json.childLName  + " " + json.childFName);				
			}
			else{
				alert("Failed");
			}
		});
	});
});