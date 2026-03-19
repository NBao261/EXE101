import {
  ShoppingBag,
  Search as LucideSearch,
  Award,
  TrendingUp,
  X,
  Star,
  Download,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  LineChart as LucideLineChart,
} from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

// --- Mock Data ---

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "quiz", label: "Bộ câu hỏi" },
  { id: "flashcard", label: "Thẻ ghi nhớ" },
  { id: "fullset", label: "Bộ đầy đủ" },
  { id: "summary", label: "Tóm tắt" },
];

const materials = [
  {
    id: 1,
    name: "Tối ưu hóa thuật toán AI trong IoT",
    creator: "Minh Tuấn",
    creatorMastery: 94,
    price: 1500,
    type: "Bộ câu hỏi",
    downloads: 124,
    rating: 4.8,
    isAudited: true,
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
    subject: "AI & Machine Learning",
  },
  {
    id: 2,
    name: "Kiến trúc Microservices với Node.js",
    creator: "Lan Anh",
    creatorMastery: 92,
    price: 2200,
    type: "Bộ đầy đủ",
    downloads: 89,
    rating: 4.9,
    isAudited: true,
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=500&q=80",
    subject: "Software Architecture",
  },
  {
    id: 3,
    name: "Dataset nhận diện khuôn mặt người Việt",
    creator: "AI Lab",
    creatorMastery: 98,
    price: 5000,
    type: "Bộ đầy đủ",
    downloads: 412,
    rating: 4.7,
    isAudited: false,
    thumbnail:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=500&q=80",
    subject: "Computer Vision",
  },
  {
    id: 4,
    name: "Hướng dẫn viết Thesis chuẩn IEEE",
    creator: "Academic Office",
    creatorMastery: 95,
    price: 0,
    type: "Thẻ ghi nhớ",
    downloads: 1205,
    rating: 5.0,
    isAudited: true,
    thumbnail:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
    subject: "Academic Writing",
  },
];

const topCreators = [
  { id: 1, name: "Minh Tuấn", mastery: 94, avatar: "MT", sales: 450 },
  { id: 2, name: "Lan Anh", mastery: 92, avatar: "LA", sales: 380 },
  { id: 3, name: "Hoàng Long", mastery: 96, avatar: "HL", sales: 310 },
];

