/**
 * Pagina de dashboard
 * @author Iker
 */

import NavbarDashboard from "@/app/components/navbarDashboard";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <NavbarDashboard />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-2 sm:py-10">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

            </main>
        </div>
    );

}