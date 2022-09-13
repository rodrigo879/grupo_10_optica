-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-09-2022 a las 23:25:53
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `optica_riff`
--
CREATE DATABASE IF NOT EXISTS `optica_riff`;
USE `optica_riff`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `authorities`
--

DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities` (
  `id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'role_user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `authorities`
--

INSERT INTO `authorities` (`id`, `role`) VALUES
(1, 'role_admin'),
(2, 'role_mod'),
(3, 'role_user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `brands`
--
INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'VULK'),
(2, 'RUSTY'),
(3, 'EGO'),
(4, 'CX'),
(5, 'ANDREA'),
(6, 'AY NOT DEAD'),
(7, 'SATURDAY'),
(8, 'PUCCINI'),
(9, 'ATLANTIS'),
(10, 'CIMA'),
(11, 'UNION'),
(12, 'JORDAN'),
(13, 'VIV'),
(14, 'ACUVUE'),
(15, 'OPTIX'),
(16, 'FRESHLOOK'),
(17, 'PROCLEAR'),
(18, 'BIOFINITY'),
(19, 'BIOMEDICS'),
(20, 'SOFLENS'),
(21, 'HOLDER'),
(22, 'WOLF'),
(23, 'SKALA'),
(24, 'ARIANA'),
(25, 'PARAISO'),
(26, 'INFINIT'),
(27, 'KTI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'lentesRecetados'),
(2, 'lentesSol'),
(3, 'lentesContacto'),
(4, 'accesorios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images_products`
--
DROP TABLE IF EXISTS `images_products`;
CREATE TABLE `images_products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `images_products`
--

INSERT INTO `images_products` (`id`, `name`) VALUES
(1, 'product-1657110953499.jpg'),
(2, 'product-1657113824499.jpg'),
(3, 'product-1657113994191.jpg'),
(4, 'product-1657114413101.jpg'),
(5, 'product-1657114505674.jpg'),
(6, 'product-1657114667174.jpg'),
(7, 'product-1657114884368.jpg'),
(8, 'product-1657116325181.jpg'),
(9, 'product-1657116674604.jpg'),
(10, 'product-1657118866152.jpg'),
(11, 'product-1657118975763.jpg'),
(12, 'product-1657119011305.jpg'),
(13, 'product-1657122800642.jpg'),
(14, 'product-1657122832740.jpg'),
(15, 'product-1657122852749.jpg'),
(16, 'product-1658754857736.jpg'),
(17, 'product-1657122923380.jpg'),
(18, 'product-1657122991860.jpg'),
(19, 'product-1657123010595.jpg'),
(20, 'product-1657123031700.jpg'),
(21, 'product-1657123166123.jpg'),
(22, 'product-1657123190635.jpg'),
(23, 'product-1657123217843.jpg'),
(24, 'product-1657123237649.jpg'),
(25, 'product-1657123360394.jpg'),
(26, 'product-1657123382762.jpg'),
(27, 'product-1657123412825.jpg'),
(28, 'product-1657123454770.jpg'),
(29, 'product-1657123507126.jpg'),
(30, 'product-1657123540449.jpg'),
(31, 'product-1657123580759.jpg'),
(32, 'product-1657123636656.jpg'),
(33, 'product-1657123661631.jpg'),
(34, 'product-1657123691271.jpg'),
(35, 'product-1657123730784.jpg'),
(36, 'product-1657123776217.jpg'),
(37, 'product-1657124613263.jpg'),
(38, 'product-1657124774168.jpg'),
(39, 'product-1657124814908.jpg'),
(40, 'product-1657124861621.jpg'),
(41, 'product-1657124901716.jpg'),
(42, 'product-1657124934143.jpg'),
(43, 'product-1657124971982.jpg'),
(44, 'product-1657125067400.jpg'),
(45, 'product-1657125173130.jpg'),
(46, 'product-1657125207141.jpg'),
(47, 'product-1657125265591.jpg'),
(48, 'product-1657125305982.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image_users`
--

DROP TABLE IF EXISTS `image_users`;
CREATE TABLE `image_users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `image_users`
--

INSERT INTO `image_users` (`id`, `name`) VALUES
(1, 'default-avatar-profile.jpg'),
(2, 'user-1660861770366.jpg'),
(3, 'user-1660056323659.jpg'),
(4, 'user-1658835232480.png'),
(5, 'user-1657842115311.jpg'),
(6, 'user-1662133463627.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` double NOT NULL,
  `discount` double NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_brand` int(11) NOT NULL,
  `id_image_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount`, `id_category`, `id_brand`, `id_image_product`) VALUES
(98, 'EGO 3272 UV400', 'Lente Recetado', 4062, 10, 1, 1, 1),
(99, 'CX 1003', 'Lente Recetado', 6590, 11, 1, 4, 2),
(100, 'ANDREA K 3019', 'Lente Recetado', 8295, 15, 1, 5, 3),
(101, 'AY NOT DEAD 691\"3', 'Lente Recetado', 18880, 10, 1, 6, 4),
(102, 'VULK NYC', 'Lente Recetado', 12400, 0, 1, 1, 5),
(103, 'VULK ELUSIVE', 'Lente Recetado', 10540, 8, 1, 1, 6),
(104, 'SATURDAY SL 021', 'Lente Recetado', 9200, 14, 1, 7, 7),
(105, 'PUCCINI OR 080', 'Lente Recetado', 10222.5, 0, 1, 8, 8),
(106, 'ATLANTIS XC 62010', 'Lente Recetado', 13464, 0, 1, 9, 9),
(107, 'VULK ANGELO', 'Lente Recetado', 18800, 10, 1, 1, 10),
(108, 'CIMA CI 041 273', 'Lente Recetado', 16920, 12, 1, 10, 11),
(109, 'CIMA CI 004 306', 'Lente Recetado', 23600, 26, 1, 10, 12),
(110, 'RUSTY JIMMY', 'Lente Sol', 12647.25, 10, 2, 2, 13),
(111, 'UNION PACIFIC 9610', 'Lente Sol', 13300, 10, 2, 11, 14),
(112, 'JORDAN NEW', 'Lente Sol', 9900, 0, 2, 12, 15),
(113, 'VULK GEES', 'Lente Sol', 9817.5, 20, 2, 1, 16),
(114, 'EGO 8511 UV400', 'Lente Sol', 2938.95, 12, 2, 3, 17),
(115, 'SATURDAY 16626 POLARIZADO', 'Lente Sol', 5145, 10, 2, 7, 18),
(116, 'JORDAN RONY', 'Lente Sol', 9900, 0, 2, 12, 19),
(117, 'JORDAN NICK', 'Lente Sol', 9900, 0, 2, 12, 20),
(118, 'EGO 8505', 'Lente Sol', 10890, 14, 2, 3, 21),
(119, 'EGO 2618', 'Lente Sol', 7900, 11, 2, 3, 22),
(120, 'VULK ANIMA', 'Lente Sol', 10890, 10, 2, 1, 23),
(121, 'VIV 2507', 'Lente Sol', 11900, 12, 2, 13, 24),
(122, 'ACUVUE OASYS 6 PACK', 'Lente Contacto', 5600, 5, 3, 14, 25),
(123, 'ACUVUE VITA', 'Lente Contacto', 6380, 5, 3, 14, 26),
(124, 'ACUVUE TRANSITIONS', 'Lente Contacto', 7100, 10, 3, 14, 27),
(125, 'ACUVUE TRANSITION PROMO 3+1', 'Lente Contacto', 25500, 15, 3, 14, 28),
(126, 'ACUVUE MOIST 30 PACK', 'Lente Contacto', 12000, 14, 3, 14, 29),
(127, 'ACUVUE OASYS DAY 30 PACK', 'Lente Contacto', 12800, 12, 3, 14, 30),
(128, 'AIR OPTIX PLUS HYDRAGLYDE', 'Lente Contacto', 8100, 11, 3, 15, 31),
(129, 'FRESHLOOK COLORBLENDS NEUTROS', 'Lente Contacto', 6600, 11, 3, 16, 32),
(130, 'PROCLEAR', 'Lente Contacto', 14800, 15, 3, 17, 33),
(131, 'BIOFINITY', 'Lente Contacto', 12400, 12, 3, 18, 34),
(132, 'BIOMEDICS 55', 'Lente Contacto', 7800, 0, 3, 19, 35),
(133, 'SOFLENS STARCOLORS II NEUTROS', 'Lente Contacto', 6300, 20, 3, 20, 36),
(134, 'HOLDER CADENA SUJETADORA', 'Accesorio', 485, 0, 4, 21, 37),
(135, 'WOLF', 'Accesorio', 590, 0, 4, 22, 38),
(136, 'SKALA SUJETADOR', 'Accesorio', 320, 0, 4, 23, 39),
(137, 'ARIANA CADENA SUJETADORA', 'Accesorio', 760, 0, 4, 24, 40),
(138, 'PARAISO CORDON SUJETADOR', 'Accesorio', 1590, 0, 4, 25, 41),
(139, 'INFINIT SUJETADOR LENTES', 'Accesorio', 1500, 0, 4, 26, 42),
(140, 'KTI SUJETADOR REGULABLE', 'Accesorio', 1391, 10, 4, 27, 43),
(141, 'PARAISO SUJETADOR ANTEOJO MOSTASILLA', 'Accesorio', 440, 0, 4, 25, 44),
(142, 'SKALA SUJETADOR DECORADO', 'Accesorio', 405, 0, 4, 23, 45),
(143, 'HOLDER SUJETADOR ANTEOJOS', 'Accesorio', 715, 0, 4, 21, 46),
(144, 'ARIANA CADENA METAL MOSTASILLAS', 'Accesorio', 760, 0, 4, 24, 47),
(145, 'PARAISO SUJETADOR ANTEOJOS DECORADO', 'Accesorio', 950, 5, 4, 25, 48);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `id_imageUser` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullName`, `user`, `email`, `password`, `id_imageUser`) VALUES
(16, 'Francisco LeonardO', 'franleonardo12', 'fran@hotmail.com', '$2a$10$cS1y58U.Y9YWNh.6hWvNyevXRX0Tb9Y8CmaxrIMFBd8DYWGZ711PC', 2),
(17, 'Rodrigo Alvarez', 'rja123', 'rja@prueba.com', '$2a$10$4A0Ua/gYOT1WtqZQjNwhdOkA4vvn.ga2kflAnNT98kOBPOp8whTdG', 4),
(18, 'Javier Alvarez', 'javito879', 'javito@prueba.com', '$2a$10$NRLXKIc0/43WO2HQejxyK.N/SQujuKPZIDaV7c9oHYaYgJk5u3ui6', 5),
(21, 'prueba', 'prueba', 'prueba@gmail.com', '$2a$10$86Uq96vcdsRHzT2rFqHPCO/qINoibvk2qKBwIRCTCuXm3ArCci9QO', 3),
(22, 'Facundo Sandoval', 'facuu', 'facu@mail.com', '$2a$10$uEg3gJ437DodgL7.ZcXJIewG8aVfShHHbsf1wo7qXfTszi74aDydm', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_authorities`
--

DROP TABLE IF EXISTS `users_authorities`;
CREATE TABLE `users_authorities` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_authority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_authorities`
--

INSERT INTO `users_authorities` (`id`, `id_user`, `id_authority`) VALUES
(1, 16, 1),
(2, 17, 1),
(3, 21, 3),
(4, 18, 2),
(5, 22, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `authorities`
--
ALTER TABLE `authorities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `images_products`
--
ALTER TABLE `images_products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `image_users`
--
ALTER TABLE `image_users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_brand` (`id_brand`),
  ADD KEY `id_image_product` (`id_image_product`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_imageUser` (`id_imageUser`);

--
-- Indices de la tabla `users_authorities`
--
ALTER TABLE `users_authorities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_authority` (`id_authority`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `authorities`
--
ALTER TABLE `authorities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `images_products`
--
ALTER TABLE `images_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `image_users`
--
ALTER TABLE `image_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `users_authorities`
--
ALTER TABLE `users_authorities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`id_image_product`) REFERENCES `images_products` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_5` FOREIGN KEY (`id_imageUser`) REFERENCES `image_users` (`id`) ON UPDATE CASCADE;

-- --
-- Filtros para la tabla `users_authorities`
--
ALTER TABLE `users_authorities`
  ADD CONSTRAINT `users_authorities_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_authorities_ibfk_2` FOREIGN KEY (`id_authority`) REFERENCES `authorities` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
