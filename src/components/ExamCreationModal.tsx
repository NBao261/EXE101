import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BrainCircuit,
  Zap,
  ShieldCheck,
  Clock,
  Target,
  ChevronRight,
  ArrowLeft,
  Lock,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

interface ExamCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceName: string;
  onStartExam?: () => void;
}

export function ExamCreationModal({
  isOpen,
  onClose,
  workspaceName,
  onStartExam,
}: ExamCreationModalProps) {
  const [step, setStep] = useState(1);
  const [isPreparing, setIsPreparing] = useState(false);
  const [config, setConfig] = useState({
    questions: 20,
    time: 45,
    difficulty: "Medium",
    antiCheat: true,
    aiProctor: false,
    types: ["Multiple Choice"],
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleStart = () => {
    setIsPreparing(true);
    setTimeout(() => {
      setIsPreparing(false);
      onClose();
      onStartExam?.();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="max-w-2xl w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-md shadow-brand/20 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between relative bg-gradient-to-r from-brand/10 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center border border-brand/20">
                <BrainCircuit className="text-brand" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Tạo phòng thi giả lập
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {workspaceName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/5 h-1 flex w-full">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "flex-1 h-full transition-all duration-500",
                  s <= step ? "bg-brand" : "bg-white/5",
                )}
              />
            ))}
          </div>

          {/* Content */}
          <div className="p-10 overflow-y-auto flex-1 custom-scrollbar min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isPreparing ? (
                <motion.div
                  key="preparing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="space-y-8 text-center"
                >
                  <div className="relative w-32 h-32 mx-auto">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 border-4 border-brand/20 border-t-brand rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-4 bg-brand/10 rounded-full flex items-center justify-center"
                    >
                      <BrainCircuit size={40} className="text-brand" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                      Đang thiết lập môi trường
                    </h3>
                    <div className="flex flex-col gap-2">
                      <p className="text-slate-400 text-xs font-bold animate-pulse">
                        Khởi tạo hệ thống giám thị AI...
                      </p>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        Workspace: {workspaceName}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Target size={12} /> Số lượng câu hỏi
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {[15, 30, 50, 100].map((n) => (
                          <button
                            key={n}
                            onClick={() =>
                              setConfig({ ...config, questions: n })
                            }
                            className={cn(
                              "h-14 rounded-2xl font-bold transition-all border text-sm",
                              config.questions === n
                                ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10",
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> Thỏi gian giới hạn (phút)
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {[20, 45, 60, 90].map((m) => (
                          <button
                            key={m}
                            onClick={() => setConfig({ ...config, time: m })}
                            className={cn(
                              "h-14 rounded-2xl font-bold transition-all border text-sm",
                              config.time === m
                                ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10",
                            )}
                          >
                            {m}'
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={12} /> Độ khó
                      </label>
                      <div className="flex gap-3">
                        {["Dễ", "Trung bình", "Khó", "Tử thần"].map((d) => (
                          <button
                            key={d}
                            onClick={() =>
                              setConfig({ ...config, difficulty: d })
                            }
                            className={cn(
                              "flex-1 h-14 rounded-2xl font-bold transition-all border text-xs",
                              config.difficulty === d
                                ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10",
                            )}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div
                    onClick={() =>
                      setConfig({ ...config, antiCheat: !config.antiCheat })
                    }
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                      config.antiCheat
                        ? "border-brand bg-brand/5"
                        : "border-white/5 bg-white/5 hover:border-white/10",
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                          config.antiCheat
                            ? "bg-brand text-white"
                            : "bg-white/10 text-slate-400",
                        )}
                      >
                        <Lock size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">
                          Chế độ Anti-Cheat
                        </h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                          Khóa trình duyệt, giám sát chuyển tab và chống
                          copy-paste.
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        config.antiCheat
                          ? "border-brand bg-brand"
                          : "border-white/20",
                      )}
                    >
                      {config.antiCheat && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setConfig({ ...config, aiProctor: !config.aiProctor })
                    }
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                      config.aiProctor
                        ? "border-emerald-500 bg-emerald-500/5"
                        : "border-white/5 bg-white/5 hover:border-white/10",
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                          config.aiProctor
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 text-slate-400",
                        )}
                      >
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">
                          Giám thị AI Real-time
                        </h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                          AI theo dõi hành vi và chấm điểm phong cách làm bài.
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        config.aiProctor
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-white/20",
                      )}
                    >
                      {config.aiProctor && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 text-center"
                >
                  <div className="w-24 h-24 bg-brand/20 border border-brand/20 rounded-2xl mx-auto flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"
                    />
                    <Zap
                      className="text-brand relative z-10"
                      size={40}
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 italic">
                      Sẵn sàng kích hoạt?
                    </h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Hệ thống đã chuẩn bị {config.questions} câu hỏi với độ khó{" "}
                      {config.difficulty}.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-3xl p-6 grid grid-cols-2 gap-4">
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Thỏi gian
                      </p>
                      <p className="text-white font-bold">{config.time} phút</p>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Bảo mật
                      </p>
                      <p className="text-white font-bold">
                        {config.antiCheat ? "Nghiêm ngặt" : "Tự do"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-8 bg-slate-950/50 border-t border-white/5 flex gap-4">
            {step > 1 && (
              <Button
                variant="outline"
                className="h-14 px-8 rounded-2xl border-white/10 text-slate-400 hover:text-white"
                onClick={prevStep}
              >
                <ArrowLeft size={18} className="mr-2" /> Quay lại
              </Button>
            )}
            <Button
              variant="primary"
              className="flex-1 h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-sm shadow-brand/20"
              onClick={step === 3 ? handleStart : nextStep}
              disabled={isPreparing}
            >
              {isPreparing
                ? "Đang kích hoạt..."
                : step === 3
                  ? "Bắt đầu thi ngay"
                  : "Tiếp tục thiết lập"}
              {!isPreparing && step < 3 && (
                <ChevronRight size={18} className="ml-2" />
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
