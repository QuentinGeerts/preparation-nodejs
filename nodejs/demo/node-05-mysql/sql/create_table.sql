-- Requete pour créer la table
CREATE TABLE student (
  student_id INT AUTO_INCREMENT PRIMARY KEY
  , firstname VARCHAR(50) NOT NULL
  , lastname VARCHAR(50) NOT NULL
  , year_result DECIMAL(3, 1) NULL
  , remark VARCHAR(1000) NULL
);

-- Rappel pour l'incrémentation : 
--  MySQL       : AUTO_INCREMENT
--  MMSQL       : IDENTITY
--  PostgreSQL  : GENERATED ALWAYS AS IDENTITY

-- Ajouter des données
INSERT INTO student (firstname, lastname, year_result, remark)
 VALUES ('Riri', 'Duck', 15, 'Toujours présent :p'),
        ('Zaza', 'Vanderquack', 17.5, NULL),
        ('Balthazar', 'Picsou', 20, 'Riche'),
        ('Donald', 'Duck', 5, NULL),
        ('Della', 'Duck', 10.5, NULL),
        ('Flagada', 'Jones', 17.9, NULL),
        ('Gontran', 'Bonheur', NULL, 'Absent'),
        ('Fifi', 'Duck', 13, 'Merci Vanessa :)');