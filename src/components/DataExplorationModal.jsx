import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import MicrobiomeSVG from './MicrobiomeSVG';

// Datos simulados (Número promedio de frutos por planta)
const geneticaData = {
  normal: [
    { name: 'Semana 1', Tolerante: 5, Sensible: 5 },
    { name: 'Semana 2', Tolerante: 12, Sensible: 14 },
    { name: 'Semana 3', Tolerante: 25, Sensible: 28 },
    { name: 'Semana 4', Tolerante: 40, Sensible: 45 },
  ],
  sequia: [
    { name: 'Semana 1', Tolerante: 5, Sensible: 5 },
    { name: 'Semana 2', Tolerante: 10, Sensible: 8 },
    { name: 'Semana 3', Tolerante: 20, Sensible: 12 },
    { name: 'Semana 4', Tolerante: 35, Sensible: 15 },
  ],
  calor: [
    { name: 'Semana 1', Tolerante: 5, Sensible: 5 },
    { name: 'Semana 2', Tolerante: 11, Sensible: 6 },
    { name: 'Semana 3', Tolerante: 22, Sensible: 8 },
    { name: 'Semana 4', Tolerante: 32, Sensible: 10 },
  ],
};

const microbiomaData = {
  normal: [
    { name: 'Semana 1', 'Sensible Sola': 5, 'Sensible + Microbios': 6 },
    { name: 'Semana 2', 'Sensible Sola': 14, 'Sensible + Microbios': 18 },
    { name: 'Semana 3', 'Sensible Sola': 28, 'Sensible + Microbios': 35 },
    { name: 'Semana 4', 'Sensible Sola': 45, 'Sensible + Microbios': 52 },
  ],
  sequia: [
    { name: 'Semana 1', 'Sensible Sola': 5, 'Sensible + Microbios': 5 },
    { name: 'Semana 2', 'Sensible Sola': 8, 'Sensible + Microbios': 12 },
    { name: 'Semana 3', 'Sensible Sola': 12, 'Sensible + Microbios': 24 },
    { name: 'Semana 4', 'Sensible Sola': 15, 'Sensible + Microbios': 34 },
  ],
  calor: [
    { name: 'Semana 1', 'Sensible Sola': 5, 'Sensible + Microbios': 6 },
    { name: 'Semana 2', 'Sensible Sola': 6, 'Sensible + Microbios': 14 },
    { name: 'Semana 3', 'Sensible Sola': 8, 'Sensible + Microbios': 25 },
    { name: 'Semana 4', 'Sensible Sola': 10, 'Sensible + Microbios': 35 },
  ],
};

