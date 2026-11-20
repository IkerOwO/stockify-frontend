import { Role } from "./role.type"

export interface EmpleadoRegisterRequest {
    nombre: string,
    apellidos: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    cuenta_activa: boolean,
    fecha_incorporacion: string
}

/**
 * Interfaz empleado
 * @author Iker
 */
export interface Empleado {
    nombre: string,
    apellidos: string,
    usuario: string,
    email: string,
    password: string,
    repeatPass: string,
    role: Role
    cuenta_activa: boolean,
    fecha_incorporacion: Date
};

export interface EmpleadoLogin {
    email: string,
    password: string
};