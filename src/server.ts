import express, { Request, Response } from 'express';
import db from './database/connection';

const app = express();
app.use(express.json());

// GET, POST, PUT, DELETE
// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente
// Leitura de dados enviados
// PARAMS: Parâmetros que vêm na rota
// BODY: Corpo da requisição

app.get("/todolist", async (request: Request, response: Response) => {

  try {

    // .where() pra descobrir um item em particular
    // .orderBy() ordernar
    // .groupBy() 
    // .limit()
    const todoList = await db("todolist").orderBy("id", "desc");

    return response.json({ todoList });

  } catch (error) {
    return response.status(400).json({ error });
  }

});

app.post("/todolist", async (request: Request, response: Response) => {
  const { title, user_id, status } = request.body;
  const timestamp = Date.now();

  try {

    await db('todolist').insert({
      title,
      user_id,
      status,
      updated_at: timestamp,
      created_at: timestamp
    });

  } catch (error) {
    return response.status(400).json({ error: error });
  }

  return response.json({ message: "Todo list created" });

});

app.put("/todolist/:id", async (request: Request, response: Response) => {

  const { id } = request.params;
  const { title, user_id, status } = request.body;
  const timestamp = Date.now();

  try {

    await db('todolist').where("id", id).update({
      title,
      user_id,
      status,
      updated_at: timestamp
    });

  } catch (error) {
    return response.status(400).json({ error: error });
  }

  return response.json({ message: "Todo list updated" });

});

app.delete("/todolist/:id", async (request: Request, response: Response) => {

  const { id } = request.params;

  try {

    await db('todolist').where("id", id).del();

  } catch (error) {
    return response.status(400).json({ error: error });
  }

  return response.json({ message: "Todo list deleted" });

});

app.listen(3333, () => console.log('Server started on port 3333'));