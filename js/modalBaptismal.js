var userFormInput = {};

$(document).ready(function(){
	$(".secondStep").hide();
	$("#recordBtn").hide();
	$("#backBtn").hide();
	$("#searchBtn").hide();

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
		
		$("#searchResults").remove();
		$.post("php/searchRecord.php", userFormInput, function(json){
			console.log(json);
			if(json.queryStatus == "success"){
				$(".firstStep").hide();
				$("#modalBody").prepend('<div id="searchResults"></div>');
				for(var i = 1; i <= json.counter; i++){
					var jsonIdNumber = json['idNumber'+i];
					var stringSettings = '<button id="deleteBtn'+i+'" userId="'+jsonIdNumber+'" data-rf="'+i+'" class="btn btn-default pull-right deleteBtn" style="margin-left: 5px;"><span class="glyphicon glyphicon-remove"></span></button><button id="editBtn'+i+'" userId="'+jsonIdNumber+'" class="btn btn-default pull-right editBtn"><span class="glyphicon glyphicon-pencil"></span></button></span>';
					$("#searchResults").append('<p class="appendedSearch" id="appended'+i+'"><span data-rf="'+i+'" id="resultChristian'+i+'">'+json['childLName'+jsonIdNumber]+', '+json['childFName'+jsonIdNumber]+' '+json['childMName'+jsonIdNumber]+'<button id="confirmedDeleteBtn'+i+'" style="margin-left: 5px;" class="btn btn-danger pull-right confirmedDeleteBtn">Delete</button>'+stringSettings+'</p><br class="resultBreak" />');
					$("#confirmedDeleteBtn"+i).hide();
				}

				$(".deleteBtn").click(function(){
					console.log("deleteBtn");
					var parentId = this.parentNode.getAttribute('data-rf');
					$(".confirmedDeleteBtn").hide();
					$("#deleteBtn" + parentId).hide();
					$("#confirmedDeleteBtn"+parentId).show("slow");
				});

				$(".confirmedDeleteBtn").click(function(){
					var parentId = this.parentNode.getAttribute('data-rf');
					$(".confirmedDeleteBtn").hide();
					$(".deleteBtn").show();
					$("#confirmedDeleteBtn"+parentId).show();
					$("#deleteBtn"+parentId).hide();

					var jsonIdNumber = this.parentNode.getAttribute('userId');

					var deleteFromDB = 	{
											inputLastName: json['childLName'+jsonIdNumber],
											inputFirstName: json['childFName'+jsonIdNumber],
											inputMiddleName: json['childMName'+jsonIdNumber],
											bdayMonth: json['bdayMonth'+jsonIdNumber],
											bdayDay: json['bdayDay'+jsonIdNumber],
											bdayYear: json['bdayYear'+jsonIdNumber]
										};
					console.log(deleteFromDB);
					$.post("php/deleteRecord.php", deleteFromDB, function(json){
						console.log(json);
						if(json.queryStatus == "success"){
							alert("Successfully Deleted: " + json.childLName  + ", " + json.childFName + " " + json.childMName);
							$("#appended" + parentId).remove();
						}
						else{
							alert("Failed to Delete Record. Please try again later.");
						}
					});
					console.log("confirmedDeleteBtn");		
				});

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
		$("#searchResults").remove();
	});
});