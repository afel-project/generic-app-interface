<?php
// Start the session
session_start();
?>
<?php

//echo "Token Expire";
if(isset($_POST['token']))
{
$token=$_POST['token'];
  $servername = "127.0.0.1";
  $username = "root";
  $password = "password";
  $dbname = "shareDatabase";

  // Create connection
  $conn = new mysqli($servername, $username, $password,$dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  //echo "Connected successfully";

  $sql = "SELECT * FROM `shareData` WHERE token = '$token'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
 while($row = mysqli_fetch_assoc($result)) {
    $data= $row["jsonData"];
    $myscope=$row["scope"];
    $ed=$row["expiryDate"];
 }
} else {
//echo "0 results";
}
mysqli_close($conn);
  $_SESSION['scopeData']=$data;
date_default_timezone_set("Europe/London");
$today_date=date('Y-m-d');
if(strtotime($today_date) > strtotime($ed)){

  header("Location: expireToken.html"); /* Redirect browser */
  //echo "Token Expire";
//  exit();
}
else{

header("Location: index.php?token=$token");
}
}
 ?>
