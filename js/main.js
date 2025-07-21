/**
 * MAIN.JS - Funcionalidad principal del sitio web
 * Sitio web de Sylvia Bucai - Abogada y Escribana
 * Fecha: Julio 2025
 */

// =======================================
// VARIABLES GLOBALES
// =======================================
let isScrolling = false;
let currentSection = '';
const sections = ['inicio', 'sobre-mi', 'consulta', 'testimonios', 'contacto'];

// =======================================
// INICIALIZACIÓN
// =======================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Sitio web de Sylvia Bucai iniciado');
  
  // Inicializar todas las funcionalidades
  initNavigation();
  initScrollEffects();
  initAnimations();
  initImagePlaceholders();
  initFormValidation();
  initAccessibility();
  
  console.log('✅ Todas las funcionalidades inicializadas');
});

// =======================================
// NAVEGACIÓN SUAVE
// =======================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');
  
  // Agregar event listeners a los enlaces de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Cerrar menú móvil si está abierto
        const navbarToggler = document.querySelector('.navbar-collapse');
        if (navbarToggler.classList.contains('show')) {
          bootstrap.Collapse.getInstance(navbarToggler).hide();
        }
        
        // Scroll suave a la sección
        smoothScrollTo(targetSection);
        
        // Actualizar enlace activo
        updateActiveNavLink(targetId);
      }
    });
  });
  
  // Manejar scroll para actualizar navegación activa
  window.addEventListener('scroll', throttle(function() {
    updateNavbarOnScroll();
    updateActiveNavLinkOnScroll();
  }, 100));
  
  console.log('📐 Navegación suave inicializada');
}

// =======================================
// SCROLL SUAVE PERSONALIZADO
// =======================================
function smoothScrollTo(targetElement) {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const targetPosition = targetElement.offsetTop - navbarHeight - 20;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// =======================================
// EFECTOS DE SCROLL
// =======================================
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  let scrollPosition = 0;
  
  window.addEventListener('scroll', throttle(function() {
    scrollPosition = window.pageYOffset;
    
    // Efecto de navbar al hacer scroll
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Efecto parallax sutil para decoración floral
    const floralDecoration = document.querySelector('.floral-decoration');
    if (floralDecoration && window.innerWidth > 768) {
      const scrolled = scrollPosition * 0.1;
      floralDecoration.style.transform = `translateY(${scrolled}px)`;
    }
  }, 100));
  
  console.log('🎭 Efectos de scroll inicializados');
}

// =======================================
// ANIMACIONES DE ENTRADA
// =======================================
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Crear observer para animaciones
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observar elementos para animaciones
  const animatedElements = document.querySelectorAll('.testimonial-card, .contact-info, .highlight-box');
  animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
  });
  
  console.log('🎨 Animaciones inicializadas');
}

// =======================================
// MANEJO DE PLACEHOLDERS DE IMÁGENES
// =======================================
function initImagePlaceholders() {
  const placeholderImages = document.querySelectorAll('.placeholder-image');
  const realImages = document.querySelectorAll('.hero-image img, .about-image img');
  
  // Mostrar placeholders si las imágenes no cargan
  realImages.forEach(img => {
    img.addEventListener('error', function() {
      const placeholder = this.parentElement.querySelector('.placeholder-image');
      if (placeholder) {
        this.style.display = 'none';
        placeholder.style.display = 'block';
      }
    });
    
    img.addEventListener('load', function() {
      const placeholder = this.parentElement.querySelector('.placeholder-image');
      if (placeholder) {
        placeholder.style.display = 'none';
        this.style.display = 'block';
      }
    });
  });
  
  console.log('🖼️ Placeholders de imágenes inicializados');
}

// =======================================
// VALIDACIÓN DE FORMULARIOS
// =======================================
function initFormValidation() {
  const form = document.getElementById('appointment-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        handleFormSubmission();
      }
    });
    
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        clearFieldError(this);
      });
    });
  }
  
  console.log('📝 Validación de formularios inicializada');
}

// =======================================
// VALIDACIÓN DE CAMPOS
// =======================================
function validateForm() {
  const nombre = document.getElementById('nombre');
  const telefono = document.getElementById('telefono');
  const fecha = document.getElementById('fecha');
  const hora = document.getElementById('hora');
  
  let isValid = true;
  
  // Validar nombre
  if (!nombre.value.trim()) {
    showFieldError(nombre, 'El nombre es requerido');
    isValid = false;
  } else if (nombre.value.trim().length < 2) {
    showFieldError(nombre, 'El nombre debe tener al menos 2 caracteres');
    isValid = false;
  }
  
  // Validar teléfono
  if (!telefono.value.trim()) {
    showFieldError(telefono, 'El teléfono es requerido');
    isValid = false;
  } else if (!/^\d{3}-?\d{3}-?\d{4}$/.test(telefono.value.trim())) {
    showFieldError(telefono, 'Formato de teléfono inválido');
    isValid = false;
  }
  
  // Validar fecha
  if (!fecha.value) {
    showFieldError(fecha, 'La fecha es requerida');
    isValid = false;
  }
  
  // Validar hora
  if (!hora.value) {
    showFieldError(hora, 'La hora es requerida');
    isValid = false;
  }
  
  return isValid;
}

