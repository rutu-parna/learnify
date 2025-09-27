import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "AI & Machine Learning Fundamentals",
    description: "Master the basics of artificial intelligence and machine learning with hands-on projects.",
    level: "Beginner",
    duration: "8 weeks",
    students: "12.5K",
    rating: 4.9,
    price: "$299",
    image: "/api/placeholder/300/200"
  },
  {
    title: "Deep Learning with Neural Networks",
    description: "Advanced deep learning concepts including CNNs, RNNs, and transformer architectures.",
    level: "Advanced",
    duration: "12 weeks", 
    students: "8.2K",
    rating: 4.8,
    price: "$499",
    image: "/api/placeholder/300/200"
  },
  {
    title: "Data Science & Analytics",
    description: "Learn to extract insights from data using Python, statistics, and machine learning.",
    level: "Intermediate",
    duration: "10 weeks",
    students: "15.3K", 
    rating: 4.9,
    price: "$399",
    image: "/api/placeholder/300/200"
  }
];

export const CourseSection = () => {
  return (
    <section id="courses" className="py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">AI Courses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start your journey with our most popular AI and machine learning courses, 
            designed by industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-48 card-gradient flex items-center justify-center">
                <div className="text-6xl opacity-20">🤖</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {/* <Badge variant="secondary">{course.level}</Badge> */}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-current text-accent" />
                    {course.rating}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold gradient-text">
                    {course.price}
                  </div>
                  {/* <Button variant="glow" className="group">
                    Enroll Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          {/* <Button variant="hero" size="lg">
            View All Courses
          </Button> */}
        </div>
      </div>
    </section>
  );
};