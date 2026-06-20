/*
  VASBYT OVERLAND V3 DATA
  ------------------------------------------------------------
  Client workflow target:
  - Google Sheets controls products, collections and menu order.
  - Cloudinary stores product images.
  - This static file is the prototype output. Later it can be generated from Sheets.
*/

window.STORE_CONFIG = {
  brand: 'VASBYT',
  tagline: 'Adventure gear for the long road.',
  whatsappNumber: '27000000000',
  email: 'vasbytstore@gmail.com',
  location: 'South Africa',
  cloudinaryCloudName: 'demo',
  currency: 'R',
  shippingLine: 'Nationwide courier available. Stock, fitment and delivery confirmed before payment.',
  paymentLine: 'Pay by EFT or secure payment link after stock confirmation.',
  socialInstagram: '#',
  heroImage: 'assets/img/theme/trail-action.webp',
  heroAltImage: 'assets/img/theme/hilux-sunset.webp',
  footerImage: 'assets/img/theme/mud-water.webp'
};

window.MENU_COLLECTIONS = [
  {
    id: 'camping', label: 'Camping', navLabel: 'Camping', active: true, sort: 10,
    subtitle: 'Camp furniture, lighting and practical gear for long weekends away.',
    hero: 'Camp smarter with practical gear for campsites, trails and overland stops.',
    image: 'assets/img/theme/alpine-camp-sm.webp',
    keywords: ['camping','camp','chair','table','light','tent','overland','outdoor','braai','weekend']
  },
  {
    id: 'recovery', label: 'Recovery', navLabel: 'Recovery', active: true, sort: 20,
    subtitle: 'Traction, towing and recovery tools for when the road turns bad.',
    hero: 'Recovery essentials for sand, mud, rocks and remote routes.',
    image: 'assets/img/theme/mud-water-sm.webp',
    keywords: ['recovery','tow','sand','mud','traction','4x4','offroad','stuck','snatch']
  },
  {
    id: 'power', label: 'Solar & Power', navLabel: 'Power', active: true, sort: 30,
    subtitle: 'Portable power, lighting and charging for off-grid stops.',
    hero: 'Portable power and lighting for self-sufficient trips.',
    image: 'assets/img/theme/hilux-sunset-sm.webp',
    keywords: ['solar','power','battery','light','12v','off-grid','charging','electricity']
  },
  {
    id: 'vehicle-exterior', label: 'Vehicle Exterior', navLabel: 'Exterior', active: true, sort: 40,
    subtitle: 'Exterior vehicle upgrades for utility, protection and touring.',
    hero: 'Functional exterior gear built around the way South Africans travel.',
    image: 'assets/img/theme/mountain-track-sm.webp',
    keywords: ['vehicle','bakkie','roof','rack','exterior','canopy','4x4','hilux','land cruiser']
  },
  {
    id: 'vehicle-interior', label: 'Vehicle Interior', navLabel: 'Interior', active: true, sort: 50,
    subtitle: 'Storage, organisation and comfort upgrades for the cabin.',
    hero: 'Keep the cabin cleaner, calmer and more practical on the road.',
    image: 'assets/img/theme/storm-valley-sm.webp',
    keywords: ['interior','seat','storage','organiser','bakkie','cab','console']
  },
  {
    id: 'apparel', label: 'Apparel', navLabel: 'Apparel', active: true, sort: 60,
    subtitle: 'Outdoor clothing and lifestyle gear with a rugged South African feel.',
    hero: 'Wear the long-road mindset wherever you go.',
    image: 'assets/img/theme/trail-action-sm.webp',
    keywords: ['apparel','shirt','cap','jacket','clothing','hoodie','winter']
  }
];

