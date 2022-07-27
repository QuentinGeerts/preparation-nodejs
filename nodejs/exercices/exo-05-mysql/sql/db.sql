-- Création des tables
CREATE TABLE user (
  user_id INT AUTO_INCREMENT PRIMARY KEY
  , pseudo VARCHAR(100) NOT NULL
);

CREATE TABLE tweet (
  tweet_id INT AUTO_INCREMENT PRIMARY KEY
  , message VARCHAR(500) NOT NULL
  , user_id INT

  , CONSTRAINT FK_user FOREIGN KEY (user_id)
    REFERENCES user (user_id)
);

-- Insertion des valeurs
INSERT INTO user (pseudo)
VALUES 
  ('Quentin')