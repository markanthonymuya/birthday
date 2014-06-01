<?php
	require('../key/access.php');

	$search = $_POST ['search_term'];

	$searchResults = array();
  
	$search_exploded = explode (" ", $search);
	    
	$x=0;
	$construct = "";

	foreach($search_exploded as $search_each){
		
		$x++;
		
		if($x==1){
			$construct .="searchableText LIKE '%$search_each%'";
		}
		else{
			$construct .="AND searchableText LIKE '%$search_each%'"; 
		}
	}
	  
	$constructs ="SELECT * FROM searchengine WHERE $construct";
	$run = mysqli_query($con, $constructs);
		    
	$foundnum = mysqli_num_rows($run);

	$searchResults['queryStatus'] = "noResults";
		    
	if ($foundnum==0){
        $searchResults['queryStatus'] = "noResults";
	}
	else{ 
		$searchResults['$numberOfResults'] = $foundnum;
			  
		$numberOfResultLimit = 10;
		$max_pages = ceil($foundnum / $numberOfResultLimit);

		$start=0;

		if(!$start){
			$getquery = mysqli_query($con, "SELECT * FROM searchengine WHERE $construct LIMIT $start, $numberOfResultLimit");
		}
		while($runrows = mysqli_fetch_assoc($getquery)){
			$start++;
			$searchResults['text'.$start] = $runrows ['searchableText'];
			$searchResults['christianId'.$start] = $runrows ['christianId'];
			$christianIdNumber = $searchResults['christianId'.$start];
			$getRecordsInChristians = mysqli_query($con, "SELECT * FROM christians WHERE christianId='$christianIdNumber'");
			$row = mysqli_fetch_array($getRecordsInChristians);
			$searchResults['childLName'.$start] = $row['childLName'];
			$searchResults['childFName'.$start] = $row['childFName'];
			$searchResults['childMName'.$start] = $row['childMName'];
			$searchResults['bdayMonth'.$start] = $row['bdayMonth'];
			$searchResults['bdayDay'.$start] = $row['bdayDay'];
			$searchResults['bdayYear'.$start] = $row['bdayYear'];
			$searchResults['counter'] = $start;
		}
        $searchResults['queryStatus'] = "hasResults";
	}


	header("Content-type:application/json");
    echo json_encode($searchResults);
?>