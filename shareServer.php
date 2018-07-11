<?php

  include_once('db_connection.php');

  if(isset($_POST['scope']))
  {
      $scope = $_POST['scope'];
    //  echo $tokenNo;

      // Do whatever you want with the $uid
  }

if(isset($_POST['tokenNo']))
{
    $tokenNo = $_POST['tokenNo'];
  //  echo $tokenNo;

    // Do whatever you want with the $uid
}
if(isset($_POST['scopeData']))
{
  //$shareJson= array();
   $shareJson = $_POST['scopeData'];
//  echo $shareJson;

    // Do whatever you want with the $uid
}
function mysql_escape_mimic($inp) {
    if(is_array($inp))
        return array_map(__METHOD__, $inp);

    if(!empty($inp) && is_string($inp)) {
        return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp);
    }

    return $inp;
}
$ss=mysql_escape_mimic($shareJson);
date_default_timezone_set("Europe/London");
//////Set token Expiry after 1 day from current date//////
$ref_date=date('Y-m-d', strtotime($stop_date . ' +1 day'));
$sql = "INSERT INTO shareData (`token`, `expiryDate`,`jsonData`, `scope`)
VALUES ('$tokenNo', '$ref_date', '$ss','$scope')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
