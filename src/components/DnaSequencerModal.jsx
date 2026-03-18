import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// --- Subcomponents for Drag and Drop ---

function DraggableBase({ id, letter, colorClass }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: { letter }
    });
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
    } : undefined;

    return (
        <button 
            ref={setNodeRef} 
            style={style} 
            {...listeners} 
            {...attributes}
            className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-dashed font-mono text-2xl md:text-3xl font-bold cursor-grab active:cursor-grabbing hover:bg-opacity-20 transition-colors bg-black ${colorClass}`}
        >
            {letter}
        </button>
    );
}

function DroppableSlot({ id, expected, isFilled, filledLetter }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
        data: { expected }
    });

    const style = {
        opacity: isFilled ? 1 : (isOver ? 0.8 : 0.5),
        borderColor: isOver ? '#22c55e' : (isFilled ? '#22c55e' : '#ef4444'),
        backgroundColor: isFilled ? 'rgba(34, 197, 94, 0.2)' : (isOver ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'),
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-red-500 font-mono text-xl md:text-3xl font-bold relative transition-all`}
        >
            {isFilled ? (
                <span className="text-green-400">{filledLetter}</span>
            ) : (
                <span className="text-red-500 text-xs md:text-sm animate-pulse">ERR</span>
            )}
        </div>
    );
}

// --- Main DNA Sequencer Game Component ---

