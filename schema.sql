drop database if exists db_retrogames;
CREATE DATABASE db_retrogames;
USE db_retrogames;
CREATE TABLE jogos(

id int primary key auto_increment,
titulo varchar(50) not null,
plataforma varchar(100) not null,
desenvolvedora varchar(50) not null,
imagem_url text not null,
preco decimal not null,
data_cadastro timestamp not null
);

describe jogos;

insert into jogos(titulo, plataforma, desenvolvedora, imagem_url, preco) values
("Super Mario Bros.","NES","Nintendo","https://s2-techtudo.glbimg.com/UtZ41Q0Y9vkds8-PfWJCt9MIrCA=/0x0:695x407/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/k/H/ZBd3l8RTmktGFgRJRqyQ/2013-11-27-030.jpg", 55.00 ),
("Pac-Man","Arcade","Namco","https://ogimg.infoglobo.com.br/economia/22405212-316-973/FT1086A/PAC-MAN1.jpg",70.00),
("The Legend of Zelda","NES","Nintendo","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxmvp65QVlGF569yF3QMP0o5MWFHrmjDF8YgyabYO1bodzuO8GzgANd27&s=10",60.00);

select * from jogos;