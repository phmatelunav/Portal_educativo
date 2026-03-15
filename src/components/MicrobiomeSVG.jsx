import React from 'react';

export default function MicrobiomeSVG() {
    return (
        <div className="w-full h-48 sm:h-64 bg-slate-900 rounded-xl overflow-hidden relative border border-accent/30 bento-shadow flex items-center justify-center p-4">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none"></div>
            
            <svg 
                viewBox="0 0 800 400" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="rootGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" /> {/* green-500 */}
                        <stop offset="100%" stopColor="#0df233" stopOpacity="0.8" /> {/* primary */}
                    </linearGradient>

                    <linearGradient id="hyphaeGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#bf00ff" stopOpacity="0.4" /> {/* accent */}
                        <stop offset="100%" stopColor="#bf00ff" />
                    </linearGradient>
                    
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    
                    <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="15" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* --- Fungal Hyphae (Mycorrhizae) - Animated Growth --- */}
                <g stroke="url(#hyphaeGradient)" strokeWidth="3" fill="none" opacity="0.8" className="animate-[dash_6s_linear_infinite]" strokeDasharray="20 40">
                    <path d="M400,100 C 450,150 500,180 550,250 C 600,320 650,300 700,380" filter="url(#glow)"/>
                    <path d="M400,100 C 350,150 250,120 200,200 C 150,280 180,350 100,380" filter="url(#glow)"/>
                    <path d="M380,200 C 420,280 480,290 520,380" strokeWidth="2" strokeDasharray="15 30"/>
                    <path d="M420,180 C 380,250 320,270 280,380" strokeWidth="2" strokeDasharray="10 20"/>
                    <path d="M550,250 C 580,220 650,260 750,200" strokeWidth="1.5" />
                    <path d="M200,200 C 150,180 80,220 50,150" strokeWidth="1.5" />
                </g>

                {/* --- Main Plant Roots --- */}
                <g stroke="url(#rootGradient)" strokeWidth="8" strokeLinecap="round" fill="none" filter="url(#glow)">
                    {/* Primary Taproot */}
                    <path d="M400,10 Q 410,80 395,150 T 405,280 T 390,380" />
                    
                    {/* Lateral Roots Right */}
                    <path d="M395,150 Q 460,180 500,250" strokeWidth="6" />
                    <path d="M400,220 Q 480,260 520,350" strokeWidth="5" />
                    <path d="M405,280 Q 440,310 460,380" strokeWidth="4" />
                    
                    {/* Lateral Roots Left */}
                    <path d="M400,120 Q 320,160 280,230" strokeWidth="6" />
                    <path d="M395,200 Q 340,240 310,320" strokeWidth="5" />
                    <path d="M390,300 Q 360,330 340,380" strokeWidth="4" />
                </g>

                {/* --- Beneficial Bacteria (Nodes) - Pulsing --- */}
                <g fill="#0df233" filter="url(#glow-strong)">
                    <circle cx="500" cy="250" r="8" className="animate-[pulse_2s_ease-in-out_infinite]" />
                    <circle cx="280" cy="230" r="10" className="animate-[pulse_3s_ease-in-out_infinite]" />
                    <circle cx="520" cy="350" r="6" className="animate-[pulse_2.5s_ease-in-out_infinite]" />
                    <circle cx="310" cy="320" r="7" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
                    <circle cx="405" cy="280" r="12" className="animate-[pulse_4s_ease-in-out_infinite]" fill="#bf00ff" /> {/* Fungal Hub */}
                    <circle cx="395" cy="150" r="9" className="animate-[pulse_3s_ease-in-out_infinite]" fill="#ff6b00" /> {/* Energy Transfer */}
                    <circle cx="700" cy="380" r="5" className="animate-[pulse_2s_ease-in-out_infinite]" fill="#bf00ff" />
                    <circle cx="100" cy="380" r="5" className="animate-[pulse_2.5s_ease-in-out_infinite]" fill="#bf00ff" />
                </g>
                
                {/* Information Overlays */}
                <g fill="rgba(255,255,255,0.7)" fontFamily="'Space Grotesk', sans-serif" fontSize="14" letterSpacing="1">
                    <text x="530" y="240">Rhizobium sp. (Bacteria)</text>
                    <circle cx="515" cy="236" r="3" fill="rgba(255,255,255,0.5)" />
                    
                    <text x="560" y="290">Red Micorrízica (Hongos)</text>
                    <path d="M545,286 L525,286 L510,325" fill="none" stroke="rgba(255,255,255,0.3)" />
                    
                    <text x="140" y="220" textAnchor="end">Raíz Sensible</text>
                    <line x1="150" y1="216" x2="260" y2="216" stroke="rgba(255,255,255,0.3)" />
                </g>
            </svg>
            
            {/* Added CSS for SVG specifically inside style block for simplicity without cluttering index.css */}
            <style>
                {`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
                `}
            </style>
        </div>
    );
}
