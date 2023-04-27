<?php

header("Access-Control-Allow-Origin: *");
/* */
//header("Access-Control-Allow-Origin: http://my.yacontent.com");
//header("Access-Control-Allow-Origin: http://r1.userto.com");
//header("Access-Control-Allow-Origin: http://userto.com");
//header('HTTP/1.1 200 OK');
header('Date: '.gmdate('l'));
//header('Server: Apache/2.0 (Unix)');
header('Cache-Control: max-age=0, must-revalidate');
header('Expires: '.gmdate('l'));
header('Last-Modified: '.gmdate('l'));
//header('ETag: "3e86-410-3596fbbc"');
//header('Content-Length: ');
header("Content-Type: text/html; charset=UTF-8");


//**********************************************************
// Шаг  Включаем код для отладки и определяем объект
//**********************************************************  
  //require_once("/home/u53393/my.yacontent.com/www/FirePHPCore/PHPDebug.php");
  //$debug = new PHPDebug();

  // Выводим "контрольные точки":
  //if (class_exists('PHPDebug')) { $debug->debug("Консоль wordXmlUpload.php "."", null, INFO); }

  
//**********************************************************
// Шаг  Получение серверных переменных
//**********************************************************  
  
  $HTTP_REFERER  = $_SERVER['HTTP_REFERER']; // => https://my.answerlot.com/dashboard.php
  //print_r($_SERVER);  
  
//**********************************************************
// Step starting session
//**********************************************************  
  
  session_start();

//**********************************************************
// Шаг  Фабрика загрузки классов классов классов
//**********************************************************  
  //https://phpfaq.ru/safemysql
  //https://github.com/colshrapnel/safemysql/blob/master/safemysql.class.php

  $factoryRequire    = [];
  $factoryRequire[0] = 'common';
  $factoryRequire[1] = 'safemysql';
  $factoryRequire[2] = 'siteWindows';

foreach ($factoryRequire as $key0 => $str) {
  include_once '../../../services/Includes/'.$factoryRequire[$key0].'.class.php';
}

//**********************************************************
// Шаг  Creating new objects of a classes
//**********************************************************

  $securityFunctions = new securityFunctions();
  $commonFunctions   = new commonFunctions();
  $siteWindows       = new siteWindows();

//**********************************************************
// Reading GET/POST data traditionally from xnr request
//**********************************************************

  $optGet      = (int) securityFunctions::stringSpecCharEscape($_GET['opt']);
  $fid         = securityFunctions::stringSpecCharEscape($_GET['fid']);
  $name        = securityFunctions::stringSpecCharEscape($_GET['name']);
  $type        = securityFunctions::stringSpecCharEscape($_GET['type']);
  $dpref       = securityFunctions::stringSpecCharEscape($_GET['dpref']);
  $statusShare = securityFunctions::stringSpecCharEscape($_GET['statusShare']);
  $jsonCurrent = (int) securityFunctions::stringSpecCharEscape($_GET['jsonCurrent']);
  $jsonChunks  = (int) securityFunctions::stringSpecCharEscape($_GET['jsonChunks']);
  $jsonLenTtl  = (int) securityFunctions::stringSpecCharEscape($_GET['jsonLenTtl']);
  $jsonLenSent = (int) securityFunctions::stringSpecCharEscape($_GET['jsonLenSent']);
  $jsonGet     = securityFunctions::stringSpecCharEscape($_GET['json']);
  $idUr       = (int) securityFunctions::stringSpecCharEscape($_GET['idUr']); 
  $hash        = securityFunctions::stringSpecCharEscape($_GET['hash']);

  //print_r($_GET);
  
//**********************************************************
// Reading JSON POST using PHP
//**********************************************************
  
  $json = file_get_contents('php://input');
  $postJsonObj = json_decode($json);
  
  
