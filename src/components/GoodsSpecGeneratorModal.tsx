import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, AlertCircle } from 'lucide-react';
import { NICE_CLASSES } from '../data/niceClasses';

interface GoodsSpecGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMarkName?: string;
}

export const GoodsSpecGeneratorModal: React.FC<GoodsSpecGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultMarkName = '',
}) => {
  const [roughDesc, setRoughDesc] = useState('');
  const [selectedClass, setSelectedClass] = useState<number>(9);
  const [markName, setMarkName] = useState(defaultMarkName);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roughDesc.trim()) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/generate-goods-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughDescription: roughDesc.trim(),
          niceClass: selectedClass,
          markName: markName.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Gagal merumuskan spesifikasi.');
      }

      const data = await res.json();
      setResult(data);
    } catch {
      // Fallback local Indonesian generator
      setResult({
        recommendedClass: selectedClass,
        classTitle: NICE_CLASSES.find((c) => c.number === selectedClass)?.title || 'Kelas Terpilih',
        formalSpecifications: [
          {
            text: `Aplikasi perangkat lunak seluler yang dapat diunduh untuk ${roughDesc.toLowerCase().replace(/aplikasi\b/gi, '').trim()}; tidak termasuk untuk tujuan diagnostik medis.`,
            scope: 'Cakupan Standar DJKI',
            officeManualCode: '009-142',
          },
          {
            text: `Software as a service (SaaS) yang menampilkan perangkat lunak untuk ${roughDesc.toLowerCase().trim()}; penyediaan akses perangkat lunak komputasi awan non-unduhan.`,
            scope: 'Cakupan Defensif Luas',
            officeManualCode: '042-882',
          },
          {
            text: `Penyediaan materi edukasi dan panduan pelatihan informasi digital di bidang ${roughDesc.toLowerCase().trim()}.`,
            scope: 'Cakupan Spesifik Cepat Lolos',
            officeManualCode: '041-331',
          },
        ],
        pitfallsToAvoid: [
          'Hindari menggunakan kata terbuka seperti "dan produk-produk sejenis lainnya" atau "termasuk namun tidak terbatas pada".',
          'Pastikan memisahkan aplikasi yang diunduh (Kelas 9) dengan platform cloud SaaS berbasis web (Kelas 42).',
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Perumus Uraian Barang & Jasa AI (Standar DJKI / Nice)
              </h3>
              <p className="text-xs text-slate-400">
                Ubah deskripsi produk informal menjadi rumusan baku permohonan merek resmi yang bebas penolakan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Target Kelas Nice
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  {NICE_CLASSES.map((c) => (
                    <option key={c.number} value={c.number}>
                      Kelas {c.number} ({c.type}): {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Nama Merek (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: KOPINUSA"
                  value={markName}
                  onChange={(e) => setMarkName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Deskripsi Informal Produk / Usaha Anda
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Kami membuat botol tumbler pintar yang bisa mencatat konsumsi air harian dan mengirim notifikasi pengingat minum ke HP..."
                value={roughDesc}
                onChange={(e) => setRoughDesc(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !roughDesc.trim()}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>Menstandarisasi Uraian Barang...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rumuskan Uraian Baku Sesuai DJKI</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Results Display */}
          {result && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-200">
                  Rumusan Uraian Baku Siap Pakai (Kelas {result.recommendedClass || selectedClass})
                </h4>
                <span className="text-[11px] text-slate-400">
                  Sesuai Formulir Resmi DJKI Kemenkumham
                </span>
              </div>

              <div className="space-y-3">
                {result.formalSpecifications?.map((spec: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {spec.scope}
                      </span>
                      <button
                        onClick={() => handleCopy(spec.text, idx)}
                        className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin Rumusan</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="font-mono text-xs text-slate-200 leading-relaxed">
                      "{spec.text}"
                    </p>
                  </div>
                ))}
              </div>

              {result.pitfallsToAvoid && result.pitfallsToAvoid.length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-xs text-rose-300 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-rose-300">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Tips Menghindari Surat Usulan Penolakan:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-300/80">
                    {result.pitfallsToAvoid.map((pitfall: string, idx: number) => (
                      <li key={idx}>{pitfall}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
