const PRIMARY_TABS = [
  { key: 'buy', label: 'Buying' },
  { key: 'sell', label: 'Selling' },
  { key: 'rent', label: 'Renting' },
  { key: 'commercial', label: 'Commercial' },           // ✔️ same
  { key: 'property-management', label: 'Property Management' }, // ✔️ full name
];

const SERVICES = [
  {
    key: 'real-estate',
    icon: '🏡',
    label: 'Real Estate',
    title: 'Stress-Free Buying, Selling & Managing',
    subtitle: 'Simplify your property journey in Mackay with expert local support.',
    cta: { text: 'Explore Real Estate', href: '/real-estate' },
  },
  {
    key: 'finance',
    icon: '💰',
    label: 'Finance / Home Loans',
    title: 'Over 30 Lenders. One Application.',
    subtitle: 'Get matched to the right home loan at zero cost.',
    cta: { text: 'Start Your Loan', href: '/finance' },
  },
  {
    key: 'insurance',
    icon: '🛡️',
    label: 'Insurance',
    title: 'Expert Insurance Advice, No Pressure',
    subtitle: 'Free consultations to find the perfect cover for your life or business.',
    cta: { text: 'Get Insured Smartly', href: '/insurance' },
  },
  {
    key: 'commercial',
    icon: '🏢',
    label: 'Commercial',
    title: "Invest in Mackay's Best Commercial Assets",
    subtitle: 'Buy or lease with confidence and build wealth through property.',
    cta: { text: 'Browse Opportunities', href: '/commercial' }, // ✔️ correct URL
  },
  {
    key: 'financial-planning',
    icon: '📈',
    label: 'Financial Planning',
    title: 'Affordable Advice, Built Around You',
    subtitle: 'Plan smarter with a team that cares about your financial future.',
    cta: { text: 'Book a Consultation', href: '/financial-planning' },
  },
  {
    key: 'property-management',
    icon: '🧰',
    label: 'Property Management',               // ✔️ full label
    title: 'Maximise Returns. Minimise Stress.',
    subtitle: 'Let your investment work harder with expert care.',
    cta: { text: 'Talk to a Manager', href: '/property-management' }, // ✔️ correct URL
  },
];

const LEFT_TABS = [
  { key: 'real-estate', label: 'Real Estate', icon: '🏡' },
  { key: 'finance', label: 'Finance', icon: '💰' },
  { key: 'insurance', label: 'Insurance', icon: '🛡️' },
  { key: 'commercial', label: 'Commercial', icon: '🏢' },           // ✔️ full label
  { key: 'financial-planning', label: 'Financial Planning', icon: '📈' },
  { key: 'property-management', label: 'Property Management', icon: '🧰' }, // ✔️ full label
];

// In CTA_MATRIX, ensure property-management keys use 'property-management' (not 'property-management')
const CTA_MATRIX = {
  buy: {
    'real-estate': {
      title: 'Find Your Dream Home',
      subtitle: 'Explore properties across Mackay.',
      cta: 'Browse Listings',
      href: '/real-estate',
    },
    finance: {
      title: 'Fast Loan Approval',
      subtitle: 'Get matched with over 30 lenders — no cost.',
      cta: 'Apply Now',
      href: '/finance',
    },
    insurance: {
      title: 'Protect Your Purchase',
      subtitle: 'Cover your home from day one.',
      cta: 'Get Insured',
      href: '/insurance',
    },
    'financial-planning': {
      title: 'Plan for the Future',
      subtitle: 'Smart financial guidance from day one.',
      cta: 'Talk to a Planner',
      href: '/financial-planning',
    },
    commercial: {
      title: "Invest in Commercial Properties",
      subtitle: "Browse and invest in Mackay's commercial real estate.",
      cta: "Explore Commercial",
      href: "/commercial",
    },
    'property-management': {
      title: 'Maximise Your Property Income',
      subtitle: 'Expert property management services tailored for you.',
      cta: 'Talk to a Manager',
      href: '/property-management',
    },
  },
  rent: {
    'real-estate': {
      title: 'Find a Rental You Love',
      subtitle: 'Discover the best rental properties in town.',
      cta: 'View Rentals',
      href: '/rent',
    },
    insurance: {
      title: 'Contents Insurance for Renters',
      subtitle: 'Protect what matters inside your home.',
      cta: 'Compare Options',
      href: '/insurance',
    },
    'property-management': {
      title: 'Smooth Renting Experience',
      subtitle: 'We manage the hassle so you don’t have to.',
      cta: 'Meet Your Manager',
      href: '/property-management',
    },
  },
  // add commercial rent tab if needed here
};
