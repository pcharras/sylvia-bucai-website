# Contexto del Proyecto

## Información General
- **Nombre del proyecto**: Sitio Web Sylvia Bucai - Abogada
- **Descripción**: Sitio web institucional para abogada independiente, orientado a clientes individuales (B2C), que transmite profesionalismo, cercanía y confianza
- **Versión actual**: 1.2.0
- **Fecha de inicio**: 18 de julio de 2025
- **Última actualización**: 23 de julio de 2025 (Sistema de documentos: Implementación completa + corrección crítica de recursión infinita)
- **Cliente**: Sylvia Bucai - Abogada y Escribana
- **Especialidad**: Derecho inmobiliario y notarial

## Arquitectura del Proyecto

### Estructura de Directorios
```
src/
├── index.html              # Página principal SPA
├── css/
│   ├── style.css          # Estilos principales
│   └── responsive.css     # Media queries mobile-first
├── js/
│   ├── main.js           # Funcionalidad principal (validación tiempo real)
│   ├── calendar.js       # Gestión completa de citas (envío + notificaciones)
│   ├── whatsapp.js       # Integración WhatsApp
│   └── documents.js      # Sistema de subida de documentos (NUEVO)
├── docs/
│   ├── n8n-api-specification.md  # Documentación API completa
│   └── nueva-regex-backend.md    # Instrucciones regex simplificada n8n
├── assets/
│   ├── logo 3.png        # Logo oficial "SB"
│   ├── diseño floral 2.png  # Diseño floral decorativo
│   ├── diseño floreal.png   # Diseño floral alternativo
│   └── images/           # Fotos profesionales (pendientes)
├── test-integration.html  # Testing directo de APIs n8n (citas)
├── test-documents.html   # Testing sistema de documentos (NUEVO)
├── .env                  # Variables de configuración (invisible por seguridad)
├── config.example.txt    # Template configuración con URLs reales
├── project_context.md    # Este archivo
└── changelog.md         # Registro detallado de cambios
```

### Tecnologías Principales
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript Vanilla
- **Backend**: n8n Cloud (`https://cobquecura.app.n8n.cloud`)
- **Base de datos**: No requerida (sitio estático)
- **Herramientas de construcción**: No framework (sitio estático)
- **Integraciones**: Google Calendar API, WhatsApp Web API

## Decisiones de Diseño Clave

### SPA (Single Page Application)
- **Contexto**: Sitio de una sola página con navegación suave entre secciones
- **Alternativas consideradas**: Sitio multipágina tradicional
- **Impacto**: Mejor experiencia de usuario, carga más rápida, navegación fluida

### Mobile-First Design
- **Contexto**: Diseño prioritario para dispositivos móviles
- **Alternativas consideradas**: Desktop-first, híbrido balanceado
- **Impacto**: Mejor experiencia para usuarios que buscan servicios legales desde celulares

### Tecnología Vanilla (sin frameworks)
- **Contexto**: Sitio estático simple sin complejidad técnica
- **Alternativas consideradas**: React, Vue.js, Angular
- **Impacto**: Mejor rendimiento, mantenimiento simple, hosting económico

## Componentes Principales

### Navegación Principal
- **Propósito**: Menú de navegación con 5 secciones
- **Ubicación**: Header fijo en index.html
- **Dependencias**: JavaScript para scroll suave

### Sistema de Citas - **MEJORADO**
- **Propósito**: Gestión de disponibilidad y reserva de turnos
- **Ubicación**: js/calendar.js
- **Dependencias**: APIs de n8n, Google Calendar
- **Nuevas características**: 
  - Procesamiento de turnos ocupados en frontend
  - Funciones de debugging (`window.CalendarDebug`)
  - Testing automático con datos simulados
  - Logs detallados de estadísticas de disponibilidad

### Botón Flotante WhatsApp
- **Propósito**: Contacto directo con mensaje predefinido
- **Ubicación**: js/whatsapp.js
- **Dependencias**: WhatsApp Web API

## APIs y Interfaces Importantes

### API de Disponibilidad (n8n) - **ACTUALIZADA**
- **Descripción**: Consulta turnos ocupados (el frontend calcula disponibles)
- **Endpoints principales**: 
  - GET /api/disponibilidad?fecha_inicio=YYYY-MM-DD&fecha_fin=YYYY-MM-DD
