# 🔧 Especificación API n8n - Turnos Ocupados

## 📋 Resumen de Cambios

**Fecha:** 18 de Julio, 2025  
**Cambio principal:** El endpoint `/api/disponibilidad` ahora devuelve **turnos ocupados** en lugar de turnos disponibles.  
**Procesamiento:** El frontend calcula los horarios disponibles restando los ocupados de todos los posibles.

---

## 🎯 ENDPOINT 1: Obtener Turnos Ocupados

### **Configuración del Endpoint:**
```
Método: GET
URL: https://cobquecura.app.n8n.cloud/webhook/turnos-silvia
Content-Type: application/json
```

### **Parámetros de Query:**
| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| `fecha_inicio` | string | ✅ **Sí** | Fecha inicio en formato YYYY-MM-DD | `2025-07-19` |
| `fecha_fin` | string | ✅ **Sí** | Fecha fin en formato YYYY-MM-DD | `2025-08-02` |

### **🆕 Nueva Respuesta Esperada:**
```json
{
  "turnos_ocupados": [
    {
      "fecha": "2025-07-24",
      "horarios": ["15:30", "17:00"]
    },
    {
      "fecha": "2025-07-25", 
      "horarios": ["16:00"]
    },
    {
      "fecha": "2025-07-29",
      "horarios": ["15:30", "16:00", "16:30", "17:00", "17:30"]
    }
  ]
}
```

### **📊 Lógica de n8n:**

1. **Consultar Google Calendar** de Sylvia en el rango de fechas
2. **Filtrar solo días laborables** (Lunes-Jueves)
3. **Excluir feriados** automáticamente
4. **Devolver únicamente horarios ocupados** por fecha
5. **Omitir fechas sin citas** (no incluir en la respuesta)

---

## 🎯 ENDPOINT 2: Reservar Cita (Sin Cambios)

### **Configuración del Endpoint:**
```
Método: POST
URL: https://cobquecura.app.n8n.cloud/webhook/turnos-silvia
Content-Type: application/json
```

### **Payload de Entrada:**
```json
{
  "nombre": "María González",
  "telefono": "+54 9 351 123-4567", 
  "fecha": "2025-07-30",
  "hora": "16:00",
  "consulta": "Consulta sobre compraventa de inmueble"
}
```

### **⚠️ Validaciones Críticas:**
| Campo | Validación | Ejemplo Válido | Regex |
|-------|------------|----------------|-------|
| `nombre` | Requerido, min 2 caracteres | `"María González"` | - |
| `telefono` | **FORMATO EXACTO** | `"+54 9 351 123-4567"` | `/^\+54\s9\s\d{3,4}\s\d{3}-\d{4}$/` |
| `fecha` | Requerido, formato YYYY-MM-DD | `"2025-07-21"` | - |
| `hora` | Requerido, horario válido | `"16:00"` | - |
| `consulta` | Requerido, max 500 caracteres | `"Consulta legal..."` | - |

**🚨 IMPORTANTE:** El teléfono debe tener **exactamente** este formato: `+54 9 351 123-4567` (con espacios y guión).

### **📱 Códigos de Área Argentinos Soportados:**
| Tipo | Código | Formato Final | Ejemplo Input | Ejemplo Output |
|------|--------|---------------|---------------|----------------|
| **3 dígitos** | 351, 011, 221, 261 | `+54 9 351 1234-5678` | `3511234567` | `+54 9 351 1234-5670` |
| **4 dígitos** | 3512, 3514, etc. | `+54 9 3512 123-4567` | `3512527095` | `+54 9 3512 527-0950` |

**💡 NOTA:** Para códigos de 4 dígitos, si el número local tiene menos de 7 dígitos, se completa automáticamente con ceros al final.

### **Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Cita reservada exitosamente",
  "appointmentId": "CITA-2025-001",
  "details": {
    "nombre": "María González",
    "fecha": "2025-07-21", 
    "hora": "16:00",
    "estado": "confirmada"
  }
}
```

---

## 💻 Procesamiento en Frontend

### **🔄 Flujo de Cálculo:**

1. **API devuelve:** Turnos ocupados por fecha
2. **Frontend calcula:** Horarios disponibles = `TODOS_LOS_HORARIOS` - `HORARIOS_OCUPADOS`
3. **Frontend muestra:** Solo fechas con al menos 1 horario disponible

### **⚙️ Configuración de Horarios:**
```javascript
const CALENDAR_CONFIG = {
  timeSlots: [
    '15:30', '16:00', '16:30', '17:00', '17:30'
  ],
  businessHours: {
    start: '15:30',
    end: '18:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday']
  }
};
```

### **📅 Ejemplo de Cálculo:**
```javascript
// Input del API:
{
  "turnos_ocupados": [
    { "fecha": "2025-07-21", "horarios": ["15:30", "17:00"] }
  ]
}

