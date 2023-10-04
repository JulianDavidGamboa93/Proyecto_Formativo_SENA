-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2023 a las 04:39:56
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `ID_Cart` int(11) NOT NULL,
  `login_id` int(11) DEFAULT NULL,
  `products_id` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `Unitprice` int(11) NOT NULL,
  `Dateadded` timestamp NOT NULL DEFAULT current_timestamp(),
  `Cartstatus` enum('IN PROGRESS','COMPLETED') NOT NULL DEFAULT 'IN PROGRESS',
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoice`
--

CREATE TABLE `invoice` (
  `ID_Invoice` int(11) NOT NULL,
  `login_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL,
  `products_id` int(11) DEFAULT NULL,
  `Purchasedate` datetime NOT NULL,
  `Shipping` enum('WAITING FOR SHIPPING','BEING PREPARED','SHIPPED','DELIVERED') NOT NULL DEFAULT 'BEING PREPARED',
  `Refund` enum('YES','NO') NOT NULL DEFAULT 'NO',
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `ID_Login` int(11) NOT NULL,
  `Username` varchar(70) NOT NULL,
  `Userpassword` varchar(70) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Names` varchar(60) DEFAULT NULL,
  `Lastnames` varchar(60) DEFAULT NULL,
  `Birthdate` date NOT NULL,
  `Gender` enum('M','F','ND') DEFAULT NULL,
  `Phonenumber` varchar(50) DEFAULT NULL,
  `Rol` enum('ADMIN','USER') NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `ID_Products` int(11) NOT NULL,
  `Productname` varchar(60) NOT NULL,
  `Price` int(11) NOT NULL,
  `Productdesc` varchar(150) NOT NULL,
  `Beantype` enum('ARABICA','ROBUSTA','BLEND') NOT NULL,
  `Category` enum('ROASTED COFFEE','GROUND COFFEE','WHOLE BEAN COFFEE') NOT NULL DEFAULT 'ROASTED COFFEE',
  `Roasted` enum('LIGHT','MEDIUM','DARK') NOT NULL DEFAULT 'MEDIUM',
  `Processing` enum('SUNDRY','WASHED','HONEY') NOT NULL DEFAULT 'SUNDRY',
  `Stock` enum('IN STOCK','OUT OF STOCK','NOT AVAILABLE') NOT NULL DEFAULT 'IN STOCK',
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `ID_Reviews` int(11) NOT NULL,
  `login_id` int(11) DEFAULT NULL,
  `products_id` int(11) DEFAULT NULL,
  `Reviewdescription` varchar(300) DEFAULT NULL,
  `Stars` enum('1','2','3','4','5') NOT NULL DEFAULT '3',
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID_Users` int(11) NOT NULL,
  `login_id` int(11) DEFAULT NULL,
  `Adress` varchar(60) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT 1,
  `Socialmedias` enum('FACEBOOK','TWITTER','INSTAGRAM') DEFAULT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`ID_Cart`);

--
-- Indices de la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`ID_Invoice`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID_Login`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID_Products`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`ID_Reviews`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_Users`),
  ADD KEY `login_id` (`login_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `ID_Cart` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `invoice`
--
ALTER TABLE `invoice`
  MODIFY `ID_Invoice` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `ID_Login` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `ID_Products` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `ID_Reviews` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID_Users` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`ID_Login`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
