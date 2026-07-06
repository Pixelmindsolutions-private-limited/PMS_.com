import React from 'react';
import Redemly1 from '../assets/Redemly/11.jpeg';
import Redemly2 from '../assets/Redemly/22.jpeg';
import Redemly3 from '../assets/Redemly/33.jpeg';
import Redemly4 from '../assets/Redemly/44.jpeg';
import Redemly5 from '../assets/Redemly/55.jpeg';
import Redemly6 from '../assets/Redemly/66.jpeg';
import Redemly7 from '../assets/Redemly/77.jpeg';
import Redemly8 from '../assets/Redemly/88.jpeg';
import Redemly9 from '../assets/Redemly/99.jpeg';
import Redemly10 from '../assets/Redemly/110.jpeg';
import Redemly11 from '../assets/Redemly/120.jpeg';
import PMS1 from '../assets/PMS/1.png';
import PMS2 from '../assets/PMS/2.png';
import PMS3 from '../assets/PMS/3.png';
import PMS4 from '../assets/PMS/4.png';
import PMS5 from '../assets/PMS/5.png';
import PMS6 from '../assets/PMS/6.png';
import PMS7 from '../assets/PMS/7.png';



// Complete portfolio data
const portfolioItems = [
    {
        id: 1, title: "PIXELMINDSOLUTIONS", type: "website",
        description: "Pixelmind Solutions is a leading IT services provider, offering innovative solutions in website development, mobile application design, and digital marketing.",
        fullDescription: "Pixelmind Solutions is a leading IT services provider, offering innovative solutions in website development, mobile application design, and digital marketing. Dedicated to helping businesses thrive in the digital world by delivering tailored, high-quality services that enhance user experiences, drive growth, and build a strong online presence. With a team of expert developers, designers, and strategists, we transform ideas into powerful digital experiences.",
        image: "/assets/images/banner/pixelmind.jpg", icon: "/assets/images/logo/pixelmind.jpg",
        websiteLink: "https://www.pixelmindsolutions.com/",
        client: "PixelMind Solutions",
        category: "Web Development",
        year: "2024",
        duration: "4 Months",
        technologies: ["React", "Node.js", "MongoDB", "AWS", "Figma", "Tailwind CSS"],
        features: ["Responsive Design", "SEO Optimized", "Analytics Dashboard", "Content Management", "Multi-language Support", "Payment Gateway"],
        results: { "Traffic": "+150%", "Conversion": "+35%", "Engagement": "+85%", "Speed": "1.2s" },
        challenges: "Integrating multiple third-party services while maintaining performance.",
        solution: "Implemented microservices architecture with React frontend.",
        testimonial: { name: "John Doe", position: "CEO, PixelMind Solutions", text: "Exceptional product delivered! The team exceeded our expectations." },
        screenshots: [
            PMS1,
            PMS2,
            PMS3,
            PMS4,
            PMS5,
            PMS6,
            PMS7
        ]
    },
    {
        id: 3, title: "BINGENJOY", type: "website",
        description: "Bingenjoy.com transforms private theater events into custom celebrations in a lavish, stage-inspired atmosphere.",
        fullDescription: "Bingenjoy.com transforms private theater events into custom celebrations in a lavish, stage-inspired atmosphere—anniversaries, birthdays, proposals, and cake unveilings. Choose from gourmet meals, custom cakes, and live performances by musicians, actors, and interactive spectacles.",
        image: "/assets/images/banner/binenjoy.jpg", icon: "/assets/images/logo/binenjoy.png",
        websiteLink: "https://bingenjoy.com/",
        client: "Bingenjoy Entertainment",
        category: "Event Management",
        year: "2024",
        duration: "3 Months",
        technologies: ["React", "Express", "PostgreSQL", "Stripe", "Cloudinary"],
        features: ["Event Booking", "Live Streaming", "Payment Integration", "User Dashboard", "Email Notifications", "Gallery Management"],
        results: { "Bookings": "+200%", "Revenue": "+45%", "Users": "+5000", "Satisfaction": "98%" },
        challenges: "Creating seamless booking experience for complex events.",
        solution: "Custom booking engine with real-time availability.",
        testimonial: { name: "Sarah Johnson", position: "Event Manager", text: "Transformed our booking process completely!" },
        screenshots: [
            "/assets/images/banner/binenjoy.jpg",
            "/assets/images/banner/carnival.jpg",
            "/assets/images/banner/pixelmind.jpg",
            "/assets/images/banner/binenjoy.jpg"
        ]
    },
    {
        id: 4, title: "CARNIVAL CASTLE", type: "website",
        description: "CarnivalCastle.com is a versatile private‑theater and events venue transforming every celebration into a theatrical experience.",
        fullDescription: "CarnivalCastle.com is a versatile private‑theater and events venue transforming every celebration into a theatrical experience. Immersive stage-like settings, vibrant decor themes, and a curated lineup of live entertainment with fully customizable packages.",
        image: "/assets/images/banner/carnival.jpg", icon: "/assets/images/logo/carnival.png",
        websiteLink: "https://carnivalcastle.com/",
        client: "Carnival Castle",
        category: "Venue Management",
        year: "2024",
        duration: "3 Months",
        technologies: ["React", "Firebase", "Tailwind", "Stripe", "SendGrid"],
        features: ["Venue Booking", "Virtual Tours", "Package Customization", "CRM Integration", "Analytics", "Multi-venue Support"],
        results: { "Bookings": "+180%", "Revenue": "+60%", "Visitors": "+10000", "Rating": "4.9/5" },
        challenges: "Managing complex venue configurations and availability.",
        solution: "Flexible booking system with visual calendar.",
        testimonial: { name: "Mike Wilson", position: "Director", text: "Amazing platform for our venues!" },
        screenshots: [
            "/assets/images/banner/carnival.jpg",
            "/assets/images/banner/pixelmind.jpg",
            "/assets/images/banner/binenjoy.jpg",
            "/assets/images/banner/carnival.jpg"
        ]
    },
    {
        id: 7, title: "Vegiffyy", type: "app",
        description: "Vegiffyy is a cutting-edge mobile food delivery application focused on fresh, hygienic, and delicious vegetarian meals.",
        fullDescription: "Vegiffyy is a cutting-edge mobile food delivery application focused on fresh, hygienic, and delicious vegetarian meals. It connects users with trusted local restaurants and home kitchens, offering easy ordering, quick delivery, and a seamless experience for healthy food lovers.",
        image: "/assets/portfolio/veg.jpeg", icon: "/assets/portfolio/veglogo.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.veggify.veegify",
        appstoreLink: "https://apps.apple.com/in/app/vegiffy/id6757138352",
        client: "Vegiffyy Foods",
        category: "Food Delivery",
        year: "2024",
        duration: "5 Months",
        technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Google Maps", "Stripe"],
        features: ["Real-time Tracking", "Restaurant Discovery", "Secure Payments", "Order History", "Rating System", "Push Notifications"],
        results: { "Orders": "+300%", "Restaurants": "+200", "Users": "+15000", "Delivery": "25min avg" },
        challenges: "Optimizing real-time tracking and delivery routes.",
        solution: "Advanced routing algorithm with live tracking.",
        testimonial: { name: "Priya Sharma", position: "CEO, Vegiffyy", text: "Revolutionized vegetarian food delivery!" },
        screenshots: [
            "/assets/portfolio/veg.jpeg",
            Redemly1,
            Redemly2,
            "/assets/portfolio/carrentlogo.png"
        ]
    },
    {
        id: 8, title: "Redemly", type: "app",
        description: "Redemly simplifies redeeming rewards, discounts, and offers from various brands and retailers.",
        fullDescription: "Redemly simplifies redeeming rewards, discounts, and offers from various brands and retailers. It provides a seamless experience to discover, collect, and redeem points or vouchers directly from smartphones, enhancing customer loyalty and engagement.",
        image: "/assets/portfolio/redemly.png", icon: "/assets/portfolio/redemlylogo.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.srikanth.redeemly",
        appstoreLink: "https://apps.apple.com/in/app/redemly/id6755115759",
        client: "Redemly Inc",
        category: "Rewards Platform",
        year: "2024",
        duration: "4 Months",
        technologies: ["Flutter", "Firebase", "Node.js", "PostgreSQL", "Redis"],
        features: ["Reward Discovery", "QR Code Scanning", "Wallet Integration", "Brand Partners", "Analytics", "Referral System"],
        results: { "Users": "+25000", "Partners": "+150", "Redeems": "+10000", "Rating": "4.8/5" },
        challenges: "Integrating with multiple brand reward systems.",
        solution: "Unified API gateway for reward integration.",
        testimonial: { name: "Alex Chen", position: "Founder, Redemly", text: "Amazing platform for rewards management!" },
        screenshots: [
            Redemly1,
            Redemly2,
            Redemly3,
            Redemly4,
            Redemly5,
            Redemly6,
            Redemly7,
            Redemly8,
            Redemly9,
            Redemly10,
            Redemly11
        ],
        videoLabel: "Watch Demo",
        videoId: "QcvN_Pc4ue8"  // Example YouTube video ID for demonstration
    },
    {
        id: 9, title: "EditEZY", type: "app",
        description: "EditEZY is an easy-to-use poster and graphic design platform that helps users create eye-catching posters and social media creatives.",
        fullDescription: "EditEZY is an easy-to-use poster and graphic design platform that helps users create eye-catching posters, banners, and social media creatives in minutes. With ready-made templates, drag-and-drop editing, and powerful customization tools, professional design is accessible to everyone.",
        image: "/assets/portfolio/editezy.png", icon: "/assets/portfolio/editezy.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.posternova.posternova",
        appstoreLink: "https://apps.apple.com/in/app/editezy/id6753908761",
        client: "EditEZY Studios",
        category: "Design Platform",
        year: "2024",
        duration: "6 Months",
        technologies: ["React Native", "Node.js", "MongoDB", "AWS S3", "WebGL", "Canvas"],
        features: ["Drag & Drop", "Templates Library", "Custom Fonts", "Export Options", "Collab Tools", "Cloud Storage"],
        results: { "Users": "+50000", "Templates": "+500", "Downloads": "+10000", "Satisfaction": "97%" },
        challenges: "Building performant design editor on mobile.",
        solution: "Native canvas engine with hardware acceleration.",
        testimonial: { name: "Emily Davis", position: "Lead Designer", text: "Best design app on mobile!" },
        screenshots: [
            "/assets/portfolio/editezy.png",
            "/assets/portfolio/veg.jpeg",
            "/assets/portfolio/redemly.png",
            "/assets/portfolio/carrentlogo.png"
        ],
        videoId: "QcvN_Pc4ue8" 
    },
    {
        id: 10, title: "Varahi SelfDriveCars", type: "app",
        description: "Varahi SelfDriveCars is a premier car rental service offering a wide range of self-drive vehicles.",
        fullDescription: "Varahi SelfDriveCars is a premier car rental service offering a wide range of self-drive vehicles for leisure and business travelers. Focus on convenience, affordability, and customer satisfaction with flexible rental options, easy booking, and well-maintained vehicles.",
        image: "/assets/portfolio/carrentlogo.png", icon: "/assets/portfolio/carrentlogo.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.self_drive_cars",
        appstoreLink: "https://apps.apple.com/in/app/varahi-self-drive-cars/id6753347255",
        client: "Varahi Cabs",
        category: "Car Rental",
        year: "2024",
        duration: "4 Months",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "Google Maps"],
        features: ["GPS Tracking", "Booking System", "Payment Gateway", "Vehicle Selection", "Trip History", "24/7 Support"],
        results: { "Bookings": "+250%", "Vehicles": "+100", "Users": "+8000", "Rating": "4.7/5" },
        challenges: "Implementing live tracking and booking optimization.",
        solution: "Real-time GPS with intelligent booking system.",
        testimonial: { name: "Rahul Patel", position: "CEO, Varahi Cabs", text: "Perfect solution for self-drive!" },
        screenshots: [
            "/assets/portfolio/carrentlogo.png",
            "/assets/portfolio/veg.jpeg",
            "/assets/portfolio/redemly.png",
            "/assets/portfolio/editezy.png"
        ]
    },
    {
        id: 11, title: "Techsterker", type: "website",
        description: "Techsterker is an institute teaching coding to students and professionals.",
        fullDescription: "Techsterker is an institute teaching coding to students and professionals. They provide courses on various programming languages and technologies, helping learners enhance their skills and advance their careers in the tech industry.",
        image: "/assets/portfolio/tech.png", icon: "/assets/portfolio/techlogo.png",
        websiteLink: "https://techsterker.com/",
        client: "Techsterker Academy",
        category: "Education",
        year: "2024",
        duration: "3 Months",
        technologies: ["React", "Node.js", "MongoDB", "AWS", "Zoom API"],
        features: ["Course Management", "Live Classes", "Video Library", "Assessment Tools", "Progress Tracking", "Certification"],
        results: { "Students": "+3000", "Courses": "+50", "Completion": "92%", "Rating": "4.9/5" },
        challenges: "Scaling video delivery and live classes.",
        solution: "CDN integration with adaptive streaming.",
        testimonial: { name: "Dr. Smith", position: "Dean, Techsterker", text: "Best platform for tech education!" },
        screenshots: [
            "/assets/portfolio/tech.png",
            "/assets/portfolio/carservicelogo.png",
            "/assets/portfolio/news.png",
            "/assets/portfolio/clynixlogo.png"
        ]
    },
    {
        id: 12, title: "Dharmadwajam", type: "app",
        description: "Dharmadwajam is a digital platform providing news, informative articles, and creative posters.",
        fullDescription: "Dharmadwajam is a digital platform providing news, informative articles, and creative posters focused on culture, society, and awareness. It serves as a hub for meaningful content, delivering timely updates and visually engaging designs to keep users informed and inspired.",
        image: "/assets/portfolio/news.png", icon: "/assets/portfolio/news.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.dhama.dharmadhvajam",
        appstoreLink: "https://apps.apple.com/in/app/dharmadhwajam/id6756093088",
        client: "Dharmadwajam Media",
        category: "News Platform",
        year: "2024",
        duration: "3 Months",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
        features: ["News Feed", "Categories", "Bookmarks", "Push Notifications", "Offline Mode", "Social Sharing"],
        results: { "Users": "+12000", "Articles": "+500", "Engagement": "4.5/5", "Shares": "+10000" },
        challenges: "Delivering real-time news with offline support.",
        solution: "Progressive web app with local caching.",
        testimonial: { name: "Ananya Reddy", position: "Editor", text: "Great platform for meaningful content!" },
        screenshots: [
            "/assets/portfolio/news.png",
            "/assets/portfolio/veg.jpeg",
            "/assets/portfolio/redemly.png",
            "/assets/portfolio/editezy.png"
        ]
    },
    {
        id: 13, title: "BackUp Tickets", type: "app",
        description: "BackUp Tickets is a secure ticket resale and exchange platform for buying and selling event tickets.",
        fullDescription: "BackUp Tickets is a secure ticket resale and exchange platform to buy and sell event tickets with ease. It connects verified buyers and sellers, ensuring transparent pricing, safe transactions, and a reliable way to transfer tickets.",
        image: "/assets/portfolio/atoz.png", icon: "/assets/portfolio/atoz.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.backup.backup_ticket",
        client: "BackUp Events",
        category: "Event Tickets",
        year: "2024",
        duration: "4 Months",
        technologies: ["Flutter", "Firebase", "Node.js", "PostgreSQL", "Stripe"],
        features: ["Ticket Marketplace", "QR Tickets", "Secure Transfer", "Event Discovery", "Price Alerts", "Review System"],
        results: { "Users": "+8000", "Tickets Sold": "+15000", "Trust Score": "98%", "Rating": "4.6/5" },
        challenges: "Preventing fraud and ensuring secure transactions.",
        solution: "Blockchain-verified ticket transfers.",
        testimonial: { name: "James Brown", position: "Founder", text: "Secure and reliable ticket platform!" },
        screenshots: [
            "/assets/portfolio/atoz.png",
            "/assets/portfolio/carservicelogo.png",
            "/assets/portfolio/news.png",
            "/assets/portfolio/clynixlogo.png"
        ]
    },
    {
        id: 17, title: "Nupura Car Service", type: "app",
        description: "Nupura Car Service is a reliable and affordable car service provider offering a wide range of automotive services.",
        fullDescription: "Nupura Car Service is a reliable and affordable car service provider offering a wide range of automotive services. With a commitment to quality and customer satisfaction, Nupura Car Service ensures your vehicle is well-maintained and ready for any journey.",
        image: "/assets/portfolio/carservicelogo.png", icon: "/assets/portfolio/carservicelogo.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.nupura.nupura_cars",
        appstoreLink: "https://apps.apple.com/in/app/nupura-cars/id6758536789",
        client: "Nupura Motors",
        category: "Car Services",
        year: "2024",
        duration: "3 Months",
        technologies: ["React Native", "Node.js", "MongoDB", "Google Maps"],
        features: ["Service Booking", "Real-time Tracking", "Service History", "Payment Gateway", "Mechanic Assignment", "Feedback System"],
        results: { "Services": "+5000", "Customers": "+7000", "Satisfaction": "96%", "Response": "10min" },
        challenges: "Managing service requests and mechanic allocation.",
        solution: "AI-based mechanic assignment system.",
        testimonial: { name: "Vikram Singh", position: "CEO, Nupura Motors", text: "Best car service platform!" },
        screenshots: [
            "/assets/portfolio/carservicelogo.png",
            "/assets/portfolio/veg.jpeg",
            "/assets/portfolio/redemly.png",
            "/assets/portfolio/editezy.png"
        ]
    },
    {
        id: 22, title: "Clynix", type: "app",
        description: "Clynix is a smart medicine booking and delivery application for ordering medicines from nearby pharmacies.",
        fullDescription: "Clynix is a smart medicine booking and delivery application allowing users to order prescribed and OTC medicines from nearby pharmacies. Digital prescription uploads, real-time order tracking, secure payments, and fast doorstep delivery make healthcare access simple and reliable.",
        image: "/assets/portfolio/clynixlogo.png", icon: "/assets/portfolio/clynixlogo.png",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.clynix.clynix",
        client: "Clynix Health",
        category: "Healthcare",
        year: "2024",
        duration: "5 Months",
        technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe"],
        features: ["Prescription Upload", "Medicine Search", "Real-time Tracking", "Health Records", "Refill Reminders", "Teleconsultation"],
        results: { "Orders": "+8000", "Pharmacies": "+300", "Users": "+12000", "Rating": "4.8/5" },
        challenges: "Ensuring prescription verification and safety.",
        solution: "AI-powered prescription validation system.",
        testimonial: { name: "Dr. Mehta", position: "Medical Director", text: "Revolutionary healthcare platform!" },
        screenshots: [
            "/assets/portfolio/clynixlogo.png",
            "/assets/portfolio/veg.jpeg",
            "/assets/portfolio/redemly.png",
            "/assets/portfolio/editezy.png"
        ]
    },
    {
        id: 14, title: "SS Air Conditioners", type: "digital",
        description: "SS Air Conditioners is a trusted provider of air conditioning solutions offering a wide range of products and services.",
        fullDescription: "SS Air Conditioners is a trusted provider of air conditioning solutions offering a wide range of products and services for residential and commercial needs. Focus on energy efficiency, reliability, and customer satisfaction with expert installation, maintenance, and repair services.",
        image: "/assets/portfolio/ss.png", icon: "/assets/portfolio/sslogo.png",
        websiteLink: "https://www.ssairconditioners.com/",
        client: "SS Air Conditioners",
        category: "Digital Marketing",
        year: "2024",
        duration: "2 Months",
        technologies: ["SEO", "Google Ads", "Social Media", "Content Marketing"],
        features: ["SEO Optimization", "PPC Campaigns", "Social Media Management", "Content Strategy", "Email Marketing", "Analytics"],
        results: { "Traffic": "+200%", "Leads": "+150%", "Conversion": "+45%", "ROI": "400%" },
        challenges: "Competitive market with limited budget.",
        solution: "Targeted campaigns with high-converting keywords.",
        testimonial: { name: "Mr. Sharma", position: "Owner", text: "Amazing digital marketing results!" },
        screenshots: [
            "/assets/portfolio/ss.png",
            "/assets/portfolio/editezy.png",
            "/assets/portfolio/carrentlogo.png",
            "/assets/portfolio/news.png"
        ]
    },
    {
        id: 23, title: "Clynix", type: "website",
        description: "Clynix is a smart medicine booking and delivery application for ordering medicines from nearby pharmacies.",
        fullDescription: "Clynix is a smart medicine booking and delivery application allowing users to order prescribed and OTC medicines from nearby pharmacies. Digital prescription uploads, real-time order tracking, secure payments, and fast doorstep delivery make healthcare access simple and reliable.",
        image: "/assets/portfolio/clynixlogo.png", icon: "/assets/portfolio/clynixlogo.png",
        websiteLink: "https://www.simcurarx.com/",
        client: "Clynix Health",
        category: "Healthcare",
        year: "2024",
        duration: "4 Months",
        technologies: ["React", "Node.js", "MongoDB", "AWS", "Stripe"],
        features: ["Prescription Upload", "Medicine Search", "Order Tracking", "Health Records", "Refill Reminders", "Teleconsultation"],
        results: { "Orders": "+8000", "Pharmacies": "+300", "Users": "+12000", "Rating": "4.8/5" },
        challenges: "Ensuring prescription verification and safety.",
        solution: "AI-powered prescription validation system.",
        testimonial: { name: "Dr. Mehta", position: "Medical Director", text: "Revolutionary healthcare platform!" },
        screenshots: [
            "/assets/portfolio/clynixlogo.png",
            "/assets/portfolio/veg.jpeg",
            "/assets/portfolio/redemly.png",
            "/assets/portfolio/editezy.png"
        ]
    }
];

export default portfolioItems;