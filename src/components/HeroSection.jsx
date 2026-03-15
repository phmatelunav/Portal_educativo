import React, { useState } from 'react';
import heroCharacterImage from '../assets/hero_character.png';
import DataExplorationModal from './DataExplorationModal';

export default function HeroSection() {
    const [isDataModalOpen, setIsDataModalOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Hero Main Card */}
            <div className="md:col-span-8 bg-white dark:bg-slate-900/50 border-2 border-primary/20 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden bento-shadow">
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">Misión Activa: La Crisis del Cerezo</span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-none text-slate-900 dark:text-white">Ciencia <span className="text-primary italic">Agrícola</span> para Mentes Curiosas.</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8">Únete a los investigadores del CEAF para descifrar el genoma y salvar nuestros cultivos clave usando la mejor tecnología. ¡La región te necesita!</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-primary text-background-dark px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(13,242,51,0.4)] transition-all">Iniciar Misión</button>
                        <button className="bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all">Ver Tutorial</button>
                    </div>
                </div>
                {/* Pixel Art Character */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 md:opacity-100 pointer-events-none">
                    <img 
                        src={heroCharacterImage} 
                        alt="Pixel art scientist character with laboratory equipment" 
                        className="w-80 h-auto object-contain animate-bounce drop-shadow-[0_0_15px_rgba(13,242,51,0.5)]" 
                        style={{animationDuration: '3s'}} 
                    />
                </div>
            </div>

            {/* Side Stats/Info */}
            <div className="md:col-span-4 grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-secondary/10 border-2 border-secondary/20 p-6 rounded-2xl bento-shadow-orange flex flex-col justify-center">
                    <span className="material-symbols-outlined text-secondary text-4xl mb-2">eco</span>
                    <h3 className="text-2xl font-bold text-secondary">Zona Botánica</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Analiza el crecimiento de especies nativas en tiempo real.</p>
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
        </div>
    );
}
