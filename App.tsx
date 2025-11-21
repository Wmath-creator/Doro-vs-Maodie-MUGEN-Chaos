
import React, { useState, useRef } from 'react';
import { GameEngine } from './components/GameEngine';
import { LEVELS } from './constants';

export default function App() {
  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'GAMEOVER'>('MENU');
  const [lastWinner, setLastWinner] = useState<string | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);

  // Custom Skin State
  const [doroSkin, setDoroSkin] = useState<string | null>(null);
  const [maodieSkin, setMaodieSkin] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentLevel(0);
    setGameKey(prev => prev + 1);
    setGameState('PLAYING');
  };

  const handleGameOver = (winner: string) => {
    setLastWinner(winner);
    setGameState('GAMEOVER');
  };

  const handleBackToMenu = () => {
    setGameState('MENU');
    setLastWinner(null);
    setCurrentLevel(0);
  };

  const handleRetryLevel = () => {
    setGameKey(prev => prev + 1);
    setGameState('PLAYING');
    setLastWinner(null);
  };

  const handleNextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setGameKey(prev => prev + 1);
      setGameState('PLAYING');
      setLastWinner(null);
    } else {
        // Game Clear Logic if needed, otherwise just stay on gameover screen
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, char: 'DORO' | 'MAODIE') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          if (char === 'DORO') setDoroSkin(ev.target.result as string);
          else setMaodieSkin(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isDoroWin = lastWinner === 'DORO WINS';
  const isFinalLevel = currentLevel === LEVELS.length - 1;

  return (
    // h-[100dvh] uses dynamic viewport height to prevent mobile browser bar issues
    <div className="h-[100dvh] w-full bg-gray-900 flex flex-col font-mono text-white overflow-hidden selection:bg-pink-500 selection:text-white touch-none">
      {gameState === 'MENU' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 md:space-y-8 relative z-10 p-4">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none -z-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-600 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-900 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="text-center relative">
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg tracking-tighter transform -skew-x-6">
              Doro vs 耄耋
            </h1>
            <h2 className="text-xl md:text-3xl text-yellow-400 font-bold tracking-widest animate-pulse mt-2">
              MOBILE 世代
            </h2>
          </div>
          
          <div className="p-6 md:p-8 bg-black/60 border-2 border-pink-500/30 backdrop-blur-md rounded-xl w-full max-w-md text-center space-y-4 md:space-y-6 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
             <p className="text-gray-300 leading-relaxed text-sm md:text-base">
               逻辑已死... <br/>
               <span className="text-pink-400 font-bold">粉色恶魔</span> 与 <span className="text-indigo-400 font-bold">虚空巨兽</span> 的终极对决。
             </p>

             {/* Skin Upload Section */}
             <div className="grid grid-cols-2 gap-4 py-2">
               <div className="flex flex-col gap-2">
                 <label className="text-xs text-pink-400 font-bold uppercase">自定义 Doro</label>
                 <label className="cursor-pointer px-3 py-2 bg-pink-900/50 hover:bg-pink-800 border border-pink-500/50 rounded text-xs truncate transition-colors">
                   {doroSkin ? "✅ 已加载" : "上传图片"}
                   <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'DORO')} />
                 </label>
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs text-indigo-400 font-bold uppercase">自定义 耄耋</label>
                 <label className="cursor-pointer px-3 py-2 bg-indigo-900/50 hover:bg-indigo-800 border border-indigo-500/50 rounded text-xs truncate transition-colors">
                   {maodieSkin ? "✅ 已加载" : "上传图片"}
                   <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'MAODIE')} />
                 </label>
               </div>
             </div>
             
             <button 
               onClick={handleStart}
               className="group relative px-8 py-4 bg-pink-600 hover:bg-pink-500 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:rotate-1 w-full"
             >
                <span className="absolute inset-0 w-full h-full bg-yellow-400 translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></span>
                <span className="relative text-xl font-black text-white uppercase tracking-widest">开始战斗</span>
             </button>

             <div className="text-left text-xs text-gray-400 space-y-1 pt-4 border-t border-gray-700">
                <p>触控说明:</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <span>左侧区域: 移动</span>
                    <span>右侧按键: 攻击</span>
                    <span className="col-span-2 text-pink-300">推荐横屏游玩</span>
                </div>
             </div>
          </div>
        </div>
      )}

      {(gameState === 'PLAYING' || gameState === 'GAMEOVER') && (
        <div className="relative w-full h-full flex-1 bg-black flex items-center justify-center">
           <GameEngine 
              key={gameKey} 
              onGameOver={handleGameOver} 
              onBack={handleBackToMenu} 
              p1Skin={doroSkin}
              p2Skin={maodieSkin}
              levelIndex={currentLevel}
           />
           
           {gameState === 'GAMEOVER' && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out] p-4">
                 <div className="text-center space-y-6 transform md:scale-110 p-6 md:p-10 bg-black/40 rounded-xl border border-white/10 w-full max-w-lg">
                    <div className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_5px_0px_rgba(255,0,0,1)] stroke-black animate-bounce">
                       {isDoroWin 
                         ? (isFinalLevel ? "全关卡通关！" : "关卡胜利！") 
                         : "挑战失败..."}
                    </div>
                    
                    <div className="text-xl text-gray-300">
                        {isDoroWin && !isFinalLevel && `下一关: ${LEVELS[currentLevel + 1].title}`}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center pt-4 md:pt-8">
                        {isDoroWin ? (
                           !isFinalLevel && (
                               <button 
                                 onClick={handleNextLevel}
                                 className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-black text-xl rounded shadow-lg transform active:scale-95 transition-all"
                               >
                                  下一关 &gt;&gt;
                               </button>
                           )
                        ) : (
                            <button 
                              onClick={handleRetryLevel}
                              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xl rounded shadow-lg transform active:scale-95 transition-all"
                            >
                               重试本关
                            </button>
                        )}
                        
                        <button 
                          onClick={handleBackToMenu}
                          className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl rounded border-2 border-gray-500 active:scale-95 transition-all"
                        >
                           返回菜单
                        </button>
                    </div>
                 </div>
              </div>
           )}
        </div>
      )}
    </div>
  );
}