import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  analysis?: string;
  error?: string;
};

// Burç değerlerini Türkçe isimlere çevir
const signMap: { [key: string]: string } = {
  'aries': 'Koç',
  'taurus': 'Boğa', 
  'gemini': 'İkizler',
  'cancer': 'Yengeç',
  'leo': 'Aslan',
  'virgo': 'Başak',
  'libra': 'Terazi',
  'scorpio': 'Akrep',
  'sagittarius': 'Yay',
  'capricorn': 'Oğlak',
  'aquarius': 'Kova',
  'pisces': 'Balık'
};

// Element grupları - EKSIKSIZ VERSIYONU
const elements: { [key: string]: string } = {
  // ATEŞ BURÇLARI
  'aries': 'fire',        // Koç
  'leo': 'fire',          // Aslan  
  'sagittarius': 'fire',  // Yay

  // TOPRAK BURÇLARI
  'taurus': 'earth',      // Boğa
  'virgo': 'earth',       // Başak
  'capricorn': 'earth',   // Oğlak

  // HAVA BURÇLARI
  'gemini': 'air',        // İkizler
  'libra': 'air',         // Terazi
  'aquarius': 'air',      // Kova

  // SU BURÇLARI
  'cancer': 'water',      // Yengeç
  'scorpio': 'water',     // Akrep
  'pisces': 'water'       // Balık
};

