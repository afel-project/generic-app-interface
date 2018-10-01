<?php

session_start();
$user = $_SESSION['afeluserid'];
    
$data = array(
    "user" => $user,
    "type" => $_POST['type'],
    "label" => $_POST['label'],
    "message" => $_POST['message'],
    "time" => round(microtime(true) * 1000)
);
$data_string = json_encode($data);
$ch = curl_init('http://127.0.0.1:9200/afel-bh-logs/event/');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))
);
$result = curl_exec($ch);

echo $result;

