import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, Scale } from 'lucide-react';
import { TrademarkAnalysisResult } from '../data/sampleSearches';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: TrademarkAnalysisResult;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  isOpen,
  onClose,
  analysis,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen || !analysis) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdown = () => {
    return `# LAPORAN AUDIT & DOSSIER PRA-PENDAFTARAN MEREK DAGANG
**Usulan Merek:** ${analysis.trademarkName}
**Wilayah Hukum:** ${analysis.jurisdiction}
**Tingkat Risiko Konflik:** ${analysis.overallRiskScore}/100 (${analysis.riskLevel})
**Kekuatan Daya Pembeda:** ${analysis.distinctiveness.classification} (${analysis.distinctiveness.score}/100)

---

## 1. RINGKASAN EKSEKUTIF CLEARANCE
${analysis.executiveSummary}

---

## 2. BARANG & JASA YANG SUDAH TERDAFTAR (POTENSI SENGKETA/KONFLIK)
${analysis.registeredGoodsServices
  .map(
    (r, i) =>
      `### ${i + 1}. ${r.name}
- **Kelas Nice:** Kelas ${r.niceClass} (${r.type}) - ${r.className}
- **Merek Terdahulu:** ${r.conflictingMark} (${r.registrationNumber})
- **Status & Pemilik:** ${r.status} | Pemilik: ${r.owner}
- **Tingkat Risiko:** Risiko ${r.risk}
- **Alasan Persamaan Pada Pokoknya:** ${r.conflictReason}
- **Peluang Koeksistensi:** ${r.coexistenceFeasibility || 'Tidak ada'}`
  )
  .join('\n\n')}

---

## 3. BARANG & JASA YANG BELUM TERDAFTAR (AMAN / PELUANG TERSEDIA)
${analysis.notRegisteredGoodsServices
  .map(
    (u, i) =>
      `### ${i + 1}. ${u.name}
- **Kelas Nice:** Kelas ${u.niceClass} (${u.type}) - ${u.className}
- **Status Ketersediaan:** ${u.status}
- **Alasan Keamanan Pendaftaran:** ${u.clearanceRationale}
- **Rekomendasi Rumusan Permohonan DJKI:** "${u.recommendedFilingSpec}"`
  )
  .join('\n\n')}

---

## 4. ANALISIS 4 PILAR PERSAMAAN PADA POKOKNYA (PASAL 21 UU MEREK)
- **Kemiripan Fonetik/Bunyi:** ${analysis.likelihoodOfConfusion.phonetic.score}% - ${analysis.likelihoodOfConfusion.phonetic.analysis}
- **Kemiripan Visual:** ${analysis.likelihoodOfConfusion.visual.score}% - ${analysis.likelihoodOfConfusion.visual.analysis}
- **Kesan Konseptual/Makna:** ${analysis.likelihoodOfConfusion.commercialImpression.score}% - ${analysis.likelihoodOfConfusion.commercialImpression.analysis}
- **Saluran Perdagangan:** ${analysis.likelihoodOfConfusion.tradeChannels.score}% - ${analysis.likelihoodOfConfusion.tradeChannels.analysis}

---

## 5. RENCANA AKSI & REKOMENDASI PRA-PENDAFTARAN
${analysis.actionPlan.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Catatan Pelepasan Hak (Disclaimer):** ${analysis.disclaimerAdvice}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${analysis.trademarkName}_Dossier_Merek.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header (no-print) */}
        <div className="no-print p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Dossier Laporan Pra-Pendaftaran Merek
              </h3>
              <p className="text-xs text-slate-400">
                Laporan evaluasi resmi kelayakan pendaftaran untuk merek "{analysis.trademarkName}"
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              title="Salin sebagai Markdown"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'Tersalin' : 'Salin Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Dossier Preview Body */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-slate-950 font-sans text-slate-200 print:bg-white print:text-black">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Title & Metadata */}
            <div className="border-b border-slate-800 print:border-black pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-indigo-400 print:text-indigo-700 font-bold">
                    Laporan Resmi Audit Pra-Pendaftaran Merek
                  </span>
                  <h1 className="text-3xl font-extrabold text-white print:text-black mt-1">
                    Merek: "{analysis.trademarkName}"
                  </h1>
                  <p className="text-sm text-slate-400 print:text-slate-600 mt-1">
                    Yurisdiksi: {analysis.jurisdiction} • Tanggal: {new Date().toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 print:text-slate-600">Evaluasi Risiko</div>
                  <div className="text-xl font-mono font-bold text-rose-400 print:text-rose-700">
                    {analysis.riskLevel}
                  </div>
                  <div className="text-xs text-slate-400">Skor Risiko: {analysis.overallRiskScore}/100</div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-black">
                Ringkasan Eksekutif Pemeriksaan Substantif
              </h2>
              <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-sm leading-relaxed text-slate-300 print:text-slate-800">
                {analysis.executiveSummary}
              </div>
            </div>

            {/* Distinctiveness */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
              <div>
                <span className="text-slate-400 print:text-slate-600 block">Daya Pembeda (Abercrombie):</span>
                <span className="font-bold text-sm text-indigo-300 print:text-indigo-800">{analysis.distinctiveness.classification}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block">Tingkat Ketahanan Hukum:</span>
                <span className="font-bold text-sm text-slate-200 print:text-black">{analysis.distinctiveness.score}/100</span>
              </div>
              <div className="col-span-2 text-slate-300 print:text-slate-700">
                {analysis.distinctiveness.explanation}
              </div>
            </div>

            {/* Registered / Overlapping Goods & Services */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-rose-400 print:text-rose-800 flex items-center space-x-1.5">
                <span>1. Barang & Jasa yang Sudah Terdaftar (Potensi Konflik)</span>
              </h2>
              <div className="space-y-3">
                {analysis.registeredGoodsServices.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 print:bg-slate-50 border border-rose-900/40 print:border-rose-400 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-sm text-slate-100 print:text-black">
                        Kelas {item.niceClass} ({item.type}): {item.name}
                      </div>
                      <span className="font-semibold text-rose-400 print:text-rose-700 font-mono text-[11px]">
                        Risiko {item.risk}
                      </span>
                    </div>
                    <div className="text-slate-400 print:text-slate-600">
                      Merek Terdahulu: <span className="font-bold text-slate-200 print:text-black">{item.conflictingMark}</span> ({item.registrationNumber}) • Pemilik: {item.owner}
                    </div>
                    <div className="text-slate-300 print:text-slate-800 pt-1">
                      <span className="font-semibold">Alasan Konflik:</span> {item.conflictReason}
                    </div>
                    {item.coexistenceFeasibility && (
                      <div className="text-slate-400 print:text-slate-600 text-[11px]">
                        <span className="font-semibold">Koeksistensi:</span> {item.coexistenceFeasibility}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Unregistered / Clear Goods & Services */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 flex items-center space-x-1.5">
                <span>2. Barang & Jasa yang Belum Terdaftar (Aman untuk Didaftarkan)</span>
              </h2>
              <div className="space-y-3">
                {analysis.notRegisteredGoodsServices.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 print:bg-slate-50 border border-emerald-900/40 print:border-emerald-400 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-sm text-slate-100 print:text-black">
                        Kelas {item.niceClass} ({item.type}): {item.name}
                      </div>
                      <span className="font-semibold text-emerald-400 print:text-emerald-700 font-mono text-[11px]">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-slate-300 print:text-slate-800">
                      <span className="font-semibold">Alasan Keamanan:</span> {item.clearanceRationale}
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 print:bg-white border border-slate-800 print:border-slate-300 font-mono text-[11px] text-slate-300 print:text-black">
                      <span className="font-sans font-semibold text-indigo-400 print:text-indigo-700 block text-[10px] uppercase">
                        Rekomendasi Rumusan Uraian DJKI:
                      </span>
                      "{item.recommendedFilingSpec}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plan */}
            <div className="space-y-3 pt-4 border-t border-slate-800 print:border-black">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-black">
                3. Rencana Aksi Taktis Pra-Pendaftaran
              </h2>
              <ul className="space-y-2 text-xs text-slate-300 print:text-slate-800">
                {analysis.actionPlan.map((plan, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="font-bold text-indigo-400 print:text-indigo-700">{i + 1}.</span>
                    <span>{plan}</span>
                  </li>
                ))}
              </ul>
              {analysis.disclaimerAdvice && (
                <div className="p-3 rounded-lg bg-amber-500/10 print:bg-amber-50 border border-amber-500/20 print:border-amber-300 text-xs text-amber-200 print:text-amber-900">
                  <span className="font-bold">Catatan Disclaimer:</span> {analysis.disclaimerAdvice}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