window.PRODUCTS = [
  {id:'sanhima-camp-chair', active:true, featured:true, collection:'camping', name:'SAN HIMA Heavy-Duty Camp Chair', brand:'SAN HIMA', price:1499, salePrice:1299, stock:'In Stock', short:'A strong foldable chair made for weekends, campsites and overland stops.', description:'Heavy-duty camp comfort with a rugged frame, practical arm support and easy pack-down design. Ideal for camping, fishing, events and overland travel.', dimensions:'Approx. 60 × 55 × 90 cm', cloudinaryPublicId:'', keywords:['camping chair','chair','foldable','overland','camp','fishing','comfort']},
  {id:'utility-camp-wagon', active:true, featured:true, collection:'camping', name:'Collapsible Utility Camp Wagon', brand:'Vasbyt Gear', price:2199, salePrice:1999, stock:'In Stock', short:'Move coolers, gear and camp boxes without multiple trips.', description:'A collapsible wagon designed for campsites, festivals, beach days and outdoor setups where carrying gear becomes a mission.', dimensions:'Approx. 90 × 50 × 55 cm open', cloudinaryPublicId:'', keywords:['wagon','camping trolley','cart','camp','beach','gear transport']},
  {id:'lightfox-camp-light', active:true, featured:true, collection:'power', name:'LIGHTFOX Rechargeable Camp Light', brand:'LIGHTFOX', price:899, salePrice:749, stock:'In Stock', short:'Compact camp lighting for tents, bakkies and late-night braais.', description:'Rechargeable camp light with a practical outdoor form factor, ideal for tents, awnings, vehicle setups and emergency lighting.', dimensions:'Compact portable light', cloudinaryPublicId:'', keywords:['light','camp light','rechargeable','solar','power','tent','braai']},
  {id:'recovery-tracks-pro', active:true, featured:true, collection:'recovery', name:'Pro Recovery Traction Tracks', brand:'Vasbyt Recovery', price:2699, salePrice:2399, stock:'On Order', short:'Traction assistance for sand, mud and difficult trail exits.', description:'A practical recovery essential for 4x4 routes, farm tracks and beach sand. Built to help regain traction when the tyres start digging.', dimensions:'Approx. 108 × 31 cm each', cloudinaryPublicId:'', keywords:['recovery tracks','traction boards','sand','mud','4x4','offroad','bakkie','stuck']},
  {id:'snatch-strap-kit', active:true, featured:false, collection:'recovery', name:'Snatch Strap Recovery Kit', brand:'Vasbyt Recovery', price:1899, salePrice:1699, stock:'In Stock', short:'A recovery kit for responsible trail and farm recoveries.', description:'Essential recovery kit for controlled pulls and trail situations. Always use recovery gear safely and within rated limits.', dimensions:'Kit contents vary by stock batch', cloudinaryPublicId:'', keywords:['snatch strap','recovery kit','tow strap','4x4','mud','offroad']},
  {id:'portable-solar-panel', active:true, featured:false, collection:'power', name:'Portable Folding Solar Panel', brand:'Vasbyt Power', price:3299, salePrice:2999, stock:'In Stock', short:'Foldable solar support for camping and off-grid charging.', description:'Portable solar charging for outdoor trips, camping setups and longer stays where power access is limited.', dimensions:'Foldable panel format', cloudinaryPublicId:'', keywords:['solar panel','portable solar','charging','battery','camping','power']},
  {id:'roof-rack-platform', active:true, featured:false, collection:'vehicle-exterior', name:'Modular Roof Rack Platform', brand:'Vasbyt Exterior', price:7499, salePrice:6999, stock:'Confirm Fitment', short:'A clean utility platform for touring, storage and overland setups.', description:'Modular roof rack platform for vehicles needing more storage flexibility. Fitment must be confirmed before order.', dimensions:'Vehicle-specific sizing', cloudinaryPublicId:'', keywords:['roof rack','platform','bakkie','vehicle exterior','overland','fitment']},
  {id:'seat-back-organiser', active:true, featured:false, collection:'vehicle-interior', name:'Seat Back Storage Organiser', brand:'Vasbyt Interior', price:799, salePrice:699, stock:'In Stock', short:'Keep tools, cables and small gear controlled inside the vehicle.', description:'Interior organisation for daily use, long trips, hunting weekends and family travel. Keeps small items visible and reachable.', dimensions:'Universal seat-back design', cloudinaryPublicId:'', keywords:['seat organiser','storage','interior','vehicle','bakkie','travel']},
  {id:'vasbyt-heritage-cap', active:true, featured:false, collection:'apparel', name:'Vasbyt Heritage Cap', brand:'VASBYT', price:349, salePrice:299, stock:'In Stock', short:'Clean everyday cap with a rugged outdoor identity.', description:'A simple lifestyle cap for travel days, camp setups and everyday wear.', dimensions:'Adjustable fit', cloudinaryPublicId:'', keywords:['cap','hat','apparel','clothing','outdoor','vasbyt']},
  {id:'trail-utility-jacket', active:true, featured:true, collection:'apparel', name:'Trail Utility Jacket', brand:'VASBYT', price:1199, salePrice:999, stock:'Limited Stock', short:'A practical outer layer for cold mornings and rough weather.', description:'Outdoor utility jacket with a practical everyday fit. Made for early starts, travel days and unpredictable weather.', dimensions:'S / M / L / XL subject to stock', cloudinaryPublicId:'', keywords:['jacket','winter','apparel','cold','outdoor','trail']}
];
