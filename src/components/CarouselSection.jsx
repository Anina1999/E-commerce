import NewArrivalsProducts from "./NewArrivalsProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";

export default function CarouselSection({
    id,
    title,
    products
}) {
    return (
        <section className="section product-carousel" id={id}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h2>{title}</h2>
                            <span>
                                Details to details is what makes Hexashop different from the other
                                themes.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <button type="button" className="carousel-prev" aria-label="Previous" >
                            <i className="fa fa-angle-left" />
                        </button>
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                prevEl: `#${id} .carousel-prev`,
                                nextEl: `#${id} .carousel-next` }}
                            spaceBetween={30}
                            slidesPerView={1}
                            breakpoints={{768: { slidesPerView: 2 }, 992: { slidesPerView: 3 }}} loop>
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <NewArrivalsProducts
                                        productName={product.name}
                                        productPrice={product.price}
                                        productImage={product.image}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button type="button" className="carousel-next" aria-label="Next" >
                            <i className="fa fa-angle-right" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
