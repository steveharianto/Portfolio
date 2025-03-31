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
        image: "https://via.placeholder.com/600x400",
        title: "Project Title 3",
        description: "A brief description of the project, highlighting key features and technologies used.",
        tags: ["TensorFlow", "Python", "PyTorch"],
        liveLink: "#",
        codeLink: "#",
        liveDisabled: true,
        codeDisabled: true,
        startDate: "November 2022",
        endDate: "February 2023",
        details: {
            overview: "An in-depth description of the project, its goals, and the problems it solves. Here you can explain the project's background, purpose, and the value it provides to users.",
            challenge: "The challenges faced during the development process and how they were overcome. This could include technical challenges, design issues, or scope management problems.",
            solution: "The solution implemented to address the challenges and meet the project requirements. This could include the architecture, design patterns, and technologies used.",
            outcome: "The results of the project, including metrics, user feedback, and lessons learned. This section can highlight the project's success and its impact.",
            images: [
                "https://via.placeholder.com/800x500",
                "https://via.placeholder.com/800x500",
                "https://via.placeholder.com/800x500",
                "https://via.placeholder.com/800x500"
            ],
            features: [
                "Feature 1: Description of feature 1",
                "Feature 2: Description of feature 2",
                "Feature 3: Description of feature 3",
                "Feature 4: Description of feature 4"
            ],
            role: "ML Engineer"
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