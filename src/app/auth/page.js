"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', 
    alYear: '2026' // Default අගය 2026 ලෙස ඇත
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('ඔබ ඇතුලත් කළ මුරපදයන් (Passwords) එකිනෙකට නොගැලපේ. කරුණාකර නැවත පරීක්ෂා කරන්න.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          alYear: formData.alYear, // <--- මෙන්න මේ පේළිය අනිවාර්යයෙන්ම තිබිය යුතුයි
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'ලියාපදිංචි වීම අසාර්ථකයි.');
      }

      setSuccess('ලියාපදිංචිය සාර්ථකයි! දැන් ඔබට ලොග් විය හැක.');
      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
        setError('');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'ලොග් වීම අසාර්ථකයි.');
      }

      // මෙතනදී data.user ඇතුළේ එන alYear එකත් එක්කම localStorage එකේ Save වෙනවා
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess('සාර්ථකව ඇතුල් විය! ඔබව ඉදිරි පිටුවට යොමු කරමින් පවතී...');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      
      <div className="w-full max-w-md mb-4 flex justify-start">
        <button onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
          <span className="mr-1">←</span> මුල් පිටුවට
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-blue-100">
        
        <div className="bg-blue-600 p-6 text-center cursor-pointer" onClick={() => router.push('/')}>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            PramodaChemistry<span className="text-blue-200">.com</span>
          </h1>
          <p className="text-blue-100 text-sm mt-1">A/L Chemistry Student Portal</p>
        </div>

        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }} 
            className={`flex-1 py-4 font-bold transition ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          >
            ලොග් වන්න
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }} 
            className={`flex-1 py-4 font-bold transition ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          >
            ලියාපදිංචි වන්න
          </button>
        </div>

        <div className="p-8">
          
          {error && <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center font-medium">{error}</div>}
          {success && <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm text-center font-bold">{success}</div>}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">ඊමේල් ලිපිනය</label>
                <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" placeholder="student@example.com" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">මුරපදය (Password)</label>
                <input type="password" name="password" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold rounded-lg px-4 py-3 hover:bg-blue-700 shadow-md transition transform hover:-translate-y-0.5">
                {loading ? 'ඇතුල් වෙමින්...' : 'ඇතුල් වන්න'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">සම්පූර්ණ නම</label>
                <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" placeholder="ඔබේ නම" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">ඊමේල් ලිපිනය</label>
                <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" placeholder="student@example.com" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">මුරපදය</label>
                  <input type="password" name="password" required minLength="6" onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" placeholder="අවම අකුරු 6ක්" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">තහවුරු කරන්න</label>
                  <input type="password" name="confirmPassword" required minLength="6" onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" placeholder="නැවත ටයිප් කරන්න" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">ඔබේ A/L වර්ෂය</label>
                <select 
                  name="alYear"
                  value={formData.alYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-blue-500 transition"
                >
                  <option value="2026">2026 A/L</option>
                  <option value="2027">2027 A/L</option>
                  <option value="2028">2028 A/L</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className={`w-full ${loading ? 'bg-yellow-200 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300 hover:-translate-y-0.5'} text-blue-900 font-bold rounded-lg px-4 py-3 shadow-md transition transform mt-2`}>
                {loading ? 'කරුණාකර රැඳී සිටින්න...' : 'ගිණුමක් සාදන්න'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}