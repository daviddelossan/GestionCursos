CREATE TABLE `curso` (
  `idcurso` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `localidad` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `numPlazas` int(11) NOT NULL,
  `descripcion` varchar(800) DEFAULT NULL,
  `fechaIni` varchar(10) NOT NULL,
  `fechaFin` varchar(10) NOT NULL,
  PRIMARY KEY (`idcurso`),
  UNIQUE KEY `idcurso_UNIQUE` (`idcurso`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;

CREATE TABLE `usuario` (
  `correo` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `sexo` varchar(45) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`correo`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `horario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso` int(11) NOT NULL,
  `horaIni` varchar(45) NOT NULL,
  `horaFin` varchar(45) NOT NULL,
  `dia` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `curso_horario_idx` (`id_curso`),
  CONSTRAINT `curso_horario` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`idcurso`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;


CREATE TABLE `usuariocurso` (
  `id_usuario` varchar(45) NOT NULL,
  `id_curso` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_curso`),
  KEY `curso_usuario_idx` (`id_curso`),
  CONSTRAINT `curso_usuarioCurso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`idcurso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usuario_usuarioCurso` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`correo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