//**********************************************************
// Adding usefull data
//**********************************************************  
  
  # Убераем лишние пробелы и делаем двойное шифрование. Вариант использовать https://www.php.su/functions/?crypt  
  
  $user_ip  = $_SERVER['REMOTE_ADDR'];

  $dateTime  = date('Y-m-d H:i:s');

  //if (class_exists('PHPDebug')) { $debug->debug("opt ".$optGet, null, INFO); }else{echo 'PHPDebug absent';}

  
  $urlComposition  =  commonFunctions::urlComposition($HTTP_REFERER);
  $href  =  $urlComposition[3];
  //var_dump($href);

  if(empty( $jsonp ) || $jsonp === 'N'){ $jsonp = 'N'; }
  if(empty( $db )){ $db = 'db'; }
  if(empty( $cookie_prefix )){ $cookie_prefix = 'MyYaC'; }
  if(empty( $ipYn )){ $ipYn = 'N'; }
  if(empty( $secret_word )){ $secret_word = ''; }
  
  //Defining database props
  if($dpref === 'wit'){
  $db = 'db01';
  $cookie_prefix = 'wit';
  }

 

  
//**********************************************************
// Service Save a project
//**********************************************************  

  // Save / update a project with the user's credentials
  if ($optGet === 1) {
    $jsonp  = 'N';
    $report = [
        'optGet'      => $optGet,
        'db'          => $db,
        'dateTime'    => $dateTime,
        'idUr'       => $idUr,
        'hash'        => $hash,
        'fid'         => $fid,
        'name'        => $name,
        'type'        => $type,
        'dpref'       => $dpref,
        'statusShare' => $statusShare,
        'jsonCurrent' => $jsonCurrent,
        'jsonChunks'  => $jsonChunks,
        'jsonLenTtl'  => $jsonLenTtl,
        'jsonLenSent' => $jsonLenSent,
        //'jsonLenTtl' => 0,
        'json'        => '',
        'jsonGet'     => $jsonGet
    ];
    $report = (object) $report;
    // print_r($report);
    $report = $siteWindows->getChunkJsonp($report);
    echo 'jsonCallBackFunc('.json_encode($report).');';
  }

  // Get all documents that belongs to a particular user!
  else if ($optGet === 2) {
    //https://sitewindows.com/api/api_angel.php?jsonp=jsonCallBackFunc&opt=2&dpref=wit&idUr=1&hash=HoxvdsDyZVn2uq42oaDAnOa4Udi1QV
    $data = [
    'optGet' => $optGet,
    'db' => $db,
    'idUr' => $idUr, 
    'hash' => $hash];
    $data = (object) $data;
    //print_r($data);
    $report = $siteWindows->getDocListMdb($data);
    echo 'jsonCallBackFunc('.json_encode($report).');';
    //print_r($_GET);
  }

  // Load document by name!
  else if ($optGet === 3) {
    //https://sitewindows.com/api/api_angel.php?jsonp=jsonCallBackFunc&opt=3&dpref=wit&idUr=1&hash=HoxvdsDyZVn2uq42oaDAnOa4Udi1QV&name=1111
    $data = [
        'optGet' => $optGet,
        'db'     => $db,
        'idUr'  => $idUr,
        'hash'   => $hash,
        'name'   => $name,
    ];
    $data = (object) $data;
    //print_r($data);
    $report = $siteWindows->getDocByNameMdb($data);
    echo 'jsonCallBackFunc('.json_encode($report).');';
  }

 // Remove document by name!
  else if ($optGet === 4) {
    $data = [
        'optGet' => $optGet,
        'db'     => $db,
        'idUr'  => $idUr,
        'hash'   => $hash,
        'name'   => $name,
        'fid'    => $fid,
    ];
    $data = (object) $data;
    //print_r([data => $data]);
    $report = $siteWindows->markAsActiveFalseDocPermissionForUserMdb($data);
    echo 'jsonCallBackFunc('.json_encode($report).');';
    //print_r($_GET);
  }