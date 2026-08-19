import heroImage from "@/assets/hero/HERO.webp";
import heroAltImage from "@/assets/hero/HERO (1).webp";
import heroVisualOne from "@/assets/hero/HERO (2).webp";
import heroVisualTwo from "@/assets/hero/HERO (3).webp";
import heroVisualThree from "@/assets/hero/HERO (4).webp";
import founderImage from "@/assets/Kalam singh bisht/event-011.jpg.webp";
import founderCollageOne from "@/assets/Kalam singh bisht/collage (4).webp";
import founderCollageTwo from "@/assets/Kalam singh bisht/collage (5).webp";
import educationImage from "@/assets/education/gallery-032.jpg.webp";
import educationImageTwo from "@/assets/education/gallery-066.jpg.webp";
import educationImageThree from "@/assets/education/gallery-067.jpg.webp";
import womenImage from "@/assets/women empowerment/gallery-029.jpg.webp";
import womenImageTwo from "@/assets/women empowerment/gallery-031.jpg.webp";
import womenImageThree from "@/assets/women empowerment/image.webp";
import healthcareImage from "@/assets/healthcare/event (4).webp";
import environmentImage from "@/assets/environment/gallery-049.jpg.webp";
import eventOne from "@/assets/events/event (1).webp";
import eventTwo from "@/assets/events/event (4).webp";
import eventThree from "@/assets/events/event (10).webp";
import eventFour from "@/assets/events/event (14).webp";
import eventFive from "@/assets/events/event (16).webp";
import eventSix from "@/assets/events/event-010.jpg.webp";
import newsHero from "@/assets/news/news.webp";
import newsOne from "@/assets/news/news (1).webp";
import newsTwo from "@/assets/news/news (2).webp";
import newsThree from "@/assets/news/news (3).webp";
import newsFour from "@/assets/news/news (4).webp";
import newsFive from "@/assets/news/news (5).webp";
import newsSix from "@/assets/news/news (6).webp";
import galleryOne from "@/assets/gallery/gallery (1).webp";
import galleryTwo from "@/assets/gallery/gallery (2).webp";
import galleryThree from "@/assets/gallery/gallery (3).webp";
import galleryFour from "@/assets/gallery/gallery (4).webp";
import galleryFive from "@/assets/gallery/gallery-015.jpg.webp";
import gallerySix from "@/assets/gallery/gallery-020.jpg.webp";
import gallerySeven from "@/assets/gallery/gallery-021.jpg.webp";
import galleryEight from "@/assets/gallery/gallery-024.jpg.webp";
import galleryNine from "@/assets/gallery/gallery-031.jpg.webp";
import galleryTen from "@/assets/gallery/gallery-034.jpg.webp";
import galleryEleven from "@/assets/gallery/gallery-041.jpg.webp";
import galleryTwelve from "@/assets/gallery/gallery-054.jpg.webp";
import galleryThirteen from "@/assets/gallery/gallery-060.jpg.webp";
import galleryFourteen from "@/assets/gallery/gallery-065.jpg.webp";
import collageOne from "@/assets/collage/collage (1).webp";
import collageTwo from "@/assets/collage/collage (6).webp";
import collageThree from "@/assets/collage/collage (10).webp";
import collageFour from "@/assets/collage/gallery (1).webp";
import collageFive from "@/assets/collage/gallery (2).webp";
import donationQr from "@/assets/qr.png";

export const siteConfig = {
  name: "ANNT NANDAS FOUNDATION",
  shortName: "ANF",
  tagline: "From the Heart of the Himalayas, Building Futures Without Limits",
  motto: "Our Effort, In Search of Hidden Talent.",
  description: "Empowering communities through education, health, sports, opportunity, and sustainable rural development.",
  email: "info@anntnandasfoundation.com",
  phone1: "+91 9639263202",
  phone2: "+91 7579004581",
  address: "Mundoli, Chamoli, Uttarakhand, India",
  founded: "1 May 2023",
  registered: "27 May 2026",
  founder: "Kalam Singh Bisht",
  registrationNo: "U85410UT2026NPL021583",
  darpanId: "UK/2026/1106277",
  tan: "MRTA30864B",
  registration12A: "ABFCA8056ME2026101",
  registration80G: "ABFCA8056MF2026102",
  social: {
    email: "mailto:info@anntnandasfoundation.com",
    facebook: "https://www.facebook.com/anita.bisht.549436/videos/anant-nanda-foundation-ki-team/1159831703008107/",
    instagram: "https://www.instagram.com/klamsnghbisht?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDC0MzIxMw==",
    youtube: "https://www.youtube.com/@ANNTNANDASFOUNDATION",
  },
};

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export const heroContent = {
  eyebrow: "From the heart of the Himalayas",
  heading: "Small Steps Today, Limitless Impact Tomorrow.",
  subheading:
    "We empower children and communities through education, opportunity, and sustainable initiatives for a brighter, stronger tomorrow.",
  description:
    "Founded on 1st May 2023 in Mundoli, our journey began with two bicycles and twelve children. Today, we continue to discover hidden talent, uplift underserved families, and create meaningful pathways to independence.",
  ctaPrimary: { label: "Explore Our Journey", href: "/about" },
  ctaSecondary: { label: "Watch Our Story", href: "/our-work" },
  image: heroAltImage,
  backgroundImage: heroImage,
  floatingCards: [
    { title: "Sports & Youth Development", image: eventOne },
    { title: "Education & Skill Development", image: educationImage },
    { title: "Environment Conservation", image: environmentImage },
    { title: "Women Empowerment", image: womenImage },
  ],
  supportingVisuals: [heroVisualOne, heroVisualTwo, heroVisualThree],
};

