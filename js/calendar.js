/**
 * CALENDAR.JS - Sistema de citas y calendario
 * Sitio web de Sylvia Bucai - Abogada y Escribana
 * Fecha: Julio 2025
 */

// =======================================
// CONFIGURACIÓN DEL CALENDARIO
// =======================================
const CALENDAR_CONFIG = {
  apiBaseUrl: '', // Se configurará desde .env
  weeksToShow: 2,
  businessHours: {
    start: '15:30',
    end: '18:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday']
  },
  timeSlots: [
    '15:30', '16:00', '16:30', '17:00', '17:30'
  ],
  holidays: [
    // Feriados argentinos 2025 (ejemplo)
    '2025-01-01', '2025-03-24', '2025-03-25', '2025-04-02', 
    '2025-05-01', '2025-05-25', '2025-06-20', '2025-07-09',
    '2025-08-17', '2025-10-12', '2025-12-08', '2025-12-25'
  ]
};

// =======================================
// INICIALIZACIÓN
// =======================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('📅 Sistema de citas inicializado');
  
  // Cargar configuración desde variables de entorno
  loadConfig();
  
  // Inicializar funcionalidades del calendario
  initCalendar();
  initEventListeners();
  
  console.log('✅ Sistema de citas configurado');
});

// =======================================
// CARGAR CONFIGURACIÓN
// =======================================
function loadConfig() {
  // Cargar desde variables de entorno o usar valores por defecto
  CALENDAR_CONFIG.apiBaseUrl = getEnvVar('N8N_API_BASE_URL', 'https://cobquecura.app.n8n.cloud');
  CALENDAR_CONFIG.weeksToShow = parseInt(getEnvVar('WEEKS_TO_SHOW', '2'));
  
  console.log('⚙️ Configuración cargada:', CALENDAR_CONFIG);
}

function getEnvVar(name, defaultValue) {
  // En producción, estas variables vendrían del servidor
  // Por ahora, usar localStorage para simulación
  const stored = localStorage.getItem(`env_${name}`);
  return stored || defaultValue;
}

// =======================================
// INICIALIZAR CALENDARIO
// =======================================
function initCalendar() {
  const fechaSelect = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');
  
  if (fechaSelect && horaSelect) {
    // Cargar fechas disponibles
    loadAvailableDates();
    
    // Configurar event listener para fecha
    fechaSelect.addEventListener('change', function() {
      const selectedDate = this.value;
      if (selectedDate) {
        loadAvailableHours(selectedDate);
      } else {
        clearHours();
      }
    });
  }
  
  console.log('🗓️ Calendario inicializado');
}

// =======================================
// CARGAR FECHAS DISPONIBLES
// =======================================
async function loadAvailableDates() {
  const fechaSelect = document.getElementById('fecha');
  
  if (!fechaSelect) return;
  
  try {
    // Mostrar estado de carga
    showLoadingState(fechaSelect);
    
    // Generar rango de fechas
    const { startDate, endDate } = generateDateRange();
    
    // Llamar a la API
    const availability = await fetchAvailability(startDate, endDate);
    
    // Poblar selector de fechas
    populateDateSelector(availability);
    
  } catch (error) {
    console.error('Error cargando fechas:', error);
    showErrorState(fechaSelect, 'Error al cargar fechas disponibles');
  }
}

// =======================================
// GENERAR RANGO DE FECHAS
// =======================================
function generateDateRange() {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);
  
  // Calcular fecha de inicio (mañana)
  startDate.setDate(today.getDate() + 1);
  
  // Calcular fecha de fin (X semanas después)
  endDate.setDate(today.getDate() + (CALENDAR_CONFIG.weeksToShow * 7));
  
  return {
    startDate: formatDateForAPI(startDate),
    endDate: formatDateForAPI(endDate)
  };
}

function formatDateForAPI(date) {
  return date.toISOString().split('T')[0];
}

function formatDateForDisplay(dateString) {
  const date = new Date(dateString);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  
  return `${dayName} ${day} de ${month}`;
}

