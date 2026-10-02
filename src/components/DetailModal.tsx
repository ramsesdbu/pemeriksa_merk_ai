import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Copy, Check, Scale, AlertTriangle, Layers } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  isRegistered: boolean;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  item,
  isRegistered,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isRegistered
              ? 'bg-rose-950/40 border-rose-900/40'
              : 'bg-emerald-950/40 border-emerald-900/40'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isRegistered
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {isRegistered ? <ShieldAlert className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div>
              <span
                className={`text-xs uppercase tracking-wider font-bold ${
                  isRegistered ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {isRegistered ? 'Data Konflik Merek Terdaftar' : 'Peluang Pendaftaran Aman & Tersedia'}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                {item.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-300">
          {/* Class & Type badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-xs bg-slate-800 text-white px-2.5 py-1 rounded-lg border border-slate-700">
              Kelas Nice {item.niceClass}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold ${
                item.type === 'Barang' || item.type === 'Goods'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              Kategori {item.type}
            </span>
            <span className="text-slate-400 text-xs font-medium">
              {item.className}
            </span>
          </div>

          {isRegistered ? (
            /* Registered Conflict Breakdown */
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px]">Nama Merek Terdahulu:</span>
                  <span className="font-bold text-rose-300 font-mono text-sm">{item.conflictingMark}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Nomor Pendaftaran / Agenda:</span>
                  <span className="font-mono text-slate-200">{item.registrationNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Pemilik Hak Merek:</span>
                  <span className="text-slate-200 font-medium">{item.owner}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Status Hukum DJKI:</span>
                  <span className="text-amber-300 font-medium">{item.status}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 mb-1 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Alasan Konflik & Risiko Pasal 21 UU Merek:</span>
                </h4>
                <p className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-200 leading-relaxed text-xs">
                  {item.conflictReason}
                </p>
              </div>

              {item.coexistenceFeasibility && (
                <div>
                  <h4 className="font-bold text-slate-200 mb-1 flex items-center space-x-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Peluang Koeksistensi (Hidup Berdampingan):</span>
                  </h4>
                  <p className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed text-xs">
                    {item.coexistenceFeasibility}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Unregistered Clearance Breakdown */
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="font-bold text-slate-200 mb-1 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Alasan Keamanan Pendaftaran (Clearance):</span>
                </h4>
                <p className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-200 leading-relaxed text-xs">
                  {item.clearanceRationale}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-200 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Rekomendasi Rumusan Spesifikasi DJKI / Nice:</span>
                  </h4>
                  <button
                    onClick={() => handleCopy(item.recommendedFilingSpec)}
                    className="inline-flex items-center space-x-1 text-[11px] text-indigo-400 hover:text-indigo-300 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Teks</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed">
                  {item.recommendedFilingSpec}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Disusun berdasarkan rumusan baku klasifikasi barang/jasa resmi yang diakui DJKI Kemenkumham RI.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Tutup Pemeriksa
          </button>
        </div>
      </div>
    </div>
  );
};
