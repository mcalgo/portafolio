/**
 * Configuración de JavaScript Obfuscator
 * Para proteger el código fuente del portafolio moderno
 */

module.exports = {
  // Configuración de ofuscación avanzada
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 2000,
  disableConsoleOutput: true,
  
  // Configuración de transformaciones de identificadores
  identifierNamesGenerator: 'hexadecimal',
  identifierNamesCache: {},
  identifiersPrefix: '',
  
  // Configuración de logging
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  renameProperties: false,
  renamePropertiesMode: 'safe',
  
  // Configuración de auto-defensa
  selfDefending: true,
  simplify: true,
  sourceMap: false,
  sourceMapBaseUrl: '',
  sourceMapFileName: '',
  sourceMapMode: 'separate',
  
  // Configuración de arrays de strings
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  
  // Configuraciones de transformaciones
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
  
  // Configuraciones específicas para producción
  target: 'browser',
  
  // Configuraciones de dominio (opcional para mayor seguridad)
  domainLock: [],
  
  // Configuración de reserva de nombres (para evitar romper React/Next.js)
  reservedNames: [
    '^React',
    '^_react',
    '^__react',
    '^_next',
    '^__next',
    '^Next',
    'require',
    'exports',
    'module',
    'window',
    'document',
    'global',
    'process',
    'Buffer',
    '__dirname',
    '__filename'
  ],
  
  // Configuración de strings reservados
  reservedStrings: [
    '_next',
    '__next',
    'react',
    'React',
    'ReactDOM',
    'next/router',
    'next/head',
    'next/image',
    'next/link',
    'next/script',
    'framer-motion',
    'lucide-react'
  ],

  // Configuración de exclusiones
  exclude: [
    '**/node_modules/**',
    '**/out/**',
    '**/*.test.js',
    '**/*.spec.js'
  ],

  // Configuraciones adicionales para mejor compatibilidad
  ignoreImports: true,
  ignoreRequireImports: true,
  
  // Configuración de seed para reproducibilidad (opcional)
  seed: 0,
  
  // Configuración de split strings
  splitStrings: true,
  splitStringsChunkLength: 10,
  
  // Configuraciones opcionales para mayor obfuscación
  unicodeEscapeSequence: false, // Mantener false para mejor rendimiento
  
  // Configuración de options object
  optionsPreset: 'medium-obfuscation'
};
