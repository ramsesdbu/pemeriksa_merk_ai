import React from 'react';
import { TrademarkAnalysisResult } from '../data/sampleSearches';
import { Scale, Award, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface LikelihoodAnalysisProps {
  analysis: TrademarkAnalysisResult;
}

export const LikelihoodAnalysis: React.FC<LikelihoodAnalysisProps> = ({ analysis }) => {
  const {
    distinctiveness,
    likelihoodOfConfusion,
    actionPlan,
    disclaimerAdvice,
    overallRiskScore,
    riskLevel,
  } = analysis;

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    if (score < 70) return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
  };

  const getBarColor = (score: number) => {
    if (score < 40) return 'bg-emerald-500';
    if (score < 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const spectrumLevels = [
    { key: 'Generik', label: 'Generik (Generic)' },
    { key: 'Deskriptif', label: 'Deskriptif (Descriptive)' },
    { key: 'Sugestif', label: 'Sugestif (Suggestive)' },
    { key: 'Arbitrer', label: 'Arbitrer (Arbitrary)' },
    { key: 'Fantasi', label: 'Fantasi (Fanciful)' },
  ];

  return (
    <div className="space-y-6">
      {/* 2-column overview: Distinctiveness & Confusion Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distinctiveness (Abercrombie Spectrum) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base">
                Spektrum Daya Pembeda Merek (Doktrin Abercrombie & UU Merek)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Menilai kekuatan daya pembeda intrinsik merek untuk mencegah penolakan atas dasar tanda generik atau deskriptif (Pasal 20 UU Merek).
            </p>

            {/* Visual Spectrum Bar */}
            <div className="space-y-2 mb-4">
              <div className="grid grid-cols-5 gap-1 text-[11px] text-center font-semibold">
                {spectrumLevels.map((lvl) => {
                  const isCurrent = distinctiveness.classification.toLowerCase().includes(lvl.key.toLowerCase());
                  return (
                    <div
                      key={lvl.key}
                      className={`py-1 px-1 rounded transition text-[10px] sm:text-xs ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-md font-bold ring-2 ring-indigo-400'
                          : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      {lvl.key}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 px-1 font-mono">
                <span>&larr; Lemah / Tidak Dapat Didaftarkan</span>
                <span>Kuat / Daya Perlindungan Tinggi &rarr;</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Klasifikasi: <span className="text-indigo-400 font-bold">{distinctiveness.classification}</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  Kekuatan Proteksi: {distinctiveness.score}/100
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {distinctiveness.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* DuPont Likelihood of Confusion Pillars */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Scale className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">
              4 Pilar Penilaian Persamaan Pada Pokoknya (Pasal 21 UU Merek)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Kriteria substantif yang digunakan oleh Pemeriksa Merek DJKI untuk menerbitkan usulan penolakan pendaftaran.
          </p>

          <div className="space-y-3.5">
            {/* Phonetic */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-300">1. Kemiripan Bunyi & Fonetik</span>
                <span className={`font-mono font-bold text-[11px] px-1.5 rounded border ${getScoreColor(likelihoodOfConfusion.phonetic.score)}`}>
                  {likelihoodOfConfusion.phonetic.score}% Konflik
                </span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(likelihoodOfConfusion.phonetic.score)}`}
                  style={{ width: `${likelihoodOfConfusion.phonetic.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {likelihoodOfConfusion.phonetic.analysis}
              </p>
            </div>

            {/* Visual */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-300">2. Kemiripan Visual & Bentuk Tulisan</span>
                <span className={`font-mono font-bold text-[11px] px-1.5 rounded border ${getScoreColor(likelihoodOfConfusion.visual.score)}`}>
                  {likelihoodOfConfusion.visual.score}% Konflik
                </span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(likelihoodOfConfusion.visual.score)}`}
                  style={{ width: `${likelihoodOfConfusion.visual.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {likelihoodOfConfusion.visual.analysis}
              </p>
            </div>

            {/* Commercial Impression */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-300">3. Kesan Konseptual & Makna Komersial</span>
                <span className={`font-mono font-bold text-[11px] px-1.5 rounded border ${getScoreColor(likelihoodOfConfusion.commercialImpression.score)}`}>
                  {likelihoodOfConfusion.commercialImpression.score}% Konflik
                </span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(likelihoodOfConfusion.commercialImpression.score)}`}
                  style={{ width: `${likelihoodOfConfusion.commercialImpression.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {likelihoodOfConfusion.commercialImpression.analysis}
              </p>
            </div>

            {/* Channels of Trade */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-300">4. Kesamaan Saluran Perdagangan & Konsumen</span>
                <span className={`font-mono font-bold text-[11px] px-1.5 rounded border ${getScoreColor(likelihoodOfConfusion.tradeChannels.score)}`}>
                  {likelihoodOfConfusion.tradeChannels.score}% Konflik
                </span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(likelihoodOfConfusion.tradeChannels.score)}`}
                  style={{ width: `${likelihoodOfConfusion.tradeChannels.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {likelihoodOfConfusion.tradeChannels.analysis}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan & Disclaimer Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pre-Registration Strategy Roadmap */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">
              Rencana Aksi & Rekomendasi Pra-Pendaftaran Merek
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Langkah taktis yang direkomendasikan sebelum mengajukan permohonan resmi guna menghindari sanggahan atau penolakan substantif:
          </p>

          <ul className="space-y-2.5">
            {actionPlan.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-indigo-500/30">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Examiner Disclaimer Advice */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">
                Catatan Pelepasan Hak (Disclaimer)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Apakah Pemeriksa Merek DJKI akan mensyaratkan pelepasan hak atas kata tertentu?
            </p>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
              {disclaimerAdvice || 'Tidak ada kata umum yang memerlukan pelepasan hak (disclaimer) wajib.'}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Disclaimer atas kata generik mempercepat proses pendaftaran tanpa mengorbankan perlindungan nama utama merek.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
