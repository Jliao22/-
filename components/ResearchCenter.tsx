import React, { useState, useRef, useEffect } from 'react';
import { Search, Bot, ExternalLink, Loader2, BookOpen } from 'lucide-react';
import { ChatMessage } from '../types';
import { searchInflammationResearch } from '../services/geminiService';

const SUGGESTED_QUERIES = [
  "慢性發炎如何影響大腦前額葉？",
  "腸道菌群與焦慮決策的關係",
  "細胞因子(Cytokines)對風險評估的影響",
  "睡眠不足引起的發炎如何改變社交判斷？"
];

const ResearchCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '你好，我是你的醫學研究助理。我可以幫你搜尋並整理關於「身體發炎」與「決策/認知功能」關聯的最新科學研究。請嘗試輸入問題，或點擊下方的範例。'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: searchQuery
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const result = await searchInflammationResearch(searchQuery);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text,
        sources: result.sources
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        // Error handling is managed in service, but safety net here
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: '發生未預期的錯誤，請稍後再試。'
        }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Bot className="w-6 h-6 text-indigo-600" />
                AI 智庫：發炎與決策研究
            </h2>
            <p className="text-sm text-slate-500 mt-1">使用 Gemini 2.5 Flash + Google Search Grounding 搜尋實證醫學資料</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-5 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 shadow-sm'}`}>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                 <p className="whitespace-pre-wrap leading-relaxed text-base">{msg.text}</p>
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> 資料來源：
                    </p>
                    <ul className="space-y-1">
                        {msg.sources.map((source, idx) => (
                            <li key={idx}>
                                <a 
                                    href={source.uri} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1 truncate max-w-full hover:underline"
                                >
                                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                    {source.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                    <span className="text-sm text-slate-500">正在分析文獻與搜尋最新研究...</span>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        {messages.length < 2 && (
            <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_QUERIES.map((q, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSearch(q)}
                        className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors border border-indigo-100"
                    >
                        {q}
                    </button>
                ))}
            </div>
        )}
        
        <div className="relative">
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                placeholder="輸入你想了解的健康因子與決策關聯..."
                className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-slate-700 placeholder-slate-400"
                disabled={isLoading}
            />
            <button 
                onClick={() => handleSearch(query)}
                disabled={isLoading || !query.trim()}
                className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Search className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchCenter;