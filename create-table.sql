use db;
create table files (id INT PRIMARY KEY AUTO_INCREMENT, name TEXT, digest TEXT, mimeType TEXT, bytes mediumblob )