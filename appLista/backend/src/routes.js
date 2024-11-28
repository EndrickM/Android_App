const express = require("express");
const { PrismaClient } = require("@prisma/client");
const routes = express.Router();
const prisma = new PrismaClient();


routes.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});


routes.post('/users', async (req, res) => {
  const { name, email, senha } = req.body;

  try {

    const newUser = await prisma.user.create({
      data: { name, email, senha},
    });
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar o usuário." });
  }
});


routes.post("/lista", async (req, res) => {
    const { name, categoria } = req.body;
    if (!name || !categoria) {
        return res.status(400).json({ error: "Nome e categoria são obrigatórios." });
    }
    const lista = await prisma.lista.create({
        data: { name, categoria }
    });
    return res.status(201).json(lista);
});

routes.post("/lista/:listaId/sublista", async (req, res) => {
    const { listaId } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Nome é obrigatório para a sublista." });
    }

    try {
        const sublista = await prisma.subLista.create({
            data: {
                name,
                lista: { connect: { id: parseInt(listaId) } },
            },
        });

        return res.status(201).json(sublista);
    } catch (error) {
        return res.status(400).json({ error: "Erro ao criar a sublista." });
    }
});

routes.get("/lista", async (req, res) => {
    try {
        const listas = await prisma.lista.findMany({
            include: { items: true }, 
        });
        return res.status(200).json(listas);
    } catch (erro) {
        return res.status(400).json({ error: "Erro ao procurar listas." });
    }
});

routes.get("/sublista/:listaId", async (req, res) => {
    const { listaId } = req.params;

    try {
        const sublistas = await prisma.subLista.findMany({
            where: { listaId: parseInt(listaId) }
        });
        return res.status(200).json(sublistas);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno ao buscar sublistas." });
    }
});

routes.put("/lista/:id", async (req, res) => {
    const { id } = req.params;
    const { name, categoria, favorito } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Id é obrigatório." });
    }

    try {
        const listaExiste = await prisma.lista.findUnique({
            where: { id: parseInt(id) },
        });

        if (!listaExiste) {
            return res.status(404).json({ error: "Lista não encontrada." });
        }

        const lista = await prisma.lista.update({
            where: { id: parseInt(id) },
            data: {
                ...(name !== undefined && { name }),
                ...(categoria !== undefined && { categoria }),
                ...(favorito !== undefined && { favorito }),
            },
        });

        return res.status(200).json(lista);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar a lista." });
    }
});

routes.put("/sublista/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Id é obrigatório." });
    }

    try {
        const sublistaExiste = await prisma.subLista.findUnique({
            where: { id: parseInt(id) }
        });

        if (!sublistaExiste) {
            return res.status(404).json({ error: "Sublista não encontrada." });
        }

        const sublista = await prisma.subLista.update({
            where: { id: parseInt(id) },
            data: { name },
        });

        return res.status(200).json(sublista);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar a sublista." });
    }
});

routes.delete("/lista/:id", async (req, res) => {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!intId) {
        return res.status(400).json({ error: "Id é obrigatório." });
    }

    try {
        const listaExiste = await prisma.lista.findUnique({
            where: { id: intId },
        });

        if (!listaExiste) {
            return res.status(404).json({ error: "Lista não encontrada." });
        }

        const sublistas = await prisma.subLista.findMany({
            where: { listaId: intId },
            select: { id: true }
        });

        const subListaIds = sublistas.map(subLista => subLista.id);

        await prisma.subLista.deleteMany({
            where: { listaId: intId }
        });

        await prisma.lista.delete({
            where: { id: intId }
        });

        return res.status(200).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar a lista." });
    }
});

routes.delete("/sublista/:id", async (req, res) => {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!intId) {
        return res.status(400).json({ error: "Id é obrigatório." });
    }

    try {
        const sublistaExiste = await prisma.subLista.findUnique({
            where: { id: intId }
        });

        if (!sublistaExiste) {
            return res.status(404).json({ error: "Sublista não encontrada." });
        }

        await prisma.subSub.deleteMany({
            where: { sublistaId: intId }
        });

        await prisma.subLista.delete({ where: { id: intId } });

        return res.status(200).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar a sublista." });
    }
});

module.exports = routes;
