<?php
include "connessione.php";
session_start();

if(isset($_POST["id"])) {
    $id = $_POST["id"];
    
    $conn = new mysqli($hostname, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connessione fallita: " . $conn->connect_error);
    }
    
    if (isset($_SESSION["conferma"]) && $_SESSION["conferma"]) {
        $email = $_SESSION["username"];
        
        $query = $conn->prepare("SELECT id FROM Utenti WHERE Email=?");
        $query->bind_param("s", $email);
        $query->execute();
        $result = $query->get_result();
        
        if ($row = $result->fetch_assoc()) {
            $id_utente = $row["id"];
            
            $query = $conn->prepare("INSERT INTO carrelli (id_utente, id_prodotto) VALUES (?, ?)");
            $query->bind_param("ii", $id_utente, $id);
            $query->execute();
            
            header('Location: Carrello.php');
            exit();
        } else {
            echo "Errore nell'ottenere l'ID dell'utente.";
        }
    } else {
        echo "Per favore effettua il login per acquistare: ";
        echo "<a href='../HTML/Login.html'>Login</a>";
    }
} else {
    echo "Errore: ID non ricevuto.";
}
?>
