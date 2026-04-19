const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

// 1. Rota de Filtro (Deve vir antes do /:id)
router.get('/filtro', diaryController.getEntriesByPeriod);

// 2. Rotas Gerais
router.get('/', diaryController.listEntries);
router.post('/', diaryController.createEntry);

// 3. Rotas com ID (Sempre por último)
router.get('/:id', diaryController.getEntryById);
router.put('/:id', diaryController.updateEntry);
router.delete('/:id', diaryController.deleteEntry);

module.exports = router;