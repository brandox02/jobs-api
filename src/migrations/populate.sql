INSERT INTO roles(id, name) VALUES
(1, 'Gestión Empleado'),
(2, 'Gestión Empresarial'),
(3, 'Gestión Administrativa');


INSERT INTO companies(id, name,sede,location,acronym) VALUES 
(1, 'PACOME', 'PACOME', 'PACOME', 'PACOME');


INSERT INTO departments(id, name,company_id) VALUES (1,'PACOME',1);

INSERT INTO order_status(id,name) VALUES
(1,'En Carrito'),
(2,'Ordenada'),
(3,'Confimada'),
(4,'Entregada'),
(5,'Cancelada');



INSERT INTO order_types(id,name) VALUES
(1, 'Plato del Día'),
(2, 'Cafetería'),
(3, 'Desayunos'),
(4, 'Repostería'),
(5, 'Panadería');

INSERT INTO general_parameters(id, name, value, description) VALUES
(1, 'Tiempo de confimación de order', '15', ''),
(2, 'Hora limite para ordenar', '10', ''),
(3, 'Precio plato del dia', '150', '');


INSERT INTO menus(id, name, json) values (1, 'Plato del dia','{"typeId": 1, "items": []}');

INSERT INTO users(id, firstname, lastname,enabled, cedula, email,password,company_id,department_id, role_id)
values(1, 'PACOME', 'ADMIN', true, 'PACOME', 'admin@pacome.com','admin', 1,1,3);