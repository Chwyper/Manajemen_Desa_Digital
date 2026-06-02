import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  Camera,
  Edit3,
  Lock,
  CreditCard,
  CheckCircle2,
  Fingerprint,
  Calendar,
  Building,
  History,
  ChevronRight,
  TrendingUp
} from "lucide-react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

const EASE_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FADE_UP: any = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE_SPRING }
  })
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

export default function Profil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        if (response.data && response.data.data) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFEFF] flex items-center justify-center font-sans">
        <p className="text-slate-500 font-bold animate-pulse">Memuat profil warga...</p>
      </div>
    );
  }

  const avatarSeed = userData?.nama_lengkap ? encodeURIComponent(userData.nama_lengkap) : "Budi";

  return (
    <div className="min-h-screen bg-[#FDFEFF] font-sans antialiased pb-20">

      {/* ── HEADER & COVER ── */}
      <div className="h-64 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-indigo-900/50" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-20" />

        <header className="max-w-6xl mx-auto px-8 pt-8 relative z-10 flex justify-between items-center text-white">
          <button
            onClick={() => navigate('/dashboard-warga')}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/30">
            <Edit3 size={14} /> Edit Profil
          </button>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* ── INFORMASI PRIBADI (70%) ── */}
          <motion.div
            initial="hidden" animate="visible" variants={FADE_UP} custom={0}
            className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-10"
          >
            
            {/* Foto Profil Sidebar */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-start md:w-32 lg:w-40">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 md:block hidden text-center md:text-left">Foto Profil</h3>
              <div className="relative group">
                <img 
                  className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-[2rem] border-2 border-dashed border-emerald-400 p-1 object-cover shadow-sm" 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                  alt="Avatar" 
                />
              </div>
            </div>

            {/* Garis Pemisah Vertical */}
            <div className="w-full h-px bg-slate-100 md:w-px md:h-auto hidden md:block" />

            {/* Form Informasi Personal */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Informasi Personal</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-8">
                
                {/* Nama Lengkap */}
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center shrink-0">
                    <User size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 ml-1">Nama Lengkap</label>
                    <div className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 text-sm shadow-sm cursor-default">
                      {userData?.nama_lengkap || "Nama Tidak Ditemukan"}
                    </div>
                  </div>
                </div>

                {/* NIK */}
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <Fingerprint size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 ml-1">NIK</label>
                    <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-500 text-sm shadow-sm cursor-not-allowed">
                      {userData?.nik || "-"}
                    </div>
                  </div>
                </div>

                {/* Nomor Telepon */}
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <Phone size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 ml-1">Nomor Telepon</label>
                    <div className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 text-sm shadow-sm cursor-default">
                      {userData?.no_hp || "-"}
                    </div>
                  </div>
                </div>

                {/* Status Akun */}
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 ml-1">Status Akun</label>
                    <div className="w-full px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm shadow-sm cursor-default flex items-center">
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-md border inline-flex ${
                        userData?.status_akun === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        userData?.status_akun === 'PENDING_ADMIN' || userData?.status_akun === 'PENDING_VERIFICATION' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                        {
                          userData?.status_akun === 'VERIFIED' ? 'Terverifikasi' : 
                          userData?.status_akun === 'PENDING_ADMIN' ? 'Menunggu Admin' : 
                          userData?.status_akun || 'Belum Lengkap'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alamat KTP (Spans 2 columns) */}
                <div className="flex gap-4 md:col-span-2">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <MapPin size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 ml-1">Alamat KTP</label>
                    <div className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 text-sm shadow-sm min-h-[5rem] cursor-default leading-relaxed flex items-start">
                      {userData?.alamat || "Alamat belum diatur"}
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>

          {/* ── DATA WILAYAH (30%) ── */}
          <motion.div
            initial="hidden" animate="visible" variants={FADE_UP} custom={1}
            className="lg:col-span-3"
          >
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-xl shadow-slate-900/20 h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[60px] opacity-20" />
              <h3 className="text-xl font-black mb-8 tracking-tight flex items-center gap-3 relative z-10">
                <Building size={22} className="text-red-400" strokeWidth={3} /> Wilayah RT/RW
              </h3>

              <div className="grid grid-cols-[auto_auto_1fr] gap-x-3 gap-y-6 relative z-10 text-sm">
                
                {/* Row 1 */}
                <div className="border-l-2 border-slate-700 pl-5">
                  <strong className="text-[11px] font-black text-red-400 uppercase tracking-widest">Nomor RT</strong>
                </div>
                <div className="text-red-400/50 font-black">:</div>
                <div className="font-bold">RT {userData?.rt || "-"}</div>

                {/* Row 2 */}
                <div className="border-l-2 border-slate-700 pl-5">
                  <strong className="text-[11px] font-black text-red-400 uppercase tracking-widest">Nomor RW</strong>
                </div>
                <div className="text-red-400/50 font-black">:</div>
                <div className="font-bold">RW {userData?.rw || "-"}</div>

                {/* Row 3 */}
                <div className="border-l-2 border-slate-700 pl-5">
                  <strong className="text-[11px] font-black text-red-400 uppercase tracking-widest">Domisili</strong>
                </div>
                <div className="text-red-400/50 font-black">:</div>
                <div className="font-bold">{userData?.status_tinggal || "Belum diatur"}</div>

              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}