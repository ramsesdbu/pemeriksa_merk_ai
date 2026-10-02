import React from 'react';
import { BookOpen, Sparkles, Scale, Download } from 'lucide-react';

interface HeaderProps {
  onOpenNiceBrowser: () => void;
  onOpenSpecGenerator: () => void;
  onExportReport: () => void;
  hasResults: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNiceBrowser,
  onOpenSpecGenerator,
  onExportReport,
  hasResults,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-100 tracking-tight text-lg">
                MarkClear
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Asisten Pra-Pendaftaran Merek AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Analisis Penelusuran Merek & Klasifikasi Nice: Barang Terdaftar vs. Belum Terdaftar
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenNiceBrowser}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition"
            title="Lihat seluruh 45 Kelas Klasifikasi Nice"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Kelas Nice (1-45)</span>
            <span className="sm:hidden">Kelas Nice</span>
          </button>

          <button
            onClick={onOpenSpecGenerator}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition"
            title="Rumuskan uraian barang/jasa baku sesuai standar DJKI"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Perumus Uraian Barang</span>
            <span className="sm:hidden">Drafter Uraian</span>
          </button>

          {hasResults && (
            <button
              onClick={onExportReport}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Dossier</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
