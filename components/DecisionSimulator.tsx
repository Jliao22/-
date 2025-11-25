import React, { useState } from 'react';
import { SimulationScenario } from '../types';
import { ArrowRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const SCENARIOS: SimulationScenario[] = [
  {
    id: 1,
    title: "跨國合作案談判",
    context: "你正在與一家潛在的大型跨國合作夥伴進行最後階段的談判。對方提出了一個條款，要求你降低 15% 的利潤，但承諾未來會有更大的訂單量。談判已持續了 4 個小時。",
    healthyResponse: {
      action: "暫停並分析長期價值",
      reasoning: "身體狀態良好時，前額葉皮質運作正常，能夠抑制想儘快結束會議的衝動。你能計算 CLV (客戶終身價值)，並提出反方案：降低 10% 但要求縮短付款週期。",
      outcome: "成功達成雙贏協議，公司獲利與現金流皆優化。"
    },
    inflamedResponse: {
      action: "不耐煩地接受或憤怒拒絕",
      reasoning: "慢性發炎導致血糖調節不穩與皮質醇升高。你的大腦處於『戰或逃』模式，無法忍受不確定性。你要麼為了想趕快回家睡覺而直接接受(損失利潤)，要麼因為對方的強勢感到被威脅而憤怒拒絕(損失客戶)。",
      outcome: "錯失良機或利潤嚴重受損，事後感到後悔。"
    }
  },
  {
    id: 2,
    title: "團隊衝突處理",
    context: "專案經理與技術負責人在會議上因為進度問題發生激烈爭執，氣氛尷尬，所有人都看著你等仲裁。",
    healthyResponse: {
      action: "展現同理心並引導解決",
      reasoning: "迷走神經張力良好，情緒調節能力強。你能聽出雙方的焦慮點，並將對話從『人身攻擊』引導回『問題解決』。",
      outcome: "團隊凝聚力增強，問題被有效拆解。"
    },
    inflamedResponse: {
      action: "過度反應或逃避",
      reasoning: "神經發炎降低了你的情緒閾值。你會覺得他們的爭吵是在『找你麻煩』。你可能會大吼『夠了！照我說的做！』(獨裁)，或是直接走出會議室(逃避)。",
      outcome: "團隊士氣低落，關鍵問題被掩蓋，埋下專案失敗的種子。"
    }
  }
];

const DecisionSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [revealed, setRevealed] = useState<'healthy' | 'inflamed' | null>(null);

  const scenario = SCENARIOS[activeScenario];

  const handleNext = () => {
    setRevealed(null);
    setActiveScenario((prev) => (prev + 1) % SCENARIOS.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="p-8 border-b border-slate-100 bg-slate-50">
        <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase">Scenario 0{scenario.id}</span>
            <span className="text-xs text-slate-400">{activeScenario + 1} / {SCENARIOS.length}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{scenario.title}</h2>
        <p className="text-slate-600 leading-relaxed text-lg">{scenario.context}</p>
      </div>

      <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
        {/* Healthy Path */}
        <div 
            onClick={() => setRevealed('healthy')}
            className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 relative overflow-hidden group ${revealed === 'healthy' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'}`}
        >
            <div className="flex items-center gap-3 mb-4">
                <CheckCircle className={`w-6 h-6 ${revealed === 'healthy' ? 'text-emerald-600' : 'text-slate-300 group-hover:text-emerald-400'}`} />
                <h3 className="text-lg font-bold text-slate-700">低發炎 / 健康狀態</h3>
            </div>
            
            {revealed === 'healthy' ? (
                <div className="animate-in fade-in duration-500">
                    <p className="text-xl font-bold text-emerald-800 mb-3">{scenario.healthyResponse.action}</p>
                    <p className="text-slate-600 text-sm mb-4">{scenario.healthyResponse.reasoning}</p>
                    <div className="bg-white/60 p-3 rounded-lg text-emerald-900 font-medium text-sm border border-emerald-100">
                        結果：{scenario.healthyResponse.outcome}
                    </div>
                </div>
            ) : (
                <div className="h-32 flex items-center justify-center text-slate-400 text-sm font-medium">
                    點擊查看此狀態下的決策路徑
                </div>
            )}
        </div>

        {/* Inflamed Path */}
        <div 
            onClick={() => setRevealed('inflamed')}
            className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 relative overflow-hidden group ${revealed === 'inflamed' ? 'border-rose-500 bg-rose-50' : 'border-slate-200 hover:border-rose-300 hover:shadow-md'}`}
        >
            <div className="flex items-center gap-3 mb-4">
                <XCircle className={`w-6 h-6 ${revealed === 'inflamed' ? 'text-rose-600' : 'text-slate-300 group-hover:text-rose-400'}`} />
                <h3 className="text-lg font-bold text-slate-700">高發炎 / 疲勞狀態</h3>
            </div>

            {revealed === 'inflamed' ? (
                <div className="animate-in fade-in duration-500">
                    <p className="text-xl font-bold text-rose-800 mb-3">{scenario.inflamedResponse.action}</p>
                    <p className="text-slate-600 text-sm mb-4">{scenario.inflamedResponse.reasoning}</p>
                    <div className="bg-white/60 p-3 rounded-lg text-rose-900 font-medium text-sm border border-rose-100">
                        結果：{scenario.inflamedResponse.outcome}
                    </div>
                </div>
            ) : (
                 <div className="h-32 flex items-center justify-center text-slate-400 text-sm font-medium">
                    點擊查看此狀態下的決策路徑
                </div>
            )}
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-white flex justify-end">
        <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
            {activeScenario === SCENARIOS.length - 1 ? <><RotateCcw className="w-4 h-4" /> 重來</> : <><ArrowRight className="w-4 h-4" /> 下一情境</>}
        </button>
      </div>
    </div>
  );
};

export default DecisionSimulator;