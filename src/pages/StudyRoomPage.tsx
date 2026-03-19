import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  BookOpen, 
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  Layout
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

interface StudyItem {
  id: number;
  question: string;
  answer: string;
  type: "FLASHCARD" | "QUIZ";
  options?: string[];
  correctOption?: number;
  evidence?: string;
}

const mockStudyItems: StudyItem[] = [
  {
    id: 1,
    type: "FLASHCARD",
    question: "Nguyên lý CAP trong Kiến trúc Hệ thống phân tán là gì?",
    answer: "CAP (Consistency, Availability, Partition Tolerance) khẳng định rằng trong một hệ thống phân tán, ta chỉ có thể đảm bảo tối đa 2 trong 3 yếu tố này đồng thời.",
    evidence: "Chương 3: Distributed Systems Fundamentals - Trang 45: 'The CAP theorem states that...'"
  },
  {
    id: 2,
    type: "QUIZ",
    question: "Loại database nào sau đây ưu tiên 'Availability' và 'Partition Tolerance' (AP)?",
    options: ["RDBMS (MySQL, PostgreSQL)", "Cassandra", "MongoDB (Default config)", "HBase"],
    correctOption: 1,
    answer: "Cassandra được thiết kế theo mô hình AP, chấp nhận Eventual Consistency để đổi lấy hiệu năng và tính sẵn sàng cao.",
    evidence: "Mục 4.2: Nosql Architectures - Cassandra Section: 'Cassandra is typically classified as an AP system...'"
  },
  {
    id: 3,
    type: "FLASHCARD",
    question: "Sự khác biệt chính giữa Monolithic và Microservices?",
    answer: "Monolithic là một khối duy nhất, Microservices chia nhỏ ứng dụng thành các dịch vụ độc lập giao tiếp qua API/Events.",
    evidence: "Chương 1: Architectural Patterns - So sánh Monolithic vs Microservices."
  }
];

interface StudyRoomPageProps {
  onFinish: () => void;
  title?: string;
}