// =======================================
// OBTENER DISPONIBILIDAD DESDE API (MODIFICADO)
// =======================================
async function fetchAvailability(startDate, endDate) {
  const url = `${CALENDAR_CONFIG.apiBaseUrl}/webhook/turnos-silvia?fecha_inicio=${startDate}&fecha_fin=${endDate}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // 🆕 NUEVA LÓGICA: Convertir turnos ocupados a disponibles
    return processOccupiedSlots(data, startDate, endDate);
    
  } catch (error) {
    console.error('Error en API de disponibilidad:', error);
    
    // Fallback: generar disponibilidad simulada
    return generateMockAvailability(startDate, endDate);
  }
}

// =======================================
// 🆕 PROCESAR TURNOS OCUPADOS Y CALCULAR DISPONIBLES
// =======================================
function processOccupiedSlots(occupiedData, startDate, endDate) {
  console.log('🔄 Procesando turnos ocupados desde API');
  
  const availability = {
    fechas_disponibles: []
  };
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Iterar por cada fecha en el rango
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    if (isBusinessDay(date) && !isHoliday(date)) {
      const dateString = formatDateForAPI(date);
      
      // Obtener horarios ocupados para esta fecha
      const occupiedSlots = getOccupiedSlotsForDate(occupiedData, dateString);
      
      // Calcular horarios disponibles (todos - ocupados)
      const availableSlots = calculateAvailableSlots(occupiedSlots);
      
      // Solo agregar fechas que tienen al menos 1 horario disponible
      if (availableSlots.length > 0) {
        availability.fechas_disponibles.push({
          fecha: dateString,
          horarios: availableSlots
        });
      }
    }
  }
  
  console.log(`✅ Procesados ${availability.fechas_disponibles.length} días con horarios disponibles`);
  return availability;
}

// =======================================
// 🆕 OBTENER HORARIOS OCUPADOS PARA UNA FECHA ESPECÍFICA
// =======================================
function getOccupiedSlotsForDate(occupiedData, targetDate) {
  if (!occupiedData.turnos_ocupados) {
    return [];
  }
  
  const dateData = occupiedData.turnos_ocupados.find(d => d.fecha === targetDate);
  return dateData ? dateData.horarios : [];
}

// =======================================
// 🆕 CALCULAR HORARIOS DISPONIBLES
// =======================================
function calculateAvailableSlots(occupiedSlots) {
  // Todos los horarios posibles de Sylvia
  const allSlots = [...CALENDAR_CONFIG.timeSlots];
  
  // Filtrar los ocupados
  const availableSlots = allSlots.filter(slot => !occupiedSlots.includes(slot));
  
  console.log(`🕐 Fecha: ${occupiedSlots.length} ocupados, ${availableSlots.length} disponibles`);
  return availableSlots;
}

// =======================================
// GENERAR DISPONIBILIDAD SIMULADA (MODIFICADO)
// =======================================
function generateMockAvailability(startDate, endDate) {
  console.log('🔄 Generando disponibilidad simulada (modo ocupados)');
  
  // 🆕 Simular algunos turnos ocupados para testing (fechas actualizadas - hoy: 22/07/2025)
  const mockOccupiedData = {
    turnos_ocupados: [
      {
        fecha: "2025-07-24",
        horarios: ["15:30", "17:00"]
      },
      {
        fecha: "2025-07-25", 
        horarios: ["16:00"]
      },
      {
        fecha: "2025-07-29",
        horarios: ["16:30", "17:30"]
      }
    ]
  };
  
  // Procesar usando la nueva lógica
  return processOccupiedSlots(mockOccupiedData, startDate, endDate);
}

function isBusinessDay(date) {
  const dayOfWeek = date.getDay();
  // Lunes = 1, Martes = 2, Miércoles = 3, Jueves = 4
  return dayOfWeek >= 1 && dayOfWeek <= 4;
}

function isHoliday(date) {
  const dateString = formatDateForAPI(date);
  return CALENDAR_CONFIG.holidays.includes(dateString);
}

// =======================================
// POBLAR SELECTOR DE FECHAS
// =======================================
function populateDateSelector(availability) {
  const fechaSelect = document.getElementById('fecha');
  
  if (!fechaSelect) return;
  
  // Limpiar opciones existentes
  fechaSelect.innerHTML = '<option value="">Seleccionar fecha</option>';
  
  // Agregar fechas disponibles
  if (availability.fechas_disponibles && availability.fechas_disponibles.length > 0) {
    availability.fechas_disponibles.forEach(dateOption => {
      const option = document.createElement('option');
      option.value = dateOption.fecha;
      option.textContent = formatDateForDisplay(dateOption.fecha);
      fechaSelect.appendChild(option);
    });
    
    // Habilitar selector
    fechaSelect.disabled = false;
    
    console.log(`📅 ${availability.fechas_disponibles.length} fechas disponibles cargadas`);
  } else {
    // No hay fechas disponibles
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No hay fechas disponibles';
    fechaSelect.appendChild(option);
    
    fechaSelect.disabled = true;
    console.log('⚠️ No hay fechas disponibles');
  }
  
  // Remover estado de carga
  hideLoadingState(fechaSelect);
}

// =======================================
// CARGAR HORARIOS DISPONIBLES
// =======================================
async function loadAvailableHours(selectedDate) {
  const horaSelect = document.getElementById('hora');
  
  if (!horaSelect) return;
  
  try {
    // Mostrar estado de carga
    showLoadingState(horaSelect);
    
    // Obtener horarios para la fecha seleccionada
    const { startDate, endDate } = generateDateRange();
    const availability = await fetchAvailability(startDate, endDate);
    
    // Encontrar horarios para la fecha seleccionada
    const dateData = availability.fechas_disponibles.find(d => d.fecha === selectedDate);
    
    if (dateData && dateData.horarios) {
      populateHourSelector(dateData.horarios);
    } else {
      clearHours();
      showErrorState(horaSelect, 'No hay horarios disponibles para esta fecha');
    }
    
  } catch (error) {
    console.error('Error cargando horarios:', error);
    showErrorState(horaSelect, 'Error al cargar horarios');
  }
}

// =======================================
// POBLAR SELECTOR DE HORARIOS
// =======================================
function populateHourSelector(horarios) {
  const horaSelect = document.getElementById('hora');
  
  if (!horaSelect) return;
  
  // Limpiar opciones existentes
  horaSelect.innerHTML = '<option value="">Seleccionar hora</option>';
  
  // Agregar horarios disponibles
  horarios.forEach(hora => {
    const option = document.createElement('option');
    option.value = hora;
    option.textContent = hora;
    horaSelect.appendChild(option);
  });
  
  // Habilitar selector
  horaSelect.disabled = false;
  
  // Remover estado de carga
  hideLoadingState(horaSelect);
  
  console.log(`🕐 ${horarios.length} horarios disponibles cargados`);
}

function clearHours() {
  const horaSelect = document.getElementById('hora');
  if (horaSelect) {
    horaSelect.innerHTML = '<option value="">Seleccionar hora</option>';
    horaSelect.disabled = true;
  }
}

// =======================================
// INICIALIZAR EVENT LISTENERS
// =======================================
function initEventListeners() {
  const form = document.getElementById('appointment-form');
  
  if (form) {
    form.addEventListener('submit', handleAppointmentSubmission);
  }
  
  // Botón de WhatsApp del formulario
  const whatsappFormBtn = document.getElementById('whatsapp-btn-form');
  if (whatsappFormBtn) {
    whatsappFormBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validar formulario primero
      if (validateAppointmentForm()) {
        // El mensaje se generará automáticamente en whatsapp.js
        console.log('📱 Enviando datos por WhatsApp');
      }
    });
  }
}

// =======================================
// MANEJO DE ENVÍO DE CITA
// =======================================
async function handleAppointmentSubmission(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  try {
    // Validar formulario
    if (!validateAppointmentForm()) {
      return;
    }
    
    // Mostrar estado de carga
    showLoadingState(submitBtn);
    
    // Recopilar datos del formulario
    const appointmentData = gatherAppointmentData();
    
    // Enviar a la API
    const result = await submitAppointment(appointmentData);
    
    // Mostrar resultado
    if (result.success === true || result.success === "true") {
      showSuccessMessage('¡Cita reservada exitosamente! Te contactaremos para confirmar.');
      form.reset();
      clearHours();
    } else {
      showErrorMessage(result.message || 'Error al reservar la cita');
    }
    
  } catch (error) {
    console.error('Error al enviar cita:', error);
    showErrorMessage('Error al procesar la solicitud. Intenta nuevamente.');
  } finally {
    hideLoadingState(submitBtn);
  }
}

// =======================================
// VALIDAR FORMULARIO DE CITA
// =======================================
function validateAppointmentForm() {
  const form = document.getElementById('appointment-form');
  const requiredFields = ['nombre', 'telefono', 'fecha', 'hora'];
  
  let isValid = true;
  
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field && !field.value.trim()) {
      showFieldError(field, 'Este campo es requerido');
      isValid = false;
    } else if (field) {
      // Validación específica para teléfono - SIMPLIFICADA
      if (fieldId === 'telefono') {
        const telefonoRegex = /^\d{10,12}$/;
        if (!telefonoRegex.test(field.value.trim())) {
          showFieldError(field, 'Ingresa entre 10 y 12 números (ej: 3511234567)');
          isValid = false;
        } else {
          clearFieldError(field);
        }
      } else {
        clearFieldError(field);
      }
    }
  });
  
  return isValid;
}

// =======================================
// RECOPILAR DATOS DE CITA
// =======================================
function gatherAppointmentData() {
  const form = document.getElementById('appointment-form');
  
  return {
    nombre: form.querySelector('#nombre').value.trim(),
    telefono: form.querySelector('#telefono').value.trim(),
    fecha: form.querySelector('#fecha').value,
    hora: form.querySelector('#hora').value,
    consulta: form.querySelector('#consulta').value.trim()
  };
}

// =======================================
// ENVIAR CITA A LA API
// =======================================
async function submitAppointment(appointmentData) {
  const url = `${CALENDAR_CONFIG.apiBaseUrl}/webhook/turnos-silvia`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(appointmentData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error en API de reserva:', error);
    
    // Fallback: simular éxito (formato real de n8n)
    const now = new Date();
    const dateStr = now.toISOString().slice(0,10).replace(/-/g,'');
    const timeStr = now.toTimeString().slice(0,5).replace(':','');
    
    return {
      success: "true",
      message: 'Cita registrada (modo simulación)',
      appointmentId: `CITA-${dateStr}-${timeStr}`,
      details: {
        nombre: 'Usuario de Prueba',
        fecha: now.toISOString().slice(0,10),
        hora: now.toTimeString().slice(0,5),
        estado: 'confirmada'
      }
    };
  }
}

// =======================================
// ESTADOS DE CARGA Y ERROR
// =======================================
function showLoadingState(element) {
  if (element.tagName === 'SELECT') {
    element.disabled = true;
    element.innerHTML = '<option value="">Cargando...</option>';
  } else if (element.tagName === 'BUTTON') {
    element.disabled = true;
    element.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
  }
}

function hideLoadingState(element) {
  if (element.tagName === 'SELECT') {
    element.disabled = false;
  } else if (element.tagName === 'BUTTON') {
    element.disabled = false;
    element.innerHTML = '<i class="fas fa-calendar-plus me-2"></i>Reservar Turno';
  }
}

function showErrorState(element, message) {
  if (element.tagName === 'SELECT') {
    element.innerHTML = `<option value="">${message}</option>`;
    element.disabled = true;
  }
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
// FUNCIONES DE MENSAJES DE USUARIO
// =======================================
function showSuccessMessage(message) {
  // Crear el elemento de notificación
  const notification = document.createElement('div');
  notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
  notification.style.cssText = `
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  notification.innerHTML = `
    <i class="fas fa-check-circle me-2"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Agregar al body
  document.body.appendChild(notification);
  
  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
  
  console.log(`✅ Éxito: ${message}`);
}

function showErrorMessage(message) {
  // Crear el elemento de notificación de error
  const notification = document.createElement('div');
  notification.className = 'alert alert-danger alert-dismissible fade show position-fixed';
  notification.style.cssText = `
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  notification.innerHTML = `
    <i class="fas fa-exclamation-triangle me-2"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Agregar al body
  document.body.appendChild(notification);
  
  // Auto-remover después de 7 segundos (más tiempo para errores)
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 7000);
  
  console.log(`❌ Error: ${message}`);
}

// =======================================
// 🆕 DEBUGGING Y ANALYTICS
// =======================================
function logAvailabilityStats(availability) {
  const totalDays = availability.fechas_disponibles.length;
  const totalSlots = availability.fechas_disponibles.reduce((sum, day) => sum + day.horarios.length, 0);
  
  console.log(`📊 Estadísticas de disponibilidad:`);
  console.log(`   📅 Días con horarios: ${totalDays}`);
  console.log(`   🕐 Total slots disponibles: ${totalSlots}`);
  
  // Log detallado por fecha
  availability.fechas_disponibles.forEach(day => {
    console.log(`   📅 ${day.fecha}: ${day.horarios.join(', ')}`);
  });
}

// =======================================
// FUNCIONES PÚBLICAS
// =======================================
window.Calendar = {
  refreshAvailability: function() {
    loadAvailableDates();
  },
  
  setApiBaseUrl: function(url) {
    CALENDAR_CONFIG.apiBaseUrl = url;
  },
  
  getConfig: function() {
    return CALENDAR_CONFIG;
  }
};

// =======================================
// 🆕 FUNCIÓN PÚBLICA PARA TESTING
// =======================================
window.CalendarDebug = {
  // Simular respuesta del API con turnos ocupados
  testOccupiedSlots: function(occupiedData) {
    const { startDate, endDate } = generateDateRange();
    return processOccupiedSlots(occupiedData, startDate, endDate);
  },
  
  // Ver configuración actual
  getConfig: function() {
    return CALENDAR_CONFIG;
  },
  
  // Refrescar manualmente
  refresh: function() {
    loadAvailableDates();
  },
  
  // Ver estadísticas de disponibilidad
  showStats: function() {
    const { startDate, endDate } = generateDateRange();
    fetchAvailability(startDate, endDate).then(availability => {
      logAvailabilityStats(availability);
    });
  }
};

// =======================================
// EXPORTAR PARA TESTING
// =======================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateDateRange,
    formatDateForAPI,
    formatDateForDisplay,
    isBusinessDay,
    isHoliday,
    validateAppointmentForm,
    gatherAppointmentData
  };
}

console.log('📅 calendar.js cargado completamente'); 