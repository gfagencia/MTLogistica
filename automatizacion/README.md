# Automatizacion de consultas por Gmail

Esta carpeta deja preparada la integracion para que el formulario de la web:

1. Envie automaticamente la carta de presentacion al correo del cliente.
2. Avise al correo de Logistica MT que hay una consulta nueva para cotizar.

## Pasos

1. Entrar a https://script.google.com con la cuenta de Gmail de Logistica MT.
2. Crear un proyecto nuevo.
3. Pegar el contenido de `google-apps-script.gs`.
4. Cambiar estos valores:
   - `mtEmail`: correo que recibe los avisos de cotizacion.
   - `presentationUrl`: URL publica donde quede subida la carta.
5. Ir a **Implementar > Nueva implementacion**.
6. Elegir tipo **Aplicacion web**.
7. Ejecutar como: **Yo**.
8. Quien tiene acceso: **Cualquier usuario**.
9. Copiar la URL de la aplicacion web.
10. Pegar esa URL en `site/config.js`, dentro de `appsScriptUrl`.

Mientras `appsScriptUrl` este vacio, el formulario abre un correo prearmado como respaldo.
