import { CommissionRepository } from "../repository/comission.repository.js";
import { Commission } from "../models/comission.model.js";
import { CreateCommissionDto, ListCommissionsQuery, UpdateCommissionDto } from "../schemas/comission.schema.js";
import { AppError } from "../utils/AppError.js";
import { paginate, type PaginatedResponse } from "../utils/pagination.js";

export class CommissionService {
  constructor(private readonly repository: CommissionRepository) { }

  async findAll(query: ListCommissionsQuery = { page: 1, limit: 10 }): Promise<PaginatedResponse<Commission>> {
    const search = query.search?.toLowerCase();
    
    const commissions = await this.repository.findAll();
    
    const filtered = search
      ? commissions.filter((commission) =>
          [commission.name, commission.year.toString()]
            .some((value) => value.toLowerCase().includes(search)))
      : commissions;

    return paginate(filtered, query);
  }

  async findById(id: number): Promise<Commission> {
    return this.findOrThrow(id);
  }

  async create(data: CreateCommissionDto): Promise<Commission> {
    await this.validateUniqueness(data);
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateCommissionDto): Promise<Commission> {
    const currentCommission = await this.findOrThrow(id);
    await this.validateUniqueness({ ...currentCommission, ...data }, id);

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.findOrThrow(id);
    await this.repository.delete(id);
  }

  private async validateUniqueness(
    data: Pick<Commission, "name">,
    excludedId?: number,
  ): Promise<void> {
    const existingByName = await this.repository.findByName(data.name);
    if (existingByName && existingByName.id !== excludedId) {
      throw new AppError(
        409,
        "DUPLICATE_COMMISSION",
        "Ya existe otra comisión registrada con este nombre",
      );
    }
  }

  private async findOrThrow(id: number): Promise<Commission> {
    const commission = await this.repository.findById(id);
    if (!commission) {
      throw new AppError(404, "COMMISSION_NOT_FOUND", "No se encontró la comisión");
    }
    return commission;
  }
}