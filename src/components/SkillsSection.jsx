import React, { useState } from "react";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Programming Languages",
  "Data Science & ML",
  "Tools & Deployment",
];

const skills = [
  
  // Frontend
  { name: "HTML/CSS", category: "Frontend" },
  { name: "JavaScript (ES6+)", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Tailwind CSS / Bootstrap", category: "Frontend" },
  { name: "Figma (UI/UX)", category: "Frontend" },

  // Backend
  { name: "Node.js / Express", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "MySQL / PostgreSQL", category: "Backend" },
  { name: "PHP", category: "Backend" }, 

  // Programming Languages
  { name: "Python", category: "Programming Languages" },
  { name: "Java", category: "Programming Languages" },
  { name: "C/C++", category: "Programming Languages" },

  // Data Science & ML
  { name: "NumPy", category: "Data Science & ML" },
  { name: "Pandas", category: "Data Science & ML" },
  { name: "Matplotlib / Seaborn", category: "Data Science & ML" },
  { name: "Scikit-learn", category: "Data Science & ML" },
  { name: "TensorFlow (Deep Learning)", category: "Data Science & ML" },
  { name: "Streamlit", category: "Data Science & ML" },
  { name: "Feature Engineering", category: "Data Science & ML" },
  { name: "Dimensionality Reduction", category: "Data Science & ML" },
  { name: "Probability & Statistics", category: "Data Science & ML" },

  // Tools & Deployment
  { name: "Git/GitHub", category: "Tools & Deployment" },
  { name: "Docker", category: "Tools & Deployment" },
  { name: "Railway / Vercel", category: "Tools & Deployment" },
  { name: "CI/CD Pipelines", category: "Tools & Deployment" },
  { name: "VS Code", category: "Tools & Deployment" },
];




export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = skills
    .filter(skill => activeCategory === "All" || skill.category === activeCategory)
    .sort((a, b) => b.level - a.level);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-red"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
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

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-card p-4 rounded-lg shadow-sm card-hover flex flex-col items-center justify-center gap-2"
            >
              <div className="">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
