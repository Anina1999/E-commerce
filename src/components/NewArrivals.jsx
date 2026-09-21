import NewArrivalsProducts from "./NewArrivalsProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';

export default function NewArrivals() {
    return (
        <section className="section" id="men">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h2>Hiking's Latest</h2>
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
                        <div className="men-item-carousel">
                            <Swiper modules={[Navigation]} navigation spaceBetween={30} slidesPerView={1} breakpoints={{ 768: {slidesPerView: 2 }, 992: {slidesPerView: 3 } }} loop>
                                <SwiperSlide>
                                    <NewArrivalsProducts 
                                    productName="Classic Spring"
                                    productPrice={120.00}
                                    productImage="/assets/images/men-01.jpg"
                                />
                                </SwiperSlide>
                                
                                <SwiperSlide>
                                    <NewArrivalsProducts 
                                    productName="Classic Spring"
                                    productPrice={120.00}
                                    productImage="/assets/images/men-01.jpg"
                                />
                                </SwiperSlide>
                                
                                <SwiperSlide>
                                    <NewArrivalsProducts 
                                    productName="Classic Spring"
                                    productPrice={120.00}
                                    productImage="/assets/images/men-01.jpg"
                                />
                                </SwiperSlide>
                                
                                <SwiperSlide>
                                    <NewArrivalsProducts 
                                    productName="Classic Spring"
                                    productPrice={120.00}
                                    productImage="/assets/images/men-01.jpg"
                                />
                                </SwiperSlide>
                                
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}