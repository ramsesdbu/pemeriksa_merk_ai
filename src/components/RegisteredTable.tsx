import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Search, Info, Copy, Check } from 'lucide-react';
import { TrademarkAnalysisResult } from '../data/sampleSearches';

interface RegisteredTableProps {
  items: TrademarkAnalysisResult['registeredGoodsServices'];
  onInspectItem: (item: any, isRegistered: boolean) => void;
}

export const RegisteredTable: React.FC<RegisteredTableProps> = ({
  items,
  onInspectItem,
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Barang' | 'Jasa'>('All');
  const [filterRisk, setFilterRisk] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesRisk = filterRisk === 'All' || item.risk === filterRisk;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.conflictingMark.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesRisk && matchesSearch;
  });

  const handleCopyConflict = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-rose-900/40 rounded-2xl overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border-b border-rose-900/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base text-rose-200">
                Barang & Jasa yang SUDAH TERDAFTAR (Potensi Konflik)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {items.length} Data Terdaftar
              </span>
            </div>
            <p className="text-xs text-rose-300/70">
              Barang & jasa yang telah memiliki pendaftaran aktif terdahulu dengan indikasi persamaan pada pokoknya.
            </p>
          </div>
        </div>

        {/* Filter tools */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari barang terdaftar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
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

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="bg-slate-950/80 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">Semua Tingkat Risiko</option>
            <option value="Tinggi">Risiko Tinggi</option>
            <option value="Sedang">Risiko Sedang</option>
            <option value="Rendah">Risiko Rendah</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Tipe / Kelas Nice</th>
              <th className="py-3 px-4">Barang atau Jasa Terdaftar</th>
              <th className="py-3 px-4">Merek Terdahulu</th>
              <th className="py-3 px-4">Tingkat Risiko</th>
              <th className="py-3 px-4">Alasan Persamaan Pada Pokoknya</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  Tidak ada data barang terdaftar yang sesuai dengan filter ini.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isHigh = item.risk === 'Tinggi';
                const isMedium = item.risk === 'Sedang';
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-rose-950/20 transition group"
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
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-medium text-slate-200 leading-snug">
                        {item.name}
                      </div>
                      <div className="mt-1 flex items-center space-x-2 text-[10px] text-slate-400">
                        <span className="text-slate-500">Pemilik:</span>
                        <span className="text-slate-300 font-medium">{item.owner}</span>
                      </div>
                    </td>

                    {/* Conflicting Mark */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-rose-300 font-mono">
                          {item.conflictingMark}
                        </span>
                        <button
                          onClick={() => handleCopyConflict(item.conflictingMark, item.id)}
                          className="text-slate-500 hover:text-slate-300 transition"
                          title="Salin nama merek"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {item.registrationNumber}
                      </div>
                      <span className="inline-block mt-1 text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {item.status}
                      </span>
                    </td>

                    {/* Risk Badge */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          isHigh
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : isMedium
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>Risiko {item.risk}</span>
                      </span>
                    </td>

                    {/* Conflict Reason */}
                    <td className="py-3.5 px-4 align-top max-w-xs text-slate-300">
                      <p className="line-clamp-2 text-xs leading-relaxed" title={item.conflictReason}>
                        {item.conflictReason}
                      </p>
                      {item.coexistenceFeasibility && (
                        <div className="mt-1 text-[10px] text-slate-400 flex items-start space-x-1">
                          <span className="text-amber-400 font-semibold shrink-0">Koeksistensi:</span>
                          <span className="truncate">{item.coexistenceFeasibility}</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                      <button
                        onClick={() => onInspectItem(item, true)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      >
                        <Info className="w-3 h-3 text-rose-400" />
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
