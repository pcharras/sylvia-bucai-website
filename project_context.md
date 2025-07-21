# Contexto del Proyecto

## Información General
- **Nombre del proyecto**: Sitio Web Sylvia Bucai - Abogada
- **Descripción**: Sitio web institucional para abogada independiente, orientado a clientes individuales (B2C), que transmite profesionalismo, cercanía y confianza
- **Versión actual**: 1.0.0
- **Fecha de inicio**: 18 de julio de 2025
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
│   ├── main.js           # Funcionalidad principal
│   ├── calendar.js       # Gestión de citas
│   └── whatsapp.js       # Integración WhatsApp
├── assets/
│   ├── logo 3.png        # Logo oficial "SB"
│   ├── diseño floral 2.png  # Diseño floral decorativo
│   ├── diseño floreal.png   # Diseño floral alternativo
│   └── images/           # Fotos profesionales (pendientes)
├── .env                  # Variables de configuración
├── project_context.md    # Documentación del proyecto
└── changelog.md         # Registro de cambios
```

### Tecnologías Principales
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript Vanilla
- **Backend**: n8n para automatización de citas
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

### Sistema de Citas
- **Propósito**: Gestión de disponibilidad y reserva de turnos
- **Ubicación**: js/calendar.js
- **Dependencias**: APIs de n8n, Google Calendar

### Botón Flotante WhatsApp
- **Propósito**: Contacto directo con mensaje predefinido
- **Ubicación**: js/whatsapp.js
- **Dependencias**: WhatsApp Web API

## APIs y Interfaces Importantes

### API de Disponibilidad (n8n)
- **Descripción**: Consulta horarios disponibles para citas
- **Endpoints principales**: 
  - GET /api/disponibilidad?fecha_inicio=YYYY-MM-DD&fecha_fin=YYYY-MM-DD
- **Autenticación**: Bearer token (configurado en n8n)

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
- **Variables de entorno**: 
  - WEEKS_TO_SHOW=2 (semanas de disponibilidad)
  - N8N_API_BASE_URL (URL base de n8n)
  - WHATSAPP_NUMBER=5493511551011688

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

### 4. Testimonios
- **Contenido**: 3 testimonios confirmados de clientes
- **Propósito**: Generar confianza y credibilidad

### 5. Contacto
- **Contenido**: Datos completos, mapa Google Maps embed
- **Información**: Emails, WhatsApp, horarios, ubicación

## Notas Adicionales
**Pendientes críticos**: 
  - Fotos profesionales de Sylvia (2-3 imágenes)
  - URLs de endpoints n8n
  - Confirmación precio de consulta
**Contactos importantes**: 
  - Cliente: Sylvia Bucai
  - WhatsApp: 351-155 101688
  - Emails: sylviabucai@hotmail.com / sylviabucai@gmail.com
**Referencias**: Documento técnico original con especificaciones completas 