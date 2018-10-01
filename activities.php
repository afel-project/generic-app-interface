<?php

session_start();
if (isset($_SESSION['afeluserid'])){
    $useridea = $_SESSION['afeluserid'];
    if (isset($_GET['scope'])){
        $scope = $_GET['scope'];
        echo file_get_contents('http://localhost:8007/?user='.$useridea.'&scope='.$scope);
    } else {
        echo '{"status": "error", "error": "no scope provided"}';        
    }
} else {
    echo '{"status": "error", "error": "user not logged in"}';
}
