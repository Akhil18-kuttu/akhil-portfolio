document.addEventListener("DOMContentLoaded", () => {

  // === 1. INTERSECTION OBSERVER (Scroll Reveal Animations) ===
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
      }
    });
  };

  const revealObserver = new IntersectionObserver(observerCallback, observerOptions);
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  

  // === 2. NAVBAR HIDE/SHOW ON SCROLL ===
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  const mobileMenu = document.getElementById('mobileMenu');

  if (header) {
    window.addEventListener("scroll", () => {
      // Don't hide navbar if mobile menu is open
      if (mobileMenu && mobileMenu.classList.contains('active')) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Hide/Show Logic
      if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
          header.style.transform = "translateY(-100%)"; // Scrolling Down
        } else {
          header.style.transform = "translateY(0)";    // Scrolling Up
        }
      } else {
        header.style.transform = "translateY(0)";      // Top of page
      }

      // Visual Shadow Toggle
      if (scrollTop > 50) {
        header.classList.add("shadow-sm", "border-[#E4E1D9]");
      } else {
        header.classList.remove("shadow-sm", "border-[#E4E1D9]");
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }


  // === 3. MOBILE MENU TOGGLE ===
  const menuButton = document.getElementById('menuBtn'); // Note: Make sure ID matches your HTML
  const menuIcon = document.getElementById('menuIcon');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // Prevents background scroll
      
      // Update Lucide icon
      if (menuIcon) {
        menuIcon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
        if (window.lucide) lucide.createIcons(); 
      }
    });
  }


  // === 4. SMOOTH SCROLLING & AUTO-CLOSE MENU ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (menuIcon) {
          menuIcon.setAttribute('data-lucide', 'menu');
          if (window.lucide) lucide.createIcons();
        }
      }

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });


  // === 5. CONTACT FORM SUBMISSION ===
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = "SENDING...";

      try {
        const res = await fetch(this.action || "contact.php", {
          method: "POST",
          body: new FormData(this)
        });

        if (!res.ok) throw new Error("Server Error");
        alert("Success! Message sent.");
        this.reset();
      } catch (err) {
        alert("Notice: Backend not found. Data logged to console.");
        console.log("Form Data:", Object.fromEntries(new FormData(this)));
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // Final Icon Init
  if (window.lucide) lucide.createIcons();
});