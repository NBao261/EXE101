import { useState } from 'react'
import { 
  Wallet, 
  History, 
  ArrowDownLeft, 
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Zap,
  Star,
  Plus,
  Minus,
  X,
  QrCode,
  Loader2,
  Trophy
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/utils'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import confetti from 'canvas-confetti'

// --- Mock Data ---

const pricingTiers = [
  {
    name: 'Gói FREE',
    price: '0đ',
    period: '',
    description: 'Bắt đầu hành trình chinh phục tri thức.',
    features: ['1 Folder môn học', 'Quiz cơ bản', 'Lịch sử học tập (7 ngày)'],
    buttonText: 'Đang sử dụng',
    isCurrent: true,
    color: 'bg-slate-100',
    textColor: 'text-slate-600'
  },
  {
    name: 'Gói PRO',
    price: '29.000đ',
    period: '/tháng',
    description: 'Nâng cấp hiệu suất học tập tối đa.',
    features: ['5 Folders môn học', 'Không giới hạn Quiz & Thi thử', 'AI Flashcards nâng cao', 'Lịch sử học tập trọn đời'],
    buttonText: 'Nâng cấp ngay',
    isCurrent: false,
    color: 'bg-brand/10',
    textColor: 'text-brand'
  },
  {
    name: 'Gói PREMIUM',
    price: '59.000đ',
    period: '/tháng',
    description: 'Giải pháp toàn diện cho Đồ án & Luận văn.',
    features: ['Toàn bộ tính năng PRO', 'Logic Audit (Kiểm định báo cáo)', 'Mock Defense (Phòng bảo vệ giả lập)', 'Ưu tiên hỗ trợ 24/7'],
    buttonText: 'Sở hữu ngay',
    isCurrent: false,
    isPremium: true,
    color: 'bg-brand',
    textColor: 'text-white'
  }
];

const spendingData = [
  { day: 'T2', amount: 15 },
  { day: 'T3', amount: 45 },
  { day: 'T4', amount: 30 },
  { day: 'T5', amount: 80 },
  { day: 'T6', amount: 50 },
  { day: 'T7', amount: 95 },
  { day: 'CN', amount: 40 },
];

const transactions = [
  { id: 1, type: 'IN', amount: 120000, label: 'Nạp tiền từ VietQR', date: 'Hôm nay, 10:45', status: 'ĐÃ HOÀN THÀNH' },
  { id: 2, type: 'OUT', amount: 59000, label: 'Gia hạn Gói PREMIUM', date: 'Hôm qua, 08:30', status: 'ĐÃ HOÀN THÀNH' },
  { id: 3, type: 'IN', amount: 25000, label: 'Thưởng học tập (Quiz Win)', date: '17/03/2026', status: 'ĐÃ HOÀN THÀNH' },
  { id: 4, type: 'OUT', amount: 12000, label: 'Mua tài liệu AI-IoT v4.0', date: '16/03/2026', status: 'ĐÃ HOÀN THÀNH' },
]

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'plans' | 'wallet'>('plans');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('50000');
  const [depositStage, setDepositStage] = useState<'INPUT' | 'PENDING' | 'SUCCESS'>('INPUT');

  const handleDeposit = () => {
    setDepositStage('PENDING');
    // Simulate payment verification
    setTimeout(() => {
      setDepositStage('SUCCESS');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399']
      });
    }, 4000);
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
    setTimeout(() => setDepositStage('INPUT'), 300);
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4">
      {/* --- Tab Switcher --- */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-[24px] flex items-center gap-1 shadow-inner border border-slate-200/50">
          {[
            { id: 'plans', label: 'Gói thành viên', icon: Star },
            { id: 'wallet', label: 'Ví của tôi', icon: Wallet }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "relative flex items-center gap-2.5 px-8 py-3.5 rounded-[18px] text-xs font-semibold transition-all duration-300",
                activeTab === tab.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white rounded-[18px] shadow-sm shadow-slate-200"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon size={16} className={cn("relative z-10", activeTab === tab.id ? "text-brand" : "text-slate-400")} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'plans' ? (
          <motion.section 
            key="plans-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Kế hoạch Nâng tầm Tri thức</h2>
              <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed italic">Chọn gói dịch vụ phù hợp để mở khóa toàn bộ sức mạnh của AI trong học tập và nghiên cứu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card 
                  key={tier.name}
                  className={cn(
                    "p-10 flex flex-col items-center text-center transition-all duration-500 rounded-2xl border-none shadow-md relative group",
                    tier.isPremium ? "bg-slate-900 text-white hover:scale-[1.05]" : "bg-white hover:shadow-brand/5 hover:-translate-y-2"
                  )}
                >
                  {tier.isPremium && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand/20 to-transparent blur-[80px] -z-10 group-hover:from-brand/40 transition-all" />
                  )}
                  
                  {tier.isPremium && (
                    <div className="absolute -top-4 bg-brand text-white px-6 py-1.5 rounded-full text-xs font-semibold shadow-sm shadow-brand/30">
                      Nổi bật nhất
                    </div>
                  )}

                  <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 shadow-inner", tier.color)}>
                     {tier.isPremium ? <Trophy className="text-white" size={32} /> : tier.name.includes('PRO') ? <Zap className="text-brand" size={32} /> : <Star className="text-slate-400" size={32} />}
                  </div>

                  <div className="space-y-2 mb-8">
                    <h3 className="text-xs font-semibold opacity-60">{tier.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black tracking-tight">{tier.price}</span>
                      <span className="text-xs font-bold opacity-40">{tier.period}</span>
                    </div>
                    <p className={cn("text-xs font-medium leading-relaxed", tier.isPremium ? "text-slate-400" : "text-slate-500")}>
                      {tier.description}
                    </p>
                  </div>

                  <div className="w-full space-y-4 mb-10 text-left">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className={cn("mt-0.5 shrink-0", tier.isPremium ? "text-emerald-400" : "text-brand")} />
                        <span className={cn("text-xs font-bold", tier.isPremium ? "text-slate-300" : "text-slate-700")}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant={tier.isPremium ? "cta" : tier.isCurrent ? "outline" : "outline"}
                    className={cn(
                      "w-full h-14 rounded-2xl font-semibold text-xs transition-all",
                      tier.isPremium ? "bg-brand text-white hover:bg-white hover:text-brand shadow-brand/20" : tier.isCurrent ? "bg-slate-50 border-slate-100 text-slate-400 cursor-default" : "border-slate-100 text-slate-900 hover:border-brand hover:text-brand"
                    )}
                  >
                    {tier.buttonText}
                  </Button>
                </Card>
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="wallet-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-12 gap-10"
          >
            {/* Balance Card - Fintech Style */}
            <Card className="col-span-12 lg:col-span-5 p-6 bg-white border-2 border-slate-50 shadow-md rounded-2xl flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="flex items-center justify-between mb-16">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-sm">
                       <Wallet className="text-white" size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-black text-slate-900 tracking-tight italic uppercase">Ví Revo</h3>
                       <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Tài khoản hoạt động</span>
                       </div>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tiền tệ</p>
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-900 border border-slate-200">VND (₫)</div>
                 </div>
              </div>

              <div className="space-y-4 mb-16">
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Số dư khả dụng</p>
                 <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-black tracking-tighter text-slate-900 tabular-nums">4.250.000</span>
                    <span className="text-xl font-black text-slate-300">VND</span>
                 </div>
                 <div className="flex items-center gap-3 pt-4">
                    <div className="flex -space-x-2">
                       {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center overflow-hidden">
                             <div className={cn("w-full h-full", i % 2 === 0 ? "bg-brand/20" : "bg-emerald-500/20")}>
                                <UserAvatar size={12} className={i % 2 === 0 ? "text-brand m-2" : "text-emerald-600 m-2"} />
                             </div>
                          </div>
                       ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Cộng đồng tin dùng</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <Button 
                    onClick={() => setIsDepositModalOpen(true)}
                    className="h-16 rounded-[24px] bg-slate-900 text-white font-semibold text-xs shadow-sm shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                 >
                    <Plus size={18} />
                    Nạp tiền
                 </Button>
                 <Button 
                    variant="outline" 
                    className="h-16 rounded-[24px] border-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-all flex items-center gap-3"
                 >
                    <Minus size={18} />
                    Rút tiền
                 </Button>
              </div>
            </Card>

            {/* Stats & History Layer */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-10">
               {/* Spend Stats Chart */}
               <Card className="p-10 bg-white border-none shadow-sm rounded-2xl flex flex-col h-[320px]">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Chi tiêu 7 ngày qua</h3>
                        <p className="text-[10px] text-emerald-500 font-black flex items-center gap-1 mt-1">
                           <TrendingUp size={12} /> Tiết kiệm 12% so với tuần trước
                        </p>
                     </div>
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <TrendingUp size={18} className="text-slate-400" />
                     </div>
                  </div>

                  <div className="flex-1 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={spendingData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis 
                              dataKey="day" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                              dy={10}
                           />
                           <YAxis hide />
                           <Tooltip 
                              cursor={{ fill: '#f8fafc' }}
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                              itemStyle={{ fontSize: '12px', fontWeight: '900', color: '#0f172a' }}
                           />
                           <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={24}>
                              {spendingData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.amount > 70 ? '#10b981' : '#e2e8f0'} className="hover:fill-brand transition-colors duration-300" />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </Card>

               {/* Quick History */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                        <History size={16} className="text-slate-400" /> Giao dịch gần đây
                     </h3>
                     <Button variant="ghost" className="text-[10px] font-black text-brand uppercase tracking-widest">Xem tất cả</Button>
                  </div>

                  <div className="space-y-4">
                     {transactions.map((tx) => (
                       <Card key={tx.id} className="p-6 bg-white border-none shadow-lg rounded-3xl flex items-center justify-between transition-all hover:scale-[1.01]">
                          <div className="flex items-center gap-4">
                             <div className={cn(
                               "w-12 h-12 rounded-2xl flex items-center justify-center",
                               tx.type === 'IN' ? "bg-emerald-50 text-emerald-500" : "bg-slate-50 text-slate-400"
                             )}>
                                {tx.type === 'IN' ? <ArrowDownLeft size={20} /> : <Minus size={18} />}
                             </div>
                             <div>
                                <p className="text-xs font-black text-slate-900">{tx.label}</p>
                                <p className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">{tx.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className={cn("text-sm font-black tracking-tight", tx.type === 'IN' ? "text-emerald-500" : "text-slate-900")}>
                               {tx.type === 'IN' ? '+' : '-'}{tx.amount.toLocaleString()}₫
                             </p>
                             <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">{tx.status}</p>
                          </div>
                       </Card>
                     ))}
                  </div>
               </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* --- Phase 3: VietQR Deposit Modal --- */}
      <AnimatePresence>
        {isDepositModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDepositModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[480px] bg-white rounded-[56px] shadow-md relative z-10 overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                         <QrCode size={20} />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">Nạp tiền qua VietQR</h3>
                   </div>
                   <button onClick={closeDepositModal} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                      <X size={20} />
                   </button>
                </div>

                <AnimatePresence mode="wait">
                  {depositStage === 'INPUT' ? (
                    <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Số tiền cần nạp (VND)</label>
                          <div className="relative">
                            <input 
                              type="number" 
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(e.target.value)}
                              className="w-full h-20 bg-slate-50 border-none px-8 rounded-3xl text-2xl font-black text-slate-900 focus:ring-2 focus:ring-brand/20 transition-all"
                            />
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 uppercase tracking-widest">₫</div>
                          </div>
                          <div className="flex gap-2">
                             {['50000', '100000', '200000', '500000'].map(val => (
                               <button 
                                key={val} 
                                onClick={() => setDepositAmount(val)}
                                className={cn(
                                  "px-4 py-2 rounded-xl text-[10px] font-black transition-all",
                                  depositAmount === val ? "bg-brand text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                )}
                               >
                                  {parseInt(val).toLocaleString()}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="p-6 bg-brand/5 rounded-3xl flex items-center gap-4 border border-brand/10">
                          <ShieldCheck size={24} className="text-brand shrink-0" />
                          <p className="text-[11px] text-brand/80 font-bold leading-relaxed">
                             Giao dịch được xử lý tự động 24/7. Tiền sẽ vào ví của bạn ngay lập tức sau khi giao dịch thành công.
                          </p>
                       </div>

                       <Button 
                        onClick={handleDeposit}
                        className="w-full h-16 rounded-[24px] bg-slate-900 text-white font-semibold text-sm shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
                       >
                         Tiếp tục thanh toán
                       </Button>
                    </motion.div>
                  ) : depositStage === 'PENDING' ? (
                    <motion.div key="pending" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10 text-center">
                       <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                          <div className="w-full aspect-square bg-white rounded-3xl flex items-center justify-center p-4 shadow-inner relative">
                             {/* Mock QR Code */}
                             <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                 <QrCode size={180} className="text-white opacity-20" />
                                 <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-brand/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                                      <img src="https://logos-world.net/wp-content/uploads/2020/04/Mastercard-Logo.png" alt="logo" className="w-10 object-contain" />
                                   </div>
                                </div>
                                <motion.div 
                                  animate={{ y: [-100, 200] }} 
                                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                  className="absolute top-0 left-0 w-full h-1 bg-brand shadow-[0_0_15px_rgba(139,92,246,0.8)] z-10" 
                                />
                             </div>
                          </div>
                          <div className="mt-6 space-y-2">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quét mã để nạp</p>
                             <p className="text-xl font-black text-slate-900">{parseInt(depositAmount).toLocaleString()} VND</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 text-left">
                          <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Ngân hàng</p>
                             <p className="text-xs font-black text-slate-900">MB BANK</p>
                          </div>
                          <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Số tài khoản</p>
                             <p className="text-xs font-black text-slate-900">REVO_9999</p>
                          </div>
                          <div className="col-span-2 space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Nội dung</p>
                             <p className="text-xs font-black text-brand tracking-wider">REVO NP {Math.floor(Math.random() * 100000)}</p>
                          </div>
                       </div>

                       <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-3">
                             <Loader2 size={16} className="text-brand animate-spin" />
                             <span className="text-xs font-semibold text-slate-400">Đang chờ thanh toán...</span>
                          </div>
                          <Button variant="ghost" onClick={closeDepositModal} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50">Hủy giao dịch</Button>
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-12 flex flex-col items-center text-center space-y-8">
                       <div className="w-24 h-24 rounded-2xl bg-emerald-500 shadow-md shadow-emerald-200 flex items-center justify-center text-white scale-110">
                          <ShieldCheck size={48} />
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-2xl font-black text-slate-900">Thanh toán thành công!</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[280px]">
                             Số tiền <strong>{parseInt(depositAmount).toLocaleString()} VND</strong> đã được cộng vào ví Revo của bạn.
                          </p>
                       </div>
                       <Button 
                        onClick={closeDepositModal}
                        className="w-full h-14 rounded-2xl bg-slate-900 text-white font-semibold text-xs shadow-sm"
                       >
                         Hoàn tất
                       </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function UserAvatar({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
