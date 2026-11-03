import type { Request, Response } from "express";
import {
    bodyRegionOptions,
    materialOptions,
    motionTypeOptions,
    type Option,
} from "../mocks/option.mock.js";

export class OptionController {
    getBodyRegions = (_req: Request, res: Response<Option[]>): void => {
        res.status(200).json(bodyRegionOptions);
    };

    getMotionTypes = (_req: Request, res: Response<Option[]>): void => {
        res.status(200).json(motionTypeOptions);
    };

    getMaterials = (_req: Request, res: Response<Option[]>): void => {
        res.status(200).json(materialOptions);
    };
}
