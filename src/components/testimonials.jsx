import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
    { name: "Priya Sharma", grade: "Class 10, GSEB", text: "EEZ transformed my approach to Maths. The faculty is incredibly supportive and I always had my doubts cleared instantly. I scored 91% in boards!", stars: 5, initials: "PS", color: "#3a7bd5" },
    { name: "Arjun Mehta", grade: "Class 12 Commerce", text: "I joined EEZ in Class 11 and it was the best decision. The structured coaching and weekly tests helped me score 88% in my board exams.", stars: 5, initials: "AM", color: "#f7971e" },
    { name: "Kavya Patel", grade: "Class 10", text: "The Maths coaching at EEZ is exceptional. The teacher explains every concept so clearly that solving tough problems became easy. Got A1 in Maths!", stars: 5, initials: "KP", color: "#c471ed" },
    { name: "Ravi Desai", grade: "Parent – Class 9", text: "My son struggled with Maths until he joined EEZ. Within 3 months, his marks jumped from 55% to 85%. The personal attention here is unmatched.", stars: 5, initials: "RD", color: "#43e97b" },
    { name: "Sneha Joshi", grade: "Class 12 Commerce", text: "The Accounts and Economics coaching is phenomenal. Clear concepts, real examples, and regular revision helped me score 94 in Accounts. Truly the best!", stars: 5, initials: "SJ", color: "#12c2e9" },
];

// Self-contained FadeSection — no import from home.jsx needed
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

export default function TestimonialsSection() {
    return (
        <section className="testimonials section" id="testimonials">
            <div className="testi-bg-blob" />
            <div className="container">
                <FadeSection>
                    <p className="section-eyebrow">Student Voices</p>
                    <h2 className="section-title center">What Our <span>Students Say</span></h2>
                    <p className="section-sub">Real stories from real students who transformed their academic journey with us.</p>
                </FadeSection>
                <div className="testi-swiper-wrapper">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={15}
                        slidesPerView={3}
                        speed={700}
                        navigation={{ prevEl: '.testi-btn-prev', nextEl: '.testi-btn-next' }}
                        pagination={{
                            el: '.testi-pagination',
                            clickable: true,
                            bulletClass: 'testi-bullet',
                            bulletActiveClass: 'testi-bullet-active'
                        }}
                        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        loop={false}
                        rewind={false}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 15 },
                            768: { slidesPerView: 2, spaceBetween: 15 },
                            1024: { slidesPerView: 3, spaceBetween: 15 },
                        }}
                        className="testi-swiper"
                    >
                        {testimonials.map((t) => (
                            <SwiperSlide key={t.name}>
                                <div className="testi-card">
                                    <FaQuoteLeft className="quote-icon" />
                                    <p className="testi-text">{t.text}</p>
                                    <div className="testi-stars">
                                        {Array(t.stars).fill(0).map((_, i) => <FaStar key={i} />)}
                                    </div>
                                    <div className="testi-author">
                                        <div
                                            className="testi-avatar"
                                            style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                                        >
                                            {t.initials}
                                        </div>
                                        <div>
                                            <div className="testi-name">{t.name}</div>
                                            <div className="testi-grade">{t.grade}</div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="testi-controls">
                        <button className="testi-btn testi-btn-prev"><FaChevronLeft /></button>
                        <div className="testi-pagination" />
                        <button className="testi-btn testi-btn-next"><FaChevronRight /></button>
                    </div>
                </div>
            </div>
        </section>
    );
}