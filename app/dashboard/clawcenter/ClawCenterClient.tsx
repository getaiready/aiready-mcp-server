'use client';

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import {
  Zap,
  ShieldAlert,
  GitPullRequest,
  Terminal,
  Play,
  Pause,
  ChevronRight,
  Code,
  LayoutGrid,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TenantClawCenterProps {
  data: any;
}

export default function TenantClawCenter({ data }: TenantClawCenterProps) {
  const [activeTab, setActiveTab] = useState('COMMAND');
  const [isSwarmActive, setIsSwarmActive] = useState(
    data.swarmStatus === 'EVOLVING'
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyber-blue/30 selection:text-cyber-blue font-sans pb-20">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Swarm Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-2xl ${isSwarmActive ? 'bg-cyber-blue/10' : 'bg-zinc-800'} flex items-center justify-center border border-white/5`}
              >
                <Zap
                  className={`w-8 h-8 ${isSwarmActive ? 'text-cyber-blue animate-pulse' : 'text-zinc-600'}`}
                />
              </div>
              {isSwarmActive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  Autonomous Status
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${isSwarmActive ? 'bg-cyber-blue/20 text-cyber-blue' : 'bg-zinc-800 text-zinc-500'}`}
                >
                  {isSwarmActive ? 'Swarms Active' : 'Swarm Dormant'}
                </span>
              </div>
              <h1 className="text-2xl font-black italic tracking-tighter">
                {isSwarmActive ? data.activeTask : 'Waiting for Command'}
              </h1>
              <p className="text-xs text-zinc-500 font-mono italic">
                Currently: {data.currentAgent} in execution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSwarmActive(!isSwarmActive)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all border ${
                isSwarmActive
                  ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                  : 'bg-cyber-blue border-cyber-blue text-black hover:scale-105 active:scale-95'
              }`}
            >
              {isSwarmActive ? (
                <>
                  <Pause className="w-4 h-4 fill-current" /> Pause Swarm
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Deploy Swarm
                </>
              )}
            </button>
            <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all">
              <Settings className="w-5 h-5 text-zinc-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Dashboard Nav */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-4 overflow-hidden">
              {[
                { id: 'COMMAND', label: 'Command Hub', icon: LayoutGrid },
                {
                  id: 'MUTATIONS',
                  label: 'Mutation Queue',
                  icon: GitPullRequest,
                  badge: '1',
                },
                { id: 'REASONING', label: 'Live Reasoning', icon: Terminal },
                { id: 'LOGIC', label: 'Logic Topology', icon: Code },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-1 transition-all group ${
                    activeTab === tab.id
                      ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20'
                      : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm font-bold italic">
                    <tab.icon
                      className={`w-4 h-4 ${activeTab === tab.id ? 'text-cyber-blue' : 'group-hover:text-cyber-blue transition-colors'}`}
                    />
                    {tab.label}
                  </div>
                  {tab.badge && (
                    <span className="bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-cyber-blue/5 to-transparent border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">
                Commander's Strategy
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-500">Mutation Target</span>
                  <span className="text-white">ROI Optimization</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-500">Strict Verification</span>
                  <span className="text-emerald-500">ACTIVE</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-500">Autonomous Depth</span>
                  <span className="text-white italic">Full Stack</span>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-750 transition-all">
                Modify Directive
              </button>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'COMMAND' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Swarm Intelligence Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        label: 'Logic Clarity',
                        value: data.agentStats.logicClarity,
                        color: 'text-blue-400',
                      },
                      {
                        label: 'Context Efficiency',
                        value: data.agentStats.contextEfficiency,
                        color: 'text-purple-400',
                      },
                      {
                        label: 'Security Grade',
                        value: data.agentStats.securityScore,
                        color: 'text-emerald-400',
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl group hover:border-zinc-700 transition-all"
                      >
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">
                          {stat.label}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`text-4xl font-black italic tracking-tighter ${stat.color}`}
                          >
                            {stat.value}
                          </span>
                          <span className="text-zinc-600 font-bold text-xs uppercase">
                            / 100
                          </span>
                        </div>
                        <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-current ${stat.color} opacity-80`}
                            style={{ width: `${stat.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-black italic tracking-tighter flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-500" />
                        Gaps Identified
                      </h2>
                      <span className="text-xs text-zinc-500 font-mono italic">
                        Prioritization Agent Triage Active
                      </span>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: 'Semantic Duplication in Persistence',
                          severity: 'Critical',
                          tokens: '1,240 Waste/mo',
                        },
                        {
                          title: 'Inconsistent Error Pattern in API',
                          severity: 'Major',
                          tokens: '450 Waste/mo',
                        },
                      ].map((gap, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:border-amber-500/30 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                              <ShieldAlert className="w-4 h-4 text-amber-500" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                                {gap.title}
                              </p>
                              <p className="text-[10px] text-zinc-500 font-mono italic">
                                {gap.severity} Severity • {gap.tokens}
                              </p>
                            </div>
                          </div>
                          <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-cyber-blue hover:text-white transition-colors">
                            Remediate <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'MUTATIONS' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-black italic tracking-tighter mb-8">
                    Pending Platform Mutations
                  </h2>
                  {data.pendingMutations.map((mut: any) => (
                    <div
                      key={mut.id}
                      className="bg-zinc-900 border-2 border-amber-500/20 rounded-3xl overflow-hidden mb-6"
                    >
                      <div className="p-6 bg-amber-500/5 border-b border-zinc-800 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-500 text-[9px] font-black uppercase">
                              {mut.impact} Impact
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter italic">
                              {mut.id} • RefactorAgent Proposal
                            </span>
                          </div>
                          <h3 className="text-xl font-black italic tracking-tighter">
                            {mut.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-4 py-2 bg-zinc-800 hover:bg-red-500/10 text-xs font-bold rounded-xl border border-zinc-700 transition-all">
                            Reject
                          </button>
                          <button className="px-4 py-2 bg-emerald-500 text-black text-xs font-black rounded-xl hover:scale-105 active:scale-95 transition-all">
                            Approve Mutation
                          </button>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <p className="text-sm text-zinc-400 leading-relaxed italic">
                          {mut.description}
                        </p>
                        <div className="bg-black/80 rounded-2xl p-6 font-mono text-[11px] overflow-x-auto border border-white/5">
                          <pre className="text-zinc-500">{mut.diff}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
