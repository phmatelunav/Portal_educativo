import React, { useState } from 'react';
import DataExplorationModal from './DataExplorationModal';
import BotanicZoneModal from './BotanicZoneModal';

export default function HeroSection() {
    const [isDataModalOpen, setIsDataModalOpen] = useState(false);
    const [isBotanicModalOpen, setIsBotanicModalOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Hero Main Card */}
            <div className="md:col-span-8 bg-white dark:bg-slate-900/50 border-2 border-primary/20 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden bento-shadow">
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">Misión Activa: La Crisis del Cerezo</span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-none text-slate-900 dark:text-white">Ciencia <span className="text-primary italic">Agrícola</span> para Mentes Curiosas.</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8">Únete a los investigadores del CEAF para descifrar el genoma y salvar nuestros cultivos clave usando la mejor tecnología. ¡La región te necesita!</p>
                    <div className="flex flex-col lg:flex-row items-center gap-8 mt-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-primary text-background-dark px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(13,242,51,0.4)] transition-all">Iniciar Misión</button>
                            <button className="bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all">Ver Tutorial</button>
                        </div>
                        
                        {/* Cyberpunk Icons */}
                        <div className="flex gap-4 items-center lg:pl-8 lg:border-l-2 border-slate-700/50">
                            <span className="material-symbols-outlined text-3xl text-emerald-400 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all cursor-crosshair" title="Terminal Access">laptop_mac</span>
                            <span className="material-symbols-outlined text-3xl text-purple-400 hover:text-purple-300 hover:drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] transition-all cursor-crosshair" title="Synthetic Reagents">science</span>
                            <span className="material-symbols-outlined text-3xl text-blue-400 hover:text-blue-300 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] transition-all cursor-crosshair" title="Genomic Sequence">biotech</span>
                            <span className="material-symbols-outlined text-3xl text-red-500 hover:text-red-400 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all cursor-crosshair animate-pulse" title="Microbial Threat">coronavirus</span>
                            <div className="flex text-2xl drop-shadow-[0_0_10px_rgba(244,63,94,0.5)] hover:drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] transition-all cursor-crosshair" title="Prunus avium">🍒🍒</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Stats/Info */}
            <div className="md:col-span-4 grid grid-cols-1 gap-6">
                <div 
                    className="bg-white dark:bg-secondary/10 border-2 border-secondary/20 p-6 rounded-2xl bento-shadow-orange flex flex-col justify-center cursor-pointer hover:bg-secondary/20 dark:hover:bg-secondary/20 hover:border-secondary transition-all group"
                    onClick={() => setIsBotanicModalOpen(true)}
                >
                    <span className="material-symbols-outlined text-secondary text-4xl mb-2 group-hover:scale-110 transition-transform">eco</span>
                    <h3 className="text-2xl font-bold text-secondary">Zona Botánica</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Analiza el crecimiento de especies frutales en tiempo real.</p>
                </div>
                <div 
                    className="bg-white dark:bg-accent/10 border-2 border-accent/20 p-6 rounded-2xl bento-shadow-purple flex flex-col justify-center cursor-pointer hover:border-accent hover:bg-accent/20 dark:hover:bg-accent/20 transition-all group"
                    onClick={() => setIsDataModalOpen(true)}
                >
                    <span className="material-symbols-outlined text-accent text-4xl mb-2 group-hover:scale-110 transition-transform">data_exploration</span>
                    <h3 className="text-2xl font-bold text-accent">Análisis de Datos</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Convierte variables en descubrimientos científicos.</p>
                </div>
            </div>

            <DataExplorationModal 
                isOpen={isDataModalOpen} 
                onClose={() => setIsDataModalOpen(false)} 
            />

            <BotanicZoneModal
                isOpen={isBotanicModalOpen}
                onClose={() => setIsBotanicModalOpen(false)}
            />
        </div>
    );
}