export default function DataExplorationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('genetica'); // 'genetica' | 'microbioma'
  const [condition, setCondition] = useState('normal');

  if (!isOpen) return null;

  const currentData = activeTab === 'genetica' ? geneticaData[condition] : microbiomaData[condition];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-900 border-2 border-accent/30 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bento-shadow-purple flex flex-col max-h-[95vh]">
        
        {/* Header and Tabs */}
        <div className="flex flex-col border-b border-accent/20 bg-accent/5">
            <div className="flex justify-between items-center p-6 pb-2">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent text-3xl">data_exploration</span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Análisis Científico del Rendimiento</h2>
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-accent transition-colors">
                    <span className="material-symbols-outlined text-3xl">close</span>
                </button>
            </div>
            
            {/* Tabs */}
            <div className="flex px-6 mt-4 gap-4">
                <button 
                    onClick={() => setActiveTab('genetica')}
                    className={`pb-2 font-bold px-4 border-b-2 transition-colors ${activeTab === 'genetica' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    Genética Intrínseca
                </button>
                <button 
                    onClick={() => setActiveTab('microbioma')}
                    className={`pb-2 font-bold px-4 border-b-2 transition-colors ${activeTab === 'microbioma' ? 'border-accent text-accent' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    Simbiosis Microbiana
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6 pt-4 overflow-y-auto flex-1">
          
          {/* Section Introduction */}
          <div className="mb-6">
            {activeTab === 'genetica' ? (
                <p className="text-slate-600 dark:text-slate-400">
                    Observa cómo interactúa la genética vegetal con los estreses abióticos. Selecciona una condición ambiental para simular su efecto en el rendimiento (número de frutos) de dos variedades de estudio.
                </p>
            ) : (
                <p className="text-slate-600 dark:text-slate-400">
                    Descubre cómo los microorganismos benéficos del suelo (hongos y bacterias) pueden salvar cultivos. Compara una variedad sensible contra la misma variedad pero inoculada con el **Microbioma CEAF**.
                </p>
            )}
          </div>

          {/* Optional SVG Animation Header for Microbiome Tab */}
          {activeTab === 'microbioma' && (
              <div className="mb-8">
                  <MicrobiomeSVG />
              </div>
          )}

          {/* Controles ambientales */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button 
              onClick={() => setCondition('normal')}
              className={`px-6 py-2 rounded-xl font-bold transition-all border-2 ${condition === 'normal' ? 'bg-primary text-background-dark border-primary' : 'bg-transparent text-slate-500 border-slate-700 hover:border-primary/50'}`}
            >
              Condiciones Normales
            </button>
            <button 
              onClick={() => setCondition('sequia')}
              className={`px-6 py-2 rounded-xl font-bold transition-all border-2 flex items-center gap-2 ${condition === 'sequia' ? 'bg-secondary text-white border-secondary bento-shadow-orange' : 'bg-transparent text-slate-500 border-slate-700 hover:border-secondary/50'}`}
            >
              <span className="material-symbols-outlined text-sm">water_drop</span> Estrés Hídrico (Sequía)
            </button>
            <button 
              onClick={() => setCondition('calor')}
              className={`px-6 py-2 rounded-xl font-bold transition-all border-2 flex items-center gap-2 ${condition === 'calor' ? 'bg-red-500 text-white border-red-500 hover:shadow-[8px_8px_0px_0px_rgba(239,68,68,0.2)]' : 'bg-transparent text-slate-500 border-slate-700 hover:border-red-500/50'}`}
            >
              <span className="material-symbols-outlined text-sm">local_fire_department</span> Ola de Calor
            </button>
          </div>

          {/* Gráfico */}
          <div className="h-80 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#bf00ff', borderRadius: '0.5rem', color: '#f8fafc' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                
                {/* Dynamically render bars based on active tab */}
                {activeTab === 'genetica' ? (
                    <>
                        <Bar dataKey="Tolerante" name="Variedad CEAF-Tolerante" fill="#0df233" radius={[4, 4, 0, 0]} animationDuration={1000} />
                        <Bar dataKey="Sensible" name="Variedad Sensible Comercial" fill="#ff6b00" radius={[4, 4, 0, 0]} animationDuration={1000} />
                    </>
                ) : (
                    <>
                        <Bar dataKey="Sensible Sola" name="Variedad Sensible Comercial" fill="#ff6b00" opacity={0.6} radius={[4, 4, 0, 0]} animationDuration={1000} />
                        <Bar dataKey="Sensible + Microbios" name="Sensible inoculada (Red CEAF)" fill="#bf00ff" radius={[4, 4, 0, 0]} animationDuration={1000} />
                    </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conclusión dinámica */}
          <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
            <h4 className="font-bold text-accent flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined">biotech</span> Análisis del Sistema
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {activeTab === 'genetica' && condition === 'normal' && "En condiciones ideales, la variedad comercial sensible tiene un crecimiento ligeramente más agresivo, priorizando la producción rápida de frutos sobre la resistencia estructural."}
              {activeTab === 'genetica' && condition === 'sequia' && "Bajo déficit hídrico, la variedad sensible aborta sus frutos para sobrevivir. La genética CEAF activa mecanismos de retención de agua, asegurando la cosecha."}
              {activeTab === 'genetica' && condition === 'calor' && "El estrés térmico detiene la fotosíntesis en la planta sensible. La variedad CEAF-Tolerante utiliza proteínas de choque térmico para mantener la producción de frutos."}

              {activeTab === 'microbioma' && condition === 'normal' && "Los hongos micorrízicos expenden el área de absorción de raíces. Incluso en condiciones normales, la planta inoculada obtiene más nutrientes y fósforo del suelo, ganando un ligero margen productivo."}
              {activeTab === 'microbioma' && condition === 'sequia' && "¡Impacto crítico! Las hifas fúngicas actúan como acueductos microscópicos conectando zonas húmedas lejanas hasta la raíz, permitiendo a la planta frágil rendir como si fuera genéticamente tolerante."}
              {activeTab === 'microbioma' && condition === 'calor' && "Bacterias promotoras del crecimiento (PGPR) mitigan el estrés formando biofilms protectores y sintetizando fito-hormonas. La planta inoculada logra mantener la retención floral frente a picos térmicos."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
