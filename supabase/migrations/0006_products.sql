-- GCStudio · Catalogo de productos editable desde el Admin
create table if not exists products (
  id text primary key,
  slug text not null unique,
  name text not null,
  category text not null,
  price_ars integer,
  image text,
  badge text,
  short_desc text,
  description text,
  benefits jsonb not null default '[]',
  how_to_use text,
  anmat_approved boolean not null default true,
  stock boolean not null default true,
  active boolean not null default true,
  position integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table products enable row level security;

drop policy if exists "products_select_public" on products;
create policy "products_select_public" on products
  for select using (active = true or public.is_admin());

drop policy if exists "products_admin_write" on products;
create policy "products_admin_write" on products
  for all using (public.is_admin()) with check (public.is_admin());

drop trigger if exists trg_products_touch on products;
create trigger trg_products_touch before update on products
  for each row execute function public.touch_updated_at();

insert into products (id, slug, name, category, price_ars, image, badge, short_desc, description, benefits, how_to_use, anmat_approved, stock, active, position) values
  ('prod-kit-lifting-pro', 'kit-lash-lifting-pro', 'Kit Lash Lifting Profesional Completo', 'Kits Profesionales', 48500, '/products/kit-lifting.jpg', 'Kit Oficial Alumnas', 'Set completo de lifting utilizado en el curso online. Rinde de 25 a 30 servicios.', 'El kit oficial recomendado por Geraldine Colman para iniciar tu negocio. Contiene loción permanente, neutralizante, botox de keratina, tinte negro intenso, oxidante suave y accesorios indispensables.', '["Rinde más de 25 aplicaciones completas","Productos hipoalergénicos testeados por ANMAT","Fórmulas con acción en 8-12 minutos","Incluye estuche organizador térmico"]'::jsonb, 'Aplicar paso 1 sobre tercio medio de pestañas. Retirar en seco. Aplicar paso 2 mismo tiempo. Finalizar con nutrición.', true, true, true, 1),
  ('prod-kit-brow-pro', 'kit-brow-lamination-pro', 'Kit Brow Lamination & Visagismo Pro', 'Kits Profesionales', 45900, '/products/kit-brow.jpg', 'Kit Oficial Alumnas', 'Insumos necesarios para dominar el laminado y diseño con hilo en cabina.', 'Diseñado para técnicas que buscan definición y disciplina en el pelo de la ceja. Incluye soluciones de alisado, neutralizado, film osmótico profesional, cepillos de visagismo y tinte castaño.', '["Efecto de ceja ordenada y peinada hasta 6 semanas","Film osmótico de corte fácil sin arrugas","Tinte formulado para tono natural sin virajes","Apto para vellos rebeldes y con remolinos"]'::jsonb, 'Peinar vellos hacia arriba, aplicar gel laminador con film 6-10 min. Neutralizar y sellar con bálsamo regenerador.', true, true, true, 2),
  ('prod-serum-lash-botox', 'serum-lash-botox-keratin', 'Sérum Fortalecedor Lash & Brow Botox', 'Aftercare & Hogar', 18200, '/products/serum-botox.jpg', 'Best Seller Aftercare', 'Nutrición diaria con biotina, péptidos y keratina pura para alargar y densificar.', 'El producto indispensable para el hogar. Ayuda a prolongar el arqueado del lifting y el orden del laminado mientras estimula el crecimiento natural de pestañas y cejas débiles.', '["Fortalece la raíz y engrosa la fibra natural","Alarga la duración del lifting hasta 2 semanas extra","Textura ligera transparente de rápida absorción","Cepillo aplicador de microfibra de alta precisión"]'::jsonb, 'Aplicar todas las noches sobre pestañas y cejas limpias, desde la raíz hasta las puntas.', true, true, true, 3),
  ('prod-lash-shampoo', 'espuma-limpiadora-lash-shampoo', 'Espuma Limpiadora Lash Shampoo Oil-Free', 'Aftercare & Hogar', 14500, '/products/lash-shampoo.jpg', 'Cuidado Diario', 'Higiene ocular suave sin aceites que protege el lifting y el laminado.', 'Fórmula micelar con pH balanceado y extracto de manzanilla. Remueve impurezas, polución y maquillaje sin alterar la curvatura ni la estructura del pelo.', '["Fórmula 100% libre de aceites (oil-free)","No arde en los ojos y es hipoalergénica","Previene acumulación bacteriana y blefaritis","Incluye brocha suave de cerdas sintéticas"]'::jsonb, 'Colocar un pump de espuma en la brocha, frotar delicadamente en párpados y enjuagar con agua tibia.', true, true, true, 4),
  ('prod-glue-balm', 'glue-balm-lifting-vitamins', 'Glue Balm Nutritivo para Lifting (Sin pegamento duro)', 'Insumos & Descartables', 16900, '/products/glue-balm.jpg', 'Innovación Técnica', 'Bálsamo adhesivo enriquecido con vitaminas. No se seca en segundos y permite acomodar.', 'Reemplaza los pegamentos tradicionales duros. Permite adherir las pestañas al molde de silicona sin tirones, sin dejar grumos y facilitando la penetración de los activos onduladores.', '["Permite corregir la alineación sin dañar el vello","Se retira fácilmente con agua sin tirones","Enriquecido con aceite de argán y vitamina E","No genera película opaca que frene los químicos"]'::jsonb, 'Pintar una fina capa sobre el molde y acomodar las pestañas con cepillo en Y o aplicador.', true, true, true, 5),
  ('prod-moldes-silicona', 'pack-moldes-silicona-soft', 'Pack 5 Pares Moldes Anatómicos Soft Silicone', 'Insumos & Descartables', 12800, '/products/moldes-silicona.jpg', 'Accesorios Pro', 'Curvaturas S, M, M1, M2 y L de silicona médica flexible que no tira del párpado.', 'Curvaturas diseñadas para todo tipo de ojos (pequeños, encapotados, almendrados). Su textura aterciopelada se adhiere naturalmente al párpado sin necesidad de adhesivo en la base.', '["5 medidas para elegir el efecto deseado (L-Curl o C-Curl)","Silicona médica reutilizable y esterilizable","Forma ergonómica que no se despega en los extremos"]'::jsonb, 'Desinfectar antes y después de cada servicio. Seleccionar el tamaño según el largo de pestaña.', true, true, true, 6),
  ('prod-hilo-visagismo', 'hilo-mapeo-visagismo-antibacterial', 'Bobina de Hilo Negro Antibacterial para Mapeo', 'Skincare & Mirada', 8900, '/products/hilo-visagismo.jpg', 'Esencial Visagismo', 'Hilo ultrafino pretintado con pigmento mineral para diseño simétrico de cejas.', 'El secreto de los diseños perfectos de GC Studio. Traza líneas precisas y milimétricas sobre la piel sin manchar ni desparramar pigmento, ideal para clientas y alumnas.', '["10 metros de hilo pretintado hipoalergénico","Corte limpio con cuchilla incorporada en el frasco","Fácil de retirar con agua micelar"]'::jsonb, 'Cortar 30 cm de hilo, tensar entre índices y apoyar sobre los puntos clave del visagismo.', true, true, true, 7),
  ('prod-aceite-cuticulas', 'elixir-botanico-cuticulas-unas', 'Elixir Botánico Nutritivo para Cutículas & Uñas', 'Skincare & Mirada', 11400, '/products/aceite-cuticulas.jpg', 'Aftercare Salón', 'Gotero nutritivo con jojoba, almendras dulces y vitamina E para alargar el esmaltado.', 'Mantiene la piel del contorno de la uña suave, hidratada y sin padrastros. Es el compañero perfecto para quienes se realizan kapping gel o esmaltado semipermanente.', '["Absorción rápida con acabado satinado no pegajoso","Previene desprendimientos prematuros del kapping","Aroma suave a vainilla y almendras"]'::jsonb, 'Aplicar una gota por mano cada noche masajeando suavemente la cutícula y la uña.', true, true, true, 8)
on conflict (id) do nothing;
