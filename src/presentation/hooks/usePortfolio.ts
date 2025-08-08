/**
 * usePortfolio Hook
 * Hook personalizado que encapsula la lógica de negocio del portfolio
 * usando la arquitectura DDD
 */

import { useState, useEffect, useMemo } from 'react';
import { Project } from '../../domain/entities/Project';
import { Skill } from '../../domain/entities/Skill';
import { PortfolioService } from '../../domain/services/PortfolioService';
import { InMemoryProjectRepository } from '../../infrastructure/storage/InMemoryProjectRepository';
import { InMemorySkillRepository } from '../../infrastructure/storage/InMemorySkillRepository';
import { GetFeaturedProjectsUseCase } from '../../application/use-cases/GetFeaturedProjectsUseCase';
import { GetSkillsByCategoryUseCase } from '../../application/use-cases/GetSkillsByCategoryUseCase';
import { GetPortfolioSummaryUseCase } from '../../application/use-cases/GetPortfolioSummaryUseCase';
import { DataAdapter } from '../../infrastructure/DataAdapter';

interface UsePortfolioReturn {
  // Projects
  featuredProjects: Project[];
  
  // Skills
  skills: Skill[];
  getSkillsByCategory: (category?: string) => Promise<Skill[]>;
  
  // Portfolio Summary
  portfolioSummary: {
    totalProjects: number;
    completedProjects: number;
    totalExperience: number;
    averageSkillLevel: number;
    overallProgress: number;
    topSkills: Array<{
      name: string;
      level: number;
      levelDescription: string;
      category: string;
      experience: number;
      color: string;
    }>;
    recommendedFocus: string[];
    suggestedTechnologies: string[];
  } | null;
  
  // Loading states
  loading: {
    projects: boolean;
    skills: boolean;
    summary: boolean;
  };
  
  // Error states
  errors: {
    projects: string | null;
    skills: string | null;
    summary: string | null;
  };
  
  // Actions
  refreshData: () => Promise<void>;
}

export const usePortfolio = (): UsePortfolioReturn => {
  // State
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<UsePortfolioReturn['portfolioSummary']>(null);
  
  const [loading, setLoading] = useState({
    projects: true,
    skills: true,
    summary: true
  });
  
  const [errors, setErrors] = useState({
    projects: null as string | null,
    skills: null as string | null,
    summary: null as string | null
  });

  // Initialize repositories and services
  const { 
    projectRepository, 
    skillRepository, 
    portfolioService,
    getFeaturedProjectsUseCase,
    getSkillsByCategoryUseCase,
    getPortfolioSummaryUseCase
  } = useMemo(() => {
    // Convert existing data to entities
    const projectEntities = DataAdapter.convertProjectsToEntities();
    const skillEntities = DataAdapter.convertSkillsToEntities();

    // Initialize repositories
    const projectRepo = new InMemoryProjectRepository(projectEntities);
    const skillRepo = new InMemorySkillRepository(skillEntities);

    // Initialize service
    const portfolioSvc = new PortfolioService(projectRepo, skillRepo);

    // Initialize use cases
    const getFeaturedProjectsUC = new GetFeaturedProjectsUseCase(projectRepo);
    const getSkillsByCategoryUC = new GetSkillsByCategoryUseCase(skillRepo);
    const getPortfolioSummaryUC = new GetPortfolioSummaryUseCase(portfolioSvc);

    return {
      projectRepository: projectRepo,
      skillRepository: skillRepo,
      portfolioService: portfolioSvc,
      getFeaturedProjectsUseCase: getFeaturedProjectsUC,
      getSkillsByCategoryUseCase: getSkillsByCategoryUC,
      getPortfolioSummaryUseCase: getPortfolioSummaryUC
    };
  }, []);

  // Load featured projects
  const loadFeaturedProjects = async () => {
    try {
      setLoading(prev => ({ ...prev, projects: true }));
      setErrors(prev => ({ ...prev, projects: null }));
      
      const projects = await getFeaturedProjectsUseCase.execute();
      setFeaturedProjects(projects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error loading projects';
      setErrors(prev => ({ ...prev, projects: errorMessage }));
      console.error('Error loading featured projects:', error);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  // Load skills
  const loadSkills = async () => {
    try {
      console.log('usePortfolio: Starting to load skills...');
      setLoading(prev => ({ ...prev, skills: true }));
      setErrors(prev => ({ ...prev, skills: null }));
      
      console.log('usePortfolio: Calling getSkillsByCategoryUseCase.execute()...');
      const allSkills = await getSkillsByCategoryUseCase.execute();
      console.log('usePortfolio: Received skills from useCase:', allSkills.length);
      console.log('usePortfolio: Skills preview:', allSkills.map(s => ({ name: s.name, experience: s.experience })));
      
      setSkills(allSkills);
      console.log('usePortfolio: Skills set in state');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error loading skills';
      setErrors(prev => ({ ...prev, skills: errorMessage }));
      console.error('Error loading skills:', error);
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  };

  // Load portfolio summary
  const loadPortfolioSummary = async () => {
    try {
      setLoading(prev => ({ ...prev, summary: true }));
      setErrors(prev => ({ ...prev, summary: null }));
      
      const summary = await getPortfolioSummaryUseCase.execute();
      setPortfolioSummary(summary);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error loading portfolio summary';
      setErrors(prev => ({ ...prev, summary: errorMessage }));
      console.error('Error loading portfolio summary:', error);
    } finally {
      setLoading(prev => ({ ...prev, summary: false }));
    }
  };

  // Get skills by category function
  const getSkillsByCategory = async (category?: string) => {
    try {
      return await getSkillsByCategoryUseCase.execute({ category });
    } catch (error) {
      console.error('Error getting skills by category:', error);
      return [];
    }
  };

  // Refresh all data
  const refreshData = async () => {
    await Promise.all([
      loadFeaturedProjects(),
      loadSkills(),
      loadPortfolioSummary()
    ]);
  };

  // Load data on component mount
  useEffect(() => {
    refreshData();
  }, []);

  return {
    // Data
    featuredProjects,
    skills,
    portfolioSummary,
    
    // Functions
    getSkillsByCategory,
    
    // States
    loading,
    errors,
    
    // Actions
    refreshData
  };
};
