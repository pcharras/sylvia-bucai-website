# Sitio Web - Sylvia Bucai | Abogada y Escribana

Sitio web institucional para abogada independiente, orientado a clientes B2C, desarrollado con tecnologías web modernas y integración con n8n para sistema de citas.

## 🎯 Características

- **SPA (Single Page Application)** con navegación suave
- **Responsive Design** con enfoque mobile-first
- **Sistema de citas** integrado con n8n
- **📄 Sistema de documentos** con upload drag & drop (NUEVO)
- **Botón flotante de WhatsApp** con mensajes contextuales
- **Optimización SEO** para búsquedas locales
- **Google Maps** embebido para ubicación
- **Testimonios** de clientes
- **Formulario de contacto** con validación
- **Decoración floral** elegante y profesional

## 📋 Secciones del Sitio

1. **Inicio** - Hero con información principal y CTAs
2. **Sobre mí** - Experiencia profesional y horarios
3. **Consulta / Turno** - Sistema de citas con calendario
4. **📄 Subí tu documento** - Sistema de upload de documentos legales (NUEVO)
5. **Testimonios** - Opiniones de clientes
6. **Contacto** - Información completa y mapa

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **Bootstrap 5** - Framework responsive
- **JavaScript ES6+** - Funcionalidad interactiva
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografías (Playfair Display + Lato)

## 🎨 Diseño

### Paleta de Colores
- **Primario**: #8B1F2B (Rojo bordó)
- **Secundario**: #6E4B7F (Morado suave)
- **Neutro**: #F9F9F9 (Blanco)

### Tipografías
- **Títulos**: Playfair Display (elegante, profesional)
- **Texto**: Lato (legible, moderna)

## 🚀 Instalación y Configuración

### 1. Configuración Inicial

```bash
# Clonar el repositorio
git clone [repository-url]

# Navegar al directorio
cd sylvia-bucai-website

# Crear archivo de configuración
cp config.example.txt .env
```

### 2. Configurar Variables de Entorno

Editar el archivo `.env` con los valores reales:

```env
# Críticas (OBLIGATORIAS)
N8N_API_BASE_URL=https://cobquecura.app.n8n.cloud
WHATSAPP_NUMBER=5493515101688
SITE_URL=https://sylviabucai.com
CONTACT_EMAIL=sylviabucai@gmail.com

# Opcionales
GA_TRACKING_ID=G-XXXXXXXXXX
GOOGLE_MAPS_API_KEY=your-api-key
```

### 3. Agregar Fotos Profesionales

Colocar las fotos en la carpeta `assets/images/`:
- `sylvia-principal.jpg` - Foto principal (sección Inicio)
- `sylvia-perfil.jpg` - Foto de perfil (sección Sobre mí)

### 4. Configurar n8n

Crear los siguientes workflows en n8n:

#### Endpoint GET `/api/disponibilidad`
```json
{
  "fechas_disponibles": [
    {
      "fecha": "2025-07-20",
      "horarios": ["15:30", "16:00", "16:30", "17:00", "17:30"]
    }
  ]
}
```

#### Endpoint POST `/api/reservar-cita`
```json
{
  "nombre": "string",
  "telefono": "string",
  "fecha": "YYYY-MM-DD",
  "hora": "HH:MM",
  "consulta": "string"
}
```

#### 📄 Endpoint POST `/api/subir-documento` (NUEVO)
```json
{
  "nombre": "string",
  "email": "string", 
  "telefono": "string",
  "tipoDocumento": "string",
  "comentario": "string",
  "archivo": "File (PDF/JPG/PNG, máx 10MB)"
}
```

## 📱 Funcionalidades WhatsApp

### Mensajes Predefinidos
- **General**: "Hola Sylvia, estoy interesado/a en una consulta legal"
- **Citas**: Incluye datos del formulario automáticamente
- **Contacto**: Mensaje contextual desde sección contacto

### Horarios de Atención
- **Días**: Lunes a Jueves
- **Horario**: 15:30 a 18:00 hs
- **Indicador**: Muestra estado online/offline

## 🗂️ Estructura del Proyecto

```
src/
├── index.html                 # Página principal
├── css/
│   ├── style.css             # Estilos principales
│   └── responsive.css        # Media queries
├── js/
│   ├── main.js              # Funcionalidad principal
│   ├── whatsapp.js          # Integración WhatsApp
│   ├── calendar.js          # Sistema de citas
│   └── documents.js         # Sistema de documentos (NUEVO)
├── assets/
│   ├── images/              # Fotos profesionales
│   ├── logo 3.png           # Logo oficial
│   ├── diseño floral 2.png  # Decoración floral
│   └── diseño floreal.png   # Decoración alternativa
├── test-integration.html     # Testing sistema de citas
├── test-documents.html      # Testing sistema de documentos (NUEVO)
├── config.example.txt       # Plantilla de configuración
├── project_context.md      # Contexto del proyecto
├── changelog.md           # Registro de cambios
└── README.md              # Este archivo
```

