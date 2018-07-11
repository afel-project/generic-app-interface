<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$list = json_decode($_GET["l"]);
$url = 'http://localhost:9200/didactalia-activity-base/resource/_search';
$param = '{"query" : {"constant_score" : {"filter" : {"terms" : {"_id" : '.json_encode($list).'}}}}}';

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($param))
);
curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
curl_setopt($curl, CURLOPT_POST, 1);
$res = curl_exec($curl);
curl_close($curl);
echo($res);
?>