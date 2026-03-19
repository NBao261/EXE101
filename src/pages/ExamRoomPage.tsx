import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Clock, 
  AlertCircle
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

interface Question {
  id: number;
  text: string;
  options: string[];
}

// Mock 50 questions
const mockQuestions: Question[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  text: `Câu hỏi ${i + 1}: Đây là một ví dụ về câu hỏi trắc nghiệm trong bài thi thử. Bạn hãy chọn đáp án đúng nhất dựa trên kiến thức đã học?`,
  options: [
    "Đáp án A: Đây là lựa chọn đầu tiên phản ánh kiến thức nền tảng.",
    "Đáp án B: Lựa chọn này đề cập đến các khía cạnh kỹ thuật chuyên sâu.",
    "Đáp án C: Một giả thuyết phản biện được đưa ra để kiểm tra tính logic.",
    "Đáp án D: Tổng hợp tất cả các yếu tố trên một cách toàn diện."
  ]
}));

interface ExamRoomPageProps {
  onFinish: () => void;
  subjectName?: string;
  totalTimeMinutes?: number;
}

export default function ExamRoomPage({ 
  onFinish, 
  subjectName = "Kiến trúc Hệ thống", 
  totalTimeMinutes = 45 
}: ExamRoomPageProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(totalTimeMinutes * 60);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimeUpModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [mockQuestions[currentIdx].id]: optionIdx
    }));
  };

  const currentQuestion = mockQuestions[currentIdx];
  const progress = (Object.keys(answers).length / mockQuestions.length) * 100;

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] z-[100] flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-6 flex-1">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">
              {subjectName}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">
                Phòng thi giả lập
              </span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-10 hidden md:block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiến độ làm bài</span>
              <span className="text-[10px] font-black text-brand uppercase tracking-widest">
                {Object.keys(answers).length}/{mockQuestions.length} Câu
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-brand rounded-full"
              />
            </div>
          </div>
        </div>

        <div className={cn(
          "flex items-center gap-3 px-6 py-2.5 rounded-2xl transition-all border-2",
          timeLeft < 300 
            ? "bg-rose-50 border-rose-100 text-rose-500 animate-pulse shadow-lg shadow-rose-200" 
            : "bg-brand/5 border-brand/10 text-brand"
        )}>
          <Clock size={20} />
          <span className="text-lg font-black tracking-tighter tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Question Map */}
        <aside className="w-80 bg-white border-r border-slate-100 p-8 overflow-y-auto hidden lg:block custom-scrollbar">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Bản đồ câu hỏi</h3>
          <div className="grid grid-cols-5 gap-3">
            {mockQuestions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={cn(
                  "h-10 rounded-xl font-black text-xs transition-all flex items-center justify-center border-2",
                  currentIdx === i
                    ? "bg-amber-100 border-amber-300 text-amber-700 scale-110 shadow-md z-10"
                    : answers[q.id] !== undefined
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                    : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300 hover:bg-white"
                )}
              >
                {q.id}
              </button>
            ))}
          </div>
          
          <div className="mt-10 p-5 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đã trả lời</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đang chọn</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chưa làm</span>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 bg-slate-50/30 p-12 overflow-y-auto custom-scrollbar flex justify-center">
          <div className="max-w-3xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <span className="text-brand font-black text-sm uppercase tracking-widest">Câu hỏi {currentQuestion.id} / {mockQuestions.length}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-[1.3] tracking-tight">
                    {currentQuestion.text}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={cn(
                        "group p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-start gap-4",
                        answers[currentQuestion.id] === i
                          ? "bg-white border-brand shadow-xl shadow-brand/10 ring-4 ring-brand/5"
                          : "bg-white border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-white hover:shadow-lg"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-all",
                        answers[currentQuestion.id] === i
                          ? "bg-brand border-brand"
                          : "border-slate-200 group-hover:border-slate-400"
                      )}>
                        {answers[currentQuestion.id] === i && (
                          <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                        )}
                      </div>
                      <span className={cn(
                        "flex-1 font-bold text-lg leading-snug",
                        answers[currentQuestion.id] === i ? "text-slate-900" : "text-slate-600"
                      )}>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom Bar */}
      <footer className="h-24 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-8 flex items-center justify-between sticky bottom-0 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900"
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
          >
            <ChevronLeft size={18} className="mr-2" /> Quay lại
          </Button>
          <Button
            variant="ghost"
            className="h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900"
            onClick={() => setCurrentIdx(prev => Math.min(mockQuestions.length - 1, prev + 1))}
            disabled={currentIdx === mockQuestions.length - 1}
          >
            Tiếp theo <ChevronRight size={18} className="ml-2" />
          </Button>
        </div>

        <Button
          variant="primary"
          className="h-14 px-10 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand/20 flex items-center gap-3 scale-105 active:scale-95 transition-transform"
          onClick={onFinish}
        >
          <Send size={18} /> Nộp bài thi
        </Button>
      </footer>

      {/* Time Up Modal */}
      <AnimatePresence>
        {showTimeUpModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-[40px] p-12 max-w-lg w-full text-center shadow-2xl relative overflow-hidden text-slate-900"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <AlertCircle size={48} className="text-rose-500" />
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tight">Hết giờ làm bài!</h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg italic">
                Hệ thống đã tự động ghi nhận các kết quả bạn đã hoàn thành. Kết quả sẽ được hiển thị ngay sau đây.
              </p>
              <Button
                variant="primary"
                className="w-full h-16 rounded-2xl font-black text-sm uppercase tracking-widest bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-200"
                onClick={onFinish}
              >
                Xem kết quả ngay
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
