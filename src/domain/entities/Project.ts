/**
 * Project Entity - Representa un proyecto en el dominio
 * Contiene la lógica de negocio relacionada con proyectos
 */

import { ProjectStatus, ProjectCategory } from '../value-objects/ProjectStatus';
import { Technology } from '../value-objects/Technology';
import { ProjectId } from '../value-objects/ProjectId';

export class Project {
  private constructor(
    private readonly _id: ProjectId,
    private _title: string,
    private _description: string,
    private _technologies: Technology[],
    private _status: ProjectStatus,
    private _category: ProjectCategory,
    private _githubUrl?: string,
    private _liveUrl?: string,
    private _featured: boolean = false,
    private _createdAt: Date = new Date()
  ) {}

  // Factory method para crear un nuevo proyecto
  static create(
    id: string,
    title: string,
    description: string,
    technologies: string[],
    status: string,
    category: string,
    options?: {
      githubUrl?: string;
      liveUrl?: string;
      featured?: boolean;
      createdAt?: Date;
    }
  ): Project {
    return new Project(
      ProjectId.create(id),
      title,
      description,
      technologies.map(tech => Technology.create(tech)),
      ProjectStatus.fromString(status),
      ProjectCategory.fromString(category),
      options?.githubUrl,
      options?.liveUrl,
      options?.featured || false,
      options?.createdAt || new Date()
    );
  }

  // Getters
  get id(): string {
    return this._id.value;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get technologies(): string[] {
    return this._technologies.map(tech => tech.name);
  }

  get status(): string {
    return this._status.value;
  }

  get category(): string {
    return this._category.value;
  }

  get githubUrl(): string | undefined {
    return this._githubUrl;
  }

  get liveUrl(): string | undefined {
    return this._liveUrl;
  }

  get featured(): boolean {
    return this._featured;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  // Métodos de negocio
  markAsFeatured(): void {
    this._featured = true;
  }

  unmarkAsFeatured(): void {
    this._featured = false;
  }

  updateStatus(newStatus: string): void {
    this._status = ProjectStatus.fromString(newStatus);
  }

  addTechnology(technology: string): void {
    const tech = Technology.create(technology);
    if (!this._technologies.some(t => t.equals(tech))) {
      this._technologies.push(tech);
    }
  }

  removeTechnology(technology: string): void {
    this._technologies = this._technologies.filter(
      tech => tech.name !== technology
    );
  }

  // Método para verificar si está completado
  isCompleted(): boolean {
    return this._status.isCompleted();
  }

  // Método para verificar si está en progreso
  isInProgress(): boolean {
    return this._status.isInProgress();
  }
}
