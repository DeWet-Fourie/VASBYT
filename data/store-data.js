// VASBYT DATA CONTROL FILE
// Edit collections/products here. The menu, homepage, filters, search and quote system update automatically.

window.STORE_CONFIG = {
  brandName: 'VASBYT',
  tagline: 'Gear for the long road.',
  whatsappNumber: '27000000000', // example: 27821234567, no + sign
  email: 'vasbytstore@gmail.com',
  phone: '+27 00 000 0000',
  location: 'South Africa',
  hours: 'Mon–Fri, 08:00–17:00',
  cloudinaryCloudName: 'demo',
  currency: 'R',
  heroImages: {
    action: 'assets/img/hero-action.webp',
    camp: 'assets/img/hero-camp.webp',
    route: 'assets/img/hero-route.webp',
    gold: 'assets/img/hero-gold.webp',
    mud: 'assets/img/hero-mud.webp',
    trail: 'assets/img/hero-trail.webp'
  }
};

window.MENU_COLLECTIONS = [
  {
    id: 'camping', active: true, sort: 1, navLabel: 'Camping', title: 'Camping',
    shortDescription: 'Camp furniture, lighting and practical gear for long weekends away.',
    longDescription: 'A focused collection for campsites, overnight stops, braai setups and overland comfort.',
    keywords: ['camp', 'tent', 'chair', 'braai', 'fridge', 'weekend', 'overland'],
    fallbackImage: 'assets/img/hero-camp.webp'
  },
  {
    id: 'recovery', active: true, sort: 2, navLabel: 'Recovery', title: 'Recovery',
    shortDescription: 'Traction, towing and recovery tools for when the road turns bad.',
    longDescription: 'Recovery gear for mud, sand, towing, tracks, straps and getting unstuck responsibly.',
    keywords: ['stuck', 'sand', 'mud', 'recover', 'tow', 'winch', 'strap', 'track'],
    fallbackImage: 'assets/img/hero-mud.webp'
  },
  {
    id: 'solar-power', active: true, sort: 3, navLabel: 'Solar & Power', title: 'Solar & Power',
    shortDescription: 'Portable power, lighting and charging for off-grid stops.',
    longDescription: 'Power support for camping, fridges, lights, batteries, panels and charging.',
    keywords: ['solar', 'battery', 'power', 'charge', 'light', 'fridge', 'off-grid'],
    fallbackImage: 'assets/img/hero-gold.webp'
  },
  {
    id: 'exterior', active: true, sort: 4, navLabel: 'Exterior', title: 'Vehicle Exterior',
    shortDescription: 'Exterior vehicle upgrades for protection, touring and overland loadouts.',
    longDescription: 'Roof racks, platforms, exterior accessories and vehicle-mounted touring gear.',
    keywords: ['roof', 'rack', 'platform', 'load', 'bakkie', 'hilux', 'land cruiser'],
    fallbackImage: 'assets/img/hero-trail.webp'
  },
  {
    id: 'interior', active: true, sort: 5, navLabel: 'Interior', title: 'Vehicle Interior',
    shortDescription: 'Storage, organisation and cabin upgrades for practical travel.',
    longDescription: 'Organisers, storage, drawers, seat-back systems and cabin utility items.',
    keywords: ['storage', 'organiser', 'drawer', 'seatback', 'cabin', 'bakkie'],
    fallbackImage: 'assets/img/hero-route.webp'
  },
  {
    id: 'apparel', active: true, sort: 6, navLabel: 'Apparel', title: 'Apparel',
    shortDescription: 'Outdoor clothing and lifestyle gear with a rugged South African feel.',
    longDescription: 'Caps, jackets and everyday outdoor gear built for cold mornings and dusty stops.',
    keywords: ['jacket', 'winter', 'cold', 'cap', 'clothing', 'apparel'],
    fallbackImage: 'assets/img/hero-action.webp'
  }
];

