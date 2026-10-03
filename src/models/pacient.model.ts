export interface Pacient {
    id: number;
    name: string;
    lastName: string;
    email: string;
    dni: string;
    comision: number
}


export type CreatePacientDTO = Omit<Pacient, "id">;

export type UpdatePacientDTO = Partial<CreatePacientDTO>;