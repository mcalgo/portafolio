/**
 * ProjectId Value Object
 * Representa el identificador único de un proyecto
 */

export class ProjectId {
  private constructor(private readonly _value: string) {
    this.validate(_value);
  }

  static create(value: string): ProjectId {
    return new ProjectId(value);
  }

  get value(): string {
    return this._value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('ProjectId cannot be empty');
    }

    if (value.length > 50) {
      throw new Error('ProjectId cannot be longer than 50 characters');
    }

    // Validar que solo contenga caracteres alfanuméricos y guiones
    if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
      throw new Error('ProjectId can only contain alphanumeric characters, hyphens and underscores');
    }
  }

  equals(other: ProjectId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
