# Tripleten web_project_around

# 🧑‍💻 Proyecto Web: Perfil Editable con Popup

Este proyecto es una página web responsiva en la que el usuario puede editar su información de perfil (nombre y descripción) mediante un popup emergente. Al guardar, los datos se actualizan dinámicamente en la página usando JavaScript.

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

- Apertura y cierre del popup con eventos `click`.
- Prevención del comportamiento por defecto en formularios (`event.preventDefault()`).
- Actualización dinámica del DOM con los datos ingresados por el usuario.
- Modularidad en la lógica de interacción (uso de selectores, funciones flecha, etc.).

---

## 💡 Metodología BEM

El proyecto usa la metodología **BEM (Block Element Modifier)** para nombrar clases CSS de forma consistente:

- `popup` → Bloque principal.
- `popup__container`, `popup__input`, `popup__save_button` → Elementos del bloque.
- `popup_opened` → Modificador para indicar estado visible.

Esto facilita el mantenimiento del código y la escalabilidad del proyecto.

---

## 📱 Responsividad

El diseño está optimizado para pantallas pequeñas usando media queries:

## 📈 Mejoras

Para convertir este proyecto en una aplicación más robusta, se tienen consideradas las siguientes mejoras:

- Conexión con Base de Datos

-- Almacenar los datos ingresados de forma persistente usando Firebase,  
-- Supabase o una API con backend propio (Node.js + MongoDB / MySQL).
-- Permitir que la información editada se conserve entre sesiones.

- Nuevas Funcionalidades

-- Validación de inputs en tiempo real.
-- Opción para subir foto de perfil.
-- Modo oscuro.
-- Traducción automática de la interfaz a varios idiomas.
-- Sistema de usuarios con login y registros.

[GitHub Pages link](https://gonzalott.github.io/web_project_around/)