export const impactStats = [
  { label: "Villages Connected", value: "45+", icon: "villages" },
  { label: "Children Supported", value: "1,250+", icon: "children" },
  { label: "Events Conducted", value: "120+", icon: "events" },
  { label: "Volunteers Engaged", value: "350+", icon: "volunteers" },
  { label: "Trees Planted", value: "5,000+", icon: "trees" },
  { label: "Community Partners", value: "25+", icon: "partners" },
];

export const storyChapters = [
  {
    title: "Two Bicycles, Twelve Children",
    description:
      "ANNT NANDAS FOUNDATION began with a deeply local mission: help rural children believe in their own possibilities through discipline, support, and opportunity.",
  },
  {
    title: "A Grassroots Movement",
    description:
      "What started in Mundoli grew through trust, mentorship, and hands-on work with children, youth, women, parents, and village communities.",
  },
  {
    title: "Beyond Relief, Toward Self-Reliance",
    description:
      "We focus on confidence, skill-building, education, health awareness, and dignified livelihoods that lead to long-term independence.",
  },
  {
    title: "Building Futures Without Limits",
    description:
      "Our mission today is to connect talent with opportunity and help Himalayan communities shape stronger, more resilient futures.",
  },
];

export const talentDiscoverySteps = [
  {
    title: "Reach the Village",
    description: "We start by listening to local realities and understanding the aspirations of children, youth, and families.",
  },
  {
    title: "Build Trust",
    description: "Through regular presence, mentorship, and activities, we create a safe and encouraging environment.",
  },
  {
    title: "Identify Potential",
    description: "We look for hidden talent in sports, leadership, education, creativity, and life skills across rural communities.",
  },
  {
    title: "Train With Intention",
    description: "Children and youth receive structured support, coaching, guidance, and exposure suited to their strengths.",
  },
  {
    title: "Support Families",
    description: "We work with parents and communities so opportunity is reinforced at home and sustained over time.",
  },
  {
    title: "Create Independence",
    description: "The real goal is not short-term help, but confidence, livelihoods, and resilient futures.",
  },
];

export const journeyMilestones = [
  {
    year: "2023",
    title: "The Beginning in Mundoli",
    description:
      "Founded on 1st May 2023 in the small Himalayan village of Mundoli with two bicycles, twelve children, and a vision for long-term change.",
  },
  {
    year: "2024",
    title: "Growing Through Programmes",
    description:
      "The movement expanded across sports, education, environment, health awareness, and community outreach through grassroots participation.",
  },
  {
    year: "2025",
    title: "Deepening Local Impact",
    description:
      "Training camps, village engagement, women-led initiatives, and youth opportunities accelerated the foundation’s reach and trust.",
  },
  {
    year: "2026",
    title: "Registered as ANNT NANDAS FOUNDATION",
    description:
      "The organisation formally registered as a Section 8 company, strengthening its ability to scale its mission responsibly.",
  },
];

export const coreValues = [
  { icon: "🙏", title: "Service Before Self", desc: "Community well-being comes first in every programme and partnership." },
  { icon: "⚖️", title: "Integrity", desc: "We believe trust is built through transparency, honesty, and consistency." },
  { icon: "🎯", title: "Discipline", desc: "Daily practice and commitment help transform talent into achievement." },
  { icon: "💚", title: "Compassion", desc: "We lead with dignity, care, and empathy across all age groups and communities." },
  { icon: "⭐", title: "Excellence", desc: "Every child and participant deserves thoughtful support and the highest standards." },
  { icon: "♻️", title: "Sustainability", desc: "We design interventions that create long-term value, not short-lived relief." },
  { icon: "🤝", title: "Inclusion", desc: "Opportunity must reach every gender, caste, religion, and background." },
  { icon: "🌄", title: "Local Pride", desc: "Our work is rooted in the culture, resilience, and spirit of the Himalayas." },
];

