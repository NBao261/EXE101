import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  Trophy,
  ArrowRight,
  RotateCw,
  Code2,
  Upload,
  Terminal,
  CheckCircle2,
  Activity,
  Briefcase,
  FileText,
  User,
  MessageSquare,
  ShieldCheck,
  Lightbulb,
  Mic2,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/utils";

// Types
type Stage = "SETUP" | "SIMULATION" | "RESULTS";

interface Persona {
  id: string;
  name: string;
  title: string;
  description: string;
  focus: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  avatarColor: string;
  type: "HR" | "TECH";
}

interface CV {
  id: string;
  name: string;
  relevance: number;
  date: string;
}

// Mock Data
const personas: Persona[] = [
  {
    id: "p1",
    name: "Sarah Chen",
    title: "Senior HR Manager @ Google",
    description:
      "Chuyên gia phỏng vấn hành vi, tập trung vào văn hóa doanh nghiệp và kỹ năng STAR.",
    focus: "Culture Fit & Soft Skills",
    difficulty: "MEDIUM",
    avatarColor: "bg-rose-600",
    type: "HR",
  },
  {
    id: "p2",
    name: "Alex Rivera",
    title: "Principal Engineer @ Vercel",
    description:
      "Sát thủ kỹ thuật. Sẽ xoáy sâu vào MERN Stack, Performance và System Design.",
    focus: "MERN Stack & Scalability",
    difficulty: "HARD",
    avatarColor: "bg-slate-800",
    type: "TECH",
  },
  {
    id: "p3",
    name: "Minh Quang",
    title: "Technical Recruiter",
    description: "Phỏng vấn sơ vấn kỹ thuật và định hướng sự nghiệp.",
    focus: "General CS Fundamentals",
    difficulty: "EASY",
    avatarColor: "bg-blue-600",
    type: "HR",
  },
];

const mockCVs: CV[] = [
  {
    id: "cv-1",
    name: "Nguyen_Van_A_Fullstack_Dev.pdf",
    relevance: 95,
    date: "Đã tải lên 2 giờ trước",
  },
  {
    id: "cv-2",
    name: "Software_Engineer_Intern_Resume.pdf",
    relevance: 78,
    date: "Đã tải lên hôm qua",
  },
];

