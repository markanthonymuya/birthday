$(document).ready(function(){

	var userFormInput = {};
	var updateBtn = false;

	$(".secondStep").hide();
	$(".thirdStep").hide();
	$("#backBtn2").hide();
	$("#backBtn3").hide();
	$("#nextBtn2").hide();
	$("#recordBtn").hide();
	$("#updateBtn").hide();
	$("#searchBtn").hide();
	$("#registerNewBtn").hide();
	$(".searchPanel").hide();

	//////////////////////////////REGISTRATION///////////////////////////////////

	$("#nextBtn1").click(function(){
		if($("#inputLastName").val() != "" && $("#inputFirstName").val() != "" && $("#bdayMonth").val() != "" && $("#bdayDay").val() != "" && $("#bdayYear").val() != ""){
			$("#backBtn2").show();
			$("#nextBtn2").show();
			$("#nextBtn1").hide();
			$(".firstStep").hide();
			$(".secondStep").show();
			$("#inputFatherName").focus();
			getUserRegFormInput();
			$("#myModalLabel").text(userFormInput.inputLastName +", "+ userFormInput.inputFirstName +" "+ userFormInput.inputMiddleName);
			$("#statusPerProcess").text("");
		}
		else{
			$("#statusPerProcess").text("Please complete required fields.");
			$("#statusPerProcess").attr("style", "color:red");

			$("input").click(function(){
				$("#statusPerProcess").hide();
			});
		}
	});

	$("#nextBtn2").click(function(){
		if($("#inputFatherName").val() != "" && $("#inputMotherName").val() != "" && $("#inputHomeAddress").val() != ""){
			$("#backBtn2").hide();
			$("#nextBtn2").hide();
			$("#backBtn3").show();
			$(".secondStep").hide();
			$(".thirdStep").show();
			if(updateBtn){
				$("#updateBtn").show();
			}
			else{
				$("#recordBtn").show();
			}
			$("#inputMinisterName").focus();
			$("#inputMinisterName").val("Rev. Fr. ");
		}
		else{
			$("#statusPerProcess").text("Please complete required fields.");
			$("#statusPerProcess").attr("style", "color:red");

			$("input").click(function(){
				$("#statusPerProcess").hide();
			});
		}
	});

	$("#backBtn2").click(function(){
		$("#myModalLabel").text("New Christian");
		$("#backBtn2").hide();
		$("#nextBtn1").show();
		$("#nextBtn2").hide();
		$(".firstStep").show();
		$(".secondStep").hide();
		$("#inputLastName").focus();
	});

	$("#backBtn3").click(function(){
		$("#backBtn3").hide();
		$("#backBtn2").show();
		$("#nextBtn2").show();
		$(".secondStep").show();
		$(".thirdStep").hide();
		$("#recordBtn").hide();
		$("#inputFatherName").focus();
	});

	$("#recordBtn").click(function(){
		if($("#inputMinisterName").val() != "" && $("#inputGodfatherName").val() != "" && $("#inputGodmotherName").val() != "" && $("#baptismMonth").val() != "" && $("#baptismDay").val() != "" && $("#baptismYear").val() != "" && $("#inputBaptismRegNum").val() != "" && $("#inputBaptismPageNum").val() != "" && $("#inputBaptismBookNum").val() != ""){
			getUserRegFormInput();
			$("#recordBtn").attr("disabled","disabled");
			$.post("php/insertNewRecord.php", userFormInput, function(json, status){
				console.log(status);
				console.log(json);
				if(json.queryStatus == "success" && status == "success"){
					$("#registerNewBtn").show();
					$("#registerNewBtn").focus();
					$("#recordBtn").hide();
					$("#statusPerProcess").text("Successfully Recorded: " + json.childLName  + ", " + json.childFName + " " + json.childMName);
					$("#statusPerProcess").attr("style", "color:green");
					$("#backBtn3").hide();
				}
				else{
					alert("Failed to Record New Registrant. Please try again later.");
					$("#recordBtn").removeAttr("disabled");
				}
			});
		}
		else{
			$("#statusPerProcess").text("Please complete required fields.");
			$("#statusPerProcess").attr("style", "color:red");

			$("input").click(function(){
				$("#statusPerProcess").hide();
			});
		}
	});

	$("#registerNewBtn").click(function(){
		resetRegForm();
		$("#inputFirstName").focus();
	});

	////////////////////////////////SEARCH///////////////////////////////////

	$("#searchRecord").click(function(){
		$("#myModalLabel").text("Search Records");
		$("#nextBtn1").hide();
		$(".searchPanel").show();
		$("#searchBtn").show();
		$(".firstStep").hide();
	});

	$("#searchBtn").click(function(){
		
		$("#searchResults").remove();
		$.post("php/searchEngine.php", {search_term: $("#searchBar").val()}, function(json){
			console.log(json);
			if(json.queryStatus == "hasResults"){
				$(".firstStep").hide();
				$("#modalBody").prepend('<div id="searchResults"></div>');
				for(var i = 1; i <= json.counter; i++){
					var christianIdNumber = json['christianId'+i];
					// console.log("ChristianId");
					// console.log(christianIdNumber);
					var stringSettings = '<button id="deleteBtn'+i+'" userId="'+christianIdNumber+'" data-rf="'+i+'" class="btn btn-default pull-right deleteBtn" style="margin-left: 5px;"><span class="glyphicon glyphicon-remove"></span></button><button id="editBtn'+i+'" userId="'+christianIdNumber+'" class="btn btn-default pull-right editBtn"><span class="glyphicon glyphicon-pencil"></span></button></span>';
					$("#searchResults").append('<p class="appendedSearch"  id="appended'+i+'"><span data-rf="'+i+'" id="resultChristian'+i+'">'+json['childLName'+i]+', '+json['childFName'+i]+' '+json['childMName'+i]+'<button id="confirmedDeleteBtn'+i+'" userId="'+christianIdNumber+'" data-rf="'+i+'" style="margin-left: 5px;" class="btn btn-danger pull-right confirmedDeleteBtn">Delete</button>'+stringSettings+'</p><br class="resultBreak" />');
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
					
					var confirmedPopUp = confirm("Do you really want to delete " + json['childLName'+parentId] + ", " + json['childFName'+parentId] + " " + json['childMName'+parentId] + " records?");

					if(confirmedPopUp){
						
						var deleteFromDB = 	{
												inputLastName: json['childLName'+parentId],
												inputFirstName: json['childFName'+parentId],
												inputMiddleName: json['childMName'+parentId],
												bdayMonth: json['bdayMonth'+parentId],
												bdayDay: json['bdayDay'+parentId],
												bdayYear: json['bdayYear'+parentId],
												searchableText: json['text'+parentId]
											};
						
						$.post("php/deleteRecord.php", deleteFromDB, function(json){
							console.log(json);
							if(json.queryStatus == "success"){
								$("#statusPerProcess").text("Successfully Deleted: " + json.childLName  + ", " + json.childFName + " " + json.childMName);
								$("#statusPerProcess").attr("style", "color:green");
								$("#statusPerProcess").show("slow");
								$("#appended" + parentId).remove();
							}
							else{
								alert("Failed to Delete Record. Please try again later.");
							}
						});
						console.log("confirmedDeleteBtn");
						console.log(json['christianId'+parentId]);
					}
					else{
						$(".confirmedDeleteBtn").hide();
						$(".deleteBtn").show();
					}	
				});

				$(".editBtn").click(function(){
					resetRegForm();

					updateBtn = true;

					var parentId = this.parentNode.getAttribute('data-rf');
												
					$("#inputLastName").val(json['childLName'+parentId]);
					$("#inputFirstName").val(json['childFName'+parentId]);
					$("#inputMiddleName").val(json['childMName'+parentId]);
					$("#bdayMonth").val(json['bdayMonth'+parentId]);
					$("#bdayDay").val(json['bdayDay'+parentId]);
					$("#bdayYear").val(json['bdayYear'+parentId]);
					
					$.post("php/editSearcher.php", {christianId: json['christianId'+parentId]}, function(jsonEditSearcher){
						if(jsonEditSearcher.queryStatus == "success"){
							console.log(jsonEditSearcher);
							$("#inputFatherName").val(jsonEditSearcher.fatherName);
							$("#inputMotherName").val(jsonEditSearcher.motherName);
							$("#inputEmailAddress").val(jsonEditSearcher.emailAddress);
							$("#inputHomeAddress").val(jsonEditSearcher.homeAddress);
							$("#inputMinisterName").val(jsonEditSearcher.ministerName);
							$("#inputGodfatherName").val(jsonEditSearcher.godFatherName);
							$("#inputGodmotherName").val(jsonEditSearcher.godMotherName);
							$("#baptismMonth").val(jsonEditSearcher.baptismMonth);
							$("#baptismDay").val(jsonEditSearcher.baptismDay);
							$("#baptismYear").val(jsonEditSearcher.baptismYear);
							$("#inputBaptismRegNum").val(jsonEditSearcher.baptismRegNum);
							$("#inputBaptismPageNum").val(jsonEditSearcher.baptismPageNum);
							$("#inputBaptismBookNum").val(jsonEditSearcher.baptismBookNum);
						}
					});	
				});
			
				$("#updateBtn").click(function(){
					$("#updateBtn").attr("disabled","disabled");
					getUserRegFormInput();
					$.post("php/editUpdater.php", userFormInput, function(json, status){
						console.log(status);
						console.log(json);
						if(json.queryStatus == "success" && status == "success"){
							$("#updateBtn").hide();
							$("#statusPerProcess").text("Successfully Recorded: " + json.childLName  + ", " + json.childFName + " " + json.childMName);
							$("#statusPerProcess").attr("style", "color:green");
							$("#backBtn3").hide();
							$("#searchBtn").hide();
							$(".searchPanel").hide();
						}
						else{
							alert("Failed to Update A Record. Please try again later.");
							$("#updateBtn").removeAttr("disabled");
						}
					});
				});
			}
			else{
				$("#modalBody").prepend('<div id="searchResults"></div>');
				$("#searchResults").append('<center><p class="appendedSearch">No Results</p></center><br class="resultBreak" />');
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
		//$("#inputFatherBirthPlace").val("");
		$("#inputMotherName").val("");
		//$("#inputMotherBirthPlace").val("");
		$("#inputEmailAddress").val("");
		$("#inputHomeAddress").val("");
		///////////////////////////////
		$("#inputMinisterName").val("");
		$("#inputGodfatherName").val("");
		//$("#inputGodfatherAddress").val("");
		$("#inputGodmotherName").val("");
		//$("#inputGodmotherAddress").val("");
		$("#baptismMonth").val("");
		$("#baptismDay").val("");
		$("#baptismYear").val("");
		$("#inputBaptismRegNum").val("");
		$("#inputBaptismPageNum").val("");
		$("#inputBaptismBookNum").val("");
	};

	var resetRegForm = function(){
		$("#myModalLabel").text("New Christian");
		$("#nextBtn1").show();
		$(".firstStep").show();
		$("#backBtn2").hide();
		$("#nextBtn2").hide();
		$("#backBtn3").hide();
		$(".secondStep").hide();
		$(".thirdStep").hide();
		$("#recordBtn").hide();
		$("#updateBtn").hide();
		clearAllRegFormInput();
		$("#recordBtn").removeAttr("disabled");
		$("#updateBtn").removeAttr("disabled");
		$("#registerNewBtn").hide();
		$("#statusPerProcess").text("");
		$(".searchPanel").hide();
		$("#searchBtn").hide();
		$("#searchResults").remove();
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
			//inputFatherBirthPlace: $("#inputFatherBirthPlace").val(),
			inputMotherName: 	$("#inputMotherName").val(),
			//inputMotherBirthPlace: $("#inputGodmotherAddress").val(),
			inputEmailAddress: 	$("#inputEmailAddress").val(),
			inputHomeAddress: 	$("#inputHomeAddress").val(),
			///////////////////////////////////////////////
			inputMinisterName: 	$("#inputMinisterName").val(),
			inputGodfatherName: $("#inputGodfatherName").val(),
			//inputGodfatherAddress: $("#inputGodfatherAddress").val(),
			inputGodmotherName: $("#inputGodmotherName").val(),
			//inputGodmotherAddress: $("#inputGodmotherAddress").val(),
			baptismMonth: 		$("#baptismMonth").val(),
			baptismDay: 		$("#baptismDay").val(),
			baptismYear: 		$("#baptismYear").val(),
			inputBaptismRegNum: $("#inputBaptismRegNum").val(),
			inputBaptismPageNum: $("#inputBaptismPageNum").val(),
			inputBaptismBookNum: $("#inputBaptismBookNum").val()
		};
	};

	var searchRecordsPane = function(){
		$("#myModalLabel").text("Search Records");
		$("#nextBtn1").hide();
		$(".firstStep").hide();
		$("#backBtn3").hide();
		$(".thirdStep").hide();
		$("#updateBtn").hide();
		$(".searchPanel").show();
		$("#searchBtn").show();
	};


	////////////MODAL EVENTS//////////////

	$('#myModal').on('hidden.bs.modal', function (e) {
		resetRegForm();
		userFormInput = {};
		updateBtn = false;
	});

	$('#myModal').on('shown.bs.modal', function (e) {
		$("#inputFirstName").focus();
	});
});