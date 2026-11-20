/**
 * Login Page
 * @author Iker
 */

'use client'

import { useForm } from 'react-hook-form'
import { loginEmpleado } from '@/app/api/auth.api';
import { EmpleadoLogin } from '@/app/types/empleado.interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import getFirstLetterFromUsername from '@/app/utils/getFirstLetterFromEmail';

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<EmpleadoLogin>();

    const onSubmit = async (data: EmpleadoLogin) => {
        try {
            await loginEmpleado(data);
            sessionStorage.setItem('userAvatarLetter', getFirstLetterFromUsername(data.email)); // Le pasamos el email para sacar la primera letra
            router.push('/pages/dashboard');
        } catch (error) {
            setError('root.serverError', {
                type: 'server',
                message: error instanceof Error ? error.message : 'No se pudo iniciar sesión.',
            });
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
            <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Iniciar sesión
                    </h1>
                    <p className="text-sm text-gray-600">
                        Introduce tus datos para acceder a tu cuenta.
                    </p>
                </header>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
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

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                        {...register("password", {
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres",
                            },
                            required: "La contraseña es obligatoria",
                        })}
                    />
                    {errors.password && (
                        <p id="password-error" className="text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {errors.root?.serverError && (
                    <p role="alert" className="text-sm text-red-600">
                        {errors.root.serverError.message}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? 'Iniciando sesión...' : 'Entrar'}
                </button>
                <Link href="/pages/register" className="text-sm font-medium text-gray-700 hover:underline">Registrar una cuenta</Link>
            </form>
        </main>
    );
}