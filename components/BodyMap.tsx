import React, { useState } from 'react';
import { BodyPartInfo } from '../types';
import { Activity, Brain, Zap, AlertCircle, ShieldCheck, Info } from 'lucide-react';

const BODY_DATA: BodyPartInfo[] = [
  {
    id: 'brain',
    name: '大腦 (神經發炎)',
    inflammationType: 'Chronic',
    symptoms: ['腦霧', '注意力不集中', '記憶衰退'],
    cognitiveImpact: '前額葉皮質功能下降，導致執行功能受損。',
    decisionError: '決策疲勞：傾向於選擇阻力最小的路徑，無法進行複雜的長期規劃。',
    prevention: '優質睡眠、Omega-3 攝取、冥想減壓。'
  },
  {
    id: 'gut',
    name: '腸道 (微生態失調)',
    inflammationType: 'Chronic',
    symptoms: ['腹脹', '消化不良', '焦慮感'],
    cognitiveImpact: '腸腦軸 (Gut-Brain Axis) 失衡，血清素分泌異常。',
    decisionError: '風險規避過度：生理性焦慮導致過度放大風險，錯失機會。',
    prevention: '益生菌、高纖飲食、減少加工糖分。'
  },
  {
    id: 'liver',
    name: '肝臟 (代謝壓力)',
    inflammationType: 'Chronic',
    symptoms: ['長期疲勞', '易怒', '失眠'],
    cognitiveImpact: '體內毒素累積影響情緒調節中樞。',
    decisionError: '情緒化決策：容易因微小挫折暴怒，做出衝動決策。',
    prevention: '減少酒精、十字花科蔬菜、適量運動。'
  },
  {
    id: 'joints',
    name: '關節 (急性發炎)',
    inflammationType: 'Acute',
    symptoms: ['紅腫熱痛', '活動受限'],
    cognitiveImpact: '疼痛訊號持續佔用大腦頻寬。',
    decisionError: '短視近利：疼痛迫使大腦尋求立即舒適，無法忍受延遲滿足。',
    prevention: '抗發炎飲食 (薑黃)、物理治療。'
  }
];

const BodyMap: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<BodyPartInfo>(BODY_DATA[0]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] lg:h-full gap-4 md:gap-6">
      
      {/* Visual Side - Mobile Optimized */}
      <div className="flex-none lg:flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-[400px]">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-red-600 opacity-20" />
        <h2 className="text-base md:text-xl font-bold text-slate-700 mb-4 flex items-center gap-2 z-10 w-full justify-center">
            <Activity className="w-5 h-5 text-red-500 animate-pulse" />
            點擊發光部位
        </h2>

        {/* Abstract Body Container */}
        <div className="relative w-48 h-64 md:w-64 md:h-96 bg-slate-100 rounded-[3rem] border-4 border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center z-10 transition-all duration-300">
             {/* Abstract Body Layout */}
             <div className="absolute top-6 md:top-8 flex flex-col gap-4 md:gap-8 items-center z-10 w-full">
                
                {/* Brain Node */}
                <button 
                    onClick={() => setSelectedPart(BODY_DATA[0])}
                    className={`relative p-3 rounded-full transition-all duration-300 active:scale-95 touch-manipulation ${
                        selectedPart.id === 'brain' 
                        ? 'bg-red-500 text-white shadow-lg scale-110 ring-4 ring-red-100' 
                        : 'bg-white text-slate-400 hover:bg-red-50 shadow-sm'
                    }`}
                >
                    <span className={`absolute inset-0 rounded-full bg-red-400 opacity-0 ${selectedPart.id !== 'brain' && 'animate-ping opacity-20'}`}></span>
                    <Brain className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                
                {/* Liver Node Area */}
                <div className="flex gap-8">
                     <button 
                        onClick={() => setSelectedPart(BODY_DATA[2])}
                        className={`relative p-2.5 rounded-full transition-all duration-300 active:scale-95 touch-manipulation ${
                            selectedPart.id === 'liver' 
                            ? 'bg-red-500 text-white shadow-lg scale-110 ring-4 ring-red-100' 
                            : 'bg-white text-slate-400 hover:bg-red-50 shadow-sm'
                        }`}
                    >
                        <Zap className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Gut Node */}
                <button 
                    onClick={() => setSelectedPart(BODY_DATA[1])}
                    className={`relative p-3 rounded-full transition-all duration-300 active:scale-95 touch-manipulation ${
                        selectedPart.id === 'gut' 
                        ? 'bg-red-500 text-white shadow-lg scale-110 ring-4 ring-red-100' 
                        : 'bg-white text-slate-400 hover:bg-red-50 shadow-sm'
                    }`}
                >
                    <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-current rounded-full border-dashed" />
                </button>

                 {/* Joints/Body Node */}
                 <button 
                    onClick={() => setSelectedPart(BODY_DATA[3])}
                    className={`mt-1 md:mt-4 p-2.5 rounded-full transition-all duration-300 active:scale-95 touch-manipulation ${
                        selectedPart.id === 'joints' 
                        ? 'bg-red-500 text-white shadow-lg scale-110 ring-4 ring-red-100' 
                        : 'bg-white text-slate-400 hover:bg-red-50 shadow-sm'
                    }`}
                >
                    <Activity className="w-5 h-5 md:w-6 md:h-6" />
                </button>
             </div>

             {/* Background Grid/Pulse Effect */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200/50 to-transparent rounded-[3rem] opacity-50" />
        </div>
      </div>

      {/* Info Side - Card Design */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 flex-1 transition-all duration-300">
            <div className="flex flex-col justify-between items-start mb-4 gap-2 border-b border-slate-100 pb-3">
                <div className="flex justify-between w-full items-center">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800">{selectedPart.name}</h3>
                    <Info className="w-5 h-5 text-slate-300" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${selectedPart.inflammationType === 'Acute' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedPart.inflammationType === 'Acute' ? '急性發炎' : '慢性發炎'}
                </span>
            </div>

            <div className="space-y-5">
                {/* Cognitive Impact Box */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                    <h4 className="text-amber-800 font-bold flex items-center gap-2 mb-2 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        認知決策錯誤
                    </h4>
                    <p className="text-slate-800 text-sm md:text-base leading-relaxed font-medium">
                        {selectedPart.decisionError}
                    </p>
                </div>

                {/* Symptoms */}
                <div>
                    <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">相關症狀</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedPart.symptoms.map((s, i) => (
                            <span key={i} className="px-2.5 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200">{s}</span>
                        ))}
                    </div>
                </div>

                {/* Mechanism */}
                <div>
                     <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">神經機制</h4>
                     <p className="text-slate-500 text-xs md:text-sm">{selectedPart.cognitiveImpact}</p>
                </div>
            </div>
        </div>

        {/* Prevention Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5 shadow-sm">
             <h4 className="text-emerald-800 font-bold flex items-center gap-2 mb-2 text-sm">
                <ShieldCheck className="w-5 h-5" />
                改善對策
            </h4>
            <p className="text-emerald-700 text-sm font-medium">
                {selectedPart.prevention}
            </p>
        </div>
      </div>
    </div>
  );
};

export default BodyMap;