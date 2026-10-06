do $$
declare
  admin_id uuid;
begin
  select id into admin_id from auth.users where email = 'admin.tour@gmail.com';

  if admin_id is null then
    raise exception 'Create admin.tour@gmail.com in Authentication -> Users first';
  end if;

  update public.profiles
  set role = 'admin', username = 'Tourashop Admin'
  where id = admin_id;

  delete from public.products where owner_id = admin_id;

  insert into public.products (owner_id, name, price, category, image_url, description) values
    (admin_id, 'Trail Hiking Boots', 165.00, 'hiking', '/assets/images/product-hiking-boots.jpg',
      'Waterproof leather boots with a grippy sole and ankle support for rocky mountain trails.'),
    (admin_id, 'Trekking Poles', 60.00, 'hiking', '/assets/images/product-trekking-poles.jpg',
      'Lightweight adjustable aluminium poles that take the load off your knees on steep descents.'),
    (admin_id, 'Waterproof Shell Jacket', 210.00, 'hiking', '/assets/images/product-shell-jacket.jpg',
      'Breathable three-layer shell that keeps out wind and rain, with a helmet-compatible hood.'),
    (admin_id, 'Daypack 30L', 95.00, 'hiking', '/assets/images/product-daypack.jpg',
      'Ventilated 30 litre backpack with a hip belt, rain cover and a sleeve for a water bladder.'),
    (admin_id, 'LED Headlamp', 45.00, 'hiking', '/assets/images/product-headlamp.jpg',
      'Rechargeable 400 lumen headlamp with a red night mode for early starts and late finishes.'),
    (admin_id, 'Navigation Compass', 35.00, 'hiking', '/assets/images/product-compass.jpg',
      'Liquid-filled pocket compass with a sighting mirror that works when the phone signal doesn''t.'),
    (admin_id, 'Vacuum Flask 1L', 50.00, 'hiking', '/assets/images/product-vacuum-flask.jpg',
      'Steel vacuum flask that keeps tea hot for a full day on the trail, with a cup in the lid.'),
    (admin_id, 'Merino Beanie', 30.00, 'hiking', '/assets/images/product-merino-beanie.jpg',
      'Soft rib-knit merino beanie that keeps your head warm on windy summits without itching.'),

    (admin_id, 'Road Running Shoes', 135.00, 'running', '/assets/images/product-running-shoes.jpg',
      'Cushioned daily trainers with a responsive foam midsole for long runs on asphalt.'),
    (admin_id, 'Split Running Shorts', 40.00, 'running', '/assets/images/product-running-shorts.jpg',
      'Light split-leg shorts with a built-in brief and a zip pocket for keys or a gel.'),
    (admin_id, 'Hydration Vest', 85.00, 'running', '/assets/images/product-hydration-vest.jpg',
      'Snug running vest with two soft flasks and front pockets for your phone and snacks.'),
    (admin_id, 'Merino Running Tee', 55.00, 'running', '/assets/images/product-running-tee.jpg',
      'Soft merino wool tee that wicks sweat, stays warm when wet and resists odour.'),
    (admin_id, 'Trail Running Shoes', 150.00, 'running', '/assets/images/product-trail-running-shoes.jpg',
      'Grippy lugged outsole and a rock plate for fast miles on muddy and rocky trails.'),
    (admin_id, 'GPS Running Watch', 299.00, 'running', '/assets/images/product-gps-watch.jpg',
      'Multi-band GPS watch with heart rate, pace alerts and a battery that lasts a whole week.'),
    (admin_id, 'Five-Panel Running Cap', 28.00, 'running', '/assets/images/product-running-cap.jpg',
      'Light quick-dry cap with a soft brim that keeps the sun and sweat out of your eyes.'),
    (admin_id, 'Shield Running Sunglasses', 95.00, 'running', '/assets/images/product-running-sunglasses.jpg',
      'Wraparound shield lens with grippy nose pads that stay put on bumpy descents.'),

    (admin_id, 'Aero Bike Helmet', 120.00, 'biking', '/assets/images/product-bike-helmet.jpg',
      'Aerodynamic road helmet with MIPS protection and adjustable vents.'),
    (admin_id, 'Cycling Gloves', 25.00, 'biking', '/assets/images/product-cycling-gloves.jpg',
      'Fingerless gloves with gel padding in the palm to reduce vibration on long rides.'),
    (admin_id, 'Bib Shorts', 90.00, 'biking', '/assets/images/product-bib-shorts.jpg',
      'Padded bib shorts with a seamless chamois and breathable mesh straps.'),
    (admin_id, 'Handlebar Bag', 45.00, 'biking', '/assets/images/product-handlebar-bag.jpg',
      'Water-resistant roll-top bag that straps to the handlebar for bikepacking trips.'),
    (admin_id, 'Front Bike Light', 55.00, 'biking', '/assets/images/product-bike-light.jpg',
      'Bright USB-rechargeable front light with a wide beam for dark roads and commutes.'),
    (admin_id, 'U-Lock', 70.00, 'biking', '/assets/images/product-u-lock.jpg',
      'Hardened steel U-lock with a frame mount, so your bike is still there after the coffee stop.'),
    (admin_id, 'Cycling Sunglasses', 110.00, 'biking', '/assets/images/product-cycling-sunglasses.jpg',
      'Large mirrored lens that blocks wind, dust and glare at speed.'),
    (admin_id, 'Cycling Jersey', 85.00, 'biking', '/assets/images/product-cycling-jersey.jpg',
      'Close-fitting jersey with a full zip and three back pockets for food and a rain layer.'),

    (admin_id, 'Climbing Harness', 95.00, 'climbing', '/assets/images/product-climbing-harness.jpg',
      'Comfortable sport climbing harness with four gear loops and adjustable leg loops.'),
    (admin_id, 'Chalk Bag', 18.00, 'climbing', '/assets/images/product-chalk-bag.jpg',
      'Chalk bag with a brush holder and a drawstring closure that keeps the chalk inside.'),
    (admin_id, 'Approach Shoes', 140.00, 'climbing', '/assets/images/product-approach-shoes.jpg',
      'Sticky rubber approach shoes for scrambling to the crag and easy climbing.'),
    (admin_id, 'Belay Jacket', 110.00, 'climbing', '/assets/images/product-belay-jacket.jpg',
      'Warm synthetic insulated jacket to throw on while belaying on cold days.'),
    (admin_id, 'Climbing Shoes', 130.00, 'climbing', '/assets/images/product-climbing-shoes.jpg',
      'Downturned velcro climbing shoes with sticky rubber for small edges and steep routes.'),
    (admin_id, 'Carabiner Set', 48.00, 'climbing', '/assets/images/product-carabiners.jpg',
      'Set of four light wire-gate and locking carabiners for anchors and belaying.'),
    (admin_id, 'Climbing Helmet', 75.00, 'climbing', '/assets/images/product-climbing-helmet.jpg',
      'Light foam helmet that protects against falling rocks at the crag and on alpine routes.'),
    (admin_id, 'Dynamic Rope 60m', 180.00, 'climbing', '/assets/images/product-climbing-rope.jpg',
      '9.8 mm single rope with a middle mark, a good first rope for sport climbing.');
end;
$$;
