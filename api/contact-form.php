<?php
    header('Content-Type: application/json');
    $name = filter_input(INPUT_POST, 'name');
    $email = filter_input(INPUT_POST, 'email');
    $message = filter_input(INPUT_POST, 'message');
    
    if(empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array('status' => 'error'));
    } else {
        $toemail = 'dada_hayath11@yahoo.com';
        $subject = "Enquiry from dadahayath.com";
        $headers = "MIME-Version: 1.0\n"
            ."From: \"".$name."\" <".$email.">\n"
            ."Content-type: text/html; charset=iso-8859-1\n";
        $body = "Name: ".$name."<br>\n"
            ."Email: ".$email."<br>\n"
            ."Message:<br>\n"
            .$message;
        
        mail($toemail, $subject, $body, $headers);
        echo json_encode(array('status' => 'ok'));
    }
?>