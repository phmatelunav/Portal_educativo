import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BioDefenseGame({ extTemperature, extHumidity, onStateChange }) {
    // Game State
    const [plagues, setPlagues] = useState([]);
    const [allies, setAllies] = useState([]);
    const [integrity, setIntegrity] = useState(100);
    const [gameStatus, setGameStatus] = useState('idle'); // idle, active, success, failure
    const [ceafLog, setCeafLog] = useState('[SISTEMA EN ESPERA...]');
    
    // Internal timing refs for the game loop
    const requestRef = useRef();
    const lastUpdateRef = useRef(performance.now());
    const containerRef = useRef(null);

    // Constants
    const PLAGUE_SPEED_BASE = 0.5;
    const ALLY_SPEED_BASE = 1.0;
    const COLLISION_RADIUS = 20;
    const SPAWN_AREA_SIZE = 300; // Assuming a 300x300 radar area

    // CEAF Parameters based on prompts
    // High Temp (>30) = more plagues, faster
    const tempMultiplier = extTemperature > 30 ? 1.5 : (extTemperature < 15 ? 0.7 : 1);
    
    // Optimal Humidity (50-70) = faster/better allies
    const isOptimalHumidity = extHumidity >= 50 && extHumidity <= 70;
    const allyMultiplier = isOptimalHumidity ? 1.5 : 0.5;

    // --- GAME LOOP ---
    const updateGame = (time) => {
        if (gameStatus !== 'active') return;

        const deltaTime = time - lastUpdateRef.current;
        lastUpdateRef.current = time;

        if (deltaTime > 0) {
            setPlagues(currentPlagues => {
                let newPlagues = [...currentPlagues];
                let integrityDamage = 0;

                // Move Plagues towards center (150, 150)
                newPlagues = newPlagues.map(p => {
                    const dx = 150 - p.x;
                    const dy = 150 - p.y;
                    const distance = Math.hypot(dx, dy);
                    
                    if (distance < 10) {
                        integrityDamage += 0.5; // Damage core
                        return null; // Remove plague that reached core
                    }

                    const speedX = (dx / distance) * PLAGUE_SPEED_BASE * tempMultiplier;
                    const speedY = (dy / distance) * PLAGUE_SPEED_BASE * tempMultiplier;
                    
                    // Add erratic glitch motion if high temp
                    const glitchX = extTemperature > 30 ? (Math.random() - 0.5) * 4 : 0;
                    const glitchY = extTemperature > 30 ? (Math.random() - 0.5) * 4 : 0;

                    return { ...p, x: p.x + speedX + glitchX, y: p.y + speedY + glitchY };
                }).filter(Boolean); // Remove nulls

                if (integrityDamage > 0) {
                    setIntegrity(prev => Math.max(0, prev - integrityDamage));
                }

                return newPlagues;
            });

            setAllies(currentAllies => {
                let newAllies = [...currentAllies];

                // Move Allies towards nearest Plague
                setPlagues(currentPlagues => {
                    let mutablePlagues = [...currentPlagues];

                    newAllies = newAllies.map(a => {
                        if (mutablePlagues.length === 0) return a; // No targets, stay still

                        // Find closest plague
                        let target = mutablePlagues[0];
                        let minDx = target.x - a.x;
                        let minDy = target.y - a.y;
                        let minDist = Math.hypot(minDx, minDy);

                        for (let i = 1; i < mutablePlagues.length; i++) {
                            const p = mutablePlagues[i];
                            const dx = p.x - a.x;
                            const dy = p.y - a.y;
                            const dist = Math.hypot(dx, dy);
                            if (dist < minDist) {
                                target = p;
                                minDist = dist;
                                minDx = dx;
                                minDy = dy;
                            }
                        }

                        // Check collision
                        if (minDist < COLLISION_RADIUS) {
                            // Destroy plague
                            mutablePlagues = mutablePlagues.filter(p => p.id !== target.id);
                            return null; // Ally dies / consumed upon kill (simplification)
                        }

                        // Move towards target
                        const speedX = (minDx / minDist) * ALLY_SPEED_BASE * allyMultiplier;
                        const speedY = (minDy / minDist) * ALLY_SPEED_BASE * allyMultiplier;

                        return { ...a, x: a.x + speedX, y: a.y + speedY };
                    }).filter(Boolean);

                    return mutablePlagues;
                });
                
                return newAllies;
            });
        }
        
        requestRef.current = requestAnimationFrame(updateGame);
    };

    // --- EFFECT HOOKS ---

    // Game Loop Start/Stop
    useEffect(() => {
        if (gameStatus === 'active') {
            lastUpdateRef.current = performance.now();
            requestRef.current = requestAnimationFrame(updateGame);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameStatus, extTemperature, extHumidity]); // Dependencies that change physics

    // Log updates based on conditions
    useEffect(() => {
        if (gameStatus !== 'active') return;

        if (extTemperature > 30) {
            setCeafLog("[CEAF_DATA_FETCH]: CALOR EXTREMO. Reproducción acelerada de Drosophila suzukii detectada.");
        } else if (extHumidity < 50) {
            setCeafLog("[CEAF_DATA_FETCH]: ALERTA DE SEQUEDA. Eficacia del biocontrol (crisopas) reducida severamente.");
        } else if (extHumidity > 70) {
             setCeafLog("[CEAF_DATA_FETCH]: EXCESO DE HUMEDAD. Riesgo de infecciones fúngicas en cultivo.");
        } else {
             setCeafLog("[CEAF_DATA_FETCH]: PARÁMETROS ÓPTIMOS. Agentes biológicos operando a máxima capacidad.");
        }
        
        // Pass integrity up to VirtualLab if needed
        if (onStateChange) onStateChange(integrity);

    }, [extTemperature, extHumidity, gameStatus, integrity]);

    // Win/Loss Condition Checks
    useEffect(() => {
        if (gameStatus !== 'active') return;

        if (integrity <= 0) {
            setGameStatus('failure');
            setCeafLog("[FALLO CRÍTICO]: Integridad del cultivo comprometida. Cosecha perdida.");
        } else if (integrity > 0 && plagues.length === 0 && allies.length === 0) {
            // Very basic win check: no plagues left (and we haven't lost yet)
            // Note: because the game relies on clicking, if you kill all plagues you win.
            setGameStatus('success');
            setCeafLog("[SISTEMA ESTABILIZADO]: Cosecha salvada gracias a protocolos CEAF.");
        }
    }, [integrity, plagues, gameStatus]);


    // --- INTERACTIONS ---

    const startBreach = () => {
        setGameStatus('active');
        setIntegrity(100);
        // Spawn initial plagues at edges
        const initialPlagues = Array.from({ length: 15 }).map((_, i) => ({
            id: `plague-${Date.now()}-${i}`,
            // Random point on a circle around the center
            x: 150 + Math.cos(Math.random() * Math.PI * 2) * 140,
            y: 150 + Math.sin(Math.random() * Math.PI * 2) * 140
        }));
        setPlagues(initialPlagues);
        setAllies([]);
        setCeafLog("[ALERTA ROJA]: BRECHA DE SEGURIDAD. INFECCIÓN DETECTADA.");
    };

    const handleGridClick = (e) => {
        if (gameStatus !== 'active') return;
        
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate relative click position inside the 300x300 container
        const x = ((e.clientX - rect.left) / rect.width) * SPAWN_AREA_SIZE;
        const y = ((e.clientY - rect.top) / rect.height) * SPAWN_AREA_SIZE;

        // Spawn Ally
        setAllies(prev => [...prev, {
            id: `ally-${Date.now()}`,
            x, y
        }]);
    };

    // --- RENDER ---
    return (
        <div className="w-full flex flex-col items-center select-none">
            
            {/* Top HUD: Integrity Bar */}
            <div className="w-full max-w-sm mb-4">
                <div className="flex justify-between text-xs font-mono mb-1">
                    <span className={`${integrity < 30 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>INTEGRIDAD DEL CULTIVO</span>
                    <span className={`${integrity < 30 ? 'text-red-500' : 'text-slate-400'}`}>{integrity.toFixed(0)}%</span>
                </div>
                <div className="w-full h-3 border border-slate-700 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                        className={`h-full ${integrity < 30 ? 'bg-red-500' : 'bg-primary'}`}
                        initial={{ width: '100%' }}
                        animate={{ width: `${integrity}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Radar Container (Clickable Area) */}
            <div 
                ref={containerRef}
                onClick={handleGridClick}
                className={`relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full border-2 bg-slate-950 overflow-hidden cursor-crosshair shadow-[0_0_30px_inset_rgba(13,242,51,0.1)] transition-colors duration-500
                    ${gameStatus === 'active' ? 'border-primary shadow-[0_0_15px_rgba(13,242,51,0.4)]' : 
                      gameStatus === 'failure' ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)]' :
                      gameStatus === 'success' ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]' :
                      'border-slate-700'}`}
                style={{
                    // Use CSS variables internally to map 300x300 logical size to whatever visual size the container is
                    '--scale-factor': 'calc(100% / 300)'
                }}
            >
                {/* Visual Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(13,242,51,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(13,242,51,0.1)_1px,transparent_1px)] bg-[size:20px_20px] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none"></div>
                
                {/* Central Node (Core Crop) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center animate-pulse pointer-events-none">
                     <span className="w-2 h-2 bg-primary rounded-full"></span>
                </div>

                {/* Radar Sweep Line */}
                {gameStatus === 'active' && (
                    <div className="absolute left-1/2 top-1/2 w-1/2 h-1 bg-gradient-to-r from-primary/50 to-transparent origin-left animate-[spin_4s_linear_infinite] pointer-events-none"></div>
                )}

                {/* PARTICLES */}
                <AnimatePresence>
                    {plagues.map(p => (
                        <motion.div 
                            key={p.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, left: `calc(${p.x} * var(--scale-factor))`, top: `calc(${p.y} * var(--scale-factor))` }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0 }} // Instant update since game loop drives it
                            className={`absolute w-3 h-3 bg-red-600 shadow-[0_0_8px_#dc2626] rounded-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none ${extTemperature > 30 ? 'animate-[pulse_0.2s_infinite]' : ''}`}
                            style={{ clipPath: extTemperature > 30 ? 'polygon(10% 0, 100% 20%, 80% 100%, 0 80%)' : 'none' }} // Glitchy shape if hot
                        />
                    ))}
                    
                    {allies.map(a => (
                        <motion.div 
                            key={a.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, left: `calc(${a.x} * var(--scale-factor))`, top: `calc(${a.y} * var(--scale-factor))` }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0 }}
                            className={`absolute w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-transparent border-b-primary drop-shadow-[0_0_5px_#0df233] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none ${!isOptimalHumidity ? 'opacity-50 blur-[1px]' : ''}`}
                        />
                    ))}
                </AnimatePresence>

                {/* Overlays for states */}
                {gameStatus === 'idle' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 rounded-full">
                        <button 
                            onClick={startBreach}
                            className="px-6 py-3 bg-red-900/50 border border-red-500 text-red-500 font-bold font-mono hover:bg-red-800 hover:text-white transition-colors uppercase tracking-widest text-sm"
                        >
                            <span className="material-symbols-outlined align-middle mr-2">warning</span>
                            Simular Infección
                        </button>
                    </div>
                )}

                {gameStatus === 'failure' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 backdrop-blur-md z-10 rounded-full text-center">
                        <span className="material-symbols-outlined text-white text-5xl mb-2">skull</span>
                        <h3 className="text-white font-bold font-mono glitch-text" data-text="CULTIVO DESTRUIDO">CULTIVO DESTRUIDO</h3>
                        <button onClick={startBreach} className="mt-4 px-4 py-2 bg-black text-red-500 border border-red-500 font-mono text-xs hover:bg-red-500 hover:text-black">REINICIAR PROTOCOLO</button>
                    </div>
                )}

                {gameStatus === 'success' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/80 backdrop-blur-md z-10 rounded-full text-center p-4">
                        <span className="material-symbols-outlined text-white text-5xl mb-2">verified_user</span>
                        <h3 className="text-white font-bold font-mono">ENEMIGO ERRADICADO</h3>
                        <p className="text-blue-200 text-xs mt-2">Equilibrio biológico restaurado con éxito.</p>
                        <button onClick={() => setGameStatus('idle')} className="mt-4 px-4 py-2 bg-black text-blue-500 border border-blue-500 font-mono text-xs hover:bg-blue-500 hover:text-black">DESCONECTAR INTERFAZ</button>
                    </div>
                )}

            </div>

            {/* Bottom Terminal Log */}
            <div className={`mt-6 w-full max-w-sm p-4 rounded-lg font-mono text-xs sm:text-sm border transition-colors ${gameStatus === 'failure' ? 'bg-red-950 border-red-800 text-red-400' : gameStatus === 'success' ? 'bg-blue-950 border-blue-800 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
                {ceafLog}
                {gameStatus === 'active' && (
                    <div className="mt-2 text-[10px] text-slate-500">
                        <span className="text-primary mr-2">► ALIADOS: {allies.length}</span>
                        <span className="text-red-500">► PLAGAS: {plagues.length}</span>
                    </div>
                )}
            </div>

        </div>
    );
}