function validateField(field) {
  switch(field.id) {
    case 'nombre':
      if (!field.value.trim()) {
        showFieldError(field, 'El nombre es requerido');
        return false;
      }
      break;
    case 'telefono':
      if (!field.value.trim()) {
        showFieldError(field, 'El teléfono es requerido');
        return false;
      }
      break;
    case 'fecha':
      if (!field.value) {
        showFieldError(field, 'La fecha es requerida');
        return false;
      }
      break;
    case 'hora':
      if (!field.value) {
        showFieldError(field, 'La hora es requerida');
        return false;
      }
      break;
  }
  
  clearFieldError(field);
  return true;
}

function showFieldError(field, message) {
  clearFieldError(field);
  
  field.classList.add('is-invalid');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'invalid-feedback';
  errorDiv.textContent = message;
  
  field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
  
  const errorDiv = field.parentElement.querySelector('.invalid-feedback');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// =======================================
// MANEJO DE ENVÍO DE FORMULARIO
// =======================================
function handleFormSubmission() {
  const form = document.getElementById('appointment-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Mostrar estado de carga
  showLoading(submitBtn);
  
  // Simular envío (aquí se conectaría con la API de n8n)
  setTimeout(() => {
    hideLoading(submitBtn);
    showSuccessMessage();
    form.reset();
  }, 2000);
}

function showLoading(button) {
  button.classList.add('loading');
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
}

function hideLoading(button) {
  button.classList.remove('loading');
  button.disabled = false;
  button.innerHTML = '<i class="fas fa-calendar-plus me-2"></i>Reservar Turno';
}

function showSuccessMessage() {
  const form = document.getElementById('appointment-form');
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-success';
  alertDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i>¡Turno solicitado exitosamente! Te contactaremos pronto.';
  
  form.parentElement.insertBefore(alertDiv, form);
  
  // Remover mensaje después de 5 segundos
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// =======================================
// NAVEGACIÓN ACTIVA
// =======================================
function updateActiveNavLink(targetId) {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${targetId}`) {
      link.classList.add('active');
    }
  });
}

function updateActiveNavLinkOnScroll() {
  const scrollPosition = window.pageYOffset + 200;
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (currentSection !== sectionId) {
          currentSection = sectionId;
          updateActiveNavLink(sectionId);
        }
      }
    }
  });
}

function updateNavbarOnScroll() {
  const navbar = document.querySelector('.navbar');
  const scrollPosition = window.pageYOffset;
  
  if (scrollPosition > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// =======================================
// ACCESIBILIDAD
// =======================================
function initAccessibility() {
  // Manejo de teclas para navegación
  document.addEventListener('keydown', function(e) {
    // Escape para cerrar menú móvil
    if (e.key === 'Escape') {
      const navbarToggler = document.querySelector('.navbar-collapse');
      if (navbarToggler && navbarToggler.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarToggler).hide();
      }
    }
    
    // Enter en enlaces de navegación
    if (e.key === 'Enter' && e.target.classList.contains('nav-link')) {
      e.target.click();
    }
  });
  
  // Agregar atributos ARIA
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.setAttribute('aria-label', `Ir a sección ${link.textContent}`);
  });
  
  const whatsappButtons = document.querySelectorAll('[id^="whatsapp-btn"]');
  whatsappButtons.forEach(btn => {
    btn.setAttribute('aria-label', 'Contactar por WhatsApp');
  });
  
  console.log('♿ Accesibilidad inicializada');
}

// =======================================
// UTILIDADES
// =======================================
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// =======================================
// MANEJO DE ERRORES
// =======================================
window.addEventListener('error', function(e) {
  console.error('Error en el sitio:', e.error);
  
  // Reportar error (opcional)
  if (typeof reportError === 'function') {
    reportError(e.error);
  }
});

// =======================================
// PERFORMANCE
// =======================================
window.addEventListener('load', function() {
  // Precargar imágenes importantes
  preloadImages();
  
  // Optimización de lazy loading
  initLazyLoading();
  
  console.log('⚡ Optimizaciones de rendimiento aplicadas');
});

function preloadImages() {
  const imagesToPreload = [
    'assets/logo 3.png',
    'assets/diseño floral 2.png'
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// =======================================
// EXPORTAR FUNCIONES (para testing)
// =======================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    smoothScrollTo,
    validateForm,
    throttle,
    debounce
  };
}

console.log('🎯 main.js cargado completamente'); 