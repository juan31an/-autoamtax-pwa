# 🚕 AutoAmTax - Guía de Configuración

## 📋 Resumen de Mejoras Implementadas

### ✅ Problemas Solucionados
- **Eliminadas funciones no operativas**: Quitadas las vistas de "Vehículos" y "Configuración" que solo mostraban "Próximamente"
- **Interfaz simplificada**: UI limpia y funcional enfocada en las necesidades reales de socios de taxi
- **Sistema de turnos mejorado**: Control completo de inicio/fin de turno con seguimiento en tiempo real
- **Navegación móvil optimizada**: Menú responsive que funciona correctamente en dispositivos móviles
- **Formularios funcionales**: Todos los formularios ahora tienen validación y manejo de errores

### 🆕 Funcionalidades Nuevas
- **Control de turnos en tiempo real**: Cronómetro automático, conteo de viajes, seguimiento de ganancias
- **Gestión de viajes**: Formulario intuitivo para registrar origen, destino, tarifa y método de pago
- **Registro de gastos**: Sistema categorizado (combustible, mantenimiento, comida, etc.)
- **Dashboard informativo**: Estadísticas del día en tiempo real con balance neto
- **Reportes automáticos**: Generación de reportes diarios con resumen completo
- **Historial completo**: Acceso a todos los turnos, viajes y gastos anteriores

## 🚀 Instrucciones de Configuración

### 1. Configurar Firebase

1. **Crear proyecto en Firebase**:
   - Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Haz clic en "Create a project"
   - Sigue el asistente de configuración

2. **Configurar Authentication**:
   - En tu proyecto Firebase, ve a "Authentication"
   - Haz clic en "Get started"
   - Ve a "Sign-in method" y habilita "Email/Password"

3. **Configurar Firestore Database**:
   - Ve a "Firestore Database"
   - Haz clic en "Create database"
   - Selecciona "Start in test mode" (después cambiaremos las reglas)
   - Elige una ubicación cercana

4. **Obtener credenciales**:
   - Ve a "Project Settings" (icono de engranaje)
   - Scroll down hasta "Your apps"
   - Haz clic en "Add app" > icono web (</>)
   - Registra la app con nombre "AutoAmTax"
   - Copia las credenciales del objeto `firebaseConfig`

5. **Actualizar el código**:
   - Abre `index-improved.html`
   - Busca la sección con `firebaseConfig`
   - Reemplaza los valores "YOUR_API_KEY", etc. con tus credenciales reales

### 2. Configurar Reglas de Seguridad

