const { PrismaClient } = require('@prisma/client');
const { parseISO } = require('date-fns');
const prisma = new PrismaClient();
const utilizadorController = require('../controllers/utilizadorController');

async function getMotoristas() {
  return await prisma.motorista.findMany();
}

async function getMotoristaById(id) {
  return await prisma.motorista.findUnique({
    where: { id_motorista: Number(id) },
  });
}

async function getMotoristaByIdUser(id) {
  const motorista = await prisma.motorista.findFirst({
    where: { id_utilizador: Number(id) },
  });

  return !!motorista;
}

async function getMotoristaByIdMotorista(id) {
  return await prisma.motorista.findFirst({
    where: { id_utilizador: Number(id) },
  });
}

async function createMotorista(motorista) {
  const { nome, email, password, data_nascimento, morada, veiculo } = motorista;
  const existingUser = await prisma.utilizador.findUnique({
    where: { email: email },
  });

  if (!existingUser) {

    const id_utilizador = await utilizadorController.createUtilizador({
      nome,
      email,
      password,
      data_nascimento: parseISO(data_nascimento),
      morada,
    });

    const id_empresa = 1;
    const grau_cumprimento_horario = 0;
    const classificacao = 0;
    const kms_realizados = 0;
    const disponibilidade = true;

    const dadosMotorista = {
      id_utilizador,
      id_empresa,
      grau_cumprimento_horario,
      classificacao,
      kms_realizados,
      disponibilidade,
    };

    const ultimoMotorista = await prisma.motorista.create({
      data: dadosMotorista,
    });

    const id_marca = 1;
    const id_motorista = ultimoMotorista.id_motorista;
    const factor_fiabilidade = 0;
    const dadosVeiculo = {
      ...veiculo,
      id_motorista,
      id_marca,
      id_empresa,
      factor_fiabilidade
    };

    await prisma.veiculo.create({
      data: dadosVeiculo,
    });

    return true;
  }
  return false;
}

async function updateMotorista(id, motorista) {
  return await prisma.motorista.update({
    where: { id_motorista: Number(id) },
    data: { ...motorista },
  });
}

async function deleteMotorista(id) {
  return await prisma.motorista.delete({
    where: { id_motorista: Number(id) },
  });
}

module.exports = {
  getMotoristas,
  getMotoristaById,
  createMotorista,
  updateMotorista,
  deleteMotorista,
  getMotoristaByIdUser,
  getMotoristaByIdMotorista
}
