import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { Heart, Sparkles, Star, Loader2, Zap, X, Check, Copy, Share2 } from 'lucide-react';

const zodiacSigns = [
  { name: 'Koç', value: 'aries', dates: '21 Mart - 19 Nisan', emoji: '♈' },
  { name: 'Boğa', value: 'taurus', dates: '20 Nisan - 20 Mayıs', emoji: '♉' },
  { name: 'İkizler', value: 'gemini', dates: '21 Mayıs - 20 Haziran', emoji: '♊' },
  { name: 'Yengeç', value: 'cancer', dates: '21 Haziran - 22 Temmuz', emoji: '♋' },
  { name: 'Aslan', value: 'leo', dates: '23 Temmuz - 22 Ağustos', emoji: '♌' },
  { name: 'Başak', value: 'virgo', dates: '23 Ağustos - 22 Eylül', emoji: '♍' },
  { name: 'Terazi', value: 'libra', dates: '23 Eylül - 22 Ekim', emoji: '♎' },
  { name: 'Akrep', value: 'scorpio', dates: '23 Ekim - 21 Kasım', emoji: '♏' },
  { name: 'Yay', value: 'sagittarius', dates: '22 Kasım - 21 Aralık', emoji: '♐' },
  { name: 'Oğlak', value: 'capricorn', dates: '22 Aralık - 19 Ocak', emoji: '♑' },
  { name: 'Kova', value: 'aquarius', dates: '20 Ocak - 18 Şubat', emoji: '♒' },
  { name: 'Balık', value: 'pisces', dates: '19 Şubat - 20 Mart', emoji: '♓' }
];

