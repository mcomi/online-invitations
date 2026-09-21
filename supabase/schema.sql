-- Ejecuta esto en el SQL editor de tu proyecto de Supabase.
-- Corresponde a lib/store.supabase.js.

create table if not exists invitations (
  slug text primary key,
  tier text not null default 'free' check (tier in ('free', 'premium')),
  event_type text not null,
  names text not null,
  event_date timestamptz not null,
  city text not null,
  welcome text not null,
  church jsonb not null,
  reception jsonb not null,
  dress_code text,
  gift_registry text,
  rsvp_phone text not null,
  rsvp_message text,
  photos jsonb not null default '[]',
  final_message text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists invitations_expires_at_idx on invitations (expires_at);

-- La app siempre lee/escribe con la service role key desde el servidor
-- (nunca desde el navegador), así que RLS no es estrictamente necesario para
-- que funcione hoy — pero se deja activado con una política de solo lectura
-- pública por si en el futuro se agrega algún acceso directo desde el cliente.
alter table invitations enable row level security;

create policy "invitations are publicly readable"
  on invitations for select
  using (true);
