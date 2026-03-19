import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, 
  ChevronRight,
  BrainCircuit,
  RotateCw,
  ShieldCheck,
  Download,
} from "lucide-react";
import { Button } from '../components/ui/Button'
import { cn } from '../lib/utils'

interface Finding {
  id: string;
  type: 'Consistency' | 'Standard';
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  recommendation: string;
  sectionId: string;
}

interface Document {
  id: string;
  name: string;
  updatedAt: string;
  status: 'Ready' | 'Scanning' | 'Alert';
}

const mockDocuments: Document[] = [
  { id: 'doc-1', name: 'Báo cáo Đồ án v4.2.pdf', updatedAt: '10:45 SA, Hôm nay', status: 'Alert' },
  { id: 'doc-2', name: 'Đề cương Nghiên cứu.docx', updatedAt: '09:12 SA, Hôm qua', status: 'Ready' },
  { id: 'doc-3', name: 'Tài liệu Tham khảo (Draft).pdf', updatedAt: '15 Thg 3, 2026', status: 'Ready' },
];

const mockFindings: Finding[] = [
  {
    id: 'f1',
    type: 'Consistency',
    severity: 'High',
    title: 'Mâu thuẫn công nghệ',
    description: 'Tại Chương 1 bạn khẳng định sử dụng React, nhưng tại Chương 3 lại mô tả kiến trúc Vue.js.',
    recommendation: 'Đồng nhất stack công nghệ xuyên suốt tài liệu hoặc giải trình lý do thay đổi kiến trúc.',
    sectionId: 'sec-3'
  },
  {
    id: 'f2',
    type: 'Consistency',
    severity: 'Medium',
    title: 'Thiếu trích dẫn nguồn',
    description: 'Đoạn văn về "Thị trường EdTech 2024" chưa có nguồn tham chiếu cụ thể.',
    recommendation: 'Bổ sung trích dẫn từ các nguồn uy tín như Gartner hoặc Statista (2024).',
    sectionId: 'sec-1'
  },
  {
    id: 'f3',
    type: 'Standard',
    severity: 'Low',
    title: 'Sai định dạng bảng',
    description: 'Bảng 2.1 chưa tuân thủ quy chuẩn IEEE (Thiếu chú thích phía trên).',
    recommendation: 'Di chuyển caption của bảng lên phía trên và căn giữa.',
    sectionId: 'sec-2'
  }
];

