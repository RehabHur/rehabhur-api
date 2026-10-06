import { Teacher } from "../models/teacher.model.js";
import { teachers } from "../mocks/techer.mock.js";

export class TeacherRepository {

    findAll(): Teacher[] {
        return teachers;
    }
}