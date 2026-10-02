import React, { useState } from 'react';
import { Search, Sparkles, SlidersHorizontal, Globe, Layers, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import { PRESET_SEARCHES, PresetSearch } from '../data/sampleSearches';
import { NICE_CLASSES } from '../data/niceClasses';

interface SearchFormProps {
  onSearch: (params: {
    trademarkName: string;
    goodsServicesQuery: string;
    jurisdiction: string;
    selectedClasses: number[];
    searchDepth: 'standard' | 'deep';
  }) => void;
  onSelectPreset: (preset: PresetSearch) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  onSelectPreset,
  isLoading,
}) => {
  const [trademarkName, setTrademarkName] = useState('');
  const [goodsServicesQuery, setGoodsServicesQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('DJKI (Indonesia - Kemenkumham RI)');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [searchDepth, setSearchDepth] = useState<'standard' | 'deep'>('standard');
  const [showClassPicker, setShowClassPicker] = useState(false);
  const [classFilterText, setClassFilterText] = useState('');

  const handlePresetClick = (preset: PresetSearch) => {
    setTrademarkName(preset.trademarkName);
    setGoodsServicesQuery(preset.query);
    setJurisdiction(preset.jurisdiction);
    setSelectedClasses(preset.targetClasses);
    onSelectPreset(preset);
  };

  const handleToggleClass = (classNum: number) => {
    if (selectedClasses.includes(classNum)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== classNum));
    } else {
      setSelectedClasses([...selectedClasses, classNum]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trademarkName.trim()) return;
    onSearch({
      trademarkName: trademarkName.trim(),
      goodsServicesQuery: goodsServicesQuery.trim(),
      jurisdiction,
      selectedClasses,
      searchDepth,
    });
  };

  const handleReset = () => {
    setTrademarkName('');
    setGoodsServicesQuery('');
    setSelectedClasses([]);
  };

  const filteredClasses = NICE_CLASSES.filter(
    (c) =>
      c.number.toString().includes(classFilterText) ||
      c.title.toLowerCase().includes(classFilterText.toLowerCase()) ||
      c.category.toLowerCase().includes(classFilterText.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl shadow-black/40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pemeriksaan Pra-Pendaftaran & Deteksi Konflik Merek</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Penelusuran Merek: Barang & Jasa Terdaftar vs. Belum Terdaftar
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ketahui jenis barang & jasa yang <span className="text-rose-400 font-semibold">sudah terdaftar</span> dengan merek serupa, dan temukan kategori yang <span className="text-emerald-400 font-semibold">belum terdaftar / aman</span> untuk didaftarkan.
          </p>
        </div>

        {/* Quick sample loader presets */}
        <div className="flex flex-col sm:items-end gap-1.5">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <span>Contoh Audit Pra-Pendaftaran:</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_SEARCHES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition flex items-center space-x-1"
                title={`${preset.trademarkName}: ${preset.description}`}
              >
                <span className="font-semibold text-indigo-400">{preset.trademarkName}</span>
                <span className="text-[10px] text-slate-400">({preset.tag})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Trademark Name Input */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Usulan Nama Merek Dagang <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={trademarkName}
                onChange={(e) => setTrademarkName(e.target.value)}
                placeholder="Contoh: SOLARIA, ZENPULSE, KOPINUSA"
                required
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white rounded-xl px-4 py-3 text-base font-medium placeholder-slate-500 transition"
              />
              {trademarkName && (
                <span className="absolute right-3 top-3 text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {trademarkName.length} karakter
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Merek kata, nama brand, akronim, atau istilah ciptaan yang ingin didaftarkan.
            </p>
          </div>

          {/* Jurisdiction Selector */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>Wilayah Hukum / Kantor Merek</span>
            </label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white rounded-xl px-3.5 py-3 text-sm font-medium transition cursor-pointer"
            >
              <option value="DJKI (Indonesia - Kemenkumham RI)">DJKI (Indonesia - Kemenkumham RI)</option>
              <option value="WIPO (Sistem Madrid - Internasional)">WIPO (Sistem Madrid - Internasional)</option>
              <option value="USPTO (Amerika Serikat)">USPTO (Amerika Serikat - Lanham Act)</option>
              <option value="EUIPO (Uni Eropa)">EUIPO (Uni Eropa - EUTM)</option>
              <option value="UKIPO (Inggris Raya)">UKIPO (Inggris Raya)</option>
              <option value="IP Australia">IP Australia</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Menerapkan standar pemeriksaan substantif & undang-undang merek terkait.
            </p>
          </div>

          {/* Search Depth */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Kedalaman Audit</span>
            </label>
            <select
              value={searchDepth}
              onChange={(e) => setSearchDepth(e.target.value as 'standard' | 'deep')}
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white rounded-xl px-3.5 py-3 text-sm font-medium transition cursor-pointer"
            >
              <option value="standard">Pemeriksaan Standar</option>
              <option value="deep">Audit Mendalam (4 Pilar Konflik)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Mengevaluasi fonetik, visual, konsep, dan saluran niaga.
            </p>
          </div>
        </div>

        {/* Goods / Services Description Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Rencana Produk, Jasa, atau Model Bisnis
            </label>
            <span className="text-[11px] text-slate-400">
              Deskripsi bebas atau jenis produk spesifik
            </span>
          </div>
          <textarea
            value={goodsServicesQuery}
            onChange={(e) => setGoodsServicesQuery(e.target.value)}
            rows={2}
            placeholder="Contoh: Gelang pintar pelacak kebugaran, sensor detak jantung, aplikasi latihan pernapasan di smartphone, dan kedai minuman sehat..."
            className="w-full bg-slate-950/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white rounded-xl p-3 text-sm font-normal placeholder-slate-500 transition resize-none"
          />
        </div>

        {/* Selected Nice Classes & Quick Class Selector Toggle */}
        <div className="pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowClassPicker(!showClassPicker)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  {showClassPicker ? 'Sembunyikan Pilihan Kelas Nice' : 'Pilih Target Kelas Nice (1-45)'}
                </span>
                {selectedClasses.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-600 text-white font-mono">
                    {selectedClasses.length} kelas dipilih
                  </span>
                )}
              </button>

              {selectedClasses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedClasses([])}
                  className="text-xs text-slate-400 hover:text-slate-200 underline"
                >
                  Reset kelas
                </button>
              )}
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <span>Sektor Populer:</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedClasses([9, 42]);
                  setGoodsServicesQuery('Aplikasi seluler Android/iOS, Software as a Service (SaaS), dan platform cloud AI');
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                SaaS & IT (9, 42)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedClasses([25, 35]);
                  setGoodsServicesQuery('Pakaian, kaos, sepatu sneakers, dan toko retail online busana');
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                Pakaian & Retail (25, 35)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedClasses([30, 43]);
                  setGoodsServicesQuery('Biji kopi sangrai, kopi bubuk kemasan, dan kedai kafe tempat minum kopi');
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                Kopi & Kafe (30, 43)
              </button>
            </div>
          </div>

          {/* Collapsible Class Picker */}
          {showClassPicker && (
            <div className="mt-3 p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Cari kelas (contoh: 'kopi', 'pakaian', 'aplikasi', '35')..."
                  value={classFilterText}
                  onChange={(e) => setClassFilterText(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 w-full max-w-md focus:border-indigo-500 focus:outline-none"
                />
                <div className="text-[11px] text-slate-400">
                  <span className="text-sky-400">1-34 Barang</span> | <span className="text-amber-400">35-45 Jasa</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {filteredClasses.map((cls) => {
                  const isSelected = selectedClasses.includes(cls.number);
                  const isGoods = cls.type === 'Barang';
                  return (
                    <button
                      key={cls.number}
                      type="button"
                      onClick={() => handleToggleClass(cls.number)}
                      className={`text-left p-1.5 rounded-lg border text-xs transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono font-bold text-xs">Kls. {cls.number}</span>
                        <span
                          className={`text-[9px] px-1 rounded ${
                            isGoods ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {isGoods ? 'B' : 'J'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate mt-0.5" title={cls.title}>
                        {cls.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="text-xs text-slate-400 flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>
              Pengecekan pra-pendaftaran menghindarkan Anda dari biaya Penerimaan Negara Bukan Pajak (PNBP) yang hangus akibat penolakan merek.
            </span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {(trademarkName || goodsServicesQuery) && (
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bersihkan</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !trademarkName.trim()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Memeriksa Pangkalan Data Merek...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Mulai Penelusuran Merek</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
