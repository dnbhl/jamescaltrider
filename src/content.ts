/**
 * All site copy lives here so it can be edited in one place
 * (and ported to Framer / a CMS later without touching components).
 * Text is carried over from jimmycaltrider.com with light copy-editing.
 */

export const site = {
  name: 'Jimmy Caltrider',
  phone: '802-579-6868',
  phoneHref: 'tel:+18025796868',
  email: 'jcaltrider6889@gmail.com',
  location: 'Based in Brooklyn, New York',
  studioAddress: '630 Flushing Ave',
  studioMapUrl: 'https://maps.app.goo.gl/6igkF3CTXJ7xUyy19?g_st=ic',
  designerName: 'Rana Abdalla',
  designerUrl: 'https://ranaabdalla.com/',
  recommendedKitUrl: 'https://amzn.to/4xQRPcw',
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQs', href: '#faqs' },
];

export const hero = {
  title: 'Private Drum Lessons for Kids & Adults in Brooklyn & Manhattan',
  subtitle:
    'Taught by a professional NYC drummer — private lessons at my Brooklyn studio, in your home, or online.',
  body:
    "Hey! I'm Jimmy Caltrider, a drummer with a deep passion for music and a love for sharing that excitement through teaching. I offer private drum lessons out of my studio in Brooklyn or I can come to you for a lesson in the comfort of your own home, anywhere in NYC! All ages, all skill levels. Hit the button below to reach out to me personally for more info. Let's play!",
  cta: 'Get in Touch',
  imageAlt:
    'Jimmy Caltrider smiling while playing drums on stage in front of a wall of colorful glass lights',
};

export const about = {
  heading: 'About me',
  paragraphs: [
    "I hold a Bachelor's degree in Percussion Performance from Keene State College in New Hampshire, near where I grew up and where I began playing drums at the age of 12!",
    "Over the years, I've had the privilege of performing in a wide range of settings and styles. I spent four years drumming and band leading on cruise ships, which gave me invaluable experience in live performance and entertainment as well as many amazing travel experiences! I've also played with numerous bands and artists since moving to New York City in 2021, hitting iconic venues like Brooklyn Bowl, Mercury Lounge, and Bowery Ballroom and many others.",
  ],
  resumeLabel: 'Resume',
  portraitAlt: 'Jimmy Caltrider in a light grey suit holding a snare drum and drumsticks',
  teaching:
    "As a teacher, I combine technical knowledge with real-world experience to create a dynamic and engaging learning environment. I work with students of all ages and levels, helping them develop their skills, confidence, and musicality. I take a special focus on figuring out your drumming goals and use your best learning style to create a tailored experience. Whether you're just starting out or looking to refine your technique, I'm excited to help you reach your full potential behind the drum kit!",
  funFactLead: 'Fun fact:',
  funFact:
    'Catch me playing drums in the Bob Dylan biopic A Complete Unknown, starring Timothée Chalamet. Check out the clip below!',
  livePhotoAlt: 'Black and white overhead photo of Jimmy Caltrider performing live on a drum kit',
};

/** Résumé overlay — every line below is drawn from the existing site copy. */
export const resume = [
  {
    term: 'Education',
    detail: "Bachelor's degree in Percussion Performance",
    note: 'Keene State College, New Hampshire',
  },
  {
    term: 'Film',
    detail: 'A Complete Unknown — on-screen drummer',
    note: 'Bob Dylan biopic starring Timothée Chalamet',
  },
  {
    term: 'New York City',
    detail: 'Brooklyn Bowl · Mercury Lounge · Bowery Ballroom',
    note: 'Performing with numerous bands and artists since 2021',
  },
  {
    term: 'Touring',
    detail: 'Four years drumming and band leading on cruise ships',
    note: 'Live performance and entertainment, worldwide',
  },
  {
    term: 'Teaching',
    detail: 'Private lessons for all ages and skill levels',
    note: 'In your home, at my Brooklyn studio, or online',
  },
];

export const clip = {
  eyebrow: 'As seen in',
  title: 'A Complete Unknown — Bob Dylan biopic',
  playLabel: 'Play the clip',
  pauseLabel: 'Pause',
  src: '/video/complete-unknown-clip-720p.mp4',
  poster: '/images/film-clip-poster.jpg',
};

export const lessons = {
  heading: 'Let’s Drum…',
  items: [
    {
      title: 'At Your Home!',
      tag: 'For the eager student with a busy schedule',
      body:
        "I'll come to you for a lesson in the comfort of your own home or apartment! Given the loudness of a real acoustic drum set, electric drums are a great choice to have in the city. They come with hundreds of different sounds and keep your neighbors happy! Using headphones or a small amp is a great option.",
      link: {
        label: "Here's a recommended electric drum set for beginner to intermediate students!",
        href: site.recommendedKitUrl,
        external: true,
      },
    },
    {
      title: 'At My Studio!',
      tag: 'For the mobile student who wants to get loud!',
      body:
        "Come to my studio on the Williamsburg Bed-Stuy border where I have a full acoustic drum set ready to go. Practicing on electronic kits is a great convenience, but it's good to try the real thing… not to mention, it's also very fun!",
      link: {
        label: `${site.studioAddress}, Brooklyn — view on map`,
        href: site.studioMapUrl,
        external: true,
      },
    },
    {
      title: 'Online',
      tag: 'Not in NYC?',
      body:
        "I offer virtual drum lessons via video chat! Whether you're on your own drum set in your home, or just have a pair of sticks and a practice pad, we can work on a number of drumming concepts and skills!",
    },
  ],
};

