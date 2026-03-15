import React from 'react';

export default function Footer() {
    return (
        <>
            <footer className="mt-20 py-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                        <span className="material-symbols-outlined text-primary font-bold">biotech</span>
                    </div>
                    <div>
                        <h4 className="font-bold">CEAF</h4>
                        <p className="text-xs text-slate-500">Centro de Estudios Avanzados en Fruticultura</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                    <a className="hover:text-primary transition-colors" href="#">Privacidad</a>
                    <a className="hover:text-primary transition-colors" href="#">Términos</a>
                    <a className="hover:text-primary transition-colors" href="#">Soporte</a>
                    <a className="hover:text-primary transition-colors" href="#">Contacto</a>
                </div>
                <div className="flex gap-4">
                    <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all" href="#">
                        <span className="material-symbols-outlined">share</span>
                    </a>
                    <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all" href="#">
                        <span className="material-symbols-outlined">alternate_email</span>
                    </a>
                </div>
            </footer>
            <div className="pb-12 text-center text-[10px] text-slate-600 uppercase tracking-[0.2em] w-full">
                © {new Date().getFullYear()} Pequeños Científicos x CEAF • Región del Libertador General Bernardo O'Higgins
            </div>
        </>
    );
}
