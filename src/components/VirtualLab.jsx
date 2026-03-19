import React, { useState } from 'react';
import BioDefenseGame from './BioDefenseGame';

export default function VirtualLab() {
    const [temperature, setTemperature] = useState(24);
    const [humidity, setHumidity] = useState(55);
    const [integrity, setIntegrity] = useState(100);

    return (
        <div className="md:col-span-12 mt-12 w-full">
            <div className={`bg-slate-900/80 border-2 p-8 rounded-3xl relative overflow-hidden w-full transition-colors duration-1000 ${integrity < 30 ? 'border-red-900/50 shadow-[0_0_50px_rgba(220,38,38,0.1)]' : 'border-slate-700'}`}>
                <div className="absolute top-0 right-0 p-4">
                    <span className={`flex items-center gap-2 text-[10px] px-2 py-1 rounded border ${integrity < 30 ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-primary bg-primary/10 border-primary/20'}`}>
                        <span className={`w-2 h-2 rounded-full animate-pulse ${integrity < 30 ? 'bg-red-500' : 'bg-primary'}`}></span> SYSTEM ACTIVE
                    </span>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Control Panel (Left) */}
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Laboratorio Virtual de <span className={`${integrity < 30 ? 'text-red-500 transition-colors' : 'text-primary'}`}>Defensa</span></h2>
                        <p className="text-slate-400 mb-8">Protocolo CEAF: Manipula la Temperatura y Humedad para optimizar el biocontrol. Las altas temperaturas aceleran las plagas. Mantén la humedad entre 50-70% para potenciar a los defensores.</p>
                        
                        <div className="space-y-8">
                            {/* Temperature Slider */}
                            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined ${temperature > 30 ? 'text-red-500 animate-[pulse_0.5s_infinite]' : 'text-orange-400'}`}>device_thermostat</span>
                                        <span className="font-bold text-white uppercase text-sm tracking-widest">Temperatura</span>
                                    </div>
                                    <span className={`text-xl font-mono font-bold ${temperature > 30 ? 'text-red-500' : 'text-orange-400'}`}>{temperature}°C</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="45" 
                                    value={temperature}
                                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
                                    <span>FRIO (10°C)</span>
                                    <span>CRÍTICO (45°C)</span>
                                </div>
                            </div>

                            {/* Humidity Slider */}
                            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined ${(humidity < 50 || humidity > 70) ? 'text-yellow-500' : 'text-blue-400'}`}>water_drop</span>
                                        <span className="font-bold text-white uppercase text-sm tracking-widest">Humedad (Nebulizador)</span>
                                    </div>
                                    <span className={`text-xl font-mono font-bold ${(humidity < 50 || humidity > 70) ? 'text-yellow-500' : 'text-blue-400'}`}>{humidity}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={humidity}
                                    onChange={(e) => setHumidity(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
                                    <span>SECO (0%)</span>
                                    <span className="text-primary font-bold">ÓPTIMO (50-70%)</span>
                                    <span>SATURADO (100%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BioDefense Game Renderer (Right) */}
                    <div className="flex justify-center items-center h-full min-h-[400px]">
                         <BioDefenseGame 
                            extTemperature={temperature} 
                            extHumidity={humidity} 
                            onStateChange={setIntegrity}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