// Veri seti - JSON dosyası yerine direkt kod içinde
const zodiacDatabase = {
  descriptions: {
   high: [
  "Bu iki burç arasında inanılmaz bir uyum var. Birbirlerinin eksiklerini tamamlamakla kalmıyor, aynı zamanda ortak hedeflere doğru birlikte ilerliyorlar. Enerjileri o kadar güçlü ki, çevrelerindeki insanlara bile ilham veriyorlar.",
  "Birlikte olduklarında adeta her şey mümkün hale geliyor. Aralarındaki bağ çok derin ve güvene dayalı. Bu çift, hayatın getirdiği zorluklarla bile kolayca başa çıkabilir.",
  "İki ruhun aynı frekansta buluşması gibi. Duygusal olarak birbirlerini mükemmel anlıyorlar ve birbirlerine her koşulda destek oluyorlar. Bu uyum, uzun soluklu bir ilişkinin temelini atıyor.",
  "Birlikte geçirdikleri zaman hem eğlenceli hem de anlamlı. Hem arkadaşlık hem de aşk boyutları güçlü olduğu için, bu çift her daim mutlu ve huzurlu hissediyor.",
  "Astrolojik açıdan oldukça uyumlu bir çift. İki taraf da birbirinin dünyasına saygı duyuyor ve destek veriyor. Bu da ilişkilerinde karşılıklı sevgi ve saygıyı sürekli canlı tutuyor.",
  "Birbirlerinin hayallerine ortak oluyorlar ve bu yolda birlikte ilerliyorlar. Birlikte olmanın verdiği güçle hayatta çok daha fazlasını başarabilecekleri kesin.",
  "Aralarındaki iletişim o kadar açık ve samimi ki, hiçbir sorun uzun süreli çatışmaya dönüşmüyor. İyi bir takım gibi çalışarak ilişkilerini her geçen gün daha da güçlendiriyorlar.",
  "Tutku ve sadakatle birbirlerine bağlılar. Bu bağlılık, onları hem birey olarak hem de çift olarak büyütüyor. İlişkileri zamanla daha da derinleşiyor.",
  "Birlikte paylaştıkları anılar, ilişkilerini daha da sağlamlaştırıyor. Zorluklar karşısında birbirlerine destek olmaları, bu çiftin en büyük gücü.",
  "Birbirlerine duydukları sevgi ve saygı, ortak yaşamlarında mükemmel bir denge yaratıyor. Bu denge, ilişkilerini sürdürülebilir ve mutlu kılıyor.",
  "Enerjileri o kadar uyumlu ki, aynı ortamda bile birbirlerinin havasını anında yakalıyorlar. Bu da ilişkilerinin temel taşı haline geliyor.",
  "Birlikte hayata bakış açıları çok benzer. Bu da uzun vadede aralarındaki uyumu pekiştiriyor ve beraber gelişmelerini sağlıyor.",
  "Her ikisi de özgürlüklerine düşkün ve birbirlerinin alanına saygı gösteriyorlar. Bu sayede aralarındaki bağ daha sağlıklı ve kalıcı oluyor.",
  "Zor zamanlarda birbirlerine sımsıkı sarılıyorlar. İlişkileri, dayanıklılık ve sabırla şekillenmiş sağlam bir bağ üzerine kurulu.",
  "Birlikte yeni şeyler keşfetmeye ve öğrenmeye çok açıklar. Bu özellikleri, ilişkilerine sürekli tazelik ve heyecan katıyor.",
  "Birbirlerinin güçlü yanlarını ortaya çıkarıyor ve zayıf yanlarında destek oluyorlar. Böylece hem bireysel hem de çift olarak büyüyorlar.",
  "Birlikte karar verirken çok uyumlu hareket ediyorlar. Ortak kararlar onların ilişkisine ayrı bir değer katıyor.",
  "Birlikteyken rahat ve özgür hissediyorlar. Bu da aralarındaki sevgi bağını güçlendiriyor.",
  "İlişkilerindeki samimiyet ve içtenlik, onları birbirine daha da bağlıyor. Böyle sağlam bir temel üzerinde her şey daha kolay ilerliyor.",
  "Aynı dili konuşuyor gibiler; duygusal ihtiyaçlarını karşılamakta hiç zorlanmıyorlar. Bu da uyumlarının en büyük göstergesi."
],

medium: [
  "Bu iki burcun arasında zaman zaman iniş çıkışlar olabilir, ama doğru iletişimle üstesinden gelmeleri mümkün. Sabırlı olmaları ve birbirlerini anlamaya çalışmaları gerekiyor.",
  "Farklılıkları bazen anlaşmazlıklara neden olabilir; ancak bu farklılıklar aynı zamanda ilişkilerini renklendiriyor. Uyum yakalamak için çaba göstermek önemli.",
  "Başlangıçta birbirlerinin düşünce dünyasına alışmakta zorlanabilirler. Ancak zamanla ortak paydalarını keşfederek ilişkilerini sağlamlaştırabilirler.",
  "Bu çiftin ilişkisi biraz emek ve sabır gerektiriyor. Eğer karşılıklı anlayışla ilerlerlerse, güzel ve kalıcı bir bağ kurabilirler.",
  "Aralarındaki farklılıklar yüzünden anlaşmazlık yaşanabilir ama önemli olan bu anlarda birbirlerine açık ve dürüst olmalarıdır. Bu tutum onları birbirine yaklaştırır.",
  "Farklı düşüncelere sahip olmalarına rağmen, ortak değerlerde buluşurlarsa harika bir takım olabilirler. Bu ilişki, uyumlu hale gelmek için zamana ihtiyaç duyuyor.",
  "Bazen görüş ayrılıkları yaşansa da, bu ikili birbirlerine verdikleri değeri ön planda tutuyor. Bu da ilişkilerini ayakta tutan en önemli etken.",
  "Ortak hedeflere ulaşmak için birlikte hareket etmeleri gerekiyor. İkisi de birbirlerinin güçlü ve zayıf yanlarını kabul etmeli, böylece uyum artar.",
  "Bu burçların ilişkisi bazen dalgalı olabilir, ama sevgi ve sabırla bu engelleri aşabilirler. Birbirlerine karşı anlayışlı oldukları sürece güzel bir yola girebilirler.",
  "Birlikte geçirecekleri kaliteli zaman, aralarındaki bağı güçlendirecektir. Ancak zaman zaman tolerans gösterme gereksinimi doğabilir.",
  "Farklı yaklaşımlar zaman zaman çatışmalara yol açsa da, bu çiftin ortak yönleri onları tekrar bir araya getiriyor. İlişki sürekli bir öğrenme süreci gibi.",
  "İkisi de ilişkide biraz daha esnek olmayı öğrenirse, uyumlu bir çift olabilirler. Empati ve hoşgörü anahtar kelimeleri olacaktır.",
  "Bu çiftin enerjileri farklı frekanslarda olabilir, ancak bu farklılıklar onların ilişkisini zenginleştiriyor. Uyum yakalamak için biraz sabır gerekiyor.",
  "İlişkide iniş çıkışlar olsa da, her iki taraf da kalıcı olma niyetindeyse zorlukların üstesinden gelebilirler.",
  "Birlikte olduklarında bazı şeyler karmaşık görünebilir ama sevgi onları bir arada tutar. Zamanla bu karmaşıklık yerini uyuma bırakabilir.",
  "Ortak noktaları bulduklarında ilişkileri oldukça sağlam olur. Ancak bu noktaya ulaşmak biraz emek ister.",
  "Bu ikilinin ilişkisi, birbirlerine gösterdikleri sabır ve anlayışla şekillenecek. Aceleci davranmadan ilerlemeleri faydalı olur.",
  "Farklı karakterlere sahip olmalarına rağmen, doğru iletişimle güçlü bir bağ kurabilirler. Bu bağ, zamanla daha da derinleşebilir.",
  "Bu çift, birlikte vakit geçirmeyi arttırarak birbirlerini daha iyi anlayabilir. Bu da ilişkilerini olumlu yönde etkiler.",
  "Birbirlerinin sınırlarına saygı göstermeleri, bu ilişkinin sürdürülebilirliğini sağlar. Bu yüzden sınır koyma konusunda hassas olmaları önemli."
],

low: [
  "Bu iki burcun doğası oldukça farklı ve aralarındaki farklar büyük zorluklar yaratabilir. Sabır ve anlayışla ilerlemek zorunda olduklarını bilmeleri gerekir.",
  "İlişkinin yürümesi için yüksek bir çaba gerekiyor. İkisi de birbirinin dünyasına tam anlamıyla uyum sağlamakta zorlanabilir.",
  "Aralarındaki iletişim sık sık kopabilir ve bu da yanlış anlaşılmalara yol açabilir. Açık ve net konuşmak çok önemli.",
  "Farklı beklentiler ve değerler zaman zaman çatışmalara sebep olabilir. Bu yüzden her iki tarafın da birbirine karşı daha esnek olması şart.",
  "Enerjileri çoğu zaman uyuşmuyor ve bu da aralarındaki bağı zayıflatıyor. Zor ama imkansız değil, ama uzun soluklu emek gerekiyor.",
  "Bu çiftin birlikte olması iniş çıkışlarla dolu olabilir. Sabırla ve karşılıklı sevgiyle zorlukların üstesinden gelmeye çalışmalılar.",
  "İlişkide sıklıkla yanlış anlaşılmalar olabilir ve bu da güvensizlik yaratabilir. İkili, güveni tekrar inşa etmek için çaba harcamalıdır.",
  "Farklı hayata bakış açıları ve beklentiler çatışmalara neden olabilir. Bu yüzden esneklik ve empati en önemli unsurlar olacaktır.",
  "İlişkinin sürdürülebilmesi için birbirlerinin sınırlarını anlamaları ve saygı göstermeleri şarttır. Aksi halde sorunlar büyüyebilir.",
  "Her iki taraf da duygusal olarak farklı seviyelerde olabilir. Bu da aralarındaki dengeyi kurmayı zorlaştırır.",
  "İletişimde yaşanacak zorluklar, ilişkiyi yıpratabilir. Sabırlı ve dikkatli olmak, bu tür zorlukları aşmada önemli bir anahtardır.",
  "Farklı karakter yapıları, ilişkiyi zaman zaman zorlaştırabilir. Ancak istek ve kararlılıkla üstesinden gelmek mümkün.",
  "Bu çiftin ilişkisinde sürekli fedakarlık gerekebilir. Bazen bu fedakarlıklar iki taraf için de yorucu olabilir.",
  "Aralarındaki uyumsuzluklar yüzünden, sık sık tartışmalar yaşanabilir. Ancak sevgi varsa, çözüm yolları da bulunabilir.",
  "İlişkinin uzun ömürlü olabilmesi için yoğun bir sabır ve hoşgörü gerekir. İki tarafın da çaba göstermesi şart.",
  "İkisi de farklı dünyalarda yaşıyor gibi hissedebilir. Bu duyguyu aşmak için çok fazla iletişim ve karşılıklı anlayış gerekir.",
  "Zaman zaman kopukluk yaşanabilir; bu yüzden sürekli olarak ilişkiye emek vermek çok önemlidir.",
  "Bu çiftin ilişkisinde güven ve sadakat konusu zaman zaman sınanabilir. Bunları sağlam tutmak için samimi iletişim şart.",
  "Farklı beklentiler ve değerler nedeniyle uyumsuzluklar büyüyebilir. Bu yüzden ortak noktaları bulmak için çaba göstermeleri gerekir.",
  "Bazen birbirlerine karşı sabırsız davranabilirler. Bu durum ilişkiye zarar verebilir, bu yüzden sakin ve anlayışlı olmak çok önemli."
]

  },
  strengths: {
   fire_fire: [
  "Sınırsız enerji ve tutku",
  "Ortak hedefler ve hırslar",
  "Spontan ve heyecan verici ilişki",
  "Birbirlerini motive etmeleri",
  "Macera dolu yaşam tarzı",
  "Güçlü fiziksel çekim",
  "Liderlik özelliklerini paylaşmaları",
  "Cesaret ve kararlılık",
  "Birlikte yeni meydan okumalar aramaları, ilişkilerini dinamik kılar.",
  "Tutkularını özgürce ifade eden, coşkulu bir çift.",
  "Süreklilik arz eden yüksek enerji, beraber büyümelerini sağlar.",
  "Birbirlerini ateşleyen rekabetçi ruh, ilişkide heyecanı artırır.",
  "Macera tutkusu sayesinde sıradanlık bu çift için yoktur.",
  "İkisi de özgür ruhlu ve cesur, hayatı dolu dolu yaşarlar.",
  "Karşılaştıkları zorluklarda yılmadan ilerleyen güçlü bir takım.",
  "Heyecan ve tutku, ilişkilerini canlı ve enerjik tutar.",
  "Liderlik vasıflarını paylaşmaları, ortak kararları hızlı almalarını sağlar.",
  "Birlikte keşfetmekten asla vazgeçmeyen, yeniliklere açık bir çift.",
  "Yoğun duygular ve hareketlilik, aralarındaki bağı daha da kuvvetlendirir.",
  "Biri diğerine daima ilham verir ve potansiyellerini ortaya çıkarır.",
  "İlişki asla monoton olmaz, çünkü sürekli yeni deneyimlere açıktırlar.",
  "Birlikte risk almayı seven, cesur ve kararlı iki ruh.",
  "Birbirlerinin cesaretinden beslenen, korkusuz bir çift.",
  "Her gün yeni bir macera için plan yaparlar ve hayatı dolu dolu yaşarlar.",
  "Tutkuları kimi zaman ateşli tartışmalara dönüşse de, bağları çok güçlüdür.",
  "Enerjileriyle çevrelerini de etkileyen, dinamik bir ikili.",
  "Hırslı yapıları sayesinde ortak başarılar elde etmeye odaklıdırlar.",
  "Birbirlerinin tutkularını desteklemekten çekinmezler.",
  "Güçlü iradeleri, zorlukları aşmalarını sağlar ve onları daha da yakınlaştırır.",
  "Hep birlikte ileriye bakarlar ve hayallerini gerçeğe dönüştürürler.",
  "Duygusal yoğunlukları bazen iniş çıkışlara yol açsa da, tutkuları onları ayakta tutar."
],

earth_earth: [
  "Güvenilir ve istikrarlı bağ",
  "Pratik ve gerçekçi yaklaşım",
  "Ortak değerler ve hedefler",
  "Mali konularda uyum",
  "Ev yaşamında huzur",
  "Uzun vadeli planlar",
  "Sadakat ve bağlılık",
  "Aile değerlerine önem",
  "Birlikte kurdukları düzen, ilişkilerini sağlam ve dayanıklı kılar.",
  "Pratik zekaları sayesinde günlük sorunları kolayca aşarlar.",
  "Güçlü bir temel üzerine inşa edilmiş, sağlam bir birliktelik.",
  "Maddi konularda birbirlerine destek olup güvence sağlarlar.",
  "Geleneksel değerleri benimseyen, köklü bir ilişki arayan çift.",
  "Birlikte ev ve aile hayatına büyük önem verirler.",
  "Uzun soluklu ilişkilerde örnek teşkil edecek kadar sağlam bağlar kurarlar.",
  "Sorumluluk bilinci yüksek, güven veren bir çift.",
  "İlişkilerinde sabır ve sebat ön plandadır, kolay kolay pes etmezler.",
  "Ortak hedefler doğrultusunda birlikte adım atma yetenekleri yüksektir.",
  "Güven ortamı yaratarak, her iki tarafın da kendini rahat hissetmesini sağlarlar.",
  "Birbirlerinin ihtiyaçlarını gözlemleyip pratik çözümler üretirler.",
  "İş ve özel hayatlarını dengeli biçimde sürdürebilen çiftlerdir.",
  "Geçmişten ders alıp, geleceğe sağlam adımlarla yürürler.",
  "Birlikte çalışmaya, yatırım yapmaya ve birikim oluşturmaya yatkındırlar.",
  "Sade ve gösterişsiz yaşam tarzı, ilişkilerinin en büyük artısıdır.",
  "Her zorlukta birbirlerine destek olan, sadık bir çift görüntüsü verirler.",
  "Duygularını ifade etmekte bazen temkinli olsalar da, bağlılıkları tamdır.",
  "Ortak bir hayat kurma ve sorumluluk alma konusunda birbirlerine güven duyarlar.",
  "Toprağın sabrı gibi, ilişkileri sağlam ve köklüdür.",
  "Zamanla birbirlerine olan güvenleri artar, bu da bağlılığı güçlendirir.",
  "Birlikte geçirilen sessiz anlarda bile huzur bulurlar.",
  "Günlük hayatın rutinini paylaşmak onlar için keyiflidir.",
  "Sabırlı ve sakin doğaları sayesinde kriz anlarını kolayca aşabilirler.",
  "Birlikte büyümeyi ve gelişmeyi önemserler, ancak bunu aceleye getirmezler.",
  "Her ikisi de güvenlik ve istikrar aradığı için, bu ilişkide denge bulunur.",
  "Birlikte atılan her adım, onların daha da sağlamlaşmasını sağlar.",
  "Ortak hayat hedefleriyle, birbirlerine sağlam bir zemin hazırlarlar."
],

air_air: [
  "Entelektüel uyum",
  "Harika iletişim",
  "Sosyal çevrede başarı",
  "Özgürlüğe saygı",
  "Yaratıcı projeler",
  "Arkadaşlık temelli ilişki",
  "Yeni fikirler üretme",
  "Sosyal adalet konularında birlik",
  "Sohbetleri asla bitmeyen, zengin bir zihinsel paylaşım içindeler.",
  "Birbirlerinin düşünce dünyasına hayran kalırlar ve yeni ufuklar açarlar.",
  "Özgürlüklerine düşkün olmalarına rağmen, aralarındaki bağ güçlüdür.",
  "Fikir alışverişi ilişkilerini canlı ve heyecanlı kılar.",
  "Yeni deneyimlere açık, meraklı ve dinamik bir çift.",
  "Birlikte yaratıcılık projeleri yapmaktan büyük keyif alırlar.",
  "Sosyal ortamlarda birbirlerine destek olur ve birlikte dikkat çekerler.",
  "Zekâları ve konuşma yetenekleri onları çevresinde saygın yapar.",
  "Sürekli öğrenmeye ve kendini geliştirmeye önem verirler.",
  "Birlikte entelektüel tartışmalar yaparken keyif alırlar ve bu bağlarını güçlendirir.",
  "Birbirlerinin özgürlüğüne saygı gösterir ve bu sayede ilişkileri sağlıklı olur.",
  "Duygusal bağları arkadaşlık temeli üzerine kuruludur ve bu uzun ömürlü kılar.",
  "İkisi de yeni fikirler ortaya koymaktan çekinmez, bu da ilişkilerini taze tutar.",
  "Sosyal adalet ve toplumsal konularda ortak duyarlılıkları vardır.",
  "Birlikte katıldıkları sosyal etkinlikler onları daha da yakınlaştırır.",
  "Çevrelerindeki insanlara pozitif enerji verir ve ilişkiyi örnek kılarlar.",
  "Özgür ruhlu ve açık fikirli olmaları, aralarındaki saygıyı artırır.",
  "Birlikte seyahat etmeyi ve farklı kültürleri keşfetmeyi severler.",
  "İletişim güçlükleri neredeyse hiç yoktur; her konuda rahatça konuşabilirler.",
  "Birlikte hayalleri üzerine planlar yapar ve bunları gerçekleştirmek için çalışırlar.",
  "Ortak ilgi alanları sayesinde, aktiviteleri hiç bitmez ve ilişkileri monoton olmaz.",
  "Yeniliklere açık yapıları, ilişkilerini sürekli canlı ve heyecanlı kılar.",
  "Zihinsel uyumları, duygusal uyumlarına da pozitif yansır ve onları dengeler.",
  "Birbirlerinin görüşlerine saygı duyar, fikir çatışmalarını yapıcı şekilde çözerler."
],

water_water: [
  "Derin duygusal bağ",
  "Sezgisel anlayış",
  "Empati ve şefkat",
  "Romantik atmosfer",
  "Maneviyat paylaşımı",
  "Birbirlerinin duygularını anlama",
  "Koruyucu yaklaşım",
  "İçsel dünyayı paylaşma",
  "Birbirlerinin ruh halini kelimeler olmadan bile anlayabilirler.",
  "Duygusal güvenlik sağladıkları için birbirlerine sonsuz bağlıdırlar.",
  "Bu çift, duygusal iniş çıkışlarda birbirine destek olmayı bilir.",
  "Romantik anılar biriktirmeye ve duygularını ifade etmeye çok önem verirler.",
  "Birlikte meditasyon ve maneviyat pratikleri yaparak bağlarını güçlendirirler.",
  "Duygularını açıkça paylaşmaları, aralarındaki güveni artırır.",
  "Birbirlerinin kırılgan yanlarına şefkatle yaklaşırlar.",
  "Duygusal ihtiyaçlarını karşılamak için ellerinden geleni yaparlar.",
  "Birlikte geçirilen sessiz ve huzurlu anlar, ilişkilerinin temelini oluşturur.",
  "Bu çift için sevgi, sadece sözlerden değil, davranışlardan da anlaşılır.",
  "Birbirlerinin iç dünyasına derinlemesine nüfuz ederek gerçek anlamda bağ kurarlar.",
  "Empati becerileri sayesinde, aralarındaki anlaşmazlıklar hızlıca çözülür.",
  "Romantik jestler ve sürprizlerle dolu bir ilişki yaşarlar.",
  "İlişkideki duygusal derinlik, onları birbirine sıkı sıkıya bağlar.",
  "Birlikte duygusal şifa ve büyüme yolculuğuna çıkarlar.",
  "Sevgi dolu ve şefkatli yaklaşımları çevrelerine de yansır.",
  "Birbirlerinin acılarını ve sevinçlerini birlikte yaşarlar.",
  "Duygusal güvenlik hissi, ilişkilerinde önceliklidir ve hiç eksilmez.",
  "Birlikte ağlamak ve gülmekten çekinmezler, bu da bağı güçlendirir.",
  "Kalplerini ve zihinlerini açık tutarak ilişkilerini sürekli beslerler.",
  "Romantizm ve derin sevgiyle dolu anılar yaratmayı severler."
],

complementary: [
  "Birbirlerini tamamlayıcı özellikler",
  "Farklı bakış açıları",
  "Birbirinden öğrenme fırsatı",
  "Dengeli yaklaşım",
  "Yeni deneyimler",
  "Kişisel gelişim",
  "Ufuk genişletme",
  "Yaratıcı çözümler",
  "Farklılıkları sayesinde birbirlerinin eksik yönlerini tamamlarlar.",
  "Bu çift, her zorlukta birbirine destek olarak güç kazanır.",
  "Birlikte yeni bakış açıları keşfeder ve hayata daha geniş perspektiften bakarlar.",
  "Birinin sabrı, diğerinin enerjisiyle mükemmel bir denge yakalar.",
  "Kişisel gelişim yolunda birbirlerini teşvik ederler ve desteklerler.",
  "Farklılıklarını avantaja çevirerek ilişkilerini zenginleştirirler.",
  "Ortak projelerde birbirlerinin yeteneklerini tamamlarlar ve başarılı olurlar.",
  "Bu çift, yeni deneyimlere birlikte atılarak birbirlerini daha iyi tanır.",
  "Birbirlerine kattıkları farklılıklar, ilişkilerini monotonluktan korur.",
  "Birlikte problem çözerken yaratıcılıklarını birleştirirler.",
  "İlişkide dengeyi sağlamak için birbirlerinin güçlü ve zayıf yönlerini anlarlar.",
  "Birlikte farklı kültürleri ve bakış açılarını keşfederek ufuklarını genişletirler.",
  "Her gün birbirinden yeni bir şey öğrenerek büyürler.",
  "Zıt özellikleri sayesinde ilişkileri dinamik ve heyecanlı kalır.",
  "Birbirlerini tamamladıkça, bireysel olarak da gelişim gösterirler.",
  "Dengeli ve uyumlu yapıları, aralarındaki çatışmaları minimize eder.",
  "Birlikte fikir ayrılıklarını saygıyla karşılayıp yapıcı çözümler bulurlar.",
  "Birbirlerine yeni beceriler öğretmekten büyük keyif alırlar.",
  "Ortaklıklarında hem tutku hem de dengeyi bulabilirler.",
  "Birlikte kurdukları hayat, her iki tarafın da güçlü yanlarını ön plana çıkarır.",
  "Farklılıkları ilişkilerine renk katar ve yeni kapılar açar.",
  "Birbirlerinin dünyasına saygı gösterip, empati ile yaklaşırlar.",
  "İkisi de değişime açık olduğu için, ilişkileri sürekli evrilir ve gelişir.",
  "Uyumlu bir çift olarak, hem eğlenceyi hem de sorumlulukları dengelerler.",
  "Birlikte yeni hedefler belirleyip, bu hedeflere adım adım ulaşırlar.",
  "Birbirlerine kattıkları pozitif enerji, ilişkiyi canlı tutar."
]

  },
  challenges: {
    fire_water: [
  "Ateş ile suyun çatışması",
  "Hız farkları",
  "Duygusal yaklaşım farkları",
  "Sabırsızlık vs hassasiyet",
  "İletişim tarzı farkları",
  "Ateş burcunun ateşli enerjisi, su burcunun sakinliğiyle sık sık ters düşebilir.",
  "Su burcunun derin duyguları, ateşin ani ve patlayıcı tepkileriyle çatışabilir.",
  "Bir taraf hızlı hareket ederken diğeri durgun kalabilir, bu da zaman zaman hayal kırıklığı yaratır.",
  "Su burcu, ateşin hareketliliğini kontrol etmeye çalışırken kendi hassasiyetini korumak zorunda kalır.",
  "İletişimde farklı yaklaşımlar, yanlış anlamalara yol açabilir ve çözüm sabır gerektirir.",
  "Ateş burcunun coşkusu, su burcunun iniş çıkışlı ruh haliyle uyumsuzluk yaratabilir.",
  "Su burcu duygularını daha derin yaşar; ateş ise daha yüzeysel ve ani hissedebilir.",
  "Bu ilişki, ateşin suyu kurutma tehlikesi ve suyun ateşi söndürme ihtimali arasında denge bulmalıdır.",
  "Sabırsız ateş, hassas suyu kırabilir; karşılıklı saygı şarttır.",
  "Su burcu bazen ateşin hızına ayak uydurmakta zorlanabilir ve bu gerginlik yaratır.",
  "Duygusal yaklaşımlarda farklılık, ortak noktalar bulunmazsa sorunları büyütür.",
  "Ateşin dışa dönük enerjisi, suyun içe dönüklüğüyle çatışabilir.",
  "Bu kombinasyonda her iki taraf da birbirinin eksik yanlarını tamamlamaya çalışır.",
  "Ateş burcu suyu harekete geçirirken, su burcu ateşi sakinleştirme rolünü üstlenir.",
  "Zıt doğaları, ilişkide iniş çıkışlara sebep olabilir, ancak sevgiyle dengelenebilir.",
  "Ateşin yoğun tutkusu, suyun şefkatiyle birleştiğinde özel bağlar kurulabilir.",
  "Her iki taraf da farklılıklara tahammül edip sabredemezse çatışmalar kaçınılmazdır.",
  "Su burcu, ateşin risk alma eğilimini dengelemek için daha temkinli davranır.",
  "İletişimde açık ve anlayışlı olmak, bu çiftin uzun süreli uyumu için şarttır.",
  "Duygusal dalgalanmalar, ateşin sabırsızlığıyla birleşince zaman zaman patlamalara neden olabilir."
],

earth_air: [
  "Pratiklik vs idealcilik",
  "Rutinler vs değişim",
  "Güvenlik vs özgürlük",
  "Gerçekçilik vs hayal kurma",
  "İstikrar vs yenilik",
  "Toprak burcu, güvenlik ararken hava burcu özgürlüğe önem verir; bu zıtlık zorluk çıkarabilir.",
  "Hava burcunun değişken yapısı, toprak burcunun sabit rutinleriyle sık sık çatışır.",
  "Pragmatik toprak burcu, hava burcunun soyut fikirlerine adapte olmakta zorlanabilir.",
  "Hava burcu, toprak burcunun planlarına karşı sabırsız davranabilir ve değişim ister.",
  "Güvenlik arayan toprak burcu, hava burcunun özgürlük arzusunu kontrol etmekte zorlanır.",
  "Bu çiftin iletişiminde farklı beklentiler sık sık çatışmalara sebep olur.",
  "Hava burcunun yenilikçi fikirleri, toprak burcunun temkinli yapısıyla gerilim yaratabilir.",
  "Toprak burcu somutluk isterken, hava burcu hayallerle yaşar; ortak nokta bulunmalı.",
  "Hava burcunun sosyallik isteği, toprak burcunun içe dönüklüğüyle uyumsuzluk yaratabilir.",
  "Toprak burcunun disiplinli yapısı, hava burcunun dağınık enerjisini zorlayabilir.",
  "Değişime açık olmayan toprak burcu, hava burcunun ani fikir değişikliklerine ayak uydurmakta zorlanabilir.",
  "Hava burcu daha entelektüel yaklaşımlar isterken, toprak burcu pratik sonuçlara odaklanır.",
  "Bu ilişki sabır ve anlayış gerektirir; çünkü her iki tarafın dünyası farklıdır.",
  "Hava burcu özgürlük istediği için toprak burcunun sınırlandırıcı tavırları kriz yaratabilir.",
  "Toprak burcu, hava burcunun uçuk kaçık hayallerine güvenmeyebilir.",
  "İki burcun da farklılıklarını kabul edip saygı göstermesi gereklidir.",
  "Hava burcu, toprak burcunun sabitliğini monoton bulabilir ve sıkılabilir.",
  "Toprak burcu, hava burcunun aşırı fikir değişikliklerine karşı eleştirel olabilir.",
  "Bu çift için denge; toprak burcunun istikrarıyla hava burcunun yenilikçiliğini birleştirmekte.",
  "Farklılıklar uyum sağlanırsa ilişkiye renk ve derinlik katar.",
  "Toprak burcu güvenliğe odaklanırken, hava burcu daha çok deneyim ve keşif peşindedir."
],

fire_earth: [
  "Hız vs temkinlilik",
  "Spontanlık vs planlama",
  "Risk alma vs güvenlik",
  "Değişim vs istikrar",
  "Hareket vs sabır",
  "Ateş burcunun ani kararları, toprak burcunun planlı yapısını zorlar.",
  "Toprak burcu, ateşin aceleci ve riskli tavırlarına karşı daha temkinlidir.",
  "Ateş burcunun enerjisi, toprak burcunun sabrını zorlayabilir ve çatışma yaratabilir.",
  "Toprak burcu değişime dirençliyken ateş sürekli yeni maceralara atılmak ister.",
  "Bu ikili arasında sürekli bir denge mücadelesi vardır; biri hızlı, diğeri ağır ilerler.",
  "Ateş burcu, toprak burcunun yavaşlığını sıkıcı bulabilir ve sabırsızlanabilir.",
  "Toprak burcu, ateşin risk alma eğilimini güvenlik açısından eleştirebilir.",
  "Spontan ateş, toprak burcunun düzen ve plan ihtiyacını bazen göz ardı eder.",
  "İlişkiyi sürdürebilmek için ateş burcunun biraz yavaşlaması gerekir.",
  "Toprak burcu, ateşin coşkusunu kontrol etmeye çalışırken kendi isteğiyle çatışabilir.",
  "Bu çift, birbirlerinin tempo ve önceliklerine saygı gösterirse uyum sağlar.",
  "Ateş burcu heyecan ararken, toprak burcu köklü ve sakin bir hayat ister.",
  "Farklı tempolar, ortak yaşamda zorluklar çıkarabilir ama üstesinden gelmek mümkündür.",
  "Ateş burcu bazen toprak burcunu fazla ağır ve durağan bulabilir.",
  "Toprak burcu ise ateşi fazla ani ve düşüncesiz bulabilir.",
  "İkisi arasında yaşanacak çatışmalar, ilişkide büyüme fırsatları da yaratır.",
  "Ateş burcu, toprak burcunun pratikliğini takdir etmeli ve sabır göstermelidir.",
  "Toprak burcu ateşin tutkusuna saygı duymalı, ancak sınır koymayı unutmamalıdır.",
  "Her iki taraf da farklılıklarını kabul edip ortak bir yol bulmalıdır.",
  "Bu ilişki, sabır, denge ve anlayış gerektiren bir yolculuktur.",
  "Farklılıklar üstesinden gelinebilirse, güçlü bir birliktelik ortaya çıkar."
],

air_water: [
  "Mantık vs duygular",
  "Sosyallik vs mahremiyet",
  "Objektiflik vs subjektiflik",
  "Değişkenlik vs derin bağlar",
  "Yüzeysellik vs derinlik",
  "Hava burcunun analitik yaklaşımı, su burcunun duygusal hassasiyetini zorlayabilir.",
  "Su burcu, hava burcunun mesafeli ve mantıklı tavrını soğuk bulabilir.",
  "Hava burcu sosyal ortamlarda aktifken su burcu daha içe dönüktür, bu durum çatışmaya neden olabilir.",
  "Su burcunun derin duygusal bağ arayışı, hava burcunun özgürlük isteğiyle çatışabilir.",
  "Hava burcu yüzeysel gelebilir, su burcu ise derinlik arar ve bu farklılık gerilim yaratır.",
  "İki taraf da birbirini anlamak için empati ve esneklik göstermelidir.",
  "Su burcunun değişken ruh hali, hava burcunun istikrar arayışıyla zıtlık oluşturabilir.",
  "Hava burcu mantıksal açıklamalara önem verirken, su burcu sezgilerine güvenir.",
  "Sosyal ve entelektüel hava, duygusal ve içe dönük su ile uyum sağlamakta zorlanabilir.",
  "İlişkide duygular ve mantık arasında bir denge kurmak bu çift için önemlidir.",
  "Su burcu, hava burcunun düşüncelerini daha derin anlamaya çalışmalıdır.",
  "Hava burcu ise su burcunun duygusal dalgalanmalarına sabır göstermelidir.",
  "Birlikte hem zihin hem kalp dengesini yakalamaya çalışmalıdırlar.",
  "Farklı bakış açıları, doğru yönetilirse ilişkilerini zenginleştirir.",
  "İlişkide duygusal derinlik ve özgürlük ihtiyacı arasında sık sık denge arayışı olur.",
  "Su burcu, hava burcunun özgürlüğüne saygı göstermeli, onları kısıtlamamalıdır.",
  "Hava burcu ise su burcunun ihtiyaçlarına karşı daha duyarlı olmalıdır.",
  "İki burcun farklılıkları sabır ve karşılıklı anlayışla aşılabilir.",
  "Birbirlerinin dünyasına açıldıklarında güçlü bir bağ kurabilirler.",
  "Duygusal bağ ile zihinsel uyum arasında köprü kurmaları gerekir.",
  "İlişkinin sağlıklı olması için iletişimde açıklık ve samimiyet şarttır."
],

same_sign: [
  "Benzer zayıflıkların artması",
  "Ego çatışmaları",
  "Aynı hataları tekrarlama",
  "Büyüme zorluğu",
  "Tek bakış açısı",
  "Aynı burçlar benzer davranış kalıplarına sahip olduğu için sorunlar katlanabilir.",
  "Ego savaşı yaşanabilir, çünkü her iki taraf da haklı olduğunu düşünebilir.",
  "Ortak zayıflıklar, çatışmaların artmasına yol açabilir ve ilişkiyi zorlayabilir.",
  "Farklı bakış açıları eksik olduğu için sorunlar çözümsüz kalabilir.",
  "İlişki, yeni bakış açıları kazanmakta zorlanır ve büyüme engellenir.",
  "Her iki taraf da aynı ihtiyaçlara ve beklentilere sahip olduğundan uyumsuzluk ortaya çıkabilir.",
  "Aynı burçların enerjisi bazen ilişkide tekdüzeliğe ve monotonluğa neden olabilir.",
  "Taraflar, kendi perspektiflerini savunurken birbirini dinlemekte zorlanabilir.",
  "Benzer özellikler olumlu yanlar taşısa da, sorunları büyütme potansiyeli de vardır.",
  "Birbirlerine karşı sabırsız davranabilir ve çatışmalar hızla alevlenebilir.",
  "Ortak duygusal iniş çıkışlar, ilişkide iniş çıkışların artmasına yol açabilir.",
  "Benzer karakterler bazen ilişkiyi daha karmaşık hale getirebilir.",
  "Farklılıkların eksikliği, ilişkide taze enerji ve motivasyon eksikliğine sebep olur.",
  "Tarafların aynı hataları tekrarlaması, ilişkide çözümsüzlük yaratabilir.",
  "Birlikte büyüme ve değişim fırsatları sınırlı olabilir.",
  "Ego merkezli davranışlar nedeniyle uzlaşmak zorlaşabilir.",
  "Ortak noktalar değil, benzer olumsuz yönler öne çıkabilir.",
  "Bu çift, dışarıdan uyumlu görünse de içten çatışmalar yaşayabilir.",
  "Farklı perspektiflerin eksikliği ilişkide derinleşmeyi engeller.",
  "İlişkinin tazeliğini korumak için bilinçli çaba ve farklılık arayışı gereklidir.",
  "Benzer enerjiler, ilişkide tutku yerine durağanlık yaratabilir."
]

  },
  communication: [
  "Açık ve dürüst iletişim kurabilirler",
  "Birbirlerini sessizce anlayabilirler",
  "Konuşmaktan çok jest ve mimiklerle anlaşırlar",
  "Entelektüel sohbetlerde zirvede olurlar",
  "Duygusal iletişimde çok başarılılar",
  "Bazen konuşmaya gerek duymadan anlaşırlar",
  "Tartışmalardan güçlenerek çıkarlar",
  "Birbirlerini motive edici şekilde konuşurlar",
  "Derin konularda saatlerce sohbet edebilirler",
  "Şakalaşarak iletişim kurmayı severler",
  "Romantik sözlerle birbirlerini etkilerler",
  "Pratik konularda net kararlar alabilirler",
  "Sessiz kalmanın bile anlamlı olduğu bir iletişimleri vardır.",
  "Dinlemeyi ve karşı tarafın derdini anlamayı çok iyi başarırlar.",
  "Zor anlarda birbirlerine destek olabilecek kadar güçlü iletişim kurabilirler.",
  "Farklı düşünceleri tartışırken saygı sınırlarını aşmazlar.",
  "İletişimde dürüstlük ve samimiyet her zaman ön plandadır.",
  "Sözlerden çok davranışlarıyla birbirlerine mesaj verirler.",
  "Birbirlerinin duygusal ihtiyaçlarını kelimeler olmadan hissedebilirler.",
  "Konuşma sırasında göz temasları güçlüdür ve güven duygusu yaratır.",
  "Espriyle karışık iletişim, aralarındaki bağı güçlendirir.",
  "Konuşmalarında empati ve anlayış her zaman hissedilir.",
  "Küçük detayları bile hatırlayıp iletişimde kullanırlar.",
  "Zaman zaman derin ve anlamlı sohbetlerle ruhlarını beslerler.",
  "İletişimdeki samimiyet, ilişkiye güçlü bir temel oluşturur.",
  "Duygularını açıkça ifade etmekten çekinmezler.",
  "Birbirlerinin kelimelerinden çok niyetlerini anlamaya çalışırlar.",
  "Tartışmalarında bile yapıcı ve uzlaştırıcı bir tutum sergilerler.",
  "İletişimde her zaman karşı tarafın perspektifini dikkate alırlar.",
  "Birbirlerinin sınırlarına saygı duyarak iletişim kurarlar."
],

romance: [
  "Tutkulu ve ateşli bir romantizm yaşarlar",
  "Sürprizlerle dolu romantik anlar",
  "Sakin ve huzurlu romantik atmosfer",
  "Derin ve meaningful romantik bağ",
  "Maceralı ve heyecan verici romantizm",
  "Klasik ve zarif romantik yaklaşım",
  "Spontan ve beklenmedik romantik jestler",
  "Duygusal derinlikte romantik bağ",
  "Arkadaşlık temelli romantizm",
  "Koruyucu ve şefkatli romantik yaklaşım",
  "Yaratıcı ve farklı romantik fikirler",
  "İstikrarlı ve güvenli romantik ilişki",
  "Birlikte paylaşılan küçük anlar bile büyük romantizme dönüşür.",
  "Romantik sürprizleriyle birbirlerini her zaman şaşırtırlar.",
  "Birlikte geçirilen zaman, romantizmi sürekli tazeler.",
  "Duygusal ifadelerinde samimiyet ve sıcaklık ön plandadır.",
  "Aşklarını küçük notlar ve jestlerle sürekli canlı tutarlar.",
  "Birlikte dans ederken ya da müzik dinlerken romantizm doruğa çıkar.",
  "Küçük jestlerle büyük duyguları ifade etmeyi severler.",
  "Romantik anlarda göz göze gelmek onlar için bir dünya demektir.",
  "Sevgi dolu sarılmalar ve dokunuşlar ilişkilerini güçlendirir.",
  "Romantik akşam yemekleri onların vazgeçilmezidir.",
  "Birlikte hayal kurmak ve geleceği planlamak romantizmlerini besler.",
  "Ortak hobiler üzerinden kurdukları bağ, romantik enerjilerini arttırır.",
  "Birbirlerine söyledikleri tatlı sözler aralarındaki bağı derinleştirir.",
  "Romantik sürprizlerde yaratıcılık sınır tanımazlar.",
  "Sevgi dolu bakışlar, aralarındaki gizli dili oluşturur.",
  "Romantizmde gösterişten çok içtenlik önemlidir.",
  "Birlikte keşfettikleri yeni yerler romantizm dolu anılar bırakır.",
  "Birbirlerini her an özel hissettirmeyi bilirler.",
  "Romantik anlarda küçük kahkahalar ve espriler de sıkça yer alır."
],

longterm: [
  "Uzun vadede mükemmel bir eş olabilirler",
  "Zamanla daha da güçlenen bir bağ kurabilirler",
  "Birlikte yaşlanabilecek türden bir çift",
  "Aile kurmak için ideal uyum",
  "Beraber büyüyebilecek potansiyel",
  "Yaşam boyu devam edebilecek bir aşk",
  "Birbirlerini destekleyerek ilerleyebilirler",
  "Evlilik için çok uygun bir kombinasyon",
  "Çocuk sahibi olmak için harika uyum",
  "Birlikte hedeflere ulaşabilecek güç",
  "Emeklilik döneminde bile mutlu olabilirler",
  "Hayat arkadaşlığı için mükemmel",
  "Birlikte zorlukların üstesinden gelmeyi başarabilirler.",
  "Ortak değerler ve hedefler uzun vadede ilişkilerini sağlam kılar.",
  "Zamanla birbirlerine karşı sabır ve anlayışları artar.",
  "Birlikte geçirilen yıllar, bağlarını daha da derinleştirir.",
  "Aile ortamında uyum ve destek ön plandadır.",
  "Uzun vadeli planlarda ortak kararlar alırlar ve sadıktırlar.",
  "Birlikte yaşlanmak onlar için mutluluğun simgesidir.",
  "Birbirlerinin gelişimine katkı sağlarlar ve büyürler.",
  "Hayatın getirdiği değişikliklere birlikte uyum sağlayabilirler.",
  "Birlikte paylaşılan anılar, ilişkilerini daha da güçlendirir.",
  "Birlikte geçirilen zorluklar, bağlarını pekiştirir.",
  "Birbirlerine duydukları güvenle huzur dolu bir hayat yaşarlar.",
  "Uzun vadede ortak finansal ve duygusal hedeflerde anlaşırlar.",
  "Birlikte kurdukları hayat, karşılıklı saygı ve sevgi üzerine kuruludur.",
  "Zamanla aralarındaki dostluk daha da kuvvetlenir.",
  "Birlikte geçirdikleri yıllar onların en değerli hazinesidir.",
  "Yaşamın her evresinde birbirlerine destek olurlar.",
  "Birlikte emeklilik planları yapmak onlar için anlamlıdır.",
  "Geleceğe umut ve sevgiyle bakarlar."
],

advice: [
  "Birbirinizi olduğu gibi kabul edin",
  "Sabırlı olun ve acele etmeyin",
  "Düzenli olarak kaliteli zaman geçirin",
  "Birbirinizin hobilerini destekleyin",
  "Açık iletişimi hiç bırakmayın",
  "Küçük sürprizlerle ilişkinizi canlandırın",
  "Ortak hedefler belirleyin",
  "Birbirinizin ailesine saygı gösterin",
  "Geçmişi geçmişte bırakın",
  "Geleceği birlikte planlayın",
  "Birbirinizin farklılıklarını zenginlik olarak görün",
  "Romantizmi hiç kaybetmeyin",
  "Güven en önemli temel taşınız olsun",
  "Birbirinizi sürekli destekleyin",
  "Küçük kavgaları büyütmeyin",
  "Özür dilemeyi öğrenin",
  "Birbirinize zaman ayırın",
  "Ortak arkadaş çevresi edinin",
  "Seyahat etmeyi ihmal etmeyin",
  "Birlikte yeni şeyler öğrenin",
  "Anlayışlı olun, hatalarınızı büyütmeyin.",
  "Empati yaparak partnerinizin bakış açısını anlamaya çalışın.",
  "Kendi alanınıza ve partnerinize saygı gösterin.",
  "Küçük jestlerle sevgiyi ifade etmekten çekinmeyin.",
  "Eleştiri yaparken yumuşak ve yapıcı olun.",
  "Ortak problemleri birlikte çözmeye odaklanın.",
  "Birbirinizin hayallerine destek olun.",
  "Maddi konularda şeffaf ve açık olun.",
  "Önceliklerinizi ve sınırlarınızı net belirleyin.",
  "İlişkide esnek ve uyumlu olmaya çalışın.",
  "Duygularınızı açıkça ifade etmekten korkmayın.",
  "Birlikte gülmeyi ve eğlenmeyi ihmal etmeyin.",
  "Güven ve sadakati asla ihmal etmeyin.",
  "Zaman zaman birbirinize küçük hediyeler alın.",
  "İletişimde pasif agresif davranışlardan kaçının.",
  "Kriz anlarında sakin kalmaya çalışın.",
  "İlişkinizi öncelikli tutup ona yatırım yapın."
]

};