En la consola de Firebase, ve a "Firestore Database" > "Rules" y pega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Los usuarios solo pueden acceder a sus propios datos
    match /shifts/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /trips/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /expenses/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Permitir a los usuarios crear nuevos documentos
    match /{document=**} {
      allow create: if request.auth != null;
    }
  }
}
```

### 3. Crear Primer Usuario

1. Abre `index-improved.html` en tu navegador
2. Si no has configurado Firebase, verás un mensaje de advertencia
3. Una vez configurado, podrás registrar usuarios:
   - Temporalmente, puedes ir a Authentication > Users en Firebase Console
   - Haz clic en "Add user"
   - Crea un usuario con email y contraseña

### 4. Estructura de Datos

La aplicación creará automáticamente estas colecciones en Firestore:

#### Colección `shifts` (turnos)
```javascript
{
  userId: "string",
  startTime: "timestamp",
  endTime: "timestamp", // opcional si el turno está activo
  status: "active" | "completed",
  trips: "number",
  earnings: "number",
  expenses: "number"
}
```

#### Colección `trips` (viajes)
```javascript
{
  userId: "string",
  shiftId: "string",
  origin: "string",
  destination: "string",
  fare: "number",
  paymentMethod: "cash" | "card" | "transfer",
  timestamp: "timestamp"
}
```

#### Colección `expenses` (gastos)
```javascript
{
  userId: "string",
  shiftId: "string",
  type: "fuel" | "maintenance" | "parking" | "food" | "other",
  description: "string",
  amount: "number",
  timestamp: "timestamp"
}
```

## 📱 Características Principales

### 🎯 Dashboard Principal
- **Control de turno**: Botón grande para iniciar/finalizar turno
- **Estadísticas en tiempo real**: Viajes, ganancias, gastos y balance del día
- **Cronómetro de turno**: Muestra tiempo trabajado en tiempo real
- **Actividad reciente**: Lista de últimos viajes realizados

### 🚗 Gestión de Viajes
- **Registro rápido**: Formulario simple con origen, destino, tarifa y método de pago
- **Validación automática**: Solo permitido durante turno activo
- **Historial completo**: Lista de todos los viajes con filtros por fecha
- **Actualización automática**: Stats se actualizan inmediatamente

### 💰 Control de Gastos
- **Categorías predefinidas**: Combustible, mantenimiento, estacionamiento, comida, otros
- **Resumen automático**: Totales por categoría y general
- **Asociación con turno**: Cada gasto se vincula al turno activo

### 📊 Reportes y Analytics
- **Reporte diario**: Resumen completo del día con desglose
- **Gráficos de ganancias**: Visualización de tendencias (próximamente mensual)
- **Historial de turnos**: Acceso a todos los turnos anteriores
- **Exportación**: Capacidad de generar reportes en PDF

## 🔧 Funciones Técnicas

### Responsividad
- **Mobile-first**: Diseñado primero para dispositivos móviles
- **Touch-friendly**: Botones y controles optimizados para toques
- **Navegación adaptativa**: Menú hamburguesa en móviles, sidebar en desktop

### Performance
- **Carga rápida**: Solo librerías esenciales (Tailwind, Chart.js, Firebase)
- **Actualización eficiente**: Solo carga datos cuando es necesario
- **Caché inteligente**: Reutiliza datos en memoria cuando es posible

### Seguridad
- **Autenticación requerida**: No se puede usar sin login
- **Datos privados**: Cada usuario solo ve sus propios datos
- **Validación frontend y backend**: Doble validación de datos

## 🎨 Personalización

### Colores
Puedes cambiar los colores principales editando las variables CSS en el `<style>`:

```css
:root {
    --primary: #0f766e;        /* Color principal (teal) */
    --primary-dark: #0d5d56;   /* Color principal oscuro */
    --secondary: #f59e0b;      /* Color secundario (amber) */
    --success: #10b981;        /* Verde para ganancias */
    --danger: #ef4444;         /* Rojo para gastos */
    --info: #3b82f6;          /* Azul para información */
}
```

### Textos
Todos los textos están en español y se pueden modificar fácilmente en el HTML.

## 🐛 Solución de Problemas

### Error: "Firebase configuration not set"
- Asegúrate de haber reemplazado todas las variables "YOUR_API_KEY", etc.
- Verifica que el proyecto en Firebase Console esté configurado correctamente

### Error: "Permission denied"
- Revisa que las reglas de Firestore estén configuradas correctamente
- Asegúrate de que el usuario esté autenticado

### La app no guarda datos
- Verifica la conexión a internet
- Revisa la consola del navegador para errores
- Asegúrate de que Firestore esté habilitado en Firebase Console

### Problemas de rendimiento
- La app está optimizada para cargar rápido
- Si experimentas lentitud, puede ser por conexión lenta a internet
- Los datos se almacenan en la nube para sincronización entre dispositivos

## 📞 Soporte

Para problemas técnicos:
1. Revisa la consola del navegador (F12)
2. Verifica la configuración de Firebase
3. Asegúrate de tener conexión a internet estable

## 🚀 Próximas Mejoras

- PWA completa para instalación en móviles
- Modo offline con sincronización
- Reportes mensuales y anuales
- Integración con mapas para tracking GPS
- Sistema de metas y objetivos
- Backup automático de datos