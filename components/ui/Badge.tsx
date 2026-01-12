import React from 'react';
import { ReservationStatus } from '../../types';
import { CheckCircle2, Clock, XCircle, CheckSquare } from 'lucide-react';

interface BadgeProps {
  status: ReservationStatus | string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  let colorClass = "bg-slate-800 text-slate-300 border-slate-700";
  let Icon = Clock;

  switch (status) {
    case 'confirmed':
      colorClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      Icon = CheckCircle2;
      break;
    case 'pending':
      colorClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
      Icon = Clock;
      break;
    case 'cancelled':
      colorClass = "bg-red-500/10 text-red-400 border-red-500/20";
      Icon = XCircle;
      break;
    case 'completed':
      colorClass = "bg-blue-500/10 text-blue-400 border-blue-500/20";
      Icon = CheckSquare;
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      <Icon size={12} />
      <span className="capitalize">{status}</span>
    </span>
  );
};