window.PRODUCTS = [
  {
    id: 'san-hima-camp-chair', active: true, featured: true, sortOrder: 1,
    name: 'SAN HIMA Heavy-Duty Camp Chair', brand: 'SAN HIMA', category: 'Camping', collectionId: 'camping', subcategory: 'Furniture',
    price: 1299, salePrice: 1499, stockStatus: 'In stock',
    shortDescription: 'A strong foldable chair made for weekends, campsites and overland stops.',
    longDescription: 'A comfortable, heavy-duty foldable camp chair for long days around the fire and rougher outdoor use.',
    dimensions: 'Packed: 95 x 20 x 20 cm', specs: ['Foldable frame', 'Carry bag included', 'Heavy-duty outdoor fabric'],
    keywords: ['chair','camp','camping','foldable','braai','furniture','weekend'], fallbackImage: 'assets/img/hero-camp.webp'
  },
  {
    id: 'utility-camp-wagon', active: true, featured: true, sortOrder: 2,
    name: 'Collapsible Utility Camp Wagon', brand: 'VASBYT GEAR', category: 'Camping', collectionId: 'camping', subcategory: 'Transport',
    price: 1999, salePrice: 2199, stockStatus: 'In stock',
    shortDescription: 'Move coolers, gear and camp boxes without multiple trips.',
    longDescription: 'A collapsible utility wagon for campsites, beach trips, events and overlanding loadouts.',
    dimensions: 'Open: 90 x 50 x 55 cm', specs: ['Collapsible', 'All-terrain wheels', 'Pull handle'],
    keywords: ['wagon','camp','storage','cooler','gear','carry','utility'], fallbackImage: 'assets/img/hero-camp.webp'
  },
  {
    id: 'lightfox-camp-light', active: true, featured: true, sortOrder: 3,
    name: 'LIGHTFOX Rechargeable Camp Light', brand: 'LIGHTFOX', category: 'Solar & Power', collectionId: 'solar-power', subcategory: 'Lighting',
    price: 749, salePrice: 899, stockStatus: 'Limited stock',
    shortDescription: 'Compact camp lighting for tents, bakkies and late-night braais.',
    longDescription: 'Rechargeable compact LED light made for campsites, vehicle setups and emergency use.',
    dimensions: 'Approx. 18 x 10 cm', specs: ['Rechargeable', 'Multiple brightness modes', 'Compact carry size'],
    keywords: ['light','led','camp','night','charge','rechargeable','solar','power'], fallbackImage: 'assets/img/hero-gold.webp'
  },
  {
    id: 'recovery-traction-tracks', active: true, featured: true, sortOrder: 4,
    name: 'Pro Recovery Traction Tracks', brand: 'VASBYT RECOVERY', category: 'Recovery', collectionId: 'recovery', subcategory: 'Traction',
    price: 2399, salePrice: 2699, stockStatus: 'In stock',
    shortDescription: 'Traction assistance for sand, mud and difficult trail exits.',
    longDescription: 'Recovery tracks designed for traction when stuck in sand, mud or soft terrain.',
    dimensions: 'Pair: 107 x 31 cm each', specs: ['Pair included', 'Aggressive traction pattern', 'Vehicle recovery use'],
    keywords: ['stuck','sand','mud','recovery','traction','tracks','4x4','tow'], fallbackImage: 'assets/img/hero-mud.webp'
  },
  {
    id: 'trail-utility-jacket', active: true, featured: true, sortOrder: 5,
    name: 'Trail Utility Jacket', brand: 'VASBYT', category: 'Apparel', collectionId: 'apparel', subcategory: 'Jackets',
    price: 999, salePrice: 1199, stockStatus: 'In stock',
    shortDescription: 'A practical outer layer for cold mornings and rough weather.',
    longDescription: 'A rugged jacket for travel days, cold mornings, campsite use and everyday outdoor wear.',
    dimensions: 'Sizes: S–XXL', specs: ['Outdoor layer', 'Utility pockets', 'Rugged feel'],
    keywords: ['jacket','winter','cold','apparel','clothing','outdoor'], fallbackImage: 'assets/img/hero-action.webp'
  },
  {
    id: 'snatch-strap-recovery-kit', active: true, featured: false, sortOrder: 6,
    name: 'Snatch Strap Recovery Kit', brand: 'VASBYT RECOVERY', category: 'Recovery', collectionId: 'recovery', subcategory: 'Recovery Kit',
    price: 1699, salePrice: 1899, stockStatus: 'In stock',
    shortDescription: 'A recovery kit for responsible trail and farm recoveries.',
    longDescription: 'A practical kit for towing, pulling and basic 4x4 recovery situations.',
    dimensions: 'Strap: 9m rated recovery strap', specs: ['Recovery strap', 'Carry bag', 'Shackle-compatible'],
    keywords: ['strap','snatch','tow','stuck','recover','recovery','mud','sand'], fallbackImage: 'assets/img/hero-mud.webp'
  },
  {
    id: 'folding-solar-panel', active: true, featured: false, sortOrder: 7,
    name: 'Portable Folding Solar Panel', brand: 'VASBYT POWER', category: 'Solar & Power', collectionId: 'solar-power', subcategory: 'Solar',
    price: 2999, salePrice: 3299, stockStatus: 'On order',
    shortDescription: 'Foldable solar support for camping and off-grid charging.',
    longDescription: 'Portable solar panel support for charging batteries, lights and small off-grid devices.',
    dimensions: 'Folded: 55 x 40 cm', specs: ['Foldable panel', 'Portable carry format', 'Off-grid use'],
    keywords: ['solar','panel','battery','charge','power','off-grid','fridge'], fallbackImage: 'assets/img/hero-gold.webp'
  },
  {
    id: 'roof-rack-platform', active: true, featured: false, sortOrder: 8,
    name: 'Modular Roof Rack Platform', brand: 'VASBYT EXTERIOR', category: 'Vehicle Exterior', collectionId: 'exterior', subcategory: 'Roof Rack',
    price: 6999, salePrice: 7449, stockStatus: 'Confirm fitment',
    shortDescription: 'A clean utility platform for touring, storage and overland setups.',
    longDescription: 'A modular roof platform for carrying recovery gear, camp equipment and vehicle travel accessories.',
    dimensions: 'Vehicle fitment dependent', specs: ['Modular mounting', 'Load platform', 'Fitment confirmation required'],
    keywords: ['roof','rack','platform','bakkie','hilux','load','vehicle','exterior'], fallbackImage: 'assets/img/hero-trail.webp'
  },
  {
    id: 'seat-back-storage', active: true, featured: false, sortOrder: 9,
    name: 'Seat Back Storage Organiser', brand: 'VASBYT INTERIOR', category: 'Vehicle Interior', collectionId: 'interior', subcategory: 'Storage',
    price: 699, salePrice: 799, stockStatus: 'In stock',
    shortDescription: 'Keep tools, cables and small gear controlled inside the vehicle.',
    longDescription: 'A seat-back storage organiser for tools, cables, recovery accessories and everyday travel items.',
    dimensions: 'Universal seat-back format', specs: ['Multiple pockets', 'Universal fit', 'Cabin organisation'],
    keywords: ['storage','organiser','interior','seatback','tools','cables','drawer','bakkie'], fallbackImage: 'assets/img/hero-route.webp'
  },
  {
    id: 'heritage-cap', active: true, featured: false, sortOrder: 10,
    name: 'Vasbyt Heritage Cap', brand: 'VASBYT', category: 'Apparel', collectionId: 'apparel', subcategory: 'Caps',
    price: 299, salePrice: 349, stockStatus: 'In stock',
    shortDescription: 'Clean everyday cap with a rugged outdoor identity.',
    longDescription: 'Everyday outdoor cap for travelling, trails, campsites and workdays.',
    dimensions: 'Adjustable', specs: ['Adjustable strap', 'Outdoor fit', 'Everyday wear'],
    keywords: ['cap','hat','apparel','clothing','outdoor'], fallbackImage: 'assets/img/hero-action.webp'
  }
];
