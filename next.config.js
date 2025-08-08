const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica de Next.js
  reactStrictMode: true,
  
  // Configuración para GitHub Pages (export estático)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Configuración de Webpack con ofuscación
  webpack: (config, { dev, isServer }) => {
    // Solo aplicar ofuscación en producción para el cliente
    if (!dev && !isServer && process.env.NODE_ENV === 'production') {
      // Configuración de Terser más agresiva
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options.terserOptions = {
              ...minimizer.options.terserOptions,
              compress: {
                ...minimizer.options.terserOptions.compress,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
                keep_fnames: false,
                keep_classnames: false,
                passes: 3
              },
              mangle: {
                ...minimizer.options.terserOptions.mangle,
                properties: {
                  regex: /^_private/
                },
                keep_fnames: false,
                keep_classnames: false
              },
              format: {
                comments: false
              }
            };
          }
        });
      }
    }

    // Optimizaciones adicionales
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },

  // Variables de entorno ofuscadas
  env: {
    OBFUSCATED_BUILD: process.env.NODE_ENV === 'production' ? 'true' : 'false',
    BUILD_TIME: new Date().toISOString(),
  },

  // Configuración para ESLint
  eslint: {
    ignoreDuringBuilds: true, // Temporal para testing de ofuscación
  },

  // Configuración para TypeScript
  typescript: {
    ignoreBuildErrors: true, // Temporal para testing de ofuscación
  }
};

// Configuración condicional para análisis de bundle
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
