import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { Gift, Heart, Search, Sparkles, Star } from 'lucide-react';

 const gifts = [
  'Kablosuz Kulaklık',
  'Akıllı Saat',
  'Deri Cüzdan',
  'Parfüm',
  'Güneş Gözlüğü',
  'Gaming Mouse',
  'Bluetooth Hoparlör',
  'Kahve Makinesi',
  'Spor Çantası',
  'Kol Saati',
  'Powerbank',
  'Kitap Seti',
  'Masaj Aleti',
  'Futbol Topu',
  'Araç Kokusu',
  'Tıraş Seti',
  'Çorap Seti',
  'Kapüşonlu Sweatshirt',
  'Oyun Kolu',
  'Laptop Çantası',
  'Termos',
  'Spor Ayakkabı',
  'Sporcu Şapkası',
  'Bluetooth Kulaklık',
  'Barbekü Seti',
  'Taktik Saat',
  'Fitness Bilekliği',
  'Araç İçi Telefon Tutucu',
  'Kamp Malzemesi Seti',
  'Dijital Fotoğraf Çerçevesi',
  'Kişisel Bakım Seti',
  'Sporcu Beslenme Tableti',
  'Koleksiyon Figürü',
  'Masaüstü Mini Fan',
  'Araba Yıkama Seti',
  'Yürüyüş Batonları',
  'Mini Drone',
  'Mikrofon',
  'Elektronik Sigara',
  'Retro Radyo',
  'Akıllı Termometre',
  'Kahve Öğütücü',
  'Bira Bardağı Seti',
  'Çakmak',
  'Taktik Tıraş Makinesi',
  'Şarap Açacağı',
  'Mini Projeksiyon Cihazı',
  'Sporcu Eldiveni',
  'Dijital Terazi',
  'Oyuncu Klavyesi',
  'Halı Saha Topu',
  'Motorcu Eldiveni',
  'Survival Kiti',
  'Sporcu Su Şişesi',
  'Elektronik Kitap Okuyucu',
  'Araç İçi Organizer',
  'Çok Fonksiyonlu Araç Aleti',
  'Erkek Kolye',
  'Bileklik',
  'Kişisel Günlük',
  'Taktik Sırt Çantası',
  'Termal İçlik',
  'Sporcu Şort',
  'Trekking Ayakkabısı',
  'Kamp Çadırı',
  'Kamp Lambası',
  'Outdoor Çok Amaçlı Çakı',
  'Şapka',
  'Polar Mont',
  'Sporcu Kulaklığı',
  'Su Geçirmez Telefon Kılıfı',
  'Bluetooth Hoparlör',
  'Dijital Saat',
  'Oyun Konsolu',
  'Elektrikli Scooter',
  'Sporcu Gözlüğü',
  'Akıllı Ev Asistanı',
  'Erkek Parfüm Seti',
  'Fotoğraf Makinesi',
  'Sporcu Masaj Topu',
  'Mini Golf Seti',
  'Taktik Kask',
  'Bisiklet Kaskı',
  'Elektronik Tıraş Makinesi',
  'Powerbank',
  'Termoslu Sırt Çantası',
  'LED Bisiklet Lambası',
  'Araba İçi Kamera',
  'Akıllı Bileklik',
  'Kamp Sandalyesi',
  'Erkek İç Çamaşırı Seti',
  'Dijital Pusula',
  'Fitness Matı',
  'Boks Eldiveni',
  'Yoga Matı',
  'Sporcu Dizlik',
  'Kişisel Bakım Seti',
  'Mini Masa Tenisi Seti',
  'Seyahat Çantası',
  'Dizüstü Soğutucu',
];