export const foundersGallery = [founderImage, founderCollageOne, founderCollageTwo];

export const founderInfo = {
  name: "Kalam Singh Bisht",
  title: "Founder, Mentor & Ultra Trail Runner",
  description:
    "An ex-serviceman whose journey from the Indian Army to Himalayan communities continues to inspire our mission.",
  fullBio:
    "He started with two bicycles and twelve children, believing that discipline, opportunity, and care can transform a generation. His leadership continues to guide the Foundation’s work across education, sports, health, environment, and community empowerment.",
  image: founderImage,
  achievements: [
    "Ex-Serviceman, 4th Battalion, The Garhwal Rifles",
    "International Ultra Trail Runner",
    "Founder of ANNT NANDAS FOUNDATION",
    "Grassroots mentor and community mobiliser",
    "Committed to long-term Himalayan transformation",
  ],
  quote:
    "Every child possesses a gift. Our responsibility is to discover it, nurture it, and help it become a source of confidence and independence.",
};

export const impactAreas = [
  {
    title: "Education & Skill Development",
    icon: "📘",
    description:
      "Quality education, digital literacy, spoken English, academic support, and skills that unlock confident futures.",
    color: "from-blue-500 to-cyan-500",
    image: educationImage,
    gallery: [educationImage, educationImageTwo, educationImageThree],
    points: [
      "Digital literacy and computer learning",
      "Academic support for rural children",
      "Spoken English and confidence-building",
      "Career guidance and exam readiness",
    ],
  },
  {
    title: "Healthcare & Wellness",
    icon: "❤️",
    description:
      "Health camps, hygiene awareness, preventive care, women’s health, and community wellness initiatives.",
    color: "from-rose-500 to-orange-400",
    image: healthcareImage,
    gallery: [healthcareImage, eventTwo, collageFour],
    points: [
      "Free health and awareness camps",
      "Nutrition and hygiene support",
      "Women’s health outreach",
      "Community wellness initiatives",
    ],
  },
  {
    title: "Environment Conservation",
    icon: "🌿",
    description:
      "Tree plantation, ecological awareness, cleaner villages, and practical stewardship for the Himalayan landscape.",
    color: "from-emerald-500 to-lime-400",
    image: environmentImage,
    gallery: [environmentImage, gallerySix, galleryEight],
    points: [
      "Tree plantation and forest care",
      "Plastic-free awareness drives",
      "Climate and sustainability education",
      "Community action for greener villages",
    ],
  },
  {
    title: "Women Empowerment",
    icon: "👩",
    description:
      "Leadership, confidence, participation, and skill-based support for women and girls in rural communities.",
    color: "from-violet-500 to-fuchsia-500",
    image: womenImage,
    gallery: [womenImage, womenImageTwo, womenImageThree],
    points: [
      "Leadership and confidence-building",
      "Community participation and mentorship",
      "Skill development opportunities",
      "Supportive spaces for women and girls",
    ],
  },
  {
    title: "Sports & Youth Development",
    icon: "🏃",
    description:
      "Training, discipline, teamwork, and exposure that help rural youth pursue bigger dreams through sport.",
    color: "from-amber-500 to-orange-500",
    image: eventOne,
    gallery: [eventOne, eventThree, eventFour],
    points: [
      "Running, cycling, and athletic training",
      "Youth engagement through sports",
      "Discipline, fitness, and teamwork",
      "Competitive exposure and confidence",
    ],
  },
  {
    title: "Livelihood & Community Development",
    icon: "💼",
    description:
      "Practical support that helps individuals and communities move toward dignity, employment, and self-reliance.",
    color: "from-sky-500 to-indigo-500",
    image: collageTwo,
    gallery: [collageOne, collageTwo, collageThree],
    points: [
      "Community capacity building",
      "Youth mentorship and guidance",
      "Livelihood-focused support",
      "Local participation and resilience",
    ],
  },
];

export const featureCards = impactAreas.map((area) => ({
  title: area.title,
  description: area.description,
  image: area.image,
  href: "/programs",
  icon: area.icon,
}));

