import React, { useEffect, useRef } from 'react'
import Stats from './Stats'

const Headline = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const items = el.querySelectorAll('.carousel-item');
        if (!items || items.length === 0) return;

        let index = 0;
        let intervalId;

        const start = () => {
            intervalId = setInterval(() => {
                index = (index + 1) % items.length;
                const target = items[index];
                el.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            }, 5000);
        };
        const stop = () => intervalId && clearInterval(intervalId);

        // start autoplay
        start();

        // pause on hover
        el.addEventListener('mouseenter', stop);
        el.addEventListener('mouseleave', start);

        return () => {
            stop();
            el.removeEventListener('mouseenter', stop);
            el.removeEventListener('mouseleave', start);
        };
    }, []);
    return (
        <section className="w-full py-10 sm:py-14 md:py-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5 md:gap-8 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Sol: Yazılar */}
                <div className="flex-1 flex flex-col justify-between items-center md:items-start gap-5 md:gap-6 h-full md:min-h-[600px] text-center md:text-left">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug md:leading-[1.1] text-primary">Kitaplar parmaklarınızın ucunda</h1>
                    </div>
                    <div>
                        <h2 className="text-sm sm:text-base md:text-2xl text-base-content/90 mt-2 sm:mt-3 md:mt-4 leading-relaxed md:leading-snug">Booky ile favori kitaplarınızı bulun, favori yazarlarınızı takip edin ve sipariş verin.</h2>
                        <div className="mt-3 sm:mt-4 md:mt-6 w-full max-w-xl mx-auto md:mx-0">
                            <Stats />
                        </div>
                    </div>
                    <div className="w-full flex justify-center md:justify-start">
                        <button className="btn btn-primary btn-sm sm:btn-md md:btn-lg">Kitapları Keşfet</button>
                    </div>
                </div>

                {/* Sağ: Carousel */}
                <div className="flex-1 flex justify-center md:justify-end items-center">
                    <div ref={carouselRef} className="carousel carousel-vertical overflow-hidden w-full md:w-[400px] h-[320px] sm:h-[380px] md:h-[600px]">
                        <div className="carousel-item h-full w-full flex items-center justify-center">
                            <img src="https://covers.openlibrary.org/b/id/7222246-L.jpg" alt="Moby-Dick" className="object-contain w-full h-full rounded-lg sm:rounded-xl" />
                        </div>
                        <div className="carousel-item h-full w-full flex items-center justify-center">
                            <img src="https://covers.openlibrary.org/b/id/7222247-L.jpg" alt="Pride and Prejudice" className="object-contain w-full h-full rounded-lg sm:rounded-xl" />
                        </div>
                        <div className="carousel-item h-full w-full flex items-center justify-center">
                            <img src="https://covers.openlibrary.org/b/id/7222248-L.jpg" alt="1984" className="object-contain w-full h-full rounded-lg sm:rounded-xl" />
                        </div>
                        <div className="carousel-item h-full w-full flex items-center justify-center">
                            <img src="https://covers.openlibrary.org/b/id/7222249-L.jpg" alt="To Kill a Mockingbird" className="object-contain w-full h-full rounded-lg sm:rounded-xl" />
                        </div>
                        <div className="carousel-item h-full w-full flex items-center justify-center">
                            <img src="https://covers.openlibrary.org/b/id/7222250-L.jpg" alt="The Great Gatsby" className="object-contain w-full h-full rounded-lg sm:rounded-xl" />
                        </div>
                        <div className="carousel-item h-full w-full flex items-center justify-center">
                            <img src="https://covers.openlibrary.org/b/id/7222253-L.jpg" alt="The Hobbit" className="object-contain w-full h-full rounded-lg sm:rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Headline