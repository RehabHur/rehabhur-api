import { Exercise } from "../models/exercise.model.js";
import { getPrismaClient } from "../lib/prisma.js";
import { exercises } from "../mocks/exercise.mock.js";
import {
  CreateExerciseDto,
  UpdateExerciseDto,
} from "../schemas/exercise.schema.js";

export class ExerciseRepository {
  async findByLinkVideo(linkVideo: string): Promise<Exercise | null> {
    if (process.env.NODE_ENV === "test") {
      const exercise = exercises.find((item) => item.linkVideo === linkVideo);
      return exercise ? { ...exercise } : null;
    }

    return getPrismaClient().exercise.findUnique({ where: { linkVideo } });
  }

  async findByNameAndBodyRegion(
    name: string,
    bodyRegion: string,
  ): Promise<Exercise | null> {
    if (process.env.NODE_ENV === "test") {
      const exercise = exercises.find((item) =>
        item.name === name && item.bodyRegion === bodyRegion,
      );
      return exercise ? { ...exercise } : null;
    }

    return getPrismaClient().exercise.findFirst({
      where: { name, bodyRegion },
    });
  }

  async findAll(): Promise<Exercise[]> {
    if (process.env.NODE_ENV === "test") {
      return exercises.map((exercise) => ({ ...exercise }));
    }

    return getPrismaClient().exercise.findMany();
  }

  async findById(id: number): Promise<Exercise | null> {
    if (process.env.NODE_ENV === "test") {
      const exercise = exercises.find((item) => item.id === id);
      return exercise ? { ...exercise } : null;
    }

    return getPrismaClient().exercise.findUnique({ where: { id } });
  }

  async create(data: CreateExerciseDto): Promise<Exercise> {
    if (process.env.NODE_ENV === "test") {
      const id = exercises.length
        ? Math.max(...exercises.map((exercise) => exercise.id)) + 1
        : 1;
      const exercise = { id, ...data };
      exercises.push(exercise);
      return { ...exercise };
    }

    return getPrismaClient().exercise.create({ data });
  }

  async update(id: number, data: UpdateExerciseDto): Promise<Exercise> {
    if (process.env.NODE_ENV === "test") {
      const index = exercises.findIndex((exercise) => exercise.id === id);
      if (index === -1) {
        throw new Error("No se encontró el ejercicio de prueba");
      }

      exercises[index] = { ...exercises[index]!, ...data };
      return { ...exercises[index]! };
    }

    return getPrismaClient().exercise.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Exercise> {
    if (process.env.NODE_ENV === "test") {
      const index = exercises.findIndex((exercise) => exercise.id === id);
      if (index === -1) {
        throw new Error("No se encontró el ejercicio de prueba");
      }

      const [deleted] = exercises.splice(index, 1);
      return { ...deleted! };
    }

    return getPrismaClient().exercise.delete({ where: { id } });
  }
}
