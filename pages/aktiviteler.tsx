import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { Activity, Heart, Search, Sparkles, Star, Zap, MapPin, Camera } from 'lucide-react';

const activities = [
  'Birlikte filme gitmek',
  'Piknik yapmak',
  'Yürüyüşe çıkmak',
  'Beraber yemek pişirmek',
  'Müze gezisi',
  'Konsere gitmek',
  'Plajda vakit geçirmek',
  'Bisiklet sürmek',
  'Kitap okumak',
  'Oyun oynamak',
  'Evde kamp yapmak',
  'Yıldızları izlemek',
  'Puzzle yapmak',
  'Yeni bir dil öğrenmeye başlamak',
  'Kahve dükkanlarında tur yapmak',
  'Eski fotoğraflara bakmak',
  'Birlikte karaoke yapmak',
  'Beraber yoga denemek',
  'Resim yapmak',
  'Hayalinizdeki evi çizmeye çalışmak',
  'Çiftler günü kutlamak',
  'Birlikte YouTube videosu çekmek',
  'Doğa yürüyüşü yapmak',
  'Birlikte alışverişe çıkmak',
  'Çiçek ekmek',
  'Hayvan barınağını ziyaret etmek',
  'Komik TikTok videoları izlemek',
  'Beraber pasta süslemek',
  'Küçük hediyeleşme oyunu yapmak',
  'Beraber skeç yazmak ve oynamak',
  'Masa oyunu gecesi düzenlemek',
  'Doğa fotoğrafçılığı yapmak',
  'Birlikte hayal tatil rotası çizmek',
  'Beraber şiir yazmak',
  'Beraber saçma bir şey icat etmek',
  'Kostüm partisi yapmak (evde bile olsa)',
  'Beraber mimik taklit yarışması yapmak',
  'Birlikte dans dersi videosu izlemek',
  'Komik çocukluk anılarını anlatmak',
  'Evde sinema gecesi yapmak',
  'Sokak hayvanlarına mama bırakmak',
  'Birlikte podcast dinlemek',
  'Sesli kitap dinlemek',
  'Buz pateni yapmak',
  'Beraber minyatür bir dünya kurmak (lego, maket vs.)',
  'Haritada rastgele bir yer seçip araştırmak',
  'Birbirinize karikatür çizmek',
  'Tebessüm ettiren notlar yazmak',
  'Ebeveyn taklidi yaparak konuşmak',
  'Birbirinize 5 yaşındaki haliniz gibi davranmak',
  'Sürpriz kutular hazırlamak',
  'Şehirde turist gibi gezmek',
  'Beraber selfie albümü oluşturmak',
  'Mutfakta malzeme yarışması yapmak (kim daha iyi tarif uydurur)',
  'Birlikte meditasyon yapmak',
  'Gönüllü bir projeye katılmak',
  'Birlikte şarkı yazmak',
  'Nostaljik dizi gecesi yapmak',
  'Doğum günü olmayan bir günü kutlamak',
  'Birbirinize mektup yazmak ve okumak',
  'Eski kıyafetlerle defile yapmak',
  'Beraber çöp toplamak',
  'Hikaye oluşturma oyunu oynamak (biri başlar, diğeri devam eder)',
  'Hayali şirket kurmak',
  'Birlikte duvar boyamak ya da grafiti yapmak',
  'Evde yarışma programı taklidi yapmak',
  'Çocuk parkında salıncağa binmek',
  'Origami yapmayı öğrenmek',
  'Dergi ya da gazete kolajı yapmak',
  'Saklambaç oynamak (evde bile olsa)',
  'Birlikte kek yakmak ve gülmek',
  'Birbirinize komik lakaplar bulmak',
  'Ters el ile resim yapmak',
  'Ayakkabı değiştirip yürümeye çalışmak',
  'Birbirinizi çizdiğiniz portrelerle şaşırtmak',
  'İnternetten saçma testler çözmek',
  'Beraber çadır kurmak (evin ortasında olabilir)',
  'Kedi/köpek sahiplendirme etkinliğine gitmek',
  'Kendi çift logonuzu tasarlamak',
  'Hayali bir film posteri yapmak',
  'Beraber çamaşır katlama yarışması yapmak',
  'Birlikte eski şarkıları dinlemek ve dans etmek',
  'Birbirinize çocuk kitapları okumak',
  'Parkta sessiz sinema oynamak',
  'Beraber taş boyamak',
  'Tavşan gibi zıplama yarışması yapmak',
  'Birlikte hayali arkadaş yaratıp konuşmak',
  'Dondurma tat testi yapmak',
  'En kötü sesle şarkı söyleme yarışması',
  'Beraber çorap kuklası yapmak',
  'Google Earth’te rastgele yerler gezmek',
  'Birbirinize saçma reklam metinleri yazmak',
  'El ele tutuşup alışveriş arabası sürmek',
  'Evde mini olimpiyat yapmak',
  'Aynı anda birbirinizi çizmeye çalışmak',
  'Birbirinize şiir gibi alışveriş listesi yazmak',
  'Hayali bir ülke uydurup kurallarını yazmak',
  'Birlikte evcil hayvan ismi uydurmak',
  'Evdeki eşyaları kullanarak robot yapmak',
  'Yılın en saçma fikri yarışması yapmak',
  'Beraber balon patlatma oyunu yapmak',
  'En kötü film sahnesini yeniden canlandırmak',
  'Beraber takma dillerle konuşmak',
  'Evde çorap savaşı yapmak',
  'Buzdolabı mıknatıslarından hikaye oluşturmak',
];


