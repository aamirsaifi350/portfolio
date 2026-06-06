import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    alert("Message sent successfully!");
    reset();
  };

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="font-heading text-6xl tracking-widest mb-2 uppercase">
          GET IN <span className="text-accent">TOUCH</span>
        </h1>
        <p className="font-subheading text-3xl text-secondary">Let's work together</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
        {/* Left: Contact Info */}
        <motion.div 
          className="lg:w-1/3 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-surface border border-border p-8 hover:border-accent transition-colors duration-300 group">
            <div className="w-12 h-12 rounded bg-background flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
              <FaEnvelope className="text-accent group-hover:text-white transition-colors duration-300" size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-2">Email</h3>
            <p className="text-secondary">hello@example.com</p>
          </div>

          <div className="bg-surface border border-border p-8 hover:border-accent transition-colors duration-300 group">
            <div className="w-12 h-12 rounded bg-background flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
              <FaMapMarkerAlt className="text-accent group-hover:text-white transition-colors duration-300" size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-2">Location</h3>
            <p className="text-secondary">San Francisco, CA</p>
          </div>

          <div className="bg-surface border border-border p-8 hover:border-accent transition-colors duration-300 group">
            <div className="w-12 h-12 rounded bg-background flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
              <FaPhone className="text-accent group-hover:text-white transition-colors duration-300" size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-2">Phone</h3>
            <p className="text-secondary">+1 (555) 123-4567</p>
          </div>

          <div className="pt-8 border-t border-border">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">Social Profiles</h3>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1"><FaGithub size={20} /></a>
              <a href="#" className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1"><FaLinkedin size={20} /></a>
              <a href="#" className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1"><FaTwitter size={20} /></a>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div 
          className="lg:w-2/3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-card border border-border p-8 md:p-12">
            <h2 className="text-2xl font-heading mb-8 uppercase tracking-widest text-foreground">Send a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Your Name</label>
                  <input 
                    {...register("name")}
                    className="w-full bg-background border border-border focus:border-accent outline-none px-4 py-3 text-foreground transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-accent text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Your Email</label>
                  <input 
                    {...register("email")}
                    className="w-full bg-background border border-border focus:border-accent outline-none px-4 py-3 text-foreground transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-accent text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Subject</label>
                <input 
                  {...register("subject")}
                  className="w-full bg-background border border-border focus:border-accent outline-none px-4 py-3 text-foreground transition-colors"
                  placeholder="Project Inquiry"
                />
                {errors.subject && <p className="text-accent text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Message</label>
                <textarea 
                  {...register("message")}
                  rows={6}
                  className="w-full bg-background border border-border focus:border-accent outline-none px-4 py-3 text-foreground transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-accent text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-4 bg-accent text-white font-bold tracking-widest uppercase text-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
