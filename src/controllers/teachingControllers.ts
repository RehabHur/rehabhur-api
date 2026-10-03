import { Request, Response } from "express";
import {Teaching , CreateTeachingDTO , UpdateTeachingDTO} from "../models/teaching.model.js"
import { teaching } from "../mocks/teaching.mock.js";


export const prueba = async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200)
};




export const getAllTeaching = async (_req: Request, res: Response): Promise<Response> => {
  try {
    if (!teaching || teaching.length === 0) {
      return res.status(404).json({ message: "No se encontró ningún docente" });
    }

    return res.status(200).json(teaching);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const getTeachingById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El id debe ser numérico" });
    }

    const findTeaching = teaching.find((p) => p.id === id);

    if (!findTeaching) {
      return res.status(404).json({ message: `El docente con id ${id} no se encuentra.` });
    }

    return res.status(200).json(findTeaching);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const createTeaching = async (
  req: Request<{}, {}, CreateTeachingDTO>,
  res: Response
): Promise<Response> => {
  try {
    const { name, lastName, email, dni, comision } = req.body;

    if (!name || !lastName || !email || !dni || !comision) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const newId = teaching.length > 0 ? Math.max(...teaching.map((p) => p.id)) + 1 : 1;

    const newTeaching: Teaching = {
      id: newId,
      name,
      lastName,
      email,
      dni,
      comision,
    };

    teaching.push(newTeaching);

    return res.status(201).json(newTeaching);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const updateTeaching = async (
  req: Request<{ id: string }, {}, UpdateTeachingDTO>,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El id debe ser numérico" });
    }

    const index = teaching.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `No se encontró ningún docente con id ${id}` });
    }

    teaching[index] = {
      ...teaching[index],
      ...req.body,
    };

    return res.status(200).json(teaching[index]);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const deleteTeachingById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El id debe ser numérico" });
    }

    const index = teaching.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `El id ${id} no se encuentra.` });
    }

    const [deleteTeaching] = teaching.splice(index, 1);

    return res.status(200).json({ message: "Docente eliminado correctamente", pacient: deleteTeaching });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};
