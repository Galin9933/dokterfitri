
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Plus, 
  Send, 
  User, 
  Lock,
  Sparkles,
  Phone,
  Instagram,
  Twitter,
  ChevronRight,
  X,
  Mail,
  Camera,
  Star,
  Quote,
  Upload,
  LogOut,
  Smile,
  Edit3,
  BookOpen
} from 'lucide-react';
import { Status, Testimonial, Comment } from './types';

// --- Intersection Observer Hook for Reveal Animations ---
const useReveal = () => {
  const [elements, setElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [elements]);

  return (node: HTMLElement | null) => {
    if (node && !elements.includes(node)) {
      setElements(prev => [...prev, node]);
    }
  };
};

const Navbar: React.FC<{ onAdminOpen: () => void; isAdmin: boolean; onLogout: () => void }> = ({ onAdminOpen, isAdmin, onLogout }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism py-4 px-6 md:px-12 flex justify-between items-center border-b border-pink-100">
    <div className="flex items-center gap-2">
      <div className="bg-chocolate p-1.5 rounded-full shadow-lg shadow-pink-200">
        <Heart className="w-5 h-5 text-white fill-current" />
      </div>
      <span className="text-xl md:text-2xl font-bold font-serif text-chocolate tracking-tight">dr. Fitri</span>
    </div>
    <div className="hidden md:flex gap-8 items-center text-chocolate font-medium text-sm lg:text-base">
      <a href="#home" className="hover:text-pink-500 transition-colors">Home</a>
      <a href="#profile" className="hover:text-pink-500 transition-colors">Profile</a>
      <a href="#status" className="hover:text-pink-500 transition-colors">Catatan Penulis</a>
      <a href="#testimonials" className="hover:text-pink-500 transition-colors">Reader's Love</a>
      {isAdmin ? (
        <button onClick={onLogout} className="flex items-center gap-2 bg-pink-500 px-5 py-2.5 rounded-full text-white font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-200">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      ) : (
        <button onClick={onAdminOpen} className="p-3 rounded-full bg-white/50 border border-pink-100 hover:bg-white hover:shadow-md transition-all">
          <Lock className="w-4 h-4 text-chocolate" />
        </button>
      )}
    </div>
    <div className="md:hidden flex items-center gap-2">
       {isAdmin ? (
         <button onClick={onLogout} className="text-xs bg-pink-500 px-4 py-2 rounded-full text-white font-bold shadow-lg shadow-pink-200">OUT</button>
       ) : (
         <button onClick={onAdminOpen} className="p-2.5 rounded-full bg-white/50 border border-pink-100">
           <Lock className="w-4 h-4 text-chocolate" />
         </button>
       )}
    </div>
  </nav>
);

