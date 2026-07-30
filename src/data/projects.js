// data/projects.js
function createProjectDetail({
  title,
  category,
  intro,
  research,
  design,
  development,
  role,
  reflection,
  techs,
  media,
}) {
  return {
    content: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [intro],
        image: media,
      },
      {
        id: "research",
        heading: "Research & Development",
        paragraphs: [research],
      },
      {
        id: "design-process",
        heading: "Design Process",
        paragraphs: [design],
        image: media,
      },
      {
        id: "development",
        heading: "Development",
        paragraphs: [development],
      },
      {
        id: "my-role",
        heading: "My role",
        paragraphs: [role],
      },
      {
        id: "reflection",
        heading: "Reflection",
        paragraphs: [reflection],
      },
      {
        id: "technologies",
        heading: "Technologies",
        paragraphs: [
          `The final build for ${title} combines visual design with a focused technical stack for the ${category.toLowerCase()} experience.`,
        ],
        techs,
      },
    ],
    techs,
  };
}

export const projects = [
  {
    slug: "beestige-tijdreizigers",
    index: "01",
    category: "Internet of Things",
    title: "Beestige Tijdreizigers",
    images: [
      { src: "/images/bt-1.jpeg", top: "60%", left: "5%", width: "32%" },
      { src: "/images/bt-2.png", top: "20%", left: "60%", width: "22%" },
      { src: "/images/bt-3.jpeg", top: "20%", left: "10%", width: "29%" },
      { src: "/images/bt-4.png", top: "62%", left: "55%", width: "22%" },
      { src: "/images/bt-5.jpeg", top: "57%", left: "90%", width: "14%" },
    ],
    previewImages: [
      { src: "/images/bt-3.jpeg" },
      { src: "/images/bt-1.jpeg" },
      { src: "/images/bt-2.png" },
    ],
    detail: createProjectDetail({
      title: "Beestige Tijdreizigers",
      category: "Internet of Things",
      intro:
        "Beestige Tijdreizigers is an interactive museum installation developed as part of the Digital Product Studio 1 course in collaboration with the Huis van Kina museum in Ghent. Working in a team of four, we designed and built an educational experience that combines physical interaction, electronics, and software to teach children about prehistoric animals through play. Visitors select two animals using physical cards and watch them race based on their real-world speeds, creating a fun and engaging way to learn about natural history.",
      research:
        "Before designing the installation, our team visited the museum to observe how children interacted with existing exhibits. Through observations and interviews, we discovered that interactive experiences kept children engaged far longer than static displays. Based on these insights, we designed an educational installation that encourages exploration, competition, and hands-on learning.",
      design:
        "The installation was designed around a simple and intuitive user journey. Visitors choose two prehistoric animals using RFID cards, start the race with a physical button, watch the animals move across the tracks, and finally compare their real-life speeds on a digital display. Alongside the interaction flow, we designed the interface, RFID cards, wooden enclosure, and visual identity to match the museum's existing style while remaining accessible for young children.",
      development:
        "The project combines software, electronics, and physical fabrication into one interactive experience. The installation uses a Raspberry Pi as the central controller, communicating with multiple Arduino microcontrollers that operate stepper motors, LEDs, sensors, and audio. A Python Flask application powers the interface, while HTML, CSS, and JavaScript provide the user-facing experience. The physical installation was built from laser-cut MDF, acrylic panels, RFID technology, custom electronics, and a motor-driven rail system that moves each animal at a scaled version of its real-world speed.",
      role: "I contributed throughout the entire design and development process. My responsibilities included user research, concept development, UI design, graphic design for the RFID cards and installation. I also helped prototype, test, and refine the experience based on user feedback.",
      reflection:
        "This project taught me how to bridge digital interfaces with physical computing. I gained hands-on experience designing for real users, collaborating in a team, and integrating hardware and software into a single interactive product. It also strengthened my skills in prototyping, usability testing, and designing experiences that are both educational and engaging.",
      techs: ["Arduino", "IoT", "Python", "Flask", "HTML/CSS/JS", "Raspberry Pi", "Blender", "Laser Cutting", "Figma"],
      media: "/images/bt-1.jpeg",
    }),
  },
  {
    slug: "flipverse",
    index: "02",
    category: "Unreal Engine",
    title: "Flipverse",
    images: [
      { src: "/images/flipverse-1.png", top: "60%", left: "5%", width: "28%" },
      { src: "/images/flipverse-2.png", top: "20%", left: "60%", width: "28%" },
      { src: "/images/flipverse-3.png", top: "20%", left: "10%", width: "29%" },
      { src: "/images/flipverse-4.png", top: "62%", left: "50%", width: "28%" },
      { src: "/images/flipverse-5.png", top: "50%", left: "85%", width: "16%" },
    ],
    previewImages: [
      { src: "/images/flipverse-1.png" },
      { src: "/images/flipverse-2.png" },
      { src: "/images/flipverse-3.png" },
    ],
    detail: createProjectDetail({
      title: "Flipverse",
      category: "Unreal Engine",
      intro:
        "Flipverse explores a stylized environment built to show how motion, composition, and game-engine tools can create a strong mood.",
      research:
        "Early references focused on cinematic framing, material contrast, and how small environmental cues can guide attention through a scene.",
      design:
        "The visual direction evolved through blockouts and lighting studies until the scene felt readable, coherent, and distinct.",
      development:
        "Implementation centered on building the environment in Unreal Engine, shaping the scene with engine-native tools, and refining the presentation flow.",
      role: "I contributed to the environment design, visual iteration, and final presentation.",
      reflection:
        "The project reinforced how much atmosphere depends on pacing, lighting, and a disciplined asset selection.",
      techs: ["Unreal Engine", "Blueprints", "3D Modeling", "Lighting"],
      media: "/images/flipverse-1.png",
    }),
  },
  {
    slug: "the-empyrean",
    index: "03",
    category: "React three fiber",
    title: "The Empyrean",
    images: [
      { src: "/images/emp-1.jpg", top: "60%", left: "5%", width: "28%" },
      { src: "/images/emp-3.jpg", top: "20%", left: "60%", width: "30%" },
      { src: "/images/emp-2.jpg", top: "20%", left: "10%", width: "28%" },
      { src: "/images/emp-4.jpg", top: "62%", left: "50%", width: "28%" },
      { src: "/images/emp-5.png", top: "50%", left: "85%", width: "20%" },
    ],
    previewImages: [
      { src: "/images/emp-2.jpg" },
      { src: "/images/emp-5.png" },
      { src: "/images/emp-4.jpg" },
    ],
    detail: createProjectDetail({
      title: "The Empyrean",
      category: "React three fiber",
      intro:
        "The Empyrean combines WebGL, motion, and interface design to create a space that feels lightweight but still visually immersive.",
      research:
        "The research phase covered real-time rendering references, depth cues, and ways to keep 3D content understandable inside a browser.",
      design:
        "Layout, typography, and the image treatment were iterated together so the interface and the rendered environment would feel like one system.",
      development:
        "The implementation uses React Three Fiber to structure the scene and keep the experience responsive across screen sizes.",
      role: "I worked on the interactive presentation, scene composition, and the browser-based front end.",
      reflection:
        "The biggest takeaway was how important it is to balance visual ambition with performance and clarity.",
      techs: ["React", "React Three Fiber", "Three.js", "GLSL"],
      media: "/images/emp-2.jpg",
    }),
  },
];
