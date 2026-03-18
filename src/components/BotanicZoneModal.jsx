import React, { useState } from 'react';
import BotanicTreeSVG from './BotanicTreeSVG';

export default function BotanicZoneModal({ isOpen, onClose }) {
  const [stage, setStage] = useState(1);
  const maxStage = 3;

  if (!isOpen) return null;

  const handleNextStage = () => {
      if (stage < maxStage) {
          setStage(stage + 1);
      }
  };

  const handleReset = () => {
      setStage(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-900 border-2 border-secondary/30 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bento-shadow-orange flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-secondary/20 bg-secondary/5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-3xl">eco</span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Fisiología del Cerezo (Prunus avium)</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 grid md:grid-cols-2 gap-8">
            
            {/* Animation Viewer (Left) */}
            <div className="flex flex-col">
                <p className="text-slate-600 dark:text-slate-400 mb-4 whitespace-nowrap">
                    Observa el desarrollo fenológico interagiendo con el simulador.
                </p>
                <div className="flex-1 w-full bg-slate-950 rounded-xl overflow-hidden relative mb-4">
                    {/* Key: Adding a key based on stage if we wanted to force re-render, 
                        but CSS transitions handle it perfectly here. */}
                    <BotanicTreeSVG stage={stage} />
                </div>
                
                {/* Controls */}
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-700 dark:text-slate-300">
                        Fase: <span className="text-secondary">{stage} / {maxStage}</span>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleReset}
                            className="px-4 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined align-middle text-sm">restart_alt</span>
                        </button>
                        <button 
                            onClick={handleNextStage}
                            disabled={stage === maxStage}
                            className={`px-6 py-2 rounded-lg font-bold transition-transform ${stage === maxStage ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-secondary text-white hover:scale-105 shadow-[0_4px_14px_0_rgba(255,107,0,0.39)]'}`}
                        >
                            Avanzar Tiempo <span className="material-symbols-outlined align-middle text-sm ml-1">fast_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scientific Explanation Narrator (Right) */}
            <div className="flex flex-col justify-center space-y-6">
                
                {/* Stage 1 Text */}
                <div className={`transition-all duration-500 ${stage >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 h-0 overflow-hidden'}`}>
                    <div className="p-4 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
                        <h4 className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined">water_drop</span> FASE 1: Absorción Radicular
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300">
                            La zona botánica comienza en el subsuelo. El sistema radicular primario se ancla, 
                            mientras las raíces secundarias y los finos pelos absorbentes extraen agua y nutrientes minerales 
                            (Nitrógeno, Fósforo, Potasio). El <span className="text-orange-600 dark:text-orange-400 font-semibold">pulso brillante</span> representa el bombeo activo en contra del gradiente de concentración.
                        </p>
                    </div>
                </div>

                {/* Stage 2 Text */}
                <div className={`transition-all duration-500 ${stage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 h-0 overflow-hidden hidden'}`}>
                    <div className="p-4 rounded-xl bg-primary/10 border-l-4 border-primary">
                        <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined">network_node</span> FASE 2: Transporte Vascular (Xilema)
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300">
                            Observa el flujo ascendente. El agua y los minerales forman la "savia bruta", subiendo
                            presurizada a través de los conductos del <span className="text-primary font-semibold">xilema</span> en el tronco. 
                            Este transporte desafía la gravedad gracias a la fuerza de cohesión-tensión generada por la transpiración futura en las ramas altas.
                        </p>
                    </div>
                </div>

                {/* Stage 3 Text */}
                <div className={`transition-all duration-500 ${stage >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 h-0 overflow-hidden hidden'}`}>
                    <div className="p-4 rounded-xl bg-red-500/10 border-l-4 border-red-500">
                        <h4 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined">nutrition</span> FASE 3: Desarrollo Fenológico (Fruto)
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300">
                            Con la arquitectura vegetal completa, las hojas (dosel verde) realizan fotosíntesis, creando "savia elaborada". 
                            Toda esta energía se centraliza (sumideros) para lograr floración y maduración de los frutos: <span className="text-red-600 dark:text-red-400 font-semibold">Las cerezas</span>. 
                            Las investigaciones del CEAF buscan optimizar este delicado equilibrio ante estreses climáticos.
                        </p>
                    </div>
                </div>

                {stage === 3 && (
                    <div className="mt-4 text-center animate-bounce">
                        <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary font-bold rounded-full border border-secondary text-sm">
                            ¡Desarrollo Completo!
                        </span>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
}
