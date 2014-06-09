<?php
    require('../key/access.php');

    $childLName = $_POST['inputLastName'];
    $childFName = $_POST['inputFirstName'];
    $childMName = $_POST['inputMiddleName'];
    $bdayMonth = $_POST['bdayMonth'];
    $bdayDay = $_POST['bdayDay'];
    $bdayYear = $_POST['bdayYear'];

    // $childLName = $_GET['inputLastName'];
    // $childFName = $_GET['inputFirstName'];
    // $childMName = $_GET['inputMiddleName'];
    // $bdayMonth = $_GET['bdayMonth'];
    // $bdayDay = $_GET['bdayDay'];
    // $bdayYear = $_GET['bdayYear'];

    $searchRecordJson = array();
    $searchRecordJson['queryStatus'] = "fail";

    $queryId = mysqli_query($con, "SELECT * FROM christians WHERE childLName='$childLName' OR childFName='$childFName' OR childMName='$childMName' OR bdayMonth='$bdayMonth' OR bdayDay='$bdayDay' OR bdayYear='$bdayYear'");
    
    if($queryId){
        $searchRecordJson['queryStatus'] = "success";
        if(mysqli_num_rows($queryId) > 0){
            $counter = 1;
            while($row = mysqli_fetch_array($queryId)){
                $idNumber = $row['id'];
                $searchRecordJson['idNumber'.$counter] = $row['id'];
                $searchRecordJson['childLName'.$idNumber] = $row['childLName'];
                $searchRecordJson['childFName'.$idNumber] = $row['childFName'];
                $searchRecordJson['childMName'.$idNumber] = $row['childMName'];
                $searchRecordJson['bdayMonth'.$idNumber] = $row['bdayMonth'];
                $searchRecordJson['bdayDay'.$idNumber] = $row['bdayDay'];
                $searchRecordJson['bdayYear'.$idNumber] = $row['bdayYear'];
                $searchRecordJson['counter'] = $counter;
                $counter++;
            }
        }
    }

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

