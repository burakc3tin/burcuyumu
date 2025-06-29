import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Global meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="google-site-verification" content="ycJ9Zn2Nwx4n-YV0XRJkdTaZhK8qHwA7gAmy8Qg2w6Y" />
        {/* Language and Region */}
        <meta httpEquiv="content-language" content="tr" />
        <meta name="language" content="Turkish" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-W3X2MLGDK3"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W3X2MLGDK3');
          `
        }} />
        <meta name="geo.region" content="TR" />
        <meta name="geo.country" content="Turkey" />
        
        {/* Favicon and icons */}
         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical URL - Bu her sayfada override edilecek */}
        <link rel="canonical" href="https://ruhesim.site" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Inter for modern typography */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ruh Eşim",
              "url": "https://ruhesim.site",
              "description": "Türkiye'nin en kapsamlı burç uyumları ve aşk uyumluluk analizi platformu. AI destekli detaylı burç analizi, sevgili hediye önerileri ve çift aktiviteleri.",
              "inLanguage": "tr-TR",
              "isAccessibleForFree": true,
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ruhesim.site/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Ruh Eşim",
                "url": "https://ruhesim.site",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://ruhesim.site/logo-512.png"
                }
              },
              "mainEntity": {
                "@type": "Service",
                "name": "Burç Uyumluluğu Analizi",
                "description": "AI destekli burç uyumluluğu analizi ve aşk danışmanlığı hizmeti",
                "provider": {
                  "@type": "Organization",
                  "name": "Ruh Eşim"
                },
                "areaServed": "TR",
                "availableLanguage": "tr"
              }
            })
          }}
        />
        
        {/* Author and Copyright */}
        <meta name="author" content="Ruh Eşim" />
        <meta name="copyright" content="© 2024 Ruh Eşim. Tüm hakları saklıdır." />
        
        {/* Robots */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Verification Tags - Bu kısımları Google Search Console'dan alacaksınız */}
        {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
        {/* <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" /> */}
        {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}
      </Head>
      
      <div className="min-h-screen font-inter">
        <Component {...pageProps} />
      </div>
    </>
  )
}