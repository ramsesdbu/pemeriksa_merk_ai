import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Copy, Check, Search, Info } from 'lucide-react';
import { TrademarkAnalysisResult } from '../data/sampleSearches';

interface UnregisteredTableProps {
  items: TrademarkAnalysisResult['notRegisteredGoodsServices'];
  onInspectItem: (item: any, isRegistered: boolean) => void;
}

export const UnregisteredTable: React.FC<UnregisteredTableProps> = ({
  items,
  onInspectItem,
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Barang' | 'Jasa'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clearanceRationale.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recommendedFilingSpec.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopySpec = (spec: string, id: string) => {
    navigator.clipboard.writeText(spec);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-b border-emerald-900/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base text-emerald-200">
                Barang & Jasa yang BELUM TERDAFTAR (Aman / Tersedia)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {items.length} Peluang Terbuka
              </span>
            </div>
            <p className="text-xs text-emerald-300/70">
              Barang & jasa yang belum terdaftar atas merek serupa — kandidat prioritas untuk pendaftaran resmi di DJKI.
            </p>
          </div>
        </div>

        {/* Filter tools */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari barang tersedia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-950/80 border border-slate-700 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setFilterType('All')}
              className={`px-2 py-1 rounded ${filterType === 'All' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterType('Barang')}
              className={`px-2 py-1 rounded ${filterType === 'Barang' ? 'bg-sky-950 text-sky-300 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Barang
            </button>
            <button
              onClick={() => setFilterType('Jasa')}
              className={`px-2 py-1 rounded ${filterType === 'Jasa' ? 'bg-amber-950 text-amber-300 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Jasa
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Tipe / Kelas Nice</th>
              <th className="py-3 px-4">Barang atau Jasa Tersedia</th>
              <th className="py-3 px-4">Status Ketersediaan</th>
              <th className="py-3 px-4">Alasan Keamanan Pendaftaran</th>
              <th className="py-3 px-4">Rekomendasi Rumusan Permohonan (DJKI)</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  Tidak ada barang/jasa tersedia yang cocok dengan filter saat ini.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isAvailable = item.status === 'Tersedia / Aman';
                const isOpp = item.status === 'Peluang Terbuka';
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-emerald-950/20 transition group"
                  >
                    {/* Class & Type */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          Kelas {item.niceClass}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            item.type === 'Barang'
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 max-w-[140px] truncate" title={item.className}>
                        {item.className}
                      </div>
                    </td>

                    {/* Name / Description */}
                    <td className="py-3.5 px-4 align-top max-w-[220px]">
                      <div className="font-medium text-slate-100 leading-snug">
                        {item.name}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          isAvailable
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isOpp
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{item.status}</span>
                      </span>
                    </td>

                    {/* Clearance Rationale */}
                    <td className="py-3.5 px-4 align-top max-w-xs text-slate-300">
                      <p className="line-clamp-2 text-xs leading-relaxed" title={item.clearanceRationale}>
                        {item.clearanceRationale}
                      </p>
                    </td>

                    {/* Recommended Filing Specification */}
                    <td className="py-3.5 px-4 align-top max-w-sm">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 relative group/box">
                        <p className="line-clamp-2 pr-6 leading-relaxed">
                          {item.recommendedFilingSpec}
                        </p>
                        <button
                          onClick={() => handleCopySpec(item.recommendedFilingSpec, item.id)}
                          className="absolute right-1.5 top-1.5 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="Salin uraian barang/jasa baku"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                      <button
                        onClick={() => onInspectItem(item, false)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      >
                        <Info className="w-3 h-3 text-emerald-400" />
                        <span>Periksa</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
