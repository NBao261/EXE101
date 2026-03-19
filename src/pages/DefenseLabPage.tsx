import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Brain, 
  Zap,
  ShieldAlert,
  User,
  ShieldCheck,
  FileText,
  Mic2,
  Timer,
  Trophy,
  AlertTriangle,
  ArrowRight,
  Play,
  Volume2,
  TrendingUp,
  RotateCw
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { cn } from '../lib/utils'

// Types
type Stage = 'SETUP' | 'SIMULATION' | 'RESULTS';

interface Persona {
  id: string;
  name: string;
  title: string;
  description: string;
  focus: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  avatarColor: string;
}

interface AuditedDoc {
  id: string;
  name: string;
  score: number;
  date: string;
}

// Mock Data
const personas: Persona[] = [
  {
    id: 'p1',
    name: 'PGS.TS. Trần Kỹ Thuật',
    title: 'Giám khảo Chuyên môn',
    description: 'Tập trung sâu vào kiến trúc phần mềm, chất lượng mã nguồn và các giải pháp công nghệ.',
    focus: 'Technology Stack & Architecture',
    difficulty: 'HARD',
    avatarColor: 'bg-slate-800' // Changed from indigo-600 to match Tech-Elite theme
  },
  {
    id: 'p2',
    name: 'ThS. Nguyễn Nghiệp Vụ',
    title: 'Giám khảo Thực tiễn',
    description: 'Quan tâm đến giá trị kinh doanh, trải nghiệm người dùng và tính khả thi của dự án.',
    focus: 'Business Value & UX',
    difficulty: 'MEDIUM',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'p3',
    name: 'GS. Lê Hàn Lâm',
    title: 'Giám khảo Học thuật',
    description: 'Soi xét phương pháp nghiên cứu, cơ sở lý luận và cách trình bày khoa học.',
    focus: 'Research Methodology',
    difficulty: 'MEDIUM',
    avatarColor: 'bg-amber-600'
  }
];

const auditedDocs: AuditedDoc[] = [
  { id: 'doc-1', name: 'Báo cáo Đồ án Tốt nghiệp v4.2.pdf', score: 85, date: '10:45 SA, Hôm nay' },
  { id: 'doc-2', name: 'Đề cương Nghiên cứu.docx', score: 92, date: 'Hôm qua' },
  { id: 'doc-3', name: 'Tài liệu Tham khảo (Draft).pdf', score: 64, date: '15 Thg 3, 2026' },
];