- **Autenticación**: Bearer token (configurado en n8n)
- **Respuesta**: {"turnos_ocupados": [{"fecha": "YYYY-MM-DD", "horarios": ["HH:MM"]}]}
- **Procesamiento**: Frontend calcula disponibles = todos_los_horarios - ocupados

### API de Reservas (n8n)
- **Descripción**: Guarda nuevas citas agendadas
- **Endpoints principales**: 
  - POST /api/reservar-cita
- **Autenticación**: Bearer token (configurado en n8n)
- **Payload**: {nombre, telefono, fecha, hora, consulta}

### WhatsApp Web API
- **Descripción**: Integración directa con WhatsApp
- **Endpoints principales**: 
  - https://wa.me/5493511551011688?text=mensaje
- **Autenticación**: No requerida (enlace directo)

## Convenciones y Estándares

### Código
- **Estilo de código**: ES6+, semicolons, indentación 2 espacios
- **Nomenclatura**: camelCase para JavaScript, kebab-case para CSS
- **Documentación**: Comentarios JSDoc para funciones principales

### Git
- **Estrategia de branching**: main (desarrollo directo)
- **Convenciones de commits**: Conventional Commits (feat:, fix:, docs:)
- **Proceso de revisión**: Review manual antes de aplicar cambios

## Configuración y Despliegue

### Entorno de Desarrollo
- **Requisitos**: Navegador moderno, editor de código
- **Configuración inicial**: Clonar repositorio, abrir index.html
- **Archivo .env**: EXISTE y está configurado por el desarrollador, pero no es visible para la IA por razones de seguridad (incluido en .gitignore)
- **Variables de entorno**: 
  - WEEKS_TO_SHOW=2 (semanas de disponibilidad)
  - N8N_API_BASE_URL (URL base de n8n)
  - WHATSAPP_NUMBER=5493515101688 (actualizado en .env por el desarrollador)

### Entorno de Producción
- **Infraestructura**: Hosting estático (Netlify, Vercel, o similar)
- **Proceso de despliegue**: Upload directo de archivos estáticos
- **Monitoreo**: Google Analytics, monitoreo de uptime

## Diseño y Estética

### Paleta de Colores
**Primarios**: 
  - Rojo oscuro/bordó: #8B1F2B
  - Morado suave: #6E4B7F
  - Blanco neutro: #F9F9F9

### Tipografías
- **Títulos**: Playfair Display (elegante, profesional)
- **Texto**: Lato (legible, moderna)

### Elementos Visuales
- **Logo**: "SB" entrelazadas en tonos bordó y morado
- **Decoración**: Diseño floral sutil en borde derecho
- **Estilo**: Profesional, cálido, confiable

## Secciones del Sitio

### 1. Inicio
- **Contenido**: Hero con foto profesional, lema, botones CTA
- **Lema**: "Asesoramiento legal con compromiso humano"
- **Botones**: [Reservar consulta] [Escribime por WhatsApp]

### 2. Sobre mí
- **Contenido**: Foto profesional, experiencia, especialización
- **Horarios**: Lunes a jueves de 15:30 a 18 hs
- **Ubicación**: San Martín 165, primer piso oficina 102

### 3. Consulta / Turno
- **Contenido**: Formulario de citas, calendario dinámico
- **Integración**: n8n + Google Calendar
- **Precio**: Pendiente de confirmación

### 4. Subí tu documento - **NUEVA SECCIÓN** ✅
- **Contenido**: Formulario completo de subida de documentos legales
- **Funcionalidades**: 
  - Upload drag & drop de archivos (PDF, JPG, PNG hasta 10MB)
  - Validación completa: nombre, email, teléfono, tipo documento
  - Progress bar y estados de carga elegantes
  - Información de seguridad y confidencialidad
- **Integración**: n8n cloud para almacenamiento automático en Google Drive
- **Tipos soportados**: Escritura, contrato, poder, testamento, sucesión, hipoteca, otros
- **Backend**: Procesamiento automático y notificación por email a Sylvia

### 5. Testimonios
- **Contenido**: 3 testimonios confirmados de clientes
- **Propósito**: Generar confianza y credibilidad

