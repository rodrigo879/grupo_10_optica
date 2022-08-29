-- Crea la base de datos en caso de que no exista.
CREATE DATABASE IF NOT EXISTS `optica_riff`;
USE `optica_riff`;

-- Estructura de la tabla brands:
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Estructura de la tabla images_products:
DROP TABLE IF EXISTS `images_products`;
CREATE TABLE `images_products` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- products
  DROP TABLE IF EXISTS `products`;
  CREATE TABLE `products` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` VARCHAR (100) NOT NULL,
    `descrption` TEXT(1000) NOT NULL,
    `price` DOUBLE NOT NULL,
    `id_category` INT NOT NULL,
    `id_brand` INT NOT NULL, 
    `id_image_product` INT NOT NULL,
      PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL,
  `fullName` VARCHAR(50) NOT NULL,
  `user` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `id_imageUser` INT NOT NULL,
  `id_authority` INT NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

-- image user
  DROP TABLE IF EXISTS `image_user`;
  CREATE TABLE `image_user` (
    `id` INT NOT NULL,
    `name` VARCHAR(200) NOT NULL DEFAULT "default-avatar-profile.jpg"
  ) ENGINE=InnoDB DEFAULT CHARSET=UTF8;


-- authorities
  DROP TABLE IF EXISTS `authorities`;
  CREATE TABLE `authorities` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `role` VARCHAR(200) DEFAULT "role_user",
      PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

-- users_authorities
  DROP TABLE IF EXISTS `users_authorities`;
  CREATE TABLE `users_authorities` (   
      `id_user` INT NOT NULL ,
      `id_authority` INT NOT NULL AUTO_INCREMENT,
      PRIMARY KEY (`id_authority`)
  ) ENGINE=InnoDB DEFAULT CHARSET=UTF8; 

  -- categories
  DROP TABLE IF EXISTS `categories`;
  CREATE TABLE `categories` (
    `id` INT NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

