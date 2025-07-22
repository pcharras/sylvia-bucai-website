# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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