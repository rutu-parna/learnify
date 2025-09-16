import { Brain, Zap, Target, Users, BookOpen, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Tutoring",
    description: "Personal AI tutors that adapt to your learning style and pace for maximum efficiency."
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get real-time corrections and suggestions to accelerate your learning journey."
  },
  {
    icon: Target,
    title: "Personalized Paths",
    description: "Custom learning paths generated based on your goals, skills, and preferences."
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with learners worldwide and participate in collaborative AI-enhanced study groups."
  },
  {
    icon: BookOpen,
    title: "Adaptive Content",
    description: "Course material that evolves and adjusts difficulty based on your progress."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Advanced analytics to track your improvement and optimize your learning strategy."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionizing Education with{" "}
            <span className="gradient-text">AI Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of learning with our cutting-edge AI platform designed 
            to unlock your full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center group-hover:animate-float">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 gradient-text">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};