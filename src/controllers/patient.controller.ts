import { Request, Response } from "express";
import { patiens } from "../mocks/patient.mock.js";


export const getAllPacients = async (_req: Request, res: Response): Promise<Response> => {
  try {
    if (!patiens || patiens.length === 0) {
      return res.status(404).json({ message: "No se encontró ningún paciente" });
    }

    return res.status(200).json(patiens);
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

    const pacient = patiens.find((p) => p.id === id);

    if (!pacient) {
      return res.status(404).json({ message: `El paciente con id ${id} no se encuentra.` });
    }

    return res.status(200).json(pacient);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

/*
export const createPacient = async (req: Request<{}, {}, {}>, res: Response): Promise<Response> => {
  try {
    const { name, lastName, email, dni, comision } = req.body;

    //TODO: Corregir validación de campos obligatorios para que no permita crear un paciente con campos vacíos
    if (!name || !lastName || !email || !dni || !comision) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const newId = patiens.length > 0 ? Math.max(...patiens.map((p) => p.id)) + 1 : 1;

    const newPacient: Patient = {
      id: newId,
      name,
      lastName,
      email,
      dni,
      comision,
    };

    patiens.push(newPacient);

    return res.status(201).json(newPacient);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};
*/

export const updatePacient = async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El id debe ser numérico" });
    }

    const index = patiens.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `No se encontró ningún paciente con id ${id}` });
    }

    patiens[index] = {
      ...patiens[index],
      ...req.body,
    };

    return res.status(200).json(patiens[index]);
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

    const index = patiens.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `El id ${id} no se encuentra.` });
    }

    const [deletedPacient] = patiens.splice(index, 1);

    return res.status(200).json({ message: "Paciente eliminado correctamente", pacient: deletedPacient });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