## 🌐 Despliegue

### Hosting Estático
El sitio puede desplegarse en cualquier hosting estático:
- **Netlify** (recomendado)
- **Vercel**
- **GitHub Pages**
- **Hosting tradicional**

### Pasos de Despliegue

1. **Configurar variables de entorno** en la plataforma
2. **Subir archivos** al hosting
3. **Configurar n8n** con las URLs finales
4. **Probar integración** de citas y WhatsApp
5. **Configurar dominio** y SSL

## 📊 Monitoreo y Analytics

### Google Analytics
- Configurar `GA_TRACKING_ID` en `.env`
- Eventos automáticos para clics de WhatsApp
- Tracking de envío de formularios

### Métricas Importantes
- Tiempo en página
- Tasa de conversión de citas
- Interacciones con WhatsApp
- Dispositivos más utilizados

## 🔧 Mantenimiento

### Actualización de Contenido
- **Testimonios**: Agregar nuevos en `index.html`
- **Horarios**: Modificar en `config.example.txt`
- **Información**: Actualizar secciones según necesidad

### Actualizaciones Técnicas
- Revisar `changelog.md` para cambios
- Actualizar `project_context.md` con nuevas features
- Mantener dependencias actualizadas

## 🛡️ Seguridad

### Buenas Prácticas
- ✅ Nunca commitear archivos `.env`
- ✅ Usar HTTPS en producción
- ✅ Validar datos del formulario
- ✅ Sanitizar inputs antes de enviar

### Configuración SSL
- Certificado SSL automático en Netlify/Vercel
- Redirección HTTPS configurada
- Headers de seguridad implementados

## 📞 Soporte

### Información de Contacto
- **Cliente**: Sylvia Bucai
- **Email**: sylviabucai@gmail.com
- **WhatsApp**: 351-155 101688
- **Dirección**: San Martín 165, primer piso oficina 102, Córdoba Capital

### Resolución de Problemas

#### Citas no funcionan
1. Verificar `N8N_API_BASE_URL` en `.env`
2. Comprobar que n8n esté activo
3. Revisar logs del navegador (F12)

#### WhatsApp no abre
1. Verificar `WHATSAPP_NUMBER` en configuración
2. Probar en dispositivo móvil
3. Verificar formato del número

#### Imágenes no cargan
1. Verificar que las fotos estén en `assets/images/`
2. Comprobar nombres de archivo
3. Revisar permisos de archivos

## 🧪 Testing y Debugging

### Testing de APIs
1. **Testing de citas**: Abrir `test-integration.html` en el navegador
2. **📄 Testing de documentos**: Abrir `test-documents.html` en el navegador (NUEVO)
3. **Probar disponibilidad**: Hacer clic en "Probar Disponibilidad"
4. **⚠️ Probar reserva/documentos**: CUIDADO - creará cita/documento real en sistema de Sylvia

### Debugging en Producción
```javascript
// En consola del navegador (F12)
window.CalendarDebug.showStats();              // Ver estadísticas de citas
window.CalendarDebug.refresh();                // Refrescar disponibilidad
window.CalendarDebug.getConfig();              // Ver configuración actual

// 📄 NUEVO - Debugging de documentos
window.CalendarDebug.documents.validateForm(); // Validar formulario documentos
window.CalendarDebug.documents.selectedFile(); // Ver archivo seleccionado
window.CalendarDebug.documents.resetForm();    // Reset formulario documentos
window.CalendarDebug.documents.config;         // Ver configuración documentos

// Probar con datos específicos
const testData = {
  turnos_ocupados: [
    { fecha: "2025-07-21", horarios: ["15:30", "17:00"] }
  ]
};
window.CalendarDebug.testOccupiedSlots(testData);
```

### URLs de APIs en Funcionamiento
- **GET Disponibilidad**: `https://cobquecura.app.n8n.cloud/webhook/turnos-silvia?fecha_inicio=YYYY-MM-DD&fecha_fin=YYYY-MM-DD`
- **POST Reservar**: `https://cobquecura.app.n8n.cloud/webhook/turnos-silvia`
- **📄 POST Documentos**: `https://cobquecura.app.n8n.cloud/webhook/subir-documento` (NUEVO)

## 📝 Licencia

Este proyecto fue desarrollado específicamente para Sylvia Bucai - Abogada y Escribana.

## 🎉 Créditos

- **Desarrollo**: Sitio web desarrollado con tecnologías modernas
- **Diseño**: Paleta de colores y tipografías profesionales
- **Integración**: Sistema de citas con n8n
- **Optimización**: SEO y responsive design

---

**Versión**: 1.2.0  
**Fecha**: Julio 2025  
**Estado**: APIs integradas y funcionando ✅  
**n8n**: Conectado a Google Calendar + Google Drive de Sylvia ✅  
**📄 NUEVO**: Sistema de documentos completamente funcional ✅ 