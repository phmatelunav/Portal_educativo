import React from 'react';

export default function BotanicTreeSVG({ stage }) {
    // stage 1: Roots
    // stage 2: Roots + Trunk/Branches
    // stage 3: Roots + Trunk/Branches + Leaves/Fruits

    return (
        <div className="w-full h-80 sm:h-96 bg-slate-900 rounded-xl overflow-hidden relative border border-secondary/30 bento-shadow flex items-center justify-center p-4">
            
            {/* Ambient Background Glow (Orange/Green) */}
            <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-colors duration-1000 ${stage === 3 ? 'from-primary/20 via-secondary/10' : 'from-secondary/20'} to-transparent`}></div>
            
            {/* Soil Line */}
            <div className="absolute top-[65%] left-0 w-full h-[1px] bg-slate-700/50 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>

            <svg 
                viewBox="0 0 800 600" 
                className="w-full h-full relative z-10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="rootGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.8" /> {/* secondary */}
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" /> {/* orange-500 */}
                    </linearGradient>

                    <linearGradient id="trunkGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#ff6b00" /> {/* secondary base */}
                        <stop offset="50%" stopColor="#0df233" stopOpacity="0.7" /> {/* transitioning to primary */}
                        <stop offset="100%" stopColor="#22c55e" /> {/* green top */}
                    </linearGradient>

                    <linearGradient id="nutrientGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#0df233" stopOpacity="0"/>
                        <stop offset="50%" stopColor="#0df233" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#0df233" stopOpacity="0"/>
                    </linearGradient>
                    
                    <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    
                    <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    
                    <filter id="glow-strong-red" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* =========================================
                    STAGE 1: ROOTS (Always visible)
                    ========================================= */}
                <g stroke="url(#rootGradient)" strokeLinecap="round" fill="none" filter="url(#glow-orange)" className={`transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Main Taproot */}
                    <path d="M400,390 Q 410,480 395,580" strokeWidth="12" className="animate-[draw_1.5s_ease-out_forwards]" strokeDasharray="300" strokeDashoffset="300" />
                    
                    {/* Lateral Roots */}
                    <path d="M400,430 Q 480,470 550,560" strokeWidth="8" className="animate-[draw_2s_ease-out_0.5s_forwards]" strokeDasharray="250" strokeDashoffset="250" />
                    <path d="M400,460 Q 320,500 250,590" strokeWidth="8" className="animate-[draw_2s_ease-out_0.7s_forwards]" strokeDasharray="250" strokeDashoffset="250" />
                    
                    {/* Fine Roots */}
                    <path d="M460,470 Q 520,490 580,520" strokeWidth="4" className="animate-[draw_1.5s_ease-out_1s_forwards]" strokeDasharray="150" strokeDashoffset="150" />
                    <path d="M340,490 Q 280,510 220,540" strokeWidth="4" className="animate-[draw_1.5s_ease-out_1.2s_forwards]" strokeDasharray="150" strokeDashoffset="150" />
                    <path d="M420,520 Q 460,550 480,590" strokeWidth="3" className="animate-[draw_1s_ease-out_1.5s_forwards]" strokeDasharray="100" strokeDashoffset="100" />
                    <path d="M370,550 Q 340,570 320,590" strokeWidth="3" className="animate-[draw_1s_ease-out_1.6s_forwards]" strokeDasharray="100" strokeDashoffset="100" />
                </g>

                {/* Pulsing Nutrient Absorption Nodes (Stage 1+) */}
                <g fill="#0df233" filter="url(#glow-orange)" className={`transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <circle cx="550" cy="560" r="5" className="animate-[pulse_1.5s_ease-in-out_infinite_1.5s]" opacity="0" />
                    <circle cx="250" cy="590" r="6" className="animate-[pulse_2s_ease-in-out_infinite_2s]" opacity="0" />
                    <circle cx="580" cy="520" r="4" className="animate-[pulse_1.8s_ease-in-out_infinite_2.2s]" opacity="0" />
                    <circle cx="220" cy="540" r="5" className="animate-[pulse_1.4s_ease-in-out_infinite_2.5s]" opacity="0" />
                </g>


                {/* =========================================
                    STAGE 2: TRUNK & XYLEM FLOW
                    ========================================= */}
                <g stroke="url(#trunkGradient)" strokeLinecap="round" fill="none" filter="url(#glow-green)" className={`transition-opacity duration-1000 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Trunk */}
                    <path d="M400,390 Q 390,250 400,100" strokeWidth="18" className={`${stage >= 2 ? 'animate-[draw_2s_ease-out_forwards]' : ''}`} strokeDasharray="350" strokeDashoffset="350" />
                    
                    {/* Primary Branches */}
                    <path d="M400,250 Q 480,180 550,80" strokeWidth="12" className={`${stage >= 2 ? 'animate-[draw_2s_ease-out_0.5s_forwards]' : ''}`} strokeDasharray="250" strokeDashoffset="250" />
                    <path d="M395,200 Q 300,150 220,100" strokeWidth="12" className={`${stage >= 2 ? 'animate-[draw_2s_ease-out_0.8s_forwards]' : ''}`} strokeDasharray="250" strokeDashoffset="250" />
                    
                    {/* Secondary Branches */}
                    <path d="M460,200 Q 550,150 620,120" strokeWidth="8" className={`${stage >= 2 ? 'animate-[draw_1.5s_ease-out_1.2s_forwards]' : ''}`} strokeDasharray="200" strokeDashoffset="200" />
                    <path d="M340,170 Q 250,130 180,150" strokeWidth="8" className={`${stage >= 2 ? 'animate-[draw_1.5s_ease-out_1.5s_forwards]' : ''}`} strokeDasharray="200" strokeDashoffset="200" />
                    <path d="M410,140 Q 460,80 500,40" strokeWidth="6" className={`${stage >= 2 ? 'animate-[draw_1.5s_ease-out_1.8s_forwards]' : ''}`} strokeDasharray="150" strokeDashoffset="150" />
                    <path d="M380,120 Q 330,60 280,30" strokeWidth="6" className={`${stage >= 2 ? 'animate-[draw_1.5s_ease-out_2s_forwards]' : ''}`} strokeDasharray="150" strokeDashoffset="150" />
                </g>

                {/* Animated Xylem Flow (Upward Nutrients) */}
                {stage >= 2 && (
                    <g stroke="url(#nutrientGradient)" strokeWidth="4" fill="none" strokeDasharray="10 30" className="animate-[flowUp_3s_linear_infinite]">
                        <path d="M400,390 Q 390,250 400,100" />
                        <path d="M400,250 Q 480,180 550,80" />
                        <path d="M395,200 Q 300,150 220,100" />
                    </g>
                )}


                {/* =========================================
                    STAGE 3: LEAVES & CHERRIES
                    ========================================= */}
                <g className={`transition-opacity duration-1500 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Leaves / Canopy (Stylized as geometric circles/clusters) */}
                    <g fill="#22c55e" opacity="0.4" filter="url(#glow-green)">
                        <circle cx="400" cy="100" r="80" className={`${stage >= 3 ? 'animate-[popIn_1s_ease-out_forwards]' : ''} scale-0 origin-center`} />
                        <circle cx="550" cy="80" r="70" className={`${stage >= 3 ? 'animate-[popIn_1s_ease-out_0.3s_forwards]' : ''} scale-0 origin-center`} />
                        <circle cx="220" cy="100" r="75" className={`${stage >= 3 ? 'animate-[popIn_1s_ease-out_0.6s_forwards]' : ''} scale-0 origin-center`} />
                        <circle cx="620" cy="120" r="50" className={`${stage >= 3 ? 'animate-[popIn_1s_ease-out_0.9s_forwards]' : ''} scale-0 origin-center`} />
                        <circle cx="180" cy="150" r="55" className={`${stage >= 3 ? 'animate-[popIn_1s_ease-out_1.2s_forwards]' : ''} scale-0 origin-center`} />
                        <circle cx="500" cy="40" r="60" className={`${stage >= 3 ? 'animate-[popIn_1s_ease-out_1.5s_forwards]' : ''} scale-0 origin-center`} />
                        <circle cx="280" cy="30" r="65" className={`${stage >= 3 ? 'animate-[popIn_1s_ease-out_1.8s_forwards]' : ''} scale-0 origin-center`} />
                    </g>

                    {/* Cherries (Vibrant Red) */}
                    <g fill="#ef4444" filter="url(#glow-strong-red)">
                        {/* Center Cluster */}
                        <circle cx="380" cy="120" r="12" className={`${stage >= 3 ? 'animate-[dangle_3s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '2.5s', fillMode: 'forwards' }}/>
                        <circle cx="420" cy="130" r="10" className={`${stage >= 3 ? 'animate-[dangle_2.5s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '2.7s', fillMode: 'forwards' }}/>
                        
                        {/* Right Cluster */}
                        <circle cx="540" cy="100" r="11" className={`${stage >= 3 ? 'animate-[dangle_3.2s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '3s', fillMode: 'forwards' }}/>
                        <circle cx="580" cy="110" r="9" className={`${stage >= 3 ? 'animate-[dangle_2.8s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '3.2s', fillMode: 'forwards' }}/>
                        <circle cx="620" cy="140" r="10" className={`${stage >= 3 ? 'animate-[dangle_2.6s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '3.5s', fillMode: 'forwards' }}/>
                        
                        {/* Left Cluster */}
                        <circle cx="210" cy="120" r="13" className={`${stage >= 3 ? 'animate-[dangle_2.9s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '3.3s', fillMode: 'forwards' }}/>
                        <circle cx="250" cy="90" r="9" className={`${stage >= 3 ? 'animate-[dangle_3.1s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '3.6s', fillMode: 'forwards' }}/>
                        <circle cx="160" cy="160" r="11" className={`${stage >= 3 ? 'animate-[dangle_2.7s_ease-in-out_infinite_alternate]' : ''} scale-0 origin-top`} style={{ animationDelay: '3.9s', fillMode: 'forwards' }}/>
                    </g>
                    
                    {/* Cherry Stems */}
                    <g stroke="#22c55e" strokeWidth="2" fill="none">
                        <path d="M400,100 Q 390,110 380,120" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_2.5s_forwards]' : 'opacity-0'}`} strokeDasharray="30" strokeDashoffset="30"/>
                        <path d="M400,100 Q 410,120 420,130" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_2.7s_forwards]' : 'opacity-0'}`} strokeDasharray="30" strokeDashoffset="30"/>
                        <path d="M550,80 Q 545,90 540,100" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_3s_forwards]' : 'opacity-0'}`} strokeDasharray="30" strokeDashoffset="30"/>
                        <path d="M550,80 Q 565,100 580,110" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_3.2s_forwards]' : 'opacity-0'}`} strokeDasharray="40" strokeDashoffset="40"/>
                        <path d="M620,120 Q 615,130 620,140" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_3.5s_forwards]' : 'opacity-0'}`} strokeDasharray="20" strokeDashoffset="20"/>
                        <path d="M220,100 Q 215,110 210,120" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_3.3s_forwards]' : 'opacity-0'}`} strokeDasharray="30" strokeDashoffset="30"/>
                        <path d="M220,100 Q 235,95 250,90" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_3.6s_forwards]' : 'opacity-0'}`} strokeDasharray="30" strokeDashoffset="30"/>
                        <path d="M180,150 Q 170,155 160,160" className={`${stage >= 3 ? 'animate-[draw_0.5s_ease-out_3.9s_forwards]' : 'opacity-0'}`} strokeDasharray="30" strokeDashoffset="30"/>
                    </g>
                </g>
                
            </svg>
            
            <style>
                {`
                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes flowUp {
                    from { stroke-dashoffset: 40; }
                    to { stroke-dashoffset: 0; }
                }
                @keyframes popIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 0.4; fill-opacity: 1; }
                }
                @keyframes dangle {
                    0% { transform: rotate(-5deg); }
                    100% { transform: rotate(5deg); }
                }
                `}
            </style>
        </div>
    );
}