export default function ThesisPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Consistency' | 'Standard'>('Consistency');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState('doc-1');
  const [score] = useState(88);
  
  // Refs for auto-scroll
  const sectionRefs = {
    'sec-1': useRef<HTMLDivElement>(null),
    'sec-2': useRef<HTMLDivElement>(null),
    'sec-3': useRef<HTMLDivElement>(null),
  };

  const selectedDoc = mockDocuments.find(d => d.id === selectedDocId) || mockDocuments[0];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 1500);
  };

  const scrollToEvidence = (sectionId: string, findingId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedId(findingId);
      setTimeout(() => setHighlightedId(null), 3000);
    }
  };

  const filteredFindings = mockFindings.filter(f => f.type === activeTab);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Document Selection & Upload Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">Kiểm định Dự án</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Chọn tài liệu để bắt đầu phân tích logic</p>
          </div>
          <Button 
            variant="ghost" 
            className="text-xs font-semibold text-brand hover:bg-brand/5"
          >
            Quản lý tất cả <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mockDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={cn(
                "group relative bg-white p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden",
                selectedDocId === doc.id 
                  ? "border-brand shadow-sm shadow-brand/10 ring-1 ring-brand/20" 
                  : "border-slate-100 hover:border-slate-200 hover:shadow-lg"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  selectedDocId === doc.id ? "bg-brand text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100 transition-colors"
                )}>
                  <FileText size={20} />
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  doc.status === 'Alert' ? "bg-rose-500 animate-pulse" : 
                  doc.status === 'Scanning' ? "bg-brand animate-spin" : "bg-emerald-500"
                )} />
              </div>
              <h4 className={cn(
                "text-sm font-black tracking-tight mb-1 truncate",
                selectedDocId === doc.id ? "text-slate-900" : "text-slate-600"
              )}>
                {doc.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                {doc.updatedAt}
              </p>

              {selectedDocId === doc.id && (
                <motion.div 
                  layoutId="active-bg"
                  className="absolute bottom-0 left-0 w-full h-1 bg-brand"
                />
              )}
            </button>
          ))}

          {/* Upload New Card */}
          <button
            onClick={handleUpload}
            className="group relative h-full min-h-[140px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-brand/40 hover:bg-brand/[0.02] transition-all overflow-hidden"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-3">
                <RotateCw className="text-brand animate-spin" size={24} />
                <span className="text-[10px] font-black text-brand uppercase tracking-widest">Đang tải lên...</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <RotateCw size={20} className="text-slate-400 group-hover:text-brand transition-colors" />
                </div>
                <span className="text-[10px] text-slate-400 font-semibold group-hover:text-brand transition-colors">Tải lên đồ án</span>
              </>
            )}
          </button>
        </div>
      </section>

      <div className="flex flex-col bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden" style={{ height: 'calc(100vh - 420px)', minHeight: '500px' }}>
        {/* Professional Toolbar */}
        <header className="h-16 flex items-center justify-between px-8 bg-slate-50 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center">
              <ShieldCheck size={16} className="text-brand" />
            </div>
            <div>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-tight leading-none mb-1">
                {selectedDoc.name}
              </h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                KIỂM ĐỊNH LOGIC TỰ ĐỘNG
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="h-10 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all"
            >
              <Download size={14} className="mr-2" /> Xuất báo cáo
            </Button>
            <Button 
              variant="primary" 
              disabled={isScanning}
              onClick={handleScan}
              className="h-10 px-6 rounded-xl text-xs font-semibold shadow-lg shadow-brand/20 flex items-center gap-2"
            >
              <RotateCw size={14} className={cn(isScanning && "animate-spin")} />
              {isScanning ? "Đang quét..." : "Quét lại tài liệu"}
            </Button>
          </div>
        </header>

        {/* Split View Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side: Document Viewer (60%) */}
          <div className="w-[60%] border-r border-slate-100 overflow-y-auto bg-[#F1F5F9]/30 p-12 custom-scrollbar scroll-smooth">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-sm min-h-screen p-16 space-y-12 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand/10" />
              
              {/* Sec 1 */}
              <section ref={sectionRefs['sec-1']} className="space-y-6">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Chương 1: Tổng quan và đặt vấn đề</h1>
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-700",
                  highlightedId === 'f2' ? "bg-amber-100/50 ring-2 ring-amber-200" : ""
                )}>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    Trong kỷ nguyên số, EdTech Pro Max không chỉ là một nền tảng học tập, mà còn là một hệ sinh thái tri thức. 
                    Sự phát triển của thị trường EdTech năm 2024 đạt được những con số ấn tượng về cả người dùng và doanh thu, 
                    khẳng định vị thế chuyển đổi số trong giáo dục là không thể đảo ngược.
                  </p>
                </div>
              </section>

              {/* Sec 2 */}
              <section ref={sectionRefs['sec-2']} className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 tracking-tight">2.1. Phân tích đối tượng người dùng</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Người dùng mục tiêu của hệ thống bao gồm học sinh, sinh viên và các học giả nghiên cứu độc lập. 
                  Dưới đây là bảng thống kê sơ bộ về hành vi sử dụng:
                </p>
                <div className={cn(
                  "p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all duration-700",
                  highlightedId === 'f3' ? "bg-amber-100/50 ring-2 ring-amber-200" : ""
                )}>
                  <div className="h-40 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 font-bold italic">
                    [Table 2.1: User Behavior Metrics]
                  </div>
                </div>
              </section>

              {/* Sec 3 */}
              <section ref={sectionRefs['sec-3']} className="space-y-6">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Chương 3: Kiến trúc Hệ thống</h1>
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-700",
                  highlightedId === 'f1' ? "bg-amber-100/50 ring-2 ring-amber-200" : ""
                )}>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    Kiến trúc cốt lõi của Revo AI được xây dựng dựa trên các Component của Vue.js, nhằm tận dụng tối đa 
                    tính linh hoạt của Composition API. Điều này cho phép hệ thống phản hồi nhanh (Reactivity) và 
                    tối ưu hóa việc render lại các thành phần phức tạp...
                  </p>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Việc tích hợp Logic Audit vào luồng công việc của Thesis Advisor giúp giảm thiểu sai sót chủ quan 
                  và tăng tính chuyên nghiệp cho tài liệu cuối cùng.
                </p>
              </section>
            </div>
          </div>

          {/* Right Side: Audit Panel (40%) */}
          <div className="w-[40%] bg-slate-50 overflow-y-auto custom-scrollbar p-8 space-y-8">
            {/* Readiness Score Gauge */}
            <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm flex flex-col items-center">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Điểm sẵn sàng</h3>
              
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="96" cy="96" r="88"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-slate-100"
                  />
                  <motion.circle
                    cx="96" cy="96" r="88"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 88}
                    initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className={cn(
                      "transition-colors duration-500",
                      score < 50 ? "text-rose-500" : score < 85 ? "text-brand" : "text-emerald-500"
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-5xl font-black text-slate-900 tracking-tighter"
                  >
                    {score}%
                  </motion.span>
                  <span className={cn(
                    "text-xs font-semibold px-3 py-1 rounded-full mt-2 shadow-sm bg-white border border-slate-50",
                    score < 50 ? "text-rose-500" : score < 85 ? "text-brand" : "text-emerald-500"
                  )}>
                    {score < 50 ? "Rủi ro cao" : score < 85 ? "Cần cải thiện" : "Sẵn sàng nộp"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex gap-4 w-full">
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Lỗi sai</p>
                  <p className="text-xl font-black text-rose-500">03</p>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Mâu thuẫn</p>
                  <p className="text-xl font-black text-amber-500">01</p>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Đạt chuẩn</p>
                  <p className="text-xl font-black text-emerald-500">12</p>
                </div>
              </div>
            </section>

            {/* Logic Findings List */}
            <section>
               <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-6 sticky top-0 z-10 border border-slate-200">
                 <button 
                  onClick={() => setActiveTab('Consistency')}
                  className={cn(
                    "flex-1 h-10 rounded-xl text-xs font-semibold transition-all",
                    activeTab === 'Consistency' ? "bg-white text-brand shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  )}
                 >
                   Tính nhất quán nội bộ
                 </button>
                 <button 
                  onClick={() => setActiveTab('Standard')}
                  className={cn(
                    "flex-1 h-10 rounded-xl text-xs font-semibold transition-all",
                    activeTab === 'Standard' ? "bg-white text-brand shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  )}
                 >
                   Tuân thủ chuẩn mực
                 </button>
               </div>

               <div className="space-y-4 pb-8">
                 <AnimatePresence mode="popLayout">
                   {filteredFindings.map((finding) => (
                     <motion.div
                      key={finding.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-sm hover:border-brand/20 transition-all cursor-pointer"
                     >
                       <div className="flex items-start justify-between mb-4">
                         <div className={cn(
                           "px-2.5 py-1 rounded-lg text-[11px] font-semibold",
                           finding.severity === 'High' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                           finding.severity === 'Medium' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                           "bg-emerald-50 text-emerald-600 border border-emerald-100"
                         )}>
                           MỨC ĐỘ: {finding.severity === 'High' ? 'CAO' : finding.severity === 'Medium' ? 'TRUNG BÌNH' : 'THẤP'}
                         </div>
                         <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToEvidence(finding.sectionId, finding.id);
                          }}
                          className="h-8 px-3 rounded-lg text-xs font-semibold text-brand hover:bg-brand/5 border border-brand/10 transition-all"
                         >
                           Xem bằng chứng <ChevronRight size={12} className="ml-1" />
                         </Button>
                       </div>
                       
                       <h4 className="text-base font-black text-slate-900 mb-2">{finding.title}</h4>
                       <p className="text-xs text-slate-500 font-bold leading-relaxed mb-6">
                         {finding.description}
                       </p>

                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-slate-100 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <BrainCircuit size={14} className="text-brand" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đề xuất từ AI</span>
                          </div>
                          <p className="text-xs text-slate-600 font-bold leading-relaxed">
                            {finding.recommendation}
                          </p>
                       </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
