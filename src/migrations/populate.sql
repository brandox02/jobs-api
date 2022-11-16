INSERT INTO roles(id, name) VALUES
(1, 'Gestión Empleado'),
(2, 'Gestión Empresarial'),
(3, 'Gestión Administrativa');


INSERT INTO companies(id, name,sede,location,acronym) VALUES 
(1, 'OGTIC', 'principal', '#311, Edifciio Corporativo Vista 31, Bella Vista. Sto. Dgo., R.D.', 'OGTIC');


INSERT INTO departments(id, name) VALUES (1,'Plataformas y servicios');

INSERT INTO order_status(id,name) VALUES(1,'En Carrito');
INSERT INTO order_status(id,name) VALUES(2,'Ordenada');
INSERT INTO order_status(id,name) VALUES(3,'Confimada');
INSERT INTO order_status(id,name) VALUES(4,'Entregada');
INSERT INTO order_status(id,name) VALUES(5,'Cancelada');



INSERT INTO order_types(id,name) VALUES
(1, 'Plato del Día'),
(2, 'Cafetería'),
(3, 'Desayunos'),
(4, 'Repostería'),
(5, 'Panadería');

INSERT INTO general_parameters(id, name, value, description) VALUES(1, 'Tiempo de confimación de order', '15', '');
INSERT INTO general_parameters(id, name, value, description) VALUES(2, 'Hora limite para ordenar', '10', '');