export default function HomePage() {
  const [femaleSign, setFemaleSign] = useState('');
  const [maleSign, setMaleSign] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const getFemaleSignData = () => zodiacSigns.find(s => s.value === femaleSign);
  const getMaleSignData = () => zodiacSigns.find(s => s.value === maleSign);

  // Tema kontrolü
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
    
    // Cookie consent kontrolü
    const cookieAccepted = localStorage.getItem('cookieConsent');
    if (!cookieAccepted) {
      setShowCookieConsent(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowCookieConsent(false);
  };

  // Paylaş metni formatla
  const formatShareText = () => {
    const formattedText = `🌟 RUHESIM 🌟

${result}

💫 Bu analiz ve daha fazlası için: ruhesim.site
Burç uyumunuzu keşfedin, ruh eşinizi bulun! ✨`;
    
    return formattedText;
  };

  // Text kopyala fonksiyonu
  const copyText = async () => {
    try {
      const textToCopy = formatShareText();
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  // Sosyal medya paylaş fonksiyonları
  const shareToWhatsApp = () => {
    const text = formatShareText();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = `🌟 ${getFemaleSignData()?.name} ve ${getMaleSignData()?.name} burç uyumu analizi! 

💫 Detaylı analiz ve daha fazlası için: ruhesim.site
Burç uyumunuzu keşfedin! ✨`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToFacebook = () => {
    const text = `${getFemaleSignData()?.name} ve ${getMaleSignData()?.name} burç uyumu analizi! Ruhesim.site'de sen de burç uyumunu keşfet! 🌟✨`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://ruhesim.site')}&quote=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const text = `${getFemaleSignData()?.name} ve ${getMaleSignData()?.name} burç uyumu analizi`;
    const summary = 'Ruhesim.site ile burç uyumunuzu keşfedin! Detaylı astroloji analizi.';
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ruhesim.site')}&title=${encodeURIComponent(text)}&summary=${encodeURIComponent(summary)}`, '_blank');
  };

  const shareToTelegram = () => {
    const text = formatShareText();
    window.open(`https://t.me/share/url?url=${encodeURIComponent('https://ruhesim.site')}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToReddit = () => {
    const title = `${getFemaleSignData()?.name} ve ${getMaleSignData()?.name} Burç Uyumu Analizi`;
    const text = `Ruhesim.site'de burç uyumunu analiz ettim, sonuçlar çok ilginç! Sen de dene: https://ruhesim.site`;
    window.open(`https://reddit.com/submit?title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `${getFemaleSignData()?.name} ve ${getMaleSignData()?.name} Burç Uyumu Analizi`;
    const body = formatShareText();
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const analyzeCompatibility = async () => {
    if (!femaleSign || !maleSign) {
      setError('Lütfen her iki burcu da seçin');
      return;
    }

    // Cache anahtarı oluştur (sıralama önemli değil)
    const cacheKey = [femaleSign, maleSign].sort().join('-');
    
    // Önce localStorage'dan kontrol et
    if (typeof window !== 'undefined') {
      const cachedResult = localStorage.getItem(`zodiac-${cacheKey}`);
      if (cachedResult) {
        setResult(cachedResult);
        setError('');
        return;
      }
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/analyze-compatibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          femaleSign,
          maleSign
        }),
      });

      if (!response.ok) {
        throw new Error('Analiz sırasında bir hata oluştu');
      }

      const data = await response.json();
      setResult(data.analysis);
      
      // Sonucu localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem(`zodiac-${cacheKey}`, data.analysis);
      }
    } catch (err) {
      setError('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Head>
        {/* Primary Meta Tags */}
        <title>Burç Uyumları Analizi | Ruh Eşim - AI Destekli Aşk Uyumluluk Testi</title>
        <meta name="title" content="Burç Uyumları Analizi | Ruh Eşim - AI Destekli Aşk Uyumluluk Testi" />
        <meta name="description" content="🌟 Türkiye'nin en kapsamlı burç uyumları analizi! AI destekli detaylı rapor ile sevgilinizle uyumunuzu keşfedin. Ücretsiz burç analizi, aşk uyumluluk testi ve romantik öneriler." />
        <meta name="keywords" content="burç uyumları, aşk uyumluluk, burç analizi, astroloji, sevgili uyumu, burç eşleşmesi, horoscope compatibility, zodiac signs, aşk testi, burç hesaplama, astroloji analizi, ruh eşi bulma, burç yorumları, aşk astrologisi, türkiye burç, burç rehberi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ruhesim.site/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ruhesim.site/" />
        <meta property="og:title" content="Burç Uyumları Analizi | Ruh Eşim - AI Destekli Aşk Uyumluluk Testi" />
        <meta property="og:description" content="🌟 Türkiye'nin en kapsamlı burç uyumları analizi! AI destekli detaylı rapor ile sevgilinizle uyumunuzu keşfedin. Ücretsiz burç analizi ve romantik öneriler." />
        <meta property="og:image" content="https://ruhesim.site/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ruh Eşim - Burç Uyumları Analizi" />
        <meta property="og:site_name" content="Ruh Eşim" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ruhesim.site/" />
        <meta property="twitter:title" content="Burç Uyumları Analizi | Ruh Eşim - AI Destekli Aşk Uyumluluk Testi" />
        <meta property="twitter:description" content="🌟 Türkiye'nin en kapsamlı burç uyumları analizi! AI destekli detaylı rapor ile sevgilinizle uyumunuzu keşfedin." />
        <meta property="twitter:image" content="https://ruhesim.site/twitter-image.png" />
        <meta property="twitter:image:alt" content="Ruh Eşim - Burç Uyumları Analizi" />
        <meta name="twitter:creator" content="@ruhesim" />
        <meta name="twitter:site" content="@ruhesim" />
        
        {/* Additional Meta Tags */}
        <meta name="subject" content="Burç Uyumları ve Astroloji" />
        <meta name="rating" content="General" />
        <meta name="referrer" content="origin" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="safe for kids" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="TR" />
        <meta name="geo.country" content="Turkey" />
        <meta name="geo.placename" content="Turkey" />
        <meta name="ICBM" content="39.9334, 32.8597" />
        
        {/* Structured Data for Homepage */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://ruhesim.site/#webpage",
            "url": "https://ruhesim.site/",
            "name": "Burç Uyumları Analizi | Ruh Eşim",
            "description": "Türkiye'nin en kapsamlı burç uyumları analizi! AI destekli detaylı rapor ile sevgilinizle uyumunuzu keşfedin.",
            "inLanguage": "tr-TR",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://ruhesim.site/#website"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://ruhesim.site/"
              }]
            },
            "mainEntity": {
              "@type": "WebApplication",
              "name": "Burç Uyumları Analizi",
              "description": "AI destekli burç uyumluluğu analizi uygulaması",
              "url": "https://ruhesim.site/",
              "applicationCategory": "Lifestyle",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1247",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          })
        }} />
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Burç uyumları gerçek mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Burç uyumları astrolojik geleneklere dayalı yorumlardır. Ruh Eşim, bu geleneksel bilgileri AI ile harmanlayarak eğlenceli ve içgörü dolu analizler sunar."
                }
              },
              {
                "@type": "Question", 
                "name": "Hangi burçlar en uyumlu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ateş burçları (Koç, Aslan, Yay) genellikle birbirleriyle uyumludur. Aynı şekilde Toprak (Boğa, Başak, Oğlak), Hava (İkizler, Terazi, Kova) ve Su (Yengeç, Akrep, Balık) burçları da kendi aralarında iyi uyum gösterir."
                }
              },
              {
                "@type": "Question",
                "name": "Burç analizi ücretsiz mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet! Ruh Eşim'de tüm burç uyumluluğu analizleri tamamen ücretsizdir. Detaylı AI destekli raporları hiçbir ücret ödemeden alabilirsiniz."
                }
              }
            ]
          })
        }} />
      </Head>

      <main className={`min-h-screen transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
          : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'
      } relative overflow-hidden`}>
        
        {/* Header */}
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Hearts */}
          <div className="absolute top-20 left-10 w-8 h-8 text-pink-400 opacity-70 animate-float">
            <Heart className="w-full h-full" />
          </div>
          <div className="absolute top-40 right-20 w-6 h-6 text-purple-400 opacity-60 animate-float-delayed">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute bottom-40 left-1/4 w-7 h-7 text-blue-400 opacity-50 animate-float-slow">
            <Star className="w-full h-full" />
          </div>
          <div className="absolute bottom-20 right-1/3 w-5 h-5 text-violet-400 opacity-60 animate-pulse">
            <Zap className="w-full h-full" />
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto p-6 pt-24">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="animate-pulse">
                <Heart className={`w-16 h-16 ${darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
              </div>
              <h1 className={`text-6xl md:text-8xl font-black tracking-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Ruh Eşim
                </span>
              </h1>
              <div className="animate-pulse animation-delay-500">
                <Heart className={`w-16 h-16 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border transition-all duration-500 hover:shadow-3xl ${
            darkMode 
              ? 'bg-white/10 border-white/20 shadow-purple-500/20' 
              : 'bg-white/80 border-white/40 shadow-purple-200/50'
          }`}>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Female Sign */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 shadow-lg shadow-pink-500/30' 
                      : 'bg-gradient-to-r from-pink-400 to-pink-600 shadow-lg shadow-pink-400/30'
                  }`}>
                    <span className="text-3xl">👩</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                    Kadın Burcu
                  </h3>
                </div>
                <select
                  value={femaleSign}
                  onChange={(e) => setFemaleSign(e.target.value)}
                  className={`w-full p-6 text-lg rounded-2xl border-2 focus:outline-none transition-all duration-300 hover:scale-105 focus:scale-105 ${
                    darkMode 
                      ? 'bg-gray-800/80 border-pink-400/30 text-white focus:border-pink-400 focus:bg-gray-700/80 backdrop-blur-md' 
                      : 'bg-pink-50/80 border-pink-200 text-gray-700 focus:border-pink-500 focus:bg-pink-100 backdrop-blur-sm'
                  }`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  <option value="" className={darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}>
                    ✨ Burç seçin...
                  </option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign.value} value={sign.value} className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}>
                      {sign.emoji} {sign.name} ({sign.dates})
                    </option>
                  ))}
                </select>
                {femaleSign && (
                  <div className={`p-6 rounded-2xl text-center transition-all duration-500 transform animate-fade-in ${
                    darkMode 
                      ? 'bg-pink-500/20 border border-pink-400/30' 
                      : 'bg-pink-100/80 border border-pink-200'
                  }`}>
                    <span className="text-4xl mb-3 block animate-bounce">{getFemaleSignData()?.emoji}</span>
                    <p className={`font-bold text-xl ${darkMode ? 'text-pink-300' : 'text-pink-700'}`}>
                      {getFemaleSignData()?.name}
                    </p>
                    <p className={`text-lg ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                      {getFemaleSignData()?.dates}
                    </p>
                  </div>
                )}
              </div>

              {/* Male Sign */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30' 
                      : 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-400/30'
                  }`}>
                    <span className="text-3xl">👨</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    Erkek Burcu
                  </h3>
                </div>
                <select
                  value={maleSign}
                  onChange={(e) => setMaleSign(e.target.value)}
                  className={`w-full p-6 text-lg rounded-2xl border-2 focus:outline-none transition-all duration-300 hover:scale-105 focus:scale-105 ${
                    darkMode 
                      ? 'bg-gray-800/80 border-blue-400/30 text-white focus:border-blue-400 focus:bg-gray-700/80 backdrop-blur-md' 
                      : 'bg-blue-50/80 border-blue-200 text-gray-700 focus:border-blue-500 focus:bg-blue-100 backdrop-blur-sm'
                  }`}
                  style={darkMode ? { colorScheme: 'dark' } : {}}
                >
                  <option value="" className={darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}>
                    ✨ Burç seçin...
                  </option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign.value} value={sign.value} className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}>
                      {sign.emoji} {sign.name} ({sign.dates})
                    </option>
                  ))}
                </select>
                {maleSign && (
                  <div className={`p-6 rounded-2xl text-center transition-all duration-500 transform animate-fade-in ${
                    darkMode 
                      ? 'bg-blue-500/20 border border-blue-400/30' 
                      : 'bg-blue-100/80 border border-blue-200'
                  }`}>
                    <span className="text-4xl mb-3 block animate-bounce">{getMaleSignData()?.emoji}</span>
                    <p className={`font-bold text-xl ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      {getMaleSignData()?.name}
                    </p>
                    <p className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {getMaleSignData()?.dates}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-8 p-6 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm animate-shake">
                <p className={`text-center text-lg font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Analyze Button */}
            <div className="text-center mt-12">
              <button
                onClick={analyzeCompatibility}
                disabled={!femaleSign || !maleSign || loading}
                className="group relative px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-4 mx-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  {loading ? (
                    <>
                      <Loader2 className="w-7 h-7 animate-spin" />
                      <span>Analiz Ediliyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-7 h-7 animate-pulse" />
                      <span>Uyumluluğu Keşfet</span>
                      <Star className="w-7 h-7 animate-pulse" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div id="result-container" className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up border ${
              darkMode 
                ? 'bg-white/10 border-white/20 shadow-purple-500/20' 
                : 'bg-white/80 border-white/40 shadow-purple-200/50'
            }`}>
              <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-4 mb-6 animate-bounce-in">
                  <span className="text-4xl animate-pulse">{getFemaleSignData()?.emoji}</span>
                  <Heart className={`w-8 h-8 animate-pulse ${darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                  <span className="text-4xl animate-pulse">{getMaleSignData()?.emoji}</span>
                </div>
                <h2 className={`text-3xl md:text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {getFemaleSignData()?.name} & {getMaleSignData()?.name}
                </h2>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={copyText}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                      copySuccess 
                        ? 'bg-green-500 text-white' 
                        : darkMode 
                          ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copySuccess ? 'Kopyalandı!' : 'Metni Kopyala'}
                  </button>
                  
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  >
                    <Share2 className="w-4 h-4" />
                    Paylaş
                  </button>
                </div>
              </div>
              
              <div className="prose prose-xl max-w-none">
                <div className={`p-8 rounded-2xl border ${
                  darkMode 
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30' 
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                }`}>
                  {result.split('\n').map((line, index) => {
                    // Başlık satırları (emoji ile başlayanlar)
                    if (line.match(/^[🌟💕✨⚠️🗣️❤️🔥💰👨‍👩‍👧‍👦🎯😤🎭🧠🎨💪🌱✈️🏡🏠💡]/)) {
                      const [emoji, ...rest] = line.split(' ');
                      return (
                        <div key={index} className="mb-6 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                          <div className={`flex items-center gap-3 mb-3 p-4 rounded-xl ${
                            darkMode 
                              ? 'bg-white/10 border border-white/20' 
                              : 'bg-white/80 border border-purple-200'
                          }`}>
                            <span className="text-3xl animate-pulse">{emoji}</span>
                            <h3 className={`text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                              {rest.join(' ')}
                            </h3>
                          </div>
                        </div>
                      );
                    }
                    // Madde işaretli satırlar
                    else if (line.startsWith('• ')) {
                      return (
                        <div key={index} className="mb-3 animate-slide-in" style={{animationDelay: `${index * 0.05}s`}}>
                          <div className={`p-3 rounded-lg ml-4 ${
                            darkMode 
                              ? 'bg-white/5 border-l-4 border-purple-400' 
                              : 'bg-purple-50/80 border-l-4 border-purple-300'
                          }`}>
                            <p className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                              <span className="text-purple-500 mr-2">✦</span>
                              {line.substring(2)}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    // Normal paragraflar
                    else if (line.trim() && !line.match(/^[🌟💕✨⚠️🗣️❤️🏠💡]/)) {
                      return (
                        <div key={index} className="mb-4 animate-fade-in" style={{animationDelay: `${index * 0.08}s`}}>
                          <p className={`text-lg leading-relaxed font-medium ${
                            darkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            {line}
                          </p>
                        </div>
                      );
                    }
                    // Boş satırlar
                    else {
                      return <div key={index} className="mb-2"></div>;
                    }
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className={`text-center py-12 mt-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-lg font-medium">
              Made with ❤️ by ruhesim.site
            </p>
          </footer>
        </div>

        {/* Cookie Consent */}
        {showCookieConsent && (
          <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className={`mx-4 mb-4 p-6 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              darkMode 
                ? 'bg-gray-900/95 border-gray-700/50 text-white' 
                : 'bg-white/95 border-gray-200/50 text-gray-700'
            }`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🍪</span>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Çerez Kullanımı
                    </h3>
                  </div>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Size daha iyi hizmet verebilmek için çerezleri kullanıyoruz. Burç analizlerinizi kaydetmek ve deneyiminizi kişiselleştirmek için gereklidir.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={rejectCookies}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    Reddet
                  </button>
                  <button
                    onClick={acceptCookies}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <Check className="w-4 h-4 inline mr-1" />
                    Kabul Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
              onClick={() => setShowShareModal(false)}
            ></div>
            
            {/* Modal */}
            <div className={`relative w-full max-w-lg p-6 rounded-3xl shadow-2xl animate-bounce-in ${
              darkMode 
                ? 'bg-gray-900/95 border border-gray-700/50' 
                : 'bg-white/95 border border-gray-200/50'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Share2 className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Analizi Paylaş
                  </h3>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className={`p-2 rounded-full transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Analiz Preview */}
              <div className={`p-4 rounded-2xl mb-6 text-center ${
                darkMode ? 'bg-white/10 border border-white/20' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="flex justify-center items-center gap-2 mb-2">
                  <span className="text-2xl">{getFemaleSignData()?.emoji}</span>
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-2xl">{getMaleSignData()?.emoji}</span>
                </div>
                <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {getFemaleSignData()?.name} & {getMaleSignData()?.name}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Burç Uyumu Analizi
                </p>
              </div>

              {/* Social Media Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={shareToWhatsApp}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 bg-green-500 hover:bg-green-600 text-white"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>

                <button
                  onClick={shareToTwitter}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 bg-black hover:bg-gray-800 text-white"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Twitter/X</span>
                </button>

                <button
                  onClick={shareToFacebook}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </button>

                <button
                  onClick={shareToLinkedIn}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 bg-blue-700 hover:bg-blue-800 text-white"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                </button>

                <button
                  onClick={shareToTelegram}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Telegram</span>
                </button>

                <button
                  onClick={shareToReddit}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Reddit</span>
                </button>
              </div>

              {/* Email Button */}
              <button
                onClick={shareViaEmail}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>E-posta ile Gönder</span>
              </button>

              {/* Note */}
              <p className={`text-xs text-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                💡 Paylaştığınız metin RUHESIM başlığı ve ruhesim.site linki ile beraber gönderilir
              </p>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite; 
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
}