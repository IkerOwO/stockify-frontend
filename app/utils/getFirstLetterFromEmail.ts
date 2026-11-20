/**
 * Funcion que retorna la primer letra del email para poder crear el avatar
 * @param email Email
 * @author Iker
 */
export default function getFirstLetterFromUsername(email: string): string {
    return email.slice(0, 1);
}