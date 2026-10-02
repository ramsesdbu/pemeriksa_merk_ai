import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  Download,
  Info,
  Copy,
  Check
} from 'lucide-react';
import { TrademarkAnalysisResult } from '../data/sampleSearches';

interface UnifiedTableProps {
  registeredItems: TrademarkAnalysisResult['registeredGoodsServices'];
  unregisteredItems: TrademarkAnalysisResult['notRegisteredGoodsServices'];
  onInspectItem: (item: any, isRegistered: boolean) => void;
  trademarkName: string;
}

export const UnifiedTable: React.FC<UnifiedTableProps> = ({
  registeredItems,
  unregisteredItems,
  onInspectItem,
  trademarkName,
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Registered' | 'Unregistered'>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Barang' | 'Jasa'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Normalize into unified row format
  const rows = [
    ...registeredItems.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      niceClass: item.niceClass,
      className: item.className,
      isRegistered: true,
      statusLabel: 'SUDAH TERDAFTAR (KONFLIK)',
      statusSub: item.status,
      riskOrAvail: `Risiko ${item.risk}`,
      conflictOrRationale: item.conflictReason,
      specOrOwner: `Pemilik: ${item.owner} | Merek: ${item.conflictingMark} (${item.registrationNumber})`,
      raw: item,
    })),
    ...unregisteredItems.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      niceClass: item.niceClass,
      className: item.className,
      isRegistered: false,
      statusLabel: 'BELUM TERDAFTAR (TERSEDIA)',
      statusSub: item.status,
      riskOrAvail: 'Aman / Terbuka',
      conflictOrRationale: item.clearanceRationale,
      specOrOwner: item.recommendedFilingSpec,
      raw: item,
    })),
  ];

  const filtered = rows.filter((r) => {
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Registered' && r.isRegistered) ||
      (statusFilter === 'Unregistered' && !r.isRegistered);
    const matchesType = typeFilter === 'All' || r.type === typeFilter;
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.conflictOrRationale.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.specOrOwner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = [
      'Tipe',
      'Kelas Nice',
      'Nama Kelas',
      'Uraian Barang / Jasa',
      'Status Pendaftaran',
      'Tingkat Risiko / Peluang',
      'Alasan Hukum / Analisis Persamaan',
      'Pemilik / Rumusan Rekomendasi DJKI',
    ];

    const csvContent = [
      headers.join(','),
      ...filtered.map((r) =>
        [
          `"${r.type}"`,
          `"Kelas ${r.niceClass}"`,
          `"${r.className.replace(/"/g, '""')}"`,
          `"${r.name.replace(/"/g, '""')}"`,
          `"${r.statusLabel} (${r.statusSub})"`,
          `"${r.riskOrAvail}"`,
          `"${r.conflictOrRationale.replace(/"/g, '""')}"`,
          `"${r.specOrOwner.replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${trademarkName}_Audit_Barang_Jasa_Merek.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySpec = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header with tabs & filters */}
      <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-base text-white">
              Matriks Lengkap Analisis Barang & Jasa
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-slate-800 text-slate-300 border border-slate-700">
              {filtered.length} dari {rows.length} Total Item
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Bandingkan barang/jasa yang sudah terdaftar vs. belum terdaftar secara berdampingan lengkap dengan skor risiko dan rumusan permohonan.
          </p>
        </div>

        {/* Filters & Export */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari di seluruh tabel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status buttons */}
          <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-2.5 py-1 rounded transition ${
                statusFilter === 'All'
                  ? 'bg-slate-800 text-white font-medium shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua ({rows.length})
            </button>
            <button
              onClick={() => setStatusFilter('Registered')}
              className={`px-2.5 py-1 rounded flex items-center space-x-1 transition ${
                statusFilter === 'Registered'
                  ? 'bg-rose-950/90 text-rose-300 border border-rose-800/60 font-medium'
                  : 'text-rose-400/80 hover:text-rose-300'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Terdaftar ({registeredItems.length})</span>
            </button>
            <button
              onClick={() => setStatusFilter('Unregistered')}
              className={`px-2.5 py-1 rounded flex items-center space-x-1 transition ${
                statusFilter === 'Unregistered'
                  ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 font-medium'
                  : 'text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Tersedia ({unregisteredItems.length})</span>
            </button>
          </div>

          {/* Type button toggle */}
          <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setTypeFilter('All')}
              className={`px-2 py-1 rounded ${typeFilter === 'All' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Semua
            </button>
            <button
              onClick={() => setTypeFilter('Barang')}
              className={`px-2 py-1 rounded ${typeFilter === 'Barang' ? 'bg-sky-950 text-sky-300 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Barang (1-34)
            </button>
            <button
              onClick={() => setTypeFilter('Jasa')}
              className={`px-2 py-1 rounded ${typeFilter === 'Jasa' ? 'bg-amber-950 text-amber-300 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Jasa (35-45)
            </button>
          </div>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition"
            title="Unduh seluruh data tabel sebagai file CSV"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Status & Kategori</th>
              <th className="py-3 px-4">Uraian Barang atau Jasa</th>
              <th className="py-3 px-4">Kelas Nice</th>
              <th className="py-3 px-4">Risiko / Keterangan Ketersediaan</th>
              <th className="py-3 px-4">Alasan Hukum & Persamaan Pada Pokoknya</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500">
                  Tidak ditemukan barang/jasa yang sesuai dengan kombinasi filter ini.
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const isReg = row.isRegistered;
                return (
                  <tr
                    key={row.id}
                    className={`transition group ${
                      isReg ? 'hover:bg-rose-950/15' : 'hover:bg-emerald-950/15'
                    }`}
                  >
                    {/* Status Badge */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.8 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                            isReg
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {isReg ? (
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          )}
                          <span>{isReg ? 'Terdaftar' : 'Belum Terdaftar'}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium pl-1">
                          {row.statusSub}
                        </span>
                      </div>
                    </td>

                    {/* Goods / Service Description */}
                    <td className="py-3.5 px-4 align-top max-w-[240px]">
                      <div className="font-semibold text-slate-100 text-xs leading-snug">
                        {row.name}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-400 font-mono truncate" title={row.specOrOwner}>
                        {row.specOrOwner}
                      </div>
                    </td>

                    {/* Nice Class */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          Kelas {row.niceClass}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            row.type === 'Barang'
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {row.type}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 max-w-[120px] truncate" title={row.className}>
                        {row.className}
                      </div>
                    </td>

                    {/* Conflict Risk / Clearance Assessment */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      {isReg ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{row.riskOrAvail}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <Sparkles className="w-3 h-3" />
                          <span>Tersedia / Aman</span>
                        </span>
                      )}
                    </td>

                    {/* Conflict Details or Clearance Rationale */}
                    <td className="py-3.5 px-4 align-top max-w-sm text-slate-300">
                      <p className="line-clamp-2 leading-relaxed" title={row.conflictOrRationale}>
                        {row.conflictOrRationale}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1">
                        {!isReg && (
                          <button
                            onClick={() => handleCopySpec(row.specOrOwner, row.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                            title="Salin rumusan uraian permohonan"
                          >
                            {copiedId === row.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        <button
                          onClick={() => onInspectItem(row.raw, row.isRegistered)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                        >
                          <Info className={`w-3 h-3 ${isReg ? 'text-rose-400' : 'text-emerald-400'}`} />
                          <span>Periksa</span>
                        </button>
                      </div>
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
