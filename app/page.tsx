'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = (productName: string, productUnit: string) => {
    alert(`${productName} (${productUnit}) sepetinize eklendi!`);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;
    
    // Redirect to WhatsApp with the user's message
    const whatsappText = `Merhaba, benim adım ${name}. ${message}`;
    const whatsappUrl = `https://wa.me/905415809615?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank');
    
    e.currentTarget.reset();
  };

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <a href="#" className="logo">Demir Süt Ürünleri</a>
          <ul 
            className="nav-links" 
            style={isMobileMenuOpen ? {
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '100%',
              left: '0',
              width: '100%',
              background: 'white',
              padding: '2rem 0',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
            } : {}}
          >
            {[
              { label: 'Ana Sayfa', href: '#home' },
              { label: 'Çiftliğimiz', href: '#about' },
              { label: 'Ürünler', href: '#products' },
            ].map(link => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  style={isMobileMenuOpen ? { color: '#1F2937', margin: '1rem 0' } : {}}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#contact" 
                className="btn-nav"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                style={isMobileMenuOpen ? { color: 'white', margin: '1rem 0', display: 'inline-block' } : {}}
              >
                Sipariş Ver
              </a>
            </li>
          </ul>
          <div className="mobile-menu-icon" id="mobile-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero-content glass">
          <h1>Doğadan Gelen<br /><span>Sağlık ve Bereketi</span></h1>
          <p>Günlük sağılmış doğal inek sütü, taze köy yumurtası ve özenle yetiştirilmiş adaklık kurbanlıklarımızla hizmetinizdeyiz.</p>
          <a href="#products" className="btn-primary" onClick={(e) => handleSmoothScroll(e, '#products')}>
            Hemen İncele
          </a>
        </div>
      </header>

      <section id="about" className="about-section">
        <div className="container auto-grid">
          <div className="about-text">
            <h2>Mutlu İnekler, <br />Eşsiz Lezzet</h2>
            <p>Modern tesislerimizde ineklerimizin sağlığına ve refahına öncelik veriyoruz. Geniş yeşil meralarımızda serbestçe dolaşan, doğal beslenen ineklerimizden elde ettiğimiz süt, yüksek besin değeri ve eşsiz aromasıyla öne çıkar.</p>
            <div className="features">
              <div className="feature-item">
                <span className="icon">🌿</span>
                <h4>%100 Doğal Beslenme</h4>
              </div>
              <div className="feature-item">
                <span className="icon">🐄</span>
                <h4>Serbest Dolaşım</h4>
              </div>
              <div className="feature-item">
                <span className="icon">🥛</span>
                <h4>Günlük Teslimat</h4>
              </div>
            </div>
          </div>
          <div className="about-image">
            <Image 
              src="/farm.png" 
              alt="Modern ve ferah çiftlik tesisimiz" 
              width={600} 
              height={500} 
              style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '20px' }} 
            />
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="container text-center">
          <h2>Doğal Ürünlerimiz</h2>
          <p className="subtitle">En doğal ve taze haliyle sofranıza gelir.</p>

          <div className="products-grid">
            {/* Süt */}
            <div className="product-card">
              <div className="product-image-container">
                <Image src="/milk.png" alt="Günlük Taze Süt" width={400} height={350} style={{ transform: 'scale(1.1)', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3>Günlük Taze Süt</h3>
                <p className="unit">Litre Başına</p>
                <p className="price">
                  50 ₺<span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 400 }}> / Litre</span>
                </p>
                <button className="btn-secondary add-to-cart" onClick={() => handleAddToCart('Günlük Taze Süt', 'Litre Başına')}>
                  Sepete Ekle
                </button>
              </div>
            </div>

            {/* Yumurta */}
            <div className="product-card">
              <div className="product-image-container">
                <Image src="/eggs.png" alt="Organik Köy Yumurtası" width={400} height={350} style={{ objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3>Köy Yumurtası</h3>
                <p className="unit">Günlük Taze Toplanmış</p>
                <p className="price">
                  300 ₺<span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 400 }}> / Koli (30'lu)</span>
                </p>
                <button className="btn-secondary add-to-cart" onClick={() => handleAddToCart('Köy Yumurtası', 'Koli (30\'lu)')}>
                  Sepete Ekle
                </button>
              </div>
            </div>

            {/* Tereyağı */}
            <div className="product-card">
              <div className="product-image-container">
                <Image src="/butter.png" alt="Doğal Köy Tereyağı" width={400} height={350} style={{ objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3>Köy Tereyağı</h3>
                <p className="unit">Geleneksel Yöntemlerle Çalkalanmış</p>
                <p className="price">
                  650 ₺<span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 400 }}> / Kg</span>
                </p>
                <button className="btn-secondary add-to-cart" onClick={() => handleAddToCart('Köy Tereyağı', 'Kg')}>
                  Sepete Ekle
                </button>
              </div>
            </div>

            {/* Adaklık Kurbanlık */}
            <div className="product-card">
              <div className="product-image-container">
                <Image src="/livestock.png" alt="Adaklık Kurbanlık" width={400} height={350} style={{ transform: 'scale(1.1)', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3>Adaklık Kurbanlık</h3>
                <p className="unit">Doğal Besili, Sağlıklı Koyun & Koç</p>
                <p className="price">Fiyat Alınız</p>
                <a href="https://wa.me/905415809615" target="_blank" rel="noopener noreferrer" className="btn-secondary add-to-cart" style={{ display: 'inline-block', textAlign: 'center' }}>
                  WhatsApp'tan Yaz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container flex-contact">
          <div className="contact-info">
            <h2>Sipariş ve İletişim</h2>
            <p>Siparişleriniz veya adaklık kurbanlık hakkında bilgi almak için bizimle iletişime geçebilirsiniz.</p>
            <ul>
              <li>📞 <strong>Telefon:</strong> 0541 580 96 15</li>
              <li>📍 <strong>Adres:</strong> Çırcırsuyu - Sarıyer / İstanbul</li>
            </ul>
          </div>
          <div className="contact-form glass-dark">
            <h3>Mesaj Gönderin</h3>
            <form id="orderForm" onSubmit={handleFormSubmit}>
              <div className="input-group">
                <label htmlFor="name">Adınız Soyadınız</label>
                <input type="text" id="name" name="name" required placeholder="Ali Yılmaz" />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Telefon Numaranız</label>
                <input type="tel" id="phone" name="phone" required placeholder="05XX XXX XX XX" />
              </div>
              <div className="input-group">
                <label htmlFor="message">Sipariş Detayı / Mesajınız</label>
                <textarea id="message" name="message" rows={4} required placeholder="Merhaba, haftalık 5 litre süt aboneliği başlatmak istiyorum." />
              </div>
              <button type="submit" className="btn-primary w-100">WhatsApp'a Gönder</button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container text-center">
          <p>&copy; 2026 Demir Süt Ürünleri. Tüm hakları saklıdır.</p>
          <p className="footer-note">Doğal, Taze, Güvenilir.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/905415809615" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="WhatsApp üzerinden iletişime geçin"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" className="whatsapp-icon">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
