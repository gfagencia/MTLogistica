# Logistica MT

Entrega inicial del proyecto:

- `site/index.html`: landing page completa.
- `site/styles.css`: estilos visuales responsive.
- `site/script.js`: comportamiento del formulario y modal de cotizacion.
- `site/config.js`: datos editables de contacto e integracion.
- `site/carta/carta-presentacion-mt.md`: carta comercial editable.
- `site/carta/carta-presentacion-mt.html`: carta visual, enlazada desde la web, lista para imprimir o exportar a PDF.

## Como abrir la pagina

Abrir este archivo en el navegador:

`site/index.html`

No necesita servidor local para verse.

## Como editar datos de contacto

Modificar `site/config.js`:

```js
window.MT_CONFIG = {
  companyWhatsapp: "5491100000000"
};
```

## Formulario de cotizacion

Al enviar el formulario, se abre WhatsApp con los datos cargados para coordinar la cotizacion directamente con el numero configurado en `companyWhatsapp`.

## Carta de presentacion

La version editable esta en `site/carta/carta-presentacion-mt.md`.

La version visual esta en `site/carta/carta-presentacion-mt.html`, enlazada desde el menu, el pie de pagina y la seccion de contacto de la web. Desde el navegador se puede imprimir o guardar como PDF.
