const mongoose = require('mongoose');

// Definição do Schema (Estrutura dos dados no MongoDB)
const diaryEntrySchema = new mongoose.Schema({
    paciente: {
        type: String,
        required: [true, 'O nome do paciente é obrigatório'],
        trim: true
    },
    data: {
        type: Date,
        required: [true, 'A data e hora são obrigatórias']
    },
    tipo_sessao: {
        type: String,
        enum: ['Presencial', 'Remoto'],
        default: 'Presencial'
    },
    status: {
        type: String,
        enum: ['Pendente', 'Confirmado', 'Cancelado'],
        default: 'Pendente'
    },
    observacoes: {
        type: String,
        trim: true
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

// Exportação do modelo para uso nos controllers
module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);