document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic implementation)
    const mobileIcon = document.getElementById('mobile-icon');
    const navLinks = document.querySelector('.nav-links');
    
    mobileIcon.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '2rem 0';
            navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
            
            // Adjust styles for mobile links
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.style.color = '#1F2937';
                link.style.margin = '1rem 0';
            });
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Hide mobile menu if open
            if (window.innerWidth <= 900) {
                navLinks.style.display = 'none';
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add to Cart Buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productVolume = productCard.querySelector('.unit').textContent;
            
            alert(`${productName} (${productVolume}) sepetinize eklendi!`);
        });
    });

    // Form Submission
    const orderForm = document.getElementById('orderForm');
    
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        
        alert(`Teşekkürler ${name}! Mesajınız ve sipariş talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.`);
        orderForm.reset();
    });
});
