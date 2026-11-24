import { describe, expect, it } from "vitest";

import type { Exercise } from "../models/exercise.model.js";
import { ExerciseRepository } from "../repository/exercises.repository.js";
import type { CreateExerciseDto } from "../schemas/exercise.schema.js";
import { ExerciseService } from "./excercise.service.js";

const toCreateDto = (exercise: Exercise): CreateExerciseDto => ({
    name: exercise.name,
    bodyRegion: exercise.bodyRegion,
    motionType: exercise.motionType,
    material: exercise.material,
    linkVideo: exercise.linkVideo,
    instructions: exercise.instructions,
});

const getTwoExercises = async (repository: ExerciseRepository): Promise<[Exercise, Exercise]> => {
    const [first, second] = await repository.findAll();
    if (!first || !second) {
        throw new Error("Se necesitan al menos dos ejercicios para ejecutar estas pruebas");
    }
    return [first, second];
};

const getExercisesWithSameRegion = async (
    repository: ExerciseRepository,
): Promise<[Exercise, Exercise]> => {
    const exercises = await repository.findAll();
    const current = exercises.find((exercise, index) =>
        exercises.slice(index + 1).some((other) =>
            other.bodyRegion === exercise.bodyRegion && other.name !== exercise.name,
        ),
    );
    const other = current && exercises.find((exercise) =>
        exercise.id !== current.id &&
        exercise.bodyRegion === current.bodyRegion &&
        exercise.name !== current.name,
    );
    if (!current || !other) {
        throw new Error("Se necesitan ejercicios diferentes de una misma región para esta prueba");
    }
    return [current, other];
};

describe("ExerciseService", () => {
    it("debería devolver la lista de ejercicios disponibles", async () => {
        const service = new ExerciseService(new ExerciseRepository());
        const exercises = (await service.findAll()).data;

        expect(Array.isArray(exercises)).toBe(true);
        expect(exercises.length).toBeGreaterThan(0);
        expect(exercises[0]).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            bodyRegion: expect.any(String),
            motionType: expect.any(String),
            material: expect.any(String),
            linkVideo: expect.any(String),
            instructions: expect.any(String),
        });
    });

    it("mantiene únicas las URL y las combinaciones de nombre y región existentes", async () => {
        const exercises = (await new ExerciseService(new ExerciseRepository()).findAll()).data;

        expect(new Set(exercises.map((exercise) => exercise.linkVideo)).size).toBe(exercises.length);
        expect(new Set(exercises.map((exercise) => `${exercise.name}\0${exercise.bodyRegion}`)).size)
            .toBe(exercises.length);
    });

    it("permite crear un ejercicio que cumple las reglas de unicidad", async () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = await getTwoExercises(repository);
        const created = await service.create({
            ...toCreateDto(existing),
            name: "Ejercicio de prueba único",
            bodyRegion: "Región de prueba",
            linkVideo: "https://www.youtube.com/watch?v=ejercicio-unico-test",
        });

        expect(created.id).toEqual(expect.any(Number));
        await expect(service.delete(created.id)).resolves.toBeUndefined();
    });

    it("rechaza la creación de ejercicios con una URL de video duplicada", async () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = await getTwoExercises(repository);
        const data = {
            ...toCreateDto(existing),
            name: "Ejercicio con otro nombre",
            bodyRegion: "Otra región",
        };

        await expect(service.create(data)).rejects.toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_LINK_VIDEO" }),
        );
    });

    it("rechaza la creación de ejercicios con nombre y región duplicados", async () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = await getTwoExercises(repository);
        const data = {
            ...toCreateDto(existing),
            linkVideo: "https://www.youtube.com/watch?v=ejercicio-nuevo",
        };

        await expect(service.create(data)).rejects.toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_EXERCISE" }),
        );
    });

    it("rechaza actualizar un ejercicio con la URL de video de otro", async () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [current, other] = await getTwoExercises(repository);

        await expect(service.update(current.id, { linkVideo: other.linkVideo })).rejects.toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_LINK_VIDEO" }),
        );
    });

    it("rechaza actualizar un ejercicio con el nombre y región de otro", async () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [current, other] = await getTwoExercises(repository);

        await expect(service.update(current.id, {
            name: other.name,
            bodyRegion: other.bodyRegion,
        })).rejects.toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_EXERCISE" }),
        );
    });

    it("rechaza una actualización parcial que genera un nombre y región duplicados", async () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [current, other] = await getExercisesWithSameRegion(repository);

        await expect(service.update(current.id, { name: other.name })).rejects.toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_EXERCISE" }),
        );
    });

    it("permite conservar la unicidad del mismo ejercicio al actualizarlo", async () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = await getTwoExercises(repository);

        await expect(service.update(existing.id, {
            name: existing.name,
            bodyRegion: existing.bodyRegion,
        })).resolves.toMatchObject({
            id: existing.id,
            name: existing.name,
            bodyRegion: existing.bodyRegion,
        });
    });

    it("devuelve un error 404 al buscar un ejercicio inexistente", async () => {
        const service = new ExerciseService(new ExerciseRepository());

        await expect(service.findById(Number.MAX_SAFE_INTEGER)).rejects.toThrowError(
            expect.objectContaining({ statusCode: 404, code: "EXERCISE_NOT_FOUND" }),
        );
    });
});
