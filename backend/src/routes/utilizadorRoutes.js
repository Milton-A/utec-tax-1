const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizadorController');
const motoristaController = require('../controllers/motoristaController');
const clienteController = require('../controllers/clienteController');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.Utilizador.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.password !== password) {
      return res.json({ message: 'Email ou senha incorretos. Por favor, verifique suas credenciais.', success: false });
    }

    const isMotorista = await motoristaController.getMotoristaByIdUser(user.id_utilizador);
    const Motorista = await motoristaController.getMotoristaByIdMotorista(user.id_utilizador);
    const isCliente = await clienteController.getMotoristaByIdUser(user.id_utilizador);
    const Cliente = await clienteController.getClienteByIdCliente(user.id_utilizador);

    let retorno ;
    if (isMotorista) {
      retorno = Motorista;
    }
    else if (isCliente) {
      retorno = Cliente;
    }

    return res.json({
      success: true,
      message: 'Login bem-sucedido.',
      user: {
        id: user.id_utilizador,
        nome: user.nome,
        email: user.email,
      },
      retorno,
      isMotorista,
      isCliente
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const utilizadores = await utilizadorController.getUtilizadores();
    return res.json(utilizadores);
  } catch (err) {
    console.log(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const utilizador = await utilizadorController.getUtilizadorById(req.params.id);
    if (!utilizador) return res.status(404).json({ message: 'Utilizador não encontrada' });
    res.json(utilizador);
  } catch (err) {
    console.log(err);
  }

});

router.post('/', async (req, res) => {
  try {
    const utilizador = await utilizadorController.createUtilizador(req.body);
    res.json(utilizador);
  } catch (err) {
    console.log(err);
  }

});

router.put('/:id', async (req, res) => {
  try {
    const utilizador = await utilizador.updateUtilizador(req.params.id, req.body);

    if (!utilizador) return res.status(404).json({ message: 'Utilizador não encontrada' });
    res.json(utilizador);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await utilizadorController.deleteUtilizador(req.params.id);

    if (!result) return res.status(404).json({ message: 'Utilizador não encontrada' });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
