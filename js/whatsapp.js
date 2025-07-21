/**
 * WHATSAPP.JS - Funcionalidad de WhatsApp
 * Sitio web de Sylvia Bucai - Abogada y Escribana
 * Fecha: Julio 2025
 */

// =======================================
// CONFIGURACIÓN DE WHATSAPP
// =======================================
const WHATSAPP_CONFIG = {
  number: '5493511551011688', // Número internacional de Sylvia
  defaultMessage: 'Hola Sylvia, estoy interesado/a en una consulta legal',
  businessHours: {
    start: '15:30',
    end: '18:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday']
  }
};

// =======================================
// INICIALIZACIÓN
// =======================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('📱 WhatsApp inicializado');
  
  // Inicializar todas las funcionalidades de WhatsApp
  initWhatsAppButtons();
  initFloatingButton();
  initBusinessHoursCheck();
  initAnalytics();
  
  console.log('✅ WhatsApp configurado correctamente');
});

// =======================================
// INICIALIZAR BOTONES DE WHATSAPP
// =======================================
function initWhatsAppButtons() {
  const whatsappButtons = [
    'whatsapp-btn-hero',
    'whatsapp-btn-form',
    'whatsapp-btn-contact',
    'whatsapp-btn-main',
    'whatsapp-btn-float'
  ];
  
  whatsappButtons.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Determinar el tipo de mensaje según el contexto
        const messageType = determineMessageType(buttonId);
        const message = generateMessage(messageType);
        
        // Abrir WhatsApp con el mensaje
        openWhatsApp(message);
        
        // Registrar interacción para analytics
        trackWhatsAppInteraction(buttonId, messageType);
      });
    }
  });
  
  console.log('🔗 Botones de WhatsApp inicializados');
}

// =======================================
// BOTÓN FLOTANTE
// =======================================
function initFloatingButton() {
  const floatingButton = document.getElementById('whatsapp-float');
  
  if (floatingButton) {
    // Mostrar/ocultar botón flotante según scroll
    window.addEventListener('scroll', throttle(function() {
      const scrollPosition = window.pageYOffset;
      
      if (scrollPosition > 300) {
        floatingButton.style.display = 'block';
        floatingButton.classList.add('visible');
      } else {
        floatingButton.classList.remove('visible');
        setTimeout(() => {
          if (!floatingButton.classList.contains('visible')) {
            floatingButton.style.display = 'none';
          }
        }, 300);
      }
    }, 100));
    
    // Efecto hover especial para el botón flotante
    floatingButton.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    floatingButton.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }
  
  console.log('🎈 Botón flotante de WhatsApp inicializado');
}

// =======================================
// DETERMINAR TIPO DE MENSAJE
// =======================================
function determineMessageType(buttonId) {
  const messageTypes = {
    'whatsapp-btn-hero': 'general',
    'whatsapp-btn-form': 'appointment',
    'whatsapp-btn-contact': 'contact',
    'whatsapp-btn-main': 'general',
    'whatsapp-btn-float': 'general'
  };
  
  return messageTypes[buttonId] || 'general';
}

// =======================================
// GENERAR MENSAJE PERSONALIZADO
// =======================================
function generateMessage(messageType) {
  const messages = {
    general: 'Hola Sylvia, estoy interesado/a en una consulta legal',
    appointment: generateAppointmentMessage(),
    contact: 'Hola Sylvia, vi tu información de contacto y me gustaría consultarte sobre un tema legal'
  };
  
  return messages[messageType] || messages.general;
}

function generateAppointmentMessage() {
  const form = document.getElementById('appointment-form');
  
  if (form) {
    const nombre = form.querySelector('#nombre')?.value || '';
    const telefono = form.querySelector('#telefono')?.value || '';
    const fecha = form.querySelector('#fecha')?.value || '';
    const hora = form.querySelector('#hora')?.value || '';
    const consulta = form.querySelector('#consulta')?.value || '';
    
    // Si hay datos del formulario, incluirlos en el mensaje
    if (nombre || telefono || fecha || hora || consulta) {
      let message = `Hola Sylvia, me gustaría agendar una consulta legal.\n\n`;
      
      if (nombre) message += `👤 Nombre: ${nombre}\n`;
      if (telefono) message += `📱 Teléfono: ${telefono}\n`;
      if (fecha) message += `📅 Fecha preferida: ${fecha}\n`;
      if (hora) message += `🕐 Hora preferida: ${hora}\n`;
      if (consulta) message += `💬 Consulta: ${consulta}\n`;
      
      message += `\n¿Podrías confirmarme la disponibilidad?`;
      
      return message;
    }
  }
  
  return 'Hola Sylvia, me gustaría agendar una consulta legal. ¿Podrías indicarme tu disponibilidad?';
}

// =======================================
// ABRIR WHATSAPP
// =======================================
function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;
  
  // Detectar si es dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // En móvil, abrir directamente la app
    window.location.href = whatsappUrl;
  } else {
    // En desktop, abrir en nueva ventana
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
  
  console.log('💬 WhatsApp abierto con mensaje:', message);
}

