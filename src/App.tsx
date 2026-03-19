import {
  Database,
  Mic2,
  Wallet,
  ShoppingBag,
  ShieldAlert,
  User,
  Settings,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { cn } from "./lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DrivePage from "./pages/DrivePage";
import ThesisPage from "./pages/ThesisPage";
import DefenseLabPage from "./pages/DefenseLabPage";
import CareerLabPage from "./pages/CareerLabPage";
import MarketplacePage from "./pages/MarketplacePage";
import WalletPage from "./pages/WalletPage";
import ExamRoomPage from "./pages/ExamRoomPage";
import StudyRoomPage from "./pages/StudyRoomPage";

const navGroups = [
  {
    title: "Học tập",
    items: [
      { label: "Tệp tài liệu", icon: Database, id: "drive" },
      { label: "Kiểm định báo cáo", icon: ShieldAlert, id: "thesis" },
      { label: "Phòng bảo vệ đồ án", icon: Mic2, id: "defense" },
    ]
  },
  {
    title: "Công cụ",
    items: [
      { label: "Career Lab", icon: Briefcase, id: "career" },
      { label: "Chợ tài liệu", icon: ShoppingBag, id: "marketplace" },
    ]
  },
  {
    title: "Hệ thống",
    items: [
      { label: "Ví Revo", icon: Wallet, id: "wallet" },
      { label: "Cài đặt", icon: Settings, id: "settings" },
    ]
  }
];

const allNavItems = navGroups.flatMap(group => group.items);

export default function App() {
  const [currentTab, setCurrentTab] = useState("drive");
  const [isExamActive, setIsExamActive] = useState(false);
  const [isStudyActive, setIsStudyActive] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text font-sans antialiased selection:bg-brand/20 selection:text-brand relative overflow-x-hidden">
      {/* Navigation Bar (Top) */}
      <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex justify-between items-center px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 bg-brand rounded-md flex items-center justify-center text-white font-bold shadow-lg shadow-brand/30">
            R
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            revo<span className="text-brand"></span>
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[9px] font-bold border border-slate-100 uppercase tracking-widest">
            Phiên bản 1.2.4
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          {/* <div className="hidden lg:flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />{" "}
              Hệ thống sẵn sàng
            </span>
          </div> */}
          {/* <Button
            variant="outline"
            size="sm"
            className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <ShieldAlert size={14} />
            KIỂM TRA LOGIC
          </Button> */}
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:border-brand transition-all">
            <User size={18} className="text-slate-600" />
          </div>
        </motion.div>
      </nav>

      {/* Main Layout Container */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-16 bottom-0 w-20 md:w-72 bg-sidebar border-r border-white/5 z-40 overflow-y-auto custom-scrollbar flex flex-col">
          {/* Search Bar (Modern Cmd+K Feel) */}
          <div className="p-6 hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Settings size={14} className="text-slate-500 group-hover:text-brand transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Tìm nhanh... (⌘K)" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-[11px] font-bold text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand/50 focus:border-brand/50 transition-all"
              />
            </div>
          </div>

          <div className="px-4 py-2 flex flex-col gap-8">
            {navGroups.map((group, groupIdx) => (
              <div key={group.title} className="space-y-4">
                <div className="hidden md:flex items-center justify-between px-3">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{group.title}</span>
                  <ChevronRight size={10} className="text-slate-700" />
                </div>
                
                <div className="flex flex-col gap-1">
                  {group.items.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (groupIdx * 3 + i) * 0.05 }}
                      onClick={() => setCurrentTab(item.id)}
                      className={cn(
                        "group flex items-center gap-3.5 p-3 rounded-lg font-bold transition-all duration-300 relative",
                        currentTab === item.id
                          ? "bg-brand/10 text-brand"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]",
                      )}
                    >
                      {currentTab === item.id && (
                        <motion.div 
                          layoutId="active-pill"
                          className="absolute left-0 w-1 h-5 bg-brand rounded-r-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                        />
                      )}
                      
                      <item.icon
                        size={18}
                        className={cn(
                          "transition-all duration-300",
                          currentTab === item.id
                            ? "text-brand scale-110"
                            : "text-slate-600 group-hover:text-slate-400 group-hover:scale-110",
                        )}
                      />
                      <span className="hidden md:block text-[13px] tracking-tight">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Profile/Status Area */}
          <div className="mt-auto p-6 hidden md:block border-t border-white/5 bg-white/[0.01]">
            <div className="p-5 bg-white/[0.03] rounded-xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center text-brand font-black text-sm">JS</div>
                <div>
                  <p className="text-[11px] font-black text-white leading-none">James Smith</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Thành viên Pro</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Tiến độ</p>
                  <p className="text-[10px] font-black text-brand">75%</p>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    className="h-full bg-brand shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 ml-20 md:ml-72 p-12 bg-background/50 relative bg-grid">
          {/* Subtle Dynamic Background Artifact */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] -z-10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            {/* Context Header */}
            <header className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-3">
                <nav className="flex items-center gap-2 text-[10px] font-black text-brand uppercase tracking-widest mb-4">
                  <span className="px-2.5 py-1 bg-brand/10 border border-brand/20 rounded-xs">
                    REVO AI
                  </span>
                  <span className="text-slate-400">
                    {allNavItems.find((n) => n.id === currentTab)?.label}
                  </span>
                </nav>
                <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
                  {allNavItems.find((n) => n.id === currentTab)?.label}
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
                  {currentTab === "drive" &&
                    "Trung tâm quản trị tri thức tối ưu cho việc học tập và nghiên cứu cá nhân."}
                  {currentTab === "thesis" &&
                    "Hệ thống kiểm định mâu thuẫn văn bản và xác minh tính nhất quán của số liệu."}
                  {currentTab === "defense" &&
                    "Phòng tập phản biện AI giúp bạn tự tin tuyệt đối trước các buổi bảo vệ luận án."}
                  {currentTab === "marketplace" &&
                    "Cộng đồng chia sẻ tài liệu học thuật chất lượng cao đã qua kiểm định logic."}
                  {currentTab === "wallet" &&
                    "Quản lý mã thông báo REV và theo dõi phần thưởng đóng góp tri thức của bạn."}
                  {currentTab === "career" &&
                    "Mô phỏng phỏng vấn tuyển dụng chuyên sâu với chuyên gia AI để chinh phục mọi nhà tuyển dụng."}
                  {currentTab === "settings" &&
                    "Tùy chỉnh hệ thống để phù hợp nhất với phong cách học tập của bạn."}
                </p>
              </div>
              <div className="flex gap-4">
                {/* <Button variant="ghost" size="sm" className="text-slate-400 font-bold hover:text-brand gap-2">
                   <Settings size={18} /> CẤU HÌNH
                 </Button> */}
              </div>
            </header>

            {/* Content Switching Area */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {currentTab === "drive" && (
                  <motion.div
                    key="drive"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DrivePage
                      onStartExam={() => setIsExamActive(true)}
                      onStartStudy={() => setIsStudyActive(true)}
                    />
                  </motion.div>
                )}
                {currentTab === "thesis" && (
                  <motion.div
                    key="thesis"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ThesisPage />
                  </motion.div>
                )}
                {currentTab === "defense" && (
                  <motion.div
                    key="defense"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DefenseLabPage />
                  </motion.div>
                )}
                {currentTab === "career" && (
                  <motion.div
                    key="career"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CareerLabPage />
                  </motion.div>
                )}
                {currentTab === "marketplace" && (
                  <motion.div
                    key="marketplace"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MarketplacePage />
                  </motion.div>
                )}
                {currentTab === "wallet" && (
                  <motion.div
                    key="wallet"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <WalletPage />
                  </motion.div>
                )}
                {currentTab === "settings" && (
                  <div className="h-96 glass-card rounded-md flex flex-col items-center justify-center text-center p-12">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <Settings className="text-slate-300" size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 mt-4">
                      Cấu hình hệ thống
                    </h3>
                    <p className="text-[10px] text-slate-400 max-w-xs font-black uppercase tracking-widest leading-relaxed">
                      Mô-đun cài đặt và quyền hạn đang trong giai đoạn triển
                      khai.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isStudyActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <StudyRoomPage onFinish={() => setIsStudyActive(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Exam Overlay */}
      <AnimatePresence>
        {isExamActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <ExamRoomPage onFinish={() => setIsExamActive(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top decorative / utility */}
      <footer className="fixed bottom-6 right-6 z-50">
        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest rotate-90 origin-right pointer-events-none opacity-50">
          V.12
        </div>
      </footer>
    </div>
  );
}
