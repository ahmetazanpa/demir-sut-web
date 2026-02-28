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
    
    alert(`Teşekkürler ${name}! Mesajınız ve sipariş talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.`);
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
                <button className="btn-secondary add-to-cart" onClick={() => handleAddToCart('Adaklık', 'Büyük / Küçük Boy Seçenekleri')}>
                  İletişime Geç
                </button>
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
              <button type="submit" className="btn-primary w-100">Gönder</button>
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
    </>
  );
}
