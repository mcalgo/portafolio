/**
 * CVGenerationButton - Componente para generación y descarga de CV
 */

"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Settings, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { useCVGeneration } from '@/presentation/hooks/useCVGeneration';
import { useLanguage } from '@/contexts/LanguageContext';

// Componente removido - ya no necesitamos opciones de formato

// Componente para opción de idioma
const LanguageOption = ({ code, label, flag, selected, onClick }: {
  code: string;
  label: string;
  flag: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
      selected 
        ? 'border-primary bg-primary/10 text-primary' 
        : 'border-border hover:border-primary/50 hover:bg-muted/50'
    }`}
  >
    <span className="text-lg">{flag}</span>
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);

export const CVGenerationButton = () => {
  const { t } = useLanguage();
  const cvGeneration = useCVGeneration();
  const { 
    generateCV, 
    downloadCV, 
    isGenerating, 
    progress, 
    status, 
    result, 
    error 
  } = cvGeneration;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const handleGenerate = async () => {
    console.log('🚀 Iniciando generación de CV...');
    
    const success = await generateCV({
      format: 'modern', // Solo usamos un formato fijo y bonito
      includeProjects: true,
      includeSkills: true,
      includeExperience: true,
      language: selectedLanguage as 'es' | 'en',
      theme: 'light'
    });

    if (success) {
      console.log('✅ CV generado exitosamente');
    } else {
      console.error('❌ Error generando CV');
    }
  };

  const handleDownload = async () => {
    if (!result?.tempId) {
      console.error('❌ No hay CV disponible para descargar');
      return;
    }

    console.log('🔄 Iniciando descarga del CV...', result.tempId);
    const success = await downloadCV();
    
    if (success) {
      console.log('✅ Descarga completada exitosamente');
    } else {
      console.error('❌ Error en la descarga');
    }
  };

  // Opciones de idioma (formato fijo: moderno y elegante)
  const languageOptions = [
    {
      code: 'es',
      label: 'Español',
      flag: '🇪🇸'
    },
    {
      code: 'en',
      label: 'English',
      flag: '🇺🇸'
    }
  ];

  return (
    <>
      {/* Botón Principal */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        disabled={isGenerating}
        className="group relative inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-lg font-medium text-lg transition-all hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      >
        <motion.div
          animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4" />
          ) : (
            <Download className="w-4 h-4" />
          )}
        </motion.div>
        
        <span>
          {isGenerating 
            ? 'Generando...' 
            : (t('cv.download') || 'Descargar CV')
          }
        </span>

        {isGenerating && (
          <div className="absolute inset-0 bg-primary/20 rounded-lg">
            <motion.div
              className="h-full bg-primary/30 rounded-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border border-border rounded-xl p-6 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Generar CV Profesional</h3>
              </div>

              <div className="space-y-6">
                {/* Información del formato */}
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary">✨ Formato Profesional</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    CV moderno y elegante con diseño profesional, optimizado para captar la atención de reclutadores.
                  </p>
                </div>

                {/* Opciones de Idioma */}
                <div>
                  <h4 className="font-medium mb-3">Idioma del CV</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {languageOptions.map((option) => (
                      <LanguageOption
                        key={option.code}
                        code={option.code}
                        label={option.label}
                        flag={option.flag}
                        selected={selectedLanguage === option.code}
                        onClick={() => setSelectedLanguage(option.code)}
                      />
                    ))}
                  </div>
                </div>

                {/* Estado de Generación */}
                <AnimatePresence>
                  {isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">
                          {status === 'preparing' && 'Preparando datos...'}
                          {status === 'generating' && 'Generando PDF...'}
                          {status === 'storing' && 'Almacenando archivo...'}
                          {status === 'downloading' && 'Iniciando descarga...'}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5 mt-2">
                        <motion.div
                          className="bg-primary h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Resultado exitoso */}
                <AnimatePresence>
                  {result && !isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-900 dark:text-green-100">
                            ¡CV generado exitosamente!
                          </p>
                          <div className="text-xs text-green-700 dark:text-green-300 mt-1 space-y-1">
                            <div>📄 {result.filename}</div>
                            <div>📊 {result.metadata.fileSize}</div>
                            <div>🛠️ {result.metadata.skillsCount} habilidades</div>
                            <div>💼 {result.metadata.projectsCount} proyectos</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900 dark:text-red-100">
                            Error al generar CV
                          </p>
                          <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                            {error}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Botones de Acción */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Settings className="w-4 h-4" />
                    )}
                    {isGenerating ? 'Generando...' : 'Generar CV'}
                  </motion.button>

                  {result && !isGenerating && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CVGenerationButton;
