create table tb_categorias(
  id serial primary key,
  descricao varchar(20)
)
insert into tb_categorias(descricao)values('cereais');
select * from tb_categorias;

create table tb_usuarios(
  id serial primary key,
  nome varchar(20),
  email varchar(50),
  senha varchar(200),
  perfil varchar(10)
);