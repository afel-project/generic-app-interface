<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>AFEL Login</title>
          <style>
      * {font-family: Helvetica, Verdana, "Sans Serif"; font-size: 16px}
            #main {width: 70%; margin-left: 15%; margin-top: 5%}
            #form {margin-left: auto; margin-right: auto; margin-top: 20px; margin-bottom: 30px; width: 400px; background: #126567; border-radius: 15px; padding-top: 15px; padding-bottom: 10px;}
      .formfield {width: 80%; margin-left: 10%; margin-top: 10px; margin-bottom: 10px;}
            #username {width: 100%;}
            #password {width: 100%; margin-bottom: 10px;}
            #gobutton {width: 40%; text-align: center; background: #d34836; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; font-weight: bold; border-radius: 5px; color: white; text-decoration: none;}
      .message{margin-bottom: 30px; width: 80%; margin-left: 10%; padding: 15px 20px 15px 20px; background: #eee; border-radius: 5px}
                #error{visibility: visible;
          margin-bottom: 30px; width: 80%; margin-left: 10%; padding: 15px 20px 15px 20px; background: #fff; border-radius: 5px; color: #d34836}
       }
          </style>
        </head>
        <body>
          <div id="main">
      <div class="message">
      Please login onto the AFEL platform, using the same login you used to register the AFEL monitor browser extension.
      </div>
      </div>

<?php
      $error = "";
$username = "";
$password = "";
if (isset($_POST["username"])){
    $username = $_POST["username"];
}
if (isset($_POST["password"])){
    $password = $_POST["password"];
}
if ((isset($_POST["username"]) || isset($_POST["password"])) && ($password == "" || $username == "")){
    $error = "please provide a username and password";
} elseif (isset($_POST["username"]) && isset($_POST["password"])) {
    $url = 'https://data.afel-project.eu/catalogue/verifyuser';
    $params = "username=".$username."&password=".$password.
        "&type=retrieveonly";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);
    $result = json_decode($result);
    if (isset($result->error)){
        $error = $result->error;
    } else {
        if (isset($result->key)){
            session_start(); 
            $_SESSION["afeluserid"] = $result->key;
            header("Location:index.php");
        } else {
            $error = "Something went wrong with the authentication. Please contect the administrator of the platform";
        }
    }
}
?>

      <form id="form" method="POST">
      <div class="formfield">
      <input type="text" name="username" id="username" placeholder="username" value="<?php echo $username;?>"/>
      </div>
      <div class="formfield">
                <input type="password" name="password" id="password" placeholder="password" value="<?php echo $password;?>" />
      </div>
      <div class="formfield">
      <input type="submit" value="login" id="gobutton" />
      </div>
      </form>
      
      <div id="error">
         <?php echo $error ?>
      </div>
      
      </body>
      </html>
      