import React, { useState } from "react";

const categories = [
  "all",
  "frontend",
  "backend",
  "programming languages",
  "python & ml libraries",
  "tools & deployment",
];

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "React", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },
  { name: "Bootstrap", level: 70, category: "frontend" },
  { name: "Figma", level: 95, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "FastAPI", level: 80, category: "backend" },
  { name: "REST API", level: 75, category: "backend" },
  { name: "MySQL", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "PHP", level: 85, category: "backend" },

  // Programming languages
  { name: "Python", level: 90, category: "programming languages" },
  { name: "Java", level: 70, category: "programming languages" },
  { name: "C", level: 40, category: "programming languages" },
  { name: "C++", level: 60, category: "programming languages" },

  // Python & ML libraries
  { name: "NumPy", level: 95, category: "python & ml libraries" },
  { name: "Pandas", level: 95, category: "python & ml libraries" },
  { name: "Matplotlib", level: 95, category: "python & ml libraries" },
  { name: "Seaborn", level: 95, category: "python & ml libraries" },
  { name: "Scikit-learn", level: 40, category: "python & ml libraries" },
  { name: "TensorFlow", level: 40, category: "python & ml libraries" },
  { name: "Streamlit", level: 90, category: "python & ml libraries" },
  { name: "Bokeh", level: 85, category: "python & ml libraries" },
  { name: "Plotly", level: 85, category: "python & ml libraries" },
  { name: "Folium", level: 85, category: "python & ml libraries" },
  { name: "ANN", level: 20, category: "python & ml libraries" },
  { name: "CNN", level: 20, category: "python & ml libraries" },
  { name: "RNN", level: 20, category: "python & ml libraries" },
  { name: "Feature Engineering", level: 75, category: "python & ml libraries" },
  { name: "Dimensionality Reduction", level: 70, category: "python & ml libraries" },
  { name: "Probability & Statistics", level: 80, category: "python & ml libraries" },

  // Tools & Deployment
  { name: "Railway", level: 75, category: "tools & deployment" },
  { name: "Vercel", level: 60, category: "tools & deployment" },
  { name: "Docker", level: 60, category: "tools & deployment" },
  { name: "Git/GitHub", level: 90, category: "tools & deployment" },
  { name: "VS Code", level: 95, category: "tools & deployment" },
  { name: "CI/CD", level: 45, category: "tools & deployment" },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills
    .filter(skill => activeCategory === "all" || skill.category === activeCategory)
    .sort((a, b) => b.level - a.level);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-red"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full transition-colors duration-300 capitalize ${
                activeCategory === category
                  ? "bg-red text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-red h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
