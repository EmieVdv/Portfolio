// data/projects.js

export const projects = [
  {
    slug: "beestige-tijdreizigers",
    index: "01",
    category: "Internet of Things",
    title: "Beestige Tijdreizigers",
    description: "An interactive museum installation where children discover prehistoric animals through play, physical controls, and a digital race.",
    previewImages: [
      { src: "/images/bt/full.jpeg" },
      { src: "/images/bt/full_back.jpeg" },
      { src: "/images/bt/group.png" },
    ],
    detail: {
      content: [
        {
          heading: "Overview",
          paragraphs: [
            {
              text: "Beestige Tijdreizigers is an interactive museum installation developed as part of the Digital Product Studio 1 course in collaboration with the Huis van Kina museum in Ghent. Working in a team of four, we designed and built an educational experience that combines physical interaction, electronics, and software to teach children about prehistoric animals through play.",
              image: "/images/bt/full.jpeg",
            },
          ],
        },
        {
          heading: "Research",
          paragraphs: [
            {
              text: "Before designing the installation, our team visited the museum to observe how children interacted with existing exhibits. Through observations and interviews, we discovered that interactive experiences kept children engaged far longer than static displays.",
            },
          ],
        },
        {
          heading: "Design Process",
          paragraphs: [
            {
              text: "The installation was designed around a simple and intuitive user journey. Visitors choose two prehistoric animals using RFID cards, start the race with a physical button, watch the animals move across the tracks, and finally compare their real-life speeds on a digital display.",
              image: "/images/bt/detail_rfid.jpeg",
              imagePosition: "left",
            },
          ],
        },
        {
          heading: "Development",
          paragraphs: [
            {
              text: "The installation uses a Raspberry Pi as the central controller, communicating with multiple Arduino microcontrollers that operate stepper motors, LEDs, sensors, and audio. A Python Flask application powers the interface.",
              image: "/images/bt/full_back.jpeg",
            },
            {
              text: "The physical installation was built from laser-cut MDF and plexiglass, RFID technology, custom electronics, and a motor-driven rail system.",
            },
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            {
              text: "I contributed throughout the entire design and development process where I was responsible for user research, concept development, UI design, and graphic design for the RFID cards and installation.",
            },
          ],
        },
        {
          heading: "Reflection",
          paragraphs: [
            {
              text: "This project taught me how to bridge digital interfaces with physical computing, and strengthened my skills in prototyping, usability testing, and designing experiences that are both educational and engaging.",
            },
          ],
        },
        {
          heading: "Technologies",
          paragraphs: [],
          techs: [
            "Arduino",
            "IoT",
            "Python",
            "Flask",
            "HTML/CSS/JS",
            "Raspberry Pi",
            "Blender",
            "Laser Cutting",
            "Figma",
          ],
        },
        {
          heading: "Gallery",
          type: "gallery",
          images: [
            "/images/bt/group.png",
            "/images/bt/sketch.png",
            "/images/bt/detail_back1.jpg",
            "/images/bt/detail_back2.jpg",
            "/images/bt/detail_back3.jpg",
          ],
        },
      ],
    },
  },

  {
    slug: "flipverse",
    index: "02",
    category: "Unreal Engine",
    title: "Flipverse",
    description: "An interactive pinball experience that lets visitors become the ball and explore the hidden mechanics inside a real machine.",
    previewImages: [
      { src: "/images/flipverse/bumpers.png" },
      { src: "/images/flipverse/3D_pinball.png" },
      { src: "/images/flipverse/interaction_page.png" },
    ],
    detail: {
      content: [
        {
          heading: "Overview",
          paragraphs: [
            {
              text: "Flipverse is an interactive touch installation created with the Belgian Pinball Championship and Belgian Pinball Association in mind. It was made for an assignment in the Development course where we had full creative freedom over a project of our own choosing, made in Unreal Engine. It reimagines the traditional pinball machine by letting visitors explore it from the inside, moving through the playfield as the ball itself.",
              image: "/images/flipverse/3D_pinball.png",
            },
          ],
        },
        {
          heading: "How It Works",
          paragraphs: [
            {
              text: "Flipverse lets visitors experience a pinball machine from a completely new angle: instead of standing outside and flipping the paddles, they become the ball itself, rolling through the inside of the machine on a screen. Moving around is simple, by tapping either side of the screen the user can control the direction of the ball, letting visitors freely explore the playfield from a perspective no one normally gets to see.",
            },
            {
              text: "Along the way, certain parts of the machine light up with a glowing arrow, inviting a closer look. Interacting with one pauses the experience and shows a short explanation of what that part does and how it earns points. The goal is to make the mechanics of pinball, normally hidden inside the machine, visible and understandable in a fun, hands-on way.",
            },
          ],
        },
        {
          heading: "Research",
          paragraphs: [
            {
              text: "Research focused on the pinball community and the settings where the installation would be used, from championships to pinball cafés. Visual inspiration came from games like Little Nightmares and movies like Toy Story, where a small character explores an oversized world. I also drew inspiration from interactive maps that are used in theme parks and museums, which highlight points of interest and provide additional information.",
            },
          ],
        },
        {
          heading: "Design Process",
          paragraphs: [
            {
              text: "The experience was mapped out as a clear flow: a start screen invites visitors to find nearby machines, a selection menu lets them pick one, and an instruction screen explains the controls. Users then get dropped into the playfield, where they can interact with the environment. A glowing arrow highlights elements that can be inspected for more information.",
            },
          ],
        },
        {
          type: "gallery",
          images: [
            "/images/flipverse/homepage.png",
            "/images/flipverse/select_page.png",
            "/images/flipverse/instruction_page.png",
            "/images/flipverse/interaction_page.png",
          ],
        },
        {
          heading: "Development",
          paragraphs: [
            {
              text: "Before stepping into a machine, visitors can browse a menu of nearby pinball machines to explore. This list is powered by a public API, called PinballMap, that tracks real pinball machines in locations all over the world, so the selection reflects what's actually out there rather than a fixed, hardcoded list. Once a machine is chosen, its 3D model is loaded into the scene and retextured to closely match the real pinball machine. Collisions are then added to every relevant part of the playfield, from the outer walls to the bumpers and slingshots, so the ball can roll and bounce around realistically and visitors can genuinely interact with the machine rather than just watch it.",
            },
          ],
        },
        {
          type: "gallery",
          images: [
            "/images/flipverse/bumpers.png",
            "/images/flipverse/interactable.png",
          ],
        },
        {
          heading: "Reflection",
          paragraphs: [
            {
              text: "This was my first real experience building a project of this scale in Unreal Engine, and it taught me a lot about working with the engine itself. What I found especially interesting was how Unreal could be connected to outside sources, like the API, to create something that felt bigger than just a 3D scene.",
            },
            {
              text: "Beyond the technical side, I also learned a lot about user experience and interface design. Since the installation had to be usable by everyone, I had to find a balance between clarity and simplicity, keeping instructions clear without overwhelming visitors with too much text or information. That balance was a real challenge, and it's an area I feel I'm still growing in.",
            },
          ],
        },
        {
          heading: "Technologies",
          paragraphs: [],
          techs: [
            "Unreal Engine",
            "PinballMap API",
            "Blender",
            "UI/UX Design",
            "Figma",
          ],
        },
      ],
    },
  },

  {
    slug: "the-empyrean",
    index: "03",
    category: "React Three Fiber",
    title: "The Empyrean",
    description: "An explorable 3D fantasy world inspired by Basgiath War College, where visitors discover its rooms and story through the browser.",
    previewImages: [
      { src: "/images/emp/overview.jpg" },
      { src: "/images/emp/start.jpg" },
      { src: "/images/emp/courtyard.jpg" },
    ],
    detail: {
      content: [
        {
          heading: "Overview",
          paragraphs: [
            {
              text: 'The Empyrean is an individual final project created for an assignment in the Technology course called "Map it out!". It is built around combining creativity, 3D modelling, and interactive web experiences. The assignment asked for an interactive 3D map based on a self-chosen theme, explorable through the browser, with several points of interest a user could interact with to reveal more about that location.',
              image: "/images/emp/poster.png",
            },
            {
              text: "I created an interactive 3D experience inspired by Basgiath War College from the Fourth Wing book series. Rather than a conventional top-down map with information, I interpreted the assignment as an explorable fantasy environment, letting the user discover the world they read about.",
            },
          ],
        },
        {
          heading: "Concept & Narrative",
          paragraphs: [
            {
              text: "The experience focuses strongly on immersion and atmosphere rather than presenting information through a conventional interface. Camera movement, environmental audio, lighting, clouds, and animated transitions guide the user through the world instead. The experience starts with an atmospheric overview that lets the user take in the scale and setting of Basgiath, before being guided toward different areas such as the Battle Brief, Sparring Gym, Dorm Room, and Rotunda.",
            },
          ],
        },
        {
          heading: "3D Modelling & Environment",
          paragraphs: [
            {
              text: "A major part of the project was building the 3D environment in Blender from scratch. I designed the layout, scale, composition, and camera positions specifically around the interactive experience, considering not just how the scene looked in Blender but how it would be experienced from within the browser.",
            },
            {
              text: "The main environment consists of a large mountain with a bridge leading to the castle. Within the castle there are several rooms the user can explore. I designed each room myself and imported some assets from external sources to add more detail. Everything was exported from Blender to be loaded into the React Three Fiber application.",
            },
          ],
        },
        {
          type: "gallery",
          images: [
            "/images/emp/blender-overview.png",
            "/images/emp/rotunda.png",
            "/images/emp/sparring-gym.jpg",
            "/images/emp/battle-brief.png",
          ],
        },
        {
          heading: "Development",
          paragraphs: [
            {
              text: "The experience was built with React Three Fiber, which bridges the React application with the underlying Three.js 3D environment. The project is split into multiple components for the main environment and individual locations, with React Three Drei providing utilities for things like the cloud system, loading progress, and camera helpers. A central experience state, managed with Zustand, moves the application through its different stages. This includes moving from the loading screen, to the orbit around the castle and to each location.",
            },
            {
              text: "Rapier was integrated for physics-based interaction. This is seen in a falling-rocks sequence when the user walks over the bridge to the castle. Objects respond physically rather than following a predetermined animation path.",
            },
            {
              text: "Because the 3D environment and its assets were large, a custom loading screen was built to give feedback while everything loaded. Asset size also turned out to be a real technical challenge: the exported GLB reached around 524 MB during development due to embedded textures, and had to be optimised down to roughly 3 MB by separating out the textures and optimising the models.",
            },
          ],
        },
                {
          type: "gallery",
          images: [
            "/images/emp/start.jpg",
            "/images/emp/courtyard.jpg",
          ],
        },
        {
          heading: "Camera, Interaction & Atmosphere",
          paragraphs: [
            {
              text: "Camera movement is one of the main ways users experience the world. Instead of instantly teleporting between locations, the camera animates smoothly using GSAP, changing position and rotation over time to create smooth transitions between phases of the experience. In some rooms, I wanted the user to be able to look around the scene. For this, I used OrbitControls, which give the user control over the camera. I restricted zooming and panning where needed so they stay within the intended viewing area while still being free to look around.",
            },
            {
              text: "Interaction happens both in the 3D environment and through HTML interface elements layered over the canvas, so information can appear clearly without needing to be rendered inside the 3D scene itself. As I explained before, the interface is designed to guide rather than provide information to the user. The interface indicates where to look and what can be interacted with, in a fullscreen layout that keeps the focus fully on the environment.",
            },
            {
              text: "Atmosphere plays a big role in selling the fantasy setting. Clouds and mist, built with the Drei Clouds system, add to the atmosphere while also concealing where the 3D environment ends and the sky begins. Environmental audio like dragon wingbeats, footsteps, background chatter, and effects like falling rocks complete the immersive experience.",
            },
          ],
        },
                        {
          type: "gallery",
          images: [
            "/images/emp/overview.jpg",
            "/images/emp/parapet.jpg",
          ],
        },
        {
          heading: "Technologies",
          paragraphs: [],
          techs: [
            "React Three Fiber",
            "Three.js",
            "Vite",
            "Zustand",
            "GSAP",
            "Blender",
            "Rapier",
          ],
        },
      ],
    },
  },
];
