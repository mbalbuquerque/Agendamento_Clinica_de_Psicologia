const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar as rotas
const diaryRoutes = require('./routes/diaryRoutes');

const app = express();

// --- Middlewares ---
app.use(cors()); // Permite que o frontend PWA acesse a API
app.use(express.json()); // Essencial para processar o corpo das requisições (POST/PUT)

// --- Conexão com o MongoDB ---
// A variável MONGODB_URI deve estar no seu arquivo .env
const mongoURI = process.env.MONGODB_URI || 'sua_string_de_conexao_aqui';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
    .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

// --- Definição de Rotas ---
// Todas as rotas de agendamento terão o prefixo /api/diary
app.use('/api/diary', diaryRoutes);

// Rota de teste para verificar se o servidor está online
app.get('/', (req, res) => {
    res.send('API da Clínica de Psicologia rodando...');
});

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});