import axios from "axios";
import type { EmpleadoLogin, EmpleadoRegisterRequest } from '../types/empleado.interface';

/**
 * Funcion para registrar un empleado
 */
export async function registerEmpleado(data: EmpleadoRegisterRequest) {
    try {
        const { data: empleado} = await axios.post(
            '/backend/auth/register',
            data
        );
        return empleado;
    } catch (e) {
        throw new Error(
            e instanceof Error ? e.message : "Error al registar empleado"
        );
    } 
} 

/**
 * Funcion para loguear un empleado
 */
export async function loginEmpleado(data: EmpleadoLogin) {
    try {
        const { data: empleado } = await axios.post(
            '/backend/auth/login',
            data
        );
        return empleado;
    } catch (e) {
        throw new Error(
            e instanceof Error ? e.message: "Error al loguear empleado"
        );
    }
}