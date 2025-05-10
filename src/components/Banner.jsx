import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import 'swiper/css';
import image1 from "../assets/banner1.jpg"
import image2 from "../assets/banner2.jpg"
import image3 from "../assets/banner3.jpg"

const Banner = () => {
    const slides = [
        {
            title: "Welcome to WhereIsIt!",
            description: "Find lost items or reconnect them to their rightful owners.",
            image: image1,
        },
        {
            title: "Lost Something?",
            description: "Report it here and increase the chances of finding it.",
            image: image2,
        },
        {
            title: "Found Something?",
            description: "Help others by listing found items here.",
            image: image3,
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div className="w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="my-swiper"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-6">
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <>
                                            <motion.h1
                                                className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4"
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                            >
                                                {slide.title}
                                            </motion.h1>
                                            <motion.p
                                                className="text-base md:text-lg lg:text-xl"
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                            >
                                                {slide.description}
                                            </motion.p>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
