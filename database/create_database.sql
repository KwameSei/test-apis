
/* Create a database */
CREATE DATABASE IF NOT EXISTS database_name;
/* Use the database */
USE database_name;

/* Create a user and grant privileges */
CREATE USER IF NOT EXISTS 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'localhost';
FLUSH PRIVILEGES;

/* Executing the script */
/*mysql -u root -p < create_database.sql*/
/*mysql -u root -pYourRootPassword < create_database.sql*/
