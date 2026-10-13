import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import ProductCard from "../product-card/ProductCard";
import SectionHeading from "../section-heading/SectionHeading";
import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";
import EmptyState from "../empty-state/EmptyState";
import styles from "./CarouselSection.module.css";

export default function CarouselSection({
    ref,
    id,
    title,
    subtitle,
    eyebrow = "New Arrivals",
    tier,
    mirrored = false,
    products = [],
    loading = false,
    error = null
}) {
    const className = ["ridge-section", styles.productCarousel, styles[`tier${tier}`], mirrored && styles.mirrored]
        .filter(Boolean)
        .join(" ");

    const isReady = !loading && !error;

    return (
        <section ref={ref} className={className} id={id}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <SectionHeading
                            className={styles.heading}
                            eyebrow={eyebrow}
                            title={title}
                            subtitle={subtitle}
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {loading && <Loader />}
                        {!loading && error && <ErrorMessage />}
                        {isReady && products.length === 0 && <EmptyState />}
                        {isReady && products.length > 0 && (
                            <>
                                <button type="button" className={styles.carouselPrev} aria-label="Previous">
                                    <i className="fa fa-angle-left" />
                                </button>
                                <Swiper
                                    modules={[Navigation]}
                                    navigation={{
                                        prevEl: `#${id} .${styles.carouselPrev}`,
                                        nextEl: `#${id} .${styles.carouselNext}`,
                                    }}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    breakpoints={{
                                        768: { slidesPerView: 2 },
                                        992: { slidesPerView: 3 },
                                    }}
                                    loop
                                >
                                    {products.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <ProductCard
                                                productId={product.id}
                                                productName={product.name}
                                                productPrice={product.price}
                                                productImage={product.image_url}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button type="button" className={styles.carouselNext} aria-label="Next">
                                    <i className="fa fa-angle-right" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
