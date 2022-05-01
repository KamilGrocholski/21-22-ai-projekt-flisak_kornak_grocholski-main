#syntax=docker/dockerfile:1
FROM php:8.1.4-apache-bullseye

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}

RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN addgroup --gid ${GID} --system php
RUN adduser --gid ${GID} --system --disabled-password --shell /bin/sh --uid ${UID} php
USER php
