-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/07/2023 às 16:00
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `utec`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `classificacaomotorista`
--

CREATE TABLE `classificacaomotorista` (
  `id` int(11) NOT NULL,
  `id_motorista` int(11) NOT NULL,
  `pontuacao` float NOT NULL,
  `data_classificacao` date NOT NULL,
  `descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `id_utilizador` int(11) NOT NULL,
  `localizacao_x` int(11) DEFAULT NULL,
  `localizacao_y` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `id_utilizador`, `localizacao_x`, `localizacao_y`) VALUES
(1, 1, 1, 2),
(2, 2, 2, 4),
(3, 8, 1, 1),
(4, 15, 1, 1),
(5, 22, 1, 1),
(6, 29, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `empresa`
--

INSERT INTO `empresa` (`id_empresa`, `nome`) VALUES
(1, 'alfa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `listaespera`
--

CREATE TABLE `listaespera` (
  `id_lista_espera` int(11) NOT NULL,
  `id_viagem` int(11) NOT NULL,
  `tempo_espera` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `marca`
--

CREATE TABLE `marca` (
  `id_marca` int(11) NOT NULL,
  `marca` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `marca`
--

INSERT INTO `marca` (`id_marca`, `marca`) VALUES
(1, 'Mercedes'),
(2, 'Toyota');

-- --------------------------------------------------------

--
-- Estrutura para tabela `motorista`
--

CREATE TABLE `motorista` (
  `id_motorista` int(11) NOT NULL,
  `id_utilizador` int(11) NOT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `grau_cumprimento_horario` int(11) DEFAULT NULL,
  `classificacao` int(11) DEFAULT NULL,
  `kms_realizados` int(11) DEFAULT NULL,
  `disponibilidade` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `motorista`
--

INSERT INTO `motorista` (`id_motorista`, `id_utilizador`, `id_empresa`, `grau_cumprimento_horario`, `classificacao`, `kms_realizados`, `disponibilidade`) VALUES
(1, 4, 1, 10, 25, 10, 1),
(2, 3, 1, 10, 50, 120, 0),
(3, 5, 1, 15, 75, 150, 0),
(4, 6, 1, 12, 25, 150, 0),
(5, 7, 1, 50, 30, 50, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `utilizador`
--

CREATE TABLE `utilizador` (
  `id_utilizador` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `morada` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `utilizador`
--

INSERT INTO `utilizador` (`id_utilizador`, `nome`, `email`, `password`, `morada`, `data_nascimento`) VALUES
(1, 'Joao', 'joao@gmail.com', '123', 'asas', '2023-07-13'),
(2, 'Miguel', 'miguel@gmail.com', '123', 'asasas', '2023-07-10'),
(3, 'Angelo', 'angelo@gmail.com', '123', 'asa', '2023-07-11'),
(4, 'Francisco', 'francisco@gmail.com', '123', 'asas', '2023-07-12'),
(5, 'Agola', 'angola@gmail.com', '123', 'asas', '2023-07-19'),
(6, 'gol', 'gol@gmail.com', '123', 'asa', '2023-07-11'),
(7, 'ass', 'ass@gmail.com', '123', 'masa', '2023-07-11'),
(8, 'António Silva', 'antoniosilva@gmail.com', '123', 'Xpto', '2000-09-01'),
(15, 'Hh', 'Bg@gmail.com', '123', 'Hdhhd', '1998-03-21'),
(22, 'Ggg', 'Hhgv@gmail.com', '123', 'Babb’s', '2012-12-12'),
(29, 'HHS', 'Bbnn@gmail.com', '123', 'Hunks', '2003-07-18');

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculo`
--

CREATE TABLE `veiculo` (
  `id_veiculo` int(11) NOT NULL,
  `tipo_veiculo` enum('L','P') DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `id_motorista` int(11) DEFAULT NULL,
  `velocidade_media_km` float DEFAULT NULL,
  `coordenadas_origem_x` int(11) DEFAULT NULL,
  `coordenadas_origem_y` int(11) DEFAULT NULL,
  `km` float DEFAULT NULL,
  `preco_base_km` decimal(10,2) DEFAULT NULL,
  `factor_fiabilidade` float DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `veiculo`
--

INSERT INTO `veiculo` (`id_veiculo`, `tipo_veiculo`, `id_empresa`, `id_motorista`, `velocidade_media_km`, `coordenadas_origem_x`, `coordenadas_origem_y`, `km`, `preco_base_km`, `factor_fiabilidade`, `id_marca`) VALUES
(2, 'L', 1, 1, 20, 9, 13, 250, 500.00, 12, 1),
(3, 'P', 1, 2, 15, 8, 13, 300, 300.00, 1, 2),
(4, 'P', 1, 3, 16, 9, 14, 125, 200.00, 2, 1),
(5, 'L', 1, 4, 13, 12, 11, 350, 400.00, 1, 2),
(6, 'L', 1, 5, 22, 8, 14, 200, 150.00, 22, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `viagem`
--

CREATE TABLE `viagem` (
  `id_viagem` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_motorista` int(11) DEFAULT NULL,
  `id_veiculo` int(11) DEFAULT NULL,
  `coordenadas_origem_x` int(11) DEFAULT NULL,
  `coordenadas_origem_y` int(11) DEFAULT NULL,
  `coordenadas_destino_x` int(11) DEFAULT NULL,
  `coordenadas_destino_y` int(11) DEFAULT NULL,
  `custo_estimado` decimal(10,2) DEFAULT NULL,
  `custo_real` decimal(10,2) DEFAULT NULL,
  `tempo_estimado` int(11) DEFAULT NULL,
  `preco_pago` float DEFAULT NULL,
  `tempo_real` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `classificacaomotorista`
--
ALTER TABLE `classificacaomotorista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_motorista` (`id_motorista`);

--
-- Índices de tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `id_utilizador` (`id_utilizador`);

--
-- Índices de tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Índices de tabela `listaespera`
--
ALTER TABLE `listaespera`
  ADD PRIMARY KEY (`id_lista_espera`),
  ADD KEY `id_viagem` (`id_viagem`);

--
-- Índices de tabela `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_marca`);

--
-- Índices de tabela `motorista`
--
ALTER TABLE `motorista`
  ADD PRIMARY KEY (`id_motorista`),
  ADD KEY `id_utilizador` (`id_utilizador`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Índices de tabela `utilizador`
--
ALTER TABLE `utilizador`
  ADD PRIMARY KEY (`id_utilizador`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `veiculo`
--
ALTER TABLE `veiculo`
  ADD PRIMARY KEY (`id_veiculo`),
  ADD KEY `id_empresa` (`id_empresa`),
  ADD KEY `id_marca` (`id_marca`),
  ADD KEY `id_motorista` (`id_motorista`);

--
-- Índices de tabela `viagem`
--
ALTER TABLE `viagem`
  ADD PRIMARY KEY (`id_viagem`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_motorista` (`id_motorista`),
  ADD KEY `id_veiculo` (`id_veiculo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `classificacaomotorista`
--
ALTER TABLE `classificacaomotorista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `listaespera`
--
ALTER TABLE `listaespera`
  MODIFY `id_lista_espera` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `marca`
--
ALTER TABLE `marca`
  MODIFY `id_marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `motorista`
--
ALTER TABLE `motorista`
  MODIFY `id_motorista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `utilizador`
--
ALTER TABLE `utilizador`
  MODIFY `id_utilizador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `veiculo`
--
ALTER TABLE `veiculo`
  MODIFY `id_veiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `viagem`
--
ALTER TABLE `viagem`
  MODIFY `id_viagem` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `classificacaomotorista`
--
ALTER TABLE `classificacaomotorista`
  ADD CONSTRAINT `classificacaomotorista_ibfk_1` FOREIGN KEY (`id_motorista`) REFERENCES `motorista` (`id_motorista`);

--
-- Restrições para tabelas `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizador` (`id_utilizador`);

--
-- Restrições para tabelas `listaespera`
--
ALTER TABLE `listaespera`
  ADD CONSTRAINT `listaespera_ibfk_1` FOREIGN KEY (`id_viagem`) REFERENCES `viagem` (`id_viagem`);

--
-- Restrições para tabelas `motorista`
--
ALTER TABLE `motorista`
  ADD CONSTRAINT `motorista_ibfk_1` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizador` (`id_utilizador`),
  ADD CONSTRAINT `motorista_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`);

--
-- Restrições para tabelas `veiculo`
--
ALTER TABLE `veiculo`
  ADD CONSTRAINT `veiculo_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`),
  ADD CONSTRAINT `veiculo_ibfk_2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`),
  ADD CONSTRAINT `veiculo_ibfk_3` FOREIGN KEY (`id_motorista`) REFERENCES `motorista` (`id_motorista`);

--
-- Restrições para tabelas `viagem`
--
ALTER TABLE `viagem`
  ADD CONSTRAINT `viagem_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `viagem_ibfk_2` FOREIGN KEY (`id_motorista`) REFERENCES `motorista` (`id_motorista`),
  ADD CONSTRAINT `viagem_ibfk_3` FOREIGN KEY (`id_veiculo`) REFERENCES `veiculo` (`id_veiculo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
