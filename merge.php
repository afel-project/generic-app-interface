<?php

session_start();
if (isset($_SESSION['afeluserid'])){
    $useridea = $_SESSION['afeluserid'];
    if (isset($_GET['scope'])){
        $scope = $_GET['scope'];
        echo file_get_contents('http://localhost:8010/?user='.$useridea.'&scope='.$scope, false, $context);
    } elseif  (isset($_GET['scope1']) && isset($_GET["scope2"])){
        $scope = $_GET['scope1'];
        $scope2 = $_GET['scope2'];
        echo file_get_contents('http://localhost:8010/?user='.$useridea.'&scope='.$scope.'&scope2='.$scope2, false, $context);
    }
    else {
        echo '{"status": "error", "error": "no scope provided"}';        
    }
} else {
    echo '{"status": "error", "error": "user not logged in"}';
}