### 6. Contacto
- **Contenido**: Datos completos, mapa Google Maps embed
- **Información**: Emails, WhatsApp, horarios, ubicación

## Documentación Técnica
**Especificaciones detalladas**:
  - API n8n: `docs/n8n-api-specification.md` - **NUEVO**
  - Funciones de testing: `window.CalendarDebug` (consola del navegador)
  - Configuración: `config.example.txt`

## Notas Adicionales
**Pendientes críticos**: 
  - Fotos profesionales de Sylvia (2-3 imágenes)
  - Confirmación precio de consulta

**Completados recientemente**:
  - ✅ URLs de endpoints n8n: `https://cobquecura.app.n8n.cloud/webhook/turnos-silvia`
  - ✅ Testing de nueva lógica de turnos ocupados con datos reales
  - ✅ Integración completa con Google Calendar de Sylvia
  - ✅ Archivo de testing `test-integration.html` creado
  - ✅ **🎯 SOLUCIÓN DEFINITIVA**: Validación de teléfono 100% simplificada
  - ✅ **Solo números**: Usuario escribe `3512527095` sin formato
  - ✅ **Regex simple**: Frontend y backend usan `/^\d{10,12}$/`
  - ✅ **Sin formateo**: Eliminada toda lógica compleja de formateo automático
  - ✅ **Documentación nueva**: `docs/nueva-regex-backend.md` para implementar en n8n
  - ✅ Fechas de ejemplo actualizadas (22/07/2025)
**Contactos importantes**: 
  - Cliente: Sylvia Bucai
  - WhatsApp: 351-155 101688
  - Emails: sylviabucai@hotmail.com / sylviabucai@gmail.com
**Referencias**: Documento técnico original con especificaciones completas 

## Sistema de Citas (Actualizado 22/07/2025)

### Validación de Teléfono - SIMPLIFICADA ✅
- **Filosofía**: "Menos es más" - Solo números, sin formateo
- **Regex actual**: `/^\d{10,12}$/` (solo dígitos, 10-12 caracteres)
- **UX**: Usuario escribe `3512527095` directamente, sin símbolos
- **Backend**: Misma regex `/^\d{10,12}$/` para consistencia total
- **Resultado**: Sin falsos negativos, sin errores de formato

### Notificaciones de Usuario ✅ - **MEJORADO**
- **Funciones citas**: `showSuccessMessage()` y `showErrorMessage()` (calendar.js)
- **Funciones documentos**: `showDocumentSuccessMessage()` y `showDocumentErrorMessage()` (documents.js)
- **Solución recursión**: Nombres únicos para evitar conflictos de scope global
- **Estilo**: Notificaciones flotantes Bootstrap en esquina superior derecha
- **Auto-remove**: Éxito 5s, Error 7s
- **Z-index**: 9999 para aparecer sobre todo contenido
- **Responsive**: Max-width 400px para móviles
- **Fallback inteligente**: Implementación directa cuando funciones globales no disponibles

### Arquitectura de Envío de Formularios ✅
- **Responsabilidad única**: `calendar.js` maneja envío completo
- **Event listeners**: Un solo listener, sin duplicados
- **Validación**: Tiempo real en `main.js`, envío en `calendar.js`
- **Estado limpio**: Sin conflictos entre archivos JavaScript

## APIs y Integraciones

### API de Disponibilidad (n8n) ✅
- **URL**: `https://cobquecura.app.n8n.cloud/webhook/turnos-silvia`
- **Método**: GET con parámetros `fecha_inicio` y `fecha_fin`
- **Respuesta**: `{ turnos_ocupados: [...] }` (NO fechas_disponibles)
- **Procesamiento**: Frontend calcula slots disponibles automáticamente

### API de Reserva (n8n) ✅  
- **URL**: `https://cobquecura.app.n8n.cloud/webhook/turnos-silvia`
- **Método**: POST con payload completo
- **Validación backend**: Regex `/^\d{10,12}$/` para teléfono
- **Respuesta**: `{ success: "true", message: "...", appointmentId: "..." }`

