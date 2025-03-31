// Project data storage
const projectsData = [
    {
        id: 1,
        image: "/images/project001/thumbnail.png",
        title: "Ngoper Website",
        description: "A shipping platform that utilizes excess baggage space from airline passengers to deliver goods at affordable prices with faster delivery times.",
        tags: ["React", "TypeScript", "Firebase", "Tailwind CSS", "React Router"],
        liveLink: "https://ngoper.com",
        codeLink: "https://github.com/steveharianto/ngoper_website",
        liveDisabled: true,
        codeDisabled: true,
        startDate: "June 2023",
        endDate: "August 2023",
        details: {
            overview: "Ngoper is a web application that connects people who want to ship items with airline passengers who have excess baggage capacity. This system allows for cheaper and faster intercity shipping by utilizing remaining baggage capacity on regular flights. The project includes an informative landing page, registration system, and basic security features.",
            challenge: "The main challenge was designing a UI/UX that made it easy for users to understand the new concept of passenger baggage-based shipping. Additionally, ensuring responsive and consistent display across various devices and integrating Firebase for authentication and database systems presented their own challenges.",
            solution: "I implemented a modular design with Tailwind CSS and React to ensure a responsive and maintainable UI. Components were well-structured to facilitate future development. Firebase Firestore was used to store user data, with appropriate security rules implemented to protect sensitive information.",
            outcome: "The Ngoper website successfully presents innovative shipping service information with a professional and modern appearance. The registration system works well, allowing for the collection of prospective user data for the next development phase. The consumer database grows consistently through the signup form integrated with Firebase.",
            images: [
                "/images/project001/thumbnail.png",
                "/images/project001/page1.jpeg",
                "/images/project001/page2.jpeg",
                "/images/project001/page3.jpeg",
                "/images/project001/page4.jpeg",
                "/images/project001/page5.jpeg"
            ],
            features: [
                "Landing Page: Informative main page with explanations of Ngoper services and the added value offered",
                "Registration Form: Signup form with input validation and Firebase integration to store user data",
                "Responsive: Fully responsive design for mobile, tablet, and desktop",
                "Product Information: Service detail pages explaining how it works and the benefits of using Ngoper",
                "Contact & Social Media: Contact information and integration with company social media"
            ],
            role: "Frontend Developer & UI/UX Designer"
        }
    },
    {
        id: 2,
        image: "/images/project002/thumbnail.png",
        title: "MaiPet",
        description: "Platform marketplace untuk jual beli anjing dengan fitur filtering, autentikasi, dan manajemen listing.",
        tags: ["React", "TypeScript", "Firebase", "Firestore", "Bootstrap", "Vite"],
        liveLink: "https://steveharianto.github.io/MaiPet/",
        codeLink: "https://github.com/steveharianto/MaiPet",
        liveDisabled: false,
        codeDisabled: false,
        startDate: "Agustus 2023",
        endDate: "Maret 2024",
        details: {
            overview: "MaiPet adalah platform marketplace online yang menghubungkan penjual dan pembeli anjing. Dengan antarmuka yang modern dan responsif, pengguna dapat mencari anjing berdasarkan jenis, melihat detail lengkap hewan, serta memasang iklan untuk anjing yang ingin dijual.",
            challenge: "Tantangan utama dalam pengembangan MaiPet adalah membangun sistem pencarian dan filtering yang efisien serta mengintegrasikan autentikasi dan penyimpanan data gambar. Menghadirkan UI yang intuitif dan mudah digunakan juga menjadi prioritas dalam project ini.",
            solution: "Saya mengimplementasikan Firebase untuk autentikasi dan Firestore untuk penyimpanan data, serta Firebase Storage untuk mengelola gambar. React dan TypeScript dipilih untuk membangun frontend yang robust, dengan penekanan pada komponen yang reusable dan struktur data yang kuat.",
            outcome: "MaiPet berhasil menyediakan platform yang mudah digunakan untuk jual beli anjing. Pengguna dapat mendaftar, login, memasang iklan, dan mencari anjing secara efisien. Interface yang bersih dan responsif membuat pengalaman pengguna menjadi menyenangkan.",
            images: [
                "/images/project002/thumbnail.png",
                "/images/project002/page1.png",
                "/images/project002/page2.png",
                "/images/project002/page3.png",
                "/images/project002/page4.png",
                "/images/project002/page5.png"
            ],
            features: [
                "Autentikasi Pengguna: Login dengan email/password atau Google",
                "Pencarian & Filtering: Filter anjing berdasarkan jenis/breed",
                "Posting Iklan: Form multi-step untuk posting iklan baru",
                "Detail Anjing: Tampilan detail lengkap dengan informasi dan gambar",
                "Manajemen Media: Upload dan display gambar anjing"
            ],
            role: "Full Stack Developer"
        }
    },
    {
        id: 3,
        image: "/images/project003/thumbnail.png",
        title: "IdleGame",
        description: "An addictive idle clicker game where players build a coin empire through strategic upgrades and prestige.",
        tags: ["React", "JavaScript", "CSS", "Chart.js", "HTML5", "Game Development"],
        liveLink: "https://steveharianto.github.io/IdleGame/",
        codeLink: "https://github.com/steveharianto/IdleGame",
        liveDisabled: false,
        codeDisabled: false,
        startDate: "April 2021",
        endDate: "May 2021",
        details: {
            overview: "Inspired by a love for the idle game genre and curiosity about the complexities of their development, this project was an exploration into creating an engaging incremental game from scratch. Players start by clicking to earn coins, then strategically purchase various types of upgrades to automate income per second (CPS). The primary goal is to reach earning milestones to 'Prestige', which resets some progress but grants powerful permanent bonuses, enabling further exponential growth and unlocking new challenges.",
            challenge: "The main challenge lay in balancing the game's progression curve—ensuring upgrade costs, their effects, and the prestige mechanic felt satisfying and motivating, neither too slow nor too fast. Efficiently managing a highly dynamic application state in React (constantly increasing coins, CPS, upgrade levels) and handling potentially very large numbers while maintaining smooth UI performance were significant technical hurdles. Additionally, designing a clear and intuitive user interface (UI) to present a wealth of information (stats, upgrades, charts) was a key design consideration.",
            solution: "Progression balancing was approached through iterative testing and adjustments to cost/effect formulas. React Hooks (`useState`, `useEffect`) were leveraged extensively for reactive and efficient state management within the game loop. Helper functions were created to encapsulate complex logic like bulk cost calculations, prestige bonuses, and large number formatting. To enhance user experience, features like visual feedback (click animations, button progress bars), dynamically unlocking upgrades, and data visualization using Chart.js were implemented. Responsive layout was achieved using CSS Flexbox.",
            outcome: "This project resulted in a fully functional idle game with solid core mechanics: manual/automated clicking, a tiered upgrade system, prestige with permanent bonuses, bulk buying, offline progression, and data visualization. Personally, it provided valuable hands-on experience in complex state management in React, incremental gameplay design and balancing, implementing third-party charting libraries, and focusing on UI/UX details to create a satisfying gameplay loop. The game successfully achieved the initial goal of being an idle game I would enjoy playing myself.",
            images: [
                "/images/project003/thumbnail.png",
                "/images/project003/page1.png",
                "/images/project003/page2.png",
            ],
            features: [
                "Core Gameplay Loop: Manual clicking to start, buy upgrades to automate Coins Per Second (CPS).",
                "Diverse Upgrade System: Various buildings (Farm, Mine, etc.) with exponentially increasing costs and CPS effects.",
                "Prestige Mechanic: Reset progress (coins, upgrade levels) to gain Prestige Points providing permanent bonuses to CPS and click value.",
                "Bulk Buy Functionality: Ability to purchase upgrades in quantities of x1, x10, x100, or the maximum affordable amount ('Max').",
                "Dynamic Upgrades & Animation: New upgrades gradually appear with animations as the player reaches specific total earnings milestones.",
                "Interactive Data Visualization: Line chart displaying total earnings over time and a doughnut chart showing investment distribution.",
                "Offline Progression: Players earn coins based on their CPS while the game is inactive.",
                "Visual Feedback: Floating number effects on click, pulsing animation on coin total, and progress bars on unaffordable upgrade buttons.",
                "Comprehensive Player Statistics: Dedicated panel displaying key metrics like total clicks, manual/total earnings, playtime, prestige count, etc."
            ],
            role: "Solo Developer"
        }
    },
    {
        id: 4,
        image: "https://via.placeholder.com/600x400",
        title: "AI Image Generator",
        description: "A machine learning application that generates images based on text descriptions using state-of-the-art AI models.",
        tags: ["Python", "TensorFlow", "React", "Flask"],
        liveLink: "#",
        codeLink: "#",
        liveDisabled: false,
        codeDisabled: false
    },
    {
        id: 5,
        image: "https://via.placeholder.com/600x400",
        title: "E-commerce Platform",
        description: "A complete e-commerce solution with product management, cart functionality, and payment processing.",
        tags: ["Node.js", "Express", "MongoDB", "React"],
        liveLink: "#",
        codeLink: "#",
        liveDisabled: false,
        codeDisabled: true
    },
    {
        id: 6,
        image: "https://via.placeholder.com/600x400",
        title: "Smart Home Dashboard",
        description: "IoT dashboard to monitor and control smart home devices with real-time data visualization.",
        tags: ["IoT", "Vue.js", "WebSockets", "Chart.js"],
        liveLink: "#",
        codeLink: "#",
        liveDisabled: true, 
        codeDisabled: true
    }
];

// Export the data so it can be used in other scripts
export default projectsData; 