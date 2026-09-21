export default function HeroCard({activity, activityBestItems, itemsText, activityImage}) {
    return (
        <div className="col-lg-6">
            <div className="right-first-image">
                <div className="thumb">
                    <div className="inner-content">
                        <h4>{activity}</h4>
                        <span>{activityBestItems}</span>
                    </div>
                    <div className="hover-content">
                        <div className="inner">
                            <h4>{activity}</h4>
                            <p>
                                {itemsText}
                            </p>
                            <div className="main-border-button">
                                <a href="#">Discover More</a>
                            </div>
                        </div>
                    </div>
                    <img src={activityImage} alt={activity} />
                </div>
            </div>
        </div>
    );
}