import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { Gift, Heart, Search, Sparkles, Flower } from 'lucide-react';

 const gifts = [
  'Takı Seti',
  'Parfüm',
  'Makyaj Paleti',
  'Çiçek Buketi',
  'Çanta',
  'Çikolata Kutusu',
  'Fotoğraf Çerçevesi',
  'Mum Seti',
  'Şal',
  'Yüzük',
  'Küpe',
  'Bilezik',
  'Kolye',
  'Günlük Defteri',
  'Çay Seti',
  'Saç Aksesuarı',
  'Nail Art Kit',
  'Kitap',
  'Terlik',
  'Spa Seti',
  'Dijital Karikatür Portre',
  'Kalpli Müzik Kutusu',
  'Isıtmalı Peluş Oyuncak',
  'Kişisel Takvim',
  'Anı Kavanozu',
  'Kokulu Taş Seti',
  'İsme Özel Bileklik',
  'Mini Projektör',
  'LED Fotoğraf Işık Zinciri',
  'Müzikli Kar Küresi',
  'Kişiye Özel Tişört',
  'Romantik Mesaj Kartları',
  'Mini Saksı Çiçekleri',
  'El Yapımı Sabun Seti',
  'Taşlı Saç Tokası',
  'Dekoratif Lamba',
  'Sevgiliye Yazılmış Mektup Kitabı',
  'Kanvas Tablo',
  'İsim Yazılı Cüzdan',
  'Lavanta Kesesi',
  'Kupa Bardak',
  'Sevgili Temalı Puzzle',
  'Film Kutusu Anı Seti',
  'Kalpli Anahtarlık',
  'Sürpriz Kutusu',
  'Polaroid Fotoğraf Makinesi',
  'Yıldız Haritası Posteri',
  'Müzik Listesi Poster',
  'Özel Baskı Battaniye',
  'Ev Terliği Seti',
  'Aromaterapi Yağ Seti',
  'Tasarım Kol Düğmesi (Dekoratif)',
  'Kalpli Mousepad',
  'El Yapımı Magnetler',
  'Sıcak Su Torbası',
  'Romantik Not Defteri',
  'Uyku Maskesi',
  'Gül Kurusu Kutusu',
  'Mini Parfüm Koleksiyonu',
  'Kişiye Özel Takvim',
  'Sevdiğin Şarkıdan Plak',
  'Kokulu Mum Kavanozu',
  'Dijital Aşk Mektubu (USB içinde)',
  'Nazarlık Kolye',
  'Kedi/Köpek Temalı Hediye Kutusu',
  'Yumuşak Peluş Battaniye',
  'Kişisel Spotify Kodlu Anahtarlık',
  'Lavanta Dolgulu Yastık',
  'Şeffaf Fotoğraf Albümü',
  'Mini Kalp Şeklinde Çanta',
  'Minimalist Tarzda Saat',
  'Özel İsim Yazılı Ayna',
  'Limonata Takımı',
  'Harfli Kolye',
  'Makyaj Fırça Seti',
  'Kozmetik Düzenleyici',
  'Kalpli Tatlı Tabağı',
  'Piknik Sepeti',
  'Kız Kıza Film Gecesi Kutusu',
  'Örgü Yastık',
  'El Yazısıyla Hediye Kartı',
  'Yıldönümü Defteri',
  'Doğum Günü Mesaj Kutusu',
  'Sevdiği Dizi Temalı Ürün',
  'Aşk Temalı Takvim',
  'Romantik Film DVD Seti',
  'Kalpli Pasta Kalıbı',
  'Bitki Yetiştirme Kiti',
  'Kendi Şiirini Yazabileceği Kitap',
  'Gül Şeklinde Sabunlar',
  'Kadife Takı Kutusu',
  'Vintage Tarzda El Aynası',
  'Dantel Detaylı Fular',
  'Isıtmalı Boyun Yastığı',
  'Notlu Aşk Kavanozu',
  'Mesajlı Bileklik',
  'Kişiye Özel El Çantası',
  'Resimli Anahtarlık',
  'Kokulu Kurabiye Kutusu',
  'Tasarım Mumluk Seti',
  'Kalpli Şemsiye',
  'Kokulu Tütsü Seti',
  'Dekoratif Saksı',
  'Harf Baskılı Tişört',
  'İsme Özel Powerbank',
  'Kalpli Gece Lambası',
];

