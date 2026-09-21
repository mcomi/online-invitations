# Invitaciones digitales — Next.js

MVP de la "opción B" del análisis: un solo formulario, un link por evento,
sin diseñador de por medio.

## Desarrollo

```bash
npm install
npm run dev
```

- `/` — landing del producto.
- `/crear` — formulario para publicar una invitación nueva.
- `/e/<slug>` — la invitación pública (ej. `/e/regina-natalia`, el ejemplo original).

Sin ninguna variable de entorno configurada, las invitaciones se guardan como
archivos JSON en `data/invitations/` — funciona de inmediato, cero setup.

## Producción

Para poder crear invitaciones en un deploy de Vercel necesitas una base de
datos real (el sistema de archivos ahí es de solo lectura):

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Corre `supabase/schema.sql` en su SQL editor.
3. En Vercel, agrega las variables de entorno `SUPABASE_URL` y
   `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API de Supabase).

En cuanto esas dos variables existen, `lib/store.js` cambia automáticamente
de archivos JSON a Supabase — no hay que tocar código.

```bash
npm run build
npm run start
```

## Estructura

- `app/page.jsx` — landing (antes era la invitación fija de Regina y Natalia).
- `app/crear/page.jsx` — formulario de creación (client component).
- `app/api/invitations/route.js` — valida el formulario y guarda la invitación.
- `app/e/[slug]/page.jsx` — la página pública; muestra un aviso si ya venció.
- `components/InvitationView.jsx` — la plantilla visual, ahora parametrizada
  por los datos de cada invitación en vez de tener todo hardcodeado.
- `lib/invitation.js` — validación + reglas de negocio (slug único, vigencia).
- `lib/store.js` / `store.local.js` / `store.supabase.js` — capa de datos;
  el resto de la app solo conoce `store.js`.
- `data/invitations/regina-natalia.json` — la invitación de ejemplo original,
  ahora como dato en vez de código.

## Qué falta (siguientes pasos del roadmap)

- **Pagos**: todo se crea en plan gratis (con marca de agua, 15 días de
  vigencia). El campo `tier` ya existe en el modelo — falta conectar
  Mercado Pago/Conekta para que una invitación pueda pasar a `premium`.
- **Fotos**: por ahora se pegan URLs de imágenes ya subidas a algún lado.
  Subir archivos directamente requeriría Supabase Storage o Cloudinary.
- **Baja real**: hoy la invitación vencida deja de *mostrarse* (chequeo de
  fecha en cada request), pero el registro sigue en la base. Borrarlo de
  verdad después de un tiempo es un Vercel Cron Job — no es necesario para
  el MVP, pero es fácil de agregar cuando haya tracción.
- **Subdominio real** (`slug.tuapp.com`): con el Platforms Starter Kit de
  Vercel, una vez que valga la pena la complejidad extra de DNS/SSL por
  cliente (ver el análisis de viabilidad).
