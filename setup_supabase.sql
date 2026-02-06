-- 1. Create the 'applications' table
create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text not null,
  last_name text not null,
  email text not null,        -- Added email field
  age integer not null,
  phone text not null,
  post_code text not null,
  image_url text,
  status text default 'new'
);

-- 2. Enable Row Level Security (RLS)
alter table applications enable row level security;

-- 3. Create Policy: Allow anyone to insert (Submit Application)
create policy "Enable insert for everyone" 
on applications for insert 
with check (true);

-- 4. Create Policy: Allow anyone to read (for Dashboard purposes)
-- Note: In a real app, you'd lock this down to authenticated users only.
create policy "Enable read for everyone" 
on applications for select 
using (true);

-- 5. Storage Policies for 'leads' bucket
-- Note: You must create the bucket 'leads' in the Supabase Dashboard -> Storage first.
-- These policies allow public access to upload and view images in that bucket.

-- Policy: Give public access to view images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'leads' );

-- Policy: Give public access to upload images
create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'leads' );
