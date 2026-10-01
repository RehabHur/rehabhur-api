import { describe, expect, it } from "vitest";

import { ExerciseService } from "./ExerciseService.js";

describe("ExerciseService", () => {
    it("debería devolver la lista de ejercicios disponibles", async () => {
        const service = new ExerciseService();
        const exercises = await service.getExercises();

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
});