export default function StudyRoomPage({ 
  onFinish,
  title = "Kiến trúc Hệ thống"
}: StudyRoomPageProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  
  const currentItem = mockStudyItems[currentIdx];
  const progress = ((currentIdx + 1) / mockStudyItems.length) * 100;

  // Simulate Auto-save
  useEffect(() => {
    if (saveStatus === "saving") {
      const timer = setTimeout(() => setSaveStatus("saved"), 800);
      const resetTimer = setTimeout(() => setSaveStatus("idle"), 2500);
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }
  }, [saveStatus]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && currentItem.type === "FLASHCARD" && !isEditMode) {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
      if (e.key.toLowerCase() === "e" && !e.ctrlKey && !e.metaKey) {
        // Only toggle if not focused on textarea
        if (document.activeElement?.tagName !== "TEXTAREA") {
          setIsEditMode(prev => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentItem.type, isEditMode]);

  const handleNoteChange = (text: string) => {
    setNotes(prev => ({ ...prev, [currentItem.id]: text }));
    setSaveStatus("saving");
  };

  const handleNext = () => {
    if (currentIdx < mockStudyItems.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setIsFlipped(false);
      setSelectedQuizOption(null);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setIsFlipped(false);
      setSelectedQuizOption(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] z-[100] flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl border border-slate-100"
            onClick={onFinish}
          >
            <ChevronLeft size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-brand uppercase tracking-widest bg-brand/5 px-2 py-0.5 rounded">
                Chế độ học tập
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl">
            <Layout size={16} className="text-slate-400" />
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">
              {currentItem.type}
            </span>
          </div>
          <div className="flex items-center gap-3">
             <div className="h-10 px-4 rounded-xl border border-slate-100 bg-white flex items-center gap-3">
               <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: `${progress}%` }}
                   className="h-full bg-brand rounded-full"
                 />
               </div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 {currentIdx + 1}/{mockStudyItems.length}
               </span>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Save Status Indicator */}
        <AnimatePresence>
          {saveStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={cn(
                "absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg",
                saveStatus === "saving" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
              )}
            >
              {saveStatus === "saving" ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <CheckCircle2 size={12} />
                  Đã lưu vào hệ thống
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl w-full relative">
          {/* Main Content Area */}
          <div className="perspective-1000 relative">
            <AnimatePresence mode="wait">
              {currentItem.type === "FLASHCARD" ? (
                <motion.div
                  key={currentItem.id}
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-full min-h-[400px] cursor-pointer"
                  onClick={() => !isEditMode && setIsFlipped(!isFlipped)}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full bg-white rounded-[40px] border-2 border-slate-100 shadow-2xl p-12 flex flex-col items-center justify-center text-center overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
                    <div className="absolute top-8 left-8 text-brand/20">
                      <HelpCircle size={64} strokeWidth={3} />
                    </div>
                    {isEditMode ? (
                      <textarea
                        className="w-full text-center text-2xl font-black text-slate-900 border-none bg-slate-50 rounded-2xl p-6 focus:ring-0 resize-none h-40"
                        defaultValue={currentItem.question}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => setSaveStatus("saving")}
                      />
                    ) : (
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                        {currentItem.question}
                      </h2>
                    )}
                    <div className="mt-12 flex items-center gap-4 text-slate-400">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Nhấn Space hoặc Chạm để lật</span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full bg-slate-950 rounded-[40px] border-2 border-slate-800 shadow-2xl p-12 flex flex-col items-center justify-center text-center overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <div className="absolute top-8 right-8 text-white/10">
                      <FileText size={64} strokeWidth={3} />
                    </div>
                    <div className="space-y-8">
                       <h3 className="text-brand/60 text-xs font-black uppercase tracking-[0.2em]">CÂU TRẢ LỜI</h3>
                       <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                         {currentItem.answer}
                       </p>
                       <div className="pt-8 border-t border-white/10">
                         <p className="text-slate-400 text-sm font-medium italic opacity-80">
                           {currentItem.evidence}
                         </p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full bg-white rounded-[40px] border-2 border-slate-100 shadow-2xl p-12 space-y-10"
                >
                  <div className="space-y-4">
                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Trắc nghiệm tương tác</span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                      {currentItem.question}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentItem.options?.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedQuizOption(i)}
                        className={cn(
                          "group p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-start gap-4",
                          selectedQuizOption === i
                            ? i === currentItem.correctOption
                              ? "bg-emerald-50 border-emerald-500 shadow-xl shadow-emerald-500/10"
                              : "bg-rose-50 border-rose-500 shadow-xl shadow-rose-500/10"
                            : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-lg"
                        )}
                      >
                         <div className={cn(
                           "min-w-[28px] h-[28px] rounded-full border-2 flex items-center justify-center font-black text-xs transition-colors",
                           selectedQuizOption === i
                            ? i === currentItem.correctOption ? "bg-emerald-500 text-white border-emerald-500" : "bg-rose-500 text-white border-rose-500"
                            : "bg-slate-50 text-slate-400 border-slate-100 group-hover:border-slate-300"
                         )}>
                           {String.fromCharCode(65 + i)}
                         </div>
                         <span className={cn(
                           "font-bold text-base leading-snug",
                           selectedQuizOption === i ? "text-slate-900" : "text-slate-600"
                         )}>
                           {opt}
                         </span>
                      </button>
                    ))}
                  </div>

                  {selectedQuizOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={cn(
                        "p-8 rounded-[32px] border flex flex-col gap-4 bg-slate-50/50",
                        selectedQuizOption === currentItem.correctOption ? "border-emerald-100" : "border-rose-100"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                          selectedQuizOption === currentItem.correctOption ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                        )}>
                          {selectedQuizOption === currentItem.correctOption ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-slate-900 uppercase tracking-tighter text-sm">
                            {selectedQuizOption === currentItem.correctOption ? "Chính xác!" : "Chưa đúng rồi!"}
                          </h4>
                          <p className="text-slate-500 font-medium text-sm leading-relaxed">
                            {currentItem.answer}
                          </p>
                        </div>
                      </div>
                      
                       <div className="bg-white/80 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen size={14} className="text-brand" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bằng chứng từ tài liệu</span>
                          </div>
                         <p className="text-slate-600 text-sm italic font-medium">
                           {currentItem.evidence}
                         </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-12 flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "h-12 w-12 rounded-2xl border transition-all",
                    isEditMode ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" : "bg-white border-slate-100 text-slate-400 hover:text-brand"
                  )}
                  onClick={() => setIsEditMode(!isEditMode)}
                  title="Chế độ chỉnh sửa (E)"
                >
                  <Edit3 size={20} />
                </Button>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider hidden md:block">
                  Phím tắt: E để sửa, Space lật thẻ
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 border border-slate-100 bg-white"
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                >
                  <ChevronLeft size={18} className="mr-2" /> Trước
                </Button>
                <Button
                  variant="primary"
                  className="h-14 px-12 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand/20 transition-transform active:scale-95"
                  onClick={handleNext}
                  disabled={currentIdx === mockStudyItems.length - 1}
                >
                  Tiếp theo <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expandable Note Section */}
          <div className="mt-10">
            <button
              onClick={() => setIsNoteExpanded(!isNoteExpanded)}
              className="w-full h-14 px-8 bg-white/60 backdrop-blur-sm border-2 border-slate-100/50 rounded-2xl flex items-center justify-between group hover:border-indigo-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-brand/10 text-brand w-8 h-8 rounded-lg flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-brand">Ghi chú cá nhân</span>
              </div>
              <motion.div animate={{ rotate: isNoteExpanded ? 180 : 0 }}>
                <ChevronDown size={20} className="text-slate-300" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isNoteExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-4"
                >
                   <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl p-8 space-y-4">
                    <textarea
                      placeholder="Nhập ghi chú của bạn tại đây... Sử dụng markdown cơ bản (In đậm, List)"
                      className="w-full min-h-[150px] p-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-brand/10 text-slate-700 font-medium text-base resize-none custom-scrollbar"
                      value={notes[currentItem.id] || ""}
                      onChange={(e) => handleNoteChange(e.target.value)}
                    />
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                      <span>Nhấn Shift + Enter để xuống dòng</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 pointer-events-none">
                          <Layout size={12} /> Markdown chủ động
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-slate-100">
        <motion.div 
          animate={{ width: `${progress}%` }}
          className="h-full bg-brand/30"
        />
      </div>
    </div>
  );
}
