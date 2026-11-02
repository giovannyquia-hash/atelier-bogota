# Atelier Bogotá - Plataforma On-Demand de Alta Costura & Sastrería VIP a Domicilio

> Ecosistema logístico *Asset-Light* tipo Uber para sastrería a medida y arreglos de alta costura en Bogotá (Rosales, El Chicó, La Cabrera, Santa Ana y Santa Bárbara).

---

## 🌟 Visión del Negocio

Atelier Bogotá conecta a los mejores sastres artesanos de la ciudad (trasladándose en sus propios vehículos) con clientes VIP de altos ingresos en el norte y los Cerros Orientales de Bogotá.

### Pilares del Modelo:
1. **Asset-Light**: Cero inversión en flota vehicular ni altos arriendos de locales comerciales. Los sastres operan de forma móvil e independiente.
2. **Ficha de Medidas Digital Permanente**: Patronaje anatómico almacenado en la nube para confección o ajustes continuos sin necesidad de volver a medir.
3. **Pauta Digital Segmentada**: Estrategia de captación con Meta Conversions API (CAPI) dirigida exclusivamente a códigos postales de estratos 5 y 6.
4. **Tarifas Transparentes & Cotizador en Sitio**: Ajustes calculados in situ con firma del cliente y pre-autorización en pasarelas locales (Bold, ePayco, PayU).

---

## 📱 Módulos del Sistema

### 1. App Cliente VIP
- Agendamiento On-Demand (15-25 min) o Programado con selección de horario.
- Ficha de medidas digital completa (Pecho, Cintura, Hombros, Largo Talle, Manga, Tiro, etc.).
- Rastreo en tiempo real del vehículo del sastre sobre el mapa de Bogotá.
- Línea de tiempo de 5 pasos del estado de las prendas.
- Pasarela de pagos local compatible con tarjetas Black/Infinite/Amex.

### 2. App Sastre / Proveedor Calificado
- Perfil verificado con datos de vehículo y portafolio de paños (Loro Piana, Scabal, Dormeuil).
- Switch de disponibilidad (Conectado / Desconectado).
- Cotizador integrado para calcular la tarifa final tras la prueba física en casa del cliente.
- Navegación GPS (Google Maps / Waze) y botón de llamada segura.
- Billetera digital para consultar ganancias acumuladas y solicitar dispersión a Bancolombia / Transfiya.

### 3. Panel Administrativo Web ("Nuestra Central")
- Métricas operativas en tiempo real (GMV, Take Rate, Ticket Promedio).
- Gestión y verificación de antecedentes de sastres.
- Motor de reglas de comisión dinámica (20% base, descuentos por volumen, recargos nocturnos).
- Integración Meta Conversions API (CAPI) para optimización de anuncios.

### 4. Calculadora de Rentabilidad & Unit Economics
- Simulador interactivo que demuestra la viabilidad económica desde el Día 1 con una comisión del 20%.

---

## 🗺️ Ruta de Desarrollo por Hitos

| Hito | Fase | Entregables Principales |
|---|---|---|
| **Hito 1 (Mes 1)** | Diseño UI/UX | Prototipos en Figma de pantallas Cliente y Sastre con estética Luxury. |
| **Hitos 2 y 3 (Mes 2-3)** | Backend & App Cliente | Base de datos segura, agendamiento on-demand, ficha permanente y pasarela Bold/ePayco. |
| **Hito 4 (Mes 4)** | App del Sastre | Mapa en vivo (Google Maps), botón de disponibilidad y cotizador en sitio. |
| **Hito 5 (Mes 5)** | QA & Publicación | Pruebas controladas y publicación en App Store y Google Play. |

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Vite 8
- **Estilos**: Tailwind CSS v4 + Fuentes Serif de Lujo (*Cormorant Garamond* / *Plus Jakarta Sans*)
- **Animaciones & Iconos**: Motion + Lucide React
- **Arquitectura de Mapas**: Vector Map SVG interactivo de Bogotá (Zonas VIP) + Google Maps Platform APIs

---

## 🚀 Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone <URL_DE_TU_REPOSITORIO>
cd atelier-bogota

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```

---

## 📄 Licencia

Este proyecto está bajo la licencia [Apache 2.0](LICENSE).