export default function MarketplacePage() {
  const [view, setView] = useState<"storefront" | "studio">("storefront");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<
    (typeof materials)[0] | null
  >(null);
  const [purchaseStep, setPurchaseStep] = useState<
    "IDLE" | "PURCHASING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);

  const earningsData = [
    { month: "Th1", amount: 4500 },
    { month: "Th2", amount: 5200 },
    { month: "Th3", amount: 4800 },
    { month: "Th4", amount: 6100 },
    { month: "Th5", amount: 5900 },
    { month: "Th6", amount: 7500 },
  ];

  const handleAuditAndPublish = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditComplete(true);
    }, 3000);
  };

  const handlePurchase = () => {
    setPurchaseStep("PURCHASING");
    setTimeout(() => {
      // Simulate checking balance (assume user has enough based on mock data)
      setPurchaseStep("SUCCESS");
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4">
      {/* Header with Search & Mode Switcher */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">Chợ Tài Liệu</h2>
          <p className="text-slate-500 font-bold text-sm tracking-tight flex items-center gap-2">
            <Sparkles size={16} className="text-brand" /> Khám phá & Trao đổi tài nguyên học thuật chất lượng cao
          </p>
        </div> */}

        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto overflow-hidden shadow-inner">
          <button
            onClick={() => setView("storefront")}
            className={cn(
              "flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-xs font-semibold transition-all",
              view === "storefront"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            Chợ tài liệu
          </button>
          <button
            onClick={() => setView("studio")}
            className={cn(
              "flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-xs font-semibold transition-all",
              view === "studio"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            Xưởng sáng tạo
          </button>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {view === "storefront" ? (
          <motion.div
            key="storefront"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-12 gap-8"
          >
            {/* Main Marketplace Area */}
            <div className="col-span-12 lg:col-span-9 space-y-8">
              {/* Category Toggles & Search */}
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={cn(
                        "whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all",
                        activeCategory === c.id
                          ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                          : "bg-white border-slate-100 text-slate-400 hover:border-brand/30 hover:text-brand",
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-72 group">
                  <Input
                    placeholder="Tìm môn học, tác giả..."
                    className="h-12 pl-12 bg-white border-slate-100 rounded-2xl group-hover:border-brand/40 transition-colors shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <LucideSearch
                    className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand transition-colors"
                    size={18}
                  />
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {materials.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => setSelectedMaterial(item)}
                    className="group border-none bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col"
                  >
                    {/* Thumbnail Area */}
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {item.isAudited && (
                          <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-lg">
                            <Sparkles size={10} /> Đã kiểm định AI
                          </div>
                        )}
                        <div className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-[11px] font-semibold shadow-lg">
                          {item.type}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-[11px] font-semibold opacity-80 mb-1">
                          {item.subject}
                        </p>
                        <h4 className="font-black text-sm leading-tight line-clamp-2">
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    {/* Content Detail */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                            {item.creator
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-[10px] font-black text-slate-900 truncate max-w-[80px]">
                                {item.creator}
                              </p>
                              {item.creatorMastery > 90 && (
                                <CheckCircle2
                                  size={12}
                                  className="text-brand"
                                />
                              )}
                            </div>
                            <p className="text-[11px] font-bold text-slate-400">
                              Thành thạo: {item.creatorMastery}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-lg">
                          <Star
                            size={12}
                            className="text-amber-500 fill-amber-500"
                          />
                          <span className="text-[10px] font-black text-amber-700">
                            {item.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
                            {item.price === 0
                              ? "Miễn phí"
                              : item.price.toLocaleString()}
                          </span>
                          {item.price > 0 && (
                            <span className="text-[11px] font-black text-slate-300 uppercase">
                              Xu Rev
                            </span>
                          )}
                        </div>

                        <Button className="h-10 px-4 rounded-xl bg-slate-50 hover:bg-brand hover:text-white text-slate-400 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn">
                          <Download
                            size={14}
                            className="group-hover/btn:translate-y-0.5 transition-transform"
                          />
                          {item.downloads}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="col-span-12 lg:col-span-3 space-y-8">
              {/* Wallet Quickview */}
              <Card className="p-8 bg-brand border-none text-white relative overflow-hidden shadow-sm rounded-2xl">
                <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                  <ShoppingBag size={120} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 opacity-70">
                  Số dư ví của bạn
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <h4 className="text-4xl font-black tracking-tight tracking-nums">
                    4.250
                  </h4>
                  <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                    Xu
                  </span>
                </div>
                <Button className="w-full bg-white text-brand border-none h-12 rounded-2xl font-black text-[10px] tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                  Nạp thêm
                </Button>
              </Card>

              {/* Top Creators Sidebar */}
              <Card className="p-8 bg-white border-none shadow-sm rounded-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest italic">
                    Tác giả nổi bật
                  </h3>
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>

                <div className="space-y-4">
                  {topCreators.map((creator) => (
                    <div
                      key={creator.id}
                      className="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-slate-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-xs font-black text-white shadow-lg group-hover:scale-110 transition-transform">
                          {creator.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">
                            {creator.name}
                          </p>
                          <p className="text-[11px] font-bold text-slate-400 tracking-tight">
                            {creator.sales} tài liệu đã bán
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-brand">
                          {creator.mastery}%
                        </p>
                        <p className="text-[7px] font-black text-slate-300 uppercase tracking-tighter">
                          Thành thạo
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-full text-slate-400 font-black text-[11px] uppercase tracking-widest hover:text-brand transition-all flex items-center justify-center gap-2 mt-4"
                >
                  Xem thêm <ChevronRight size={14} />
                </Button>
              </Card>

              {/* Hot Categories */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">
                  Danh mục phổ biến
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["#AI", "#Blockchain", "#Logic", "#ThiCuốiKỳ", "#ĐồÁn"].map(
                    (tag) => (
                      <div
                        key={tag}
                        className="px-4 py-2 bg-white rounded-xl text-[10px] font-black text-slate-600 border border-slate-50 shadow-sm hover:border-brand/30 hover:text-brand cursor-pointer transition-all"
                      >
                        {tag}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="studio"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-12 gap-8"
          >
            {/* Creator Studio Content */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Earnings Dashboard Section */}
              <Card className="p-10 bg-white border-none shadow-md rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-bl-[200px] -z-10 blur-3xl opacity-50" />
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">
                      Bảng doanh thu
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-tight">
                      Thống kê doanh thu từ nghiên cứu & học thuật
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl">
                    <TrendingUp size={16} className="text-emerald-500" />
                    <span className="text-xs font-black text-emerald-600">
                      +24% tháng này
                    </span>
                  </div>
                </div>

                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 10,
                          fontWeight: 900,
                          fill: "#94a3b8",
                        }}
                        dy={10}
                      />
                      <YAxis hide domain={["auto", "auto"]} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "16px",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                          padding: "12px",
                        }}
                        itemStyle={{
                          fontSize: "12px",
                          fontWeight: "900",
                          color: "#0f172a",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#10B981"
                        strokeWidth={4}
                        dot={{ r: 6, fill: "#10B981", strokeWidth: 0 }}
                        activeDot={{
                          r: 8,
                          fill: "#10B981",
                          stroke: "#fff",
                          strokeWidth: 4,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Eligibility & Upload Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 bg-slate-900 text-white border-none shadow-md rounded-2xl space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent pointer-events-none" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
                        <Award size={20} className="text-white" />
                      </div>
                      <h4 className="text-sm font-bold">Kiểm tra điều kiện</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      Bạn cần đạt yêu cầu Mastery {">"} 90% để đăng bán tài liệu
                      cho cộng đồng.
                    </p>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-end">
                      <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
                        Tiến trình thành thạo (AI & ML)
                      </p>
                      <span className="text-sm font-black text-brand">94%</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "94%" }}
                        className="h-full bg-brand"
                      />
                    </div>
                    <p className="text-[11px] text-brand font-black uppercase tracking-[0.2em] flex items-center gap-1">
                      <CheckCircle2 size={10} /> Đủ điều kiện đăng bán
                    </p>
                  </div>
                </Card>

                <Card className="p-8 bg-white border-none shadow-sm rounded-2xl space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      Đăng tài liệu mới
                    </h4>
                    <Input
                      placeholder="Tên bộ Quiz/Flashcard..."
                      className="h-12 bg-slate-50 border-none rounded-xl text-xs font-black"
                    />
                    <div className="p-4 bg-brand/5 border border-brand/10 rounded-2xl">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[11px] font-black text-brand uppercase">
                          Gợi ý giá từ AI
                        </p>
                        <span className="text-[10px] font-black text-slate-900">
                          1.500 ~ 2.500 Xu
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight tracking-tight">
                        Dựa trên độ khó (Master level) và khối lượng kiến thức.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={handleAuditAndPublish}
                      disabled={isAuditing || auditComplete}
                      className={cn(
                        "h-14 rounded-2xl font-semibold text-[10px] transition-all",
                        auditComplete
                          ? "bg-emerald-500 text-white"
                          : "bg-brand text-white shadow-lg shadow-brand/20",
                      )}
                    >
                      {isAuditing ? (
                        <div className="flex items-center gap-3">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                          Đang kiểm định...
                        </div>
                      ) : auditComplete ? (
                        "Đã duyệt & Đăng bán"
                      ) : (
                        "Đăng bán với kiểm định AI"
                      )}
                    </Button>
                    <p className="text-[11px] text-center text-slate-400 font-bold uppercase tracking-tight italic">
                      Phí sàn 10% khi có giao dịch thành công
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Creator Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <Card className="p-8 bg-white border-none shadow-sm rounded-2xl space-y-6">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest italic flex items-center gap-3">
                  <BarChart3 size={16} className="text-brand" /> Thống kê nội
                  dung
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Tổng lượt tải",
                      value: "1.240",
                      sub: "+12% tuần này",
                      positive: true,
                    },
                    {
                      label: "Đánh giá TB",
                      value: "4.85",
                      sub: "Độ tin cậy cao",
                      positive: true,
                    },
                    {
                      label: "Tài liệu đang bán",
                      value: "12",
                      sub: "2 chờ kiểm định",
                      positive: false,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50"
                    >
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {stat.label}
                      </p>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xl font-black text-slate-900 tracking-tight">
                          {stat.value}
                        </span>
                        <span
                          className={cn(
                            "text-[11px] font-black uppercase",
                            stat.positive
                              ? "text-emerald-500"
                              : "text-amber-500",
                          )}
                        >
                          {stat.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="p-8 bg-brand/5 rounded-2xl space-y-4 border border-brand/10">
                <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg">
                  <LucideLineChart size={20} className="text-white" />
                </div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  Trở thành tác giả tiêu biểu
                </h4>
                <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
                  Các tác giả hàng đầu kiếm trung bình 5 triệu Xu Rev mỗi tháng.
                  Hãy tập trung vào chất lượng để nâng cao thành thạo.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Phase 2: Product Detail Modal --- */}
      <AnimatePresence>
        {selectedMaterial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedMaterial(null);
                setPurchaseStep("IDLE");
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-2xl h-full bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col overflow-y-auto scrollbar-none p-12"
            >
              <button
                onClick={() => {
                  setSelectedMaterial(null);
                  setPurchaseStep("IDLE");
                }}
                className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-inner"
              >
                <X size={24} />
              </button>

              <div className="space-y-10">
                {/* header detailing */}
                <div className="space-y-6 pt-10">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-semibold">
                      {selectedMaterial.type}
                    </div>
                    {selectedMaterial.isAudited && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                        <Sparkles size={12} /> Đã kiểm định AI
                      </div>
                    )}
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    {selectedMaterial.name}
                  </h3>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-xs font-black text-white shadow-lg">
                        {selectedMaterial.creator
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">
                          {selectedMaterial.creator}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star
                            size={10}
                            className="text-amber-500 fill-amber-500"
                          />
                          <span className="text-[10px] font-black">
                            {selectedMaterial.rating} đánh giá
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-slate-100" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                        Cập nhật lần cuối
                      </p>
                      <p className="text-xs font-black text-slate-900 underline decoration-brand/30 underline-offset-4">
                        12/03/2026
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Quality Report Widget */}
                <div className="p-8 bg-slate-50 rounded-2xl space-y-6 border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-700" />
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert size={18} className="text-brand" /> Báo cáo
                      chất lượng AI
                    </h4>
                    <span className="text-[10px] font-black text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full">
                      Đạt: Độ chính xác cao
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        label: "Độ chính xác",
                        value: "98%",
                        color: "text-emerald-500",
                      },
                      {
                        label: "Độ cập nhật",
                        value: "Cao",
                        color: "text-brand",
                      },
                      {
                        label: "Độ khó",
                        value: "Khó",
                        color: "text-amber-500",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100/50"
                      >
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          {stat.label}
                        </p>
                        <p
                          className={cn(
                            "text-lg font-black tracking-tight",
                            stat.color,
                          )}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold italic">
                    "Bộ tài liệu này có cấu trúc chặt chẽ, các câu hỏi Quiz bám
                    sát đề thi năm 2025. Đề xuất sử dụng để ôn luyện cuối kỳ." -
                    Revo AI Audit
                  </p>
                </div>

                {/* Preview Area (Blur Effect) */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                    Xem trước nội dung
                  </h4>
                  <Card className="p-8 bg-white border-2 border-slate-50 relative overflow-hidden h-[300px] rounded-2xl shadow-inner">
                    <div className="space-y-6 opacity-30 pointer-events-none filter blur-[4px]">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-3">
                          <div className="h-4 w-3/4 bg-slate-100 rounded-full" />
                          <div className="h-3 w-1/2 bg-slate-50 rounded-full" />
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="h-10 bg-slate-50 rounded-xl" />
                            <div className="h-10 bg-slate-50 rounded-xl" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-transparent via-white/80 to-white">
                      <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 shadow-sm">
                        <ShieldAlert size={24} className="text-white" />
                      </div>
                      <h5 className="font-black text-slate-900 mb-2">
                        Đăng ký để xem toàn bộ
                      </h5>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center max-w-[200px]">
                        Hãy mở khóa để truy cập 150+ câu hỏi và lỗi giải chi
                        tiết từ chuyên gia.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Purchase Section */}
                <div className="pt-10 border-t border-slate-100 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Giá tài liệu
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-slate-900 tracking-tight">
                          {selectedMaterial.price.toLocaleString()}
                        </span>
                        <span className="text-sm font-black text-slate-300 uppercase">
                          Xu Rev
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 font-italic">
                        Đã bao gồm VAT
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold">
                        Thanh toán an toàn với Ví Revo
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handlePurchase}
                    disabled={
                      purchaseStep === "PURCHASING" ||
                      purchaseStep === "SUCCESS"
                    }
                    className={cn(
                      "h-16 rounded-2xl font-semibold text-xs shadow-md transition-all relative overflow-hidden",
                      purchaseStep === "SUCCESS"
                        ? "bg-emerald-500 text-white shadow-emerald-200"
                        : "bg-slate-900 text-white shadow-slate-200 hover:scale-[1.02]",
                    )}
                  >
                    {purchaseStep === "IDLE" && (
                      <>
                        Mua ngay với {selectedMaterial.price.toLocaleString()}{" "}
                        Xu
                      </>
                    )}
                    {purchaseStep === "PURCHASING" && (
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                        Đang xác minh...
                      </div>
                    )}
                    {purchaseStep === "SUCCESS" && (
                      <div className="flex items-center gap-2 animte-in slide-in-from-bottom-2">
                        <CheckCircle2 size={18} /> Đã mở khóa thành công!
                      </div>
                    )}

                    {purchaseStep === "PURCHASING" && (
                      <motion.div
                        className="absolute inset-0 bg-brand/20"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
