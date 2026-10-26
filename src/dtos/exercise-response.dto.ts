import type { Exercise } from "../models/exercise.model.js";

export interface ExerciseResponseDto {
    id: number;
    name: string;
    bodyRegion: string;
    motionType: string;
    material: string;
    linkVideo: string;
    instructions: string;
}

export function toExerciseResponseDto(exercise: Exercise): ExerciseResponseDto {
    return {
        id: exercise.id,
        name: exercise.name,
        bodyRegion: exercise.bodyRegion,
        motionType: exercise.motionType,
        material: exercise.material,
        linkVideo: exercise.linkVideo,
        instructions: exercise.instructions,
    };
}