<?php
    require('../key/access.php');

    $childLName = $_POST['inputLastName'];
    $childFName = $_POST['inputFirstName'];
    $childMName = $_POST['inputMiddleName'];
    $bdayMonth = $_POST['bdayMonth'];
    $bdayDay = $_POST['bdayDay'];
    $bdayYear = $_POST['bdayYear'];

    $deletedRecordJson = array();
    $deletedRecordJson['queryStatus'] = "fail";

    $queryId = mysqli_query($con, "SELECT id, childLName, childFName, childMName FROM christians WHERE childLName='$childLName' AND childFName='$childFName' AND childMName='$childMName' AND bdayMonth='$bdayMonth' AND bdayDay='$bdayDay' AND bdayYear='$bdayYear'");
    
    if(mysqli_num_rows($resultOwnerSearch) == 1){
        $row = mysqli_fetch_array($christianQuery);
        $deletedRecordJson['childLName'] = $row['childLName'];
        $deletedRecordJson['childFName'] = $row['childFName'];
        $deletedRecordJson['childMName'] = $row['childMName'];
        $idNumber = $row['id'];
        $deletedRow = mysqli_query($con, "DELETE FROM christians WHERE id='$idNumber'");
        if($deletedRow == 1){
            $deletedRecordJson['queryStatus'] = "success";
        }
    }

    header("Content-type:application/json");
    echo json_encode($deletedRecordJson);

    mysqli_close($con);

?>

