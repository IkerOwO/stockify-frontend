'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerEmpleado } from "@/app/api/auth.api";
import type { EmpleadoRegisterRequest } from "@/app/types/empleado.interface";
import { useRouter } from "next/navigation";

function getLocalDateInputValue() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${today.getFullYear()}-${month}-${day}`;
}

type RegistrationFormData = {
    nombre: string;
    apellidos: string;
    usuario: string;
    email: string;
    password: string;
    repeatPass: string;
    fecha_incorporacion: string;
};

export default function RegisterPage() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationFormData>({
        defaultValues: {
            fecha_incorporacion: "",
        },
    });

    const router = useRouter();

    useEffect(() => {
        setValue("fecha_incorporacion", getLocalDateInputValue());
    }, [setValue]);

    const onSubmit = async (data: RegistrationFormData) => {
        setSuccessMessage(null);

        try {
            const empleado: EmpleadoRegisterRequest = {
                nombre: data.nombre.trim(),
                apellidos: data.apellidos.trim(),
                username: data.usuario.trim(),
                email: data.email.trim(),
                password: data.password,
                role: "ROLE_EMPLEADO",
                cuenta_activa: true,
                fecha_incorporacion: data.fecha_incorporacion,
            };

            await registerEmpleado(empleado);
            setSuccessMessage("Cuenta creada correctamente. Ya puedes iniciar sesión.");
            router.replace("/");
            reset({
                fecha_incorporacion: getLocalDateInputValue(),
            });
        } catch (error) {
            setError("root.serverError", {
                type: "server",
                message: error instanceof Error ? error.message : "No se pudo crear la cuenta.",
            });
        }
    };

    const fieldClassName =
        "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
            <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className="w-full max-w-2xl space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Registro</h1>
                    <p className="text-sm text-gray-600">Crea una nueva cuenta de empleado</p>
                </header>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ana"
                            aria-invalid={Boolean(errors.nombre)}
                            aria-describedby={errors.nombre ? "nombre-error" : undefined}
                            className={fieldClassName}
                            {...register("nombre", {
                                required: "El nombre es obligatorio",
                                minLength: { value: 2, message: "Introduce al menos 2 caracteres" },
                            })}
                        />
                        {errors.nombre && (
                            <p id="nombre-error" className="text-sm text-red-600">
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                            Apellidos
                        </label>
                        <input
                            id="apellidos"
                            type="text"
                            placeholder="García López"
                            aria-invalid={Boolean(errors.apellidos)}
                            aria-describedby={errors.apellidos ? "apellidos-error" : undefined}
                            className={fieldClassName}
                            {...register("apellidos", {
                                required: "Los apellidos son obligatorios",
                                minLength: { value: 2, message: "Introduce al menos 2 caracteres" },
                            })}
                        />
                        {errors.apellidos && (
                            <p id="apellidos-error" className="text-sm text-red-600">
                                {errors.apellidos.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                        </label>
                        <input
                            id="usuario"
                            type="text"
                            placeholder="ana.garcia"
                            aria-invalid={Boolean(errors.usuario)}
                            aria-describedby={errors.usuario ? "usuario-error" : undefined}
                            className={fieldClassName}
                            {...register("usuario", {
                                required: "El nombre de usuario es obligatorio",
                                minLength: { value: 3, message: "Introduce al menos 3 caracteres" },
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+$/,
                                    message: "Solo se permiten letras, números, puntos y guiones",
                                },
                            })}
                        />
                        {errors.usuario && (
                            <p id="usuario-error" className="text-sm text-red-600">
                                {errors.usuario.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="fecha_incorporacion" className="block text-sm font-medium text-gray-700">
                            Fecha de incorporación
                        </label>
                        <input
                            id="fecha_incorporacion"
                            type="date"
                            aria-invalid={Boolean(errors.fecha_incorporacion)}
                            aria-describedby={errors.fecha_incorporacion ? "fecha-error" : undefined}
                            className={fieldClassName}
                            {...register("fecha_incorporacion", {
                                required: "La fecha de incorporación es obligatoria",
                            })}
                        />
                        {errors.fecha_incorporacion && (
                            <p id="fecha-error" className="text-sm text-red-600">
                                {errors.fecha_incorporacion.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="ana@stockify.com"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={fieldClassName}
                            {...register("email", {
                                required: "El correo electrónico es obligatorio",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Introduce un correo electrónico válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <p id="email-error" className="text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? "password-error" : undefined}
                            className={fieldClassName}
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres",
                                },
                            })}
                        />
                        {errors.password && (
                            <p id="password-error" className="text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700">
                            Repetir contraseña
                        </label>
                        <input
                            id="repeat-password"
                            type="password"
                            autoComplete="new-password"
                            aria-invalid={Boolean(errors.repeatPass)}
                            aria-describedby={errors.repeatPass ? "repeat-password-error" : undefined}
                            className={fieldClassName}
                            {...register("repeatPass", {
                                required: "Repite la contraseña",
                                validate: (value) =>
                                    value === getValues("password") || "Las contraseñas no coinciden",
                            })}
                        />
                        {errors.repeatPass && (
                            <p id="repeat-password-error" className="text-sm text-red-600">
                                {errors.repeatPass.message}
                            </p>
                        )}
                    </div>
                </div>

                {errors.root?.serverError && (
                    <p role="alert" className="text-sm text-red-600">
                        {errors.root.serverError.message}
                    </p>
                )}
                {successMessage && (
                    <p role="status" className="text-sm text-emerald-700">
                        {successMessage}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                </button>

                <Link
                    href="/"
                    className="block text-center text-sm font-medium text-gray-700 hover:underline"
                >
                    ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
            </form>
        </main>
    );
}