export const upcomingEvents = [
  {
    title: "Volunteer Drive · Mundoli Village",
    date: "15 Jun 2026",
    day: "15",
    month: "Jun",
    location: "Mundoli, Chamoli",
    time: "08:00 AM – 05:00 PM",
    description:
      "A grassroots volunteer day focused on community support, mentorship, and direct participation in local initiatives.",
    type: "Volunteer",
    image: eventOne,
    href: "/volunteer-registration",
  },
  {
    title: "Himalayan Run Cycling Event",
    date: "22 Jun 2026",
    day: "22",
    month: "Jun",
    location: "Chamoli, Uttarakhand",
    time: "06:00 AM – 12:00 PM",
    description:
      "A community-led event celebrating endurance, discipline, and the spirit of youth participation in the hills.",
    type: "Sports",
    image: eventThree,
    href: "/sports-registration",
  },
  {
    title: "Education Outreach Workshop",
    date: "10 Jul 2026",
    day: "10",
    month: "Jul",
    location: "Village Learning Centre",
    time: "10:00 AM – 02:00 PM",
    description:
      "Interactive sessions for children and families focused on learning support, guidance, and skill-building.",
    type: "Education",
    image: educationImageTwo,
    href: "/general-registration",
  },
  {
    title: "Community Health Support Camp",
    date: "26 Jul 2026",
    day: "26",
    month: "Jul",
    location: "Mundoli Community Ground",
    time: "09:00 AM – 03:00 PM",
    description:
      "Preventive care, health awareness, and community wellness support through a local outreach camp.",
    type: "Healthcare",
    image: healthcareImage,
    href: "/general-registration",
  },
];

export const newsItems = [
  {
    title: "Sports Training Program Expands to 16 New Villages",
    date: "16 May 2025",
    summary:
      "The foundation strengthened grassroots access to sports training by extending its presence into additional Himalayan villages.",
    category: "Sports",
    image: newsOne,
  },
  {
    title: "Free Health Camp Organized in Mundoli",
    date: "26 Apr 2025",
    summary:
      "A village-focused health initiative brought wellness support, awareness, and essential consultation closer to families.",
    category: "Healthcare",
    image: newsTwo,
  },
  {
    title: "Students Excel in District-Level Competitions",
    date: "14 Apr 2025",
    summary:
      "Children supported through the foundation’s academic and development initiatives delivered inspiring performance at district events.",
    category: "Education",
    image: newsThree,
  },
  {
    title: "Women-Led Community Sessions Build Confidence",
    date: "09 Mar 2025",
    summary:
      "Women empowerment activities continue to create safe, collaborative, and motivating spaces in local communities.",
    category: "Women Empowerment",
    image: newsFour,
  },
  {
    title: "Tree Plantation Drive Strengthens Local Awareness",
    date: "02 Aug 2025",
    summary:
      "Environmental outreach combined plantation work with awareness on sustainability and shared responsibility.",
    category: "Environment",
    image: newsFive,
  },
  {
    title: "Youth Leadership Activities Inspire New Participation",
    date: "11 Sep 2025",
    summary:
      "Mentorship and structured activity programmes helped more young people step into leadership and service roles.",
    category: "Youth Development",
    image: newsSix,
  },
];

export const testimonials = [
  {
    name: "Pooja Negi",
    role: "Parent, Mundoli",
    content:
      "The foundation has given my child the confidence to dream big and work hard.",
    image: womenImageThree,
    rating: 5,
  },
  {
    name: "Village Volunteer",
    role: "Community Supporter",
    content:
      "What makes this work special is the consistency. The team keeps showing up, listening, and helping young people grow.",
    image: collageFive,
    rating: 5,
  },
  {
    name: "Student Participant",
    role: "Youth Learner",
    content:
      "The training and guidance helped me believe that someone from my village can achieve something meaningful.",
    image: galleryNine,
    rating: 5,
  },
];

export const partners = [
  { name: "Local Schools & Institutions", category: "Education" },
  { name: "Village Communities", category: "Grassroots" },
  { name: "Volunteers & Mentors", category: "People" },
  { name: "Social Development Partners", category: "NGO" },
  { name: "Health & Wellness Contributors", category: "Healthcare" },
  { name: "Environmental Supporters", category: "Environment" },
];

export const donationImpacts = [
  { amount: 500, impact: "Support educational materials for a child" },
  { amount: 1000, impact: "Help conduct a grassroots sports or learning activity" },
  { amount: 5000, impact: "Strengthen a village-level programme or event" },
  { amount: 10000, impact: "Back broader community development initiatives" },
];

