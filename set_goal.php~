<?php

session_start();
if (isset($_SESSION['afeluserid'])){
    $useridea = $_SESSION['afeluserid'];
    echo file_get_contents('http://localhost:8031/?user='.$useridea, false);
} else {
    echo '{"status": "error", "error": "user not logged in"}';
}
