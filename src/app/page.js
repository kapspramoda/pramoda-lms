"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 scroll-smooth flex flex-col">
      
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
            <img src="/logo.png" alt="Pramoda Chemistry Logo" className="w-12 h-12 object-contain" />
            <h2 className="text-xl font-bold tracking-wide">
              <span className="text-blue-500">Pramoda</span><span className="text-sm">Chemistry</span>
            </h2>
          </div>
          <button onClick={closeSidebar} className="text-slate-400 hover:text-white focus:outline-none text-2xl transition">
            &times;
          </button>
        </div>
        <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
          <a href="#" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white hover:translate-x-2 transition transform">
            <span className="text-xl">🏠</span><span className="font-medium">මුල් පිටුව</span>
          </a>
          <a href="#schedule" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white hover:translate-x-2 transition transform">
            <span className="text-xl">📅</span><span className="font-medium">පන්ති කාලසටහන</span>
          </a>
          <a href="#modules" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white hover:translate-x-2 transition transform">
            <span className="text-xl">📚</span><span className="font-medium">විෂය නිර්දේශය</span>
          </a>
          <a href="#contact" onClick={closeSidebar} className="flex items-center space-x-4 text-slate-300 hover:text-white hover:translate-x-2 transition transform">
            <span className="text-xl">📞</span><span className="font-medium">සම්බන්ධ වන්න</span>
          </a>
        </nav>
        <div className="p-6 border-t border-slate-800 bg-slate-950">
          <button onClick={() => { closeSidebar(); router.push('/auth'); }} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
            සිසුන්ගේ පිවිසුම (Log in)
          </button>
        </div>
      </aside>

      {/* Navigation Bar */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="md:hidden text-slate-600 hover:text-blue-600 focus:outline-none mr-4 transition">
              <span className="text-2xl font-bold">☰</span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <img src="/logo.png" alt="Pramoda Chemistry Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md" />
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight hidden sm:block">Pramoda<span className="text-blue-600">Chemistry</span></h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-slate-600 hover:text-blue-600 font-bold transition text-sm uppercase tracking-wider">මුල් පිටුව</a>
            <a href="#schedule" className="text-slate-600 hover:text-blue-600 font-bold transition text-sm uppercase tracking-wider">කාලසටහන</a>
            <a href="#modules" className="text-slate-600 hover:text-blue-600 font-bold transition text-sm uppercase tracking-wider">විෂය නිර්දේශය</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 font-bold transition text-sm uppercase tracking-wider">සම්බන්ධ වන්න</a>
            <button onClick={() => router.push('/auth')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-0.5">
              Student Login
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-slate-900/90 z-0"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
            
            {/* Logo එක ගොඩක් ලොකු කළා, යට පරතරය (mb-4) අඩු කළා */}
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Pramoda Chemistry Main Logo" className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl" />
            </div>

            {/* වාක්‍ය අතර පරතරය (mb-3 සහ leading-tight) අඩු කළා */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight tracking-tight">
              අපි ඔබව ජයග්‍රහණය කරා <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">මෙහෙයවන්නෙමු.</span>
            </h1>
            
            {/* ඡේදයේ පේළි අතර පරතරය (leading-snug) සහ margin (mb-8, mt-1) අඩු කළා */}
            <p className="text-lg md:text-xl mb-8 text-slate-300 font-light leading-snug max-w-3xl mx-auto">
              උසස් පෙළ රසායන විද්‍යාව <br className="md:hidden"/>
              <span className="font-bold text-white block mt-1">Pramoda Katipearachchi</span> 
              <span className="text-sm md:text-base text-blue-200 block mb-1">(BSc. Hons) University of Moratuwa</span>
              වසර හයකට අධික විශ්වාසනීය ඉගැන්වීමේ අත්දැකීම් සහිතව, ඔබට අවශ්‍ය නිවැරදිම මඟපෙන්වීම.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-4">
              <a href="#schedule" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-1 w-full sm:w-auto">
                පන්ති කාලසටහන බලන්න ↓
              </a>
              <button onClick={() => router.push('/auth')} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 shadow-lg transition w-full sm:w-auto">
                පද්ධතියට ඇතුල් වන්න →
              </button>
            </div>
          </div>
        </section>

        {/* Class Schedule Section */}
        <section id="schedule" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">පන්ති කාලසටහන</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-500 text-lg">ඔබට පහසුම ස්ථානය සහ වේලාව තෝරාගන්න.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-blue-400 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col">
              <h3 className="text-2xl font-black text-slate-800 mb-6 group-hover:text-blue-600 transition duration-300">2028 THEORY</h3>
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className="text-slate-800 font-black text-xl mb-1">සඳුදා</p>
                  <p className="text-slate-500 font-medium bg-slate-50 py-1 rounded-lg">පෙ.ව 10.00 - 12.00</p>
                </div>
                <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full"></div>
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">සම්මාන - කළුතර</h4>
                  <p className="text-slate-800 font-black text-xl mb-1">අඟහරුවාදා</p>
                  <p className="text-slate-500 font-medium bg-slate-50 py-1 rounded-lg">ප.ව 2.00 - 4.00</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-blue-500 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col">
              <h3 className="text-2xl font-black text-slate-800 mb-6 group-hover:text-blue-600 transition duration-300">2027 THEORY</h3>
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className="text-slate-800 font-black text-xl mb-1">සෙනසුරාදා</p>
                  <p className="text-slate-500 font-medium bg-slate-50 py-1 rounded-lg">පෙ.ව 11.00 - ප.ව 2.00</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-blue-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col">
              <h3 className="text-2xl font-black text-slate-800 mb-6 group-hover:text-blue-600 transition duration-300">2026 REVISION</h3>
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className="text-slate-800 font-black text-xl mb-1">බදාදා</p>
                  <p className="text-slate-500 font-medium bg-slate-50 py-1 rounded-lg">පෙ.ව 8.00 - ප.ව 2.00</p>
                </div>
                <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full"></div>
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className="text-slate-800 font-black text-xl mb-1">අඟහරුවාදා</p>
                  <p className="text-slate-500 font-medium bg-slate-50 py-1 rounded-lg">පෙ.ව 8.00 - ප.ව 2.00</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-blue-800 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group text-center flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">HOT</div>
              <h3 className="text-2xl font-black text-slate-800 mb-6 group-hover:text-blue-600 transition duration-300">2026 PAPERS</h3>
              <div className="flex-1 flex flex-col space-y-6">
                <div>
                  <h4 className="font-bold text-blue-700 bg-blue-50 py-2 px-6 inline-block rounded-xl mb-3 text-sm tracking-wide">පැනෝලා - මතුගම</h4>
                  <p className="text-slate-800 font-black text-xl mb-1">අඟහරුවාදා</p>
                  <p className="text-slate-500 font-medium bg-slate-50 py-1 rounded-lg">පෙ.ව 8.00 - ප.ව 2.00</p>
                </div>
                <div className="pt-6 border-t-2 border-dashed border-slate-200 mt-auto">
                  <p className="text-sm font-bold text-slate-600 leading-relaxed bg-blue-50/50 p-4 rounded-xl">
                    Full papers ඇරඹේ. ලියවා බලා ලකුණු විවරණයක් සහ උත්තර පත්‍රයක් සමඟ ලබා දේ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Modules Section */}
        <section id="modules" className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">ප්‍රධාන විෂය කොටස්</h2>
              <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
              <p className="mt-6 text-slate-500 text-lg">රසායන විද්‍යාවේ සියලුම කොටස් ආවරණය කෙරේ.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300">⚛️</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">සාමාන්‍ය රසායනය</h3>
                <p className="text-slate-500 leading-relaxed text-sm">රසායනික පදනම සහ මූලික සංකල්ප ඉතා පැහැදිලිව හා ක්‍රමානුකූලව අධ්‍යයනය කිරීම.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 group">
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300">⚗️</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">භෞතික රසායනය</h3>
                <p className="text-slate-500 leading-relaxed text-sm">සූත්‍ර, ගණනය කිරීම් සහ න්‍යායාත්මක කොටස් ඉතා සරලව අවබෝධ කරගැනීම.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 group">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300">💎</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">අකාබනික රසායනය</h3>
                <p className="text-slate-500 leading-relaxed text-sm">මූලද්‍රව්‍යවල හැසිරීම සහ රසායනික ප්‍රතික්‍රියා පහසුවෙන් මතක තබාගැනීමේ ක්‍රමවේද.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 group">
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300">🧬</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">කාබනික රසායනය</h3>
                <p className="text-slate-500 leading-relaxed text-sm">පරිවර්තන සහ යාන්ත්‍රණ (Mechanisms) ඉතා තර්කානුකූලව ගොඩනඟන ආකාරය.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Details Section (High Quality SVGs) */}
        <section id="contact" className="py-24 px-4 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">සම්බන්ධ වන්න</h2>
              <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
              <p className="mt-6 text-slate-500 text-lg">ගැටළු හෝ විමසීම් සඳහා අප හා සම්බන්ධ වන්න.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              
              <div className="md:col-span-3 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-8">අපගේ තොරතුරු</h3>
                <div className="space-y-6">
                  
                  <a href="tel:0719004575" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 bg-white border border-slate-200 text-slate-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition shadow-sm">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.46 17.57l-4.51-1.04a2.7 2.7 0 00-2.83.82l-2.02 2.47c-3.1-1.63-5.63-4.16-7.25-7.26l2.47-2.01a2.7 2.7 0 00.82-2.83L8.1 3.2A2.7 2.7 0 005.44 1.5H3.6A2.6 2.6 0 001 4.11c.21 11.23 9.46 20.48 20.69 20.69a2.6 2.6 0 002.6-2.6v-1.84a2.7 2.7 0 00-1.83-2.79z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">දුරකථන අංකය</p>
                      <p className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">071 900 4575</p>
                    </div>
                  </a>

                  <a href="https://wa.me/94719004575" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 bg-white border border-slate-200 text-[#25D366] rounded-2xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition shadow-sm">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">WhatsApp</p>
                      <p className="text-xl font-bold text-slate-800 group-hover:text-[#25D366] transition">071 900 4575</p>
                    </div>
                  </a>

                  <a href="https://facebook.com/pramoda.katipearachchi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 bg-white border border-slate-200 text-[#1877F2] rounded-2xl flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] transition shadow-sm">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Facebook</p>
                      <p className="text-xl font-bold text-slate-800 group-hover:text-[#1877F2] transition">Pramoda Katipearachchi</p>
                    </div>
                  </a>

                  <a href="https://youtube.com/@PramodaKatipearachchi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 bg-white border border-slate-200 text-[#FF0000] rounded-2xl flex items-center justify-center group-hover:bg-[#FF0000] group-hover:text-white group-hover:border-[#FF0000] transition shadow-sm">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">YouTube</p>
                      <p className="text-xl font-bold text-slate-800 group-hover:text-[#FF0000] transition">Pramoda Katipearachchi</p>
                    </div>
                  </a>

                  <a href="https://tiktok.com/@pramoda.katipearachchi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 bg-white border border-slate-200 text-[#010101] rounded-2xl flex items-center justify-center group-hover:bg-[#010101] group-hover:text-white group-hover:border-[#010101] transition shadow-sm">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">TikTok</p>
                      <p className="text-xl font-bold text-slate-800 group-hover:text-[#010101] transition">Pramoda Katipearachchi</p>
                    </div>
                  </a>

                </div>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl text-white flex flex-col justify-center relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 opacity-20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
                 
                 <h3 className="text-3xl font-extrabold mb-6 relative z-10 leading-tight">අදම අප හා <br/> එක්වන්න!</h3>
                 <p className="text-blue-100 text-lg mb-8 relative z-10 leading-relaxed">පන්ති පිළිබඳ විමසීම්, ලියාපදිංචි වීමේ ගැටළු හෝ වෙනත් ඕනෑම අධ්‍යාපනික කාරණයක් සඳහා අපව අමතන්න.</p>
                 <div className="relative z-10">
                   <button onClick={() => window.open('https://wa.me/94719004575', '_blank')} className="w-full bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1 flex items-center justify-center gap-2">
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                     <span>WhatsApp පණිවිඩයක් යවන්න</span>
                   </button>
                 </div>
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
              <img src="/logo.png" alt="Pramoda Chemistry Logo" className="w-16 h-16 object-contain" />
              Pramoda<span className="text-blue-500">Chemistry</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-sm">
              Advanced Level Chemistry Education Portal. වසර ගණනාවක විශ්වාසනීය ඉගැන්වීම් සමඟින් ශ්‍රී ලංකාවේ අනාගත විද්‍යාඥයින් බිහිකරන තෝතැන්න.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide uppercase">ඉක්මන් සබැඳි</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/auth" className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> සිසුන්ගේ පිවිසුම (Log in)</a></li>
              <li><a href="#schedule" className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> පන්ති කාලසටහන</a></li>
              <li><a href="#modules" className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> විෂය නිර්දේශය</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition flex items-center gap-2"><span className="text-blue-600">▪</span> අපව අමතන්න</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide uppercase">පද්ධති කළමනාකරණය</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => router.push('/admin/login')} className="hover:text-amber-400 transition flex items-center gap-2 group">
                  <span className="text-amber-500/70 group-hover:text-amber-500">⚙️</span> Admin Portal
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition flex items-center gap-2 group">
                  <span className="text-slate-600 group-hover:text-slate-400">🔒</span> Privacy Policy
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Pramoda Katipearachchi. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Developed by <span className="font-bold text-white">Pramoda Katipearchchi</span>
          </p>
        </div>
      </footer>

    </div>
  );
}