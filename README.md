# Logistica MT

Entrega inicial del proyecto:

- `site/index.html`: landing page completa.
- `site/styles.css`: estilos visuales responsive.
- `site/script.js`: comportamiento del formulario y modal de cotizacion.
- `site/config.js`: datos editables de contacto e integracion.
- `carta/carta-presentacion-mt.md`: carta comercial editable.
- `carta/carta-presentacion-mt.html`: carta visual lista para imprimir o exportar a PDF.
- `automatizacion/google-apps-script.gs`: automatizacion para Gmail.
- `automatizacion/README.md`: pasos para activar el envio automatico.

## Como abrir la pagina

Abrir este archivo en el navegador:

`site/index.html`

No necesita servidor local para verse.

## Como editar datos de contacto

Modificar `site/config.js`:

```js
window.MT_CONFIG = {
  companyEmail: "contacto@logisticamt.com",
  companyWhatsapp: "5491100000000",
  appsScriptUrl: "",
  presentationUrl: "../carta/carta-presentacion-mt.html"
};
```

## Como activar el envio automatico

Seguir los pasos de `automatizacion/README.md`.

Cuando Google Apps Script entregue la URL de la aplicacion web, pegarla en `appsScriptUrl`.

## Carta de presentacion

La version editable esta en `carta/carta-presentacion-mt.md`.

La version visual esta en `carta/carta-presentacion-mt.html`. Desde el navegador se puede imprimir o guardar como PDF.
