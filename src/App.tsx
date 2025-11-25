import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { LayoutDashboard, Activity, BrainCircuit, Search, HeartPulse, Download } from 'lucide-react';
import BodyMap from './components/BodyMap';
import DecisionSimulator from './components/DecisionSimulator';
import ResearchCenter from './components/ResearchCenter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DASHBOARD_DATA = [
  { name: '衝動控制', healthy: 85, inflamed: 30 },
  { name: '風險評估', healthy: 90, inflamed: 45 },
  { name: '情緒穩定', healthy: 80, inflamed: 25 },
  { name: '記憶存取', healthy: 75, inflamed: 50 },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    // PWA Install Prompt Listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  // Desktop Sidebar Item
  const SidebarItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === view 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  // Mobile Bottom Nav Item
  const MobileNavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center p-2 w-full transition-all duration-200 active:scale-95 ${
        currentView === view ? 'text-indigo-600' : 'text-slate-400'
      }`}
    >
      <div className={`relative p-1 rounded-xl ${currentView === view ? 'bg-indigo-50' : ''}`}>
        <Icon className={`w-6 h-6 ${currentView === view ? 'fill-indigo-600 text-indigo-600' : ''}`} strokeWidth={currentView === view ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-medium mt-1 ${currentView === view ? 'text-indigo-700' : ''}`}>{label}</span>
    </button>
  );

  return (
    // Use h-[100dvh] for better mobile browser support (addresses address bar resize)
    <div className="flex flex-col md:flex-row h-[100dvh] bg-slate-50 overflow-hidden">
      
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col p-6 z-10 shrink-0 h-full">
        <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <HeartPulse className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Clarity <span className="text-indigo-600">決策生機</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem view={ViewState.DASHBOARD} label="總覽儀表板" icon={LayoutDashboard} />
          <SidebarItem view={ViewState.BODY_MAP} label="發炎地圖" icon={Activity} />
          <SidebarItem view={ViewState.SIMULATION} label="決策模擬戰" icon={BrainCircuit} />
          <SidebarItem view={ViewState.RESEARCH} label="AI 智庫研究" icon={Search} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="bg-indigo-50 p-4 rounded-xl">
                <p className="text-xs text-indigo-600 font-semibold mb-1">健康提示</p>
                <p className="text-xs text-indigo-800 leading-relaxed">
                    每日冥想 10 分鐘可顯著降低 IL-6 發炎因子，提升決策品質。
                </p>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        
        {/* Mobile Header (App Bar) */}
        <header className="md:hidden bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm shrink-0">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-sm">
                  <HeartPulse className="text-white w-5 h-5" />
                </div>
                <h1 className="text-lg font-bold text-slate-800">Clarity 決策生機</h1>
            </div>
            {showInstallBtn && (
              <button 
                onClick={handleInstallClick}
                className="flex items-center gap-1 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md active:scale-95 transition-transform"
              >
                <Download className="w-3 h-3" />
                安裝 App
              </button>
            )}
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full scroll-smooth">
          <div className="max-w-5xl mx-auto min-h-full pb-20 md:pb-0">
            {currentView === ViewState.DASHBOARD && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Welcome Card */}
                    <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <BrainCircuit className="w-32 h-32" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 relative z-10">優化生理，精準決策</h2>
                        <p className="text-indigo-100 text-sm md:text-lg leading-relaxed max-w-2xl relative z-10">
                            科學研究證實，慢性發炎不僅影響身體健康，更是導致「決策疲勞」、「風險規避」與「情緒化判斷」的主因。
                        </p>
                        <button 
                            onClick={() => setCurrentView(ViewState.BODY_MAP)}
                            className="mt-6 px-5 py-2.5 bg-white text-indigo-700 font-bold text-sm rounded-lg hover:bg-indigo-50 transition-colors shadow-md active:scale-95 transform relative z-10"
                        >
                            開始探索生理影響
                        </button>
                    </div>

                    {/* Quick Stat */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
                         <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-50 rounded-full opacity-50" />
                         <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Activity className="w-3 h-3" /> 發炎代價
                         </h3>
                         <div className="text-4xl font-bold text-slate-800 mb-1">30% <span className="text-lg text-slate-400 font-normal">下降</span></div>
                         <p className="text-slate-600 text-sm mt-2">
                             高發炎指數 (CRP) 狀態下，大腦前額葉皮質的執行功能平均下降幅度。
                         </p>
                    </div>
                </div>

                {/* Chart Section - Fixed Responsive Container Issue */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-80 md:h-96 flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 shrink-0">
                      <LayoutDashboard className="w-5 h-5 text-slate-400" />
                      發炎狀態 vs. 認知功能表現
                    </h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={DASHBOARD_DATA}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} interval={0} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                                />
                                <Bar dataKey="healthy" name="健康狀態" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                <Bar dataKey="inflamed" name="發炎狀態" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
              </div>
            )}

            {currentView === ViewState.BODY_MAP && (
                 <div className="animate-in fade-in zoom-in-95 duration-300">
                    <BodyMap />
                 </div>
            )}

            {currentView === ViewState.SIMULATION && (
                <div className="h-full animate-in fade-in zoom-in-95 duration-300 pb-8">
                    <DecisionSimulator />
                </div>
            )}

            {currentView === ViewState.RESEARCH && (
                <div className="h-[calc(100dvh-140px)] md:h-[calc(100vh-6rem)] animate-in fade-in zoom-in-95 duration-300">
                    <ResearchCenter />
                </div>
            )}
          </div>
        </main>

        {/* Mobile Bottom Navigation - Sticky */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 pt-2 pb-[env(safe-area-inset-bottom,20px)] flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0">
            <MobileNavItem view={ViewState.DASHBOARD} label="儀表板" icon={LayoutDashboard} />
            <MobileNavItem view={ViewState.BODY_MAP} label="發炎地圖" icon={Activity} />
            <MobileNavItem view={ViewState.SIMULATION} label="決策模擬" icon={BrainCircuit} />
            <MobileNavItem view={ViewState.RESEARCH} label="AI 智庫" icon={Search} />
        </div>
      </div>
    </div>
  );
};

export default App;
