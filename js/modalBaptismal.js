$(document).ready(function(){
	$(".secondStep").hide();
	$("#recordBtn").hide();
	$("#backBtn").hide();
	$("#searchBtn").hide();
	var userFormInput = {};

	$("#nextBtn").click(function(){
		$("#backBtn").show();
		$("#nextBtn").hide();
		$(".firstStep").hide();
		$(".secondStep").show();
		$("#recordBtn").show();
		$("#inputFatherName").focus();
	});

	$("#backBtn").click(function(){
		$("#backBtn").hide();
		$("#nextBtn").show();
		$(".firstStep").show();
		$(".secondStep").hide();
		$("#recordBtn").hide();
		$("#inputLastName").focus();
	});

	$("#recordBtn").click(function(){
		getUserRegFormInput();
		
		$.post("php/insertNewRecord.php", userFormInput, function(json){
			console.log(json);
			if(json.queryStatus == "success"){
				alert("Successfully Recorded: " + json.childLName  + ", " + json.childFName + " " + json.childMName);
				$('#myModal').modal('hide');
			}
			else{
				alert("Failed to Record New Registrant. Please try again later.");
			}
		});
	});

	$("#searchRecord").click(function(){
		$("#myModalLabel").text("Search Records");
		$("#nextBtn").hide();
		$("#searchBtn").show();
		$(".firstStep").show();
		$("#inputLastName").focus();
	});

	$("#searchBtn").click(function(){
		getUserSearchFormInput();
		console.log("userInput: ");
		console.log(userFormInput);
		$.post("php/searchRecord.php", userFormInput, function(json){
			console.log(json);
			if(json.queryStatus == "success"){
				alert("Successfully Search: " + json.childLName  + ", " + json.childFName + " " + json.childMName);
				$('#myModal').modal('hide');
			}
			else{
				alert("Failed to Search A Record. Please try again later.");
			}
		});
	});

	//////////FUNCTIONS//////////

	var clearAllRegFormInput = function(){
		$("#inputLastName").val("");
		$("#inputFirstName").val("");
		$("#inputMiddleName").val("");
		$("#bdayMonth").val("");
		$("#bdayDay").val("");
		$("#bdayYear").val("");
		//////////////////////////////////
		$("#inputFatherName").val("");
		$("#inputMotherName").val("");
		$("#inputEmailAddress").val("");
		$("#inputHomeAddress").val("");
		$("#inputMinisterName").val("");
		$("#baptismMonth").val("");
		$("#baptismDay").val("");
		$("#baptismYear").val("");
	};

	var resetRegForm = function(){
		$("#myModalLabel").text("New Christian");
		$("#backBtn").hide();
		$("#nextBtn").show();
		$(".firstStep").show();
		$(".secondStep").hide();
		$("#recordBtn").hide();
		$("#searchBtn").hide();
		clearAllRegFormInput();
	};

	var getUserRegFormInput = function(){
		userFormInput = {
			inputLastName: 		$("#inputLastName").val(),
			inputFirstName: 	$("#inputFirstName").val(),
			inputMiddleName: 	$("#inputMiddleName").val(),
			bdayMonth: 			$("#bdayMonth").val(),
			bdayDay: 			$("#bdayDay").val(),
			bdayYear: 			$("#bdayYear").val(),
			////////////////////////////////////////////////
			inputFatherName: 	$("#inputFatherName").val(),
			inputMotherName: 	$("#inputMotherName").val(),
			inputEmailAddress: 	$("#inputEmailAddress").val(),
			inputHomeAddress: 	$("#inputHomeAddress").val(),
			inputMinisterName: 	$("#inputMinisterName").val(),
			baptismMonth: 		$("#baptismMonth").val(),
			baptismDay: 		$("#baptismDay").val(),
			baptismYear: 		$("#baptismYear").val()
		};
	};

	var getUserSearchFormInput = function(){
		userFormInput = {
			inputLastName: 		$("#inputLastName").val(),
			inputFirstName: 	$("#inputFirstName").val(),
			inputMiddleName: 	$("#inputMiddleName").val(),
			bdayMonth: 			$("#bdayMonth").val(),
			bdayDay: 			$("#bdayDay").val(),
			bdayYear: 			$("#bdayYear").val()
		};
	};


	////////////MODAL EVENTS//////////////

	$('#myModal').on('hidden.bs.modal', function (e) {
		resetRegForm();
		userFormInput = {};
	});
});