import aliImage from '@/assets/IMG_0549.jpeg'

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 ">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center p-8">
          {/* Image: col-span-1 */}
          <div className="space-y-6 z-5 md:col-span-1">
            <img
              src={aliImage}
              alt="PersonalPhoto"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          {/* About Me text: col-span-2 */}
          <div className="space-y-6 flex flex-col text-left md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8  md:text-left ">
              About <span className="text-primary text-red">Me</span>
            </h2>

           <p className="text-muted-foreground">
            I’m a third-year software engineering student with a passion for machine learning, AI, and data science. I’m actively 
            developing my skills in Python, model building, and AI applications through hands-on projects and coursework.
          </p> 

          <p className="text-muted-foreground">
            Motivated by a desire to solve real-world problems with data, I’m eager to apply machine learning techniques to create 
            impactful solutions. I’m always exploring new tools and approaches to stay at the forefront of this rapidly evolving field.
          </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <a href="#contact" className="cosmic-button bg-red">
                Get In Touch
              </a>

              <a
                href="/Resume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-red border-red"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
