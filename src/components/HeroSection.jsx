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
                                    <span className="eyebrow">Outdoor Gear</span>
                                    <h4>We Are Tourashop</h4>
                                    <span>Our products are chosen for the modern adventurer</span>
                                    <div className="main-border-button">
                                        <a href="#">Purchase Now!</a>
                                    </div>
                                </div>
                                <img src="/assets/images/hero-main.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="right-content">
                            <div className="row">
                                
                                <HeroCard 
                                    activity="Hiking"
                                    activityBestItems="Best Items For Hiking"
                                    itemsText="Boots, packs and layers built for long days on the trail."
                                    activityImage="/assets/images/hero-hiking.jpg"
                                    
                                />

                                <HeroCard 
                                    activity="Running"
                                    activityBestItems="Best Items For Running"
                                    itemsText="Light shoes and breathable gear for road and trail miles."
                                    activityImage="/assets/images/hero-running.jpg"
                                />

                                <HeroCard 
                                    activity="Biking"
                                    activityBestItems="Best Items For Biking"
                                    itemsText="Helmets, gloves and apparel for every ride, from city streets to singletrack."
                                    activityImage="/assets/images/hero-biking.jpg"
                                />
                                
                                <HeroCard 
                                    activity="Climbing"
                                    activityBestItems="Best Items For Climbing"
                                    itemsText="Harnesses, shoes and chalk bags for the crag and the gym."
                                    activityImage="/assets/images/hero-climbing.jpg"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}