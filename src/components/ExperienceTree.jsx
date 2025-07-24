import {
  Briefcase,
  BookOpen,
  UserCheck,
  Monitor,
  Lightbulb,
  Code,
  Megaphone,
} from "lucide-react";

// 7 distinct colors
const redShades = [
  "#F87171", // ML Dev (Verdian AI)
  "#F87171", // Research Coordinator (OTU Enactus)
  "#F87171", // Comm Assistant
  "#F87171", // Frontend Dev
  "#F87171", // Peer Leader
  "#F87171", // VP Marketing
  "#F87171", // Instructor
];

const experiences = [
  {
    type: "work",
    date: "August 2025 – Present",
    position: "Machine Learning Developer",
    place: "Verdian AI",
    desc: [
      "Building bias-reduced custom summarization models using NLP and transformers.",
      "Applying BERT/T5 and bias mitigation to real datasets.",
      "Learning model training, fairness, and explainability for ethical AI.",
    ],
    iconShade: redShades[0],
    icon: <Lightbulb className="w-7 h-7 text-gray-900" />,
  },
  {
    type: "volunteer",
    date: "July 2025 – Present",
    position: "Research Coordinator",
    place: "OTU Enactus",
    desc: [
      "Coordinating research and machine learning for 3 projects.",
      "Mentoring 10+ team members using data-driven methods.",
      "Applying ML for surveys and impact measurement.",
    ],
    iconShade: redShades[1],
    icon: <BookOpen className="w-7 h-7 text-gray-900" />,
  },
  {
    type: "work",
    date: "September 2024 – April 2025",
    position: "Communication Assistant",
    place: "Faculty of Engineering OTU",
    desc: [
      "Developed and published digital content for 4,500+ students.",
      "Automated workflows and tracked KPIs with Python and Excel.",
      "Supported event communications and tech help for all programs.",
    ],
    iconShade: redShades[2],
    icon: <Briefcase className="w-7 h-7 text-gray-900" />,
  },
  {
    type: "volunteer",
    date: "Sept 2024 – Apr 2025",
    position: "Frontend Developer",
    place: "OTU Enactus",
    desc: [
      "Developed project websites for research and innovation.",
      "Implemented responsive UIs with HTML, CSS, and JS.",
      "Collabrated with a group of hardworking engineers.",
    ],
    iconShade: redShades[3],
    icon: <Code className="w-7 h-7 text-gray-900" />,
  },
  {
    type: "volunteer",
    date: "July 2023 – December 2023",
    position: "Peer Leader",
    place: "Ontario Tech University",
    desc: [
      "Mentored and supported 25+ first-year students for academic transition.",
      "Led workshops and built a supportive learning environment.",
      "Collaborated with faculty on student engagement initiatives.",
    ],
    iconShade: redShades[4],
    icon: <UserCheck className="w-7 h-7 text-gray-900" />,
  },
  {
    type: "volunteer",
    date: "July 2023 – December 2023",
    position: "VP Marketing",
    place: "FYIC, EngSoc",
    desc: [
      "Led strategy and design for major campus events/campaigns.",
      "Managed all social media, content, and analytics.",
      "Supervised a team of 5, drove outreach to 500+ students.",
    ],
    iconShade: redShades[5],
    icon: <Megaphone className="w-7 h-7 text-gray-900" />,
  },
  {
    type: "work",
    date: "July 2022 – August 2022",
    position: "Engineering Outreach Instructor",
    place: "Ontario Tech University",
    desc: [
      "Taught Python and coding to high school students.",
      "Designed and delivered a virtual bootcamp curriculum.",
      "Organized and hosted 3 hackathons for new coders.",
    ],
    iconShade: redShades[6],
    icon: <Monitor className="w-7 h-7 text-gray-900" />,
  },
];

export const ExperienceTree = () => (
  <section id="experience" className="pt-24 pb-4 px-4 bg-secondary/30 relative">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Experience <span className="text-red">Timeline</span>
      </h2>
      <div className="relative flex flex-col items-center">
        {/* Vertical timeline line (spans whole height, always centered) */}
        <div className="md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gray-400 z-0" />

        {/* Timeline steps */}
        {experiences.map((exp, i) => (
          <div key={i} className="relative w-full flex md:mb-24 mb-16 text-left">
            {/* On md+, alternate cards left/right, always center on mobile */}
            <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:justify-end flex" : "md:pl-16 md:justify-start flex"} justify-center`}>
              <div
                className={`
                  w-full md:w-[420px] px-6 py-5 rounded-lg bg-card shadow-lg border border-border transition-all
                  ${i % 2 === 0 ? "md:text-right" : "md:text-left"}
                `}
              >
                <div className="font-bold text-lg mb-1">{exp.position}</div>
                <div className="text-red font-medium mb-1">{exp.place}</div>
                <div className="text-muted-foreground text-sm font-semibold mb-2">
                  {exp.date}
                </div>
                <ul className="list-disc ml-5 md:ml-8 text-sm text-muted-foreground space-y-1">
                  {exp.desc.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Timeline dot/icon */}
            <div
              className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:z-10 md:flex md:flex-col md:items-center"
              style={{
                top: "50%",
                marginTop: "-28px", // half of icon box height
              }}
            >
              <div
                className="rounded-full border-4 flex items-center justify-center shadow-lg"
                style={{
                  borderColor: exp.iconShade,
                  background: "#fff",
                  width: 56,
                  height: 56,
                  boxShadow: `0 0 18px 4px ${exp.iconShade}55, 0 2px 12px 0 rgba(0,0,0,0.10)`,
                  position: "relative",
                  zIndex: 10,
                }}
              >
                {exp.icon}
              </div>
              {/* Small connecting line below icon except for last step */}
              {i !== experiences.length - 1 && (
                <div
                  className="hidden md:block"
                  style={{
                    width: "4px",
                    height: "90px",
                    background: `linear-gradient(to bottom, ${exp.iconShade}66 60%, #9992 100%)`,
                    margin: "0 auto",
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