// =======================================
// VERIFICAR HORARIO DE ATENCIÓN
// =======================================
function initBusinessHoursCheck() {
  const businessHoursIndicator = createBusinessHoursIndicator();
  
  // Verificar horario cada minuto
  setInterval(updateBusinessHoursStatus, 60000);
  updateBusinessHoursStatus();
  
  function updateBusinessHoursStatus() {
    const isBusinessHours = checkBusinessHours();
    updateBusinessHoursDisplay(isBusinessHours);
  }
}

function checkBusinessHours() {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = domingo, 1 = lunes, etc.
  const currentTime = now.getHours() * 100 + now.getMinutes(); // Formato HHMM
  
  // Convertir días de la semana
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayName = dayNames[currentDay];
  
  // Verificar si es día laborable
  if (!WHATSAPP_CONFIG.businessHours.days.includes(currentDayName)) {
    return false;
  }
  
  // Convertir horas de atención a formato HHMM
  const startTime = parseTime(WHATSAPP_CONFIG.businessHours.start);
  const endTime = parseTime(WHATSAPP_CONFIG.businessHours.end);
  
  // Verificar si está en horario
  return currentTime >= startTime && currentTime <= endTime;
}

function parseTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 100 + minutes;
}

function createBusinessHoursIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'business-hours-indicator';
  indicator.className = 'business-hours-indicator';
  
  const floatingButton = document.getElementById('whatsapp-float');
  if (floatingButton) {
    floatingButton.appendChild(indicator);
  }
  
  return indicator;
}

function updateBusinessHoursDisplay(isBusinessHours) {
  const indicator = document.getElementById('business-hours-indicator');
  const floatingButton = document.getElementById('whatsapp-float');
  
  if (indicator) {
    if (isBusinessHours) {
      indicator.className = 'business-hours-indicator online';
      indicator.innerHTML = '<span class="status-dot online"></span>';
      floatingButton?.setAttribute('title', 'Sylvia está disponible - Horario de atención');
    } else {
      indicator.className = 'business-hours-indicator offline';
      indicator.innerHTML = '<span class="status-dot offline"></span>';
      floatingButton?.setAttribute('title', 'Fuera de horario - Responderá pronto');
    }
  }
}

// =======================================
// ANALYTICS DE WHATSAPP
// =======================================
function initAnalytics() {
  // Configurar analytics para WhatsApp
  window.whatsappAnalytics = {
    interactions: 0,
    lastInteraction: null,
    buttonClicks: {}
  };
  
  console.log('📊 Analytics de WhatsApp inicializados');
}

function trackWhatsAppInteraction(buttonId, messageType) {
  const analytics = window.whatsappAnalytics;
  
  // Incrementar contador general
  analytics.interactions++;
  analytics.lastInteraction = new Date().toISOString();
  
  // Contar clicks por botón
  if (!analytics.buttonClicks[buttonId]) {
    analytics.buttonClicks[buttonId] = 0;
  }
  analytics.buttonClicks[buttonId]++;
  
  // Registrar en localStorage para persistencia
  localStorage.setItem('whatsapp_analytics', JSON.stringify(analytics));
  
  // Enviar a Google Analytics si está disponible
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      button_id: buttonId,
      message_type: messageType,
      page_url: window.location.href
    });
  }
  
  console.log('📈 Interacción con WhatsApp registrada:', {
    buttonId,
    messageType,
    totalInteractions: analytics.interactions
  });
}

// =======================================
// FUNCIONES AUXILIARES
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

// =======================================
// MANEJO DE ERRORES
// =======================================
function handleWhatsAppError(error) {
  console.error('Error en WhatsApp:', error);
  
  // Mostrar mensaje de error amigable
  showErrorMessage('No se pudo abrir WhatsApp. Puedes contactarnos por teléfono al 351-155 101688');
}

function showErrorMessage(message) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-warning alert-dismissible fade show';
  alert.innerHTML = `
    <i class="fas fa-exclamation-triangle me-2"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Insertar en el body
  document.body.insertBefore(alert, document.body.firstChild);
  
  // Remover después de 5 segundos
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// =======================================
// FUNCIONES PÚBLICAS
// =======================================
window.WhatsApp = {
  openChat: function(customMessage) {
    const message = customMessage || WHATSAPP_CONFIG.defaultMessage;
    openWhatsApp(message);
    trackWhatsAppInteraction('manual', 'custom');
  },
  
  openWithFormData: function() {
    const message = generateMessage('appointment');
    openWhatsApp(message);
    trackWhatsAppInteraction('form_integration', 'appointment');
  },
  
  checkBusinessHours: checkBusinessHours,
  
  getAnalytics: function() {
    return window.whatsappAnalytics;
  }
};

// =======================================
// ESTILOS DINÁMICOS PARA INDICADORES
// =======================================
function addBusinessHoursStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .business-hours-indicator {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    .status-dot.online {
      background: #28a745;
    }
    
    .status-dot.offline {
      background: #ffc107;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
}

// Agregar estilos al cargar
document.addEventListener('DOMContentLoaded', addBusinessHoursStyles);

// =======================================
// EXPORTAR PARA TESTING
// =======================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMessage,
    checkBusinessHours,
    determineMessageType,
    openWhatsApp
  };
}

console.log('📱 whatsapp.js cargado completamente'); 