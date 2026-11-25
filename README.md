# Arohi Cloth House (आरोही क्लॉथ हाउस) – Business Website

A single-page, mobile-friendly website for Arohi Cloth House, a clothing store in Yalgud, Maharashtra.
Built with **HTML5, CSS3, Bootstrap 5, Vanilla JavaScript and Bootstrap Icons** only – no build step, no backend, no database.

## How to run

**Option 1 – open directly**
Double-click `index.html`. It opens in your browser.

**Option 2 – VS Code Live Server (recommended while editing)**
1. Open the `arohi-cloth-house` folder in VS Code.
2. Install the *Live Server* extension.
3. Right-click `index.html` → **Open with Live Server**.

> The page loads Bootstrap, Bootstrap Icons and Google Fonts from a CDN, so you need an internet connection the first time you open it.

## Folder structure

```
arohi-cloth-house/
├── index.html
├── css/style.css
├── js/script.js
├── images/
│   ├── logo.png
│   ├── hero-banner.jpg
│   ├── about.jpg
│   ├── womens-wear.jpg
│   ├── mens-wear.jpg
│   ├── kids-wear.jpg
│   ├── traditional-wear.jpg
│   ├── casual-wear.jpg
│   ├── fashion-collection.jpg
│   └── gallery/ (gallery-1.jpg … gallery-6.jpg)
└── README.md
```

## Replacing the sample images (important)

The images included are **sample photos taken from the design mockup** (they appear to be AI-generated, not photos of the real shop). Swap them with real photos of the shop and its clothing before launch:

1. Save your photo with the **same file name** in the same folder (for example `images/hero-banner.jpg`).
2. Refresh the browser (use Ctrl + F5 if you still see the old picture).

| File | Where it appears | Suggested size |
|------|------------------|----------------|
| `hero-banner.jpg` | Top banner and link previews | 2400 × 900 or similar; keep people on the right, the left side holds the heading |
| `about.jpg` | About Us section | 1600 × 1000 (landscape, 16:10) |
| `womens-wear.jpg`, `mens-wear.jpg`, `kids-wear.jpg`, `traditional-wear.jpg`, `casual-wear.jpg`, `fashion-collection.jpg` | Collection cards | 1200 × 750 (landscape, 8:5) |
| `gallery/gallery-1.jpg` … `gallery-6.jpg` | Gallery grid and lightbox | 1200 × 900 (4:3 landscape) |
| `logo.png` | Browser tab icon | 512 × 512 |

Tips: keep each photo under about 300 KB (compress at squoosh.app or tinypng.com) so the site loads quickly on mobile data. Only use photos you own or have permission to use.

To **add more gallery photos**, copy one `<div class="col-6 col-md-4"> … </div>` block inside the Gallery section of `index.html`, and change the `data-full`, `src`, `alt` and `data-caption` values. The lightbox picks up new items automatically.

To change a **gallery caption**, edit its `data-caption` value.

## Things you can change easily

- **Phone / WhatsApp number:** the number appears in `index.html` (`tel:` and `wa.me` links, and the visible text) and at the top of `js/script.js` (`WHATSAPP_NUMBER`). Search for `9404832399` and replace everywhere.
- **Colours:** edit the values at the top of `css/style.css` under `:root`.
- **Business hours:** shown as "Listed as open until 9 PM". Update the Contact section once you confirm the full timings.
- **Google Maps buttons:** the map and the *View on Google Maps* / *Get Directions* buttons search for the shop's address. If you have the shop's verified Google Maps listing link, paste it into the two buttons in the Location section (a comment marks the spot).
- **Reviews:** the section shows the 5.0/5 rating (6 reviews) and review highlights only. To show real written reviews later, copy a review card and use the customer's actual words (with permission).

## How the main features work

- **WhatsApp:** every WhatsApp button opens `wa.me/919404832399` with a ready-typed message.
- **Contact form:** checks the name, a valid 10-digit Indian mobile number and the message. When everything is correct, WhatsApp opens with the details filled in. The customer then presses Send in WhatsApp. (No form data is stored anywhere.)
- **Collection filter:** the filter buttons show one category at a time. Each card has a `data-category` value in `index.html`.
- **Gallery:** click a photo to enlarge it. Use the arrows or the keyboard left/right keys to move through photos.

## Before publishing online

1. Replace all sample images with real photos.
2. In the `<script type="application/ld+json">` block at the top of `index.html`, change `"image"` to the full web address of your hero image and add `"url": "https://your-website-address"`.
3. Change the `og:image` meta tag to the full web address of the hero image so WhatsApp and Facebook link previews show it.
4. Upload the whole folder to a free host such as Netlify, Vercel, GitHub Pages or Cloudflare Pages.

## Notes on accuracy

The site only uses the business details provided: name, address, phone/WhatsApp number, the 5.0/5 Google rating from 6 reviews, and "open until 9 PM". No prices, brands, owner details, business history, customer names or invented reviews are included.
