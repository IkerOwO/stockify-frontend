/**
 * Componente Navbar
 * @author IkerOwO
 */

'use client';

import Link from "next/link";
import { useSyncExternalStore } from "react";

function subscribeToAvatarLetter(onStoreChange: () => void) {
    window.addEventListener("storage", onStoreChange);
    return () => window.removeEventListener("storage", onStoreChange);
}

function getAvatarLetterSnapshot() {
    return sessionStorage.getItem("userAvatarLetter") ?? "";
}

export default function NavbarDashboard() {
    const avatarLetter = useSyncExternalStore(
        subscribeToAvatarLetter,
        getAvatarLetterSnapshot,
        () => "",
    );

    return (
        <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white px-4 py-6">
            <Link
                href="/pages/dashboard"
                className="mb-8 px-3 text-xl font-bold tracking-tight text-emerald-700"
            >
                Stockify
            </Link>
            <nav
                aria-label="Navegacion Dashboard"
                className="flex flex-1 flex-col gap-2"
            >
                <Link
                    href="/pages/dashboard"
                    className="rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700"
                >
                    Inicio
                </Link>
                

                <Link
                    href="/pages/clientes"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                    Clientes
                </Link>

                <Link
                    href="/pages/productos"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                    Productos
                </Link>


                <Link
                    href="/pages/almacen"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                    Almacen
                </Link>

                <Link
                    href="/pages/clientes"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                    Clientes
                </Link>


                <Link
                    href="/pages/pedidos"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                    Pedidos
                </Link>

                <label htmlFor="searchBar_input" className="sr-only">
                    Buscar
                </label>
                <input
                    type="search"
                    placeholder="Buscar..."
                    className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    id="searchBar_input"
                />
            </nav>

            <details className="group relative mt-6 border-t border-gray-200 pt-4">
                <summary
                    aria-label="Abrir menú de usuario"
                    className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-2 py-2 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                        {avatarLetter ? (
                            <span aria-hidden="true" className="text-sm font-bold uppercase">
                                {avatarLetter}
                            </span>
                        ) : (
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                                fill="currentColor"
                            >
                                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                            </svg>
                        )}
                    </span>
                    <span className="text-sm font-medium">Mi cuenta</span>
                </summary>

                <div className="absolute bottom-0 left-full z-10 ml-2 hidden min-w-36 rounded-lg border border-gray-200 bg-white p-1 shadow-lg group-open:block">
                    <button
                        type="button"
                        className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Perfil
                    </button>
                    <button
                        type="button"
                        className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </details>
        </aside>
    );
}