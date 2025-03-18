CREATE DATABASE prueba_tecnica_dlt;

USE prueba_tecnica_dlt;

CREATE TABLE users (

  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Cuidador', 'Maestro') NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE creatures (

  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100) NOT NULL,
  type ENUM('Dragón', 'Fénix', 'Golem', 'Vampiro', 'Unicornio') NOT NULL,
  power_level INT CHECK (power_level >= 1 AND power_level <= 10),
  trained BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);

-- Insertando un usuario con el rol de 'Cuidador' Contraseña: '123456'
INSERT INTO users (username, email, password, role, description)
VALUES ('Radagast el Jardinero', 'radijar@santuario.com', '$2a$12$qwsSmBaWwoJfjJErTHuHfe/opj4EygD/M4EZhcu3AqmAB9EWRKGh.', 'Cuidador', 'Soy un guardián del bosque y protector de criaturas mágicas. Soy un tanto excéntrico, dedico mi vida a cuidar de una vasta variedad de seres fantásticos, desde majestuosos dragones hasta diminutas hadas. Poseo un vasto conocimiento de las artes curativas y la magia antigua, lo que me permite sanar y proteger a las criaturas que encuentro en sus viajes.');

-- Insertando un usuario con el rol de 'Maestro' Contraseña: '123456'
INSERT INTO users (username, email, password, role, description)
VALUES ('Jaime el Valiente', 'jaime_valiente@bestiario.com', '$2a$12$qwsSmBaWwoJfjJErTHuHfe/opj4EygD/M4EZhcu3AqmAB9EWRKGh.', 'Maestro', 'Soy Jaime el Valiente, maestro en el arte de invocar y dominar criaturas. En mis partidas, cada criatura tiene una historia, un propósito, y un papel crucial en las épicas aventuras. Desde dragones imponentes hasta criaturas misteriosas de los bosques.');

-- Insertando una criatura tipo dragón
INSERT INTO creatures (user_id, name, type, power_level, trained)
VALUES (1, 'Fuego Negro', 'Dragón', 4, TRUE);

-- Insertando una criatura tipo fénix
INSERT INTO creatures (user_id, name, type, power_level, trained)
VALUES (1, 'Renacimiento', 'Fénix', 2, FALSE);

-- Insertando una criatura tipo golem
INSERT INTO creatures (user_id, name, type, power_level, trained)
VALUES (1, 'Piedrolo', 'Golem', 2, TRUE);

-- Insertando una criatura tipo unicornio
INSERT INTO creatures (user_id, name, type, power_level, trained)
VALUES (2, 'Luz Divina', 'Unicornio', 2, FALSE);