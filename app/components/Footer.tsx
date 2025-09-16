import { Brain, Twitter, Linkedin, Github, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="about" className=" bg-muted/10 border-t border-border/20 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 hero-gradient rounded-lg">
                <Brain className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">AI Learn</span>
            </div>
            <p className="text-muted-foreground">
              Empowering minds through AI-driven education and personalized learning experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 glass-card rounded-lg hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card rounded-lg hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card rounded-lg hover:scale-110 transition-transform">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card rounded-lg hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4 gradient-text">Platform</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Tutors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Learning Paths</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Certifications</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 gradient-text">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 gradient-text">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 AI Learn. All rights reserved. Powered by cutting-edge AI technology.</p>
        </div>
      </div>
    </footer>
  );
};