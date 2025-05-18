import { useEffect, useState }  from 'react'
import { Button } from '@/components/ui/button';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/autoplay';

const contactHero = () => {
    const [slides, setSlides] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/contact-us/hero')
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) setSlides(data);
        });
    }, []);

    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            loop={slides.length > 1}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            className="h-[700px]"
        >
            {slides.map(slide => (
                <SwiperSlide key={slide._id}>
                    <div className="relative h-[600px] overflow-hidden">
                        <div
                            className="absolute inset-0 h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image?.secure_url || '/fallback.jpg'})` }}
                        ></div>
                        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                            <div className="max-w-2xl text-black">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-xl mb-8">
                                    {slide.description}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50 !rounded-button whitespace-nowrap"
                                >
                                    <FaPhone className="fas fa-phone-alt mr-2"/>Call Us
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-gray-200 border-white text-blue-500 hover:bg-white/10 !rounded-button whitespace-nowrap"
                                >
                                    <FaEnvelope className="fas fa-envelope mr-2"/> Email Us
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default contactHero;