import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FileText,
  Plus,
  Search,
  Filter,
  MoreVertical,
  BrainCircuit,
  Zap,
  Trash2,
  ChevronRight,
  Play,
  ArrowLeft,
  Clock,
  ListTodo,
  UploadCloud,
  Sparkles,
  X as LucideX,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import { cn } from "../lib/utils";
import { ExamCreationModal } from "../components/ExamCreationModal";

interface GeneratedContent {
  id: number;
  title: string;
  type: "QUIZ" | "FLASHCARDS";
  questions: number;
  progress: number;
  date: string;
}

interface Workspace {
  id: number;
  name: string;
  subject: string;
  count: number;
  size: string;
  color: string;
  progress: number;
  generatedContent: GeneratedContent[];
}

const workspaces: Workspace[] = [
  {
    id: 1,
    name: "Kiến trúc Hệ thống",
    subject: "Kỹ thuật",
    count: 12,
    size: "45.2 MB",
    color: "bg-emerald-500/10",
    progress: 85,
    generatedContent: [
      {
        id: 1,
        title: "Đại số trừu tượng cơ bản",
        type: "QUIZ",
        questions: 30,
        progress: 65,
        date: "1 giờ trước",
      },
      {
        id: 2,
        title: "Thuật toán Machine Learning",
        type: "FLASHCARDS",
        questions: 50,
        progress: 20,
        date: "3 giờ trước",
      },
    ],
  },
  {
    id: 2,
    name: "Triết học Hiện đại",
    subject: "Phương pháp luận",
    count: 8,
    size: "12.8 MB",
    color: "bg-emerald-500/10",
    progress: 42,
    generatedContent: [
      {
        id: 3,
        title: "Hiện tượng học",
        type: "QUIZ",
        questions: 15,
        progress: 10,
        date: "2 giờ trước",
      },
    ],
  },
  {
    id: 3,
    name: "Phân tích Tài chính",
    subject: "Kinh doanh",
    count: 24,
    size: "1.2 GB",
    color: "bg-emerald-500/10",
    progress: 68,
    generatedContent: [],
  },
  {
    id: 4,
    name: "Toán học Rời rạc",
    subject: "Cơ bản",
    count: 5,
    size: "8.4 MB",
    color: "bg-emerald-500/10",
    progress: 92,
    generatedContent: [],
  },
];

const files = [
  {
    id: 1,
    name: "Abstract_Algebra_Final.pdf",
    type: "PDF",
    date: "10 Thg 3, 2026",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Machine_Learning_Notes.docx",
    type: "DOCX",
    date: "12 Thg 3, 2026",
    size: "1.1 MB",
  },
  {
    id: 3,
    name: "Thesis_Outline_v4.pdf",
    type: "PDF",
    date: "15 Thg 3, 2026",
    size: "0.8 MB",
  },
  {
    id: 4,
    name: "System_Architecture_Diag.png",
    type: "IMAGE",
    date: "18 Thg 3, 2026",
    size: "4.5 MB",
  },
];

interface AIStudyFile {
  id: number;
  name: string;
  type: string;
  size: string;
}

