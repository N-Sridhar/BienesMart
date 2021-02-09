import {lazy} from 'react';

// Header & Footer
export const Header = lazy(() => import('./Header'));
export const Footer = lazy(() => import('./Footer'));

// Sign In & Up.
const Signin = lazy(() => import('./Signin'));
export const signinPath = '/signin';
const Signup = lazy(() => import('./Signup'));
export const signupPath = '/signup';

export const authScreens = [
  {path: signinPath, view: Signin},
  {path: signupPath, view: Signup},
];

/**
 * Public Screens
 */

// Apparels
const Unisex = lazy(() => import('./categories/apparels/unisex/Unisex'));
const Mens = lazy(() => import('./categories/apparels/mens/Mens'));
const Womens = lazy(() => import('./categories/apparels/womens/Womens'));
const Kids = lazy(() => import('./categories/apparels/kids/Kids'));
export const apparelsPath = {
  Unisex: '/unisex',
  Mens: '/mens',
  Womens: '/womens',
  Kids: '/kids',
};
// Unisex
const Hoodies = lazy(() => import('./categories/apparels/unisex/Hoodies'));
const Rhalf = lazy(() => import('./categories/apparels/unisex/Rhalf'));
const Rfull = lazy(() => import('./categories/apparels/unisex/Rfull'));
const Raglan = lazy(() => import('./categories/apparels/unisex/Raglan'));
export const unisexPath = {
  Hoodies: '/unisex/hoodies',
  Rhalf: '/unisex/rhalf',
  Rfull: '/unisex/rfull',
  Raglan: '/unisex/raglan',
};

// Accessories
const MobileCases = lazy(() =>
  import('./categories/accessories/mobilecases/MobileCases')
);
const PopGrips = lazy(() => import('./categories/accessories/PopGrips'));
const Mugs = lazy(() => import('./categories/accessories/mugs/Mugs'));
const Sippers = lazy(() => import('./categories/accessories/Sippers'));
const ToteBags = lazy(() =>
  import('./categories/accessories/totebags/ToteBags')
);
const Coasters = lazy(() =>
  import('./categories/accessories/coasters/Coasters')
);
const MousePads = lazy(() => import('./categories/accessories/MousePads'));
const NotePads = lazy(() =>
  import('./categories/accessories/notepads/NotePads')
);
export const accessoriesPath = {
  MobileCases: '/mobilecases',
  PopGrips: '/popgrips',
  Mugs: '/mugs',
  Sippers: '/sippers',
  ToteBags: '/totebags',
  Coasters: '/coasters',
  MousePads: '/mousepads',
  NotePads: '/notepads',
};

// Decors
const Canvas = lazy(() => import('./categories/decors/Canvas'));
const PhotoFrames = lazy(() => import('./categories/decors/PhotoFrames'));
const Posters = lazy(() => import('./categories/decors/posters/Posters'));
const DreamCatchers = lazy(() =>
  import('./categories/decors/dreamcatchers/DreamCatchers')
);
export const decorsPath = {
  Canvas: '/canvas',
  PhotoFrames: '/photoframes',
  Posters: '/posters',
  DreamCatchers: '/dreamcatchers',
};

// Bulk Orders
const BulkOrders = lazy(() => import('./categories/BulkOrders'));
export const bulkOrdersPath = '/bulkorders';

const Terms = lazy(() => import('./Terms'));
export const termsPath = '/terms';

export const publicScreens = [
  /* Apparels */
  {path: apparelsPath['Unisex'], view: Unisex},
  {path: apparelsPath['Mens'], view: Mens},
  {path: apparelsPath['Womens'], view: Womens},
  {path: apparelsPath['Kids'], view: Kids},

  /* Unisex */
  {path: unisexPath['Hoodies'], view: Hoodies},
  {path: unisexPath['Rhalf'], view: Rhalf},
  {path: unisexPath['Rfull'], view: Rfull},
  {path: unisexPath['Raglan'], view: Raglan},

  /* Accessories */
  {path: accessoriesPath['MobileCases'], view: MobileCases},
  {path: accessoriesPath['PopGrips'], view: PopGrips},
  {path: accessoriesPath['Mugs'], view: Mugs},
  {path: accessoriesPath['Sippers'], view: Sippers},
  {path: accessoriesPath['ToteBags'], view: ToteBags},
  {path: accessoriesPath['Coasters'], view: Coasters},
  {path: accessoriesPath['MousePads'], view: MousePads},
  {path: accessoriesPath['NotePads'], view: NotePads},
  /* Decors */
  {path: decorsPath['Canvas'], view: Canvas},
  {path: decorsPath['PhotoFrames'], view: PhotoFrames},
  {path: decorsPath['Posters'], view: Posters},
  {path: decorsPath['DreamCatchers'], view: DreamCatchers},
  {path: termsPath, view: Terms},
  /* Bulk Orders */
  {path: bulkOrdersPath, view: BulkOrders},
];

const Account = lazy(() => import('./Account'));
export const accountPath = '/account';

export const protectedScreens = [{path: accountPath, view: Account}];
