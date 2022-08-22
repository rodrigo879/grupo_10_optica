-- Crea la base de datos en caso de que no exista.
CREATE DATABASE IF NOT EXISTS `optica_riff`;
USE `optica_riff`;

-- Estructura de la tabla brands:
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Estructura de la tabla images_products:
DROP TABLE IF EXISTS `images_products`
CREATE TABLE `images_products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id_imageUser` int NOT NULL,
  `id_authority` int NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `imageUser`
CREATE TABLE `imageUser`(
  `id` int NOT NULL,
  `name` varchar(200) -- DEFAULT (image_default) ??
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;