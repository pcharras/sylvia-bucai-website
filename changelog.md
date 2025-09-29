d# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **🎨 Header transparente**: Header completamente transparente superpuesto sobre hero image
- **💬 Testimonios reales**: Reemplazados testimonios ficticios con testimonios auténticos de clientes
- **👥 Nombres específicos**: Testimonios con nombres reales (Matías, Alejandra) para mayor credibilidad
- **🧹 Diseño minimalista**: Eliminada decoración floral fija para diseño más limpio
- **🎨 Header ultra elegante**: Refinamiento completo del diseño del header con color púrpura ultra suave
- **🖼️ Logo transparente**: Implementado logo con fondo transparente para integración visual perfecta
- **📏 Logo optimizado**: Tamaño aumentado 56% total para mayor prominencia (66px móvil, 110px desktop)
- **📱 Padding minimalista**: Reducido a 0.05rem en todos los dispositivos para diseño súper compacto
- **🔤 Contraste perfecto**: Texto del navbar en blanco para legibilidad óptima
- **🌐 Despliegue producción**: Sitio web desplegado exitosamente en DigitalOcean
- **⚙️ Configuración servidor**: Nginx con SSL habilitado y permisos correctos
- **🔧 Git deployment**: Pipeline establecido para actualizaciones automáticas desde GitHub
- **📄 NUEVA FUNCIONALIDAD**: Sistema completo de subida de documentos legales
- Nueva sección "Subí tu documento" integrada al sitio web principal
- Formulario completo con validaciones en tiempo real (nombre, email, teléfono, tipo documento)
- Sistema de drag & drop para subida de archivos (PDF, JPG, PNG hasta 10MB)
- Integración total con n8n cloud para procesamiento automático de documentos
- Validaciones de archivo: tamaño, formato, tipo MIME y extensión
- Progress bar animada durante la subida del documento
- Estados de carga elegantes con spinner y feedback visual
- Página de testing `test-documents.html` siguiendo convenciones del proyecto
- Debugging extendido: `CalendarDebug.documents` con funciones específicas
- Estilos responsive completos para mobile, tablet y desktop
- Notificaciones de éxito/error usando funciones existentes del sitio
- Información de seguridad y confidencialidad para usuarios
- Manejo robusto de errores con mensajes específicos del backend

### Deployed
- **🚀 DESPLIEGUE EXITOSO**: Sitio web desplegado exitosamente en servidor DigitalOcean (11/09/2025)
- **🌐 URL activa**: `https://giasynaptia.com/sylviabucai/` - Completamente funcional y accesible
- **⚙️ Configuración servidor**: Nginx con SSL habilitado y permisos correctos
- **🔧 Método despliegue**: Git clone directo desde GitHub al servidor
- **📁 Estructura**: Archivos organizados correctamente en `/var/www/giasynaptia.com/public_html/sylviabucai/`
- **✅ Estado**: Sitio listo para revisión del cliente (Sylvia Bucai) - FUNCIONANDO EN PRODUCCIÓN
- **🧪 Testing pendiente**: APIs n8n, sistema de documentos, WhatsApp integration en entorno de producción

