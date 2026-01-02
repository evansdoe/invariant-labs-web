"use client";

import React, { useState } from 'react';
import { 
  LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area 
} from 'recharts';
import { ArrowLeft, Activity, Brain, GraduationCap, Box, Layers } from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA GENERATORS ---

// 1. SYMLOGIX (Semantic Manifolds)
const textData = [
  { index: 0, original: 0, rephrased: 0, anomaly: 0 },
  { index: 1, original: 0.1, rephrased: 0.15, anomaly: 0.2 },
  { index: 2, original: 0.3, rephrased: 0.35, anomaly: 0.6 },
  { index: 3, original: 0.65, rephrased: 0.7, anomaly: 1.1 },
  { index: 4, original: 1.0, rephrased: 1.1, anomaly: 1.5 },
  { index: 5, original: 1.4, rephrased: 1.5, anomaly: 1.85 },
  { index: 6, original: 1.7, rephrased: 1.85, anomaly: 1.95 },
  { index: 7, original: 1.9, rephrased: 2.0, anomaly: 0.0 },
  { index: 8, original: 2.0, rephrased: 0.0, anomaly: 0.0 },
];

// 2. VISION & SIGNAL (Lidar/Point Cloud & Vibration)
// A. Vibration (1D)
const signalData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  normal: Math.sin(i * 0.2) + Math.random() * 0.1,
  defect: Math.sin(i * 0.2) + (i > 30 ? Math.random() * 1.5 : Math.random() * 0.1) // Defect appears late
}));

// B. Vision (2D Slice of 3D Point Cloud)
const cloudData = Array.from({ length: 100 }, (_, i) => ({
  x: (i % 20) * 5 + Math.random() * 5, // Noisy Grid
  y: Math.floor(i / 20) * 10 + (i > 45 && i < 55 ? 15 : 0) + Math.random() * 2, // A "bump" (defect) in the middle
  z: Math.random()
}));

// 3. EDUCATION (Fourier Intuition)
// Showing a signal in Time vs Frequency
const educationTimeData = Array.from({ length: 40 }, (_, i) => ({
  x: i,
  y: Math.sin(i * 0.5) + Math.sin(i * 2) 
}));
const educationFreqData = [
  { x: '0Hz', y: 0 }, { x: '10Hz', y: 0 }, { x: '20Hz', y: 50 }, { x: '30Hz', y: 0 },
  { x: '40Hz', y: 0 }, { x: '50Hz', y: 0 }, { x: '60Hz', y: 0 }, { x: '80Hz', y: 30 }, { x: '90Hz', y: 0 }
];


