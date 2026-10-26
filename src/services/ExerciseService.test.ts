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

const getTwoExercises = (repository: ExerciseRepository): [Exercise, Exercise] => {
    const [first, second] = repository.findAll();
    if (!first || !second) {
        throw new Error("Se necesitan al menos dos ejercicios para ejecutar estas pruebas");
    }
    return [first, second];
};

const getExercisesWithSameRegion = (repository: ExerciseRepository): [Exercise, Exercise] => {
    const exercises = repository.findAll();
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
    it("debería devolver la lista de ejercicios disponibles", () => {
        const service = new ExerciseService(new ExerciseRepository());
        const exercises = service.findAll();

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

    it("mantiene únicas las URL y las combinaciones de nombre y región existentes", () => {
        const exercises = new ExerciseService(new ExerciseRepository()).findAll();

        expect(new Set(exercises.map((exercise) => exercise.linkVideo)).size).toBe(exercises.length);
        expect(new Set(exercises.map((exercise) => `${exercise.name}\0${exercise.bodyRegion}`)).size)
            .toBe(exercises.length);
    });

    it("permite crear un ejercicio que cumple las reglas de unicidad", () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = getTwoExercises(repository);
        const created = service.create({
            ...toCreateDto(existing),
            name: "Ejercicio de prueba único",
            bodyRegion: "Región de prueba",
            linkVideo: "https://www.youtube.com/watch?v=ejercicio-unico-test",
        });

        expect(created.id).toEqual(expect.any(Number));
        expect(service.delete(created.id)).toBeUndefined();
    });

    it("rechaza la creación de ejercicios con una URL de video duplicada", () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = getTwoExercises(repository);
        const data = {
            ...toCreateDto(existing),
            name: "Ejercicio con otro nombre",
            bodyRegion: "Otra región",
        };

        expect(() => service.create(data)).toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_LINK_VIDEO" }),
        );
    });

    it("rechaza la creación de ejercicios con nombre y región duplicados", () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = getTwoExercises(repository);
        const data = {
            ...toCreateDto(existing),
            linkVideo: "https://www.youtube.com/watch?v=ejercicio-nuevo",
        };

        expect(() => service.create(data)).toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_EXERCISE" }),
        );
    });

    it("rechaza actualizar un ejercicio con la URL de video de otro", () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [current, other] = getTwoExercises(repository);

        expect(() => service.update(current.id, { linkVideo: other.linkVideo })).toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_LINK_VIDEO" }),
        );
    });

    it("rechaza actualizar un ejercicio con el nombre y región de otro", () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [current, other] = getTwoExercises(repository);

        expect(() => service.update(current.id, {
            name: other.name,
            bodyRegion: other.bodyRegion,
        })).toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_EXERCISE" }),
        );
    });

    it("rechaza una actualización parcial que genera un nombre y región duplicados", () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [current, other] = getExercisesWithSameRegion(repository);

        expect(() => service.update(current.id, { name: other.name })).toThrowError(
            expect.objectContaining({ statusCode: 409, code: "DUPLICATE_EXERCISE" }),
        );
    });

    it("permite conservar la unicidad del mismo ejercicio al actualizarlo", () => {
        const repository = new ExerciseRepository();
        const service = new ExerciseService(repository);
        const [existing] = getTwoExercises(repository);

        expect(service.update(existing.id, {
            name: existing.name,
            bodyRegion: existing.bodyRegion,
        })).toMatchObject({
            id: existing.id,
            name: existing.name,
            bodyRegion: existing.bodyRegion,
        });
    });

    it("devuelve un error 404 al buscar un ejercicio inexistente", () => {
        const service = new ExerciseService(new ExerciseRepository());

        expect(() => service.findById(Number.MAX_SAFE_INTEGER)).toThrowError(
            expect.objectContaining({ statusCode: 404, code: "EXERCISE_NOT_FOUND" }),
        );
    });
});
