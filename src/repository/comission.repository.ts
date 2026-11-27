import { Commission } from "../models/comission.model.js";
import { getPrismaClient } from "../lib/prisma.js";
import { commissions } from "../mocks/comission.mock.js";
import {
  CreateCommissionDto,
  UpdateCommissionDto,
} from "../schemas/comission.schema.js";

export class CommissionRepository {
  async findAll(): Promise<Commission[]> {
    if (process.env.NODE_ENV === "test") {
      return commissions.map((commission) => ({ ...commission }));
    }
    return getPrismaClient().commission.findMany();
  }

  async findById(id: number): Promise<Commission | null> {
    if (process.env.NODE_ENV === "test") {
      const commission = commissions.find((item) => item.id === id);
      return commission ? { ...commission } : null;
    }
    return getPrismaClient().commission.findUnique({
      where: { id },
      include: { teachers: true },
    });
  }

  async findByName(name: string): Promise<Commission | null> {
    if (process.env.NODE_ENV === "test") {
      const commission = commissions.find((item) => item.name === name);
      return commission ? { ...commission } : null;
    }
    return getPrismaClient().commission.findUnique({ where: { name } });
  }



  async findByIds(ids: number[]): Promise<Commission[]> {
    if (ids.length === 0) return [];

    if (process.env.NODE_ENV === "test") {
      return commissions
        .filter((item) => ids.includes(item.id))
        .map((item) => ({ ...item }));
    }

    return getPrismaClient().commission.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async create(data: CreateCommissionDto): Promise<Commission> {
    if (process.env.NODE_ENV === "test") {
      const id = commissions.length
        ? Math.max(...commissions.map((commission) => commission.id)) + 1
        : 1;
      const commission = { id, ...data, createdAt: new Date() };
      commissions.push(commission);
      return { ...commission };
    }
    return getPrismaClient().commission.create({ data });
  }

  async update(id: number, data: UpdateCommissionDto): Promise<Commission> {
    if (process.env.NODE_ENV === "test") {
      const index = commissions.findIndex((commission) => commission.id === id);
      if (index === -1) {
        throw new Error("No se encontró la comisión de prueba");
      }
      commissions[index] = { ...commissions[index]!, ...data };
      return { ...commissions[index]! };
    }
    return getPrismaClient().commission.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Commission> {
    if (process.env.NODE_ENV === "test") {
      const index = commissions.findIndex((commission) => commission.id === id);
      if (index === -1) {
        throw new Error("No se encontró la comisión de prueba");
      }
      const [deleted] = commissions.splice(index, 1);
      return { ...deleted! };
    }
    return getPrismaClient().commission.delete({ where: { id } });
  }
}
