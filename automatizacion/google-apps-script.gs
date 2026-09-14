const MT_CONFIG = {
  mtEmail: "contacto@logisticamt.com",
  presentationUrl: "https://TU-DOMINIO.com/carta/carta-presentacion-mt.html",
  companyName: "Logistica MT"
};

function doPost(e) {
  try {
    const lead = JSON.parse(e.postData.contents);
    const name = sanitize_(lead.nombre);
    const clientEmail = sanitize_(lead.correo);
    const service = sanitize_(lead.servicio);
    const company = sanitize_(lead.empresa);
    const phone = sanitize_(lead.telefono);
    const message = sanitize_(lead.mensaje);
    const presentationUrl = lead.presentationUrl || MT_CONFIG.presentationUrl;

    if (!clientEmail) {
      throw new Error("Falta el correo del cliente");
    }

    MailApp.sendEmail({
      to: clientEmail,
      subject: "Presentacion comercial de Logistica MT",
      htmlBody: clientEmailBody_(name, presentationUrl),
      name: MT_CONFIG.companyName
    });

    MailApp.sendEmail({
      to: MT_CONFIG.mtEmail,
      subject: `Nueva consulta web - ${service || "Servicio logistico"}`,
      htmlBody: mtNotificationBody_({
        name,
        clientEmail,
        service,
        company,
        phone,
        message,
        source: sanitize_(lead.source),
        presentationUrl
      }),
      name: "Web Logistica MT"
    });

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function clientEmailBody_(name, presentationUrl) {
  const greeting = name ? `Hola ${name},` : "Hola,";
  return `
    <div style="font-family:Arial,sans-serif;color:#132338;line-height:1.55">
      <h2 style="color:#071f38">Gracias por contactar a Logistica MT</h2>
      <p>${greeting}</p>
      <p>Recibimos tu consulta. Te compartimos nuestra carta de presentacion para que puedas conocer los servicios, metodologia de trabajo y ventajas de operar con Logistica MT.</p>
      <p><a href="${presentationUrl}" style="display:inline-block;background:#ff9f1c;color:#061322;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:bold">Ver carta de presentacion</a></p>
      <p>Nuestro equipo ya fue avisado y va a preparar una cotizacion adaptada a tu operacion.</p>
      <p>Saludos,<br><strong>Logistica MT</strong></p>
    </div>
  `;
}

function mtNotificationBody_(lead) {
  return `
    <div style="font-family:Arial,sans-serif;color:#132338;line-height:1.55">
      <h2 style="color:#071f38">Nueva consulta desde la web</h2>
      <p><strong>Nombre:</strong> ${lead.name}</p>
      <p><strong>Empresa:</strong> ${lead.company}</p>
      <p><strong>Correo:</strong> ${lead.clientEmail}</p>
      <p><strong>Telefono:</strong> ${lead.phone}</p>
      <p><strong>Servicio requerido:</strong> ${lead.service}</p>
      <p><strong>Mensaje:</strong><br>${lead.message}</p>
      <p><strong>Origen:</strong> ${lead.source}</p>
      <p><strong>Carta enviada:</strong> <a href="${lead.presentationUrl}">${lead.presentationUrl}</a></p>
    </div>
  `;
}

function sanitize_(value) {
  return String(value || "")
    .replace(/[<>&"]/g, function (char) {
      return ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" })[char];
    })
    .trim();
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