export default function Demo() {
  const [activeTab, setActiveTab] = useState<'vision' | 'symlogix' | 'education'>('vision');
  const [subTab, setSubTab] = useState<'signal' | 'lidar'>('signal');
  const [eduView, setEduView] = useState<'time' | 'freq'>('time');

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-24 font-mono selection:bg-blue-500 selection:text-white">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Lab</span>
        </Link>
        <div className="flex gap-4 text-xs">
           <div className="border border-green-900 bg-green-900/20 text-green-400 px-3 py-1 rounded-full animate-pulse">
            SYSTEM ONLINE
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* --- LEFT: CONTROL PANEL --- */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4 text-white">
              Invariant<br/>Workbench.
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Select a service module to visualize its underlying physics engine.
            </p>
          </div>

          <div className="space-y-3">
            {/* Service 1: Vision & Signal */}
            <button 
              onClick={() => setActiveTab('vision')}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group ${activeTab === 'vision' ? 'bg-neutral-900 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-neutral-800 text-neutral-500 hover:bg-neutral-900/50'}`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'vision' ? 'bg-blue-500/20 text-blue-400' : 'bg-neutral-800 text-neutral-400'}`}>
                <Activity size={20} />
              </div>
              <div>
                <div className="font-bold text-sm">Vision & Signal</div>
                <div className="text-[10px] opacity-70">Euclidean Data (1D/3D)</div>
              </div>
            </button>

            {/* Service 2: SymLogix */}
            <button 
              onClick={() => setActiveTab('symlogix')}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group ${activeTab === 'symlogix' ? 'bg-neutral-900 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-neutral-800 text-neutral-500 hover:bg-neutral-900/50'}`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'symlogix' ? 'bg-purple-500/20 text-purple-400' : 'bg-neutral-800 text-neutral-400'}`}>
                <Brain size={20} />
              </div>
              <div>
                <div className="font-bold text-sm">SymLogix™</div>
                <div className="text-[10px] opacity-70">Semantic Manifolds</div>
              </div>
            </button>

            {/* Service 3: Education */}
            <button 
              onClick={() => setActiveTab('education')}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group ${activeTab === 'education' ? 'bg-neutral-900 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-neutral-800 text-neutral-500 hover:bg-neutral-900/50'}`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'education' ? 'bg-green-500/20 text-green-400' : 'bg-neutral-800 text-neutral-400'}`}>
                <GraduationCap size={20} />
              </div>
              <div>
                <div className="font-bold text-sm">Education</div>
                <div className="text-[10px] opacity-70">Interactive Concepts</div>
              </div>
            </button>
          </div>

          {/* Context Box */}
          <div className="p-5 bg-neutral-900/30 border border-neutral-800 rounded-xl text-xs text-neutral-400 leading-relaxed">
            <strong className="text-white block mb-2">Technical Insight:</strong>
            {activeTab === 'vision' && "Standard CNNs struggle with 'Permutation Invariance' in Point Clouds. Our Geometric Scattering approach treats points as a manifold, not pixels."}
            {activeTab === 'symlogix' && "LLMs hallucinate because they predict the next token. We calculate the Laplacian Spectrum of the semantic graph. It's deterministic algebra."}
            {activeTab === 'education' && "We don't just teach Python. We teach your engineers how to visualize High-Dimensional Geometry and Signal Theory intuitively."}
          </div>
        </div>

        {/* --- RIGHT: VISUALIZATION PANEL --- */}
        <div className="lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden flex flex-col">
          
          {/* Module Header */}
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                {activeTab === 'vision' && <><Layers size={18} className="text-blue-500"/> Signal Geometry</>}
                {activeTab === 'symlogix' && <><Brain size={18} className="text-purple-500"/> Semantic Spectrum</>}
                {activeTab === 'education' && <><Box size={18} className="text-green-500"/> Concept Lab</>}
              </h2>
              <p className="text-xs text-neutral-500">Real-time inference simulation</p>
            </div>
            
            {/* Sub-toggles for Vision/Education */}
            {activeTab === 'vision' && (
               <div className="flex bg-neutral-900 p-1 rounded-lg">
                 <button onClick={() => setSubTab('signal')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${subTab === 'signal' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500'}`}>Vibration (1D)</button>
                 <button onClick={() => setSubTab('lidar')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${subTab === 'lidar' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500'}`}>Lidar (3D)</button>
               </div>
            )}
             {activeTab === 'education' && (
               <div className="flex bg-neutral-900 p-1 rounded-lg">
                 <button onClick={() => setEduView('time')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${eduView === 'time' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500'}`}>Time Domain</button>
                 <button onClick={() => setEduView('freq')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${eduView === 'freq' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500'}`}>Frequency</button>
               </div>
            )}
          </div>

          {/* CHART AREA */}
          <div className="flex-grow w-full h-[400px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              
              {/* 1. VISION & SIGNAL CHART */}
              {activeTab === 'vision' && subTab === 'signal' ? (
                 <LineChart data={signalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="time" stroke="#444" fontSize={10} tickLine={false} />
                    <YAxis stroke="#444" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Line type="monotone" dataKey="normal" stroke="#3b82f6" strokeWidth={2} dot={false} name="Normal Operation" />
                    <Line type="monotone" dataKey="defect" stroke="#ef4444" strokeWidth={2} dot={false} name="Outer Race Fault" />
                 </LineChart>
              ) : activeTab === 'vision' && subTab === 'lidar' ? (
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis type="number" dataKey="x" name="X Pos" stroke="#444" fontSize={10} tick={false}/>
                  <YAxis type="number" dataKey="y" name="Y Pos" stroke="#444" fontSize={10} tick={false}/>
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                  <Scatter name="Point Cloud" data={cloudData} fill="#3b82f6" shape="circle" />
                  <ReferenceLine y={12} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Geometric Defect Limit', fill: '#ef4444', fontSize: 10 }} />
                </ScatterChart>
              ) : 

              /* 2. SYMLOGIX CHART */
              activeTab === 'symlogix' ? (
                <LineChart data={textData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="index" stroke="#444" fontSize={10} tickLine={false} />
                  <YAxis stroke="#444" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                  <Line type="monotone" dataKey="original" stroke="#a855f7" strokeWidth={3} dot={{r:4}} name="Log A (Baseline)" />
                  <Line type="monotone" dataKey="rephrased" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Log B (Rephrased)" />
                  <Line type="monotone" dataKey="anomaly" stroke="#ef4444" strokeWidth={2} strokeDasharray="2 2" dot={false} name="Log C (Anomaly)" />
                </LineChart>
              ) :

              /* 3. EDUCATION CHART */
              activeTab === 'education' && eduView === 'time' ? (
                <AreaChart data={educationTimeData}>
                   <defs>
                    <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="x" stroke="#444" fontSize={10} />
                  <YAxis stroke="#444" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                  <Area type="monotone" dataKey="y" stroke="#22c55e" fillOpacity={1} fill="url(#colorY)" />
                </AreaChart>
              ) : (
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="x" stroke="#444" fontSize={10} type="category" />
                  <YAxis dataKey="y" stroke="#444" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                  <Scatter name="Frequencies" data={educationFreqData} fill="#22c55e" line shape="square" />
                </ScatterChart>
              )}

            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}