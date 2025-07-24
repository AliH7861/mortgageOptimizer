import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

// SVG for Linktree
const LinktreeIcon = (props) => (
  <svg
    viewBox="0 0 32 32"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="16" y1="6" x2="16" y2="20" />
    <line x1="16" y1="16" x2="8" y2="8" />
    <line x1="16" y1="16" x2="24" y2="8" />
    <line x1="16" y1="24" x2="16" y2="26" />
  </svg>
);

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(formRef.current);
    const endpoint = "https://formspree.io/f/mjkoyzln";

    fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (response.ok) {
          toast({
            title: "✅ Message sent!",
            description: "Thank you for your message. I'll get back to you soon.",
            variant: "success",
          });
          formRef.current.reset();
        } else {
          toast({
            title: "❌ No email sent",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        toast({
          title: "❌ No email sent",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-red"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* LEFT SIDE - CONTACT INFO */}
          <div className="space-y-8 flex flex-col items-center col-span-1">
            <h3 className="text-2xl font-semibold mb-3 text-center pt-1">
              Contact Information
            </h3>
            <div className="space-y-6 px-8 py-3 flex flex-col items-center w-full max-w-xs">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 rounded-full bg-red/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-red" />
                </div>
                <div className="text-center">
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:ali.hakkani@ontariotechu.net"
                    className="text-muted-foreground hover:text-red transition-colors"
                  >
                    ali.hakkani@ontariotechu.net
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 rounded-full bg-red/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-red" />
                </div>
                <div className="text-center">
                  <h4 className="font-medium">Phone</h4>
                  <a
                    href="tel:+16476573015"
                    className="text-muted-foreground hover:text-red transition-colors"
                  >
                    +1 (647) 657-3015
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 rounded-full bg-red/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-red" />
                </div>
                <div className="text-center">
                  <h4 className="font-medium">Location</h4>
                  <span className="text-muted-foreground hover:text-red transition-colors">
                    Toronto, ON, Canada
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-7 flex flex-col items-center">
              <h4 className="font-medium mb-4 text-center">Connect With Me</h4>
              <div className="flex space-x-4 justify-center items-center">
                <a
                  href="https://www.linkedin.com/in/YOUR-LINKEDIN"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-red transition-colors"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/YOUR-GITHUB"
                  target="_blank"
                  aria-label="GitHub"
                  className="text-muted-foreground hover:text-red transition-colors"
                  rel="noopener noreferrer"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/YOUR-INSTAGRAM"
                  target="_blank"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-red transition-colors"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://linktr.ee/YOUR-LINKTREE"
                  target="_blank"
                  aria-label="Linktree"
                  className="text-muted-foreground hover:text-red transition-colors flex items-center"
                  rel="noopener noreferrer"
                >
                  <LinktreeIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - SEND MESSAGE FORM (2 columns on md+) */}
          <div className="bg-card p-8 rounded-lg shadow-xs md:col-span-2">
            <h3 className="text-2xl font-semibold mb-2 text-center">Send a Message</h3>
            <form
              ref={formRef}
              className="space-y-6 text-left"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 pl-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-red"
                  placeholder="Ali Husen..."
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 pl-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-red"
                  placeholder="ali123@gmail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 pl-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 pt-2 pb-18 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-red resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 bg-red p-4"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