export default function ErkekHediyeleri() {
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
        <title>Erkeklere Alınacak Hediyeler - 100+ Özel Hediye Fikri | Ruh Eşim</title>
        <meta name="title" content="Erkeklere Alınacak Hediyeler - 100+ Özel Hediye Fikri | Ruh Eşim" />
        <meta name="description" content="🎁 Erkek sevgiliniz için mükemmel hediye fikirleri! Doğum günü, yıldönümü ve özel günler için yaratıcı, anlamlı hediye önerileri. Her bütçeye uygun seçenekler." />
        <meta name="keywords" content="erkek hediyeleri, erkek sevgili hediyesi, doğum günü hediyesi erkek, yıldönümü hediyesi, erkeklere hediye fikirleri, sevgili hediyesi, erkek hediye önerileri, romantik hediyeler, özel hediyeler, erkek aksesuar, teknoloji hediyeleri" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ruhesim.site/erkek-hediyeleri" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://ruhesim.site/erkek-hediyeleri" />
        <meta property="og:title" content="Erkeklere Alınacak Hediyeler - 100+ Özel Hediye Fikri | Ruh Eşim" />
        <meta property="og:description" content="🎁 Erkek sevgiliniz için mükemmel hediye fikirleri! Doğum günü, yıldönümü ve özel günler için yaratıcı hediye önerileri." />
        <meta property="og:image" content="https://ruhesim.site/erkek-hediye-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Erkek Hediyeleri - Ruh Eşim" />
        <meta property="og:site_name" content="Ruh Eşim" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ruhesim.site/erkek-hediyeleri" />
        <meta property="twitter:title" content="Erkeklere Alınacak Hediyeler - 100+ Özel Hediye Fikri" />
        <meta property="twitter:description" content="🎁 Erkek sevgiliniz için mükemmel hediye fikirleri! Her bütçeye uygun yaratıcı öneriler." />
        <meta property="twitter:image" content="https://ruhesim.site/erkek-hediye-twitter.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://ruhesim.site/erkek-hediyeleri",
            "url": "https://ruhesim.site/erkek-hediyeleri",
            "name": "Erkeklere Alınacak Hediyeler",
            "description": "Erkek sevgiliniz için mükemmel hediye fikirleri ve önerileri",
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
                  "name": "Erkek Hediyeleri",
                  "item": "https://ruhesim.site/erkek-hediyeleri"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Erkek Hediye Fikirleri",
              "description": "Erkeklere alınacak hediye önerileri listesi",
              "numberOfItems": "100+",
              "itemListElement": [
                {
                  "@type": "Thing",
                  "name": "Kablosuz Kulaklık",
                  "description": "Teknoloji seven erkekler için ideal hediye"
                },
                {
                  "@type": "Thing", 
                  "name": "Akıllı Saat",
                  "description": "Spor ve teknoloji tutkunları için mükemmel seçim"
                },
                {
                  "@type": "Thing",
                  "name": "Deri Cüzdan", 
                  "description": "Klasik ve şık hediye seçeneği"
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
            "headline": "Erkeklere Alınacak Hediyeler - 100+ Özel Hediye Fikri",
            "description": "Erkek sevgiliniz için mükemmel hediye fikirleri! Doğum günü, yıldönümü ve özel günler için yaratıcı hediye önerileri.",
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
            "mainEntityOfPage": "https://ruhesim.site/erkek-hediyeleri",
            "image": "https://ruhesim.site/erkek-hediye-og.png",
            "articleSection": "Hediye Önerileri",
            "wordCount": "500+",
            "articleBody": "Erkek sevgilinize veya eşinize alacağınız hediyeyi seçmek bazen zor olabilir. Bu kapsamlı listede teknolojiden spora, aksesuardan hobi malzemelerine kadar 100'den fazla hediye fikri bulabilirsiniz."
          })
        }} />
      </Head>

      <div className={`min-h-screen transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 pt-24">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Gift className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'} animate-bounce`} />
              <h1 className={`text-4xl md:text-6xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Erkek Hediyeleri
                </span>
              </h1>
              <Heart className={`w-12 h-12 ${darkMode ? 'text-purple-400' : 'text-purple-600'} animate-bounce animation-delay-500`} />
            </div>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Sevdiğin erkek için mükemmel hediye fikirleri ✨
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
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-xl ${
                  darkMode 
                    ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                    : 'bg-white/80 border border-gray-200 hover:bg-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Gift Icon */}
                <div className="relative z-10 flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-blue-400 to-purple-500'
                  }`}>
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Gift Name */}
                <div className="relative z-10 text-center">
                  <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {gift}
                  </h3>
                  
                  {/* Decorative Stars */}
                  <div className="flex justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Sparkles */}
                <Sparkles className={`absolute top-2 right-2 w-5 h-5 opacity-0 group-hover:opacity-60 transition-all duration-300 animate-pulse ${
                  darkMode ? 'text-purple-400' : 'text-purple-500'
                }`} />
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
              💝 {filteredGifts.length} harika hediye fikri
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Sevgiyi gösteren en güzel hediyeler burada! ✨
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </>
  );
}