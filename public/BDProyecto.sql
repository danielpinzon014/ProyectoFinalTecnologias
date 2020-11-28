create table cliente(
id int primary key not null auto_increment,
nombre varchar(25) not null,
apellidos varchar(25) not null,
correo varchar(25) not null,
celular int(10) not null,
username varchar(25) not null,
password varchar(25) not null
);

create table vendedor(
id int primary key not null auto_increment,
nombre varchar(25) not null,
apellidos varchar(25) not null,
correo varchar(25) not null,
celular int(10) not null,
nombreTienda int(10) not null,
categoriaTienda int(10) not null,
username varchar(25) not null,
password varchar(25) not null
);