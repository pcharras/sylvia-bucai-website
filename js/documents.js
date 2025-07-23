/**
 * DOCUMENTS.JS - Funcionalidad de subida de documentos
 * Sitio web de Sylvia Bucai - Abogada y Escribana
 * Integración con n8n para upload de archivos
 * Fecha: Julio 2025
 */

// =======================================
// CONFIGURACIÓN Y VARIABLES
// =======================================
const DOCUMENTS_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10 MB en bytes
  allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
  allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
  apiEndpoint: 'https://cobquecura.app.n8n.cloud/webhook/subir-documento'
};

let documentForm = null;
let fileInput = null;
let submitButton = null;
let selectedFile = null;

// =======================================
// INICIALIZACIÓN
// =======================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 Inicializando sistema de documentos');
  
  // Verificar que existe la sección de documentos
  if (document.getElementById('documentos')) {
    initDocumentUpload();
    console.log('✅ Sistema de documentos inicializado');
  }
});

// =======================================
// INICIALIZACIÓN DEL FORMULARIO
// =======================================
function initDocumentUpload() {
  // Obtener elementos del DOM
  documentForm = document.getElementById('document-form');
  fileInput = document.getElementById('doc-archivo');
  submitButton = document.getElementById('submit-document');
  
  if (!documentForm || !fileInput || !submitButton) {
    console.error('❌ Error: No se encontraron elementos del formulario de documentos');
    return;
  }
  
  // Configurar event listeners
  setupFormValidation();
  setupFileUpload();
  setupFormSubmission();
  setupDragAndDrop();
  
  console.log('🔧 Formulario de documentos configurado');
}

// =======================================
// VALIDACIÓN DEL FORMULARIO
// =======================================
function setupFormValidation() {
  const requiredFields = ['doc-nombre', 'doc-email', 'doc-telefono', 'doc-tipo', 'doc-archivo'];
  
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      // Validación en tiempo real
      field.addEventListener('input', function() {
        validateField(this);
        updateSubmitButton();
      });
      
      field.addEventListener('blur', function() {
        validateField(this);
      });
    }
  });
}

function validateField(field) {
  const fieldId = field.id;
  let isValid = true;
  let errorMessage = '';
  
  // Validación por tipo de campo
  switch (fieldId) {
    case 'doc-nombre':
      isValid = field.value.trim().length >= 2;
      errorMessage = 'El nombre debe tener al menos 2 caracteres';
      break;
      
    case 'doc-email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(field.value);
      errorMessage = 'Por favor, ingresa un email válido';
      break;
      
    case 'doc-telefono':
      // Usar EXACTAMENTE la misma validación del sitio existente
      const phoneRegex = /^\d{8,12}$/;
      const cleanPhone = field.value.replace(/\D/g, '');
      field.value = cleanPhone; // Limpiar caracteres no numéricos
      isValid = phoneRegex.test(cleanPhone);
      errorMessage = 'El teléfono debe tener entre 8 y 12 números';
      break;
      
    case 'doc-tipo':
      isValid = field.value !== '';
      errorMessage = 'Por favor, selecciona el tipo de documento';
      break;
      
    case 'doc-archivo':
      isValid = validateFile();
      errorMessage = getFileValidationError();
      break;
  }
  
  // Aplicar clases de validación
  if (field.value.trim() === '' && field.hasAttribute('required')) {
    field.classList.remove('is-valid', 'is-invalid');
  } else if (isValid) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
  } else {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    
    // Actualizar mensaje de error
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = errorMessage;
    }
  }
  
  return isValid;
}

// =======================================
// MANEJO DE ARCHIVOS
// =======================================
function setupFileUpload() {
  fileInput.addEventListener('change', function(e) {
    handleFileSelection(e.target.files[0]);
  });
}

function handleFileSelection(file) {
  selectedFile = file;
  
  if (file) {
    // Validar archivo
    const isValid = validateFile();
    
    if (isValid) {
      showSelectedFile(file);
      fileInput.classList.remove('is-invalid');
      fileInput.classList.add('is-valid');
    } else {
      showFileError();
      fileInput.classList.remove('is-valid');
      fileInput.classList.add('is-invalid');
    }
  } else {
    hideSelectedFile();
    fileInput.classList.remove('is-valid', 'is-invalid');
  }
  
  updateSubmitButton();
}

