import React from 'react';

export default function VirtualLab() {
    return (
        <div className="md:col-span-12 mt-12 w-full">
            <div className="bg-slate-900/80 border-2 border-slate-700 p-8 rounded-3xl relative overflow-hidden w-full">
                <div className="absolute top-0 right-0 p-4">
                    <span className="flex items-center gap-2 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span> SYSTEM ACTIVE
                    </span>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Laboratorio Virtual de <span className="text-primary">Variables</span></h2>
                        <p className="text-slate-400 mb-6">Manipula temperatura, humedad y luz para ver cómo reacciona el ecosistema. Datos reales del CEAF aplicados a tu pantalla.</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-800 rounded-xl flex items-center gap-4">
                                <span className="material-symbols-outlined text-orange-400">device_thermostat</span>
                                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="w-2/3 h-full bg-orange-400 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                </div>
                                <span className="text-xs font-mono text-white">24°C</span>
                            </div>
                            <div className="p-4 bg-slate-800 rounded-xl flex items-center gap-4">
                                <span className="material-symbols-outlined text-blue-400">water_drop</span>
                                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="w-1/2 h-full bg-blue-400 animate-[pulse_3s_ease-in-out_infinite]"></div>
                                </div>
                                <span className="text-xs font-mono text-white">55%</span>
                            </div>
                        </div>
                    </div>
                    <div 
                        className="aspect-video bg-background-dark rounded-2xl border-2 border-primary/20 flex items-center justify-center bg-cover bg-center" 
                        title="Microscopic view of plant cells with technical data overlays" 
                        style={{backgroundImage: `linear-gradient(rgba(10,18,11,0.8), rgba(10,18,11,0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoB_tLxw8r364dkOD7EVaH3IxmYNywJD1HZsJIUwbjzBOPsLThCdBqtbfFNM7A8zjoX7g5MmQT5nMpsqdYsdYSjHtu6PX8usIyrNjJqn85tD9nSuKoSQwsQOFwX75_2Cm_RZg9Y4DpAUDC4YxPYdwLf6MD0tBXy_q_8-4AyVukQ2xAsaXQ1YNI6sSz_rsSNYWZ9Phq9HLYK2WMYOcsBfFkNDyNfBpcLkcjQpWwWLgsI9n8tXhjB2-kJyPx_kO9tDXydwagNvsJefv7')`}}
                    >
                        <div className="text-center">
                            <span className="material-symbols-outlined text-6xl text-primary/50 mb-2">grid_view</span>
                            <p className="text-primary font-mono text-sm tracking-widest">RENDERIZANDO MUESTRA_B12</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
