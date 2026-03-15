import React, { useEffect, useState } from 'react';

export default function Navigation() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <header className="flex items-center justify-between py-6 border-b border-primary/10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-background-dark font-bold">biotech</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">Pequeños Científicos <span className="text-primary">x CEAF</span></h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
                <a className="hover:text-primary transition-colors font-medium" href="#">Laboratorio</a>
                <a className="hover:text-primary transition-colors font-medium" href="#">Misiones</a>
                <a className="hover:text-primary transition-colors font-medium" href="#">Comunidad</a>
                
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-400"
                    aria-label="Toggle Theme"
                    title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                    <span className="material-symbols-outlined">
                        {isDark ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                <button className="bg-primary text-background-dark px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform ml-2">
                    ¡Jugar Ahora!
                </button>
            </nav>
        </header>
    );
}
