<?php
    require('../key/access.php');

    $christianId = $_POST['christianId'];

    $searchRecordJson = array();
    $searchRecordJson['queryStatus'] = "fail";

    $queryDetails = mysqli_query($con, "SELECT * FROM details WHERE christianId='$christianId'");
    
            while($row = mysqli_fetch_array($queryDetails)){
                $searchRecordJson['fatherName'] = $row['fatherName'];
                $searchRecordJson['motherName'] = $row['motherName'];
                $searchRecordJson['emailAddress'] = $row['emailAddress'];
                $searchRecordJson['homeAddress'] = $row['homeAddress'];
                $searchRecordJson['ministerName'] = $row['ministerName'];
                $searchRecordJson['baptismMonth'] = $row['baptismMonth'];
                $searchRecordJson['baptismDay'] = $row['baptismDay'];
                $searchRecordJson['baptismYear'] = $row['baptismYear'];
                $searchRecordJson['baptismRegNum'] = $row['baptismRegNum'];
                $searchRecordJson['baptismPageNum'] = $row['baptismPageNum'];
                $searchRecordJson['baptismBookNum'] = $row['baptismBookNum'];
            }

    $queryDetails = mysqli_query($con, "SELECT * FROM sponsors WHERE christianId='$christianId'");

    $godParents = array("godFatherName", "godMotherName");
        
    $i = 0;
    while($row = mysqli_fetch_array($queryDetails)){
        $searchRecordJson[$godParents[$i]] = $row['sponsorName'];
        $i++;
    }

    if($queryDetails){
        $searchRecordJson['queryStatus'] = "success";
    }

    header("Content-type:application/json");
    echo json_encode($searchRecordJson);

    mysqli_close($con);

?>

