create table tb_categorias(
  id serial primary key,
  descricao varchar(20)
)
insert into tb_categorias(descricao)values('cereais')
select * from tb_categorias