const compatibilityScores: { [key: string]: { [key: string]: number[] } } = {
  'aries': {
    'aries': [88, 85, 90, 87, 92, 89, 91, 86, 93, 84],
    'taurus': [65, 68, 62, 70, 63, 66, 64, 69, 67, 61],
    'gemini': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'cancer': [58, 62, 55, 60, 65, 57, 61, 59, 63, 56],
    'leo': [95, 92, 88, 90, 93, 94, 91, 89, 96, 90],
    'virgo': [60, 58, 63, 65, 62, 59, 61, 64, 57, 63],
    'libra': [78, 75, 80, 82, 77, 79, 76, 81, 74, 80],
    'scorpio': [80, 85, 78, 83, 87, 82, 84, 79, 86, 81],
    'sagittarius': [92, 95, 90, 88, 93, 91, 94, 89, 96, 90],
    'capricorn': [65, 68, 62, 67, 70, 64, 69, 63, 66, 61],
    'aquarius': [85, 82, 88, 87, 85, 84, 83, 89, 86, 88],
    'pisces': [68, 65, 70, 72, 67, 69, 66, 71, 64, 70]
  },
  'taurus': {
    'aries': [65, 68, 62, 70, 63, 66, 64, 69, 67, 61],
    'taurus': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'gemini': [62, 58, 65, 68, 60, 61, 59, 66, 57, 64],
    'cancer': [88, 92, 85, 90, 87, 89, 91, 86, 93, 84],
    'leo': [70, 68, 73, 75, 72, 71, 69, 74, 67, 73],
    'virgo': [92, 88, 95, 90, 93, 91, 89, 94, 87, 95],
    'libra': [75, 78, 72, 77, 80, 76, 79, 73, 78, 74],
    'scorpio': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'sagittarius': [58, 62, 55, 60, 65, 57, 61, 59, 63, 56],
    'capricorn': [90, 92, 88, 93, 87, 91, 94, 89, 95, 86],
    'aquarius': [65, 62, 68, 70, 67, 64, 63, 69, 61, 68],
    'pisces': [82, 85, 78, 80, 83, 81, 84, 79, 86, 77]
  },
  'gemini': {
    'aries': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'taurus': [62, 58, 65, 68, 60, 61, 59, 66, 57, 64],
    'gemini': [78, 82, 75, 80, 85, 79, 83, 76, 84, 77],
    'cancer': [55, 58, 52, 60, 57, 54, 59, 53, 61, 56],
    'leo': [88, 85, 91, 89, 86, 90, 87, 92, 84, 88],
    'virgo': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'libra': [92, 89, 95, 90, 87, 93, 88, 94, 86, 91],
    'scorpio': [65, 62, 68, 70, 67, 64, 63, 69, 61, 66],
    'sagittarius': [87, 90, 84, 88, 91, 85, 89, 83, 92, 86],
    'capricorn': [60, 57, 63, 65, 62, 59, 58, 64, 56, 61],
    'aquarius': [95, 92, 88, 93, 90, 94, 91, 89, 96, 87],
    'pisces': [70, 67, 73, 75, 72, 71, 68, 74, 66, 72]
  },
  'cancer': {
    'aries': [58, 62, 55, 60, 65, 57, 61, 59, 63, 56],
    'taurus': [88, 92, 85, 90, 87, 89, 91, 86, 93, 84],
    'gemini': [55, 58, 52, 60, 57, 54, 59, 53, 61, 56],
    'cancer': [82, 85, 78, 87, 84, 81, 86, 79, 88, 83],
    'leo': [72, 68, 75, 77, 74, 73, 69, 76, 67, 75],
    'virgo': [78, 75, 81, 83, 80, 79, 76, 82, 74, 80],
    'libra': [65, 62, 68, 70, 67, 64, 63, 69, 61, 66],
    'scorpio': [95, 92, 88, 93, 90, 94, 91, 89, 96, 87],
    'sagittarius': [55, 52, 58, 60, 57, 54, 53, 59, 51, 56],
    'capricorn': [75, 78, 72, 77, 80, 76, 79, 73, 81, 74],
    'aquarius': [62, 58, 65, 67, 64, 61, 59, 66, 57, 63],
    'pisces': [92, 89, 95, 90, 87, 93, 88, 94, 86, 91]
  },
  'leo': {
    'aries': [95, 92, 88, 90, 93, 94, 91, 89, 96, 90],
    'taurus': [70, 68, 73, 75, 72, 71, 69, 74, 67, 73],
    'gemini': [88, 85, 91, 89, 86, 90, 87, 92, 84, 88],
    'cancer': [72, 68, 75, 77, 74, 73, 69, 76, 67, 75],
    'leo': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'virgo': [65, 62, 68, 70, 67, 64, 63, 69, 61, 66],
    'libra': [82, 79, 85, 87, 84, 83, 80, 86, 78, 84],
    'scorpio': [78, 75, 81, 83, 80, 79, 76, 82, 74, 80],
    'sagittarius': [93, 90, 96, 88, 91, 94, 89, 95, 87, 92],
    'capricorn': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'aquarius': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87],
    'pisces': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74]
  },
  'virgo': {
    'aries': [60, 58, 63, 65, 62, 59, 61, 64, 57, 63],
    'taurus': [92, 88, 95, 90, 93, 91, 89, 94, 87, 95],
    'gemini': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'cancer': [78, 75, 81, 83, 80, 79, 76, 82, 74, 80],
    'leo': [65, 62, 68, 70, 67, 64, 63, 69, 61, 66],
    'virgo': [88, 85, 91, 89, 86, 90, 87, 92, 84, 88],
    'libra': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'scorpio': [82, 79, 85, 87, 84, 83, 80, 86, 78, 84],
    'sagittarius': [58, 55, 61, 63, 60, 57, 56, 62, 54, 59],
    'capricorn': [95, 92, 88, 93, 90, 94, 91, 89, 96, 87],
    'aquarius': [70, 67, 73, 75, 72, 71, 68, 74, 66, 72],
    'pisces': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87]
  },
  'libra': {
    'aries': [78, 75, 80, 82, 77, 79, 76, 81, 74, 80],
    'taurus': [75, 78, 72, 77, 80, 76, 79, 73, 78, 74],
    'gemini': [92, 89, 95, 90, 87, 93, 88, 94, 86, 91],
    'cancer': [65, 62, 68, 70, 67, 64, 63, 69, 61, 66],
    'leo': [82, 79, 85, 87, 84, 83, 80, 86, 78, 84],
    'virgo': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'libra': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'scorpio': [70, 67, 73, 75, 72, 71, 68, 74, 66, 72],
    'sagittarius': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87],
    'capricorn': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'aquarius': [93, 90, 96, 88, 91, 94, 89, 95, 87, 92],
    'pisces': [75, 72, 78, 80, 77, 76, 73, 79, 71, 77]
  },
  'scorpio': {
    'aries': [80, 85, 78, 83, 87, 82, 84, 79, 86, 81],
    'taurus': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'gemini': [65, 62, 68, 70, 67, 64, 63, 69, 61, 66],
    'cancer': [95, 92, 88, 93, 90, 94, 91, 89, 96, 87],
    'leo': [78, 75, 81, 83, 80, 79, 76, 82, 74, 80],
    'virgo': [82, 79, 85, 87, 84, 83, 80, 86, 78, 84],
    'libra': [70, 67, 73, 75, 72, 71, 68, 74, 66, 72],
    'scorpio': [88, 85, 91, 89, 86, 90, 87, 92, 84, 88],
    'sagittarius': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'capricorn': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87],
    'aquarius': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'pisces': [93, 90, 96, 88, 91, 94, 89, 95, 87, 92]
  },
  'sagittarius': {
    'aries': [92, 95, 90, 88, 93, 91, 94, 89, 96, 90],
    'taurus': [58, 62, 55, 60, 65, 57, 61, 59, 63, 56],
    'gemini': [87, 90, 84, 88, 91, 85, 89, 83, 92, 86],
    'cancer': [55, 52, 58, 60, 57, 54, 53, 59, 51, 56],
    'leo': [93, 90, 96, 88, 91, 94, 89, 95, 87, 92],
    'virgo': [58, 55, 61, 63, 60, 57, 56, 62, 54, 59],
    'libra': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87],
    'scorpio': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'sagittarius': [90, 87, 93, 95, 92, 91, 88, 94, 86, 93],
    'capricorn': [62, 58, 65, 67, 64, 61, 59, 66, 57, 63],
    'aquarius': [88, 85, 91, 89, 86, 90, 87, 92, 84, 88],
    'pisces': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70]
  },
  'capricorn': {
    'aries': [65, 68, 62, 67, 70, 64, 69, 63, 66, 61],
    'taurus': [90, 92, 88, 93, 87, 91, 94, 89, 95, 86],
    'gemini': [60, 57, 63, 65, 62, 59, 58, 64, 56, 61],
    'cancer': [75, 78, 72, 77, 80, 76, 79, 73, 81, 74],
    'leo': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'virgo': [95, 92, 88, 93, 90, 94, 91, 89, 96, 87],
    'libra': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'scorpio': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87],
    'sagittarius': [62, 58, 65, 67, 64, 61, 59, 66, 57, 63],
    'capricorn': [92, 89, 95, 90, 87, 93, 88, 94, 86, 91],
    'aquarius': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'pisces': [78, 75, 81, 83, 80, 79, 76, 82, 74, 80]
  },
  'aquarius': {
    'aries': [85, 82, 88, 87, 85, 84, 83, 89, 86, 88],
    'taurus': [65, 62, 68, 70, 67, 64, 63, 69, 61, 68],
    'gemini': [95, 92, 88, 93, 90, 94, 91, 89, 96, 87],
    'cancer': [62, 58, 65, 67, 64, 61, 59, 66, 57, 63],
    'leo': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87],
    'virgo': [70, 67, 73, 75, 72, 71, 68, 74, 66, 72],
    'libra': [93, 90, 96, 88, 91, 94, 89, 95, 87, 92],
    'scorpio': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'sagittarius': [88, 85, 91, 89, 86, 90, 87, 92, 84, 88],
    'capricorn': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'aquarius': [85, 88, 82, 87, 90, 84, 89, 86, 83, 88],
    'pisces': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74]
  },
  'pisces': {
    'aries': [68, 65, 70, 72, 67, 69, 66, 71, 64, 70],
    'taurus': [82, 85, 78, 80, 83, 81, 84, 79, 86, 77],
    'gemini': [70, 67, 73, 75, 72, 71, 68, 74, 66, 72],
    'cancer': [92, 89, 95, 90, 87, 93, 88, 94, 86, 91],
    'leo': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'virgo': [85, 82, 88, 90, 87, 86, 83, 89, 81, 87],
    'libra': [75, 72, 78, 80, 77, 76, 73, 79, 71, 77],
    'scorpio': [93, 90, 96, 88, 91, 94, 89, 95, 87, 92],
    'sagittarius': [68, 65, 71, 73, 70, 69, 66, 72, 64, 70],
    'capricorn': [78, 75, 81, 83, 80, 79, 76, 82, 74, 80],
    'aquarius': [72, 69, 75, 77, 74, 73, 70, 76, 68, 74],
    'pisces': [88, 85, 91, 89, 86, 90, 87, 92, 84, 88]
  }
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getCompatibilityScore(sign1: string, sign2: string): number {
  // İlk sırada ara
  if (compatibilityScores[sign1] && compatibilityScores[sign1][sign2]) {
    return getRandomItem(compatibilityScores[sign1][sign2]);
  }
  
  // Ters sırada ara
  if (compatibilityScores[sign2] && compatibilityScores[sign2][sign1]) {
    return getRandomItem(compatibilityScores[sign2][sign1]);
  }
  
  // Fallback - element uyumuna göre
  const element1 = elements[sign1];
  const element2 = elements[sign2];
  
  if (element1 === element2) {
    return Math.floor(Math.random() * 20) + 75; // 75-95
  } else if (
    (element1 === 'fire' && element2 === 'air') ||
    (element1 === 'air' && element2 === 'fire') ||
    (element1 === 'earth' && element2 === 'water') ||
    (element1 === 'water' && element2 === 'earth')
  ) {
    return Math.floor(Math.random() * 25) + 65; // 65-90
  } else {
    return Math.floor(Math.random() * 30) + 55; // 55-85
  }
}