const App: React.FC = () => {
  const revealRef = useReveal();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  // Profile State for Owner
  const [profileBio, setProfileBio] = useState('Seorang dokter yang juga mencintai dunia literasi. Menulis adalah cara saya menyembuhkan jiwa yang tidak terjangkau oleh stetoskop. Melalui "Dokter Cinta", saya ingin berbagi bahwa setiap luka punya cara unik untuk sembuh.');
  const [profileName, setProfileName] = useState('dr. Fitri');

  const [statuses, setStatuses] = useState<Status[]>([
    { id: '1', content: "Makan siang hari ini ditemani naskah Dokter Cinta bab 15. Deg-degan sendiri nulisnya! 🌸✨", timestamp: new Date(), mood: 'Excited' },
    { id: '2', content: "Terima kasih banyak buat temen-temen yang sudah PO! Love you all! ❤️", timestamp: new Date(Date.now() - 86400000), mood: 'Loving' }
  ]);
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { 
      id: '1', 
      author: 'Alya Putri', 
      role: 'Reviewer Buku', 
      text: "Karakter dr. Fitri itu relate banget sama cewek Gen Z jaman sekarang yang keliatannya kuat banget di luar tapi sebenernya butuh pelukan di dalem. Recommended!", 
      likes: 342,
      comments: [
        { id: 'c1', author: 'Siska', text: 'Setuju banget kak! Visualisasinya dapet banget.', timestamp: new Date() }
      ]
    }
  ]);

  // Admin New Status State
  const [newStatus, setNewStatus] = useState('');
  const [selectedMood, setSelectedMood] = useState<'Happy' | 'Excited' | 'Inspired' | 'Loving'>('Happy');

  // Public Testimonial State
  const [publicTestiAuthor, setPublicTestiAuthor] = useState('');
  const [publicTestiText, setPublicTestiText] = useState('');
  const [publicTestiRole, setPublicTestiRole] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Verification using the user's specific requested credentials
    if (adminEmail === 'dr.fitrirumah@.com' && adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      setAdminPassword('');
      setAdminEmail('');
    } else {
      alert("Email atau Password salah!");
    }
  };

  const handleAddStatus = () => {
    if (!newStatus.trim()) return;
    const status: Status = {
      id: Date.now().toString(),
      content: newStatus,
      timestamp: new Date(),
      mood: selectedMood
    };
    setStatuses([status, ...statuses]);
    setNewStatus('');
  };

  const handleAddPublicTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicTestiAuthor.trim() || !publicTestiText.trim()) return;
    const testi: Testimonial = {
      id: Date.now().toString(),
      author: publicTestiAuthor,
      role: publicTestiRole || 'Pembaca Setia',
      text: publicTestiText,
      likes: 0,
      comments: []
    };
    setTestimonials([testi, ...testimonials]);
    setPublicTestiAuthor('');
    setPublicTestiText('');
    setPublicTestiRole('');
    alert("Terima kasih atas review kamu! ✨");
  };

  const handleAddComment = (testimonialId: string, author: string, text: string) => {
    if (!text.trim()) return;
    setTestimonials(prev => prev.map(t => {
      if (t.id === testimonialId) {
        return {
          ...t,
          comments: [...t.comments, { id: Date.now().toString(), author: author || 'Anonim', text, timestamp: new Date() }]
        };
      }
      return t;
    }));
  };

  const handleLike = (id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden bg-soft-blue">
      <Navbar 
        onAdminOpen={() => setShowLogin(true)} 
        isAdmin={isAdmin} 
        onLogout={() => setIsAdmin(false)} 
      />

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 overflow-hidden">
        <div className="flex-1 space-y-6 text-center md:text-left z-10 reveal" ref={revealRef}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 text-pink-500 font-extrabold text-[10px] md:text-xs tracking-[0.2em] uppercase shadow-sm border border-pink-50">
            <Sparkles className="w-3 h-3" /> Welcome to my cozy corner
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-chocolate leading-[1.1]">
            Curahan Hati <br />
            <span className="text-pink-500 italic font-script drop-shadow-sm">Penulis</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
            Tempat di mana kata-kata dan medis bertemu dalam balutan rasa. Mari jelajahi kisah "Dokter Cinta" dan catatan harian saya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <a 
              href="#testimonials" 
              className="bg-chocolate text-white px-8 py-4 rounded-[2rem] flex items-center justify-center gap-3 font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-chocolate/20"
            >
              <MessageCircle className="w-5 h-5" /> Lihat Testimoni
            </a>
            <a href="#profile" className="bg-white text-chocolate border-2 border-pink-100 px-8 py-4 rounded-[2rem] flex items-center justify-center gap-2 font-bold hover:bg-pink-50 transition-colors">
              Tentang Saya
            </a>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg reveal" ref={revealRef}>
          <div className="relative z-10 w-full aspect-[3/4] bg-white rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white float-animation group">
            <img 
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" 
              alt="dr Fitri Profile" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate/90 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <p className="font-script text-4xl mb-2 text-pink-300">Dokter Cinta</p>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest opacity-90">Author: {profileName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE SECTION - ABOUT THE AUTHOR */}
      <section id="profile" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-pink-50 reveal" ref={revealRef}>
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover" alt="Author" />
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left reveal" ref={revealRef}>
                <h2 className="text-4xl font-serif text-chocolate">Tentang <span className="text-pink-500 italic">Penulis</span></h2>
                <div className="relative">
                    <Quote className="absolute -top-4 -left-6 w-10 h-10 text-pink-100 opacity-50" />
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic font-medium">
                        "{profileBio}"
                    </p>
                </div>
                <div className="flex justify-center md:justify-start gap-4">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-pink-500 font-extrabold text-2xl tracking-tighter">{profileName}</span>
                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Penulis & Dokter</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-chocolate/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="absolute top-0 right-0 p-6">
              <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <div className="text-center space-y-2 mb-8">
              <div className="mx-auto bg-pink-100 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                <Lock className="w-10 h-10 text-pink-500" />
              </div>
              <h2 className="text-3xl font-serif text-chocolate">Admin Access</h2>
              <p className="text-slate-500 text-sm font-medium italic">Hanya Pemilik Web ✨</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-chocolate uppercase ml-4 tracking-widest">Email Admin</label>
                <input 
                    type="email" 
                    required
                    placeholder="dr.fitrirumah@.com"
                    className="w-full px-8 py-4 rounded-[2rem] bg-slate-50 border border-slate-100 focus:border-pink-300 focus:ring-4 focus:ring-pink-100 transition-all outline-none font-medium"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-chocolate uppercase ml-4 tracking-widest">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="Password anda"
                  className="w-full px-8 py-4 rounded-[2rem] bg-slate-50 border border-slate-100 focus:border-pink-300 focus:ring-4 focus:ring-pink-100 transition-all outline-none font-medium"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              <button className="w-full bg-chocolate text-white py-4 rounded-[2rem] font-extrabold shadow-xl hover:shadow-pink-200 transition-all active:scale-95 mt-4">
                Masuk ke Dashboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD - OWNER ONLY */}
      {isAdmin && (
        <section className="py-24 px-6 md:px-12 bg-pink-50/50 border-y-2 border-pink-100">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-5 mb-12">
              <div className="h-12 w-2 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50"></div>
              <h2 className="text-4xl font-serif text-chocolate">Dashboard <span className="text-pink-500 italic">Pemilik</span></h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* EDIT PROFILE BIOGRAPHY */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-pink-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-pink-50 rounded-2xl"><Edit3 className="w-6 h-6 text-pink-500" /></div>
                  <h3 className="font-extrabold text-chocolate text-lg">Edit Profil Kamu</h3>
                </div>
                <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Nama Kamu (ex: dr. Fitri)"
                      className="w-full px-6 py-4 rounded-[2rem] bg-slate-50 text-sm focus:ring-4 focus:ring-pink-100 outline-none font-bold"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                    <textarea 
                      className="w-full p-6 rounded-[2rem] bg-slate-50 border-none focus:ring-4 focus:ring-pink-100 min-h-[160px] text-slate-700 font-medium"
                      placeholder="Tuliskan biografi singkat kamu..."
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                    />
                    <p className="text-[10px] text-slate-400 font-bold px-4">Bio ini akan tampil di bagian "Tentang Penulis".</p>
                </div>
              </div>

              {/* UPLOAD STATUS / CATATAN */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-pink-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-sky-50 rounded-2xl"><BookOpen className="w-6 h-6 text-sky-500" /></div>
                  <h3 className="font-extrabold text-chocolate text-lg">Tambah Catatan Baru</h3>
                </div>
                <textarea 
                  className="w-full p-6 rounded-[2rem] bg-slate-50 border-none focus:ring-4 focus:ring-pink-100 min-h-[140px] text-slate-700 mb-6 font-medium"
                  placeholder="Apa yang ingin kamu bagikan hari ini? ✨"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 mb-8">
                  {(['Happy', 'Excited', 'Inspired', 'Loving'] as const).map(mood => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-5 py-2.5 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${selectedMood === mood ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleAddStatus}
                  className="w-full bg-chocolate text-white py-5 rounded-[2rem] font-extrabold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-xl"
                >
                  Posting Catatan <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATATAN PENULIS SECTION */}
      <section id="status" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4 reveal" ref={revealRef}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-chocolate leading-tight">Catatan <span className="text-pink-500 italic">Penulis</span></h2>
              <p className="text-slate-500 max-w-xl mx-auto font-medium italic">Kumpulan inspirasi dan progres naskah terbaru langsung dari saya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statuses.map((status, idx) => (
              <div 
                key={status.id} 
                className={`reveal group bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-pink-100 border border-transparent hover:border-pink-50 transition-all duration-700 relative overflow-hidden`}
                ref={revealRef}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Heart className="w-24 h-24 text-pink-500 fill-current" />
                </div>
                <div className="flex justify-between items-center mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-pink-50 text-pink-500 text-[10px] font-extrabold uppercase tracking-widest">
                        {status.mood}
                    </span>
                    <span className="text-slate-300 text-[10px] font-extrabold uppercase">
                        {status.timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed font-semibold italic">
                    "{status.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - PUBLIC CAN ADD */}
      <section id="testimonials" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6 reveal" ref={revealRef}>
            <h2 className="text-5xl md:text-6xl font-serif text-chocolate">Reader's <span className="text-pink-500 italic">Love</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-semibold text-lg">Kamu suka karya saya? Yuk, berikan review jujur kamu di sini! Siapa saja boleh kasih review ✨</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* PUBLIC REVIEW FORM */}
            <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-pink-50 reveal" ref={revealRef}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-pink-100 rounded-2xl shadow-inner"><Star className="w-6 h-6 text-pink-500" /></div>
                    <h3 className="text-2xl font-serif font-bold text-chocolate">Kasih Review</h3>
                </div>
                <form onSubmit={handleAddPublicTestimonial} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-chocolate uppercase ml-4 tracking-[0.2em]">Nama Kamu</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Contoh: Siti Aisyah"
                            className="w-full px-8 py-4 rounded-[2rem] bg-slate-50 text-sm focus:ring-4 focus:ring-pink-100 outline-none font-bold"
                            value={publicTestiAuthor}
                            onChange={(e) => setPublicTestiAuthor(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-chocolate uppercase ml-4 tracking-[0.2em]">Kesibukan/Role</label>
                        <input 
                            type="text" 
                            placeholder="Contoh: Mahasiswi / Reader"
                            className="w-full px-8 py-4 rounded-[2rem] bg-slate-50 text-sm focus:ring-4 focus:ring-pink-100 outline-none font-bold"
                            value={publicTestiRole}
                            onChange={(e) => setPublicTestiRole(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-chocolate uppercase ml-4 tracking-[0.2em]">Review Kamu</label>
                        <textarea 
                            required
                            placeholder="Apa kesan kamu setelah membaca tulisan saya?"
                            className="w-full p-6 rounded-[2rem] bg-slate-50 text-sm focus:ring-4 focus:ring-pink-100 min-h-[140px] outline-none font-medium"
                            value={publicTestiText}
                            onChange={(e) => setPublicTestiText(e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-pink-500 text-white py-5 rounded-[2rem] font-extrabold flex items-center justify-center gap-3 hover:bg-pink-600 transition-all shadow-xl shadow-pink-200">
                        Kirim Review ✨
                    </button>
                </form>
            </div>

            {/* TESTIMONIAL LIST */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                {testimonials.map((testimonial, idx) => (
                    <div 
                        key={testimonial.id} 
                        className="reveal group bg-white rounded-[3.5rem] shadow-xl shadow-slate-100/50 overflow-hidden flex flex-col border border-pink-50 transition-all duration-700"
                        ref={revealRef}
                        style={{ transitionDelay: `${idx * 150}ms` }}
                    >
                        <div className="p-10 flex-1">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center">
                                    <User className="w-8 h-8 text-pink-300" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-chocolate text-lg leading-none mb-1">{testimonial.author}</h4>
                                    <p className="text-[10px] text-pink-500 font-extrabold uppercase tracking-widest">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-slate-600 text-base leading-relaxed mb-8 italic font-medium">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center gap-6 text-slate-300 border-t border-slate-50 pt-8">
                                <button 
                                    onClick={() => handleLike(testimonial.id)}
                                    className="flex items-center gap-2 hover:text-pink-500 transition-colors"
                                >
                                    <Heart className={`w-5 h-5 ${testimonial.likes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                                    <span className="text-xs font-bold">{testimonial.likes}</span>
                                </button>
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-xs font-bold">{testimonial.comments.length}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* COMMENTS UNDER TESTIMONIAL */}
                        <div className="bg-slate-50/50 p-8 border-t border-pink-50">
                            <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {testimonial.comments.map(c => (
                                    <div key={c.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-extrabold text-[9px] text-chocolate uppercase tracking-widest">{c.author}</span>
                                            <span className="text-[9px] text-slate-300 font-bold">{c.timestamp.toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 font-medium">{c.text}</p>
                                    </div>
                                ))}
                            </div>
                            <PublicCommentInput onSend={(name, text) => handleAddComment(testimonial.id, name, text)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-32 pb-16 px-6 md:px-12 border-t border-pink-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="bg-chocolate p-2 rounded-full shadow-lg">
                        <Heart className="w-6 h-6 text-white fill-current" />
                    </div>
                    <span className="text-3xl font-bold font-serif text-chocolate tracking-tighter">{profileName}</span>
                </div>
                <p className="text-slate-500 leading-relaxed text-base font-semibold">
                    Rumah bagi kata-kata manis dan inspirasi harian. Ditulis dengan sepenuh hati oleh dr. Fitri.
                </p>
                <div className="flex gap-5">
                    <a href="#" className="p-4 bg-slate-50 rounded-[1.5rem] text-slate-400 hover:text-pink-500 transition-all hover:-translate-y-2 shadow-sm"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="p-4 bg-slate-50 rounded-[1.5rem] text-slate-400 hover:text-sky-500 transition-all hover:-translate-y-2 shadow-sm"><Twitter className="w-6 h-6" /></a>
                    <a href="#" className="p-4 bg-slate-50 rounded-[1.5rem] text-slate-400 hover:text-green-500 transition-all hover:-translate-y-2 shadow-sm"><Phone className="w-6 h-6" /></a>
                </div>
            </div>
            
            <div className="lg:pl-10">
                <h4 className="font-extrabold text-chocolate mb-10 text-xs uppercase tracking-[0.3em] flex items-center gap-3">
                    Menu Utama <ChevronRight className="w-4 h-4 text-pink-500" />
                </h4>
                <ul className="space-y-5 text-slate-500 font-extrabold text-sm">
                    <li><a href="#home" className="hover:text-pink-500 transition-colors">Beranda</a></li>
                    <li><a href="#profile" className="hover:text-pink-500 transition-colors">Profil Penulis</a></li>
                    <li><a href="#status" className="hover:text-pink-500 transition-colors">Catatan Harian</a></li>
                    <li><a href="#testimonials" className="hover:text-pink-500 transition-colors">Testimonial</a></li>
                </ul>
            </div>

            <div className="lg:pl-10">
                <h4 className="font-extrabold text-chocolate mb-10 text-xs uppercase tracking-[0.3em] flex items-center gap-3">
                    Support <ChevronRight className="w-4 h-4 text-pink-500" />
                </h4>
                <ul className="space-y-5 text-slate-500 font-extrabold text-sm">
                    <li><a href="#" className="hover:text-pink-500 transition-colors">FAQ Pembaca</a></li>
                    <li><a href="#" className="hover:text-pink-500 transition-colors">Media Kit</a></li>
                    <li><button onClick={() => setShowLogin(true)} className="hover:text-pink-500 transition-colors">Admin Login</button></li>
                </ul>
            </div>

            <div className="bg-chocolate p-12 rounded-[4rem] text-white shadow-3xl shadow-chocolate/20">
                <h4 className="font-extrabold text-2xl mb-6 font-serif leading-tight">Miliki Karya Saya!</h4>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed font-semibold">Tersedia di seluruh toko buku Gramedia terdekat di kota kamu.</p>
                <a 
                  href="https://wa.me/6285654123970" 
                  className="w-full bg-white text-chocolate py-5 rounded-[2rem] font-extrabold block text-center shadow-xl hover:bg-pink-50 transition-all active:scale-95"
                >
                  Beli via WA ✨
                </a>
            </div>
        </div>
        <div className="text-center pt-16 border-t border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-[0.4em]">
            © 2024 DOKTER CINTA • POWERED BY DR. FITRI
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <a 
        href="https://wa.me/6285654123970" 
        target="_blank"
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-6 rounded-full shadow-3xl hover:scale-110 active:scale-90 transition-all z-[90] group"
      >
        <Phone className="w-8 h-8" />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-chocolate px-6 py-3 rounded-[1.5rem] font-extrabold shadow-3xl opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-pink-50 text-sm">
            Tanya dr. Fitri ✨
        </span>
      </a>
    </div>
  );
};

// Helper Component for Public Comments on Reviews
const PublicCommentInput: React.FC<{ onSend: (name: string, text: string) => void }> = ({ onSend }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    
    return (
        <div className="space-y-3">
            <input 
                type="text" 
                placeholder="Nama kamu..."
                className="w-full px-5 py-3 rounded-2xl bg-white border border-slate-200 text-[10px] focus:ring-4 focus:ring-pink-50 focus:outline-none font-bold"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Balas review ini..."
                    className="w-full pl-5 pr-14 py-3 rounded-2xl bg-white border border-slate-200 text-[10px] focus:ring-4 focus:ring-pink-50 focus:outline-none font-bold"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && text.trim()) {
                            onSend(name, text);
                            setText('');
                            setName('');
                        }
                    }}
                />
                <button 
                    onClick={() => { if(text.trim()) { onSend(name, text); setText(''); setName(''); } }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 text-pink-500 hover:text-pink-600 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default App;
