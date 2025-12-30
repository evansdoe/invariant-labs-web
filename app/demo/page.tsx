// app/demo/page.tsx
"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowLeft, Activity, Brain, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Mock Data representing the Spectral Analysis
const data = [
  { index: 0, original: 0, rephrased: 0, anomaly: 0 },
  { index: 1, original: 0.1, rephrased: 0.15, anomaly: 0.2 },
  { index: 2, original: 0.3, rephrased: 0.35, anomaly: 0.6 },
  { index: 3, original: 0.65, rephrased: 0.7, anomaly: 1.1 },
  { index: 4, original: 1.0, rephrased: 1.1, anomaly: 1.5 },
  { index: 5, original: 1.4, rephrased: 1.5, anomaly: 1.85 },
  { index: 6, original: 1.7, rephrased: 1.85, anomaly: 1.95 },
  { index: 7, original: 1.9, rephrased: 2.0, anomaly: 0.0 }, // Anomaly drop-off
  { index: 8, original: 2.0, rephrased: 0.0, anomaly: 0.0 },
];

export default function Demo() {
  const [activeTab, setActiveTab] = useState<'signal' | 'text'>('text');

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-24 selection:bg-white selection:text-black font-mono">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Base</span>
        </Link>
        <div className="text-xs text-neutral-600 border border-neutral-800 px-3 py-1 rounded-full">
          LIVE DEMO // ENVIRONMENT: PRODUCTION
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-12">
        
        {/* Left Control Panel */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4">SymLogix™ Engine.</h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Visualize the <strong>Invariant Fingerprint</strong> of data. Unlike Neural Networks which guess, Geometric Scattering calculates the deterministic shape of the signal.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => setActiveTab('text')}
              className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-4 ${activeTab === 'text' ? 'bg-neutral-900 border-white text-white' : 'border-neutral-800 text-neutral-500 hover:bg-neutral-900/50'}`}
            >
              <Brain size={24} />
              <div>
                <div className="font-bold">Geometric NLP</div>
                <div className="text-xs opacity-70">Text Structure Analysis</div>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('signal')}
              className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-4 ${activeTab === 'signal' ? 'bg-neutral-900 border-white text-white' : 'border-neutral-800 text-neutral-500 hover:bg-neutral-900/50'}`}
            >
              <Activity size={24} />
              <div>
                <div className="font-bold">Signal Invariance</div>
                <div className="text-xs opacity-70">Vibration & Time-Series</div>
              </div>
            </button>
          </div>

          <div className="p-4 bg-blue-900/10 border border-blue-900/30 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold uppercase">Status: Nominal</span>
            </div>
            <p className="text-[10px] text-blue-200/60">
              Spectral Distance calculation confirmed.
              <br/>Log A vs Log B: 0.15 (MATCH)
              <br/>Log A vs Anomaly: 1.85 (ALERT)
            </p>
          </div>
        </div>

        {/* Right Visualization Panel */}
        <div className="lg:col-span-2 bg-neutral-900/20 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex justify-between items-end mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-bold mb-1">Spectral Eigenvalues</h2>
              <p className="text-xs text-neutral-500">Laplacian Spectrum of Data Geometry</p>
            </div>
            <div className="flex gap-4 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Original
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Rephrased
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Anomaly
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="index" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <ReferenceLine y={0} stroke="#666" />
                <Line 
                  type="monotone" 
                  dataKey="original" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6' }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rephrased" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="anomaly" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  strokeDasharray="2 2" 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}