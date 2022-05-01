#syntax=docker/dockerfile:1
FROM mariadb
COPY config.cnf /etc/mysql/conf.d/
COPY init/* /docker-entrypoint-initdb.d/