function validateFile() {
  if (!selectedFile) return false;
  
  // Validar tamaño
  if (selectedFile.size > DOCUMENTS_CONFIG.maxFileSize) {
    return false;
  }
  
  // Validar tipo MIME
  if (!DOCUMENTS_CONFIG.allowedTypes.includes(selectedFile.type)) {
    return false;
  }
  
  // Validar extensión
  const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
  if (!DOCUMENTS_CONFIG.allowedExtensions.includes(fileExtension)) {
    return false;
  }
  
  return true;
}

function getFileValidationError() {
  if (!selectedFile) {
    return 'Por favor, selecciona un archivo';
  }
  
  if (selectedFile.size > DOCUMENTS_CONFIG.maxFileSize) {
    return 'El archivo es muy grande. Máximo 10 MB';
  }
  
  const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
  if (!DOCUMENTS_CONFIG.allowedExtensions.includes(fileExtension)) {
    return 'Formato no válido. Solo PDF, JPG o PNG';
  }
  
  return 'Archivo no válido';
}

function showSelectedFile(file) {
  const fileSelectedDiv = document.querySelector('.file-selected');
  const fileName = fileSelectedDiv.querySelector('.file-name');
  const closeButton = fileSelectedDiv.querySelector('.btn-close');
  
  if (fileSelectedDiv && fileName) {
    fileName.textContent = `${file.name} (${formatFileSize(file.size)})`;
    fileSelectedDiv.style.display = 'block';
    
    // Configurar botón de cerrar
    if (closeButton) {
      closeButton.onclick = function() {
        removeSelectedFile();
      };
    }
  }
}

function hideSelectedFile() {
  const fileSelectedDiv = document.querySelector('.file-selected');
  if (fileSelectedDiv) {
    fileSelectedDiv.style.display = 'none';
  }
}

function removeSelectedFile() {
  selectedFile = null;
  fileInput.value = '';
  hideSelectedFile();
  fileInput.classList.remove('is-valid', 'is-invalid');
  updateSubmitButton();
}

function showFileError() {
  hideSelectedFile();
  
  // Mostrar mensaje de error específico
  const feedback = fileInput.parentElement.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = getFileValidationError();
  }
}

// =======================================
// DRAG AND DROP
// =======================================
function setupDragAndDrop() {
  const uploadWrapper = document.querySelector('.file-upload-wrapper');
  
  if (!uploadWrapper) return;
  
  // Prevenir comportamiento por defecto
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadWrapper.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });
  
  // Efectos visuales
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadWrapper.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    uploadWrapper.addEventListener(eventName, unhighlight, false);
  });
  
  // Manejar drop
  uploadWrapper.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  const uploadWrapper = document.querySelector('.file-upload-wrapper');
  uploadWrapper.classList.add('dragover');
}

function unhighlight(e) {
  const uploadWrapper = document.querySelector('.file-upload-wrapper');
  uploadWrapper.classList.remove('dragover');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  
  if (files.length > 0) {
    handleFileSelection(files[0]);
  }
}

// =======================================
// ENVÍO DEL FORMULARIO
// =======================================
function setupFormSubmission() {
  documentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitDocument();
  });
}

async function submitDocument() {
  console.log('📤 Iniciando envío de documento');
  
  // Validar formulario completo
  if (!validateForm()) {
    showDocumentErrorMessage('Por favor, completa todos los campos requeridos');
    return;
  }
  
  // Preparar datos
  const formData = new FormData();
  formData.append('nombre', document.getElementById('doc-nombre').value.trim());
  formData.append('email', document.getElementById('doc-email').value.trim());
  formData.append('telefono', document.getElementById('doc-telefono').value.trim());
  formData.append('tipoDocumento', document.getElementById('doc-tipo').value);
  formData.append('comentario', document.getElementById('doc-comentario').value.trim());
  formData.append('archivo', selectedFile);
  
  // Estado de carga
  setLoadingState(true);
  showUploadProgress();
  
  try {
    // Simular progreso (opcional)
    updateProgress(30);
    
    const response = await fetch(DOCUMENTS_CONFIG.apiEndpoint, {
      method: 'POST',
      body: formData
    });
    
    updateProgress(80);
    
    const data = await response.json();
    
    updateProgress(100);
    
    // Procesar respuesta
    if (data.success) {
      console.log('✅ Documento enviado exitosamente:', data);
      showDocumentSuccessMessage(`✅ Tu documento fue recibido correctamente. ${data.message || ''}`);
      resetForm();
    } else {
      console.error('❌ Error del servidor:', data);
      showDocumentErrorMessage(`Hubo un error: ${data.error || 'Error desconocido'}`);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    showDocumentErrorMessage('Error de conexión. Por favor, verifica tu internet e intenta nuevamente.');
  } finally {
    setLoadingState(false);
    hideUploadProgress();
  }
}

function validateForm() {
  const requiredFields = ['doc-nombre', 'doc-email', 'doc-telefono', 'doc-tipo'];
  let allValid = true;
  
  // Validar campos requeridos
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field && !validateField(field)) {
      allValid = false;
    }
  });
  
  // Validar archivo
  if (!selectedFile || !validateFile()) {
    allValid = false;
    validateField(fileInput);
  }
  
  return allValid;
}

