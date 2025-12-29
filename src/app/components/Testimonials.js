export default function Testimonials() {
  const testimonials = [
    {
      stars: 5,
      text: "The escrow payment system gives me complete peace of mind. I've completed over 50 assignments and always received payment on time. My income has grown 3x in just 6 months!",
      author: "Priya Sharma",
      role: "Business Associate • Mumbai"
    },
    {
      stars: 5,
      text: "The UGC quality is outstanding! Real customers sharing genuine experiences has increased our social engagement by 180%. Best investment we've made for our brand.",
      author: "Rajesh Kumar",
      role: "Restaurant Owner • Bangalore"
    },
    {
      stars: 5,
      text: "The phygital model is brilliant. I can work remotely while building strong local connections. The community support and training have been invaluable for my career growth.",
      author: "Aisha Patel",
      role: "Digital Marketing Specialist • Delhi"
    },
    {
      stars: 5,
      text: "I started as a complete beginner and Zuugnu Academy trained me thoroughly. Now I've completed 50+ assignments and earning ₹40,000+ monthly. Life-changing opportunity!",
      author: "Priya Kapoor",
      role: "Business Associate • Mumbai"
    },
    {
      stars: 5,
      text: "We gained 5,000+ organic followers in 3 months through SMA. The ROI is incredible compared to paid ads. Zuugnu has transformed our digital presence completely.",
      author: "Rajesh Sharma",
      role: "Founder, TechStart India • Bangalore"
    },
    {
      stars: 5,
      text: "The training programs are excellent and the escrow system ensures I always get paid. I'm now earning ₹50,000+ monthly while working flexibly from home.",
      author: "Anjali Mehta",
      role: "Content Creator • Bangalore"
    },
    {
      stars: 5,
      text: "The phygital approach works perfectly for our business. We've expanded to 12 cities with consistent quality. The associate network is reliable and professional.",
      author: "Vikram Gupta",
      role: "Regional Manager • Delhi"
    },
    {
      stars: 5,
      text: "Organic leads from Zuugnu convert 4x better than our paid campaigns. We've reduced CAC by 60% while improving lead quality. Absolutely worth it!",
      author: "Sneha Kulkarni",
      role: "Marketing Head, EduTech Pro • Pune"
    },
    {
      stars: 5,
      text: "Zuugnu has given me financial stability. The guaranteed payments and continuous training help me grow professionally. My income increased from ₹15k to ₹55k monthly.",
      author: "Deepak Verma",
      role: "Freelance Marketer • Pune"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>Community Voice</h2>
          <p>Real stories from Business Associates and clients</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">{'⭐'.repeat(testimonial.stars)}</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">{testimonial.author}</p>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}