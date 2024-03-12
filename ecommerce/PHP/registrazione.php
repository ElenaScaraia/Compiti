<?php
include "connessione.php";

$conn = new mysqli($hostname, $username, $password, $dbname);
if ($conn->connect_error) {
    die('Connessione fallita: ' . $conn->connect_error);
}

if(isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $account = 2;

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO Utenti (Email, password_utente, tipo) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $username, $hashedPassword, $account);

    if ($stmt->execute()) {
        echo "Utente registrato con successo!";
        header("Location: ../Index.html");
        exit();
    } else {
        echo "Registrazione fallita: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Errore: username o password mancanti.";
}

$conn->close();
?>
