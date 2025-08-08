/**
 * Componente para mostrar datos ofuscados de forma segura
 */
'use client';

import { useEffect, useState } from 'react';
import { DataObfuscator } from '@/lib/obfuscator';

interface SecureContactProps {
  email: string;
  className?: string;
}

export const SecureContact: React.FC<SecureContactProps> = ({ email, className }) => {
  const [decodedEmail, setDecodedEmail] = useState(email);

  useEffect(() => {
    // Solo decodificar en el cliente
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      setDecodedEmail(DataObfuscator.decode(email));
    }
  }, [email]);

  return (
    <a 
      href={`mailto:${decodedEmail}`}
      className={className}
    >
      {decodedEmail}
    </a>
  );
};

interface SecureLinkProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export const SecureLink: React.FC<SecureLinkProps> = ({ 
  url, 
  children, 
  className, 
  target = '_blank', 
  rel = 'noopener noreferrer' 
}) => {
  const [decodedUrl, setDecodedUrl] = useState(url);

  useEffect(() => {
    // Solo decodificar en el cliente
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      setDecodedUrl(DataObfuscator.getProtectedUrl(url));
    }
  }, [url]);

  return (
    <a 
      href={decodedUrl}
      target={target}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
};
