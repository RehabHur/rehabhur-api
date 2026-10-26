import { Exercise } from "../models/exercise.model.js";
import { exercises } from "../mocks/exercise.mock.js";
import { CreateExerciseDto, UpdateExerciseDto } from "../schemas/exercise.schema.js";

export class ExerciseRepository {
    //la url en la db sera un atributo unico
    findByLinkVideo(linkVideo: string): Exercise | undefined {
        const exercise = exercises.find((item) => item.linkVideo === linkVideo);
        return exercise ? { ...exercise } : undefined;
    }

    // El name y la bodyRegion seran un atributo compuesto unico que no se podra repetir
    //podemos tener un mismo nombre pero podra diferir la region o vicebersa
    findByNameAndBodyRegion(name: string, bodyRegion: string): Exercise | undefined {
        const exercise = exercises.find(
            (item) => item.name === name && item.bodyRegion === bodyRegion
        );
        return exercise ? { ...exercise } : undefined;
    }


    findAll(): Exercise[] {
        return exercises.map((exercise) => ({ ...exercise }));
    }

    findById(id: number): Exercise | undefined {
        const exercise = exercises.find((item) => item.id === id);
        return exercise ? { ...exercise } : undefined;
    }

    create(data: CreateExerciseDto): Exercise {
        const id = exercises.length
            ? Math.max(...exercises.map((exercise) => exercise.id)) + 1
            : 1;

        const exercise: Exercise = {
            id,
            name: data.name,
            bodyRegion: data.bodyRegion,
            motionType: data.motionType,
            material: data.material,
            linkVideo: data.linkVideo,
            instructions: data.instructions,
        };

        exercises.push(exercise);
        return { ...exercise };
    }

    update(id: number, data: UpdateExerciseDto): Exercise | undefined {
        const index = exercises.findIndex((exercise) => exercise.id === id);
        if (index === -1) return undefined;

        const updated: Exercise = {
            ...exercises[index],
            ...(data.name !== undefined && { name: data.name }),
            ...(data.bodyRegion !== undefined && { bodyRegion: data.bodyRegion }),
            ...(data.motionType !== undefined && { motionType: data.motionType }),
            ...(data.material !== undefined && { material: data.material }),
            ...(data.linkVideo !== undefined && { linkVideo: data.linkVideo }),
            ...(data.instructions !== undefined && { instructions: data.instructions }),
        };

        exercises[index] = updated;

        return { ...updated };
    }

    delete(id: number): Exercise | undefined {
        const index = exercises.findIndex((exercise) => exercise.id === id);
        if (index === -1) return undefined;

        const [deleted] = exercises.splice(index, 1);
        return deleted ? { ...deleted } : undefined;
    }
}