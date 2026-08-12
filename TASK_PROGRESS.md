# ANNT NANDAS FOUNDATION - Pixel Perfect Recreation

## Phase 1: Foundation Setup
- [x] Analyze existing codebase
- [x] Simplify tailwind.config.js to match traditional NGO style
- [x] Rewrite globals.css with clean, minimal styles
- [x] Update layout.tsx
- [x] Create reusable image component

## Phase 2: Navigation & Loading
- [x] Rewrite Navbar (top contact bar, sticky nav, white bg, dropdowns)
- [x] Rewrite LoadingScreen (white bg, logo, blue ring, green leaf, loading bar, 2.5s)

## Phase 3: Homepage - Top Sections
- [x] Rewrite Hero (full-screen Himalayan bg, overlay, heading with "Limits" in green, CTAs, floating stats card below)
- [x] Rewrite AboutSection (image collage left, content + feature cards right, blue CTA)
- [x] Rewrite OurWorkSection (6 large cards, 3-col grid, image top, title, desc, Read More)

## Phase 4: Homepage - Middle Sections
- [x] Rewrite ImpactSection ("Areas Where We Create Impact", 6 colorful cards, hover effect)
- [x] Rewrite EventsSection (3 horizontal cards, date badge, location, register button)
- [x] Rewrite DonationStrip (blue gradient strip, icons, CTA button)

## Phase 5: Homepage - Bottom Sections
- [x] Rewrite GallerySection (top nav tabs: All/Videos/Events, clean grid, hover zoom, lightbox, View Full Gallery)
- [x] Rewrite NewsSection (3 news cards, image, date, title, Read More)
- [x] Rewrite TestimonialsSection (3 cards, circular photo, name, quote, rating dots)
- [x] Rewrite DonateSection (QR code, UPI ID, amount buttons: ₹500/₹1000/₹2000/₹5000/Custom)

## Phase 6: Footer
- [x] Rewrite Footer (dark blue, logo, Quick Links, Programs, Support, Contact, Newsletter, copyright)

## Phase 7: Inner Pages
- [x] Rewrite About page
- [x] Rewrite Our Work page
- [x] Rewrite Programs page
- [x] Rewrite Events page
- [x] Rewrite News page
- [x] Rewrite Gallery page
- [x] Rewrite Contact page
- [x] Rewrite Donate page (QR code)
- [x] Rewrite Volunteer registration page (via RegistrationForm)
- [x] Rewrite Employee registration page
- [x] Rewrite Running registration page
- [x] Rewrite General registration page

## Phase 8: Build & Verify
- [x] Build with no errors (all 16 pages compiled successfully)
- [x] Fixed broken asset imports causing webpack module-not-found errors (27 references across 5 components)
- [x] Mapped all image imports to actual existing asset files
- [x] Regenerated corrupted SVG files (gallery-049.svg from 1KB→1MB, event-4.svg from 1KB→719KB) using convert_to_svg.py
- [x] Organized images by domain: environment/, healthcare/, edu/, women empowerment/, hero MOB/ folders
- [x] Hero main page background set with gallery-049.svg & gallery-020.svg (desktop + mobile responsive)
- [x] Updated AboutSection.tsx: educationImg→edu/, plantationImg→environment/, sportsImg→gallery-015
- [x] Updated OurWorkSection.tsx: Healthcare→event-4.svg, Environment→gallery-049.svg, added group hover zoom
- [x] Updated our-work/page.tsx: Added imageUrl for Healthcare and Environment sections
- [x] Updated programs/page.tsx: Added imageUrl for Healthcare and Environment sections
- [x] Build passes, all 16 pages prerender as static content

## Phase 9: Content Source Alignment (PDF)
- [x] Full PDF text extracted to `ngo_pdf_extract.txt` (68 pages, pypdf)
- [x] Content map confirmed: history (1st May 2023 start, 2 bicycles/12 children), founder Kalam Singh Bisht, mission/vision/values, 6-step Talent Discovery Model, programs (sports/education/healthcare/environment/agriculture/animal-welfare/women-empowerment/livelihood/youth), AVIRALL Nannda Run, governance, FAQs
- [x] Contact details confirmed: info@annt-1.com, +91 9639263202, +91 7579004581, Mundoli Chamoli Uttarakhand
- [x] Registration details confirmed: Section 8 COY, CIN U85410UT2026NPL021583, DARPAN UK/2026/1106277, registered 27 May 2026