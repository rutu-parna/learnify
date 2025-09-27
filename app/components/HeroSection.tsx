import { Button } from "../../components/ui/button";
import { Brain, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "../../public/courselist1.svg";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-accent animate-glow-pulse" />
            <span className="text-sm font-medium">⚡AI-Powered Learning Revolution</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Learn Smarter with{" "}
            <span className="gradient-text">
              Artificial Intelligence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock your potential with personalized AI tutors, adaptive learning paths, 
            and cutting-edge technology that evolves with your learning style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/workspace">
                <Button variant="hero" size="lg" className="group">
                    
                <Brain className="w-5 h-5 mr-2 group-hover:animate-float" />
                Start Learning Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
            
            {/* <Button variant="glass" size="lg">
              Watch Demo
            </Button> */}
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">10M+</div>
              <div className="text-muted-foreground">Students Learning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-muted-foreground">AI-Powered Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-secondary/20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 right-20 w-12 h-12 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};