export const areas = {
  heading: 'Serving Families Across Brooklyn & Manhattan',
  body:
    "I teach private drum lessons for kids and adults throughout Brooklyn and Manhattan. Whether you're near my Brooklyn studio or prefer in-home lessons, I'll work around your family's schedule and neighborhood and come to you!",
  brooklyn: [
    'Park Slope',
    'Cobble Hill',
    'Brooklyn Heights',
    'Carroll Gardens',
    'DUMBO',
    'Williamsburg',
    'Bed-Stuy',
    'Fort Greene',
  ],
  manhattan: [
    'Upper West Side',
    'Upper East Side',
    'Tribeca',
    'West Village',
    'East Village',
    'Chelsea',
    'Financial District',
    'Gramercy',
  ],
  cta: 'Get in touch',
  imageAlt: 'Tree-lined brownstone street in Brooklyn in autumn',
};

export const bandImageAlt = 'Drum kit on stage lit in deep purple and pink light';

export const testimonials = {
  heading: 'Student Testimonials',
  items: [
    {
      quote:
        'Jimmy is a fantastic drum teacher. He has an amazing way of connecting with kids to make music lessons fun while still challenging. My son has been taking drum lessons with Jimmy for 2 years and has not only shown tremendous growth and gained confidence but also truly loves their weekly time together.',
      name: 'Elaine S.',
      place: 'in Carroll Gardens',
    },
    {
      quote:
        'Jimmy is an amazing musician and has been wonderful with my 12yo for the past 8 months. My son\'s interest in rhythm is somewhat untraditional, and Jimmy has met him where he is at and structured his teaching in a way that keeps him motivated and engaged. When asked about his drum lessons just now, he said, "I really like doing the drum practices. They are fun and challenging."',
      name: 'Cindy C.',
      place: 'in Brooklyn Heights',
    },
    {
      quote:
        'Jimmy is an amazing teacher. My daughter loves lessons with him. I’d highly recommend him.',
      name: 'Narelle B.',
      place: 'in Cobble Hill',
    },
  ],
};

export const faqs = {
  heading: 'FAQs',
  items: [
    {
      q: 'What levels do you teach?',
      a: 'All levels are welcome — from complete beginners to intermediate and advanced drummers looking to level up their technique or musicality.',
    },
    {
      q: 'What styles do you specialize in?',
      a: 'I teach a range of styles including rock, jazz, funk, hip-hop, blues, pop, and more. Lessons are customized based on your musical taste and goals.',
    },
    {
      q: 'Where do lessons happen?',
      a: "I offer private lessons wherever is more convenient. I'll come to you to teach in the comfort of your own home! Or, I have a small studio in Brooklyn located at 630 Flushing Ave where you would get to play on a real drum set!",
      link: { label: '630 Flushing Ave', href: site.studioMapUrl },
    },
    {
      q: 'Do I need a drum set to start?',
      a: "No, but it helps and is more fun! As a beginner, we can work on fundamentals with just a pair of sticks and a drum pad. As you progress, an electric drum set is a great option. Neighbor friendly, affordable, and they don't take up too much space!",
      link: {
        label: "Here's a recommended electric drum set for beginner to intermediate students!",
        href: site.recommendedKitUrl,
      },
    },
    {
      q: 'How are lessons conducted?',
      a: 'One on one lessons often start with playing a warm up together. Then we will work on different drum patterns, beats or full songs often using my iPad as a visual reference.',
    },
    {
      q: 'What do you charge?',
      a: 'Get in touch to ask about my current rates. I offer a discounted first trial lesson for new students!',
    },
    {
      q: 'What’s your teaching style like?',
      a: 'My goal is to make learning drums fun, approachable, and deeply musical. Together, we’ll figure out the best learning style that works for you. I focus on building solid fundamentals while keeping things engaging — whether that means jamming to your favorite songs or breaking down complex grooves step-by-step.',
    },
  ],
};

export const contact = {
  heading: 'get in touch!',
  submit: 'Submit',
  privacy: 'Privacy Policy',
  accessibility: 'Accessibility Statement',
};

export const policies = {
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'Any personal information you share through this site — your name, email address, phone number, and the details of your inquiry — is used only to respond to you and to schedule and coordinate drum lessons.',
      'Your information is never sold, rented, or shared with third parties for marketing purposes.',
      `To ask a question about your data or to request that it be deleted, email ${site.email}.`,
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    paragraphs: [
      'This site is designed to be usable by everyone. It follows WCAG guidance for color contrast, keyboard navigation, focus visibility, descriptive alternative text, and reduced-motion preferences.',
      `If anything on this site is difficult to use, please let me know at ${site.email} or ${site.phone} and I’ll make it right.`,
    ],
  },
};
