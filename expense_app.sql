-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Czas generowania: 15 Lip 2022, 23:29
-- Wersja serwera: 8.0.29-0ubuntu0.20.04.3
-- Wersja PHP: 8.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `expense_app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` char(7) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`id`, `name`, `color`) VALUES
('1a12ff72-02c9-11ed-bde2-3c9c0f7f56ac', 'Transport', '#9cffae'),
('8994a7f5-02c8-11ed-bde2-3c9c0f7f56ac', 'Insurance', '#f3f31b'),
('9a5c14ff-02c8-11ed-bde2-3c9c0f7f56ac', 'Food', '#0effff'),
('bafe3f93-02c8-11ed-bde2-3c9c0f7f56ac', 'Saving, Investing', '#f5ab49'),
('ea914b7f-02c8-11ed-bde2-3c9c0f7f56ac', 'Housing ', '#ff9cc7');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `expenses`
--

CREATE TABLE `expenses` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(8,2) NOT NULL,
  `categoryId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ac0801a1760c5f9ce43c03bacd0` (`categoryId`),
  ADD KEY `FK_3d211de716f0f14ea7a8a4b1f2c` (`userId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `FK_3d211de716f0f14ea7a8a4b1f2c` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_ac0801a1760c5f9ce43c03bacd0` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