function getStrengths(sign1: string, sign2: string): string[] {
  const element1 = elements[sign1];
  const element2 = elements[sign2];
  
  let strengthType = 'complementary';
  
  if (element1 === element2) {
    strengthType = `${element1}_${element1}`;
  }
  
  const availableStrengths = zodiacDatabase.strengths[strengthType as keyof typeof zodiacDatabase.strengths] || zodiacDatabase.strengths.complementary;
  
  // 3-4 güçlü yön seç
  const selected = [];
  const shuffled = [...availableStrengths].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < Math.min(4, shuffled.length); i++) {
    selected.push(shuffled[i]);
  }
  
  return selected;
}

function getChallenges(sign1: string, sign2: string): string[] {
  const element1 = elements[sign1];
  const element2 = elements[sign2];
  
  let challengeType = 'same_sign';
  
  if (element1 !== element2) {
    if ((element1 === 'fire' && element2 === 'water') || (element1 === 'water' && element2 === 'fire')) {
      challengeType = 'fire_water';
    } else if ((element1 === 'earth' && element2 === 'air') || (element1 === 'air' && element2 === 'earth')) {
      challengeType = 'earth_air';
    } else if ((element1 === 'fire' && element2 === 'earth') || (element1 === 'earth' && element2 === 'fire')) {
      challengeType = 'fire_earth';
    } else if ((element1 === 'air' && element2 === 'water') || (element1 === 'water' && element2 === 'air')) {
      challengeType = 'air_water';
    }
  }
  
  const availableChallenges = zodiacDatabase.challenges[challengeType as keyof typeof zodiacDatabase.challenges] || zodiacDatabase.challenges.same_sign;
  
  // 3-4 zorluk seç
  const selected = [];
  const shuffled = [...availableChallenges].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < Math.min(4, shuffled.length); i++) {
    selected.push(shuffled[i]);
  }
  
  return selected;
}

