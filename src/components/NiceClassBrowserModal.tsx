import React, { useState } from 'react';
import { X, Search, BookOpen, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { NICE_CLASSES, NiceClassInfo } from '../data/niceClasses';

interface NiceClassBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClass?: NiceClassInfo | null;
}

export const NiceClassBrowserModal: React.FC<NiceClassBrowserModalProps> = ({
  isOpen,
  onClose,
  initialClass,
}) => {
  const [selectedClass, setSelectedClass] = useState<NiceClassInfo>(
    initialClass || NICE_CLASSES[8] // Kelas 9 sebagai default
  );
  const [activeTab, setActiveTab] = useState<'All' | 'Barang' | 'Jasa'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredClasses = NICE_CLASSES.filter((c) => {
    const matchesTab = activeTab === 'All' || c.type === activeTab;
    const matchesSearch =
      c.number.toString().includes(searchQuery) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.officialHeading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.commonExamples.some((ex) => ex.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Direktori Klasifikasi Nice (Edisi 11 & 12 - DJKI Kemenkumham RI)
              </h3>
              <p className="text-xs text-slate-400">
                Daftar Resmi 45 Kelas Internasional Barang dan Jasa untuk Pendaftaran Merek Dagang
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

        {/* 2-Pane Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar: Class List */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col bg-slate-950/50">
            {/* Search and Tabs */}
            <div className="p-3 border-b border-slate-800 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari 45 kelas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex rounded-lg bg-slate-900 p-0.5 text-xs border border-slate-800">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`flex-1 py-1 rounded text-center transition ${
                    activeTab === 'All' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Semua (45)
                </button>
                <button
                  onClick={() => setActiveTab('Barang')}
                  className={`flex-1 py-1 rounded text-center transition ${
                    activeTab === 'Barang' ? 'bg-sky-950 text-sky-300 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Barang (1-34)
                </button>
                <button
                  onClick={() => setActiveTab('Jasa')}
                  className={`flex-1 py-1 rounded text-center transition ${
                    activeTab === 'Jasa' ? 'bg-amber-950 text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Jasa (35-45)
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-1.5">
              {filteredClasses.map((cls) => {
                const isSelected = selectedClass?.number === cls.number;
                return (
                  <button
                    key={cls.number}
                    onClick={() => setSelectedClass(cls)}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/25 border border-indigo-500/50 text-white'
                        : 'hover:bg-slate-900/80 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs text-indigo-400">
                          Kelas {cls.number}
                        </span>
                        <span
                          className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                            cls.type === 'Barang'
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {cls.type}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate max-w-[190px]">
                        {cls.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Pane: Class Full Dossier */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-slate-900">
            {selectedClass ? (
              <div className="space-y-5">
                {/* Header */}
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <span className="font-mono text-2xl font-extrabold text-white">
                      Kelas Nice {selectedClass.number}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        selectedClass.type === 'Barang'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      Kategori {selectedClass.type}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                      {selectedClass.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-indigo-300">
                    {selectedClass.title}
                  </h2>
                </div>

                {/* Official Heading */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Judul Resmi (Official Class Heading):
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {selectedClass.officialHeading}
                  </p>
                </div>

                {/* Common Items Included */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Contoh Barang / Jasa yang Termasuk:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedClass.commonExamples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-200 flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exclusions / Does Not Include */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Pengecualian Khusus & Lintas Kelas:</span>
                  </h4>
                  <div className="space-y-1.5">
                    {selectedClass.exclusions.map((exc, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-rose-950/15 border border-rose-900/30 text-xs text-rose-300 flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Examiner Filing Tip */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-amber-300 mb-1">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Tips Praktik Pemeriksa Merek DJKI:</span>
                  </div>
                  <p className="leading-relaxed">
                    {selectedClass.filingTip}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
