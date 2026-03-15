import React from 'react';

export default function ImpactWall() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            <div className="md:col-span-7">
                <div className="bg-slate-900 border-2 border-slate-700 p-8 rounded-3xl h-full bento-shadow">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">location_on</span> Impacto Región de O'Higgins
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-slate-800 rounded-2xl">
                            <div className="text-4xl font-black text-primary mb-1">+1.2k</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Estudiantes Conectados</div>
                        </div>
                        <div className="p-6 bg-slate-800 rounded-2xl">
                            <div className="text-4xl font-black text-secondary mb-1">45</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Escuelas Participantes</div>
                        </div>
                        <div className="p-6 bg-slate-800 rounded-2xl">
                            <div className="text-4xl font-black text-accent mb-1">100%</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Talento Regional</div>
                        </div>
                        <div className="p-6 bg-slate-800 rounded-2xl">
                            <div className="text-4xl font-black text-white mb-1">8.5k</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Horas de Ciencia</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="md:col-span-5 relative mt-6 md:mt-0">
                <div className="bg-primary border-2 border-primary p-8 rounded-3xl h-full text-background-dark flex flex-col justify-between overflow-hidden relative z-10 w-full min-h-[300px]">
                    <div className="relative z-20">
                        <h3 className="text-3xl font-black leading-tight mb-4">¿Listo para salvar la biodiversidad regional?</h3>
                        <p className="font-medium opacity-80">Únete a la misión 'Pequeños Científicos' y demuestra tus habilidades.</p>
                    </div>
                    <button className="bg-background-dark text-white w-full py-4 rounded-xl font-black text-xl flex items-center justify-center gap-2 hover:translate-y-[-4px] transition-transform relative z-20 mt-8">
                        ¡PLAY NOW! <span className="material-symbols-outlined">sports_esports</span>
                    </button>
                    {/* Abstract geometric background shapes */}
                    <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none z-0">
                        <span className="material-symbols-outlined text-[200px]">filter_vintage</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
