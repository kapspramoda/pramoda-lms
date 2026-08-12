"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('si');

  // --- Popup Login States ---
  const [authModal, setAuthModal] = useState(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDarkMode(true);
    
    const savedLang = localStorage.getItem('language');
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    const newLang = language === 'si' ? 'en' : 'si';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Modal Open/Close handlers
  const openAuthModal = (type = 'login') => {
    setAuthModal(type);
    setError(""); setSuccessMsg("");
    setPhone(""); setPassword(""); setConfirmPassword("");
    closeSidebar();
  };
  const closeAuthModal = () => setAuthModal(null);

  // Handle Login / Forgot Password
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); setSuccessMsg("");

    if (authModal === "login") {
      if (phone === "chemadmin" && password === "chemad@224488") {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminRole", "Admin");
        router.push("/admin");
        return; 
      }
      if (phone === "chemeditor" && password === "chem@998844") {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminRole", "Editor");
        router.push("/admin");
        return; 
      }
      try {
        const res = await fetch("/api/login", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: phone, password })
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/dashboard");
        } else { setError(data.message || "ලොග් වීමේදී දෝෂයක් මතු විය."); }
      } catch (err) { setError("තාක්ෂණික දෝෂයකි. කරුණාකර නැවත උත්සාහ කරන්න."); }
      finally { setLoading(false); }
    } 
    else if (authModal === "forgot") {
      if (password !== confirmPassword) {
        setError("මුරපදයන් එකිනෙකට නොගැලපේ.");
        setLoading(false); return;
      }
      try {
        const res = await fetch("/api/forgot-password", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, newPassword: password }), 
        });
        const data = await res.json();
        if (res.ok) {
          setSuccessMsg("ඉල්ලීම සාර්ථකව Admin වෙත යොමු කරන ලදී.");
          setPhone(""); setPassword(""); setConfirmPassword("");
        } else { setError(data.message || "මෙම අංකයෙන් ගිණුමක් නොමැත."); }
      } catch (err) { setError("තාක්ෂණික දෝෂයකි. නැවත උත්සාහ කරන්න."); }
      finally { setLoading(false); }
    }
  };

  // --- Theme Classes ---
  const bgMain = isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800";
  const headerBg = isDarkMode ? "bg-slate-900/90 border-slate-800 shadow-md" : "bg-white/90 border-gray-100 shadow-sm";
  const navLinkColor = isDarkMode ? "text-slate-300 hover:text-blue-400" : "text-slate-600 hover:text-blue-600";
  const sectionTitleColor = isDarkMode ? "text-white" : "text-slate-900";
  const sectionDescColor = isDarkMode ? "text-slate-400" : "text-slate-500";
  const cardBg = isDarkMode ? "bg-slate-900 border-slate-800 hover:border-blue-500/50" : "bg-white border-slate-100 border-t-4 border-t-blue-500 hover:border-blue-300";

  // --- Content Translations ---
  const content = {
    si: {
      nav: { home: "මුල් පිටුව", schedule: "කාලසටහන", syllabus: "විෂය නිර්දේශය", contact: "සම්බන්ධ වන්න", login: "පද්ධතියට පිවිසෙන්න" },
      hero: {
        title1: "අපි ඔබව ජයග්‍රහණය කරා",
        title2: "මෙහෙයවන්නෙමු.",
        desc1: "උසස් පෙළ රසායන විද්‍යාව",
        desc2: "(BSc. Hons) University of Moratuwa",
        desc3: "වසර හයකට අධික විශ්වාසනීය ඉගැන්වීමේ අත්දැකීම් සහිතව, ඔබට අවශ්‍ය නිවැරදිම මඟපෙන්වීම.",
        btn1: "පන්ති කාලසටහන බලන්න ↓",
        btn2: "පද්ධතියට ඇතුල් වන්න →"
      },
      schedule: { title: "පන්ති කාලසටහන", desc: "ඔබට පහසුම ස්ථානය සහ වේලාව තෝරාගන්න.", call: "ලියාපදිංචි වීමට අමතන්න" },
      modules: { title: "ප්‍රධාන විෂය කොටස්", desc: "රසායන විද්‍යාවේ සියලුම කොටස් ආවරණය කෙරේ.", 
                 m1: "සාමාන්‍ය රසායනය", m1d: "රසායනික පදනම සහ මූලික සංකල්ප ඉතා පැහැදිලිව හා ක්‍රමානුකූලව අධ්‍යයනය කිරීම.",
                 m2: "භෞතික රසායනය", m2d: "සූත්‍ර, ගණනය කිරීම් සහ න්‍යායාත්මක කොටස් ඉතා සරලව අවබෝධ කරගැනීම.",
                 m3: "අකාබනික රසායනය", m3d: "මූලද්‍රව්‍යවල හැසිරීම සහ රසායනික ප්‍රතික්‍රියා පහසුවෙන් මතක තබාගැනීමේ ක්‍රමවේද.",
                 m4: "කාබනික රසායනය", m4d: "පරිවර්තන සහ යාන්ත්‍රණ (Mechanisms) ඉතා තර්කානුකූලව ගොඩනඟන ආකාරය." },
      contact: { title: "සම්බන්ධ වන්න", desc: "ගැටළු හෝ විමසීම් සඳහා අප හා සම්බන්ධ වන්න.", info: "අපගේ තොරතුරු", join: "අදම අප හා එක්වන්න!", joinDesc: "පන්ති පිළිබඳ විමසීම්, ලියාපදිංචි වීමේ ගැටළු හෝ වෙනත් ඕනෑම අධ්‍යාපනික කාරණයක් සඳහා අපව අමතන්න.", waBtn: "WhatsApp පණිවිඩයක් යවන්න" },
      footer: { desc: "Advanced Level Chemistry Education Portal. වසර ගණනාවක විශ්වාසනීය ඉගැන්වීම් සමඟින් ශ්‍රී ලංකාවේ අනාගත විද්‍යාඥයින් බිහිකරන තෝතැන්න.", links: "ඉක්මන් සබැඳි" }
    },
    en: {
      nav: { home: "Home", schedule: "Schedule", syllabus: "Syllabus", contact: "Contact", login: "Student Login" },
      hero: {
        title1: "We guide you to",
        title2: "Victory.",
        desc1: "A/L Chemistry",
        desc2: "(BSc. Hons) University of Moratuwa",
        desc3: "With over 6 years of trusted teaching experience, providing you with the most accurate guidance.",
        btn1: "View Schedule ↓",
        btn2: "Go to Portal →"
      },
      schedule: { title: "Class Schedule", desc: "Choose the most convenient location and time for you.", call: "Call to Register" },
      modules: { title: "Main Subject Modules", desc: "All areas of Chemistry are covered comprehensively.", 
                 m1: "General Chemistry", m1d: "Studying the chemical basis and fundamental concepts clearly and systematically.",
                 m2: "Physical Chemistry", m2d: "Understanding formulas, calculations, and theoretical parts very simply.",
                 m3: "Inorganic Chemistry", m3d: "Methods to easily remember the behavior of elements and chemical reactions.",
                 m4: "Organic Chemistry", m4d: "How to build conversions and mechanisms logically." },
      contact: { title: "Contact Us", desc: "Get in touch with us for any inquiries or issues.", info: "Our Details", join: "Join Us Today!", joinDesc: "Contact us for class inquiries, registration issues, or any other educational matters.", waBtn: "Send a WhatsApp Message" },
      footer: { desc: "Advanced Level Chemistry Education Portal. A platform that builds future scientists in Sri Lanka with years of trusted teaching.", links: "Quick Links", admin: "System Admin" }
    }
  };

  const t = content[language];

  return (
    <div className={`min-h-screen font-sans scroll-smooth flex flex-col transition-colors duration-300 ${bgMain}`}>
      
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Oswald:wght@500;600;700&display=swap'); .modern-font { font-family: 'Lato', 'Iskoola Pota', sans-serif; } .logo-font { font-family: 'Oswald', sans-serif; }`}} />

      {/* Auth Modal (Popup) */}
      {authModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all">
          <div className={`w-full max-w-md rounded-[2rem] border p-8 shadow-2xl relative animate-fade-in ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-white'}`}>
            <button onClick={closeAuthModal} className={`absolute top-6 right-6 p-2 rounded-full focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-red-400' : 'bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50'}`}>✖</button>
            <h2 className={`text-3xl font-black tracking-tight mb-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              {authModal === "login" ? "සිසුන්ගේ පිවිසුම" : "මුරපදය අමතකද?"}
            </h2>
            
            {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600 border border-red-200">{error}</div>}
            {successMsg && <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-bold text-green-700 border border-green-200">{successMsg}</div>}
            
            <form onSubmit={handleAuthSubmit} className="space-y-5">
              <div>
                <label className={`mb-2 block text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>WhatsApp අංකය</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="උදා: 0712345678" className={`w-full rounded-2xl border-2 px-5 py-4 text-base font-medium outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-gray-200 text-slate-900 focus:bg-white focus:border-blue-500'}`} required />
              </div>
              <div>
                <label className={`mb-2 block text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{authModal === "forgot" ? "නව මුරපදය" : "මුරපදය (Password)"}</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="මුරපදයක් ලබා දෙන්න" className={`w-full rounded-2xl border-2 px-5 py-4 pr-12 text-base font-medium outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-gray-200 text-slate-900 focus:bg-white focus:border-blue-500'}`} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 focus:outline-none text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors">
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>
              {authModal === "forgot" && (
                <div className="animate-fade-in">
                  <label className={`mb-2 block text-sm font-bold mt-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>මුරපදය තහවුරු කරන්න</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="මුරපදය නැවත ඇතුළත් කරන්න" className={`w-full rounded-2xl border-2 px-5 py-4 pr-12 text-base font-medium outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-gray-200 text-slate-900 focus:bg-white focus:border-blue-500'}`} required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 focus:outline-none text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors">
                       {showConfirmPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>
              )}
              {authModal === "login" && (
                <div className="text-right mt-1">
                  <button type="button" onClick={() => openAuthModal("forgot")} className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>මුරපදය අමතකද?</button>
                </div>
              )}
              <button type="submit" disabled={loading} className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-4 text-base font-black tracking-wide text-white shadow-lg hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-70">
                {loading ? "රැඳී සිටින්න..." : (authModal === "login" ? "ඇතුළු වන්න" : "Admin වෙත යවන්න")}
              </button>
            </form>
            <div className={`mt-8 text-center text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {authModal === "login" ? (
                <p>නව ලියාපදිංචිය සඳහා අමතන්න: <br/><a href="tel:0719004575" className={`inline-block mt-2 text-base ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>071 900 4575</a></p>
              ) : (
                <p>දැනටමත් ගිණුමක් තිබේද? <br/><button onClick={() => openAuthModal("login")} className={`inline-block mt-2 text-base ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>ලොග් වන්න</button></p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/94719004575" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-[9000] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center group"
        title="WhatsApp"
      >
        <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSidebar}
      ></div>

      {/* Mobile Sidebar Menu */}
      <aside 
        className={`w-72 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <h2 className="text-xl font-bold tracking-wide">
              <span className="text-blue-500">Pramoda</span><span className="text-sm">Chemistry</span>
            </h2>
          </div>
          <button onClick={closeSidebar} className="text-slate-400 hover:text-white focus:outline-none text-2xl transition">&times;</button>
        </div>
        <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
          <a href="#" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white transition transform"><span className="text-xl">🏠</span><span className="font-medium">{t.nav.home}</span></a>
          <a href="#schedule" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white transition transform"><span className="text-xl">📅</span><span className="font-medium">{t.nav.schedule}</span></a>
          <a href="#modules" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white transition transform"><span className="text-xl">📚</span><span className="font-medium">{t.nav.syllabus}</span></a>
          <a href="#contact" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white transition transform"><span className="text-xl">📞</span><span className="font-medium">{t.nav.contact}</span></a>
        </nav>
        <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-3">
          <div className="flex gap-2">
            <button onClick={toggleTheme} className="flex-1 bg-slate-800 text-white py-2 rounded-xl hover:bg-slate-700 transition">
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button onClick={toggleLanguage} className="flex-1 bg-slate-800 text-white py-2 rounded-xl hover:bg-slate-700 transition font-bold">
              {language === 'si' ? "EN" : "සිං"}
            </button>
          </div>
          <button onClick={() => openAuthModal('login')} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
            {t.nav.login}
          </button>
        </div>
      </aside>

      {/* Navigation Bar */}
      <header className={`sticky top-0 z-30 backdrop-blur-xl transition-all duration-300 border-b ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className={`md:hidden focus:outline-none mr-4 transition ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>
              <span className="text-2xl font-bold">☰</span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <img src="/logo.png" alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-md" />
              <h1 className={`text-xl font-extrabold tracking-tight hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Pramoda<span className="text-blue-600">Chemistry</span></h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <a href="#" className={`font-bold transition text-sm uppercase tracking-wider ${navLinkColor}`}>{t.nav.home}</a>
            <a href="#schedule" className={`font-bold transition text-sm uppercase tracking-wider ${navLinkColor}`}>{t.nav.schedule}</a>
            <a href="#modules" className={`font-bold transition text-sm uppercase tracking-wider ${navLinkColor}`}>{t.nav.syllabus}</a>
            <a href="#contact" className={`font-bold transition text-sm uppercase tracking-wider ${navLinkColor}`}>{t.nav.contact}</a>
            
            <div className="flex items-center gap-2 border-l border-slate-300/30 pl-6 ml-2">
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`} title="Toggle Theme">
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button onClick={toggleLanguage} className={`px-3 py-1.5 rounded-full font-bold text-xs transition-colors ${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`} title="Change Language">
                {language === 'si' ? "EN" : "සිං"}
              </button>
              <button onClick={() => openAuthModal('login')} className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-full font-bold hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 ml-2">
                {t.nav.login}
              </button>
            </div>
          </nav>

          {/* Mobile Right Icons */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-blue-50 text-blue-600'}`}>
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={() => openAuthModal('login')} className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-md text-xs">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section - Static Blue Theme (Restored) */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-slate-900/90 z-0"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Pramoda Chemistry Main Logo" className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight tracking-tight">
              {t.hero.title1} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">{t.hero.title2}</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-slate-300 font-light leading-snug max-w-3xl mx-auto">
              {t.hero.desc1} <br className="md:hidden"/>
              <span className="font-bold text-white block mt-1">Pramoda Katipearachchi</span>
              <span className="text-sm md:text-base text-blue-200 block mb-1">{t.hero.desc2}</span>
              {t.hero.desc3}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-4">
              <a href="#schedule" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-1 w-full sm:w-auto">
                {t.hero.btn1}
              </a>
              <button onClick={() => openAuthModal('login')} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 shadow-lg transition w-full sm:w-auto">
                {t.hero.btn2}
              </button>
            </div>
          </div>
        </section>

        {/* Class Schedule Section */}
        <section id="schedule" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight ${sectionTitleColor}`}>{t.schedule.title}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
            <p className={`mt-6 text-lg font-medium ${sectionDescColor}`}>{t.schedule.desc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            <div className={`p-8 rounded-3xl shadow-sm transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col ${cardBg}`}>
              <h3 className={`text-3xl font-black mb-6 transition duration-300 ${isDarkMode ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>2028 THEORY</h3>
              <div className="flex-1 flex flex-col space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-100/50 border border-blue-200/50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className={`font-black text-2xl mb-1 ${sectionTitleColor}`}>සඳුදා</p>
                  <p className={`font-bold text-lg py-1.5 rounded-lg ${isDarkMode ? 'bg-slate-800/50 text-blue-300' : 'bg-slate-50 text-blue-600'}`}>පෙ.ව 10.00 - 12.00</p>
                </div>
                <div className={`w-12 h-1 mx-auto rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-100/50 border border-blue-200/50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">සම්මාන - කළුතර</h4>
                  <p className={`font-black text-2xl mb-1 ${sectionTitleColor}`}>අඟහරුවාදා</p>
                  <p className={`font-bold text-lg py-1.5 rounded-lg ${isDarkMode ? 'bg-slate-800/50 text-blue-300' : 'bg-slate-50 text-blue-600'}`}>ප.ව 2.00 - 4.00</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-200/20">
                  <button onClick={() => window.location.href="tel:0719004575"} className={`w-full font-bold py-3 rounded-xl transition ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'}`}>{t.schedule.call}</button>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-3xl shadow-sm transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col ${cardBg}`}>
              <h3 className={`text-3xl font-black mb-6 transition duration-300 ${isDarkMode ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>2027 THEORY</h3>
              <div className="flex-1 flex flex-col space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-100/50 border border-blue-200/50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className={`font-black text-2xl mb-1 ${sectionTitleColor}`}>සෙනසුරාදා</p>
                  <p className={`font-bold text-lg py-1.5 rounded-lg ${isDarkMode ? 'bg-slate-800/50 text-blue-300' : 'bg-slate-50 text-blue-600'}`}>පෙ.ව 11.00 - ප.ව 2.00</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-200/20">
                  <button onClick={() => window.location.href="tel:0719004575"} className={`w-full font-bold py-3 rounded-xl transition ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'}`}>{t.schedule.call}</button>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-3xl shadow-sm transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col ${cardBg}`}>
              <h3 className={`text-3xl font-black mb-6 transition duration-300 ${isDarkMode ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>2027 REVISION</h3>
              <div className="flex-1 flex flex-col space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-100/50 border border-blue-200/50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className={`font-black text-2xl mb-1 ${sectionTitleColor}`}>බදාදා</p>
                  <p className={`font-bold text-lg py-1.5 rounded-lg ${isDarkMode ? 'bg-slate-800/50 text-blue-300' : 'bg-slate-50 text-blue-600'}`}>පෙ.ව 8.00 - ප.ව 2.00</p>
                </div>
                <div className={`w-12 h-1 mx-auto rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-100/50 border border-blue-200/50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className={`font-black text-2xl mb-1 ${sectionTitleColor}`}>අඟහරුවාදා</p>
                  <p className={`font-bold text-lg py-1.5 rounded-lg ${isDarkMode ? 'bg-slate-800/50 text-blue-300' : 'bg-slate-50 text-blue-600'}`}>පෙ.ව 8.00 - ප.ව 2.00</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-200/20">
                  <button onClick={() => window.location.href="tel:0719004575"} className={`w-full font-bold py-3 rounded-xl transition ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'}`}>{t.schedule.call}</button>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-3xl shadow-sm transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col relative overflow-hidden ${cardBg} border-t-blue-700`}>
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl shadow-sm">HOT</div>
              <h3 className={`text-3xl font-black mb-6 transition duration-300 ${isDarkMode ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>2027 PAPERS</h3>
              <div className="flex-1 flex flex-col space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-100/50 border border-blue-200/50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className={`font-black text-2xl mb-1 ${sectionTitleColor}`}>අඟහරුවාදා</p>
                  <p className={`font-bold text-lg py-1.5 rounded-lg ${isDarkMode ? 'bg-slate-800/50 text-blue-300' : 'bg-slate-50 text-blue-600'}`}>පෙ.ව 8.00 - ප.ව 2.00</p>
                </div>
                <div className={`pt-6 border-t-2 border-dashed mt-auto ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                  <p className={`text-sm font-bold leading-relaxed p-4 rounded-xl ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50/50 text-slate-600'}`}>
                    Full papers ඇරඹේ. ලියවා බලා ලකුණු විවරණයක් සහ උත්තර පත්‍රයක් සමඟ ලබා දේ.
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-200/20">
                  <button onClick={() => window.location.href="tel:0719004575"} className={`w-full font-bold py-3 rounded-xl transition ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'}`}>{t.schedule.call}</button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Subject Modules Section */}
        <section id="modules" className={`py-24 px-4 transition-colors ${isDarkMode ? 'bg-slate-900/50 border-y border-slate-800' : 'bg-slate-50/80 border-y border-gray-100'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${sectionTitleColor}`}>{t.modules.title}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto rounded-full"></div>
              <p className={`mt-6 text-lg font-medium ${sectionDescColor}`}>{t.modules.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className={`p-8 rounded-3xl shadow-sm border transition duration-300 group hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:shadow-blue-900/20' : 'bg-white border-slate-100 hover:shadow-xl'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300 ${isDarkMode ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>⚛️</div>
                <h3 className={`text-xl font-black mb-3 ${sectionTitleColor}`}>{t.modules.m1}</h3>
                <p className={`leading-relaxed text-sm font-medium ${sectionDescColor}`}>{t.modules.m1d}</p>
              </div>
              <div className={`p-8 rounded-3xl shadow-sm border transition duration-300 group hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:shadow-teal-900/20' : 'bg-white border-slate-100 hover:shadow-xl'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300 ${isDarkMode ? 'bg-teal-900/40 text-teal-400' : 'bg-teal-50 text-teal-600'}`}>⚗️</div>
                <h3 className={`text-xl font-black mb-3 ${sectionTitleColor}`}>{t.modules.m2}</h3>
                <p className={`leading-relaxed text-sm font-medium ${sectionDescColor}`}>{t.modules.m2d}</p>
              </div>
              <div className={`p-8 rounded-3xl shadow-sm border transition duration-300 group hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:shadow-purple-900/20' : 'bg-white border-slate-100 hover:shadow-xl'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300 ${isDarkMode ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>💎</div>
                <h3 className={`text-xl font-black mb-3 ${sectionTitleColor}`}>{t.modules.m3}</h3>
                <p className={`leading-relaxed text-sm font-medium ${sectionDescColor}`}>{t.modules.m3d}</p>
              </div>
              <div className={`p-8 rounded-3xl shadow-sm border transition duration-300 group hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:shadow-orange-900/20' : 'bg-white border-slate-100 hover:shadow-xl'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300 ${isDarkMode ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>🧬</div>
                <h3 className={`text-xl font-black mb-3 ${sectionTitleColor}`}>{t.modules.m4}</h3>
                <p className={`leading-relaxed text-sm font-medium ${sectionDescColor}`}>{t.modules.m4d}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Details Section */}
        <section id="contact" className="py-24 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${sectionTitleColor}`}>{t.contact.title}</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className={`mt-6 text-lg font-medium ${sectionDescColor}`}>{t.contact.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className={`md:col-span-3 p-8 md:p-12 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className={`text-2xl font-black mb-8 ${sectionTitleColor}`}>{t.contact.info}</h3>
              <div className="space-y-6">
                
                <a href="tel:0719004575" className="flex items-center gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-white border-slate-200 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.46 17.57l-4.51-1.04a2.7 2.7 0 00-2.83.82l-2.02 2.47c-3.1-1.63-5.63-4.16-7.25-7.26l2.47-2.01a2.7 2.7 0 00.82-2.83L8.1 3.2A2.7 2.7 0 005.44 1.5H3.6A2.6 2.6 0 001 4.11c.21 11.23 9.46 20.48 20.69 20.69a2.6 2.6 0 002.6-2.6v-1.84a2.7 2.7 0 00-1.83-2.79z" /></svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${sectionDescColor}`}>Call Us</p>
                    <p className={`text-xl font-bold transition ${isDarkMode ? 'text-slate-200 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>071 900 4575</p>
                  </div>
                </a>

                <a href="https://wa.me/94719004575" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366]' : 'bg-white border-slate-200 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366]'}`}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${sectionDescColor}`}>WhatsApp</p>
                    <p className={`text-xl font-bold transition ${isDarkMode ? 'text-slate-200 group-hover:text-[#25D366]' : 'text-slate-800 group-hover:text-[#25D366]'}`}>071 900 4575</p>
                  </div>
                </a>

                <a href="https://facebook.com/pramoda.katipearachchi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2]' : 'bg-white border-slate-200 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2]'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${sectionDescColor}`}>Facebook</p>
                    <p className={`text-xl font-bold transition ${isDarkMode ? 'text-slate-200 group-hover:text-[#1877F2]' : 'text-slate-800 group-hover:text-[#1877F2]'}`}>Pramoda Katipearachchi</p>
                  </div>
                </a>

                <a href="https://youtube.com/@PramodaKatipearachchi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white group-hover:border-[#FF0000]' : 'bg-white border-slate-200 text-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white group-hover:border-[#FF0000]'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${sectionDescColor}`}>YouTube</p>
                    <p className={`text-xl font-bold transition ${isDarkMode ? 'text-slate-200 group-hover:text-[#FF0000]' : 'text-slate-800 group-hover:text-[#FF0000]'}`}>Pramoda Katipearachchi</p>
                  </div>
                </a>

              </div>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl text-white flex flex-col justify-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 opacity-20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
              
              <h3 className="text-3xl font-extrabold mb-6 relative z-10 leading-tight">{t.contact.join}</h3>
              <p className="text-blue-100 text-lg mb-8 relative z-10 leading-relaxed font-medium">{t.contact.joinDesc}</p>
              
              <div className="relative z-10">
                <button onClick={() => window.open('https://wa.me/94719004575', '_blank')} className="w-full bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1 flex items-center justify-center gap-3">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  <span>{t.contact.waBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          
          <div className="space-y-4">
            <h3 className="text-white text-2xl font-extrabold flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
              Pramoda<span className="text-blue-500">Chemistry</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-sm font-medium">
              {t.footer.desc}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide uppercase">{t.footer.links}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => openAuthModal('login')} className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> {t.nav.login}</button></li>
              <li><a href="#schedule" className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> {t.nav.schedule}</a></li>
              <li><a href="#modules" className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> {t.nav.syllabus}</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> {t.nav.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide uppercase">{t.footer.admin}</h4>
            <ul className="space-y-4 text-sm font-medium">
              {/* <li>
                <button onClick={() => router.push('/admin/login')} className="hover:text-amber-400 transition flex items-center gap-2 group">
                  <span className="text-amber-500/70 group-hover:text-amber-500">⚙️</span> Admin Portal
                </button>
              </li> */}
            </ul>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Pramoda Katipearachchi. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Designed and developed by <a href="https://esip.lk" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-blue-400 transition-colors">esip.lk</a>
          </p>
        </div>
      </footer>

    </div>
  );
}