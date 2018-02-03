<?php
    header('Content-Type: application/json');
    $data = array('year' => date("Y"));
    echo json_encode($data);
?>