export const donationInfo = {
  qrImage: donationQr,
  upiId: "sbibhim.instant40718938615865236@sbipay",
  payeeName: "ANNT NANDAS FOUNDATION",
  title: "Donate Through UPI",
  description:
    "Choose an amount and donate through Google Pay or any UPI app. If a payment app does not open, scan the QR code or copy the UPI ID.",
  instructions: [
    "Select a donation amount.",
    "Tap Donate Now to open Google Pay or your UPI app on a supported phone.",
    "If a payment app does not open, scan the amount-specific QR or copy the UPI ID.",
    "Confirm the payee name: ANNT NANDAS FOUNDATION.",
    "Save the transaction reference for acknowledgement.",
  ],
};

export const donationAmounts = [500, 1000, 5000, 10000];

export const volunteerOpportunities = [
  {
    title: "Teaching & Mentorship",
    description: "Support village learning sessions and help children build confidence in school subjects.",
    href: "/volunteer-registration",
  },
  {
    title: "Sports Coaching",
    description: "Help run running, cycling, and youth fitness activities in Himalayan communities.",
    href: "/sports-registration",
  },
  {
    title: "Community Outreach",
    description: "Join health camps, environment drives, and village events as they are announced.",
    href: "/volunteer-registration",
  },
];

export const galleryCategories = ["All", "Photos", "Videos"];

export const galleryItems = [
  { label: "Himalayan Journey", type: "photo", imageSrc: heroImage, theme: "Hero" },
  { label: "Children in Learning Session", type: "photo", imageSrc: educationImage, theme: "Education" },
  { label: "Community Moments", type: "photo", imageSrc: galleryOne, theme: "Community" },
  { label: "Sports Training", type: "photo", imageSrc: eventOne, theme: "Sports" },
  { label: "Environmental Outreach", type: "photo", imageSrc: environmentImage, theme: "Environment" },
  { label: "Women Empowerment Session", type: "photo", imageSrc: womenImage, theme: "Women Empowerment" },
  { label: "Health Camp Highlights", type: "photo", imageSrc: healthcareImage, theme: "Healthcare" },
  { label: "Village Participation", type: "photo", imageSrc: galleryTwo, theme: "Community" },
  { label: "Mentorship & Guidance", type: "photo", imageSrc: galleryThree, theme: "Youth" },
  { label: "Running Event", type: "photo", imageSrc: eventThree, theme: "Sports" },
  { label: "Smiles of Change", type: "photo", imageSrc: galleryFour, theme: "Community" },
  { label: "Program Fieldwork", type: "photo", imageSrc: collageOne, theme: "Impact" },
  { label: "Education Collage", type: "photo", imageSrc: galleryFive, theme: "Education" },
  { label: "Green Initiative", type: "photo", imageSrc: gallerySix, theme: "Environment" },
  { label: "Women Leadership", type: "photo", imageSrc: gallerySeven, theme: "Women Empowerment" },
  { label: "Village Landscape", type: "photo", imageSrc: galleryEight, theme: "Landscape" },
  { label: "Youth Group", type: "photo", imageSrc: galleryNine, theme: "Youth" },
  { label: "Community Gathering", type: "photo", imageSrc: galleryTen, theme: "Community" },
  { label: "Field Experience", type: "photo", imageSrc: galleryEleven, theme: "Impact" },
  { label: "Action Day", type: "photo", imageSrc: galleryTwelve, theme: "Events" },
  { label: "Village Smiles", type: "photo", imageSrc: galleryThirteen, theme: "Community" },
  { label: "Hope in Motion", type: "photo", imageSrc: galleryFourteen, theme: "Transformation" },
  { label: "Programme Documentary", type: "video", imageSrc: heroAltImage, theme: "Story" },
  { label: "Event Highlights", type: "video", imageSrc: eventFour, theme: "Events" },
  { label: "Community Impact Reel", type: "video", imageSrc: eventFive, theme: "Community" },
  { label: "Founder Journey", type: "video", imageSrc: founderImage, theme: "Founder" },
  { label: "Youth Voices", type: "video", imageSrc: eventSix, theme: "Youth" },
  { label: "Education in Action", type: "video", imageSrc: educationImageThree, theme: "Education" },
];

export const collageImages = [collageOne, collageTwo, collageThree, collageFour, collageFive];
export const homeVisualGrid = [galleryOne, galleryTwo, galleryThree, galleryFour];
export const newsHeroImage = newsHero;

export const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
export const occupationOptions = [
  "Student",
  "Teacher",
  "Government Employee",
  "Private Employee",
  "Business Owner",
  "Farmer",
  "Athlete",
  "Retired",
  "Unemployed",
  "Other",
];