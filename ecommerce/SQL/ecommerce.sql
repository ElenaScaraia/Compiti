CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE if NOT EXISTS Utenti(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Email VARCHAR(255) NOT NULL,
	password_utente VARCHAR(255) NOT NULL,
	tipo INT
);

CREATE TABLE if NOT EXISTS categorie(
	id INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(50),
	immagine VARCHAR(255)
);

CREATE TABLE if NOT EXISTS Prodotti(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(50),
	quantita INT,
	prezzo FLOAT,
	id_categoria INT,
	id_opzioni INT,
	FOREIGN KEY (id_categoria) REFERENCES categorie (id)
);

CREATE TABLE if NOT EXISTS carrelli(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_utente INT,
	id_prodotto INT,
	FOREIGN KEY (id_utente) REFERENCES utenti (id),
	FOREIGN KEY (id_prodotto) REFERENCES prodotti (id)
);


CREATE TABLE if NOT EXISTS ordini(
	id INT AUTO_INCREMENT PRIMARY KEY,
	prezzo FLOAT,
	id_carrello INT,
	FOREIGN KEY (id_carrello) REFERENCES carrelli (id)
);
