<?php

session_start();
if (isset($_SESSION['afeluserid'])){
    $useridea = $_SESSION['afeluserid'];
    if (isset($_GET['act'])){
        $act = $_GET['act'];
        echo file_get_contents('http://localhost:8011/?user='.$useridea.'&act='.$act, false, $context);
    }
    else {
        echo '{"status": "error", "error": "no activity provided"}';        
    }
} else {
    echo '{"status": "error", "error": "user not logged in"}';
}
