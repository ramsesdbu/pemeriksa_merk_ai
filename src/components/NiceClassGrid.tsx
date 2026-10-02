import React from 'react';
import { NICE_CLASSES, NiceClassInfo } from '../data/niceClasses';
import { TrademarkAnalysisResult } from '../data/sampleSearches';
import { Layers } from 'lucide-react';

interface NiceClassGridProps {
  analysisResult?: TrademarkAnalysisResult | null;
  onSelectClassInfo: (cls: NiceClassInfo, classSummary?: any) => void;
}

export const NiceClassGrid: React.FC<NiceClassGridProps> = ({
  analysisResult,
  onSelectClassInfo,
}) => {
  const classStatusMap = new Map<number, any>();
  if (analysisResult?.niceClassSummary) {
    analysisResult.niceClassSummary.forEach((s) => {
      classStatusMap.set(s.classNumber, s);
    });
  }

  if (analysisResult?.registeredGoodsServices) {
    analysisResult.registeredGoodsServices.forEach((r) => {
      if (!classStatusMap.has(r.niceClass)) {
        classStatusMap.set(r.niceClass, {
          classNumber: r.niceClass,
          type: r.type,
          className: r.className,
          status: r.risk === 'Tinggi' ? 'Diblokir / Konflik Kritis' : 'Konflik Parsial',
          details: `Konflik dengan merek ${r.conflictingMark} (Risiko ${r.risk})`,
        });
      }
    });
  }

  if (analysisResult?.notRegisteredGoodsServices) {
    analysisResult.notRegisteredGoodsServices.forEach((u) => {
      if (!classStatusMap.has(u.niceClass)) {
        classStatusMap.set(u.niceClass, {
          classNumber: u.niceClass,
          type: u.type,
          className: u.className,
          status: 'Aman / Terbuka',
          details: u.clearanceRationale,
        });
      }
    });
  }

  const goodsClasses = NICE_CLASSES.filter((c) => c.type === 'Barang');
  const servicesClasses = NICE_CLASSES.filter((c) => c.type === 'Jasa');

  const renderClassCard = (cls: NiceClassInfo) => {
    const summary = classStatusMap.get(cls.number);
    let borderClass = 'border-slate-800 bg-slate-900/60 hover:border-slate-700';
    let badge = null;

    if (summary) {
      if (summary.status.includes('Diblokir') || summary.status.includes('Tinggi') || summary.status === 'Blocked' || summary.status === 'High Conflict') {
        borderClass = 'border-rose-500/50 bg-rose-950/20 hover:border-rose-400';
        badge = (
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Konflik</span>
          </span>
        );
      } else if (summary.status.includes('Parsial') || summary.status === 'Partial Conflict') {
        borderClass = 'border-amber-500/50 bg-amber-950/20 hover:border-amber-400';
        badge = (
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Parsial</span>
          </span>
        );
      } else {
        borderClass = 'border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400';
        badge = (
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Aman</span>
          </span>
        );
      }
    }

    return (
      <button
        key={cls.number}
        onClick={() => onSelectClassInfo(cls, summary)}
        className={`text-left p-3 rounded-xl border transition flex flex-col justify-between shadow-xs ${borderClass} group cursor-pointer`}
      >
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-mono font-bold text-sm text-white group-hover:text-indigo-400 transition">
              Kls. {cls.number}
            </span>
            {badge || (
              <span className="text-[10px] text-slate-400 group-hover:text-slate-300">
                {cls.type === 'Barang' ? 'B' : 'J'}
              </span>
            )}
          </div>
          <div className="font-semibold text-xs text-slate-200 line-clamp-1">
            {cls.title}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
            {summary ? summary.details || cls.officialHeading : cls.category}
          </div>
        </div>
        <div className="mt-2 text-[10px] text-indigo-400/80 group-hover:text-indigo-300 font-medium flex items-center space-x-0.5">
          <span>Panduan Kelas</span>
          <span>&rarr;</span>
        </div>
      </button>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">
              Peta Evaluasi 45 Kelas Klasifikasi Nice
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Peta status interaktif pangkalan data merek yang menunjukkan kelas terblokir dan koridor pendaftaran terbuka.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.8 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Konflik Tinggi / Terblokir</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.8 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Konflik Parsial / Bersyarat</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.8 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Aman / Peluang Terbuka</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.8 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span>Direktori Standar</span>
          </span>
        </div>
      </div>

      {/* Goods: Classes 1 to 34 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
            Barang: Kelas 1 – 34
          </span>
          <span className="text-xs text-slate-400">
            Produk fisik berwujud, hasil pabrikan, kimia, elektronik, pakaian, dan bahan pangan.
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {goodsClasses.map(renderClassCard)}
        </div>
      </div>

      {/* Services: Classes 35 to 45 */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
            Jasa: Kelas 35 – 45
          </span>
          <span className="text-xs text-slate-400">
            Aktivitas jasa layanan, hosting cloud SaaS, perniagaan retail, keuangan, hukum, dan kuliner.
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {servicesClasses.map(renderClassCard)}
        </div>
      </div>
    </div>
  );
};
