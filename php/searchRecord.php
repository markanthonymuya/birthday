<?php
    require('../key/access.php');

    $childLName = $_POST['inputLastName'];
    $childFName = $_POST['inputFirstName'];
    $childMName = $_POST['inputMiddleName'];
    $bdayMonth = $_POST['bdayMonth'];
    $bdayDay = $_POST['bdayDay'];
    $bdayYear = $_POST['bdayYear'];

    $searchRecordJson = array();
    $searchRecordJson['queryStatus'] = "fail";

    $queryId = mysqli_query($con, "SELECT * FROM christians WHERE childLName='$childLName' AND childFName='$childFName' AND childMName='$childMName' AND bdayMonth='$bdayMonth' AND bdayDay='$bdayDay' AND bdayYear='$bdayYear'");
    
    if(mysqli_num_rows($resultOwnerSearch) > 0){
        $counter = 1;
        while($row = mysqli_fetch_array($christianQuery)){
            $searchRecordJson['id' + $counter] = $row['id'];
            $searchRecordJson['childLName' + $counter] = $row['childLName'];
            $searchRecordJson['childFName' + $counter] = $row['childFName'];
            $searchRecordJson['childMName' + $counter] = $row['childMName'];
            $searchRecordJson['bdayMonth' + $counter] = $row['bdayMonth'];
            $searchRecordJson['bdayDay' + $counter] = $row['bdayDay'];
            $searchRecordJson['bdayYear' + $counter] = $row['bdayYear'];
            $searchRecordJson['counter'] = $counter;
            $counter++;
        }
    }

    header("Content-type:application/json");
    echo json_encode($searchRecordJson);

    mysqli_close($con);

?>

