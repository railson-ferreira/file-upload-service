FROM mysql:5-debian

RUN echo "mysql -uroot -p\"\$MYSQL_ROOT_PASSWORD\" -e 'CREATE DATABASE IF NOT EXISTS db'" > /docker-entrypoint-initdb.d/7-create-db-and-table.sh
RUN echo "mysql -uroot -p\"\$MYSQL_ROOT_PASSWORD\" -e 'USE db; CREATE TABLE IF NOT EXISTS files (id INT PRIMARY KEY AUTO_INCREMENT, name TEXT, digest TEXT, mimeType TEXT, bytes MEDIUMBLOB)'" > /docker-entrypoint-initdb.d/7-create-db-and-table.sh
RUN chmod +x /docker-entrypoint-initdb.d/7-create-db-and-table.sh