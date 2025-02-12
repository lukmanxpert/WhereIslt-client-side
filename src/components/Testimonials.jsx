import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Jane Doe",
            feedback: "I found my lost wallet within a day! This platform is a lifesaver.",
            image: "https://i.ibb.co.com/TLxnRm7/images.jpg",
            rating: 5,
        },
        {
            name: "John Smith",
            feedback: "Excellent service! I reunited with my pet through this site.",
            image: "https://i.ibb.co.com/HPRWcwq/360-F-243123463-z-Tooub557x-EWABDLk0j-Jkl-Dy-LSGl2jrr.jpg",
            rating: 4.5,
        },
        {
            name: "Emily Johnson",
            feedback: "Such a helpful website! Highly recommended for everyone.",
            image: "https://i.ibb.co.com/hgjqNxq/360-F-383258331-D8ima-EMl8-Q3lf7-EKU2-Pi78-Cn0-R7-Kk-W9o.jpg",
            rating: 5,
        },
    ];

    return (
        <section className="bg-light_bg dark:bg-dark_bg py-10 ">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">What Our Users Say</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                className="bg-light_bg dark:bg-dark_bg p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.05,
                                    transition: { type: "spring", stiffness: 300, damping: 10 },
                                }}
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 mx-auto rounded-full mb-4"
                                />
                                <h3 className="text-lg dark:text-white font-semibold">{testimonial.name}</h3>
                                <p className="text-gray-600 mt-2 dark:text-gray-100">{testimonial.feedback}</p>
                                <div className="text-yellow-500 mt-2">
                                    {"★".repeat(Math.floor(testimonial.rating))}
                                    {testimonial.rating % 1 > 0 && "☆"}
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