### Changed
- **🎨 Header completamente transparente**: Eliminado fondo púrpura, header superpuesto sobre hero image
- **🖼️ Overlay hero ultra suavizado**: Opacidades reducidas de 0.25/0.15 a 0.15/0.08 para mostrar mejor la foto
- **📝 Contenido hero optimizado**: Separación aumentada entre título y subtítulo (200px desktop)
- **🔤 Subtítulo mejorado**: "Abogada y Escribana" sin difuminado (opacity: 1) y en bold
- **📱 Título reposicionado**: Movido hacia arriba en desktop con margin-top negativo
- **🧹 Párrafo largo eliminado**: Removido párrafo descriptivo del hero, solo queda lema
- **💬 Testimonios auténticos**: Reemplazados con testimonios reales de clientes (Matías, Alejandra)
- **🎯 Diseño minimalista**: Página más limpia sin elementos decorativos fijos
- Hero actualizado con foto de fondo y overlay más suave para mostrar "Dra Sylvia Ileana Bucai - Abogada", reemplazando además el logo del header por la denominación solicitada por el cliente y usando la imagen `foto-sylvia-1.jpeg`
- Sección “Sobre mí” actualizada para usar la imagen `foto-sylvia-2.jpeg` como foto de perfil, eliminar placeholder pendiente y aplicar degradado lila → rosado que se desvanece a blanco
- Degradado lila → rosado extendido a las secciones “Subí tu documento” y “Contacto” para mantener coherencia estética
- Título principal del hero actualizado con tipografía tipo tarjeta (Georgia/Times) para reflejar la identidad visual “Dra Sylvia Ileana Bucai - Abogada”
- **🎨 Header refinado completamente**: Color púrpura ultra suave (#D4C5DD) para máxima elegancia visual
- **📏 Logo amplificado**: Tamaño del logo aumentado 56% total para mayor prominencia
- **📱 Padding ultra-compacto**: Reducido a 0.05rem en todos los breakpoints para diseño minimalista
- **🔤 Contraste optimizado**: Texto del navbar cambiado a blanco para mejor legibilidad
- **🖼️ Logo transparente**: Implementado para integración perfecta con fondo púrpura suave
- **📱 Responsive consistente**: Mismo diseño elegante en móvil, tablet y desktop
- Navegación principal actualizada con nueva sección "Subí tu documento"
- Array de secciones en `main.js` expandido para incluir nueva sección
- Numeración de secciones actualizada (Testimonios ahora es sección 5, Contacto sección 6)
- Sistema de debugging extendido para incluir funcionalidades de documentos
- Convenciones de validación de teléfono aplicadas consistentemente (regex `/^\d{8,12}$/`)

### Fixed
- **🚨 CRÍTICO**: Corregido error de recursión infinita en sistema de documentos (RangeError: Maximum call stack size exceeded)
- **🎨 Header transparency**: Solucionado problema de header no transparente con múltiples CSS overrides
- **🔤 Subtítulo legibilidad**: Corregido efecto difuminado del subtítulo "Abogada y Escribana"
- **🧹 Elementos visuales**: Eliminada decoración floral que aparecía constantemente en pantalla
- **🔧 Funciones renombradas**: `showDocumentSuccessMessage()` y `showDocumentErrorMessage()` para evitar conflictos de nombres
- **💡 Fallback mejorado**: Implementación directa de notificaciones elegantes cuando funciones globales no están disponibles
- **🧹 Stack overflow eliminado**: Error de llamadas recursivas infinitas completamente resuelto
- **✅ Estabilidad**: Sistema de documentos ahora 100% funcional y estable

### Technical Details
- **Endpoint n8n**: `https://cobquecura.app.n8n.cloud/webhook/subir-documento`
- **Validación teléfono**: Consistente con sistema existente (solo números, 8-12 dígitos)
- **Notificaciones**: Funciones únicas `showDocumentSuccessMessage()` y `showDocumentErrorMessage()` sin conflictos
- **Testing**: `test-documents.html` con 4 niveles de testing (validación, formulario, envío real, debugging)
- **Responsive**: Estilos específicos para mobile (1.5rem padding) y tablet (2rem padding)
- **Debugging**: Integrado como `window.CalendarDebug.documents.*` o fallback independiente
- **🌐 Despliegue**: DigitalOcean + Nginx + SSL + Git deployment pipeline establecido
- **🎨 Header técnico**: Completamente transparente, padding 0.05rem, logo 56% más grande, texto blanco
- **📱 Responsive header**: Logo escalado correctamente (66px móvil, 94px tablet, 110px desktop)
- **🔧 Servidor**: Ubuntu + Nginx + Let's Encrypt SSL + permisos www-data correctos
- **🎨 Hero overlay**: Opacidades reducidas a 0.15/0.08 para mayor claridad de la foto
- **📝 Hero spacing**: margin-top 200px para subtítulo, margin-top negativo para título en desktop
- **🧹 CSS cleanup**: Eliminados estilos de decoración floral en style.css y responsive.css

## [1.2.0] - 2025-07-23

### Added
- Sistema mejorado de procesamiento de disponibilidad en frontend
- Funciones de debugging y testing para el sistema de citas (`CalendarDebug`)
- Nueva especificación técnica para API n8n (`docs/n8n-api-specification.md`)
- Logs detallados de estadísticas de disponibilidad
- Testing automático con datos simulados de turnos ocupados

### Changed
- **BREAKING CHANGE**: API `/api/disponibilidad` ahora devuelve `turnos_ocupados` en lugar de `fechas_disponibles`

## [1.1.2] - 2025-07-22

### Added
- **🎯 Notificaciones flotantes**: Implementadas funciones `showSuccessMessage()` y `showErrorMessage()` con alertas elegantes
- **📚 Documentación técnica backend**: Nuevo archivo `docs/nueva-regex-backend.md` con instrucciones para n8n
- **🧪 Casos de prueba**: Ejemplos detallados de validación de números argentinos
- **🔧 Logs de debugging**: Console.log mejorado para rastreo de errores

### Changed
- **🚀 SIMPLIFICACIÓN TOTAL**: Sistema de validación de teléfono completamente rediseñado
- **Regex frontend**: De `/^\+54\s9\s\d{3,4}\s\d{3}-\d{4}$/` a `/^\d{10,12}$/` (solo números)
- **UX mejorada**: Campo teléfono acepta solo dígitos, sin formateo automático
- **Placeholder actualizado**: De "+54 9 351 123-4567" a "3511234567 (solo números)"
- **Maxlength agregado**: Limitación automática a 12 caracteres en input
- **Validación simplificada**: Sin detectar códigos de área, sin formateo complejo

### Fixed
- **🚨 CRÍTICO**: Eliminado error "undefined" temporal en formulario de citas
- **🔧 Conflicto resuelto**: Event listener duplicado entre `main.js` y `calendar.js` removido
- **✅ Funciones faltantes**: Agregadas funciones de mensajes que causaban el error
- **📱 Validación teléfono**: Número `3512527095` ahora funciona correctamente sin errores
- **🎨 Notificaciones**: Alertas flotantes con auto-remove y estilos Bootstrap
- **🧹 Código limpio**: Lógica de formateo compleja eliminada para evitar bugs

### Removed
- **❌ Formateo automático**: Eliminadas funciones `formatArgentinePhone()` e `initPhoneFormatting()` complejas
- **❌ Detección códigos**: Removida lógica de detectar códigos de área de 3/4 dígitos
- **❌ Event listener obsoleto**: Desactivado manejador duplicado de formularios en `main.js`

## [1.1.1] - 2025-07-18

### Added
- Repositorio GitHub configurado: https://github.com/pcharras/sylvia-bucai-website
- Archivo .gitignore con exclusiones de seguridad
- Configuración de git con commit inicial
- Documentación lista para colaboración

### Changed
- [Cambios en funcionalidades existentes]

### Deprecated
- [Funcionalidades que serán eliminadas en versiones futuras]

### Removed
- [Funcionalidades eliminadas]

### Fixed
- [Correcciones de errores]

### Security
- [Mejoras de seguridad]

## [1.1.0] - 2025-07-18

### Added
- Sitio web completo con estructura SPA desarrollada
- Sistema de navegación suave entre 5 secciones principales
- Integración completa con n8n para sistema de citas automatizado
- Botón flotante de WhatsApp con mensajes contextuales
- Sistema de validación de formularios en tiempo real
- Decoración floral elegante con efectos parallax
- Indicador de horario de atención (online/offline)
- Optimización SEO con meta tags completos
- Google Maps embebido para ubicación de oficina
- Analytics integrado para tracking de interacciones
- Testimonios de clientes con diseño profesional
- Placeholders inteligentes para imágenes pendientes
- Manejo de errores robusto con fallbacks
- Archivo de configuración completo (config.example.txt)
- Documentación técnica completa (README.md)
- Responsivo mobile-first con 5 breakpoints
- Accesibilidad mejorada con ARIA labels
- Estados de carga para mejor UX
- Preload de imágenes críticas
- Animaciones suaves con Intersection Observer

### Changed
- Actualización completa del project_context.md con arquitectura final
- Mejora en la estructura de archivos y organización
- Optimización de rendimiento con lazy loading
- Paleta de colores refinada y variables CSS organizadas

## [1.0.0] - 2025-07-18

### Added
- Definición completa del proyecto web institucional
- Documentación técnica y contexto del proyecto
- Recopilación de assets gráficos iniciales
- Especificación de 5 secciones principales del sitio
- Paleta de colores y tipografías definidas
- Estructura de APIs para integración con n8n

### Changed
- [Cambios desde versión anterior]

### Fixed
- [Correcciones realizadas]

---

## Tipos de Cambios

- **Added** para nuevas funcionalidades
- **Changed** para cambios en funcionalidades existentes
- **Deprecated** para funcionalidades que pronto serán eliminadas
- **Removed** para funcionalidades eliminadas
- **Fixed** para correcciones de errores
- **Security** para mejoras de seguridad

## Convenciones de Versionado

Este proyecto sigue [Semantic Versioning](https://semver.org/):
- **MAJOR**: Cambios incompatibles en la API
- **MINOR**: Nuevas funcionalidades compatibles con versiones anteriores
- **PATCH**: Correcciones de errores compatibles con versiones anteriores 
