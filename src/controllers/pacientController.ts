import { Request, Response } from "express";
import { CreatePacientDTO, UpdatePacientDTO, Pacient } from "../models/pacient.model.js";
import { pacients } from "../mocks/pacient.mock.js";


export const prueba = async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200)
};




export const getAllPacients = async (_req: Request, res: Response): Promise<Response> => {
  try {
    if (!pacients || pacients.length === 0) {
      return res.status(404).json({ message: "No se encontró ningún paciente" });
    }

    return res.status(200).json(pacients);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const getPacientById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El id debe ser numérico" });
    }

    const pacient = pacients.find((p) => p.id === id);

    if (!pacient) {
      return res.status(404).json({ message: `El paciente con id ${id} no se encuentra.` });
    }

    return res.status(200).json(pacient);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const createPacient = async (
  req: Request<{}, {}, CreatePacientDTO>,
  res: Response
): Promise<Response> => {
  try {
    const { name, lastName, email, dni, comision } = req.body;

    if (!name || !lastName || !email || !dni || !comision) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const newId = pacients.length > 0 ? Math.max(...pacients.map((p) => p.id)) + 1 : 1;

    const newPacient: Pacient = {
      id: newId,
      name,
      lastName,
      email,
      dni,
      comision,
    };

    pacients.push(newPacient);

    return res.status(201).json(newPacient);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const updatePacient = async (
  req: Request<{ id: string }, {}, UpdatePacientDTO>,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El id debe ser numérico" });
    }

    const index = pacients.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `No se encontró ningún paciente con id ${id}` });
    }

    pacients[index] = {
      ...pacients[index],
      ...req.body,
    };

    return res.status(200).json(pacients[index]);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};


export const deletePacientById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El id debe ser numérico" });
    }

    const index = pacients.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `El id ${id} no se encuentra.` });
    }

    const [deletedPacient] = pacients.splice(index, 1);

    return res.status(200).json({ message: "Paciente eliminado correctamente", pacient: deletedPacient });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

