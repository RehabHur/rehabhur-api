export interface Option {
    id: number;
    label: string;
}

export const bodyRegionOptions: Option[] = [
    "Brazos",
    "Cadera",
    "Columna",
    "Columna torácica",
    "Core",
    "Cuello",
    "Espalda",
    "Hombros",
    "Muñecas",
    "Piernas",
    "Rodillas",
    "Tobillos",
    "Zona lumbar",
].map((label, index) => ({ id: index + 1, label }));

export const motionTypeOptions: Option[] = [
    "Abducción",
    "Abducción de hombro",
    "Circunducción",
    "Dorsiflexión",
    "Estabilización",
    "Estabilización lateral",
    "Extensión",
    "Extensión de cadera",
    "Extensión de codo",
    "Extensión y estabilización",
    "Flexión",
    "Flexión de cadera",
    "Flexión de cadera y rodilla",
    "Flexión de codo",
    "Flexión de hombro",
    "Flexión de rodilla",
    "Flexión de rodilla y cadera",
    "Flexión lumbar",
    "Flexión plantar",
    "Flexión y extensión",
    "Inclinación lateral",
    "Inclinación pélvica",
    "Respiración",
    "Retracción",
    "Rotación",
    "Rotación externa",
    "Rotación interna",
    "Tracción",
].map((label, index) => ({ id: index + 1, label }));

export const materialOptions: Option[] = [
    "Banda elástica",
    "Bastón",
    "Colchoneta",
    "Correa",
    "Mancuerna",
    "Mancuernas",
    "Pared",
    "Silla",
    "Sin material",
    "Toalla",
].map((label, index) => ({ id: index + 1, label }));
