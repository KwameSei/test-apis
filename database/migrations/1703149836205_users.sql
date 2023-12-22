CREATE TABLE IF NOT EXISTS {}.users (
  id INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_id INT(12) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  INDEX uemail (email),
  CONSTRAINT fk_urole FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
);