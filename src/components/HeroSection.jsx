import HeroCard from "./HeroCard";

export default function HeroSection() {
    return (
        <div className="main-banner" id="top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="left-content">
                            <div className="thumb">
                                <div className="inner-content">
                                    <h4>We Are Tourashop</h4>
                                    <span>Our products are designed for the modern adventurer</span>
                                    <div className="main-border-button">
                                        <a href="#">Purchase Now!</a>
                                    </div>
                                </div>
                                <img src="/assets/images/left-banner-image.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="right-content">
                            <div className="row">
                                
                                <HeroCard 
                                    activity="Hiking"
                                    activityBestItems="Best Items For Hiking"
                                    itemsText="Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid."
                                    activityImage="/assets/images/baner-right-image-01.jpg"
                                    
                                />

                                <HeroCard 
                                    activity="Running"
                                    activityBestItems="Best Items For Running"
                                    itemsText="Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid."
                                    activityImage="/assets/images/baner-right-image-03.jpg"
                                />

                                <HeroCard 
                                    activity="Biking"
                                    activityBestItems="Best Items For Biking"
                                    itemsText="Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid."
                                    activityImage="/assets/images/baner-right-image-02.jpg"
                                />
                                
                                <HeroCard 
                                    activity="Climbing"
                                    activityBestItems="Best Items For Climbing"
                                    itemsText="Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid."
                                    activityImage="/assets/images/baner-right-image-03.jpg"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}