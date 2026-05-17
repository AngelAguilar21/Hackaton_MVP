# Guía de Estilos - DameChamba MVP

## Paleta de Colores Personalizada

Los siguientes colores están disponibles en toda la aplicación:

### Variables CSS (en `:root`)

```css
--text-primary: #002a8d        /* Azul profundo para textos principales */
--text-small: #a8c2df          /* Azul claro para textos pequeños *         /* Verde aceituna para acentos */
--fonto-light: #d9ebfd         /* Azul muy claro para fondos */
```

## Formas de Uso

### 1. Con CSS Variables (en archivos .css)

```css
.my-element {
  color: var(--text-primary);
  background-color: var(--fonto-light);
  border-color: var(--button-primary);
}
```

### 2. Con Tailwind CSS (en componentes JSX)

```jsx
<button className="bg-palette-button-primary text-white hover:opacity-90">
  Acción
</button>

<p className="text-palette-text-primary">Texto importante</p>

<small className="text-palette-text-small">Texto pequeño</small>

<div className="bg-palette-fonto-light">
  Contenedor con fondo claro
</div>

<div className="border-palette-wt-accent border-2">
  Elemento con borde acento
</div>
```

### 3. Inline con JavaScript

```jsx
const elemento = document.querySelector('.my-class');
elemento.style.color = 'var(--text-primary)';
```

## Ejemplos Rápidos

### Botón Personalizado

```jsx
<button className="bg-palette-button-primary hover:opacity-90 text-white font-bold px-4 py-2 rounded-lg transition-opacity">
  Click aquí
</button>
```

### Card con Estilos Personalizados

```jsx
<div className="bg-palette-fonto-light border-2 border-palette-wt-accent rounded-lg p-6">
  <h3 className="text-palette-text-primary font-bold">Título</h3>
  <p className="text-palette-text-small">Descripción pequeña</p>
</div>
```

### Texto Jerárquico

```jsx
<h1 className="text-palette-text-primary text-2xl font-bold">
  Encabezado
</h1>
<p className="text-palette-text-small text-sm">
  Subtítulo o información secundaria
</p>
```

## Notas

- Estos colores se pueden combinar con cualquier utilidad de Tailwind.
- Las variables CSS también funcionan en estilos globales y componentes.
- Para mantener consistencia, preferir el prefijo `palette-` en clases Tailwind.