export default function DrivePage({
  onStartExam,
  onStartStudy,
}: {
  onStartExam?: () => void;
  onStartStudy?: () => void;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCreatingExam, setIsCreatingExam] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(
    null,
  );
  const [examConfig, setExamConfig] = useState({ questions: 20, time: 45 });
  const [droppedFiles, setDroppedFiles] = useState<AIStudyFile[]>([]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // Check if it's an internal drag
    const internalFileId = e.dataTransfer.getData("application/revo-file-id");
    if (internalFileId) {
      const fileToDrop = files.find((f) => f.id === parseInt(internalFileId));
      if (fileToDrop && !droppedFiles.some((f) => f.id === fileToDrop.id)) {
        setDroppedFiles([...droppedFiles, { ...fileToDrop, id: Date.now() }]);
      }
      return;
    }

    // Handle external files
    const newFiles = [
      {
        id: Date.now(),
        name: "Tai_lieu_tai_len_1.pdf",
        type: "PDF",
        size: "1.2 MB",
      },
      {
        id: Date.now() + 1,
        name: "Phan_tich_san_sang.docx",
        type: "DOCX",
        size: "0.5 MB",
      },
    ];
    setDroppedFiles([...droppedFiles, ...newFiles]);
  };

  const onDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("application/revo-file-id", id.toString());
  };

  const removeFile = (id: number) => {
    setDroppedFiles(droppedFiles.filter((f) => f.id !== id));
  };

  const selectedWorkspace = workspaces.find(
    (w) => w.id === selectedWorkspaceId,
  );

  return (
    <div className="space-y-12 pb-12">
      <AnimatePresence mode="wait">
        {!selectedWorkspaceId ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {/* Action Bar */}
            <section className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-md">
              <div className="flex-1 w-full max-w-lg relative">
                <Input
                  placeholder="Tìm kiếm trong kho bài học..."
                  className="pl-12 h-12 bg-slate-50 border-none focus:ring-2 focus:ring-brand/20 rounded-xl"
                />
                <Search
                  className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 md:flex-none h-12 px-6 rounded-xl border-slate-100 font-bold text-slate-600 bg-white"
                >
                  <Filter size={16} className="mr-2" /> Lọc
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 md:flex-none h-12 px-8 rounded-xl font-bold shadow-lg shadow-brand/20"
                >
                  <Plus size={20} className="mr-2" /> Tạo workspace
                </Button>
              </div>
            </section>

            {/* Workspaces Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                    <Folder size={18} className="text-brand" />
                  </div>
                  Không gian học tập chính
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  4 Workspace tích cực
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {workspaces.map((w, i) => (
                  <Card
                    key={w.id}
                    onClick={() => setSelectedWorkspaceId(w.id)}
                    className="p-6 cursor-pointer group bg-white border-slate-50 rounded-2xl shadow-sm hover:shadow-sm transition-all duration-500"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm",
                        )}
                      >
                        <Folder size={24} />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                          {w.subject}
                        </div>
                        <div className="text-xs font-black text-brand">
                          {w.progress}% Hoàn tất
                        </div>
                      </div>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-1 group-hover:text-brand transition-colors">
                      {w.name}
                    </h4>
                    <p className="text-sm text-slate-400 font-medium mb-5">
                      {w.count} tài liệu • {w.size}
                    </p>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${w.progress}%` }}
                        className={cn(
                          "h-full rounded-full",
                          w.progress > 80
                            ? "bg-emerald-500"
                            : w.progress > 50
                              ? "bg-brand"
                              : "bg-amber-500",
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Global Files Section */}
            <section className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                      <FileText size={18} className="text-brand" />
                    </div>
                    Lịch sử upload tài liệu
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand font-black text-xs hover:bg-brand/5"
                  >
                    XEM TẤT CẢ
                  </Button>
                </div>
                <Card className="divide-y divide-slate-50 p-0 overflow-hidden shadow-lg border-slate-100 rounded-2xl">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                          <FileText
                            size={22}
                            className="text-slate-400 group-hover:text-brand shadow-sm"
                          />
                        </div>
                        <div>
                          <p className="text-[15px] font-black text-slate-900 group-hover:text-brand transition-colors">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                            {file.type} • {file.date} • {file.size}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-8">
                <Card className="p-8 rounded-2xl shadow-lg border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      CẦN ÔN TẬP (SRS)
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
                  </div>
                  <div className="space-y-5">
                    {[
                      {
                        name: "Đồ thị Euler",
                        sub: "Toán học Rời rạc",
                        urgency: "high",
                      },
                      {
                        name: "CAP Theorem",
                        sub: "Kiến trúc Hệ thống",
                        urgency: "med",
                      },
                    ].map((srs, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-brand/20 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                            <BrainCircuit
                              size={18}
                              className="text-brand group-hover:text-white"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">
                              {srs.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">
                              {srs.sub}
                            </p>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            srs.urgency === "high"
                              ? "bg-red-500"
                              : "bg-amber-500",
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-6 text-xs font-black text-brand uppercase tracking-widest hover:bg-brand/5"
                  >
                    Xem lịch trình ôn tập
                  </Button>
                </Card>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            {/* Detail Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  <span
                    className="hover:text-brand cursor-pointer transition-colors"
                    onClick={() => setSelectedWorkspaceId(null)}
                  >
                    Tài liệu
                  </span>
                  <ChevronRight size={10} className="text-slate-300" />
                  <span className="text-brand">{selectedWorkspace?.name}</span>
                </nav>
                <div className="flex items-center gap-5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedWorkspaceId(null)}
                    className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 group"
                  >
                    <ArrowLeft
                      size={20}
                      className="text-slate-400 group-hover:text-brand transition-colors"
                    />
                  </Button>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                    {selectedWorkspace?.name}
                  </h2>
                </div>
              </div>
              <div className="flex gap-3">
                {/* <Button
                  variant="outline"
                  className="h-14 px-8 rounded-2xl font-black border-slate-100 text-slate-600 bg-white"
                >
                  <Settings2 size={18} className="mr-2" /> Cài đặt Drive
                </Button> */}
                <Button
                  variant="primary"
                  className="h-14 px-10 rounded-2xl font-black shadow-lg shadow-brand/20"
                >
                  <Plus size={20} className="mr-2" /> Thêm tài liệu
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Left Column: Progress & Files */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                {/* Workspace Progress Dashboard */}
                <Card className="p-8 border-none bg-white shadow-sm rounded-2xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] pointer-events-none" />
                  <div className="flex items-start justify-between mb-10">
                    <div>
                      <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-2">
                        Tiến độ chinh phục
                      </p>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Cấp độ thông thạo: {selectedWorkspace?.progress}%
                      </h3>
                    </div>
                    <div className="p-4 bg-brand/10 text-brand rounded-2xl">
                      <Zap size={24} fill="currentColor" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedWorkspace?.progress}%` }}
                        className="h-full bg-brand rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Tăng tốc học tập</span>
                      <span>850 / 1000 XP kiến thức</span>
                    </div>
                  </div>
                </Card>

                {/* Workspace Specific Files */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                        <ListTodo size={18} className="text-brand" />
                      </div>
                      Danh mục tài liệu
                    </h3>
                  </div>
                  <Card className="divide-y divide-slate-50 p-0 overflow-hidden shadow-sm border-slate-100 rounded-2xl bg-white">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        draggable="true"
                        onDragStart={(e) => onDragStart(e, file.id)}
                        className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-brand/10 transition-colors shadow-sm">
                            <FileText
                              size={24}
                              className="text-slate-400 group-hover:text-brand"
                            />
                          </div>
                          <div>
                            <p className="text-lg font-black text-slate-900 group-hover:text-brand transition-colors mb-1">
                              {file.name}
                            </p>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                              {file.type} • {file.date} • {file.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="px-3 py-1 bg-brand/5 text-brand rounded-full text-[11px] font-black uppercase tracking-wider">
                            Kéo vào AI Lab
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-slate-300 hover:text-slate-600 rounded-xl hover:bg-slate-50"
                          >
                            <MoreVertical size={20} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>

                {/* Generated Content Section */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <Sparkles size={18} className="text-indigo-500" />
                      </div>
                      Flashcards & Quiz đã tạo
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {selectedWorkspace?.generatedContent?.map(
                      (item: GeneratedContent) => (
                        <Card
                          key={item.id}
                          className="p-6 hover:shadow-md hover:shadow-indigo-500/10 transition-all group border-slate-100 bg-white/50 backdrop-blur-sm relative overflow-hidden"
                        >
                          <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110",
                                  item.type === "QUIZ"
                                    ? "bg-emerald-50 text-emerald-500"
                                    : "bg-indigo-50 text-indigo-500",
                                )}
                              >
                                {item.type === "QUIZ" ? (
                                  <BrainCircuit size={22} />
                                ) : (
                                  <Zap size={22} />
                                )}
                              </div>
                              <div>
                                <h4 className="font-black text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                                  {item.title}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                                    {item.type === "QUIZ" ? "TRẮC NGHIỆM" : "THẺ GHI NHỚ"}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-400">
                                    • {item.questions} câu
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-300"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </div>

                          <div className="mt-8 space-y-3">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-slate-400 italic">
                                Tiến độ hoàn thành
                              </span>
                              <span className="text-indigo-500">
                                {item.progress}%
                              </span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                className={cn(
                                  "h-full rounded-full",
                                  item.type === "QUIZ"
                                    ? "bg-emerald-500"
                                    : "bg-indigo-500",
                                )}
                              />
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 italic">
                              Cập nhật: {item.date}
                            </span>
                            <Button
                              className={cn(
                                "h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg",
                                item.type === "QUIZ"
                                  ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                                  : "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/20 text-white",
                              )}
                              onClick={onStartStudy}
                            >
                              Học tiếp
                            </Button>
                          </div>
                        </Card>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Study Lab & SRS */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* AI Study Generator Card */}
                <Card className="p-10 border-none bg-white shadow-md rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-12 -mt-12 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center shadow-sm shadow-brand/20">
                      <BrainCircuit className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      Phòng Học AI
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
                    Kỹ thuật số hóa tri thức từ tài liệu thành Flashcards & Quiz
                    thông minh.
                  </p>

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={cn(
                      "mb-8 p-6 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer",
                      isDragging
                        ? "border-brand bg-brand/5 scale-[1.02]"
                        : "border-slate-100 bg-slate-50/50 hover:border-brand/30",
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300",
                        isDragging
                          ? "bg-brand text-white scale-110"
                          : "bg-white text-slate-400",
                      )}
                    >
                      <UploadCloud size={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black text-slate-900 mb-1">
                        Kéo thả tài liệu vào đây
                      </p>
                      {/* <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        Hoặc click để chọn tệp
                      </p> */}
                    </div>
                  </div>

                  {/* Dropped Files List */}
                  {droppedFiles.length > 0 && (
                    <div className="space-y-2 mb-8 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                      {droppedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group/file"
                        >
                          <div className="flex items-center gap-3">
                            <FileText size={16} className="text-brand" />
                            <span className="text-[11px] font-bold text-slate-600 truncate max-w-[120px]">
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <LucideX size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* <div className="grid grid-cols-2 gap-4 mb-10">
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 rounded-2xl border-slate-100 hover:border-brand hover:bg-brand/5 group/btn"
                    >
                      <span className="text-xs font-black text-slate-400 group-hover/btn:text-brand">
                        FLASHCARDS
                      </span>
                      <span className="text-[10px] font-bold text-slate-300">
                        120 bộ đã tạo
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 rounded-2xl border-slate-100 hover:border-brand hover:bg-brand/5 group/btn"
                    >
                      <span className="text-xs font-black text-slate-400 group-hover/btn:text-brand">
                        POP QUIZ
                      </span>
                      <span className="text-[10px] font-bold text-slate-300">
                        15 đề luyện tập
                      </span>
                    </Button>
                  </div> */}

                  <Button
                    variant="primary"
                    className="w-full h-14 rounded-2xl font-black shadow-lg shadow-brand/20 uppercase tracking-widest text-xs"
                    onClick={() => setIsGenerating(true)}
                  >
                    {droppedFiles.length > 0
                      ? `Tạo từ ${droppedFiles.length} tài liệu đã chọn`
                      : "Tạo từ tất cả tài liệu"}
                  </Button>
                </Card>

                {/* Mock Exam Room Card */}
                <Card className="p-10 bg-slate-900 border-none text-white rounded-2xl shadow-md relative overflow-hidden group">
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand/10 blur-3xl pointer-events-none" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <Play className="text-white fill-white" size={20} />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">
                      Phòng thi giả lập
                    </h3>
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <ListTodo size={12} /> Số lượng câu hỏi
                      </label>
                      <div className="flex gap-2">
                        {[10, 20, 40, 60].map((num) => (
                          <button
                            key={num}
                            onClick={() =>
                              setExamConfig({ ...examConfig, questions: num })
                            }
                            className={cn(
                              "flex-1 h-12 rounded-xl text-xs font-black transition-all border",
                              examConfig.questions === num
                                ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10",
                            )}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> Thời gian làm bài
                      </label>
                      <div className="flex gap-2">
                        {[15, 30, 45, 60].map((mins) => (
                          <button
                            key={mins}
                            onClick={() =>
                              setExamConfig({ ...examConfig, time: mins })
                            }
                            className={cn(
                              "flex-1 h-12 rounded-xl text-xs font-black transition-all border",
                              examConfig.time === mins
                                ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10",
                            )}
                          >
                            {mins}'
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full h-14 rounded-2xl font-black shadow-lg shadow-brand/20 uppercase tracking-widest text-xs mt-4"
                    onClick={() => setIsCreatingExam(true)}
                  >
                    Tạo phòng thi giả lập
                  </Button>
                  <p className="mt-6 text-center text-[10px] font-bold text-slate-500 tracking-widest">
                    CHẾ ĐỘ GIÁM SÁT AI ĐANG BẬT
                  </p>
                </Card>

                {/* Local SRS List */}
                <Card className="p-8 rounded-2xl shadow-sm border-slate-100 bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      CẦN ÔN TẬP (SRS)
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
                  </div>
                  <div className="space-y-5">
                    {[
                      {
                        name: "Lý thuyết Vector",
                        sub: "Phiên học thứ 3",
                        urgency: "high",
                      },
                      {
                        name: "Kiểm định Unit Test",
                        sub: "Phiên học thứ 1",
                        urgency: "med",
                      },
                    ].map((srs, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-brand/20 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                            <BrainCircuit
                              size={18}
                              className="text-brand group-hover:text-white"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 leading-tight">
                              {srs.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">
                              {srs.sub}
                            </p>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            srs.urgency === "high"
                              ? "bg-red-500"
                              : "bg-amber-500",
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-6 text-xs font-black text-brand uppercase tracking-widest hover:bg-brand/5 py-4 rounded-xl"
                  >
                    Mở trung tâm SRS
                  </Button>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exam Creation Modal Flow */}
      <ExamCreationModal
        isOpen={isCreatingExam}
        onClose={() => setIsCreatingExam(false)}
        workspaceName={selectedWorkspace?.name || "Workspace"}
        onStartExam={onStartExam}
      />

      {/* AI Processing Modal */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <Card className="max-w-md w-full p-6 text-center shadow-md relative border-none rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setIsGenerating(false)}
                className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <Trash2 size={20} />
              </button>

              <div className="relative w-32 h-32 mx-auto mb-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-brand/5 border-t-brand rounded-full"
                />
                <div className="absolute inset-6 bg-brand/5 rounded-full flex items-center justify-center shadow-inner">
                  <BrainCircuit
                    size={48}
                    className="text-brand animate-pulse"
                  />
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                Xử lý thần kinh
              </h2>
              <p className="text-[15px] text-slate-500 mb-10 px-6 font-medium leading-relaxed">
                Đang phân tích logic tài liệu và vector hóa để truy xuất ngữ
                nghĩa thông minh...
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[10px] font-black text-brand uppercase tracking-widest justify-center bg-brand/5 py-2 px-4 rounded-full self-center">
                  <span className="animate-pulse">Đang xử lý</span>
                  <ChevronRight size={10} className="text-brand/30" />
                  <span className="text-slate-900">Lớp nhúng 4</span>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 h-12 rounded-xl font-bold border-slate-100 text-slate-400"
                  onClick={() => setIsGenerating(false)}
                >
                  Hủy tổng hợp
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
