# Tripleten web_project_around

# 🧑‍💻 Proyecto Web: Perfil Editable con Popup (Versión con API y Arquitectura POO)

Este proyecto es una página web responsiva donde el usuario puede editar su información de perfil (nombre, descripción y avatar), así como interactuar con una galería de tarjetas completamente dinámica. Ahora incluye conexión a un servidor mediante una API REST, garantizando persistencia de datos reales y una arquitectura basada en Programación Orientada a Objetos (POO).

---

## 🚀 Tecnologías Utilizadas

### 🧱 HTML5

- Estructura semántica del contenido.
- Uso adecuado de etiquetas como `<form>`, `<fieldset>`, `<input>`, `<button>`.

### 🎨 CSS3

- Diseño adaptable mediante `@media queries`.
- Estilizado con metodología BEM para mantener el código limpio y modular.
- Uso de `flexbox` y `position: fixed` para centrar el popup.
- Estilos para pantallas móviles (`max-width: 543px`).

### 🧠 JavaScript (Vanilla JS)

- Clases modulares (Api, Card, UserInfo, Section, PopupWithForm, PopupWithConfirmation).
- Actualización del DOM mediante manipulaciones controladas desde las clases.
- Eventos de interacción (submit, clicks, like, eliminar, abrir popups).
- Manejo de estados de carga en botones: “Guardando…”.

---

## 💡 Metodología BEM

El proyecto usa la metodología **BEM (Block Element Modifier)** para nombrar clases CSS de forma consistente:

- `popup` → Bloque principal.
- `popup__container`, `popup__input`, `popup__save_button` → Elementos del bloque.
- `popup_opened` → Modificador para indicar estado visible.

Esto facilita el mantenimiento del código y la escalabilidad del proyecto.

---

## 📱 Responsividad

- El diseño responde adecuadamente a dispositivos móviles usando media queries y estructuras fluidas.
- Los popups están optimizados para pantallas reducidas, manteniendo un comportamiento consistente en todas las resoluciones.

## 🌟 Funcionalidades de la API (Estado Actual)

Las siguientes características ya están implementadas mediante integración completa con la API:

🔹 Gestión de Perfil (GET / PATCH)

El sistema carga la información del usuario desde el servidor al iniciar la página:

- Nombre
- Descripción
- Avatar (foto de perfil)
- El usuario puede:
- Editar su nombre y descripción (PATCH)
- Actualizar la foto de perfil mediante un formulario dedicado (PATCH)

Toda la información se sincroniza con el servidor y se refleja en tiempo real en la interfaz.

🔹 Galería de Tarjetas (CRUD Completo)

✓ Carga inicial (GET)
-Se obtienen todas las tarjetas desde el servidor y se renderizan usando la clase Section.
✓ Creación de tarjetas (POST)
El usuario puede:

- Abrir un popup para crear nuevas tarjetas.
- Enviar el formulario y ver la nueva tarjeta añadida inmediatamente.
  ✓ Eliminación con confirmación (DELETE)
  Al presionar el ícono de eliminar:
  -Se abre un popup de confirmación basado en la clase PopupWithConfirmation.
- Solo tras confirmar, la tarjeta se elimina tanto del DOM como del servidor.
  ✓ Likes/Unlikes dinámicos (PUT / DELETE)
  Cada tarjeta incluye botón de Like:
- La API devuelve el estado actualizado.
- El contador y el icono cambian visualmente.
- Incluye verificación de si la tarjeta ya está likeada por el usuario.

🧩 Arquitectura basada en POO

La lógica del proyecto ha sido completamente refactorizada en clases para mejorar la escalabilidad y mantenibilidad:

- Api.js — Maneja todas las solicitudes al servidor.
- Card.js — Renderiza tarjetas y gestiona likes/eliminar.
- UserInfo.js — Controla la información del usuario.
- Section.js — Renderiza listas de elementos.
- PopupWithForm.js — Maneja popups con formularios.
- PopupWithConfirmation.js — Popup para confirmar eliminaciones.

Esto permite una separación clara de responsabilidades y un código más flexible.

📈 Mejoras Futuras

- Ahora que la integración de API, CRUD, avatar y arquitectura POO ya están - - implementadas, las siguientes mejoras están planificadas:
- Manejo avanzado de errores de API (visual y por consola).
- Validación en tiempo real de formularios.
- Implementación de loaders globales durante operaciones largas.
- Soporte para paginación o lazy-loading en la galería.
- Tema oscuro con persistencia en localStorage.
- Tests unitarios para las clases principales.

[GitHub Pages link](https://gonzalott.github.io/web_project_around/)
