<?php

session_start();
if (isset($_SESSION['afeluserid'])){
    $useridea = $_SESSION['afeluserid'];
    if  (isset($_GET['scope1']) && isset($_GET["scope2"]) && isset($_GET["act"])){
        $scope = $_GET['scope1'];
        $scope2 = $_GET['scope2'];
        $act = $_GET["act"];
        echo file_get_contents('http://localhost:8012/?user='.$useridea.'&scope1='.$scope.'&scope2='.$scope2.'&act='.$act, false, $context);
    }
    else {
        echo '{"status": "error", "error": "no scope provided"}';        
    }
} else {
    echo '{"status": "error", "error": "user not logged in"}';
}