export default function CareerLabPage() {
  const [stage, setStage] = useState<Stage>("SETUP");
  const [selectedCvId, setSelectedCvId] = useState("cv-1");
  const [selectedPersonaId, setSelectedPersonaId] = useState("p2");
  const [sessionStarted, setSessionStarted] = useState(false);

  // Simulation State
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins for career interview
  const [isAiTalking, setIsAiTalking] = useState(false);
  const [currentQuestion] = useState(
    "Chào bạn! Tôi đã phân tích CV của bạn thông qua hệ thống RAG. Trong dự án Marketplace, tại sao bạn lại quyết định sử dụng MongoDB thay vì PostgreSQL cho phần quản lý sản phẩm? Hãy trả lời theo phương pháp STAR nhé.",
  );
  const [reflexTime, setReflexTime] = useState(20);
  const [isUserResponding, setIsUserResponding] = useState(false);
  const [isCodingMode, setIsCodingMode] = useState(false);
  const [code, setCode] =
    useState(`// Triển khai hàm tìm tổng phân đoạn lớn nhất (Maximum Subarray Sum)
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = 0;
  
  for (let num of nums) {
    currentSum += num;
    if (currentSum > maxSum) maxSum = currentSum;
    if (currentSum < 0) currentSum = 0;
  }
  
  return maxSum;}`);

  // STAR Method State
  const starStatus = {
    S: true,
    T: true,
    A: false,
    R: false,
  };

  const activePersona =
    personas.find((p) => p.id === selectedPersonaId) || personas[0];
  const activeCv = mockCVs.find((c) => c.id === selectedCvId) || mockCVs[0];

  const handleStartInterview = () => {
    setSessionStarted(true);
    setTimeout(() => {
      setStage("SIMULATION");
      setIsAiTalking(true);
      setSessionStarted(false);
      if (activePersona.type === "TECH") setIsCodingMode(true);
    }, 1500);
  };

  useEffect(() => {
    let timer: any;
    if (stage === "SIMULATION" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [stage, timeLeft]);

  useEffect(() => {
    let timer: any;
    if (
      stage === "SIMULATION" &&
      reflexTime > 0 &&
      !isUserResponding &&
      !isAiTalking
    ) {
      timer = setInterval(
        () => setReflexTime((prev) => (prev > 0 ? prev - 1 : 0)),
        1000,
      );
    }
    return () => clearInterval(timer);
  }, [stage, reflexTime, isUserResponding, isAiTalking]);

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col translate-y-[-20px] pb-12">
      <AnimatePresence mode="wait">
        {stage === "SETUP" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col gap-10"
          >
            <header className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/10 border border-brand/20">
                  <Briefcase size={22} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Career Lab
                  </h1>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    Giả lập phỏng vấn tuyển dụng AI
                  </p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8 space-y-12">
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                        1
                      </div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">
                        Cung cấp CV của bạn
                      </h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-slate-200 text-[10px] font-black uppercase"
                    >
                      <Upload size={14} className="mr-2" /> Tải lên CV mới
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {mockCVs.map((cv) => (
                      <button
                        key={cv.id}
                        onClick={() => setSelectedCvId(cv.id)}
                        className={cn(
                          "p-6 rounded-[24px] border transition-all duration-300 text-left group relative",
                          selectedCvId === cv.id
                            ? "bg-white border-slate-900 shadow-sm ring-1 ring-slate-900/10"
                            : "bg-slate-50/50 border-slate-100",
                        )}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              selectedCvId === cv.id
                                ? "bg-slate-900 text-white"
                                : "bg-white text-slate-400",
                            )}
                          >
                            <FileText size={20} />
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                              Độ tương thích
                            </p>
                            <p
                              className={cn(
                                "text-sm font-black",
                                cv.relevance > 80
                                  ? "text-emerald-500"
                                  : "text-brand",
                              )}
                            >
                              {cv.relevance}%
                            </p>
                          </div>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mb-1">
                          {cv.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {cv.date}
                        </p>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                      2
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      Chọn Người phỏng vấn
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {personas.map((persona) => (
                      <button
                        key={persona.id}
                        onClick={() => setSelectedPersonaId(persona.id)}
                        className={cn(
                          "p-6 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-4 text-center",
                          selectedPersonaId === persona.id
                            ? "bg-white border-slate-900 shadow-xl -translate-y-2 ring-1 ring-slate-900/10"
                            : "bg-slate-50 border-slate-100 grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
                        )}
                      >
                        <div
                          className={cn(
                            "w-20 h-20 rounded-2xl flex items-center justify-center text-white relative",
                            persona.avatarColor,
                          )}
                        >
                          <User size={32} />
                          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg border border-slate-50">
                            {persona.type === "TECH" ? (
                              <Code2 size={16} className="text-slate-900" />
                            ) : (
                              <MessageSquare
                                size={16}
                                className="text-rose-500"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 mb-1">
                            {persona.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-tight">
                            {persona.title}
                          </p>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                          {persona.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4">
                <Card className="p-8 bg-white border-none shadow-md rounded-3xl space-y-8 sticky top-24">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                      Tóm tắt phiên học
                    </h3>
                    <Activity size={16} className="text-slate-300" />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">
                        CV mục tiêu
                      </p>
                      <p className="text-xs font-black text-slate-900">
                        {activeCv.name}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">
                        Người phỏng vấn
                      </p>
                      <p className="text-xs font-black text-slate-900">
                        {activePersona.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold">
                        {activePersona.focus}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">
                        Mục tiêu phiên
                      </p>
                      <ul className="text-[10px] text-slate-600 font-bold space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2
                            size={10}
                            className="text-emerald-500"
                          />{" "}
                          Tối ưu hóa phản xạ
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2
                            size={10}
                            className="text-emerald-500"
                          />{" "}
                          Xử lý áp lực cao
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartInterview}
                    disabled={sessionStarted}
                    className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase text-xs tracking-widest hover:scale-[1.02] shadow-xl shadow-slate-900/20 active:scale-95 transition-all"
                  >
                    {sessionStarted ? (
                      <RotateCw className="animate-spin" />
                    ) : (
                      "Vào phỏng vấn ngay"
                    )}
                  </Button>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "SIMULATION" && (
          <motion.div
            key="simulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-white",
                    activePersona.avatarColor,
                  )}
                >
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {activePersona.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Live Now
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Phương pháp STAR:
                  </span>
                  <div className="flex gap-1.5">
                    {["S", "T", "A", "R"].map((label) => (
                      <div
                        key={label}
                        className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black transition-all",
                          starStatus[label as keyof typeof starStatus]
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            : "bg-slate-100 text-slate-300",
                        )}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-slate-100" />
                <div className="flex items-center gap-3 px-6 py-2 bg-rose-50 rounded-xl border border-rose-100">
                  <Timer size={16} className="text-rose-500" />
                  <span className="text-lg font-black text-rose-500 font-mono tracking-tighter tabular-nums">
                    {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
              {/* Interview Scene Area */}
              <div
                className={cn(
                  "flex flex-col gap-6 transition-all duration-500",
                  isCodingMode ? "col-span-12 lg:col-span-6" : "col-span-12",
                )}
              >
                <div className="flex-1 bg-slate-900 rounded-[32px] p-12 relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(244,63,94,0.1),transparent)]" />

                  {/* AI Visualizer */}
                  <div className="relative mb-12">
                    <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center overflow-hidden relative">
                      <motion.div
                        animate={{
                          scale: isAiTalking ? [1, 1.1, 1] : 1,
                          opacity: isAiTalking ? 1 : 0.5,
                        }}
                        className={cn(
                          "w-full h-full flex items-center justify-center text-white",
                          activePersona.avatarColor,
                        )}
                      >
                        <User size={48} />
                      </motion.div>
                      {isAiTalking && (
                        <div className="absolute inset-0 border-4 border-emerald-500/50 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>

                  <div className="max-w-xl text-center space-y-8 relative z-10">
                    <h2
                      className={cn(
                        "text-xl lg:text-2xl font-black text-white leading-tight transition-all",
                      )}
                    >
                      "{currentQuestion}"
                    </h2>

                    <div className="flex justify-center gap-1.5 h-12">
                      {[...Array(24)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height:
                              isAiTalking || isUserResponding
                                ? [10, Math.random() * 40 + 10, 10]
                                : 4,
                            opacity: isAiTalking || isUserResponding ? 1 : 0.2,
                          }}
                          transition={{
                            duration: 0.3 + Math.random() * 0.5,
                            repeat: Infinity,
                          }}
                          className="w-1 bg-white rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 w-full max-w-lg relative">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">
                        Phản xạ của bạn
                      </span>
                      <span className="text-xl font-black text-white tabular-nums">
                        {reflexTime}s
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: `${(reflexTime / 20) * 100}%` }}
                        className={cn(
                          "h-full transition-all",
                          reflexTime < 5 ? "bg-rose-500" : "bg-emerald-500",
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Bạn có thể gõ phản hồi hoặc dùng Microphone..."
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 text-sm font-medium focus:ring-1 focus:ring-slate-900 resize-none min-h-[60px]"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onMouseDown={() => setIsUserResponding(true)}
                      onMouseUp={() => setIsUserResponding(false)}
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                        isUserResponding
                          ? "bg-rose-500 text-white scale-90 shadow-lg shadow-rose-200"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200",
                      )}
                    >
                      <Mic2 size={24} />
                    </button>
                    {!isCodingMode && (
                      <button
                        onClick={() => setIsCodingMode(true)}
                        className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center"
                      >
                        <Code2 size={24} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Coding Area */}
              {isCodingMode && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="col-span-12 lg:col-span-6 flex flex-col gap-4"
                >
                  <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden flex flex-col border border-slate-800">
                    <div className="h-12 bg-slate-800 px-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          coding_interview.js
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-500/20" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/20" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                      </div>
                    </div>
                    <div className="flex-1 p-6 font-mono text-sm leading-relaxed relative">
                      <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800/20 text-slate-600 text-[10px] flex flex-col items-center pt-6 space-y-0.5 select-none">
                        {[...Array(20)].map((_, i) => (
                          <span key={i}>{i + 1}</span>
                        ))}
                      </div>
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent border-none text-emerald-400 focus:ring-0 pl-10 resize-none custom-scrollbar"
                      />
                    </div>
                    <div className="p-4 bg-slate-800/50 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-12">
                        Ready to run
                      </span>
                      <Button
                        size="sm"
                        className="bg-emerald-500 text-white h-8 px-4 text-[10px] uppercase font-black"
                      >
                        {" "}
                        Run Code{" "}
                      </Button>
                    </div>
                  </div>
                  <div className="h-32 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">
                      Live Analysis
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700">
                          Tối ưu hóa Code
                        </span>
                        <span className="text-[11px] font-black text-emerald-500">
                          Cao
                        </span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: "85%" }}
                          className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        />
                      </div>
                      <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                        AI phát hiện độ phức tạp O(n²). Đề xuất cải thiện lên O(n) để tối ưu hiệu năng.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <Button
                variant="ghost"
                onClick={() => setIsCodingMode(!isCodingMode)}
                className="text-[10px] font-black uppercase text-slate-400"
              >
                {isCodingMode ? "Ẩn Code Editor" : "Hiện Code Editor"}
              </Button>
              <Button
                onClick={() => setStage("RESULTS")}
                className="bg-rose-500 text-white h-12 px-8 rounded-xl font-black uppercase text-[10px] shadow-lg shadow-rose-200"
              >
                Kết thúc phỏng vấn
              </Button>
            </div>
          </motion.div>
        )}

        {stage === "RESULTS" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col gap-8"
          >
            <div className="grid grid-cols-4 gap-6">
              {[
                {
                  label: "Điểm tổng thể",
                  value: "92/100",
                  icon: Trophy,
                  color: "text-slate-900",
                  bg: "bg-slate-50",
                },
                {
                  label: "Đánh giá Kỹ thuật",
                  value: "Senior",
                  icon: Code2,
                  color: "text-emerald-500",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Độ lưu loát",
                  value: "Cao",
                  icon: Mic2,
                  color: "text-rose-500",
                  bg: "bg-rose-50",
                },
                {
                  label: "Khớp STAR",
                  value: "100%",
                  icon: ShieldCheck,
                  color: "text-brand",
                  bg: "bg-brand/5",
                },
              ].map((stat, i) => (
                <Card
                  key={i}
                  className="p-8 border-none shadow-sm rounded-[32px] flex items-center gap-6"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      stat.bg,
                    )}
                  >
                    <stat.icon className={stat.color} size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-8 flex-1">
              <Card className="col-span-8 p-10 border-none shadow-md rounded-[40px] flex flex-col bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                    Phân tích hiệu suất
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-12">
                    Dựa trên tiêu chí tuyển dụng toàn cầu
                  </p>

                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-8">
                      {[
                        { label: "Chiều sâu Kỹ thuật", score: 95 },
                        { label: "Giao tiếp (STAR)", score: 82 },
                        { label: "Giải quyết vấn đề", score: 88 },
                        { label: "Xử lý áp lực", score: 75 },
                      ].map((item, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-between items-end">
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                              {item.label}
                            </span>
                            <span className="text-xs font-black text-slate-400">
                              {item.score}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.score}%` }}
                              className="h-full bg-slate-900"
                              transition={{ delay: i * 0.1, duration: 1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[32px] border border-slate-100/50">
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="transparent"
                            stroke="#e2e8f0"
                            strokeWidth="12"
                          />
                          <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="transparent"
                            stroke="#0f172a"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 70}
                            initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                            animate={{
                              strokeDashoffset: 2 * Math.PI * 70 * (1 - 0.92),
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-black text-slate-900">
                            92%
                          </span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Confidence
                          </span>
                        </div>
                      </div>
                      <p className="mt-6 text-[11px] text-slate-500 font-bold text-center leading-relaxed">
                        Bạn thuộc top 8% ứng viên có khả năng xử lý áp lực tốt
                        nhất trong hệ thống.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="col-span-4 flex flex-col gap-6">
                <Card className="p-8 border-none shadow-sm rounded-[32px] bg-slate-900 text-white flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <Lightbulb size={20} className="text-amber-400" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest">
                      Gợi ý từ Chuyên gia
                    </h4>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <h5 className="text-[11px] font-black text-rose-400 uppercase mb-2">
                        Technical Gap
                      </h5>
                      <p className="text-xs font-medium text-white/70 leading-relaxed">
                        Cần đào sâu hơn về "Transaction atomicity" trong MongoDB
                        khi giải thích về thiết kế hệ thống.
                      </p>
                    </div>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <h5 className="text-[11px] font-black text-emerald-400 uppercase mb-2">
                        STAR method Tip
                      </h5>
                      <p className="text-xs font-medium text-white/70 leading-relaxed">
                        Phần "Result" cần có thêm số liệu cụ thể (ví dụ: tăng
                        20% hiệu năng) để tăng tính thuyết phục.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <Button
                      onClick={() => setStage("SETUP")}
                      className="w-full h-14 rounded-2xl bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100"
                    >
                      Luyện tập lại
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-white/40 text-[10px] uppercase font-black tracking-widest hover:text-white"
                    >
                      Tải Report PDF <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
