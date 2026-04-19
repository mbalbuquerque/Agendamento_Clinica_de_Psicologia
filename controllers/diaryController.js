const DiaryEntry = require('../models/DiaryEntry');

// Listar todos os agendamentos (Read)
exports.listEntries = async (req, res) => {
    try {
        const entries = await DiaryEntry.find().sort({ data: 1 });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agendamentos", error });
    }
};

// Buscar um agendamento específico por ID (Read)
exports.getEntryById = async (req, res) => {
    try {
        const entry = await DiaryEntry.findById(req.params.id);
        if (!entry) return res.status(404).json({ message: "Agendamento não encontrado" });
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agendamento", error });
    }
};

// Criar um novo agendamento (Create)
exports.createEntry = async (req, res) => {
    try {
        const newEntry = new DiaryEntry(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar agendamento", error });
    }
};

// Atualizar um agendamento (Update)
exports.updateEntry = async (req, res) => {
    try {
        const updatedEntry = await DiaryEntry.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Retorna o objeto já atualizado
        );
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar agendamento", error });
    }
};

// Deletar um agendamento (Delete)
exports.deleteEntry = async (req, res) => {
    try {
        await DiaryEntry.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Agendamento removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar agendamento", error });
    }
};

// Exemplo de função no Controller
exports.getEntriesByPeriod = async (req, res) => {
    try {
        const { inicio, fim } = req.query;

        if (!inicio || !fim) {
            return res.status(400).json({ message: "Datas de início e fim são obrigatórias." });
        }

        // Ajusta para pegar do início do dia 'inicio' até o fim do dia 'fim'
        const entries = await DiaryEntry.find({
            data: {
                $gte: new Date(inicio + "T00:00:00"),
                $lte: new Date(fim + "T23:59:59")
            }
        }).sort({ data: 1 });

        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: "Erro ao filtrar agendamentos", error });
    }
};