export default function KadinHediyeleri() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGifts, setFilteredGifts] = useState(gifts);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredGifts(gifts.filter(gift => 
        gift.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredGifts(gifts);
    }
  }, [searchTerm]);

  return (
    <>
    <Head>
        {/* Primary Meta Tags */}
        <title>Kadınlara Alınacak Hediyeler - 100+ Zarif Hediye Fikri | Ruh Eşim</title>
        <meta name="title" content="Kadınlara Alınacak Hediyeler - 100+ Zarif Hediye Fikri | Ruh Eşim" />
        <meta name="description" content="🌹 Kadın sevgiliniz için zarif ve anlamlı hediye fikirleri! Doğum günü, sevgililer günü ve özel günler için romantik hediye önerileri. Her zevke uygun seçenekler." />
        <meta name="keywords" content="kadın hediyeleri, kadın sevgili hediyesi, doğum günü hediyesi kadın, sevgililer günü hediyesi, kadınlara hediye fikirleri, romantik hediyeler, takı hediyeleri, kozmetik hediyeler, çiçek hediyeleri, kadın aksesuar, özel hediyeler" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ruhesim.site/kadin-hediyeleri" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://ruhesim.site/kadin-hediyeleri" />
        <meta property="og:title" content="Kadınlara Alınacak Hediyeler - 100+ Zarif Hediye Fikri | Ruh Eşim" />
        <meta property="og:description" content="🌹 Kadın sevgiliniz için zarif ve anlamlı hediye fikirleri! Sevgililer günü ve özel günler için romantik hediye önerileri." />
        <meta property="og:image" content="https://ruhesim.site/kadin-hediye-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kadın Hediyeleri - Ruh Eşim" />
        <meta property="og:site_name" content="Ruh Eşim" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ruhesim.site/kadin-hediyeleri" />
        <meta property="twitter:title" content="Kadınlara Alınacak Hediyeler - 100+ Zarif Hediye Fikri" />
        <meta property="twitter:description" content="🌹 Kadın sevgiliniz için zarif hediye fikirleri! Her zevke uygun romantik öneriler." />
        <meta property="twitter:image" content="https://ruhesim.site/kadin-hediye-twitter.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://ruhesim.site/kadin-hediyeleri",
            "url": "https://ruhesim.site/kadin-hediyeleri",
            "name": "Kadınlara Alınacak Hediyeler",
            "description": "Kadın sevgiliniz için zarif ve anlamlı hediye fikirleri ve önerileri",
            "inLanguage": "tr-TR",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://ruhesim.site/#website"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Ana Sayfa",
                  "item": "https://ruhesim.site/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Kadın Hediyeleri",
                  "item": "https://ruhesim.site/kadin-hediyeleri"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Kadın Hediye Fikirleri",
              "description": "Kadınlara alınacak hediye önerileri listesi",
              "numberOfItems": "100+",
              "itemListElement": [
                {
                  "@type": "Thing",
                  "name": "Takı Seti",
                  "description": "Zarif ve şık takı setleri"
                },
                {
                  "@type": "Thing", 
                  "name": "Parfüm",
                  "description": "Kaliteli ve uzun soluklu parfümler"
                },
                {
                  "@type": "Thing",
                  "name": "Çiçek Buketi", 
                  "description": "Romantik çiçek buketi önerileri"
                }
              ]
            }
          })
        }} />
        
        {/* Article Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Kadınlara Alınacak Hediyeler - 100+ Zarif Hediye Fikri",
            "description": "Kadın sevgiliniz için zarif ve anlamlı hediye fikirleri! Sevgililer günü ve özel günler için romantik hediye önerileri.",
            "author": {
              "@type": "Organization",
              "name": "Ruh Eşim"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "Ruh Eşim",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ruhesim.site/logo-512.png"
              }
            },
            "datePublished": "2024-12-28",
            "dateModified": "2024-12-28",
            "mainEntityOfPage": "https://ruhesim.site/kadin-hediyeleri",
            "image": "https://ruhesim.site/kadin-hediye-og.png",
            "articleSection": "Hediye Önerileri",
            "wordCount": "500+",
            "articleBody": "Kadın sevgilinize veya eşinize alacağınız hediyeyi seçmek özel bir düşünce gerektir. Bu kapsamlı listede takılardan kozmetiğe, çiçeklerden aksesuarlara kadar 100'den fazla zarif hediye fikri bulabilirsiniz."
          })
        }} />
      </Head>
      <div className={`min-h-screen transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-pink-900 to-rose-900' 
          : 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50'
      }`}>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Floating Hearts */}
          <div className="absolute top-1/4 left-1/3 animate-float">
            <Heart className="w-6 h-6 text-pink-300 opacity-60" />
          </div>
          <div className="absolute top-1/2 right-1/4 animate-float animation-delay-1000">
            <Flower className="w-8 h-8 text-rose-300 opacity-50" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 pt-24">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Flower className={`w-12 h-12 ${darkMode ? 'text-pink-400' : 'text-pink-600'} animate-bounce`} />
              <h1 className={`text-4xl md:text-6xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-pink-500 via-rose-600 to-red-600 bg-clip-text text-transparent">
                  Kadın Hediyeleri
                </span>
              </h1>
              <Heart className={`w-12 h-12 ${darkMode ? 'text-rose-400' : 'text-rose-600'} animate-bounce animation-delay-500`} />
            </div>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Sevdiğin kadın için zarif hediye fikirleri 💕
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className={`relative max-w-md mx-auto backdrop-blur-xl rounded-2xl shadow-lg ${
              darkMode ? 'bg-white/10 border border-white/20' : 'bg-white/80 border border-gray-200'
            }`}>
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Hediye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-transparent focus:outline-none text-lg ${
                  darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Gifts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGifts.map((gift, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-xl animate-fade-in ${
                  darkMode 
                    ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                    : 'bg-white/80 border border-gray-200 hover:bg-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Gift Icon */}
                <div className="relative z-10 flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600' 
                      : 'bg-gradient-to-r from-pink-400 to-rose-500'
                  }`}>
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Gift Name */}
                <div className="relative z-10 text-center">
                  <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-white group-hover:text-pink-300' : 'text-gray-900 group-hover:text-pink-600'
                  }`}>
                    {gift}
                  </h3>
                  
                  {/* Decorative Hearts */}
                  <div className="flex justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(3)].map((_, i) => (
                      <Heart 
                        key={i} 
                        className={`w-4 h-4 ${darkMode ? 'text-pink-400' : 'text-pink-500'} animate-pulse`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Sparkles */}
                <Sparkles className={`absolute top-2 right-2 w-5 h-5 opacity-0 group-hover:opacity-60 transition-all duration-300 animate-pulse ${
                  darkMode ? 'text-rose-400' : 'text-rose-500'
                }`} />

                {/* Floating Flower */}
                <Flower className={`absolute top-2 left-2 w-4 h-4 opacity-0 group-hover:opacity-40 transition-all duration-300 animate-spin ${
                  darkMode ? 'text-pink-400' : 'text-pink-500'
                }`} style={{ animationDuration: '3s' }} />
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredGifts.length === 0 && (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Gift className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Aradığınız hediye bulunamadı</p>
              <p className="text-sm mt-2">Farklı bir arama terimi deneyin</p>
            </div>
          )}

          {/* Bottom Info */}
          <div className={`text-center mt-16 p-6 rounded-2xl backdrop-blur-xl ${
            darkMode ? 'bg-white/10 border border-white/20' : 'bg-white/80 border border-gray-200'
          }`}>
            <Heart className={`w-8 h-8 mx-auto mb-3 ${darkMode ? 'text-red-400' : 'text-red-500'} animate-pulse`} />
            <p className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              💝 {filteredGifts.length} zarif hediye fikri
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Aşkı en güzel şekilde ifade eden hediyeler! 🌹
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}