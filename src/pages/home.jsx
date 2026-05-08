import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
    FaGraduationCap, FaFlask, FaChartLine, FaTrophy, FaLanguage, FaLaptopCode,
    FaChalkboardTeacher, FaUsers, FaBrain, FaClipboardCheck, FaUserCheck, FaCompass,
    FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram,
    FaYoutube, FaWhatsapp, FaTwitter, FaArrowRight, FaPlay, FaBars, FaTimes,
    FaCheckCircle, FaAward, FaBookOpen, FaLightbulb, FaChevronLeft, FaChevronRight,
    FaQuoteLeft
} from "react-icons/fa";
import { MdSchool, MdScience } from "react-icons/md";
import "./Home.css";

// ──────────────────────────────────────────────
// Animated Counter Hook
// ──────────────────────────────────────────────
function useCounter(end, duration = 2000, start = 0) {
    const [count, setCount] = useState(start);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, end, duration, start]);

    return { count, ref };
}

// ──────────────────────────────────────────────
// Section Wrapper with scroll animation
// ──────────────────────────────────────────────
function FadeSection({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

// ──────────────────────────────────────────────
// NAVBAR
// ──────────────────────────────────────────────
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = ["About", "Courses", "Why Us", "Results", "Gallery", "Contact"];

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    return (
        <motion.nav
            className={`navbar ${scrolled ? "scrolled" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="nav-container">
                <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <div className="logo-icon"><FaGraduationCap /></div>
                    <div className="logo-text">
                        <span className="logo-main">Excellent</span>
                        <span className="logo-sub">Education Zone</span>
                    </div>
                </div>

                <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                    {links.map((link) => (
                        <li key={link}>
                            <button className="nav-link-btn" onClick={() => scrollTo(link)}>
                                {link}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button className="nav-cta" onClick={() => scrollTo("Contact")}>
                            Enroll Now
                        </button>
                    </li>
                </ul>

                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </motion.nav>
    );
}

// ──────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────
function Hero() {
    return (
        <section className="hero" id="hero">
            {/* Animated blobs */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            {/* Floating icons */}
            {[FaBookOpen, FaLightbulb, FaGraduationCap, FaAward, FaCheckCircle].map((Icon, i) => (
                <div key={i} className={`float-icon float-icon-${i + 1}`}>
                    <Icon />
                </div>
            ))}

            <div className="hero-content">
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <span>🏆 #1 Ranked Coaching Institute</span>
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    Shape Your Future With
                    <span className="hero-title-accent"> Excellent<br />Education Zone</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    Empowering students from Class 1 to Competitive Exams with expert faculty,
                    personalized attention, and a proven track record of exceptional results.
                    Your success story begins here.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                >
                    <button className="btn-primary" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                        <span>Enroll Now</span>
                        <FaArrowRight />
                    </button>
                    <button className="btn-outline" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                        <FaPlay className="play-icon" />
                        <span>Free Demo Class</span>
                    </button>
                </motion.div>

                <motion.div
                    className="hero-glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                >
                    {[
                        { num: "5000+", label: "Students" },
                        { num: "98%", label: "Results" },
                        { num: "10+", label: "Years" },
                        { num: "50+", label: "Faculty" },
                    ].map((s) => (
                        <div key={s.label} className="hero-stat">
                            <span className="hero-stat-num">{s.num}</span>
                            <span className="hero-stat-label">{s.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// ABOUT
// ──────────────────────────────────────────────
function StatCard({ end, suffix, label, icon: Icon, delay }) {
    const { count, ref } = useCounter(end, 2000);
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true });
    return (
        <motion.div
            ref={cardRef}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="stat-icon"><Icon /></div>
            <div className="stat-number" ref={ref}>{count}{suffix}</div>
            <div className="stat-label">{label}</div>
        </motion.div>
    );
}

function About() {
    return (
        <section className="about section" id="about">
            <div className="container">
                <FadeSection className="about-grid">
                    <div className="about-text">
                        <p className="section-eyebrow">Who We Are</p>
                        <h2 className="section-title">Nurturing Excellence<br /><span>Since 2026</span></h2>
                        <p className="about-desc">
                            Excellent Education Zone is a premier coaching institute dedicated to transforming
                            students into confident, capable, and high-achieving individuals. With a passionate
                            team of experienced educators and a student-first philosophy, we have built a legacy
                            of academic excellence across all boards and competitive examinations.
                        </p>
                        <p className="about-desc">
                            Our state-of-the-art smart classrooms, structured curriculum, and regular performance
                            assessments ensure every student receives the guidance they need to excel. We don't
                            just teach — we inspire, motivate, and mentor.
                        </p>
                        <ul className="about-highlights">
                            {["CBSE, ICSE & State Board Expertise", "IIT-JEE, NEET & Board Exam Coaching",
                                "Doubt-clearing sessions every week", "Parent-teacher progress meetings"].map((item) => (
                                    <li key={item}><FaCheckCircle className="check-icon" />{item}</li>
                                ))}
                        </ul>
                    </div>

                    <div className="about-stats">
                        <StatCard end={5000} suffix="+" label="Happy Students" icon={FaUsers} delay={0.1} />
                        <StatCard end={98} suffix="%" label="Success Rate" icon={FaTrophy} delay={0.2} />
                        <StatCard end={10} suffix="+" label="Years Experience" icon={FaAward} delay={0.3} />
                        <StatCard end={50} suffix="+" label="Expert Faculty" icon={FaChalkboardTeacher} delay={0.4} />
                    </div>
                </FadeSection>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// COURSES
// ──────────────────────────────────────────────
const courses = [
    { icon: MdSchool, title: "9th Maths", desc: "Comprehensive tuition for Class 1–12 covering all subjects with board-focused preparation and concept clarity.", color: "#3a7bd5" },
    { icon: FaFlask, title: "10th Maths", desc: "In-depth Physics, Chemistry & Biology coaching for Class 9–12 and competitive entrance exams like NEET & IIT-JEE.", color: "#00c9ff" },
    { icon: FaChartLine, title: "11th Commerce", desc: "Expert coaching for Accounts, Economics, Business Studies, and Statistics for Class 11–12 students.", color: "#f7971e" },
    { icon: FaTrophy, title: "12th Commerce", desc: "Result-oriented preparation for IIT-JEE, NEET, GPSC, SSC, and banking exams with mock tests and strategy sessions.", color: "#c471ed" }
];

function CourseCard({ course, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    return (
        <motion.div
            ref={ref}
            className="course-card"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ "--card-accent": course.color }}
        >
            <div className="course-icon-wrap">
                <course.icon />
            </div>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.desc}</p>
            <button className="course-btn">
                Learn More <FaArrowRight />
            </button>
            <div className="course-glow" />
        </motion.div>
    );
}

function Courses() {
    return (
        <section className="courses section" id="courses">
            <div className="container">
                <FadeSection>
                    <p className="section-eyebrow">What We Offer</p>
                    <h2 className="section-title center">Our <span>Programs</span></h2>
                    <p className="section-sub">Choose from a wide range of expertly designed courses tailored to every student's academic journey.</p>
                </FadeSection>
                <div className="courses-grid">
                    {courses.map((c, i) => <CourseCard key={c.title} course={c} index={i} />)}
                </div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// WHY CHOOSE US
// ──────────────────────────────────────────────
const features = [
    { icon: FaChalkboardTeacher, title: "Experienced Teachers", desc: "Our faculty includes IITians, ex-professors, and subject matter experts with 10+ years of teaching experience." },
    { icon: FaUsers, title: "Small Batch Size", desc: "Batches of 30-35 students ensure every child gets personal attention and focused learning time." },
    { icon: FaBrain, title: "Smart Classrooms", desc: "Digital boards, projectors, and e-learning tools make concepts engaging and easier to understand." },
    { icon: FaClipboardCheck, title: "Weekly Tests", desc: "Regular assessments track your progress, identify weak areas, and build exam-day confidence." },
    { icon: FaUserCheck, title: "Personal Attention", desc: "One-on-one mentoring sessions, doubt-clearing classes, and parent feedback ensure no student is left behind." },
    { icon: FaCompass, title: "Career Guidance", desc: "Expert counselling for stream selection, career planning, and entrance exam strategy from Class 8 onwards." },
];

function WhyUs() {
    return (
        <section className="why-us section" id="why-us">
            <div className="why-bg-pattern" />
            <div className="container">
                <FadeSection>
                    <p className="section-eyebrow light">Our Edge</p>
                    <h2 className="section-title center light">Why Choose <span>Us?</span></h2>
                    <p className="section-sub light">Everything we do is designed to give our students the best possible chance at success.</p>
                </FadeSection>
                <div className="why-grid">
                    {features.map((f, i) => {
                        const ref = useRef(null);
                        const inView = useInView(ref, { once: true, margin: "-40px" });
                        return (
                            <motion.div
                                key={f.title}
                                ref={ref}
                                className="why-card"
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.07, duration: 0.55 }}
                            >
                                <div className="why-icon"><f.icon /></div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// RESULTS
// ──────────────────────────────────────────────
const achievements = [
    { year: "2024", title: "State Topper – Science Stream", desc: "Rohan Patel scored 98.6% in Class 12 GSEB, topping the district.", badge: "🥇" },
    { year: "2023", title: "NEET Qualifiers – 42 Students", desc: "Record 42 students cleared NEET with scores above 600, highest in our history.", badge: "🏥" },
    { year: "2023", title: "IIT-JEE Success – 18 Students", desc: "18 students secured IIT-JEE Advanced ranks in the top 5000 nationally.", badge: "⚙️" },
    { year: "2022", title: "Best Institute Award – District Level", desc: "Recognized by the Education Excellence Forum for outstanding academic contributions.", badge: "🏆" },
];

function Results() {
    return (
        <section className="results section" id="results">
            <div className="container">
                <FadeSection>
                    <p className="section-eyebrow">Track Record</p>
                    <h2 className="section-title center">Our <span>Achievements</span></h2>
                    <p className="section-sub">A decade of milestones, toppers, and life-changing results that speak louder than words.</p>
                </FadeSection>

                <div className="results-counters">
                    {[
                        { end: 5000, suffix: "+", label: "Students Trained" },
                        { end: 420, suffix: "+", label: "NEET/JEE Qualifiers" },
                        { end: 98, suffix: "%", label: "Board Pass Rate" },
                        { end: 15, suffix: "+", label: "District Toppers" },
                    ].map((s, i) => {
                        const { count, ref } = useCounter(s.end, 2200);
                        const cardRef = useRef(null);
                        const inView = useInView(cardRef, { once: true });
                        return (
                            <motion.div
                                key={s.label}
                                ref={cardRef}
                                className="result-counter-card"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <div className="rc-num" ref={ref}>{count}{s.suffix}</div>
                                <div className="rc-label">{s.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="timeline">
                    {achievements.map((a, i) => {
                        const ref = useRef(null);
                        const inView = useInView(ref, { once: true, margin: "-40px" });
                        return (
                            <motion.div
                                key={a.title}
                                ref={ref}
                                className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className="timeline-badge">{a.badge}</div>
                                <div className="timeline-card">
                                    <span className="timeline-year">{a.year}</span>
                                    <h3>{a.title}</h3>
                                    <p>{a.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                    <div className="timeline-line" />
                </div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// TESTIMONIALS
// ──────────────────────────────────────────────
const testimonials = [
    { name: "Priya Sharma", grade: "Class 12, Science", text: "EEZ transformed my approach to studies. The faculty is incredibly supportive and the small batch size meant I always had my doubts cleared. I scored 95% in boards!", stars: 5, initials: "PS", color: "#3a7bd5" },
    { name: "Arjun Mehta", grade: "IIT-JEE 2023", text: "I joined EEZ in Class 11 and it was the best decision of my life. The structured coaching and weekly tests helped me crack JEE Advanced with AIR 2847.", stars: 5, initials: "AM", color: "#f7971e" },
    { name: "Kavya Patel", grade: "NEET 2023", text: "The Biology and Chemistry coaching at EEZ is exceptional. My teacher's notes were so precise that I barely needed any other study material. Got 650 in NEET!", stars: 5, initials: "KP", color: "#c471ed" },
    { name: "Ravi Desai", grade: "Class 10, CBSE", text: "My son struggled with Maths and Science until he joined EEZ. Within 3 months, his marks jumped from 60% to 88%. The personal attention here is unmatched.", stars: 5, initials: "RD", color: "#43e97b" },
    { name: "Sneha Joshi", grade: "Commerce, Class 12", text: "The accounts and economics coaching is phenomenal. Clear concepts, real examples, and regular revision classes helped me score 97 in Accounts. Truly the best!", stars: 5, initials: "SJ", color: "#12c2e9" },
];

function Testimonials() {
    const [index, setIndex] = useState(0);
    const visible = 3;

    const prev = () => setIndex((i) => Math.max(0, i - 1));
    const next = () => setIndex((i) => Math.min(testimonials.length - visible, i + 1));

    return (
        <section className="testimonials section" id="testimonials">
            <div className="testi-bg-blob" />
            <div className="container">
                <FadeSection>
                    <p className="section-eyebrow">Student Voices</p>
                    <h2 className="section-title center">What Our <span>Students Say</span></h2>
                    <p className="section-sub">Real stories from real students who transformed their academic journey with us.</p>
                </FadeSection>

                <div className="testi-slider">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            className="testi-track"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.4 }}
                        >
                            {testimonials.slice(index, index + visible).map((t) => (
                                <div key={t.name} className="testi-card">
                                    <FaQuoteLeft className="quote-icon" />
                                    <p className="testi-text">{t.text}</p>
                                    <div className="testi-stars">
                                        {Array(t.stars).fill(0).map((_, i) => <FaStar key={i} />)}
                                    </div>
                                    <div className="testi-author">
                                        <div className="testi-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}>
                                            {t.initials}
                                        </div>
                                        <div>
                                            <div className="testi-name">{t.name}</div>
                                            <div className="testi-grade">{t.grade}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="testi-controls">
                    <button className="testi-arrow" onClick={prev} disabled={index === 0}><FaChevronLeft /></button>
                    <div className="testi-dots">
                        {Array(testimonials.length - visible + 1).fill(0).map((_, i) => (
                            <button key={i} className={`testi-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
                        ))}
                    </div>
                    <button className="testi-arrow" onClick={next} disabled={index >= testimonials.length - visible}><FaChevronRight /></button>
                </div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// GALLERY
// ──────────────────────────────────────────────
const galleryItems = [
    { label: "Smart Classroom", bg: "linear-gradient(135deg, #1a1a4e 0%, #3a7bd5 100%)", emoji: "🖥️", size: "tall" },
    { label: "Award Ceremony", bg: "linear-gradient(135deg, #b8860b 0%, #ffd700 100%)", emoji: "🏆", size: "" },
    { label: "Science Lab", bg: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)", emoji: "🔬", size: "" },
    { label: "Annual Function", bg: "linear-gradient(135deg, #c471ed 0%, #f64f59 100%)", emoji: "🎭", size: "wide" },
    { label: "Board Toppers", bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", emoji: "🎓", size: "" },
    { label: "Parent Meet", bg: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)", emoji: "👨‍👩‍👧", size: "" },
    { label: "Computer Lab", bg: "linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)", emoji: "💻", size: "tall" },
    { label: "Sports Day", bg: "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)", emoji: "🏅", size: "" },
];

function Gallery() {
    return (
        <section className="gallery section" id="gallery">
            <div className="container">
                <FadeSection>
                    <p className="section-eyebrow">Campus Life</p>
                    <h2 className="section-title center">Institute <span>Gallery</span></h2>
                    <p className="section-sub">A glimpse into the vibrant, enriching environment we have created for our students.</p>
                </FadeSection>
                <div className="gallery-grid">
                    {galleryItems.map((item, i) => {
                        const ref = useRef(null);
                        const inView = useInView(ref, { once: true, margin: "-30px" });
                        return (
                            <motion.div
                                key={item.label}
                                ref={ref}
                                className={`gallery-item ${item.size}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: i * 0.06, duration: 0.5 }}
                                style={{ background: item.bg }}
                            >
                                <div className="gallery-emoji">{item.emoji}</div>
                                <div className="gallery-overlay">
                                    <span>{item.label}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// CTA BANNER
// ──────────────────────────────────────────────
function CTABanner() {
    return (
        <section className="cta-banner">
            <div className="cta-blob1" /><div className="cta-blob2" />
            <FadeSection className="cta-content">
                <h2>Ready to Begin Your<br /><span>Success Journey?</span></h2>
                <p>Join thousands of students who have transformed their academic future with Excellent Education Zone. Limited seats available — register today!</p>
                <button
                    className="btn-primary glow"
                    onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                >
                    <span>Claim Your Free Demo Class</span>
                    <FaArrowRight />
                </button>
            </FadeSection>
        </section>
    );
}

// ──────────────────────────────────────────────
// CONTACT
// ──────────────────────────────────────────────
function Contact() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", course: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: "", phone: "", email: "", course: "", message: "" });
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <FadeSection>
                    <p className="section-eyebrow">Get In Touch</p>
                    <h2 className="section-title center">Contact <span>Us</span></h2>
                    <p className="section-sub">We'd love to hear from you. Reach out to us for admissions, queries, or a free demo class.</p>
                </FadeSection>

                <div className="contact-grid">
                    <FadeSection className="contact-info" delay={0.1}>
                        <h3>Our Location</h3>
                        <div className="contact-item">
                            <FaMapMarkerAlt />
                            <div>
                                <strong>Address</strong>
                                <p>Opposite New Corporation Office,<br /> Near Gayatri Bus Stop,<br /> Ranip Ahmedabad.</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaPhone />
                            <div>
                                <strong>Phone</strong>
                                <p>+91 63537 17551</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaEnvelope />
                            <div>
                                <strong>Email</strong>
                                <p>info@excellenteducationzone.com<br />admissions@eez.in</p>
                            </div>
                        </div>

                        <div className="contact-socials">
                            {[FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTwitter].map((Icon, i) => (
                                <a key={i} href="#" className="social-icon"><Icon /></a>
                            ))}
                        </div>

                        <div className="map-placeholder">
                            <FaMapMarkerAlt className="map-pin" />
                            <span>Rajkot, Gujarat</span>
                        </div>
                    </FadeSection>

                    <FadeSection className="contact-form-wrap" delay={0.2}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                                </div>
                                <div className="form-group">
                                    <label>Course Interested In</label>
                                    <select name="course" value={form.course} onChange={handleChange}>
                                        <option value="">Select Course</option>
                                        <option>9th Maths</option>
                                        <option>10th Maths</option>
                                        <option>11th Commerce</option>
                                        <option>12th Commerce</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us how we can help you..." />
                            </div>
                            <button type="submit" className="btn-primary full">
                                {sent ? "✅ Enquiry Sent!" : <><span>Send Enquiry</span><FaArrowRight /></>}
                            </button>
                        </form>
                    </FadeSection>
                </div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────
function Footer() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-grid">
                    <div className="footer-brand">
                        <div className="nav-logo">
                            <div className="logo-icon"><FaGraduationCap /></div>
                            <div className="logo-text">
                                <span className="logo-main">Excellent</span>
                                <span className="logo-sub">Education Zone</span>
                            </div>
                        </div>
                        <p>Empowering the next generation of leaders, innovators, and achievers through quality education and dedicated mentorship since 2026.</p>
                        <div className="contact-socials">
                            {[FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTwitter].map((Icon, i) => (
                                <a key={i} href="#" className="social-icon"><Icon /></a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            {["about", "courses", "why-us", "results", "gallery", "contact"].map((link) => (
                                <li key={link}><button onClick={() => scrollTo(link)}>{link.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}</button></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Courses</h4>
                        <ul>
                            {["9th Maths Tuition", "10th Maths Tuition", "11th Commerce", "12th Commerce"].map((c) => (
                                <li key={c}><button onClick={() => scrollTo("courses")}>{c}</button></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Contact</h4>
                        <p><FaMapMarkerAlt /> Opposite New Corporation Office,<br /> Near Gayatri Bus Stop,<br /> Ranip Ahmedabad.</p>
                        <p><FaPhone /> +91 63537 17551</p>
                        <p><FaEnvelope /> info@excellenteducationzone.com</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Excellent Education Zone. All rights reserved. Designed with ❤️ for Student Success.</p>
            </div>
        </footer>
    );
}

// ──────────────────────────────────────────────
// ROOT
// ──────────────────────────────────────────────
export default function Home() {
    return (
        <div className="app">
            <Navbar />
            <Hero />
            <About />
            <Courses />
            <WhyUs />
            <Results />
            <Testimonials />
            <Gallery />
            <CTABanner />
            <Contact />
            <Footer />
        </div>
    );
}