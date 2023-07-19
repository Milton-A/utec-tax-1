const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


router.get('/', async (req, res) => {
  try {
    const clientes = await clienteController.getClientes();
    return res.json(clientes);    
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cliente = await clienteController.getClienteById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);    
  }catch(err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try { 
    const cliente = await clienteController.createCliente(req.body);
    res.json(cliente);    
  }catch(err) {
    console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cliente = await clienteController.updateCliente(req.params.id, req.body);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
  }catch(err) {
    console.log(err);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const result = await clienteController.deleteCliente(req.params.id);
    if (!result) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.sendStatus(204);
  }catch(err) {
    console.log();
  }
});

module.exports = router;
