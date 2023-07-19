const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const utilizadorController = require('../controllers/utilizadorController');

async function getClientes() {
  return await prisma.cliente.findMany();
}

async function getClienteById(id) {
  return await prisma.cliente.findUnique({
    where: { id_cliente: Number(id) },
  });
}

async function getMotoristaByIdUser(id) {
  const cliente = await prisma.cliente.findFirst({
    where: { id_utilizador: Number(id) },
  });

  return !!cliente;
}

async function getClienteByIdCliente(id) {
  return await prisma.cliente.findFirst({
    where: { id_utilizador: Number(id) },
  });
}


async function createCliente(cliente) {

  const id_utilizador = await utilizadorController.createUtilizador(cliente);
  const localizacao_y = 1;
  const localizacao_x = 1;
  dados = {
    id_utilizador,
    localizacao_y,
    localizacao_x
  }

  await prisma.cliente.create({
    data: { ...dados },
  });
  return true;
}

async function updateCliente(id, cliente) {
  return await prisma.cliente.update({
    where: { id_cliente: Number(id) },
    data: { ...cliente },
  });
}

async function deleteCliente(id) {
  return await prisma.cliente.delete({
    where: { id_cliente: Number(id) },
  });
}

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  getMotoristaByIdUser,
  getClienteByIdCliente
};
