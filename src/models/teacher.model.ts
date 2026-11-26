import type { Commission } from "../models/comission.model.js";

export interface Teacher {
    id: number;
    name: string;
    last_name: string;
    email: string;
    dni: string;
    commissions?: Commission[];
}

