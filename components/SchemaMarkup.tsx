// import Head from 'next/head'

// interface SchemaMarkupProps {
//   type: 'website' | 'article' | 'collection' | 'faq'
//   data: any
// }

// export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
//   const generateSchema = () => {
//     const baseSchema = {
//       "@context": "https://schema.org",
//       "@graph": [
//         // Organization Schema
//         {
//           "@type": "Organization",
//           "@id": "https://ruhesim.site/#organization",
//           "name": "Ruh Eşim",
//           "url": "https://ruhesim.site",
//           "logo": {
//             "@type": "ImageObject",
//             "@id": "https://ruhesim.site/#logo",
//             "url": "https://ruhesim.site/logo-512.png",
//             "contentUrl": "https://ruhesim.site/logo-512.png",
//             "width": 512,
//             "height": 512,
//             "caption": "Ruh Eşim Logo"
//           },
//           "image": {
//             "@id": "https://ruhesim.site/#logo"
//           },
//           "description": "Türkiye'nin en kapsamlı burç uyumları ve aşk uyumluluk analizi platformu. AI destekli detaylı burç analizi, sevgili hediye önerileri ve çift aktiviteleri.",
//           "foundingDate": "2024",
//           "founder": {
//             "@type": "Person",
//             "name": "Ruh Eşim Kurucusu"
//           },
//           "contactPoint": {
//             "@type": "ContactPoint",
//             "contactType": "Customer Service",
//             "availableLanguage": ["Turkish", "tr"],
//             "areaServed": "TR"
//           },
//           "sameAs": [
//             "https://twitter.com/ruhesim",
//             "https://facebook.com/ruhesim",
//             "https://instagram.com/ruhesim"
//           ],
//           "knowsAbout": [
//             "Astroloji",
//             "Burç Uyumları", 
//             "Aşk Danışmanlığı",
//             "İlişki Rehberliği",
//             "Romantik Öneriler"
//           ]
//         },
        
//         // Website Schema
//         {
//           "@type": "WebSite",
//           "@id": "https://ruhesim.site/#website",
//           "url": "https://ruhesim.site",
//           "name": "Ruh Eşim - Burç Uyumları ve Aşk Analizi",
//           "description": "Türkiye'nin en kapsamlı burç uyumları ve aşk uyumluluk analizi platformu",
//           "publisher": {
//             "@id": "https://ruhesim.site/#organization"
//           },
//           "inLanguage": "tr-TR",
//           "copyrightYear": 2024,
//           "copyrightHolder": {
//             "@id": "https://ruhesim.site/#organization"
//           },
//           "potentialAction": {
//             "@type": "SearchAction",
//             "target": {
//               "@type": "EntryPoint",
//               "urlTemplate": "https://ruhesim.site/?q={search_term_string}"
//             },
//             "query-input": "required name=search_term_string"
//           }
//         }
//       ]
//     }

//     // Sayfa tipine göre ek schema ekle
//     switch (type) {
//       case 'website':
//         baseSchema["@graph"].push({
//           "@type": "WebPage",
//           "@id": `${data.url}#webpage`,
//           "url": data.url,
//           "name": data.title,
//           "description": data.description,
//           "isPartOf": {
//             "@id": "https://ruhesim.site/#website"
//           },
//           "about": {
//             "@id": "https://ruhesim.site/#organization"
//           },
//           "primaryImageOfPage": {
//             "@type": "ImageObject",
//             "url": data.image || "https://ruhesim.site/og-image.png"
//           },
//           "datePublished": data.datePublished || "2024-12-28",
//           "dateModified": data.dateModified || "2024-12-28"
//         })
//         break

//       case 'article':
//         baseSchema["@graph"].push({
//           "@type": "Article",
//           "@id": `${data.url}#article`,
//           "url": data.url,
//           "headline": data.title,
//           "description": data.description,
//           "image": data.image || "https://ruhesim.site/og-image.png",
//           "datePublished": data.datePublished || "2024-12-28",
//           "dateModified": data.dateModified || "2024-12-28",
//           "author": {
//             "@id": "https://ruhesim.site/#organization"
//           },
//           "publisher": {
//             "@id": "https://ruhesim.site/#organization"
//           },
//           "mainEntityOfPage": {
//             "@id": `${data.url}#webpage`
//           },
//           "articleSection": data.section || "Genel",
//           "wordCount": data.wordCount || 500,
//           "inLanguage": "tr-TR"
//         })
//         break

//       case 'collection':
//         baseSchema["@graph"].push({
//           "@type": "CollectionPage",
//           "@id": `${data.url}#collection`,
//           "url": data.url,
//           "name": data.title,
//           "description": data.description,
//           "isPartOf": {
//             "@id": "https://ruhesim.site/#website"
//           },
//           "mainEntity": {
//             "@type": "ItemList",
//             "name": data.listName,
//             "description": data.listDescription,
//             "numberOfItems": data.numberOfItems,
//             "itemListElement": data.items || []
//           }
//         })
//         break

//       case 'faq':
//         baseSchema["@graph"].push({
//           "@type": "FAQPage",
//           "@id": `${data.url}#faq`,
//           "url": data.url,
//           "name": data.title,
//           "mainEntity": data.faqs || []
//         })
//         break
//     }

//     return baseSchema
//   }

//   return (
//     <Head>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(generateSchema())
//         }}
//       />
//     </Head>
//   )
// }

// // Yaygın FAQ şemaları
// export const CommonFAQs = {
//   zodiacCompatibility: [
//     {
//       "@type": "Question",
//       "name": "Burç uyumları gerçek mi?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Burç uyumları astrolojik geleneklere dayalı yorumlardır. Ruh Eşim, bu geleneksel bilgileri AI ile harmanlayarak eğlenceli ve içgörü dolu analizler sunar. Bilimsel kanıta dayalı olmasa da, kendini tanıma ve ilişki dinamiklerini anlama açısından faydalı olabilir."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Hangi burçlar en uyumlu?",
//       "acceptedAnswer": {
//         "@type": "Answer", 
//         "text": "Genel olarak aynı element grubundaki burçlar uyumludur: Ateş burçları (Koç, Aslan, Yay), Toprak burçları (Boğa, Başak, Oğlak), Hava burçları (İkizler, Terazi, Kova) ve Su burçları (Yengeç, Akrep, Balık). Ancak zıt burçlar da birbirlerini tamamlayabilir."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Burç analizi ücretsiz mi?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Evet! Ruh Eşim'de tüm burç uyumluluğu analizleri tamamen ücretsizdir. AI destekli detaylı raporları hiçbir ücret ödemeden alabilirsiniz."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "AI destekli burç analizi nasıl çalışır?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Sistemimiz geleneksel astroloji bilgilerini modern veri analizi teknikleriyle birleştirerek kapsamlı raporlar üretir. Her analiz, burçların element uyumu, karakter özellikleri ve ilişki dinamikleri göz önünde bulundurularak kişiselleştirilir."
//       }
//     }
//   ]
// }