// Cálculo en frontend:
TODOS_LOS_HORARIOS = ["15:30", "16:00", "16:30", "17:00", "17:30"]
OCUPADOS = ["15:30", "17:00"]
DISPONIBLES = ["16:00", "16:30", "17:30"]

// Output para usuario:
"2025-07-21": 3 horarios disponibles
```

---

## 🧪 Testing y Debugging

### **Testing en Consola del Navegador:**
```javascript
// Probar con datos simulados
const testData = {
  turnos_ocupados: [
    { fecha: "2025-07-24", horarios: ["15:30", "17:00"] },
    { fecha: "2025-07-25", horarios: ["16:00"] }
  ]
};

const result = window.CalendarDebug.testOccupiedSlots(testData);
console.log('Fechas disponibles:', result);

// Ver estadísticas
window.CalendarDebug.showStats();
```

### **Logs Esperados:**
```
🔄 Procesando turnos ocupados desde API
🕐 Fecha: 2 ocupados, 3 disponibles
🕐 Fecha: 1 ocupados, 4 disponibles
✅ Procesados 2 días con horarios disponibles
📊 Estadísticas de disponibilidad:
   📅 Días con horarios: 2
   🕐 Total slots disponibles: 7
   📅 2025-07-24: 16:00, 16:30, 17:30
   📅 2025-07-25: 15:30, 16:30, 17:00, 17:30
```

---

## 🚀 Ventajas del Nuevo Sistema

### **🎯 Para n8n:**
- ✅ **Más simple:** Solo consulta Google Calendar por eventos existentes
- ✅ **Más eficiente:** No calcula disponibilidad, solo lista ocupados
- ✅ **Menos lógica de negocio:** Frontend maneja horarios y reglas

### **🎯 Para Frontend:**
- ✅ **Control total:** Maneja toda la lógica de disponibilidad
- ✅ **Fácil debugging:** Funciones de testing integradas
- ✅ **Flexibilidad:** Cambio de horarios sin tocar backend
- ✅ **Mejor UX:** Cálculo instantáneo en cliente

### **🎯 Para Mantenimiento:**
- ✅ **Separación clara:** Backend = datos, Frontend = lógica
- ✅ **Testing independiente:** Cada parte se puede probar por separado
- ✅ **Escalabilidad:** Fácil agregar nuevos horarios o reglas

---

## 📋 Checklist de Implementación

### **Backend n8n: ✅ COMPLETADO**
- [x] Webhook `/webhook/turnos-silvia` configurado y funcionando
- [x] Respuesta en formato `turnos_ocupados` implementada
- [x] Conectado con Google Calendar de Sylvia
- [x] Probado con datos reales
- [x] Casos edge documentados

### **Frontend (✅ Completado):**
- [x] Nueva función `processOccupiedSlots()`
- [x] Nueva función `calculateAvailableSlots()`
- [x] Modificar `fetchAvailability()`
- [x] Actualizar simulación de datos
- [x] Agregar funciones de debugging
- [x] Testing en consola disponible

### **Testing Final:**
- [x] Probar endpoint real de n8n
- [x] Verificar cálculo de disponibilidad  
- [ ] Validar reserva de citas ⚠️ **USAR CON PRECAUCIÓN**
- [ ] Confirmar emails automáticos
- [ ] Testing en móvil y desktop

### **Testing Herramientas:**
- [x] Archivo `test-integration.html` creado para testing de APIs
- [x] Funciones de debugging integradas en frontend (`window.CalendarDebug`)
- [x] URLs reales configuradas en código

---

## 🔗 Enlaces Relacionados

- **Código modificado:** `js/calendar.js` (URLs reales configuradas)
- **Configuración:** `config.example.txt` (URL real: `https://cobquecura.app.n8n.cloud`)
- **Documentación:** `README.md`
- **Testing:** 
  - Consola del navegador → `window.CalendarDebug`
  - Archivo de testing: `test-integration.html`
  - URLs en funcionamiento: GET y POST `/webhook/turnos-silvia` 