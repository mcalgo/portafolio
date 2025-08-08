/**
 * Utilidades para ofuscación de datos sensibles
 * Protege información como URLs, emails, etc.
 */

/**
 * Ofusca strings sensibles usando Base64 y rotación
 */
export class DataObfuscator {
  private static readonly SALT = 'portfolio_2025_';
  
  /**
   * Codifica un string sensible
   */
  static encode(data: string): string {
    if (typeof window === 'undefined') return data; // Server-side, no ofuscar
    
    try {
      const salted = this.SALT + data;
      const encoded = btoa(salted);
      return this.rotateString(encoded);
    } catch {
      return data;
    }
  }

  /**
   * Decodifica un string ofuscado
   */
  static decode(obfuscatedData: string): string {
    if (typeof window === 'undefined') return obfuscatedData; // Server-side
    
    try {
      const rotated = this.reverseRotateString(obfuscatedData);
      const decoded = atob(rotated);
      return decoded.replace(this.SALT, '');
    } catch {
      return obfuscatedData;
    }
  }

  /**
   * Aplica rotación simple a un string
   */
  private static rotateString(str: string): string {
    return str.split('').reverse().join('');
  }

  /**
   * Revierte la rotación de un string
   */
  private static reverseRotateString(str: string): string {
    return str.split('').reverse().join('');
  }

  /**
   * Ofusca un email para mostrar públicamente
   */
  static obfuscateEmail(email: string): string {
    const [user, domain] = email.split('@');
    const obfuscatedUser = user.slice(0, 2) + '*'.repeat(user.length - 2);
    const [domainName, tld] = domain.split('.');
    const obfuscatedDomain = domainName.slice(0, 1) + '*'.repeat(domainName.length - 1);
    return `${obfuscatedUser}@${obfuscatedDomain}.${tld}`;
  }

  /**
   * Protege URLs sensibles
   */
  static protectUrl(url: string): string {
    if (process.env.NODE_ENV === 'development') return url;
    return this.encode(url);
  }

  /**
   * Recupera URL protegida
   */
  static getProtectedUrl(protectedUrl: string): string {
    if (process.env.NODE_ENV === 'development') return protectedUrl;
    return this.decode(protectedUrl);
  }
}

/**
 * Hook para usar datos ofuscados
 */
export const useObfuscatedData = () => {
  const getEmail = (obfuscatedEmail: string) => {
    return DataObfuscator.decode(obfuscatedEmail);
  };

  const getUrl = (obfuscatedUrl: string) => {
    return DataObfuscator.getProtectedUrl(obfuscatedUrl);
  };

  return {
    getEmail,
    getUrl,
    obfuscate: DataObfuscator.encode,
    deobfuscate: DataObfuscator.decode
  };
};
