// Project data storage
const projectsData = [
    {
        id: 1,
        image: "https://via.placeholder.com/600x400",
        title: "Project Title 1",
        description: "A brief description of the project, highlighting key features and technologies used.",
        tags: ["Flutter", "Firebase", "Dart"],
        liveLink: "#",
        codeLink: "#",
        liveDisabled: false,
        codeDisabled: false,
        startDate: "January 2023",
        endDate: "March 2023",
        details: {
            overview: "An in-depth description of the project, its goals, and the problems it solves. Here you can explain the project's background, purpose, and the value it provides to users.",
            challenge: "The challenges faced during the development process and how they were overcome. This could include technical challenges, design issues, or scope management problems.",
            solution: "The solution implemented to address the challenges and meet the project requirements. This could include the architecture, design patterns, and technologies used.",
            outcome: "The results of the project, including metrics, user feedback, and lessons learned. This section can highlight the project's success and its impact.",
            images: [
                "https://via.placeholder.com/800x500",
                "https://via.placeholder.com/800x500",
                "https://via.placeholder.com/800x500"
            ],
            features: [
                "Feature 1: Description of feature 1",
                "Feature 2: Description of feature 2",
                "Feature 3: Description of feature 3"
            ],
            role: "Lead Developer"
        }
    },
    {
        id: 2,
        image: "https://via.placeholder.com/600x400",
        title: "Project Title 2",
        description: "A brief description of the project, highlighting key features and technologies used.",
        tags: ["Flutter", "Firebase", "Dart"],
        liveLink: "#",
        codeLink: "#",
        liveDisabled: true,
        codeDisabled: false,
        startDate: "April 2023",
        endDate: "Ongoing",
        details: {
            overview: "An in-depth description of the project, its goals, and the problems it solves. Here you can explain the project's background, purpose, and the value it provides to users.",
            challenge: "The challenges faced during the development process and how they were overcome. This could include technical challenges, design issues, or scope management problems.",
            solution: "The solution implemented to address the challenges and meet the project requirements. This could include the architecture, design patterns, and technologies used.",
            outcome: "The results of the project, including metrics, user feedback, and lessons learned. This section can highlight the project's success and its impact.",
            images: [
                "https://via.placeholder.com/800x500",
                "https://via.placeholder.com/800x500"
            ],
            features: [
                "Feature 1: Description of feature 1",
                "Feature 2: Description of feature 2"
            ],
            role: "Backend Developer"
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