### API de Documentos (n8n) ✅ - **NUEVA**
- **URL**: `https://cobquecura.app.n8n.cloud/webhook/subir-documento`
- **Método**: POST con `multipart/form-data`
- **Payload**: `{nombre, email, telefono, tipoDocumento, comentario, archivo}`
- **Validación backend**: Regex `/^\d{10,12}$/` para teléfono, validación de archivo
- **Respuesta éxito**: `{ success: true, message: "...", archivo: "nombre-final.pdf" }`
- **Respuesta error**: `{ success: false, error: "mensaje específico" }`
- **Procesamiento**: Almacenamiento en Google Drive + notificación email automática

### WhatsApp Integration ✅
- **Número**: `+5493515101688` (actualizado)
- **Funcionalidad**: Mensajes predefinidos + datos de formulario
- **Estados**: Online/Offline según horario comercial
- **Analytics**: Tracking básico de interacciones

## Convenciones Técnicas

### Validación de Formularios - ACTUALIZADA ✅
```javascript
// ✅ NUEVA VALIDACIÓN SIMPLIFICADA
const telefonoRegex = /^\d{10,12}$/;
```

### Manejo de Estados de Carga
```javascript
// Estados visuales durante operaciones async
showLoadingState(element);
hideLoadingState(element);
```

### Debugging y Testing ✅
```javascript
// Funciones públicas para debugging - EXTENDIDO
window.CalendarDebug.showStats();           // Estadísticas de citas
window.CalendarDebug.refresh();             // Refrescar disponibilidad
window.CalendarDebug.documents.validateForm(); // Validar formulario documentos
window.CalendarDebug.documents.selectedFile(); // Ver archivo seleccionado
window.CalendarDebug.documents.resetForm();    // Reset formulario documentos
window.CalendarDebug.documents.config;      // Configuración documentos
```

## Estado del Proyecto

### ✅ Completado y Funcionando
- [x] **Estructura HTML completa** con 6 secciones (incluye documentos)
- [x] **Diseño responsive** mobile-first con Bootstrap 5
- [x] **Sistema de citas integrado** con n8n cloud
- [x] **📄 Sistema de documentos completo** con upload drag & drop funcional
- [x] **Validación de teléfono simplificada** sin errores
- [x] **Notificaciones de usuario** elegantes y sin conflictos de recursión
- [x] **WhatsApp integration** con mensajes personalizados
- [x] **Documentación técnica** completa para backend
- [x] **Testing integral** con páginas de prueba dedicadas

### 🔄 Tareas Completadas Recientemente (23/07/2025)
- [x] **📄 Sistema completo de documentos**: Nueva sección "Subí tu documento" implementada
- [x] **🔧 Drag & drop funcional**: Upload de archivos PDF/JPG/PNG hasta 10MB
- [x] **🎯 Validaciones tiempo real**: Formulario con feedback visual elegante
- [x] **🚨 CRÍTICO RESUELTO**: Error de recursión infinita en notificaciones corregido
- [x] **✅ Funciones renombradas**: `showDocumentSuccessMessage()` y `showDocumentErrorMessage()` sin conflictos
- [x] **🧪 Testing completo**: `test-documents.html` con 4 niveles de testing funcional
- [x] **📚 Documentación actualizada**: README, changelog y context actualizados
- [x] **🔗 Integración n8n**: Endpoint `/webhook/subir-documento` completamente funcional

### 📋 Pendientes
- [ ] **Imágenes reales**: Reemplazar placeholders con fotos de Sylvia
- [ ] **Contenido específico**: Ajustar textos según preferencias finales
- [ ] **Testing producción**: Validar sistema de documentos en entorno real
- [ ] **SSL Certificate**: Configurar para producción
- [ ] **Google Analytics**: Implementar tracking básico
- [ ] **SEO Optimization**: Meta tags y estructura semántica

### 🚨 Notas Importantes
- **Archivo .env**: Existe pero invisible por seguridad [[memory:3905156]]
- **URLs n8n**: Configuradas con endpoints reales y funcionando
- **Testing**: `test-integration.html` (citas) y `test-documents.html` (documentos) disponibles
- **🔧 Bug crítico resuelto**: Error de recursión infinita en documentos solucionado (23/07/2025)
- **Funciones únicas**: Notificaciones con nombres específicos para evitar conflictos
- **Estabilidad**: Sistema de documentos 100% funcional después de corrección 