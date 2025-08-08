/**
 * TempStorageManager - Maneja almacenamiento temporal de PDFs
 * Almacena en memoria y limpia automáticamente después de descargas
 */

export interface TempFile {
  id: string;
  blob: Blob;
  filename: string;
  createdAt: Date;
  downloaded: boolean;
}

export class TempStorageManager {
  private static instance: TempStorageManager;
  private storage = new Map<string, TempFile>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.startCleanupInterval();
  }

  static getInstance(): TempStorageManager {
    if (!TempStorageManager.instance) {
      TempStorageManager.instance = new TempStorageManager();
    }
    return TempStorageManager.instance;
  }

  /**
   * Almacena un PDF temporalmente y retorna un ID único
   */
  store(blob: Blob, filename: string): string {
    const id = this.generateId();
    const tempFile: TempFile = {
      id,
      blob,
      filename,
      createdAt: new Date(),
      downloaded: false
    };

    this.storage.set(id, tempFile);
    console.log(`📦 PDF almacenado temporalmente: ${id} - ${filename}`);
    
    return id;
  }

  /**
   * Recupera un archivo temporal y lo marca como descargado
   */
  retrieve(id: string): TempFile | null {
    const tempFile = this.storage.get(id);
    if (!tempFile) {
      console.warn(`⚠️ Archivo temporal no encontrado: ${id}`);
      return null;
    }

    // Marcar como descargado
    tempFile.downloaded = true;
    this.storage.set(id, tempFile);
    
    console.log(`📥 Archivo temporal recuperado: ${id} - ${tempFile.filename}`);
    return tempFile;
  }

  /**
   * Crea una URL temporal para descarga directa
   */
  createDownloadUrl(id: string): string | null {
    const tempFile = this.retrieve(id);
    if (!tempFile) {
      return null;
    }

    const url = URL.createObjectURL(tempFile.blob);
    
    // Programar limpieza de URL después de la descarga
    setTimeout(() => {
      URL.revokeObjectURL(url);
      this.remove(id);
      console.log(`🗑️ URL temporal revocada y archivo eliminado: ${id}`);
    }, 5000); // 5 segundos para completar la descarga

    return url;
  }

  /**
   * Elimina un archivo temporal específico
   */
  remove(id: string): boolean {
    const removed = this.storage.delete(id);
    if (removed) {
      console.log(`🗑️ Archivo temporal eliminado: ${id}`);
    }
    return removed;
  }

  /**
   * Fuerza la descarga de un archivo temporal - Versión mejorada
   */
  forceDownload(id: string): boolean {
    console.log(`🔍 Buscando archivo temporal con ID: ${id}`);
    console.log(`📊 Total archivos en storage: ${this.storage.size}`);
    
    const tempFile = this.storage.get(id);
    if (!tempFile) {
      console.warn(`⚠️ Archivo temporal no encontrado: ${id}`);
      console.log('📋 IDs disponibles:', Array.from(this.storage.keys()));
      return false;
    }

    try {
      console.log(`🔄 Iniciando descarga forzada: ${tempFile.filename}`);
      console.log(`📦 Tamaño del blob: ${tempFile.blob.size} bytes`);
      
      // Verificar que el blob sea válido
      if (!tempFile.blob || tempFile.blob.size === 0) {
        console.error('❌ Blob inválido o vacío');
        return false;
      }
      
      // Crear URL directamente desde el blob
      const url = URL.createObjectURL(tempFile.blob);
      console.log(`🔗 URL creada: ${url.substring(0, 50)}...`);
      
      // Crear elemento de descarga temporal
      const link = document.createElement('a');
      link.href = url;
      link.download = tempFile.filename;
      link.style.display = 'none';
      
      // Agregar al DOM, hacer clic y remover
      document.body.appendChild(link);
      console.log('👆 Elemento agregado al DOM, ejecutando click...');
      link.click();
      
      // Limpiar inmediatamente
      document.body.removeChild(link);
      console.log('🧹 Elemento removido del DOM');
      
      // Programar limpieza de URL después de un momento
      setTimeout(() => {
        URL.revokeObjectURL(url);
        console.log(`🧹 URL revocada para: ${tempFile.filename}`);
      }, 1000);
      
      // Marcar como descargado
      tempFile.downloaded = true;
      this.storage.set(id, tempFile);
      
      console.log(`✅ Descarga iniciada exitosamente: ${tempFile.filename}`);
      return true;

    } catch (error) {
      console.error('❌ Error en descarga forzada:', error);
      return false;
    }
  }

  /**
   * Limpia archivos temporales expirados o descargados
   */
  private cleanup(): void {
    const now = new Date();
    const maxAge = 10 * 60 * 1000; // 10 minutos
    let cleanedCount = 0;

    for (const [id, tempFile] of this.storage.entries()) {
      const age = now.getTime() - tempFile.createdAt.getTime();
      
      // Eliminar si está descargado o es muy antiguo
      if (tempFile.downloaded || age > maxAge) {
        this.storage.delete(id);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Limpieza automática: ${cleanedCount} archivos eliminados`);
    }
  }

  /**
   * Inicia el intervalo de limpieza automática
   */
  private startCleanupInterval(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Limpiar cada 2 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 2 * 60 * 1000);
  }

  /**
   * Detiene el intervalo de limpieza
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Limpia todo el almacenamiento temporal
   */
  clearAll(): void {
    const count = this.storage.size;
    this.storage.clear();
    console.log(`🗑️ Almacenamiento temporal completamente limpiado: ${count} archivos`);
  }

  /**
   * Obtiene estadísticas del almacenamiento
   */
  getStats(): {
    totalFiles: number;
    downloadedFiles: number;
    pendingFiles: number;
    oldestFile?: Date;
  } {
    const files = Array.from(this.storage.values());
    const downloadedFiles = files.filter(f => f.downloaded).length;
    const oldestFile = files.reduce((oldest, file) => 
      !oldest || file.createdAt < oldest ? file.createdAt : oldest, 
      null as Date | null
    );

    return {
      totalFiles: files.length,
      downloadedFiles,
      pendingFiles: files.length - downloadedFiles,
      oldestFile: oldestFile || undefined
    };
  }

  /**
   * Genera un ID único para archivos temporales
   */
  private generateId(): string {
    return `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Instancia singleton para uso global
export const tempStorage = TempStorageManager.getInstance();
