import { ArrowRight, ExternalLink, Github } from "lucide-react";
import ecobinImg from "../assets/ecobin-ai.png";
import lidarImg from "../assets/lidar-fusion.png";
import project3Img from "../assets/project3.png";

const projects = [
  {
    id: 1,
    title: "EcoBin AI",
    description: "Full-stack AI application that uses deep learning (ResNet50) to classify household waste into the correct bins, improving recycling accuracy and efficiency.Includes user authentication, real-time analytics, and a customizable dashboard to help users track habits and sustainability goals.",
    image: ecobinImg,
    tags: ["FastAPI", "Streamlit", "TensorFlow", "PostgreSQL", "Python", "Machine Learning"],
    demoUrl: "https://garbageclassifier-production.up.railway.app",
    githubUrl: "https://github.com/AliH7861/garbageClassifier"
  },
  {
    id: 2,
    title: "Collaborative 3D LiDAR-Camera Fusion",
    description: `Real-time perception pipeline that fuses 3D LiDAR and camera data from multiple vehicles. Uses deep learning and computer vision to merge sensor streams and create unified 3D scenes for dynamic environments.`,
    image: lidarImg,
    tags: [
      "Sensor Fusion", "Deep Learning", "Computer Vision", "LiDAR", "Autonomous Vehicles", "Python"
    ],
    demoUrl: "#", // Replace with your actual demo link
    githubUrl: "https://github.com/AliH7861/Fusion_event" // Replace with your repo link
  },
  {
    id: 3,
    title: "Resource Manager",
    description: "All-in-one study platform that centralizes videos, websites, making it easy to organize and access everything needed for efficient learning.Features include a smart search, and user-friendly organization tools to support academic success across multiple subjects.",
    image: project3Img,
    tags: ["Bootstrap", "PHP", "Figma", "MySQL", "HTML/CSS", "JavaScript", "Project Management"],
    demoUrl: "#",
    githubUrl: "https://github.com/AliH7861/webprogramminggroup18",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-red"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-red transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-red transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2 bg-red"
            target="_blank"
            href="https://github.com/AliH7861"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};