function generateAnalysis(femaleSign: string, maleSign: string): string {
  const score = getCompatibilityScore(femaleSign, maleSign);
  const femaleSignTr = signMap[femaleSign];
  const maleSignTr = signMap[maleSign];
  
  // Skor seviyesine göre açıklama seç
  let descriptionType = 'medium';
  if (score >= 85) descriptionType = 'high';
  else if (score < 70) descriptionType = 'low';
  
  const description = getRandomItem(zodiacDatabase.descriptions[descriptionType as keyof typeof zodiacDatabase.descriptions]);
  const strengths = getStrengths(femaleSign, maleSign);
  const challenges = getChallenges(femaleSign, maleSign);
  const communication = getRandomItem(zodiacDatabase.communication);
  const romance = getRandomItem(zodiacDatabase.romance);
  const longterm = getRandomItem(zodiacDatabase.longterm);
  
  // Yeni kategoriler için rastgele içerik
 const sexualChemistry = getRandomItem([
  "Fiziksel çekim yüksek seviyede, tutkulu anlar yaşayabilirler",
  "Fiziksel uyum orta seviyede, zamanla gelişebilir",
  "Fiziksel uyum için anlayış ve sabır gerekiyor",
  "Çok güçlü bir fiziksel çekim ve kimya var",
  "Cinsel uyum excellent seviyede, birbirlerini tatmin ediyorlar",
  "Aralarındaki enerji kıvılcımlar saçıyor, tutkulu bir bağ var.",
  "Beden dilleri uyumlu, dokunuşlarda sevgi hissediliyor.",
  "Fiziksel yakınlık onlar için doğal ve rahat.",
  "Tutku bazen yüksek, bazen sakin ama hep gerçek.",
  "Cinsel anlamda birbirlerini keşfetmeye açık ve istekli.",
  "Aşk hayatlarında dengeyi bulduklarında uyumları artar.",
  "Fiziksel çekim bazen iniş çıkışlı, ama sevgiyle telafi ediyorlar.",
  "Birbirlerinin sınırlarına saygı göstererek uyum sağlıyorlar.",
  "Kimyaları yoğun ve çoğu zaman büyüleyici bir yakınlık yaratıyor.",
  "Aralarındaki tutku, ilişkilerini canlı tutan önemli bir unsur.",
  "Fiziksel temaslar güçlü ve duygusal bağlarla destekleniyor.",
  "Birlikte yeni deneyimler keşfetmeye açıktırlar.",
  "Cinsel uyumları, duygusal bağlarına paralel gelişiyor.",
  "Sevgi dolu dokunuşlar ve samimi anlar ilişkilerini güçlendiriyor.",
  "Tutkulu ve romantik anlarda birbirlerini tamamlıyorlar.",
  "Fiziksel enerji zaman zaman yüksek, bazen sakin ve huzurlu.",
  "Duygusal yakınlıkları fiziksel uyumu destekliyor.",
  "Her anı birlikte paylaşmak isterler, aralarındaki kimya güçlü.",
  "Tutkulu anlarda birbirlerini dinlemeyi ve anlamayı başarıyorlar.",
  "Fiziksel çekimleri doğal ve karşılıklı olarak besleniyor.",
  "Aralarındaki fiziksel bağ, duygusal bağlılığı güçlendiriyor.",
  "Samimiyet ve sevgi dolu yaklaşımlar, uyumlarını artırıyor.",
  "Fiziksel anlamda birbirlerini tamamlayan uyumlu bir çift.",
  "Fiziksel yakınlıkta zaman zaman heyecanlı, zaman zaman da huzurlular.",
  "İlişkilerinde tutku, saygı ve anlayış dengede tutuluyor."
]);

const financialHarmony = getRandomItem([
  "Para konusunda benzer görüşlere sahipler",
  "Mali konularda farklı yaklaşımları var, tartışabilirler",
  "Bütçe yönetiminde uyumlu hareket edebilirler",
  "Harcama alışkanlıkları farklı olabilir",
  "Yatırım konularında ortak kararlar alabilirler",
  "Maddi konularda açık ve net iletişim kuruyorlar.",
  "Harcamaları konusunda uzlaşma sağlamayı başarıyorlar.",
  "Gelecek için birikim yapma konusunda motive edici bir çift.",
  "Finansal sorumlulukları paylaşmada dengeliler.",
  "Para yönetiminde bazen fikir ayrılıkları olsa da çözüm odaklılar.",
  "Ortak bütçe planlaması ile mali disiplin sağlıyorlar.",
  "Maddi konularda güven ve şeffaflık öncelik taşıyor.",
  "Bütçeyi birlikte planlayarak finansal huzuru yakalıyorlar.",
  "Kredi, borç gibi konularda birbirlerine destek oluyorlar.",
  "Ekonomik hedefler konusunda uyumlu ve tutkulular.",
  "Para konularında sabırlı davranıp fikir ayrılıklarını aşabiliyorlar.",
  "Harcamalarda karşılıklı saygı ve anlayış hakim.",
  "Maddi sıkıntılarda birlikte çözüm arayan güçlü bir ekip.",
  "Finansal kararlar ortak alınarak istikrar sağlanıyor.",
  "Para yönetiminde farklılıklarını tamamlayıcı şekilde kullanıyorlar.",
  "Birbirlerinin maddi alışkanlıklarına saygı gösteriyorlar.",
  "Ekonomik konularda esnek ve anlayışlı bir tutum sergiliyorlar.",
  "Finansal hedeflere ulaşmak için ortak stratejiler geliştiriyorlar.",
  "Para yönetiminde karşılıklı destek ve güven önemli rol oynuyor.",
  "Harcamalarını dengeli yaparak uzun vadeli planlar yapıyorlar.",
  "Birlikte mali hedeflerini gerçekleştirmek için çalışıyorlar.",
  "Ekonomik açıdan birbirlerini motive eden pozitif bir çift.",
  "Finansal streslere karşı birlikte dayanıklı duruyorlar.",
  "Para yönetimi konusundaki farklılıkları çözme konusunda kararlılar.",
  "Birlikte finansal başarıya ulaşmak için uyum içindeler."
]);

const familyPlanning = getRandomItem([
  "Çocuk sahibi olmak konusunda hemfikirler",
  "Aile kurma konusunda farklı görüşleri olabilir",
  "Çocuk yetiştirme tarzları uyumlu",
  "Ebeveynlik rollerini güzel paylaşabilirler",
  "Aile planlaması konusunda açık konuşmalıdırlar",
  "Gelecekleri için çocuk sahibi olmayı planlıyorlar.",
  "Çocuk büyütmede sabır ve anlayışla hareket ediyorlar.",
  "Ebeveynlik konusunda birbirlerini destekliyorlar.",
  "Aile değerlerine saygı ve sevgi ile yaklaşıyorlar.",
  "Çocuklar için ortak vizyon ve eğitim planları yapıyorlar.",
  "Aile planlamasında kararlı ve bilinçli adımlar atıyorlar.",
  "Çocuk sahibi olmadan önce tüm detayları konuşmayı tercih ediyorlar.",
  "Farklı aile yapıları konusunda hoşgörülü ve esnektirler.",
  "Ebeveynlik rollerini dengeli ve eşit paylaşıyorlar.",
  "Çocukların gelişimi için birlikte öğrenmeye açıktırlar.",
  "Aile planlamasında zamanlama konusunda uyumlu davranıyorlar.",
  "Gelecekteki aile hayatları için birlikte hedefler koyuyorlar.",
  "Aile büyüklüğü konusunda farklı düşünceler olsa da iletişim güçlü.",
  "Çocuk eğitimi ve disiplin anlayışlarında ortak noktalar buluyorlar.",
  "Aile içi sorumlulukları paylaşmada uyumlular.",
  "Ebeveynlikte karşılıklı saygı ve destek öncelikli.",
  "Çocuklar için sevgi dolu bir ortam yaratmaya çalışıyorlar.",
  "Aile ilişkilerinde açık iletişim ve sevgi hakim.",
  "Gelecek nesiller için birlikte plan yapmaktan mutlular.",
  "Çocuk sahibi olma konusunda aceleci değiller, zamanla karar verebilirler.",
  "Aile planlaması konusunda esneklik ve anlayış gösteriyorlar.",
  "Çocukların ihtiyaçlarını birlikte karşılamaya çalışıyorlar.",
  "Aile hayatını huzurlu ve dengeli tutmayı amaçlıyorlar.",
  "Birlikte aile değerlerini yaşatmaya önem veriyorlar.",
  "Ebeveynlikte karşılaşılan zorlukları birlikte aşmayı başarıyorlar."
]);

const commonGoals = getRandomItem([
  "Hayat hedefleri benzerlik gösteriyor",
  "Farklı hedefleri var ama destekleyici davranabilirler",
  "Ortak projeler geliştirmekten hoşlanırlar",
  "Birbirlerinin hedeflerine saygı duyuyorlar",
  "Gelecek planları konusunda uyumludurlar",
  "Birlikte büyümek ve gelişmek için güçlü motivasyonları var.",
  "Ortak hayaller için birlikte çalışmayı seviyorlar.",
  "Farklılıklarına rağmen birbirlerini destekliyorlar.",
  "Uzun vadeli planlarda birbirlerinin fikirlerine önem veriyorlar.",
  "Geleceğe dair umut ve planları paralel ilerliyor.",
  "Ortak ilgi alanlarında işbirliği yapmaktan keyif alıyorlar.",
  "Hedeflerine ulaşmak için motivasyonlarını paylaşıyorlar.",
  "Birlikte zorlukların üstesinden gelmek için plan yapıyorlar.",
  "Başarıyı birlikte kutlamayı seviyorlar.",
  "Farklı düşünseler bile ortak paydada buluşabiliyorlar.",
  "Ortak gelecek tasarımlarında birbirlerini tamamlıyorlar.",
  "Hedeflerine ulaşmak için birbirlerine güveniyorlar.",
  "Uzun vadede kariyer ve yaşam planlarında uyumlu hareket ediyorlar.",
  "Birlikte yeni hedefler koyup uygulamaya koyuluyorlar.",
  "Ortak amaçlar için enerji ve zamanlarını paylaşıyorlar.",
  "Hedeflerinde esnek olup gerektiğinde birbirlerine destek oluyorlar.",
  "Birlikte büyümek ve gelişmek için güçlü bir bağları var.",
  "Ortak planlar yaparken iletişimleri her zaman açık ve net.",
  "Geleceğe dair umut ve heyecanla planlar yapıyorlar.",
  "Ortak projelerde yaratıcı ve yenilikçi yaklaşımlar sergiliyorlar.",
  "Hedeflerine ulaşmada birbirlerine ilham veriyorlar.",
  "Farklı fikirlerden beslenerek ortak başarılar elde ediyorlar.",
  "Birlikte plan yapmanın keyfini çıkarıyorlar.",
  "Ortak değerler ve hedefler ilişkilerini güçlendiriyor."
]);

const conflictResolution = getRandomItem([
  "Kavgaları hızlı çözmeyi başarırlar",
  "Tartışmalarda yapıcı olmaya çalışırlar",
  "Çatışma çözümünde sabır göstermeleri gerekiyor",
  "Sorunları konuşarak çözmeyi tercih ederler",
  "Anlaşmazlıklarda uzlaşmacı yaklaşım sergilerler",
  "Çatışmalarda sakin kalıp birbirlerini dinlemeye önem verirler.",
  "Tartışmalarda empati ile yaklaşarak sorunları büyütmezler.",
  "Zor anlarda bile birbirine saygılı kalmayı başarırlar.",
  "Fikir ayrılıklarını birlikte çözmek için çaba harcarlar.",
  "Konuşarak anlaşmaya varmak önceliklerindendir.",
  "Kriz anlarında soğukkanlılıklarını koruyarak adım atarlar.",
  "Tartışmalar sonrası birbirlerinden özür dilemekten çekinmezler.",
  "Farklı bakış açılarına hoşgörü ile yaklaşırlar.",
  "Sorun çözme süreçlerinde sabırlı ve yapıcıdırlar.",
  "Çatışmaları kişisel algılamadan yapıcı çözümler üretirler.",
  "Birbirlerini anlamaya çalışmak konusunda istekli ve açıktırlar.",
  "Küçük tartışmaları büyütmeyip barışı önceleyen bir tutumları var.",
  "Farklılıkları kabul ederek birlikte ilerlemeyi başarırlar.",
  "Sorunları ertelemek yerine yüzleşmeyi tercih ederler.",
  "Birlikte çözüm ararken karşılıklı saygıyı korurlar.",
  "Anlaşmazlıkları yapıcı ve saygılı şekilde ele alırlar.",
  "Konuşmadan önce düşünerek hareket etmeyi tercih ederler.",
  "Sorunların altında yatan gerçek nedenleri birlikte bulurlar.",
  "Empati ve anlayış ile birbirlerine yaklaşırlar.",
  "Çatışmaları duygusal değil, mantıksal zeminde çözmeye çalışırlar.",
  "Krizleri büyütmeden çözmeye odaklanırlar.",
  "Her iki tarafın da ihtiyaçlarını dikkate alarak hareket ederler.",
  "Çözüm odaklı yaklaşımları, ilişkilerini sağlam tutar.",
  "Kavgadan sonra bile birbirlerine sevgi ve saygı gösterirler."
]);

const socialLife = getRandomItem([
  "Sosyal çevrelerinde uyumlu davranırlar",
  "Arkadaş grupları birbirini tamamlıyor",
  "Sosyal aktivitelerde birlikte keyif alırlar",
  "Farklı sosyal tercihleri olabilir",
  "Birlikte yeni arkadaşlıklar kurabilirler",
  "Ortak sosyal etkinliklerde aktif rol almayı seviyorlar.",
  "Sosyal yaşamlarında birbirlerinin alanlarına saygı gösterirler.",
  "Yeni insanlarla tanışmayı birlikte keşfetmekten keyif alırlar.",
  "Arkadaş çevresinde uyum ve dengeyi korurlar.",
  "Sosyal ortamlarda destekleyici ve tamamlayıcıdırlar.",
  "Farklı sosyal ilgi alanları olsa da ortak noktalarda buluşurlar.",
  "Sosyal yaşamda birbirlerine cesaret ve motivasyon verirler.",
  "Dostluk ve sosyal bağları güçlendirmeye özen gösterirler.",
  "Birlikte organize ettikleri etkinliklerle bağlarını kuvvetlendirirler.",
  "Farklı sosyal gruplarla tanışma ve kaynaşma konusunda açıktırlar.",
  "Sosyal ortamda birbirlerinin ihtiyaçlarını göz önünde tutarlar.",
  "Arkadaşlık ilişkilerinde karşılıklı destek ön plandadır.",
  "Sosyal yaşamda birbirlerine zaman ayırmaya önem verirler.",
  "Ortak sosyal alanlarda birlikte vakit geçirmekten hoşlanırlar.",
  "Sosyal yaşamları ilişkilerine olumlu katkı sağlar.",
  "Arkadaş gruplarında uyumlu ve sevgi dolu bir çift olarak görülürler.",
  "Yeni sosyal deneyimlere birlikte açık ve heveslidirler.",
  "Sosyal etkinliklerde birlikte eğlenmeyi severler.",
  "Sosyal hayatlarında birbirlerine karşı anlayışlıdırlar.",
  "Sosyal çevrede dengeyi sağlamak için birlikte çalışırlar.",
  "Arkadaş seçimlerinde birbirlerinin fikirlerine değer verirler.",
  "Birlikte topluluk önünde güçlü ve uyumlu dururlar.",
  "Sosyal aktivitelerle ilişkilerini canlı tutmayı başarırlar.",
  "Birlikte katıldıkları etkinlikler onları daha da yakınlaştırır."
]);

const intellectualMatch = getRandomItem([
  "Entelektüel seviyede çok uyumlular",
  "Farklı konularda birbirlerini geliştirirler",
  "Derin konuşmalar yapmaktan hoşlanırlar",
  "Öğrenme tutkularını paylaşırlar",
  "Zihinsel uyarımda birbirlerini desteklerler",
  "Ortak ilgi alanlarında bilgi paylaşımında bulunurlar.",
  "Yeni fikirler üretmekte birlikte çok başarılıdırlar.",
  "Eleştirel düşünme yetenekleri birbirini tamamlar.",
  "Fikir alışverişlerinde saygılı ve açık fikirli davranırlar.",
  "Zihinsel anlamda birbirlerine ilham verirler.",
  "Kitaplar, filmler ve kültür üzerine uzun sohbetler yaparlar.",
  "Farklı bakış açılarını anlamaya ve öğrenmeye açıktırlar.",
  "Yaratıcı projelerde birlikte çalışmayı severler.",
  "Akademik ve entelektüel gelişimlerini desteklerler.",
  "Bilgi birikimlerini birbirlerine aktarmakta başarılıdırlar.",
  "Birlikte öğrenirken eğlenmeyi de ihmal etmezler.",
  "Zihinsel uyumları duygusal bağlarını da güçlendirir.",
  "Ortak hobilerle entelektüel bağlarını kuvvetlendirirler.",
  "Birbirlerinin düşüncelerine saygı duyar ve destek olurlar.",
  "Fikir ayrılıklarında bile yapıcı tartışmalar yapabilirler.",
  "Yeni bilgiler edinmek için birlikte araştırma yaparlar.",
  "Zihinsel esneklikleri ilişkilerini canlı tutar.",
  "Düşünce dünyalarında uyumlu bir çift olarak görülürler.",
  "Birlikte problem çözme becerilerini geliştirirler.",
  "Ortak amaçlar için stratejik planlar yaparlar.",
  "Bilim ve sanat gibi farklı alanlarda ortak ilgi duyabilirler.",
  "Zihinsel gelişime önem veren çiftlerden biridirler.",
  "Birbirlerine meydan okuyarak gelişmelerine destek olurlar."
]);

const hobbiesActivities = getRandomItem([
  "Ortak hobiler geliştirmekten keyif alırlar",
  "Farklı ilgi alanları var ama saygı duyarlar",
  "Beraber yeni aktiviteler denemeyi severler",
  "Serbest zamanlarını verimli geçirirler",
  "Birbirlerinin hobilerine ilgi gösterirler",
  "Hafta sonlarını ortak hobilerle değerlendirmekten hoşlanırlar.",
  "Yeni kurslara birlikte katılarak becerilerini geliştirirler.",
  "Spor, sanat veya müzik gibi alanlarda ortak aktiviteler yaparlar.",
  "Birlikte doğa yürüyüşleri veya spor yaparak enerjilerini dengelerler.",
  "Hobiler üzerinden kurdukları bağları güçlü tutarlar.",
  "Birbirlerinin ilgi alanlarını destekleyerek saygı gösterirler.",
  "Zaman zaman farklı hobilere yönelip birbirlerine yeni şeyler öğretirler.",
  "Ortak projelerde birlikte çalışarak keyif alırlar.",
  "Hobiler aracılığıyla birbirlerini daha iyi tanırlar.",
  "Yeni aktiviteler keşfedip birlikte öğrenmekten keyif alırlar.",
  "Boş zamanlarını yaratıcı ve eğlenceli şekilde değerlendirirler.",
  "Birlikte seyahat ederken yeni hobiler keşfetmeye açıktırlar.",
  "Hobi paylaşımları, ilişkilerinde sıcaklık ve heyecan katar.",
  "Ortak hobiler sayesinde iletişimleri güçlenir.",
  "Farklı zevkleri birbirine saygı göstererek dengelerler.",
  "Beraber spor salonuna gitmek veya dans etmek onlar için keyiflidir.",
  "Hobi ve aktivitelerde birbirlerine destek olurlar.",
  "Yeni deneyimler için birbirlerini teşvik ederler.",
  "Ortak hobiler aracılığıyla kaliteli zaman geçirirler.",
  "Farklı hobileri tanımak için açık ve meraklıdırlar.",
  "Birlikte yaptıkları aktiviteler, aralarındaki bağı güçlendirir.",
  "Hobi seçimlerinde karşılıklı anlayış ve saygı ön plandadır."
]);

const mutualSupport = getRandomItem([
  "Zor anlarda birbirlerini güçlü desteklerler",
  "Başarılarda birlikte sevinmeyi bilirler",
  "Birbirlerinin güçlü yanlarını öne çıkarırlar",
  "Destekleyici ve motive edici davranırlar",
  "İhtiyaç anında yanında olduklarını hissettirirler",
  "Zorluklarla karşılaştıklarında birlikte dayanıklılık gösterirler.",
  "Birbirlerinin duygusal ihtiyaçlarına duyarlıdırlar.",
  "Başarıya ulaşmak için birbirlerine ilham verirler.",
  "Kötü günlerde moral ve güç kaynağıdırlar.",
  "Birlikte çözüm üretirken birbirlerine güven verirler.",
  "Her durumda destek olmak için hazır ve isteklidirler.",
  "Birbirlerinin hatalarını affedip destek olurlar.",
  "İyi ve kötü anlarda yan yana durmayı öncelikli tutarlar.",
  "Motive edici sözlerle birbirlerinin özgüvenini artırırlar.",
  "Kriz anlarında birbirlerinin sığınacağı limandırlar.",
  "Birlikte zorlukları aşarken bağları güçlenir.",
  "Empati ile birbirlerine yaklaşır ve destek verirler.",
  "Başarıların tadını birlikte çıkararak bağlarını kuvvetlendirirler.",
  "Birlikte büyüme ve gelişme yolunda birbirlerine destek olurlar.",
  "Birbirlerine karşı anlayışlı ve sabırlı davranırlar.",
  "Zor zamanlarda umut ve cesaret aşılarlar.",
  "Duygusal ve fiziksel olarak birbirlerine destek sağlarlar.",
  "Birlikte mücadele ederken dayanışma gösterirler.",
  "Birbirlerinin ihtiyaçlarını ön planda tutarak hareket ederler.",
  "Destek ve sevgi ile birbirlerini motive ederler.",
  "Zor dönemlerde birlikte güçlü kalmayı başarırlar.",
  "Birlikte hayatın getirdiği zorlukların üstesinden gelirler.",
  "Her koşulda yan yana durmayı başaran bir çifttirler.",
  "Destekleri sayesinde daha sağlam ve huzurlu bir ilişki yaşarlar."
]);

const personalGrowth = getRandomItem([
  "Birlikte büyümeyi ve gelişmeyi başarırlar",
  "Kişisel değişimde birbirlerini desteklerler",
  "Hayat boyunca öğrenmeyi sürdürürler",
  "Birbirlerinin potansiyelini ortaya çıkarırlar",
  "Beraber evrim geçiren bir çift olabilirler",
  "Kişisel hedeflerinde birbirlerine ilham verirler.",
  "Değişim süreçlerinde yan yana durmayı başarırlar.",
  "Birlikte yeni beceriler kazanarak gelişirler.",
  "Kişisel gelişimlerini ilişkide öncelikli tutarlar.",
  "Birbirlerinin güçlü yönlerini takdir ederler.",
  "Öz farkındalıklarını birlikte artırmaya çalışırlar.",
  "Zorlukları aşarken birbirlerinden güç alırlar.",
  "Birlikte kendilerini keşfetme yolunda ilerlerler.",
  "Gelişim süreçlerinde birbirlerini cesaretlendirirler.",
  "Birlikte yaşam kalitelerini yükseltmek için çabalarlar.",
  "Kişisel dönüşümlerini destekleyerek sağlıklı ilişkiler kurarlar.",
  "Birbirlerine yeni bakış açıları kazandırırlar.",
  "Gelişim odaklı tartışmalar yapmaktan çekinmezler.",
  "Birlikte hedeflerini revize edip yenileyebilirler.",
  "Kişisel gelişimde sabır ve kararlılık gösterirler.",
  "Birlikte daha bilinçli ve farkında yaşarlar.",
  "Öz disiplin konusunda birbirlerini motive ederler.",
  "Hayata karşı ortak pozitif bakış açısı geliştirirler.",
  "Kendilerini ve ilişkilerini sürekli iyileştirmek isterler.",
  "Birlikte büyümenin verdiği mutlulukla bağlılıkları artar.",
  "Kişisel gelişim yolculuğunda destekleyici bir partnerdirler.",
  "Birlikte öğrenmenin ve gelişmenin tadını çıkarırlar."
]);

const travelAdventure = getRandomItem([
  "Seyahat etmeyi ve macera yaşamayı severler",
  "Birlikte keşfetmeyi tercih ederler",
  "Farklı seyahat tarzları olabilir",
  "Yeni yerler görmekte uyumludurlar",
  "Macera dolu anılar biriktirebilirler",
  "Gezmeyi birlikte planlayıp heyecan duyarlar.",
  "Yolculuklarda birbirlerinin ihtiyaçlarına özen gösterirler.",
  "Farklı kültürleri keşfetmeye açık ve heveslidirler.",
  "Seyahatlerde karşılaştıkları zorlukları birlikte aşarlar.",
  "Doğa ve şehir tatillerinde uyumlu bir çift oluştururlar.",
  "Birlikte macera sporlarına katılarak bağlarını güçlendirirler.",
  "Gezilerde yeni tatlar deneyip anı biriktirirler.",
  "Seyahat planlarını ortak zevklerine göre yaparlar.",
  "Yolculuk sırasında birbirlerini daha iyi tanırlar.",
  "Farklı destinasyonlarda ortak ilgi alanları bulurlar.",
  "Birlikte fotoğraf çekip anılarını ölümsüzleştirirler.",
  "Yolculuklar ilişkilerini taze tutan bir faktördür.",
  "Seyahatlerde esnek ve uyumlu hareket ederler.",
  "Birlikte yeni rotalar keşfetmekten keyif alırlar.",
  "Gezme tutkuları ilişkilerini canlı tutar.",
  "Seyahatlerde karşılıklı sabır ve anlayışla hareket ederler.",
  "Yeni maceralara birlikte atılmaktan çekinmezler.",
  "Tatil planlarını birlikte yapıp keyfini çıkarırlar.",
  "Seyahat anılarında birbirlerine duydukları sevgiyi artırırlar.",
  "Birlikte farklı iklimlerde vakit geçirmeyi severler.",
  "Yolculuklarda güven ve destek ilişkilerini güçlendirir.",
  "Birlikte keşfettikleri yerlerde bağları kuvvetlenir.",
  "Seyahat planlamasında ortak kararlar alırlar."
]);

  
  // Uzun paragraf konuları - Array'den rastgele seçim
 const detailedPsychologyOptions = [
  `İlişkilerinin temelini oluşturan psikolojik dinamik, ${femaleSignTr} burcunun duygusal yoğunluğu ile ${maleSignTr} burcunun daha mantıklı ve sistematik yaklaşımı arasındaki etkileşimdir. Bu ikili, farklı iç dünyalara sahip olmalarına rağmen, birbirlerinin zayıf noktalarını tamamlayabilecek güçtedir. ${femaleSignTr} burcunun derin duygusal yapısı, ${maleSignTr} burcunun sabır ve direnciyle dengelenirken, zaman zaman duygusal dalgalanmalar yaşanabilir. Ancak bu dalgalanmalar, ilişkinin büyümesine ve gelişmesine olanak tanır. Her iki tarafın da içsel korkuları ve savunma mekanizmaları fark edildiğinde, bu farkındalık aralarındaki bağı daha da güçlendirir. Psikolojik anlamda birbirlerine ayna tutarak, hem kendi hem de partnerlerinin gölgeleriyle yüzleşebilmeleri, uzun vadede derin ve sağlıklı bir bağ kurmalarını sağlar. Bu süreç sancılı olsa da, doğru iletişim ve empati ile aşılabilir ve sonuçta özgürleştirici bir dönüşüm gerçekleşir.`,

  `${femaleSignTr} burcunun sezgisel ve duygusal doğası ile ${maleSignTr} burcunun analitik ve mantıklı yapısı, bu çiftin psikolojik karmaşıklığını oluşturur. Duygularla mantığın çatıştığı anlarda, yanlış anlamalar ve duygusal kırgınlıklar ortaya çıkabilir. Ancak bu farklılıklar, birbirlerini tamamlamalarına da imkan sağlar. Psikolojik açıdan, her iki taraf da kendi korkularını ve geçmiş deneyimlerini partnerine yansıtarak bazen anlaşmazlık yaşayabilir. Bu nedenle, açık ve şeffaf iletişimle bilinçaltı korkuların ortaya çıkarılması kritik önem taşır. ${femaleSignTr} burcunun empati yeteneği, ${maleSignTr} burcunun karar alma süreçlerine yumuşaklık katarken, karşılıklı saygı ve sabırla bu çift, psikolojik olarak birbirlerinin gelişimine katkıda bulunabilir. Birbirlerinin farklılıklarını anlamak ve kabullenmek, ilişkinin olgunlaşması için anahtardır.`,

  `Astrolojik açıdan ${femaleSignTr} ve ${maleSignTr} burçlarının bir araya gelmesi, iki farklı psikolojik dünya arasında köprü kurma çabasıdır. ${femaleSignTr} burcunun duygusal derinliği, ${maleSignTr} burcunun mantıkla örülü dünyasıyla buluşurken, karşılıklı uyum ve çatışma anları yaşanabilir. Psikolojik olarak, her iki taraf da kendi benliklerini ve savunma mekanizmalarını sorgulamaya başlayabilir. Bu süreç, bazen zorlayıcı ve yorucu olsa da, kişisel gelişim için büyük bir fırsat sunar. Partnerlerin bilinçli farkındalıkla hareket etmesi, karşılıklı empati geliştirmesi ve sınırlarına saygı göstermesi, bu zorlu sürecin aşılmasında belirleyicidir. Bu çift, psikolojik anlamda birbirlerinin en derin yaralarını iyileştirebilecek potansiyele sahiptir.`,

  `${femaleSignTr} burcunun duygusal yoğunluğu ile ${maleSignTr} burcunun rasyonel ve kararlı yapısı arasındaki gerilim, psikolojik açıdan bir denge arayışını beraberinde getirir. Bu çift, duyguların ve düşüncelerin sürekli çarpıştığı bir ortamda, zaman zaman iletişim kopuklukları yaşayabilir. Ancak doğru yönetildiğinde, bu farklılıklar birbirlerinin gölgelerini fark etmelerine ve olgunlaşmalarına yardımcı olur. İlişkinin temelinde yer alan psikolojik güven, bu çiftin birbirlerine açılmalarını sağlar. Kendi içsel korkularıyla yüzleşirken, partnerlerinin de benzer süreçlerden geçtiğini görmek, karşılıklı anlayışı artırır. Böylece, her iki taraf da duygusal özgürlük ve zihinsel açıklık kazanarak ilişkilerini derinleştirebilir.`,

  `Psikolojik derinlik ve karmaşıklık, ${femaleSignTr} ile ${maleSignTr} burçlarının ilişkisini karakterize eder. Bu çift, birbirlerinin iç dünyalarındaki farklı renkleri keşfetmek için sabır ve cesaret göstermelidir. ${femaleSignTr} burcunun hassasiyetleri ve duygusal iniş çıkışları, ${maleSignTr} burcunun istikrarlı ve analitik tavrıyla zaman zaman çatışabilir. Ancak bu çatışmalar, psikolojik gelişim ve farkındalık için gereklidir. Partnerlerin bilinçli olarak kendi gölgeleriyle yüzleşmeleri, ilişkide yeni kapılar açar. Psikolojik uyum, karşılıklı anlayış ve empatiyle mümkün olurken, bu süreçte yaşanacak duygusal dönüşüm, çiftin bağını kalıcı ve anlamlı kılar.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının ilişkisi, iki farklı psikolojik yapı arasındaki zıtlıkların ve benzerliklerin dansıdır. Bu çift, birbirlerinin içsel dünyalarına nüfuz ederken, farkında olmadan karşılıklı olarak dönüşürler. ${femaleSignTr} burcunun yoğun duygusallığı, ${maleSignTr} burcunun mantıklı yaklaşımıyla dengelenir, ancak bu dengeyi sağlamak için sürekli bir çaba gerekir. Psikolojik açıdan, geçmiş travmaların ilişkiye yansımaması için açık iletişim şarttır. Bu çift, birlikte geçirdikleri zaman içinde, bilinçaltı kalıplarını fark edip dönüştürebilir, böylece daha sağlıklı bir ilişki modeli inşa eder.`,

  `Bu ilişkinin psikolojik yapısı, ${femaleSignTr} burcunun duygusal derinliği ile ${maleSignTr} burcunun zihinsel açıklığının karmaşık bir birleşimidir. İki taraf da kendi içsel ihtiyaçları ve korkuları doğrultusunda ilişkiye farklı yaklaşımlar sergiler. Bu durum, zaman zaman çatışmalara yol açsa da, karşılıklı empati ve anlayışla aşılabilir. ${femaleSignTr} burcunun sezgisel yaklaşımı, ${maleSignTr} burcunun analiz yeteneğiyle birleşerek, çiftin karşılaştığı sorunları çözmede yaratıcı yollar bulmasını sağlar. Psikolojik olarak bu çift, birbirlerinin duygusal dünyasına saygı gösterdikçe, daha derin ve anlamlı bir bağ kurar.`,

  `${femaleSignTr} ve ${maleSignTr} burçları arasındaki psikolojik uyum, karmaşık bir süreçtir. İlişkide yaşanan duygusal iniş çıkışlar, her iki tarafın da kendi psikolojik sınırlarını test eder. ${femaleSignTr} burcunun hassas yapısı, ${maleSignTr} burcunun sert görünen dış kabuğu ile zaman zaman çatışabilir. Ancak bu çatışmalar, bilinçli farkındalıkla dönüştürülürse, hem bireysel hem de ortak gelişim için fırsatlar yaratır. İletişimde açıklık ve duygusal samimiyet, bu çiftin psikolojik bağlarını güçlendiren en önemli faktörlerdir.`,

  `Astrolojik olarak ${femaleSignTr} ve ${maleSignTr} burçlarının birlikteliği, iki farklı psikolojik dünyanın kesiştiği bir kesit olarak değerlendirilebilir. ${femaleSignTr} burcunun duygusal derinliği ve içe dönüklüğü, ${maleSignTr} burcunun dışa dönük ve mantıklı tavrıyla bir denge arayışındadır. Bu dengeyi kurmak kolay olmasa da, her iki tarafın da kişisel gelişim yolunda cesur adımlar atması durumunda, ilişki anlamlı bir dönüşüm geçirir. Psikolojik olarak bu çift, birbirlerinin eksik yanlarını tamamlayıp, birlikte daha bütünsel bir yaşam deneyimi oluşturabilirler.`,

  `${femaleSignTr} burcunun yoğun sezgileri ve derin hisleri, ${maleSignTr} burcunun analitik ve sistematik zihniyle birleştiğinde, karmaşık fakat öğretici bir psikolojik etkileşim ortaya çıkar. Bu çift, ilişki boyunca hem kendilerini hem de partnerlerini daha iyi anlamaya çalışırken, bazen çatışmalar yaşayabilir. Ancak bu çatışmalar, bilinçli farkındalık ve açık iletişimle ele alındığında, kişisel dönüşüm ve büyüme için birer fırsat haline gelir. Psikolojik olarak birbirlerine destek oldukları sürece, güçlü ve uzun ömürlü bir bağ kurabilirler.`,

  `${femaleSignTr} ve ${maleSignTr} burçları arasındaki ilişki, derin psikolojik süreçlerin yaşandığı bir alandır. Bu çift, birbirlerinin bilinçaltı dinamiklerini fark ettikçe, aralarındaki bağ da güçlenir. ${femaleSignTr} burcunun duygusal yoğunluğu, ${maleSignTr} burcunun sabır ve mantığı ile dengelenirken, karşılıklı anlayış ilişkideki gerilimleri azaltır. Psikolojik olarak bu süreç, iki tarafın da kendi sınırlarını ve ihtiyaçlarını netleştirmesine yardımcı olur. Sonuçta, bu çift kendilerini daha iyi tanıyıp, sağlıklı bir ilişki için gerekli adımları atabilir.`,

  `Bu iki burcun birleşimi, psikolojik açıdan farklılıkların ve ortak noktaların derinlemesine incelenmesi gereken bir ilişki modeli sunar. ${femaleSignTr} burcunun hassas ve empatik doğası, ${maleSignTr} burcunun mantıklı ve sistematik yapısıyla birleştiğinde, zaman zaman çatışmalar yaşanabilir. Ancak bu çatışmalar, bilinçli bir farkındalıkla yönetildiğinde, her iki tarafın da kişisel gelişimine katkı sağlar. Bu çift, birbirlerinin psikolojik ihtiyaçlarına duyarlılık gösterdikçe, daha sağlam ve derin bir bağ kurabilirler.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının ilişkisi, psikolojik açıdan birbirlerini dönüştürücü bir etkendir. ${femaleSignTr} burcunun duygusal iniş çıkışları, ${maleSignTr} burcunun istikrarlı ve planlı yaklaşımı ile dengelenir. Bu dengenin sağlanması için her iki tarafın da sabır, anlayış ve açık iletişim içinde olması gerekir. Psikolojik olarak, bu çift kendi içsel sınırlarını keşfederken, partnerlerinin de benzer süreçlerden geçtiğini görmek, empatiyi artırır. Böylece, aralarındaki bağ daha sağlıklı ve kalıcı olur.`,

  `İki farklı psikolojik yapının buluşması olan ${femaleSignTr} ve ${maleSignTr} burçları, ilişkide sık sık içsel çatışmalarla yüzleşebilir. ${femaleSignTr} burcunun duygusal derinliği, ${maleSignTr} burcunun mantıksal yaklaşımı ile karşılaştığında, anlaşmazlıklar yaşanabilir. Ancak bu anlaşmazlıklar, bilinçli iletişim ve karşılıklı anlayışla aşılabilir. Psikolojik olarak, bu çiftin birlikte çalışması gereken en önemli konu, birbirlerinin farklılıklarına saygı göstermek ve ortak bir zemin bulmaktır. Bu sayede, ilişkide güven ve sevgi artar.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının birlikteliği, psikolojik açıdan oldukça dinamik bir yapıya sahiptir. Her iki taraf da kendi duygusal ve zihinsel kalıplarını partnerine yansıtarak, ilişkide bazı zorluklar yaşayabilir. Ancak bu zorluklar, farkındalıkla ele alındığında, hem bireysel hem de ortak gelişim için önemli fırsatlar sunar. Psikolojik uyum, açık iletişim, empati ve sabırla mümkün olurken, bu çift zaman içinde birbirlerinin ihtiyaçlarını daha iyi anlar ve karşılar.`,

  `${femaleSignTr} burcunun içsel dünyasının derinlikleri ile ${maleSignTr} burcunun analitik zihni arasında sürekli bir etkileşim vardır. Bu etkileşim, zaman zaman duygusal karmaşalara ve iletişim kopukluklarına neden olabilir. Ancak psikolojik olarak, bu çift birbirlerinin sınırlarına saygı gösterdiğinde ve açık diyalog kurduğunda, ilişkilerinde sürdürülebilir bir denge yakalayabilir. Her iki taraf da kendi duygusal ve zihinsel ihtiyaçlarını ifade etme konusunda cesur olmalıdır.`,

  `Bu ilişki, ${femaleSignTr} burcunun hassas ve empatik doğası ile ${maleSignTr} burcunun mantıklı ve disiplinli yapısının birleşmesidir. Psikolojik olarak, her iki taraf da farklı ihtiyaçlara ve beklentilere sahiptir; bu da zaman zaman çatışmalara yol açabilir. Ancak bilinçli farkındalık ve iletişim sayesinde, bu zorluklar büyüme fırsatlarına dönüşür. Bu çift, birbirlerinin psikolojik yaralarını iyileştirme ve duygusal destek sağlama kapasitesine sahiptir.`,

  `${femaleSignTr} ve ${maleSignTr} burçları arasındaki psikolojik bağ, derin bir empati ve anlayış gerektirir. İki taraf da kendi duygusal kalıplarını ve bilinçaltı korkularını partneriyle paylaşmaya istekli olduğunda, ilişki daha anlamlı hale gelir. Psikolojik olarak, bu çift birbirlerinin güçlü ve zayıf yönlerini kabul etmeli ve bu farkındalıkla hareket etmelidir. Böylece, ortak bir psikolojik zemin oluşturarak, ilişkilerini sağlam temeller üzerine kurabilirler.`,

  `${femaleSignTr} burcunun yoğun duygusal yapısı ile ${maleSignTr} burcunun mantıklı ve kararlı zihni arasındaki etkileşim, psikolojik açıdan oldukça zengin bir ortam yaratır. Bu çift, zaman zaman çatışmalar yaşasa da, bu çatışmalar onları daha derin bir anlayışa ve bağa götürür. Psikolojik uyum, karşılıklı saygı ve sabırla mümkün olurken, bu çiftin bilinçli olarak kendi iç dünyalarına ve partnerlerine dönmeleri gerekir. Bu süreç, bireysel ve ortak gelişim için fırsatlarla doludur.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının psikolojik ilişkisi, zaman zaman iniş çıkışlarla dolu olabilir. Her iki taraf da kendi duygusal ihtiyaçlarını ifade etmekte zorlanabilir; bu da iletişim kopukluklarına yol açar. Ancak, bu zorluklar farkındalıkla ele alındığında, çiftin birbirini daha iyi anlamasına ve derin bir bağ kurmasına hizmet eder. Psikolojik olarak, bu çiftin birbirlerine karşı sabır, sevgi ve empati göstermesi, ilişkinin sağlıklı ve uzun ömürlü olmasını sağlar.`
];

const detailedLifestyleOptions = [
  `Yaşam tarzı açısından bakıldığında, ${femaleSignTr} ve ${maleSignTr} burçları başlangıçta farklı ritimlere sahip olabilirler. ${femaleSignTr} burcunun sakin ve düzenli yaşam tarzı, ${maleSignTr} burcunun daha hareketli ve spontan tavrıyla karşılaştığında, bu fark ilişkiye renk katacaktır. Günlük rutinler, sosyal aktiviteler ve hobiler konusunda birbirlerine uyum sağlama süreçleri, karşılıklı sabır ve anlayışla ilerleyecektir. Özellikle ev ortamında ortak yaşam alanlarını paylaşırken, kişisel alan ihtiyaçlarına özen gösterilmesi gerekmektedir. Bu çift, farklı yaşam alışkanlıklarını birleştirip, kendi özgün ortak yaşam tarzlarını yaratma potansiyeline sahiptir.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının yaşam tarzları, farklı değer sistemleri ve önceliklerle şekillenir. ${femaleSignTr} burcunun daha geleneksel ve planlı yaklaşımı, ${maleSignTr} burcunun yenilikçi ve esnek tavrıyla dengelenebilir. Bu çift, ortak kararlar alırken bazen zorluklarla karşılaşsa da, bu zorluklar onları daha yaratıcı çözümler bulmaya iter. Sosyal çevre seçimlerinden beslenme alışkanlıklarına kadar pek çok alanda birbirlerinin perspektifini anlamaya çalışmak, ilişkiye olumlu katkılar sunacaktır. Sonuçta, bu farklılıklar, ilişkinin dinamik ve zengin kalmasını sağlar.`,

  `Günlük yaşam pratikleri ve yaşam kalitesi tercihleri, ${femaleSignTr} ve ${maleSignTr} burçları arasında uyum yakalamak için önemli bir alan oluşturur. ${femaleSignTr} burcunun rutinlerine bağlılığı, ${maleSignTr} burcunun daha özgür ruhlu ve değişime açık yapısıyla karşılaştığında, esneklik geliştirmeleri gerekebilir. Ev düzeni, temizlik alışkanlıkları ve dinlenme şekilleri gibi konularda ortak paydalar bulmak, ilişkinin sağlıklı sürmesi için gereklidir. Ayrıca, sosyal etkinliklere katılım ve seyahat tercihleri konusunda uyum sağlama çabası, çiftin birlikte geçirdikleri zamanın kalitesini artıracaktır. Bu süreçte sabır ve iletişim, tüm farklılıkların köprülenmesini kolaylaştırır.`,

  `${femaleSignTr} ve ${maleSignTr} burçları, yaşam tarzı seçimlerinde birbirlerinden öğrenebilecekleri pek çok şey barındırır. ${femaleSignTr} burcunun detaylara verdiği önem, ${maleSignTr} burcunun geniş perspektifiyle tamamlanabilir. Bu çift, ortak yaşamlarında farklı alışkanlıkları ve zevkleri keşfederken, yeni rutinler ve alışkanlıklar geliştirebilir. Finansal yönetim, zaman planlaması ve ev içi sorumlulukların paylaşımı gibi alanlarda karşılıklı uyum yakaladıklarında, yaşam kaliteleri artacaktır. Bu uyum, çiftin hayatını daha dengeli ve huzurlu hale getirir.`,

  `Yaşam tarzı açısından ${femaleSignTr} burcunun istikrarı ve disiplinli yaklaşımı, ${maleSignTr} burcunun esnekliği ve yenilikçiliğiyle birleştiğinde, dinamik ama dengeli bir yaşam alanı yaratılabilir. Bu çift, farklı yemek kültürlerini deneyimlemekten, değişik sosyal çevrelerde vakit geçirmekten hoşlanabilir. Ev ortamında kişisel alanlara gösterilen saygı, ilişkinin sağlıklı sürmesi için temel bir unsurdur. Spor, sanat ya da hobiler konusunda birbirlerine destek olmaları, ortak yaşamlarını zenginleştirecektir. Yaşam biçimleri farklı olsa da, karşılıklı anlayış ve esneklikle uyum yakalamaları mümkündür.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının yaşam tarzları, birlikte geçirdikleri süre zarfında birbirlerine uyum sağlamak adına değişime açık olabilir. ${femaleSignTr} burcunun düzen ve planlama ihtiyacı, ${maleSignTr} burcunun spontan kararlarıyla dengelenebilir. Bu süreçte, her iki taraf da kendi konfor alanlarından çıkıp yeni deneyimlere açık olmalıdır. Ev düzeni, sosyalleşme şekli ve günlük alışkanlıklar gibi alanlarda esneklik göstererek ortak bir yaşam tarzı inşa edebilirler. Uzun vadede, bu adaptasyon süreci çiftin bağlılığını ve uyumunu artıracaktır.`,

  `Yaşam kalitesi ve rutinler açısından ${femaleSignTr} burcunun seçici ve detaycı yaklaşımı, ${maleSignTr} burcunun geniş perspektifi ile dengelenir. Bu çift, sağlıklı alışkanlıklar ve sürdürülebilir yaşam prensipleri oluşturma konusunda ortak paydalar bulabilir. Günlük beslenme, uyku düzeni ve fiziksel aktivite gibi konularda benzer önceliklere sahip olmaları, yaşam kalitesini olumlu etkiler. Sosyal yaşamları ve hobi tercihleri, farklılıklar gösterse de birbirlerine saygı duydukları sürece, bu durum ilişkinin dinamik kalmasını sağlar. İlişkide karşılıklı destek ve esneklik, yaşam tarzı uyumunu kolaylaştırır.`,

  `Ev hayatı ve sosyal çevre yönetimi, ${femaleSignTr} ve ${maleSignTr} burçlarının uyum sağlaması gereken önemli alanlardandır. ${femaleSignTr} burcunun ev ortamına verdiği önem, ${maleSignTr} burcunun dışa dönüklüğüyle dengelenerek her iki tarafın da ihtiyaçlarını karşılar hale getirilebilir. Bu çift, sosyal aktiviteler ve ev içi yaşam arasında sağlıklı bir denge kurarak ortak yaşam kalitelerini yükseltebilir. Farklı sosyal çevrelerden gelen çiftler, birbirlerinin arkadaşlık ilişkilerine ve sosyal değerlerine saygı gösterdikçe, uyumları artar. Ayrıca ev düzeni ve sorumluluk paylaşımı, yaşam tarzı uyumunda kritik rol oynar.`,

  `Yaşam tarzı seçimlerinde ${femaleSignTr} burcunun istikrar arayışı, ${maleSignTr} burcunun değişken ve yenilikçi tavrıyla bir araya geldiğinde, birbirlerini dengeleme potansiyeli ortaya çıkar. Bu çift, farklı kültürel ve yaşam deneyimlerini paylaşarak kendilerini ve ilişkilerini zenginleştirebilir. Günlük rutinler, finansal alışkanlıklar ve boş zaman değerlendirme şekilleri gibi konularda uzlaşılarak ortak paydalar yaratılabilir. Esnek olmak ve karşılıklı saygı göstermek, yaşam tarzı uyumunu kolaylaştıran en önemli etkenlerdir. Böylece, çift hem bireysel hem de ortak mutluluklarını artırabilir.`,

  `${femaleSignTr} ve ${maleSignTr} burçları arasında yaşam tarzı uyumu, sabır ve karşılıklı anlayışla mümkün olur. Her iki taraf da kendi alışkanlıklarını değiştirmeye zorlamak yerine, birlikte yeni rutinler oluşturmaya odaklanmalıdır. Özellikle ev yaşamı, finansal yönetim ve sosyal aktiviteler gibi alanlarda esneklik geliştirmek, ilişkiyi güçlendirecektir. Bu çift, farklılıklarını zenginlik olarak görüp birbirlerinin yaşam tarzlarına saygı gösterdiği sürece, uzun vadeli uyum sağlamaları mümkündür. Yaşam kalitesini artıran ortak hedefler ve hobiler geliştirmek, bağlarını derinleştirecektir.`,

  `Sağlıklı bir yaşam tarzı oluşturmak için ${femaleSignTr} burcunun disiplinli ve planlı yaklaşımı, ${maleSignTr} burcunun daha esnek ve yenilikçi tavrıyla dengelenmelidir. Bu çift, beslenme alışkanlıkları, spor aktiviteleri ve stres yönetimi gibi alanlarda ortak kararlar alabilir. Evde geçirilen zamanın kalitesi, ilişkideki uyumu doğrudan etkiler; bu yüzden ortak yaşam alanlarının düzenlenmesi önemlidir. Sosyal hayat ve iş-yaşam dengesi konularında da birbirlerinin sınırlarına saygı göstermek gerekir. Böylece, birbirlerini tamamlayan bir yaşam biçimi geliştirebilirler.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının yaşam tarzı tercihleri, ilişkinin dinamik ve dengeli ilerlemesini sağlar. ${femaleSignTr} burcunun daha sakin ve düzenli yaşam isteği, ${maleSignTr} burcunun hareketli ve yenilikçi yapısıyla birleşerek zengin bir deneyim oluşturur. Bu çift, ortak hobiler ve sosyal aktiviteler aracılığıyla birbirlerine bağlanabilir. Ayrıca finansal yönetim ve gelecek planlaması gibi konularda uyum sağlamaları, yaşam kalitelerini artırır. İletişim ve esneklik, yaşam tarzı uyumunda anahtar rol oynar.`,

  `Ev yaşamı ve sosyal çevre konusunda ${femaleSignTr} burcunun geleneksel yaklaşımı ile ${maleSignTr} burcunun modern ve değişime açık tutumu, başlangıçta uyum sağlama gerektirir. Ancak zamanla bu farklılıklar, çiftin birbirinden öğrenmesine ve gelişmesine olanak tanır. Evdeki sorumlulukların paylaşılması ve sosyal çevre ile olan ilişkilerin dengelenmesi, yaşam kalitesini doğrudan etkiler. Bu süreçte karşılıklı saygı ve anlayış, ilişkinin sağlıklı ilerlemesi için şarttır. Bu çift, yaşam tarzlarını ortak bir paydada buluşturma becerisi gösterdiğinde, çok güçlü bir bağ yakalayabilir.`,

  `${femaleSignTr} ve ${maleSignTr} burçları, farklı yaşam alışkanlıkları ve değerleri olsa da, bunları bir araya getirip kendi benzersiz yaşam tarzlarını oluşturabilir. ${femaleSignTr} burcunun disiplinli ve sistematik yaklaşımı, ${maleSignTr} burcunun esnek ve maceracı ruhuyla dengelenir. Bu denge, çiftin ortak yaşam alanlarında huzur ve mutluluk yaratmasını sağlar. Ayrıca günlük rutinler, beslenme, sosyal hayat ve boş zaman aktivitelerinde ortak noktalar bulmaları, ilişkiye derinlik katar. Bu uyum süreci, sabır ve karşılıklı destekle güçlenir.`,

  `Yaşam tarzı uyumu, ${femaleSignTr} ve ${maleSignTr} burçları arasında sabır ve anlayış gerektirir. Her iki tarafın da kendi alışkanlıklarını değiştirmek yerine, birlikte yeni ve ortak yaşam biçimleri yaratmaları gerekir. Finansal planlama, ev düzeni ve sosyal ilişkiler gibi alanlarda karşılıklı uzlaşma, ilişkiyi olumlu yönde etkiler. Bu çift, birbirlerinin yaşam tarzlarına saygı gösterdikçe, uzun vadeli ve sağlıklı bir birliktelik oluşturabilir. Ortak hobiler ve sosyal etkinlikler, aralarındaki bağı güçlendiren unsurlardır.`,

  `${femaleSignTr} burcunun disiplinli ve sakin yaşam tarzı, ${maleSignTr} burcunun yenilikçi ve hareketli yapısıyla birleştiğinde, dengeli ve dinamik bir yaşam alanı ortaya çıkar. Bu çift, farklılıklarını kabul edip, ortak noktalar yaratmaya odaklandıkça, ilişkileri güçlenir. Ev yaşamı, finansal yönetim ve sosyal hayat gibi önemli alanlarda uyum yakaladıklarında, birlikte daha mutlu ve huzurlu olurlar. Sabır, anlayış ve iletişim, bu uyumun temel taşlarıdır.`,

  `Yaşam tarzı ve günlük rutinler konusunda ${femaleSignTr} ve ${maleSignTr} burçlarının arasında zaman zaman farklılıklar olabilir. Ancak bu farklılıklar, doğru yönetildiğinde ilişkinin zenginleşmesine katkı sağlar. Bu çift, evdeki sorumlulukları paylaşmak, finansal planlama yapmak ve sosyal etkinliklere birlikte katılmak gibi alanlarda uyumlu hareket ettikçe bağlarını güçlendirir. Ayrıca birbirlerinin kişisel alanlarına saygı duymak ve farklı alışkanlıklara tolerans göstermek, uzun vadeli mutluluğun anahtarıdır. Bu süreçte karşılıklı destek ve sevgi, yaşam tarzı uyumunu artırır.`,

  `Ev ve sosyal yaşam dengesi, ${femaleSignTr} ve ${maleSignTr} burçlarının ilişkilerinde önemli bir rol oynar. ${femaleSignTr} burcunun ev odaklı ve düzenli yaşam tarzı, ${maleSignTr} burcunun sosyal ve hareketli yapısıyla dengelenebilir. Bu çift, farklılıklarını birleştirerek zengin bir yaşam alanı oluşturabilir. Ev düzeni, finansal alışkanlıklar ve sosyal çevre konularında ortak paydalar bularak uyumu pekiştirebilirler. Sabır, iletişim ve karşılıklı anlayış, bu süreçte belirleyici unsurlardır.`,

  `${femaleSignTr} ve ${maleSignTr} burçlarının yaşam tarzı uyumu, her iki tarafın da farklı alışkanlıklarına saygı göstermesiyle mümkündür. Bu çift, ev düzeninden beslenme alışkanlıklarına, sosyal yaşamdan finansal planlamaya kadar birçok konuda ortak noktalara varmak için çaba harcar. Günlük rutinlerde esnek olmaları, farklılıkları zenginlik olarak görmeleri ilişkiyi güçlendirir. Ortak hobiler geliştirmek ve sosyal etkinliklere birlikte katılmak, bağlarını derinleştirir. Uzun vadede, bu uyum yaşam kalitesini artırır ve mutluluğu pekiştirir.`
];

  
  const detailedPsychology = getRandomItem(detailedPsychologyOptions);
  const detailedLifestyle = getRandomItem(detailedLifestyleOptions);
  
  // 3-4 tavsiye seç
  const advices = [];
  const shuffledAdvice = [...zodiacDatabase.advice].sort(() => 0.5 - Math.random());
  for (let i = 0; i < 4; i++) {
    advices.push(shuffledAdvice[i]);
  }
  
  return `🌟 UYUMLULUK SKORU: ${score}/100

💕 GENEL DEĞERLENDİRME:
${description} ${femaleSignTr} ve ${maleSignTr} burçları arasında ${score >= 85 ? 'mükemmel' : score >= 70 ? 'iyi' : 'orta'} bir uyum potansiyeli bulunuyor.

✨ GÜÇLÜ YÖNLER:
${strengths.map(s => `• ${s}`).join('\n')}

⚠️ DİKKAT EDİLMESİ GEREKEN NOKTALAR:
${challenges.map(c => `• ${c}`).join('\n')}

🗣️ İLETİŞİM TARZI:
${communication} Bu iki burç, birbirlerini anlamak için biraz zaman alabilir ama sabırla güzel sonuçlar elde edebilirler.

❤️ ROMANTİZM VE TUTKU:
${romance} İkinizin de aşk dili farklı olabilir, bu yüzden birbirinizin romantik beklentilerini öğrenmek önemli.

🔥 CİNSEL UYUM VE FİZİKSEL ÇEKİM:
${sexualChemistry} Fiziksel yakınlık konusunda açık iletişim kurmaları, ilişkilerinin bu boyutunu güçlendirecektir.

💰 MALİ KONULAR VE PARA YÖNETİMİ:
${financialHarmony} Para konusunda şeffaflık ve ortak kararlar almanız, gelecekteki olası sorunları önleyecektir.

👨‍👩‍👧‍👦 AİLE KURMA VE ÇOCUK SAHİBİ OLMA:
${familyPlanning} Aile planlaması gibi önemli konuları açık şekilde konuşmanız ilişkinizi daha da sağlamlaştırır.

🎯 ORTAK HEDEFLER VE HAYAT PLANLARI:
${commonGoals} Bireysel hedeflerinizi paylaşırken, ortak geleceğinizi de birlikte şekillendirin.

😤 KAVGA VE ÇATIŞMA YÖNETİMİ:
${conflictResolution} Anlaşmazlıklarda sakin kalmaya çalışın ve birbirinizi dinlemeyi unutmayın.

🎭 SOSYAL HAYAT VE ARKADAŞ ÇEVRESİ:
${socialLife} Sosyal aktivitelerde denge kurarak, hem beraber hem ayrı zaman geçirebilirsiniz.

🧠 ENTELEKTÜEL UYUM VE ÖĞRENME:
${intellectualMatch} Zihinsel uyarım için birlikte kitap okuyabilir, belgesel izleyebilir veya kurslar alabilirsiniz.

🎨 HOBİLER VE SERBEST ZAMAN AKTİVİTELERİ:
${hobbiesActivities} Kişisel ilgi alanlarınıza saygı gösterirken, yeni ortak hobiler de geliştirebilirsiniz.

💪 BİRBİRİNİ DESTEKLEME VE GÜÇLER:
${mutualSupport} Zor zamanlarınızda birbirinizin yanında olmayı ve başarılarınızı birlikte kutlamayı unutmayın.

🌱 KİŞİSEL GELİŞİM VE DEĞİŞİM:
${personalGrowth} İlişkiniz süresince ikilikte büyümeyi destekleyin, değişimden korkmayın.

✈️ SEYAHAT VE MACERA UYUMU:
${travelAdventure} Birlikte yeni yerler keşfetmek, ilişkinize heyecan ve taze enerji katacaktır.

🧠 PSİKOLOJİK DİNAMİK VE DÖNÜŞÜM:
${detailedPsychology}

🏡 YAŞAM TARZI UYUMLULUĞU:
${detailedLifestyle}

🏠 UZUN VADELİ İLİŞKİ POTANSİYELİ:
${longterm} ${score >= 80 ? 'Bu çift uzun vadede çok mutlu olabilir.' : score >= 65 ? 'Uzun vadeli ilişki için çaba gerekiyor ama mümkün.' : 'Uzun vadeli başarı için her iki tarafın da büyük çaba göstermesi gerekiyor.'}

💡 PRATİK TAVSİYELER:
${advices.map(a => `• ${a}`).join('\n')}

✨ Bu analiz ${femaleSignTr} ve ${maleSignTr} burçlarının genel özelliklerine dayanmaktadır. Unutmayın, her birey benzersizdir ve kişisel çabanız en önemli faktördür! 💫`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { femaleSign, maleSign } = req.body;

  if (!femaleSign || !maleSign) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const analysis = generateAnalysis(femaleSign, maleSign);
    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
}