// =======================================
// ESTADOS DE UI
// =======================================
function updateSubmitButton() {
  const isFormValid = validateForm();
  submitButton.disabled = !isFormValid;
  
  if (isFormValid) {
    submitButton.classList.remove('btn-secondary');
    submitButton.classList.add('btn-primary');
  } else {
    submitButton.classList.remove('btn-primary');
    submitButton.classList.add('btn-secondary');
  }
}

function setLoadingState(loading) {
  if (loading) {
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    submitButton.querySelector('.btn-text').textContent = 'Enviando...';
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
    submitButton.querySelector('.btn-text').textContent = 'Enviar documento';
    updateSubmitButton(); // Revalidar estado
  }
}

function showUploadProgress() {
  const progressDiv = document.querySelector('.upload-progress');
  if (progressDiv) {
    progressDiv.style.display = 'block';
    updateProgress(0);
  }
}

function hideUploadProgress() {
  setTimeout(() => {
    const progressDiv = document.querySelector('.upload-progress');
    if (progressDiv) {
      progressDiv.style.display = 'none';
    }
  }, 1000);
}

function updateProgress(percent) {
  const progressBar = document.querySelector('.upload-progress .progress-bar');
  if (progressBar) {
    progressBar.style.width = percent + '%';
    progressBar.setAttribute('aria-valuenow', percent);
  }
}

function resetForm() {
  documentForm.reset();
  removeSelectedFile();
  
  // Limpiar clases de validación
  const fields = documentForm.querySelectorAll('.form-control, .form-select');
  fields.forEach(field => {
    field.classList.remove('is-valid', 'is-invalid');
  });
  
  updateSubmitButton();
}

// =======================================
// UTILIDADES
// =======================================
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// =======================================
// USAR FUNCIONES DE NOTIFICACIÓN EXISTENTES - CORREGIDO
// =======================================
function showDocumentSuccessMessage(message) {
  // Buscar las funciones existentes en el scope global correcto
  if (typeof window.showSuccessMessage === 'function' && window.showSuccessMessage.toString().indexOf('showDocumentSuccessMessage') === -1) {
    window.showSuccessMessage(message);
  } else {
    // Implementación directa de notificación de éxito
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = `
      top: 20px; 
      right: 20px; 
      z-index: 9999; 
      max-width: 400px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
    `;
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 5000);
    
    console.log('✅ Éxito:', message);
  }
}

function showDocumentErrorMessage(message) {
  // Buscar las funciones existentes en el scope global correcto
  if (typeof window.showErrorMessage === 'function' && window.showErrorMessage.toString().indexOf('showDocumentErrorMessage') === -1) {
    window.showErrorMessage(message);
  } else {
    // Implementación directa de notificación de error
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alert.style.cssText = `
      top: 20px; 
      right: 20px; 
      z-index: 9999; 
      max-width: 400px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
    `;
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove después de 7 segundos
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 7000);
    
    console.error('❌ Error:', message);
  }
}

// =======================================
// EXTENDER DEBUGGING EXISTENTE
// =======================================
document.addEventListener('DOMContentLoaded', function() {
  // Esperar a que window.CalendarDebug esté disponible
  setTimeout(() => {
    if (typeof window.CalendarDebug !== 'undefined') {
      // Extender el debugging existente en lugar de crear uno nuevo
      window.CalendarDebug.documents = {
        validateForm: () => validateForm(),
        selectedFile: () => selectedFile,
        config: DOCUMENTS_CONFIG,
        resetForm: () => resetForm(),
        testUpload: (mockData) => {
          console.log('🧪 Testing document upload with mock data:', mockData);
          return DOCUMENTS_CONFIG;
        }
      };
      
      console.log('🔧 Debugging de documentos integrado a CalendarDebug.documents');
    } else {
      console.log('ℹ️ CalendarDebug no disponible, creando debugging independiente');
      window.DocumentsDebug = {
        validateForm: () => validateForm(),
        selectedFile: () => selectedFile,
        config: DOCUMENTS_CONFIG,
        resetForm: () => resetForm()
      };
    }
  }, 1000);
});

console.log('📄 Sistema de documentos cargado correctamente'); 