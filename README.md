# Logistica MT

Entrega inicial del proyecto:

- `site/index.html`: landing page completa.
- `site/styles.css`: estilos visuales responsive.
- `site/script.js`: comportamiento del formulario y modal de cotizacion.
- `site/config.js`: datos editables de contacto e integracion.
- `carta/carta-presentacion-mt.md`: carta comercial editable.
- `carta/carta-presentacion-mt.html`: carta visual lista para imprimir o exportar a PDF.

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

La version editable esta en `carta/carta-presentacion-mt.md`.

La version visual esta en `carta/carta-presentacion-mt.html`. Desde el navegador se puede imprimir o guardar como PDF.