export default function DnaSequencerModal({ isOpen, onClose }) {
    // Sequence Data: Prunus avium (Cherry) snippet
    const targetTop = ['A', 'C', 'T', 'G', 'C', 'A', 'A', 'T'];
    const complements = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'};
    const colors = {
        'A': 'text-amber-400 border-amber-400 hover:bg-amber-400', 
        'T': 'text-emerald-400 border-emerald-400 hover:bg-emerald-400', 
        'C': 'text-blue-400 border-blue-400 hover:bg-blue-400', 
        'G': 'text-purple-400 border-purple-400 hover:bg-purple-400'
    };
    
    const [slots, setSlots] = useState([
        { id: 'slot-0', index: 0, filled: true, letter: 'T' },
        { id: 'slot-1', index: 1, filled: false, letter: null, expected: 'G' },
        { id: 'slot-2', index: 2, filled: false, letter: null, expected: 'A' },
        { id: 'slot-3', index: 3, filled: true, letter: 'C' },
        { id: 'slot-4', index: 4, filled: false, letter: null, expected: 'G' },
        { id: 'slot-5', index: 5, filled: true, letter: 'T' },
        { id: 'slot-6', index: 6, filled: false, letter: null, expected: 'T' },
        { id: 'slot-7', index: 7, filled: true, letter: 'A' },
    ]);

    const [isComplete, setIsComplete] = useState(false);
    const [showDataShard, setShowDataShard] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Reset game state when opened
            setSlots([
                { id: 'slot-0', index: 0, filled: true, letter: 'T' },
                { id: 'slot-1', index: 1, filled: false, letter: null, expected: 'G' },
                { id: 'slot-2', index: 2, filled: false, letter: null, expected: 'A' },
                { id: 'slot-3', index: 3, filled: true, letter: 'C' },
                { id: 'slot-4', index: 4, filled: false, letter: null, expected: 'G' },
                { id: 'slot-5', index: 5, filled: true, letter: 'T' },
                { id: 'slot-6', index: 6, filled: false, letter: null, expected: 'T' },
                { id: 'slot-7', index: 7, filled: true, letter: 'A' },
            ]);
            setIsComplete(false);
            setShowDataShard(false);
        }
    }, [isOpen]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active) {
            const draggedLetter = active.data.current.letter;
            const expectedLetter = over.data.current.expected;
            const slotId = over.id;

            if (draggedLetter === expectedLetter) {
                // Correct match!
                setSlots(prev => prev.map(slot => 
                    slot.id === slotId ? { ...slot, filled: true, letter: draggedLetter } : slot
                ));
            } else {
                // Incorrect match - could add shake animation or error sound here
                console.log("Terminal Error: Base mismatch.");
            }
        }
    };

    // Check for completion
    useEffect(() => {
        if (slots.every(slot => slot.filled)) {
            setIsComplete(true);
            setTimeout(() => {
                setShowDataShard(true);
            }, 1500); // Wait 1.5s then show shard
        }
    }, [slots]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md transition-opacity">
            
            {/* The Main Terminal Container */}
            <div className={`w-full max-w-4xl h-[90vh] sm:h-[80vh] bg-black border-4 overflow-hidden relative flex flex-col transition-all duration-1000 ${isComplete ? 'border-primary shadow-[0_0_30px_#0df233]' : 'border-red-900 shadow-[0_0_15px_#7f1d1d]'}`}>
                
                {/* CRT Scanline Overlay applied to the whole terminal */}
                <div className="scanlines"></div>

                {/* --- HEADER --- */}
                <div className="p-4 border-b-2 border-slate-800 flex justify-between items-center bg-slate-950 z-10 relative">
                    <div className="font-mono text-sm sm:text-lg text-emerald-500 flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-500">terminal</span>
                        <span>{isComplete ? 'SISTEMA RESTAURADO' : 'ERROR: DATOS GENÓMICOS CORRUPTOS'}</span>
                        {!isComplete && <span className="animate-pulse">_</span>}
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-red-500 transition-colors z-50 relative pointer-events-auto">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* --- GAME VIEW (Terminal) --- */}
                {!showDataShard && (
                    <div className="flex-1 p-6 flex flex-col items-center justify-center font-mono relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-xl sm:text-2xl text-emerald-500 mb-2">SECUENCIADOR DE HEBRA REGIONAL</h2>
                            <p className="text-sm text-emerald-700 max-w-lg mx-auto">
                                Instrucciones: Se ha detectado corrupción en la secuencia de Prunus avium. Arrastra las bases nitrogenadas complementarias (A-T, C-G) para reparar la doble hélice.
                            </p>
                        </div>

                        <DndContext onDragEnd={handleDragEnd}>
                            {/* DNA Sequence Display */}
                            <div className="flex flex-col gap-4 mb-16 px-4 py-8 bg-slate-950/50 border border-slate-800 rounded-lg shadow-inner">
                                
                                {/* Top Strand (Reference) */}
                                <div className="flex gap-2 sm:gap-4 justify-center items-center">
                                    <span className="text-emerald-700 mr-2 text-sm sm:text-base hidden sm:inline">5'</span>
                                    {targetTop.map((letter, i) => (
                                        <div key={`top-${i}`} className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 font-bold text-xl md:text-3xl bg-slate-900 ${colors[letter]}`}>
                                            {letter}
                                        </div>
                                    ))}
                                    <span className="text-emerald-700 ml-2 text-sm sm:text-base hidden sm:inline">3'</span>
                                </div>

                                {/* Connecting Hydrogen Bonds Visual */}
                                <div className="flex gap-2 sm:gap-4 justify-center items-center">
                                    <span className="w-4 mr-2 hidden sm:inline"></span>
                                    {slots.map((slot, i) => (
                                        <div key={`bond-${i}`} className="w-12 md:w-16 flex justify-center flex-col items-center opacity-50 space-y-1">
                                            <div className="w-1 h-1 rounded-full bg-emerald-700"></div>
                                            <div className="w-1 h-1 rounded-full bg-emerald-700"></div>
                                        </div>
                                    ))}
                                    <span className="w-4 ml-2 hidden sm:inline"></span>
                                </div>

                                {/* Bottom Strand (Droppable) */}
                                <div className="flex gap-2 sm:gap-4 justify-center items-center">
                                    <span className="text-emerald-700 mr-2 text-sm sm:text-base hidden sm:inline">3'</span>
                                    {slots.map((slot) => (
                                        <DroppableSlot 
                                            key={slot.id} 
                                            id={slot.id} 
                                            expected={slot.expected} 
                                            isFilled={slot.filled} 
                                            filledLetter={slot.letter} 
                                        />
                                    ))}
                                    <span className="text-emerald-700 ml-2 text-sm sm:text-base hidden sm:inline">5'</span>
                                </div>
                            </div>

                            {/* Draggable Supply (Nitrogenous Bases) */}
                            <div className={`flex gap-6 sm:gap-8 justify-center p-6 border-t-2 border-dashed border-emerald-900 w-full transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
                                <DraggableBase id="drag-A" letter="A" colorClass={colors['A']} />
                                <DraggableBase id="drag-T" letter="T" colorClass={colors['T']} />
                                <DraggableBase id="drag-C" letter="C" colorClass={colors['C']} />
                                <DraggableBase id="drag-G" letter="G" colorClass={colors['G']} />
                            </div>
                        </DndContext>

                        {/* Completion Message Overlay within Terminal */}
                        {isComplete && (
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center text-center animate-pulse z-20">
                                <span className="material-symbols-outlined text-6xl text-primary mb-4">lock_open</span>
                                <h2 className="text-4xl text-primary font-bold mb-2 glitch-text" data-text="ACCESO CONCEDIDO">ACCESO CONCEDIDO</h2>
                                <p className="text-white text-lg font-mono">Desencriptando Data-Shard...</p>
                            </div>
                        )}
                    </div>
                )}

                {/* --- DATA-SHARD REWARD VIEW --- */}
                {showDataShard && (
                    <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center relative z-20 bg-gradient-to-br from-slate-900 to-slate-950">
                        {/* Futuristic Holographic Card */}
                        <div className="w-full max-w-2xl bg-white/5 border border-primary/40 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_50px_rgba(13,242,51,0.2)] animate-[popIn_0.5s_ease-out_forwards] relative overflow-hidden">
                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/20 rounded-lg text-primary">
                                    <span className="material-symbols-outlined text-4xl">fingerprint</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono text-primary uppercase tracking-widest">Data-Shard Desbloqueado</h3>
                                    <h2 className="text-3xl font-bold text-white">Genoma: Cerezo (Prunus avium)</h2>
                                </div>
                            </div>
                            
                            <div className="space-y-4 text-slate-300">
                                <p>
                                    <strong className="text-white">Región de O'Higgins:</strong> Esta secuencia pertenece a una de las variedades de cerezo más importantes para la economía regional y nacional.
                                </p>
                                <p>
                                    <strong className="text-white">Importancia Agronómica:</strong> El análisis de este genotipo (junto con su portainjerto) ayuda a los investigadores del CEAF a desarrollar nuevas variedades que necesiten menos horas de frío invernal y que resistan mejor el estrés hídrico de la sequía y las olas de calor.
                                </p>
                                <p>
                                    <strong className="text-white">Siguiente Nivel:</strong> Su mapeo genético nos permite, mediante marcadores moleculares, seleccionar con precisión qué nuevos cruces tendrán la mejor calidad de fruta exportable para la siguiente temporada.
                                </p>
                            </div>

                            <button 
                                onClick={onClose}
                                className="mt-8 w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-primary transition-colors hover:shadow-[0_0_20px_#0df233]"
                            >
                                Volver al Portal de Analista
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
