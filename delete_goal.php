<?php

session_start();
if (isset($_SESSION['afeluserid'])){    
    $useridea = $_SESSION['afeluserid'];
    if (isset($_GET['scope']) && isset($_GET['indicator'])){        
        echo file_get_contents('http://localhost:8033/?user='.$useridea.'&scope='.$_GET['scope'].'&indicator='.$_GET['indicator'], false);
    } else {
        echo '{"status": "error", "error": "scope/indicator not provided"}';
    }    
} else {
    echo '{"status": "error", "error": "user not logged in"}';
}
