<?php
    require('../key/access.php');

    $childLName = $_POST['inputLastName'];
    $childFName = $_POST['inputFirstName'];
    $childMName = $_POST['inputMiddleName'];
    $bdayMonth = $_POST['bdayMonth'];
    $bdayDay = $_POST['bdayDay'];
    $bdayYear = $_POST['bdayYear'];
    
    $fatherName = $_POST['inputFatherName'];
    $motherName = $_POST['inputMotherName'];
    $emailAddress = $_POST['inputEmailAddress'];
    $homeAddress = $_POST['inputHomeAddress'];
    $ministerName = $_POST['inputMinisterName'];
    $godFatherName = $_POST['inputGodfatherName'];
    $godMotherName = $_POST['inputGodmotherName'];
    $baptismMonth = $_POST['baptismMonth'];
    $baptismDay = $_POST['baptismDay'];
    $baptismYear = $_POST['baptismYear'];
    $baptismRegNum = $_POST['inputBaptismRegNum'];
    $baptismPageNum = $_POST['inputBaptismPageNum'];
    $baptismBookNum = $_POST['inputBaptismBookNum'];
 
    date_default_timezone_set("Asia/Manila");
    $dateAdded = date("Y/m/d");
    $timeAdded = date("H:i:s");

    $newRecordChristian = mysqli_query($con, "INSERT INTO christians (childLName, childFName, childMName, bdayMonth, bdayDay, bdayYear, encodingDate, encodingTime) VALUES ('$childLName', '$childFName', '$childMName', '$bdayMonth', '$bdayDay', '$bdayYear', '$dateAdded', '$timeAdded')");
    $newRecordDetails = mysqli_query($con, "INSERT INTO details (fatherName, motherName, emailAddress, homeAddress, ministerName, baptismMonth, baptismDay, baptismYear, baptismRegNum, baptismPageNum, baptismBookNum) VALUES ('$fatherName', '$motherName', '$emailAddress', '$homeAddress', '$ministerName', '$baptismMonth', '$baptismDay', '$baptismYear', '$baptismRegNum', '$baptismPageNum', '$baptismBookNum')");

    $bdayMonthInWords = "";
    switch ($bdayMonth) {
        case 1:
            $bdayMonthInWords = "january";
            break;
        case 2:
            $bdayMonthInWords = "february";
            break;
        case 3:
            $bdayMonthInWords = "march";
            break;
        case 4:
            $bdayMonthInWords = "april";
            break;
        case 5:
            $bdayMonthInWords = "may";
            break;
        case 6:
            $bdayMonthInWords = "june";
            break;
        case 7:
            $bdayMonthInWords = "july";
            break;
        case 8:
            $bdayMonthInWords = "august";
            break;
        case 9:
            $bdayMonthInWords = "september";
            break;
        case 10:
            $bdayMonthInWords = "october";
            break;
        case 11:
            $bdayMonthInWords = "november";
            break;
        case 12:
            $bdayMonthInWords = "december";
            break;
        default:
            $bdayMonthInWords = "error";
            break;
    }

    $searchengineText = $childFName.' '.$childMName.' '.$childLName.' '.$bdayMonth.' '.$baptismDay.' '.$bdayYear;
    $newRecordChristian = mysqli_query($con, "INSERT INTO searchengine (searchableText) VALUES ('$searchengineText')");

    $newRecordJson = array();
    $newRecordJson['queryStatus'] = "fail";

    if(!$newRecordChristian || !$newRecordDetails){
        $newRecordJson['queryStatus'] = "fail";        
    }
    else{
        $christianQuery = mysqli_query($con, "SELECT * FROM christians WHERE childLName = '$childLName' AND childFName = '$childFName' AND childMName = '$childMName'");
        while($row = mysqli_fetch_array($christianQuery)){
            $newRecordJson['childLName'] = $row['childLName'];
            $newRecordJson['childFName'] = $row['childFName'];
            $newRecordJson['childMName'] = $row['childMName'];
        }
        $newRecordJson['queryStatus'] = "success";         
    }

    header("Content-type:application/json");
    echo json_encode($newRecordJson);

    mysqli_close($con);

 ?>

