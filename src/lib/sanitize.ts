/**
 * Utilidades de sanitización y validación de inputs.
 * Usadas en formularios del lado cliente.
 *
 * IMPORTANTE: La validación cliente es una primera barrera (UX + seguridad superficial).
 * El servicio receptor (Formspree, etc.) es responsable de la validación definitiva.
 */

/** Elimina caracteres HTML peligrosos de una cadena arbitraria. */
export function sanitizeText(value: string): string {
  return value
    .replace(/[<>"'`]/g, "")  // Elimina caracteres de inyección HTML/JS
    .replace(/javascript:/gi, "") // Previene javascript: URIs
    .trim();
}

/** Valida formato de email con regex conservadora. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** Valida que el texto no esté vacío y no exceda la longitud máxima. */
export function isValidText(text: string, maxLength = 1000): boolean {
  const trimmed = text.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength;
}

/** Valida que un campo telefónico contenga solo dígitos, espacios y +/-/() */
export function isValidPhone(phone: string): boolean {
  return /^[0-9\s\+\-\(\)]{7,20}$/.test(phone.trim());
}

/** Trunca un string al límite de caracteres permitido. */
export function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}
