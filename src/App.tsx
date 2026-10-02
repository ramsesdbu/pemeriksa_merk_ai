/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  Scale,
  Layers,
  AlertTriangle,
  Download,
  Table as TableIcon,
  Columns,
  CheckCircle2,
} from 'lucide-react';

import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { RegisteredTable } from './components/RegisteredTable';
import { UnregisteredTable } from './components/UnregisteredTable';
import { UnifiedTable } from './components/UnifiedTable';
import { NiceClassGrid } from './components/NiceClassGrid';
import { LikelihoodAnalysis } from './components/LikelihoodAnalysis';
import { DetailModal } from './components/DetailModal';
import { NiceClassBrowserModal } from './components/NiceClassBrowserModal';
import { GoodsSpecGeneratorModal } from './components/GoodsSpecGeneratorModal';
import { ExportDossierModal } from './components/ExportDossierModal';

import { PRESET_SEARCHES, PresetSearch, TrademarkAnalysisResult } from './data/sampleSearches';
import { NiceClassInfo } from './data/niceClasses';

export default function App() {
  // Pre-load preset lokal Indonesia (SOLARIA)
  const [analysisResult, setAnalysisResult] = useState<TrademarkAnalysisResult | null>(
    PRESET_SEARCHES[0].presetData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tab aktif: 'comparison' (komparasi terdaftar vs belum terdaftar) | 'unified' (matriks lengkap) | 'grid' (peta 45 kelas) | 'likelihood' (analisis hukum)
  const [activeTab, setActiveTab] = useState<'comparison' | 'unified' | 'grid' | 'likelihood'>('comparison');

  // Status modal
  const [inspectedItem, setInspectedItem] = useState<any | null>(null);
  const [isInspectedRegistered, setIsInspectedRegistered] = useState(false);
  const [isNiceBrowserOpen, setIsNiceBrowserOpen] = useState(false);
  const [browserInitialClass, setBrowserInitialClass] = useState<NiceClassInfo | null>(null);
  const [isSpecGeneratorOpen, setIsSpecGeneratorOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleSearch = async (params: {
    trademarkName: string;
    goodsServicesQuery: string;
    jurisdiction: string;
    selectedClasses: number[];
    searchDepth: 'standard' | 'deep';
  }) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/search-trademark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Penelusuran merek gagal. Silakan coba lagi.');
      }

      const data: TrademarkAnalysisResult = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Search error:', err);
      setErrorMsg(err.message || 'Terjadi kesalahan jaringan saat melakukan penelusuran.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: PresetSearch) => {
    setAnalysisResult(preset.presetData);
    setErrorMsg(null);
  };

  const handleInspect = (item: any, isRegistered: boolean) => {
    setInspectedItem(item);
    setIsInspectedRegistered(isRegistered);
  };

  const handleOpenClassInfo = (cls: NiceClassInfo) => {
    setBrowserInitialClass(cls);
    setIsNiceBrowserOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Global Header */}
      <Header
        onOpenNiceBrowser={() => {
          setBrowserInitialClass(null);
          setIsNiceBrowserOpen(true);
        }}
        onOpenSpecGenerator={() => setIsSpecGeneratorOpen(true)}
        onExportReport={() => setIsExportModalOpen(true)}
        hasResults={!!analysisResult}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7">
        {/* Search Cockpit & Filters */}
        <SearchForm
          onSearch={handleSearch}
          onSelectPreset={handleSelectPreset}
          isLoading={isLoading}
        />

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-slate-400 hover:text-white text-xs underline"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Results Presentation Container */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Clearance Summary Top Metrics Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 font-mono">
                      Usulan Nama Merek
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {analysisResult.jurisdiction}
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                    <span>"{analysisResult.trademarkName}"</span>
                    <span className="text-xs font-mono font-normal text-slate-400 self-end mb-1">
                      Dossier Pra-Pendaftaran
                    </span>
                  </h2>
                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    {analysisResult.executiveSummary}
                  </p>
                </div>

                {/* Score & Risk Meter */}
                <div className="flex items-center gap-4 self-start lg:self-center shrink-0">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[130px]">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Tingkat Risiko
                    </span>
                    <div
                      className={`text-2xl font-mono font-extrabold mt-0.5 ${
                        analysisResult.overallRiskScore > 65
                          ? 'text-rose-400'
                          : analysisResult.overallRiskScore > 35
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {analysisResult.riskLevel}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Skor Risiko {analysisResult.overallRiskScore}/100
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[130px]">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Daya Pembeda
                    </span>
                    <div className="text-lg font-bold text-indigo-400 mt-0.5">
                      {analysisResult.distinctiveness.classification.split(' ')[0]}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Proteksi {analysisResult.distinctiveness.score}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Counter badges breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-rose-300 font-mono">
                      {analysisResult.registeredGoodsServices.length}
                    </div>
                    <div className="text-[11px] text-rose-300/80 font-medium">
                      Konflik Terdaftar
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-emerald-300 font-mono">
                      {analysisResult.notRegisteredGoodsServices.length}
                    </div>
                    <div className="text-[11px] text-emerald-300/80 font-medium">
                      Barang/Jasa Tersedia
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-indigo-300 font-mono">
                      {analysisResult.niceClassSummary?.length || 4}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Kelas Dievaluasi
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-sky-300 font-mono">
                      {analysisResult.actionPlan?.length || 4}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Langkah Rekomendasi
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setActiveTab('comparison')}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeTab === 'comparison'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Columns className="w-4 h-4" />
                  <span>Komparasi (Terdaftar vs Belum Terdaftar)</span>
                </button>

                <button
                  onClick={() => setActiveTab('unified')}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeTab === 'unified'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <TableIcon className="w-4 h-4" />
                  <span>Matriks Lengkap Barang & Jasa</span>
                </button>

                <button
                  onClick={() => setActiveTab('grid')}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeTab === 'grid'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Peta 45 Kelas Nice</span>
                </button>

                <button
                  onClick={() => setActiveTab('likelihood')}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeTab === 'likelihood'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>Risiko Hukum & Persamaan Pada Pokoknya</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Unduh Laporan</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: Comparison View (Tabel Terdaftar & Tabel Belum Terdaftar) */}
            {activeTab === 'comparison' && (
              <div className="space-y-6">
                {/* Registered Conflicts Table */}
                <RegisteredTable
                  items={analysisResult.registeredGoodsServices}
                  onInspectItem={handleInspect}
                />

                {/* Available / Unregistered Table */}
                <UnregisteredTable
                  items={analysisResult.notRegisteredGoodsServices}
                  onInspectItem={handleInspect}
                />
              </div>
            )}

            {/* TAB CONTENT 2: Unified Master Table */}
            {activeTab === 'unified' && (
              <UnifiedTable
                registeredItems={analysisResult.registeredGoodsServices}
                unregisteredItems={analysisResult.notRegisteredGoodsServices}
                onInspectItem={handleInspect}
                trademarkName={analysisResult.trademarkName}
              />
            )}

            {/* TAB CONTENT 3: 45 Nice Classes Clearance Map */}
            {activeTab === 'grid' && (
              <NiceClassGrid
                analysisResult={analysisResult}
                onSelectClassInfo={handleOpenClassInfo}
              />
            )}

            {/* TAB CONTENT 4: Likelihood of Confusion & Action Plan */}
            {activeTab === 'likelihood' && (
              <LikelihoodAnalysis analysis={analysisResult} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">
              Asisten Pencarian Pra-Pendaftaran Merek AI (MarkClear)
            </span>
          </div>
          <p className="text-center sm:text-right text-[11px] text-slate-400">
            Sesuai dengan Klasifikasi Nice Edisi 11/12 & Pedoman Pemeriksaan Substantif Merek DJKI Kemenkumham RI (UU No. 20 Tahun 2016).
          </p>
        </div>
      </footer>

      {/* Modals */}
      <DetailModal
        isOpen={!!inspectedItem}
        onClose={() => setInspectedItem(null)}
        item={inspectedItem}
        isRegistered={isInspectedRegistered}
      />

      <NiceClassBrowserModal
        isOpen={isNiceBrowserOpen}
        onClose={() => setIsNiceBrowserOpen(false)}
        initialClass={browserInitialClass}
      />

      <GoodsSpecGeneratorModal
        isOpen={isSpecGeneratorOpen}
        onClose={() => setIsSpecGeneratorOpen(false)}
        defaultMarkName={analysisResult?.trademarkName || ''}
      />

      {analysisResult && (
        <ExportDossierModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          analysis={analysisResult}
        />
      )}
    </div>
  );
}
