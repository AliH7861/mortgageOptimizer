import {
  Code,
  Cpu,
  ChartPie,
  Layers,
  Users,
  ClipboardCheck,
  HeartHandshake,
  TrendingUp,
  Flame,
} from "lucide-react";

const cards = [
  {
    icon: <Code className="h-10 w-10 text-red-500" />,
    title: "Full-Stack & AI Development",
    desc: "Building robust web apps and scalable ML/AI solutions with React, FastAPI, TensorFlow, and more.",
  },
  {
    icon: <ChartPie className="h-10 w-10 text-red-500" />,
    title: "Data Science & Visualization",
    desc: "Cleaning, analyzing, and visualizing data to uncover insights using Python, Pandas, and modern BI tools.",
  },
  {
    icon: <Layers className="h-10 w-10 text-red-500" />,
    title: "Deep Learning & Feature Engineering",
    desc: "Designing neural networks, extracting meaningful features, and optimizing models for real-world tasks.",
  },
  {
    icon: <Users className="h-10 w-10 text-red-500" />,
    title: "Teamwork & Collaboration",
    desc: "Thriving in diverse teams, bringing together tech and people to achieve common goals.",
  },
  {
    icon: <ClipboardCheck className="h-10 w-10 text-red-500" />,
    title: "Project Management",
    desc: "Leading projects from concept to launch with agile methods and clear communication.",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-red-500" />,
    title: "Emotional Intelligence",
    desc: "Active listener, empathetic collaborator, and strong advocate for mental well-being in tech spaces.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-red-500" />,
    title: "Marketing & Branding",
    desc: "Promoting projects and building brands through digital marketing, storytelling, and audience engagement.",
  },
  {
    icon: <Flame className="h-10 w-10 text-red-500" />,
    title: "Hackathon & Entrepreneurship",
    desc: "Competing, winning, and launching ideas fast in high-pressure, innovative settings.",
  },
  {
    icon: <Cpu className="h-10 w-10 text-red-500" />,
    title: "Continuous Learning & Mentorship",
    desc: "Committed to lifelong learning, mentoring others, and always adapting to new challenges.",
  },
];

export const PersonalGrid = () => {
  return (
    <section id="personal-grid" className="py-24 px-4 relative bg-transparent">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-red">Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="p-4 rounded-full bg-red/10 mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-foreground">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-center mb-2">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalGrid;
