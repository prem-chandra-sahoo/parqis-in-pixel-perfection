create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, name text, phone text, created_at timestamptz not null default now());
grant select, insert, update on public.profiles to authenticated; grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid());

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles(id, name) values (new.id, coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1))); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.shop_state (user_id uuid primary key, cart jsonb not null default '[]', wishlist jsonb not null default '[]', updated_at timestamptz not null default now());
grant select, insert, update on public.shop_state to authenticated; grant all on public.shop_state to service_role;
alter table public.shop_state enable row level security;
create policy "own state" on public.shop_state for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create table public.addresses (id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid(), label text not null, created_at timestamptz not null default now());
grant select, insert, delete on public.addresses to authenticated; grant all on public.addresses to service_role;
alter table public.addresses enable row level security;
create policy "own addresses" on public.addresses for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create table public.orders (id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid(), items jsonb not null, total numeric not null, address text not null, status text not null default 'Placed', created_at timestamptz not null default now());
grant select, insert on public.orders to authenticated; grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "own orders read" on public.orders for select to authenticated using (user_id = auth.uid());
create policy "own orders insert" on public.orders for insert to authenticated with check (user_id = auth.uid());