export default function DefenseLabPage() {
  const [stage, setStage] = useState<Stage>('SETUP');
  const [selectedDocId, setSelectedDocId] = useState('doc-1');
  const [selectedPersonaId, setSelectedPersonaId] = useState('p1');
  const [sessionStarted, setSessionStarted] = useState(false);

  // Simulation State
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [isAiTalking, setIsAiTalking] = useState(false);
  const [currentQuestion] = useState('Chào bạn! Dựa trên báo cáo của bạn về EdTech Pro Max, bạn hãy giải thích rõ hơn về sự mâu thuẫn giữa kiến trúc React (Chương 1) và mô tả Vue.js (Chương 3) mà AI đã tìm thấy?');
  const [reflexTime, setReflexTime] = useState(15);
  const [isUserResponding, setIsUserResponding] = useState(false);

  const activePersona = personas.find(p => p.id === selectedPersonaId) || personas[0];
  const activeDoc = auditedDocs.find(d => d.id === selectedDocId) || auditedDocs[0];

  const handleStartDefense = () => {
    setSessionStarted(true);
    setTimeout(() => {
      setStage('SIMULATION');
      setIsAiTalking(true);
      setSessionStarted(false);
    }, 1500);
  };

  // Timer simulation
  useEffect(() => {
    let timer: any;
    if (stage === 'SIMULATION' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [stage, timeLeft]);

  // Reflex timer simulation
  useEffect(() => {
    let timer: any;
    if (stage === 'SIMULATION' && reflexTime > 0 && !isUserResponding && !isAiTalking) {
      timer = setInterval(() => setReflexTime(prev => prev > 0 ? prev - 1 : 0), 1000);
    }
    return () => clearInterval(timer);
  }, [stage, reflexTime, isUserResponding, isAiTalking]);

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col translate-y-[-20px] pb-12">
      <AnimatePresence mode="wait">
        {stage === 'SETUP' && (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col gap-10"
          >
            {/* Header Content */}
            <header className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/10 border border-brand/20">
                  <Mic2 size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Phòng Bảo vệ Đồ án</h1>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Giả lập bảo vệ đồ án điện ảnh</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8 space-y-12">
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">1</div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Chọn tài liệu bảo vệ</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {auditedDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDocId(doc.id)}
                        className={cn(
                          "p-6 rounded-[24px] border transition-all duration-300 text-left group overflow-hidden relative",
                          selectedDocId === doc.id ? "bg-white border-brand shadow-sm ring-1 ring-brand/10" : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
                        )}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            selectedDocId === doc.id ? "bg-brand text-white" : "bg-white text-slate-400 group-hover:bg-slate-100"
                          )}>
                            <FileText size={20} />
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Điểm kiểm định</p>
                            <p className={cn(
                              "text-sm font-black",
                              doc.score > 85 ? "text-emerald-500" : doc.score > 70 ? "text-brand" : "text-rose-500"
                            )}>{doc.score}%</p>
                          </div>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mb-1">{doc.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold">{doc.date}</p>

                        {selectedDocId === doc.id && (
                          <motion.div layoutId="doc-active" className="absolute bottom-0 left-0 w-full h-1 bg-brand" />
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">2</div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Chọn Hội đồng Phản biện</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {personas.map((persona) => (
                      <button
                        key={persona.id}
                        onClick={() => setSelectedPersonaId(persona.id)}
                        className={cn(
                          "p-4 lg:p-8 rounded-2xl border transition-all duration-300 text-center group flex flex-col items-center gap-4",
                          selectedPersonaId === persona.id ? "bg-white border-brand shadow-md ring-1 ring-brand/20 scale-105" : "bg-slate-50 border-slate-100 hover:border-slate-200 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        )}
                      >
                        <div className={cn(
                          "w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-white shadow-sm relative transition-transform group-hover:rotate-6",
                          persona.avatarColor
                        )}>
                          <User size={32} />
                          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg border border-slate-50">
                            {persona.difficulty === 'HARD' ? <ShieldAlert size={16} className="text-rose-500" /> : <ShieldCheck size={16} className="text-emerald-500" />}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs lg:text-sm font-black text-slate-900 leading-tight mb-1">{persona.name}</h4>
                          <p className="text-[11px] lg:text-[10px] text-brand font-black uppercase tracking-tight">{persona.title}</p>
                        </div>
                        <p className="hidden lg:block text-[11px] text-slate-500 font-bold leading-relaxed line-clamp-2">
                          {persona.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-8">
                <Card className="p-8 bg-white border-none shadow-md rounded-2xl space-y-8 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Cấu hình phiên</h3>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                      <Settings size={14} className="text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[11px] text-slate-400 font-semibold mb-2">Tài liệu đã chọn</p>
                      <p className="text-xs font-black text-slate-900 mb-1">{activeDoc.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-slate-500 font-bold">Đã kiểm định • {activeDoc.score}%</span>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[11px] text-slate-400 font-semibold mb-2">Giám khảo chỉ định</p>
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg", activePersona.avatarColor)} />
                        <div>
                          <p className="text-xs font-black text-slate-900">{activePersona.name}</p>
                          <p className="text-[10px] text-brand font-bold">{activePersona.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Button
                      onClick={handleStartDefense}
                      disabled={sessionStarted}
                      className={cn(
                        "w-full h-16 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-md transition-all relative overflow-hidden bg-slate-900 text-white hover:scale-[1.02] shadow-brand/20 active:scale-95"
                      )}
                    >
                      {sessionStarted ? (
                        <div className="flex items-center gap-3">
                          <RotateCw size={20} className="animate-spin" />
                          <span>Đang chuẩn bị Lab...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3 relative z-10">
                          <Play size={20} className="fill-white" />
                          <span>Bắt đầu phỏng vấn</span>
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-brand/20 blur-2xl -z-10"
                          />
                        </div>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'SIMULATION' && (
          <motion.div
            key="simulation"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex gap-8 h-full"
          >
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl shadow-md overflow-hidden relative border-8 border-white/5 p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.15),transparent)]" />

                <div className="flex items-center justify-between relative z-10 mb-16 text-white">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg", activePersona.avatarColor)}>
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight uppercase italic">{activePersona.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">
                          {isAiTalking ? "Đang đặt câu hỏi..." : "Chờ trả lời..."}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
                     <Timer size={18} className="text-brand" />
                     <span className="text-xl font-black font-mono tracking-tighter tabular-nums text-white">
                       {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                     </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center space-y-12">
                   <div className="h-24 flex items-center gap-1.5">
                     {[...Array(24)].map((_, i) => (
                       <motion.div
                        key={i}
                        animate={{
                          height: (isAiTalking || isUserResponding) ? [20, Math.random() * 80 + 20, 20] : 10,
                          backgroundColor: (isAiTalking || isUserResponding) ? ["#8b5cf6", "#d946ef", "#8b5cf6"] : "#334155"
                        }}
                        transition={{
                          duration: 0.5 + Math.random(),
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 rounded-full"
                       />
                     ))}
                   </div>

                   <div className="max-w-3xl space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full mb-4">
                        <Zap size={10} className="text-rose-500 fill-rose-500" />
                        <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Câu hỏi xoáy</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight px-4">
                        "{currentQuestion}"
                      </h2>
                   </div>

                   <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        <motion.circle
                          cx="64" cy="64" r="58" fill="transparent"
                          stroke="#8b5cf6" strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 58}
                          animate={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - reflexTime / 30) }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white tabular-nums">{reflexTime}s</span>
                        <span className="text-[11px] font-black text-white/40 uppercase tracking-widest mt-1">Phản xạ</span>
                      </div>
                   </div>
                </div>

                <div className="mt-12 p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="flex-1 relative">
                        <textarea
                          placeholder="Bạn có thể gõ câu trả lỗi tại đây hoặc giữ nút bên phải để nói..."
                          className="w-full bg-white/5 border-none p-6 pr-20 rounded-3xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-brand/50 min-h-[80px] resize-none font-medium leading-relaxed"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/50 hover:text-brand transition-colors">
                          <ArrowRight size={20} />
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                         <button
                          onMouseDown={() => { setIsUserResponding(true); setIsAiTalking(false); }}
                          onMouseUp={() => setIsUserResponding(false)}
                          className={cn(
                            "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
                            isUserResponding ? "bg-brand scale-95 shadow-[0_0_50px_rgba(139,92,246,0.5)]" : "bg-white text-slate-900 shadow-sm hover:scale-105"
                          )}
                         >
                            {isUserResponding ? <Volume2 size={32} className="animate-pulse" /> : <Mic2 size={32} />}
                         </button>
                         <span className={cn(
                           "text-xs font-semibold",
                           isUserResponding ? "text-brand" : "text-white/40"
                         )}>
                           {isUserResponding ? "Đang ghi âm..." : "Giữ để nói"}
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="w-[400px] hidden xl:flex flex-col gap-6">
               <Card className="flex-1 flex flex-col bg-white border-none shadow-md rounded-2xl p-8 overflow-hidden">
                  <div className="flex items-center justify-between mb-8 shrink-0">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight text-center w-full uppercase">Nhật ký phỏng vấn</h3>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                     {[
                       { q: "Vui lòng giới thiệu ngắn gọn về dự án đạt điểm cao này.", a: "EdTech Pro Max là nền tảng học tập cá nhân hóa sử dụng AI...", status: 'Tuyệt vời' },
                       { q: "Điểm yếu lớn nhất trong kiến trúc Vue.js mà bạn đề cập là gì?", a: "Đó là khả năng mở rộng của reactivity trong các dự án quy mô lớn...", status: 'Cần cải thiện' },
                     ].map((log, i) => (
                       <div key={i} className="space-y-3">
                         <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-900 shrink-0 mt-1 flex items-center justify-center text-white font-black text-[10px]">Q</div>
                            <p className="text-xs font-black text-slate-800 leading-relaxed">{log.q}</p>
                         </div>
                         <div className="pl-9 space-y-2">
                            <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-500 font-medium">
                              {log.a}
                            </div>
                            <div className={cn(
                              "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-black uppercase",
                              log.status === 'Great' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                            )}>{log.status}</div>
                         </div>
                       </div>
                     ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 shrink-0">
                     <Button 
                      onClick={() => setStage('RESULTS')}
                      className="w-full h-14 rounded-2xl bg-rose-500 text-white font-semibold shadow-sm text-xs"
                     >
                       Kết thúc bảo vệ
                     </Button>
                  </div>
               </Card>
            </div>
          </motion.div>
        )}

        {stage === 'RESULTS' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col gap-8"
          >
            <div className="grid grid-cols-4 gap-6">
               {[
                 { label: 'Điểm tổng', value: '88/100', icon: Trophy, color: 'text-brand', bg: 'bg-brand/5' },
                 { label: 'Phản xạ', value: '1.2s', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/5' },
                 { label: 'Chuyên môn', value: '92%', icon: Brain, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
                 { label: 'Thuyết phục', value: 'High', icon: ShieldCheck, color: 'text-indigo-500', bg: 'bg-indigo-500/5' },
               ].map((stat, i) => (
                 <Card key={i} className="p-6 border-none shadow-sm rounded-3xl flex items-center gap-5">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                       <stat.icon className={stat.color} size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                       <p className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                    </div>
                 </Card>
               ))}
            </div>

            <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
               <Card className="col-span-12 lg:col-span-7 p-6 border-none shadow-md rounded-2xl flex flex-col bg-white">
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Performance Analytics</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Phân tích đa chiều từ Giám khảo AI</p>
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <TrendingUp size={20} className="text-slate-400" />
                     </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center relative">
                     <div className="relative w-[280px] h-[280px]">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-slate-100" strokeWidth="0.5">
                           <circle cx="50" cy="50" r="10" />
                           <circle cx="50" cy="50" r="20" />
                           <circle cx="50" cy="50" r="30" />
                           <circle cx="50" cy="50" r="40" />
                           <circle cx="50" cy="50" r="50" />
                           <line x1="50" y1="0" x2="50" y2="100" />
                           <line x1="0" y1="50" x2="100" y2="50" />
                        </svg>
                        
                        <motion.svg 
                          viewBox="0 0 100 100" 
                          className="absolute inset-0 w-full h-full drop-shadow-sm"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                           <path 
                              d="M50 15 L85 30 L80 75 L50 85 L20 75 L15 30 Z" 
                              className="fill-brand/20 stroke-brand" 
                              strokeWidth="2" 
                           />
                        </motion.svg>

                        <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 text-[11px] font-black uppercase text-slate-400">Kiến thức</div>
                        <div className="absolute top-[30%] right-[-45px] text-[11px] font-black uppercase text-slate-400">Logic</div>
                        <div className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 text-[11px] font-black uppercase text-slate-400">Phản xạ</div>
                        <div className="absolute top-[30%] left-[-45px] text-[11px] font-black uppercase text-slate-400">Tự tin</div>
                     </div>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-slate-50 text-center">
                     <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Độ tự tin</p>
                        <p className="text-base font-black text-brand">Excellent</p>
                     </div>
                     <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Critical Thinking</p>
                        <p className="text-base font-black text-indigo-500">Strong</p>
                     </div>
                     <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Issues</p>
                        <p className="text-base font-black text-rose-500">Fixed</p>
                     </div>
                  </div>
               </Card>

               <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                  <Card className="flex-1 p-8 border-none shadow-sm rounded-2xl flex flex-col min-h-0 bg-white">
                     <div className="flex items-center gap-3 mb-6 shrink-0">
                        <AlertTriangle size={18} className="text-amber-500" />
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Điểm yếu hàng đầu</h3>
                     </div>

                     <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                        {[
                          { title: 'Giải trình Kiến trúc', tip: 'Ôn lại Chương 3, tập trung vào Middleware.' },
                          { title: 'Tốc độ phản biện', tip: 'Cần nắm chắc các hằng số EdTech.' },
                        ].map((w, i) => (
                          <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                <h4 className="text-[11px] font-black text-slate-900">{w.title}</h4>
                             </div>
                             <p className="text-[10px] text-slate-700 font-extrabold italic">"{w.tip}"</p>
                          </div>
                        ))}
                     </div>

                     <div className="mt-6 pt-6 space-y-4 border-t border-slate-100">
                        <Button 
                          onClick={() => setStage('SETUP')}
                          className="w-full h-12 rounded-2xl bg-slate-900 text-white font-semibold text-[10px]"
                        >
                          Luyện tập lại
                        </Button>
                        <Button 
                          variant="ghost"
                          className="w-full h-10 text-[11px] font-black uppercase text-slate-400 hover:text-brand"
                        >
                          Xuất báo cáo chi tiết <ArrowRight size={12} className="ml-1" />
                        </Button>
                     </div>
                  </Card>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