const activityIcons = [
  { icon: Heart, color: 'text-red-500' },
  { icon: Star, color: 'text-yellow-500' },
  { icon: Zap, color: 'text-purple-500' },
  { icon: MapPin, color: 'text-green-500' },
  { icon: Camera, color: 'text-blue-500' },
  { icon: Sparkles, color: 'text-pink-500' },
];

export default function Aktiviteler() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState(activities);

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
      setFilteredActivities(activities.filter(activity => 
        activity.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredActivities(activities);
    }
  }, [searchTerm]);

  const getRandomIcon = (index: number) => {
    const iconIndex = index % activityIcons.length;
    return activityIcons[iconIndex];
  };

  return (
    <>
    <Head>
        {/* Primary Meta Tags */}
        <title>Sevgiliyken Yapılacak 100 Aktivite - Romantik Çift Etkinlikleri | Ruh Eşim</title>
        <meta name="title" content="Sevgiliyken Yapılacak 100 Aktivite - Romantik Çift Etkinlikleri | Ruh Eşim" />
        <meta name="description" content="💕 Sevgilinizle birlikte yapabileceğiniz 100 eğlenceli aktivite! Evde, dışarıda ve romantik anlar için yaratıcı çift etkinlikleri. Unutulmaz anılar yaratın." />
        <meta name="keywords" content="çift aktiviteleri, sevgili aktiviteleri, romantik etkinlikler, birlikte yapılacak şeyler, çift oyunları, romantik fikirler, evde yapılacak aktiviteler, dışarıda yapılacak aktiviteler, sevgili eğlencesi, aşk aktiviteleri, çift zamanı" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ruhesim.site/aktiviteler" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://ruhesim.site/aktiviteler" />
        <meta property="og:title" content="Sevgiliyken Yapılacak 100 Aktivite - Romantik Çift Etkinlikleri | Ruh Eşim" />
        <meta property="og:description" content="💕 Sevgilinizle birlikte yapabileceğiniz 100 eğlenceli aktivite! Evde ve dışarıda romantik anlar için yaratıcı fikirler." />
        <meta property="og:image" content="https://ruhesim.site/aktivite-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Çift Aktiviteleri - Ruh Eşim" />
        <meta property="og:site_name" content="Ruh Eşim" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ruhesim.site/aktiviteler" />
        <meta property="twitter:title" content="Sevgiliyken Yapılacak 100 Aktivite - Romantik Çift Etkinlikleri" />
        <meta property="twitter:description" content="💕 Sevgilinizle birlikte yapabileceğiniz 100 eğlenceli aktivite! Unutulmaz anılar yaratın." />
        <meta property="twitter:image" content="https://ruhesim.site/aktivite-twitter.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://ruhesim.site/aktiviteler",
            "url": "https://ruhesim.site/aktiviteler",
            "name": "Sevgiliyken Yapılacak 100 Aktivite",
            "description": "Sevgilinizle birlikte yapabileceğiniz eğlenceli ve romantik aktivite önerileri",
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
                  "name": "100 Aktivite",
                  "item": "https://ruhesim.site/aktiviteler"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Çift Aktiviteleri Listesi",
              "description": "Sevgililer için eğlenceli aktivite önerileri",
              "numberOfItems": "100",
              "itemListElement": [
                {
                  "@type": "Thing",
                  "name": "Birlikte filme gitmek",
                  "description": "Klasik ve romantik çift aktivitesi"
                },
                {
                  "@type": "Thing", 
                  "name": "Piknik yapmak",
                  "description": "Doğada romantik vakit geçirme"
                },
                {
                  "@type": "Thing",
                  "name": "Beraber yemek pişirmek", 
                  "description": "Evde birlikte keyifli zaman"
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
            "headline": "Sevgiliyken Yapılacak 100 Aktivite - Romantik Çift Etkinlikleri",
            "description": "Sevgilinizle birlikte yapabileceğiniz 100 eğlenceli aktivite! Evde, dışarıda ve romantik anlar için yaratıcı çift etkinlikleri.",
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
            "mainEntityOfPage": "https://ruhesim.site/aktiviteler",
            "image": "https://ruhesim.site/aktivite-og.png",
            "articleSection": "Çift Aktiviteleri",
            "wordCount": "800+",
            "articleBody": "Sevgilinizle birlikte vakit geçirmek ilişkinizi güçlendirir. Bu kapsamlı listede evde yapabileceğiniz sakin aktivitelerden dışarıda yapabileceğiniz maceralara kadar 100 farklı aktivite fikri bulabilirsiniz."
          })
        }} />
        
        {/* How-to Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Sevgilinizle Kaliteli Zaman Geçirme Yolları",
            "description": "Sevgilinizle birlikte yapabileceğiniz aktivitelerle ilişkinizi güçlendirin",
            "totalTime": "PT1H",
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "Yaratıcılık"
              },
              {
                "@type": "HowToSupply", 
                "name": "Birlikte geçirilen zaman"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Aktivite Seçimi",
                "text": "İkinizin de sevebileceği bir aktivite seçin"
              },
              {
                "@type": "HowToStep",
                "name": "Planlama",
                "text": "Aktivite için gerekli hazırlıkları yapın"
              },
              {
                "@type": "HowToStep",
                "name": "Keyif Alma",
                "text": "Anın tadını çıkarın ve birbirinizle etkileşim kurun"
              }
            ]
          })
        }} />
      </Head>

      <div className={`min-h-screen transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900' 
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
      }`}>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/5 animate-float">
            <Star className="w-6 h-6 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute top-1/3 right-1/5 animate-float animation-delay-1000">
            <Heart className="w-8 h-8 text-red-300 opacity-50" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-float animation-delay-2000">
            <Zap className="w-5 h-5 text-purple-300 opacity-70" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 pt-24">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Activity className={`w-12 h-12 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} animate-bounce`} />
              <h1 className={`text-4xl md:text-6xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  100 Aktivite
                </span>
              </h1>
              <Heart className={`w-12 h-12 ${darkMode ? 'text-pink-400' : 'text-pink-600'} animate-bounce animation-delay-500`} />
            </div>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Sevgilinle yapabileceğin muhteşem aktiviteler 🌟
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
                placeholder="Aktivite ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-transparent focus:outline-none text-lg ${
                  darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity, index) => {
              const { icon: IconComponent, color } = getRandomIcon(index);
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-xl animate-slide-up ${
                    darkMode 
                      ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                      : 'bg-white/80 border border-gray-200 hover:bg-white'
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
                    <div className={`h-full w-full rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Activity Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                        darkMode 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                          : 'bg-gradient-to-r from-indigo-400 to-purple-500'
                      }`}>
                        <IconComponent className={`w-8 h-8 text-white transition-all duration-300`} />
                      </div>
                    </div>

                    {/* Activity Name */}
                    <div className="text-center">
                      <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                        darkMode ? 'text-white group-hover:text-indigo-300' : 'text-gray-900 group-hover:text-indigo-600'
                      }`}>
                        {activity}
                      </h3>
                      
                      {/* Activity Number */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        darkMode 
                          ? 'bg-white/20 text-gray-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-300' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                      }`}>
                        #{index + 1}
                      </div>
                    </div>

                    {/* Floating Effects */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Sparkles className={`w-5 h-5 ${color} animate-pulse`} />
                    </div>
                    
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-60 transition-all duration-500">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${darkMode ? 'bg-white' : 'bg-gray-600'} animate-bounce`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredActivities.length === 0 && (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Aradığınız aktivite bulunamadı</p>
              <p className="text-sm mt-2">Farklı bir arama terimi deneyin</p>
            </div>
          )}

          {/* Bottom Info */}
          <div className={`text-center mt-16 p-6 rounded-2xl backdrop-blur-xl ${
            darkMode ? 'bg-white/10 border border-white/20' : 'bg-white/80 border border-gray-200'
          }`}>
            <Heart className={`w-8 h-8 mx-auto mb-3 ${darkMode ? 'text-red-400' : 'text-red-500'} animate-pulse`} />
            <p className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              🎯 {filteredActivities.length} eğlenceli aktivite
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Birlikte geçirilecek unutulmaz anlar için! 💕
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
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
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
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}