import { Repeat, BarChart3, Zap, Search } from 'lucide-react';

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return {
        border: 'border-red-500/30',
        bg: 'bg-gradient-to-r from-red-950/40 to-red-900/20',
        text: 'text-red-400',
        glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
        badge: 'bg-red-500/20 text-red-400 border border-red-500/30',
      };
    case 'medium':
      return {
        border: 'border-yellow-500/30',
        bg: 'bg-gradient-to-r from-yellow-950/40 to-yellow-900/20',
        text: 'text-yellow-400',
        glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]',
        badge: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      };
    case 'low':
      return {
        border: 'border-blue-500/30',
        bg: 'bg-gradient-to-r from-blue-950/40 to-blue-900/20',
        text: 'text-blue-400',
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
        badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      };
    default:
      return {
        border: 'border-slate-500/30',
        bg: 'bg-gradient-to-r from-slate-900/40 to-slate-800/20',
        text: 'text-slate-400',
        glow: 'shadow-[0_0_15px_rgba(100,116,139,0.3)]',
        badge: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
      };
  }
};

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'duplicate':
      return <Repeat className="w-6 h-6 text-blue-400" />;
    case 'context':
      return <BarChart3 className="w-6 h-6 text-purple-400" />;
    case 'consistency':
      return <Zap className="w-6 h-6 text-amber-400" />;
    default:
      return <Search className="w-6 h-6 text-slate-400" />;
  }
};
