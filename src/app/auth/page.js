"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // පාස්වර්ඩ් එක පෙන්වනවාද නැද්ද යන්න තීරණය කරන අලුත් State එක
  const [showPassword, setShowPassword] = useState(false); 
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '', 
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          username: formData.username, 
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'ලොග් වීම අසාර්ථකයි.');
      }

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

        <div className="p-8">
          <h2 className="text-xl font-extrabold text-gray-800 mb-6 text-center">සිසුන්ගේ පිවිසුම</h2>
          
          {error && <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center font-medium">{error}</div>}
          {success && <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm text-center font-bold">{success}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">WhatsApp අංකය</label>
              <input 
                type="text" 
                name="username" 
                required 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" 
                placeholder="උදා: 07XXXXXXXX" 
              />
            </div>
            
            {/* පාස්වර්ඩ් කොටුව (Show/Hide Icon එක සමඟ) */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">මුරපදය (Password)</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition pr-12" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none transition"
                >
                  {showPassword ? (
                    // Hide (ඇස වසා ඇති අයිකනය)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // Show (ඇස විවෘත අයිකනය)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold rounded-lg px-4 py-3 hover:bg-blue-700 shadow-md transition transform hover:-translate-y-0.5 mt-2">
              {loading ? 'ඇතුල් වෙමින්...' : 'ඇතුල් වන්න'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}