INSERT INTO categories(id, name) VALUES
(1, 'Tecnologias de la Información'),
(2, 'Negocios'),
(3, 'Turismo');

INSERT INTO employment_contracts(id, name) VALUES
(1,'Por tiempo indefinido'),
(2,'Temporal'),
(3,'Pasantía');

INSERT INTO experience_times(id, name) VALUES
(1,'No requiere experiencia previa'),
(2,'1 año'),
(3,'2 años'),
(4,'3 años'),
(5,'4 años'),
(6,'5 años'),
(7,'6 años'),
(8,'7 años'),
(9,'8 años'),
(10,'9 años'),
(11,'10 años'),
(12,'Más de 10 años');

INSERT INTO genders(id, name) VALUES
(1, 'Masculino'),
(2, 'Femenino');

INSERT INTO working_modalities(id, name) VALUES
(1, 'Presencial'),
(2, 'Semi presencial'),
(3, 'Remoto');

INSERT INTO daily_work_times(id, name) VALUES
(1, 'Tiempo completo'),
(2, 'Medio tiempo');

INSERT INTO job_status(id, name) VALUES
(1, 'Pendiente'),
(2, 'Activa'),
(3, 'Expirada');

INSERT INTO countries (id, name) VALUES
(1, 'República Dominicana');

INSERT INTO cities(name, country_id) values ('Arenazo', 1);
INSERT INTO cities(name, country_id) values ('Bavaro', 1);
INSERT INTO cities(name, country_id) values ('Boca Chica', 1);
INSERT INTO cities(name, country_id) values ('Cabarete', 1);
INSERT INTO cities(name, country_id) values ('Cotui', 1);
INSERT INTO cities(name, country_id) values ('Dominica', 1);
INSERT INTO cities(name, country_id) values ('Guaricano', 1);
INSERT INTO cities(name, country_id) values ('Hato Mayor del Rey', 1);
INSERT INTO cities(name, country_id) values ('Jimani', 1);
INSERT INTO cities(name, country_id) values ('La Romana', 1);
INSERT INTO cities(name, country_id) values ('Los Alcarrizos', 1);
INSERT INTO cities(name, country_id) values ('Los Prados', 1);
INSERT INTO cities(name, country_id) values ('Moca', 1);
INSERT INTO cities(name, country_id) values ('Pedernales', 1);
INSERT INTO cities(name, country_id) values ('Puerto Plata', 1);
INSERT INTO cities(name, country_id) values ('Punta Cana', 1);
INSERT INTO cities(name, country_id) values ('Sabaneta', 1);
INSERT INTO cities(name, country_id) values ('San Cristobal', 1);
INSERT INTO cities(name, country_id) values ('San Fernando de Monte Cristi', 1);
INSERT INTO cities(name, country_id) values ('San Jose de Ocoa', 1);
INSERT INTO cities(name, country_id) values ('Santa Cruz de Barahona', 1);
INSERT INTO cities(name, country_id) values ('Santiago de los Caballeros', 1);
INSERT INTO cities(name, country_id) values ('Santo Domingo', 1);

INSERT INTO educations(1, name) values (1, 'Graduado');
INSERT INTO educations(1, name) values (2, 'Maestría');
INSERT INTO educations(1, name) values (3, 'Doctorado');