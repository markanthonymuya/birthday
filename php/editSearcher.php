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

    $queryId = mysqli_query($con, "SELECT christianId FROM christians WHERE childLName='$childLName' AND childFName='$childFName' AND childMName='$childMName' AND bdayMonth='$bdayMonth' AND bdayDay='$bdayDay' AND bdayYear='$bdayYear'");
    
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

