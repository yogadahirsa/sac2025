DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(200) NOT NULL,
  `nama` VARCHAR(200) NOT NULL,
  `hari_id` INT UNSIGNED,
  `sesi_id` INT UNSIGNED DEFAULT 0,
  `kedatangan` ENUM('online','offline'),
  `token` VARCHAR(64) UNIQUE,
  `check_in` SMALLINT UNSIGNED DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`)
);
