<?php
    try 
    {
        $bdd = new PDO('HostAdresse','ID','MDP');
        $bdd->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }
    catch(Exception $e)
    {
        die('Erreur: ' . $e->getMessage());
    }
    $stmt = $bdd -> prepare("SELECT id,lastname,firstname FROM patients WHERE lastname LIKE ?");
    $res = $stmt-> execute(array(
        $_GET["q"].'%'
    ));
    // $res = $bdd->query($sql);
    $patients = [];
    while($data = $stmt->fetch())
    {
        $patient = [
            'id' => $data['id'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname']
        ];
        $patients [] = $patient;
    };
    header('content-type: application/json');
    echo json_encode($patients);
?>