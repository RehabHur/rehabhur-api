export interface Teaching {
    id: number;
    name: string;
    lastName: string;
    email: string;
    dni: string;
    comision: number
}


export type CreateTeachingDTO = Omit<Teaching, "id">;

export type UpdateTeachingDTO = Partial<CreateTeachingDTO>;