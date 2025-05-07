<template>
    <footer class="futaway-footer">
      <div class="footer-inner">
        <!-- Left: Logo -->
        <a href="/" class="footer-logo">
          <img src="@/assets/logo_footer.png" alt="Futaway logo" />
        </a>

        <!-- Center: Social & Contact -->
        <div class="footer-center">
          <h3>FOLLOW US</h3>
          <div class="social-icons">
            <a href="https://x.com/futawaybox" target="_blank" rel="noopener" aria-label="Twitter">
              <i class="pi pi-twitter"></i>
            </a>
            <a href="https://www.instagram.com/futawaybox/" target="_blank" rel="noopener" aria-label="Instagram">
              <i class="pi pi-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@futawaybox" target="_blank" rel="noopener" aria-label="TikTok">
              <i class="pi pi-tiktok"></i>
            </a>
          </div>
          <h3>CONTACT US</h3>
          <p class="contact-email">ayuda@futaway.com</p>
        </div>

        <!-- Right: Newsletter -->
        <div class="footer-newsletter-wrapper">
          <form class="footer-newsletter" @submit.prevent="handleSubmit">
            <label class="newsletter-label">Accede a actualizaciones exclusivas</label>
            <div class="newsletter-inputs">
              <input
                v-model="email"
                type="email"
                placeholder="Tu correo electrónico"
                required
              />
              <button type="submit" :disabled="!emailValid">
                <i class="pi pi-send"></i>
              </button>
            </div>
          </form>
          <!-- Policies links -->
          <div class="footer-policies">
            <a href="#" class="policy-link">Política de devolución</a>
            <a href="#" class="policy-link">Política de privacidad</a>
            <a href="#" class="policy-link">Política de cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </template>

  <script setup>
  import { ref, computed } from 'vue'

  const email = ref('')
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailValid = computed(() => emailPattern.test(email.value))

  function handleSubmit () {
    if (!emailValid.value) return
    // TODO: Send email to backend
    alert('¡Gracias por suscribirte! (demo)')
    email.value = ''
  }
  </script>

  <style scoped>
  .futaway-footer {
    background: #262626;
    color: #ffffff;

    /* full‑width breakout */
    position: relative;
    left: 50%;
    margin-left: -50vw;
    width: 100vw;

    /* padding interior */
    padding: 2rem 20px;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
    justify-content: space-between;
  }

  /* Left */
  .footer-logo img {
    width: 140px;
    transition: transform 0.3s ease;
  }
  .footer-logo:hover img {
    transform: scale(1.05);
  }

  /* Center */
  .footer-center {
    flex: 1 1 220px;
    text-align: center;
    padding-top: 0.5rem;
  }
  .footer-center h3 {
    margin: 0;
    font-size: 1rem;
    letter-spacing: 1px;
  }
  .social-icons {
    margin: 1rem 0 1.5rem; /* espacio extra sobre icons */
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }
  .social-icons i {
    font-size: 1.5rem;
    color: #ffffff;
    transition: color 0.3s ease;
  }
  .social-icons a:hover i {
    color: #ffd740;
  }
  .contact-email {
    font-size: 0.85rem;
    color: #d1d1d1;
    margin-top: 0.5rem;
  }

  /* Right */
  .footer-newsletter-wrapper {
    flex: 1 1 260px;
    max-width: 260px;
    margin-left: -10px;  /* movido ligeramente a la izquierda */
    margin-top: 10px;    /* movido hacia abajo */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .footer-newsletter {
    width: 100%;
  }
  .newsletter-label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 600;
    font-size: 0.75rem; /* tamaño de letra menor */
  }
  .newsletter-inputs {
    display: flex;
    width: 100%;
  }
  .newsletter-inputs input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 4px 0 0 4px;
    font-size: 0.9rem;
  }
  .newsletter-inputs button {
    padding: 0 0.75rem;
    background: #ffd740;
    color: #262626;
    border: none;
    font-weight: 600;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .newsletter-inputs button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Policies */
  .footer-policies {
    margin-top: 2rem; /* aumentado para bajar más los enlaces */
    text-align: right;
  }
  .policy-link {
    display: block;
    font-size: 0.7rem;
    color: #d1d1d1;
    text-decoration: none;
    margin-bottom: 0.25rem;
    transition: color 0.2s ease;
  }
  .policy-link:hover {
    text-decoration: underline;
    color: #ffffff;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .footer-center,
    .footer-newsletter-wrapper {
      text-align: center;
      flex: 1 1 100%;
      margin-left: 0;
      margin-top: 1rem;
      align-items: center;
    }
    .newsletter-inputs {
      flex-direction: column;
    }
    .newsletter-inputs input,
    .newsletter-inputs button {
      border-radius: 4px;
    }
    .newsletter-inputs button {
      margin-top: 0.5rem;
    }
    .footer-policies {
      text-align: center;
      margin-top: 1.5rem; /* más espacio abajo en mobile */
    }
  }
  </style>
