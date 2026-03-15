import React from 'react';

export default function StudentPortal() {
    return (
        <div className="md:col-span-12 mt-12 mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">gate</span> Portal de Estudiantes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                <div className="md:col-span-6 bg-gradient-to-br from-green-900/40 to-emerald-900/20 border-2 border-primary/30 p-8 rounded-2xl hover:border-primary transition-all group cursor-pointer relative overflow-hidden bento-shadow">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h3 className="text-4xl font-bold text-white mb-2">Exploradores</h3>
                            <p className="text-primary/80 font-medium">Especialistas en la Granja Virtual (Siembra y Cosecha)</p>
                        </div>
                        <span className="material-symbols-outlined text-6xl text-primary/40 group-hover:scale-110 transition-transform">rocket_launch</span>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary">star</span></div>
                        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary">science</span></div>
                        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary">emoji_objects</span></div>
                    </div>
                    <div className="mt-8 text-white/60 text-sm">Ideal para mentes que aman los colores y la aventura.</div>
                </div>

                <div className="md:col-span-6 bg-slate-900 border-2 border-accent/30 p-8 rounded-2xl hover:border-accent transition-all group cursor-pointer relative overflow-hidden bento-shadow-purple">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h3 className="text-4xl font-bold text-white mb-2 italic">Analistas</h3>
                            <p className="text-accent/80 font-medium tracking-widest uppercase text-xs">Técnicos de Laboratorio Central (Genética y Microscopio)</p>
                        </div>
                        <span className="material-symbols-outlined text-6xl text-accent/40 group-hover:rotate-12 transition-transform">terminal</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="h-1 bg-accent/20 rounded"></div>
                        <div className="h-1 bg-accent/50 rounded"></div>
                        <div className="h-1 bg-accent/80 rounded"></div>
                        <div className="h-1 bg-accent rounded"></div>
                    </div>
                    <div className="mt-8 text-accent/60 text-sm font-mono tracking-tighter animate-typing w-fit">
                        Decodificando el genoma de la región de O'Higgins...
                    </div>
                </div>
            </div>
        </div>
    );
}
