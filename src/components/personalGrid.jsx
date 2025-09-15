import {
  Code,
  Cpu,
  ChartPie,
  Layers,
  ClipboardCheck,
  Lightbulb,
  TrendingUp,
  Flame,
  BookOpen,
} from "lucide-react";

const cards = [
  {
    icon: <Code className="h-10 w-10 text-red-500" />,
    title: "Full-Stack AI Development (EcoBin AI)",
    desc: "Built a full-stack AI app using ResNet50 to classify household waste, with authentication, analytics, and dashboards.",
  },
  {
    icon: <ChartPie className="h-10 w-10 text-red-500" />,
    title: "Data Science & Visualization",
    desc: "Used Python, Pandas, NumPy, and Matplotlib to uncover insights for a financial optimizer, replicating real-world scenarios.",
  },
  {
    icon: <Layers className="h-10 w-10 text-red-500" />,
    title: "Feature Engineering & Preprocessing",
    desc: "Applied preprocessing techniques to clean, transform, and optimize datasets for reliable ML performance.",
  },
  {
    icon: <Cpu className="h-10 w-10 text-red-500" />,
    title: "Deep Learning (ResNet50)",
    desc: "Fine-tuned ResNet50 for computer vision tasks, applying deep learning to real-world classification problems.",
  },
  {
    icon: <ClipboardCheck className="h-10 w-10 text-red-500" />,
    title: "Project Management & Leadership",
    desc: "Served as VP Marketing of FYIC, developing leadership through event management and communication.",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-red-500" />,
    title: "Problem-Solving & Critical Thinking",
    desc: "Tackled coding challenges and design issues by breaking down complex problems into actionable solutions.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-red-500" />,
    title: "Growth Mindset & Adaptability",
    desc: "Learned new tools quickly, adapted to project needs, and embraced feedback to improve continuously.",
  },
  {
    icon: <Flame className="h-10 w-10 text-red-500" />,
    title: "Hackathons & Competitions",
    desc: "Competed in hackathons and competitions, rapidly prototyping ideas under time pressure.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-red-500" />,
    title: "Passion to Grow & Learn",
    desc: "Enthusiastic about AI, software, and people combining technical expertise with curiosity and creativity.",
  },
];

export const PersonalGrid = () => {
  return (
    <section id="services" className="py-24 px-4 relative bg-transparent">
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
