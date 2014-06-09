<?php
    require('../key/access.php');

    $childLName = $_POST['inputLastName'];
    $childFName = $_POST['inputFirstName'];
    $childMName = $_POST['inputMiddleName'];
    $bdayMonth = $_POST['bdayMonth'];
    $bdayDay = $_POST['bdayDay'];
    $bdayYear = $_POST['bdayYear'];
    $searchableText = $_POST['searchableText'];

    $deletedRecordJson = array();
    $deletedRecordJson['queryStatus'] = "fail";
    $deletedRow = mysqli_query($con, "DELETE FROM christians WHERE bdayMonth='$bdayMonth' AND bdayDay='$bdayDay' AND bdayYear='$bdayYear' AND childLName='$childLName' AND childFName='$childFName' AND childMName='$childMName'");
    $deletedRow = mysqli_query($con, "DELETE FROM searchengine WHERE searchableText='$searchableText'");

    if($deletedRow == 1){
        $deletedRecordJson['queryStatus'] = "success";
        $deletedRecordJson['childLName'] = $childLName;
        $deletedRecordJson['childFName'] = $childFName;
        $deletedRecordJson['childMName'] = $childMName;
    }

    header("Content-type:application/json");
    echo json_encode($deletedRecordJson);

    mysqli_close($con);

?>

