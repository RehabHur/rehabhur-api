import { StudentRepository } from "../repository/stuents.repository.js";
import { CommissionRepository } from "../repository/comission.repository.js";
import { PatientRepository } from "../repository/patients.repository.js";
import type { Student } from "../models/student.model.js";
import type {
  CreateStudentDto,
  ListStudentsQuery,
  UpdateStudentDto,
} from "../schemas/student.schema.js";
import { AppError } from "../utils/AppError.js";
import { paginate, type PaginatedResponse } from "../utils/pagination.js";

export class StudentService {
  constructor(
    private readonly repository: StudentRepository,
    private readonly commissionRepository: CommissionRepository,
    private readonly patientRepository?: PatientRepository,
  ) { }

  async findAll(
    query: ListStudentsQuery = { page: 1, limit: 10 },
  ): Promise<PaginatedResponse<Student>> {
    const search = query.search?.toLowerCase();

    const students = await this.repository.findAll();

    const matchesSearch = search
      ? students.filter((student) =>
        [student.name, student.last_name, student.email, student.dni].some(
          (value) => value.toLowerCase().includes(search),
        ),
      )
      : students;

    return paginate(matchesSearch, query);
  }

  async findById(id: number): Promise<Student> {
    const student = await this.repository.findById(id);
    if (!student) {
      throw new AppError(404, "STUDENT_NOT_FOUND", "No se encontró el estudiante");
    }
    return student;
  }

  async create(data: CreateStudentDto): Promise<Student> {
    const existingByEmail = await this.repository.findByEmail(data.email);
    if (existingByEmail) {
      throw new AppError(
        400,
        "DUPLICATE_EMAIL",
        "Ya existe un estudiante registrado con este correo electrónico",
      );
    }

    const existingByDni = await this.repository.findByDni(data.dni);
    if (existingByDni) {
      throw new AppError(
        400,
        "DUPLICATE_DNI",
        "Ya existe un estudiante registrado con este DNI",
      );
    }

    if (data.commissionId !== undefined && data.commissionId !== null) {
      await this.commissionRepository.findById(data.commissionId);
    }

    return this.repository.create(data);
  }

  async update(id: number, data: UpdateStudentDto): Promise<Student> {
    const current = await this.findById(id);

    if (data.email !== undefined && data.email !== current.email) {
      const existingByEmail = await this.repository.findByEmail(data.email);
      if (existingByEmail && existingByEmail.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_EMAIL",
          "Ya existe otro estudiante registrado con este correo electrónico",
        );
      }
    }

    if (data.dni !== undefined && data.dni !== current.dni) {
      const existingByDni = await this.repository.findByDni(data.dni);
      if (existingByDni && existingByDni.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_DNI",
          "Ya existe otro estudiante registrado con este DNI",
        );
      }
    }

    if (data.commissionId !== undefined && data.commissionId !== null) {
      await this.commissionRepository.findById(data.commissionId);
    }

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }

  async addPatients(studentId: number, patientIds: number[]): Promise<Student> {
    await this.findById(studentId);

    if (this.patientRepository) {
      for (const patientId of patientIds) {
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
          throw new AppError(
            404,
            "PATIENT_NOT_FOUND",
            `No se encontró el paciente con id ${patientId}`,
          );
        }
      }
    }

    return this.repository.addPatients(studentId, patientIds);
  }

  async removePatients(
    studentId: number,
    patientIds: number[],
  ): Promise<Student> {
    await this.findById(studentId);
    await this.validatePatientsExist(patientIds);
    return this.repository.removePatients(studentId, patientIds);
  }

  private async validatePatientsExist(patientIds: number[]): Promise<void> {
    if (!this.patientRepository) return;

    for (const patientId of patientIds) {
      const patient = await this.patientRepository.findById(patientId);
      if (!patient) {
        throw new AppError(
          404,
          "PATIENT_NOT_FOUND",
          `No se encontró el paciente con id ${patientId}`,
        );
      }
    }
  }
}