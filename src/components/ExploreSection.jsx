const content = {
    title: "Gear Advice From People Who Use It",
    intro: "Not sure what to pick? Every item in our store has been tested on real trails, runs, rides and climbs.",
    quote: "They helped me pick boots that lasted my whole Rila traverse.",
    paragraphs: [
        "Tell us where you're heading and we'll help you choose the right size, fit and layers for the conditions.",
        "Changed your mind? Returns are free within 30 days, so you can order with confidence.",
    ],
    buttonText: "Shop All Gear",
    highlights: [
        { title: "Free Returns", subtitle: "Within 30 days" },
        { title: "Expert Advice", subtitle: "From real adventurers" },
    ],
};

export default function ExploreSection() {
    return (
        <section className="section" id="explore">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="left-content">
                            <h2>{content.title}</h2>
                            <span>{content.intro}</span>
                            <div className="quote">
                                <i className="fa fa-quote-left" />
                                <p>{content.quote}</p>
                            </div>
                            {content.paragraphs.map((text) => (
                                <p key={text}>{text}</p>
                            ))}
                            <div className="main-border-button">
                                <a href="#hiking">{content.buttonText}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="right-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="leather">
                                        <h4>{content.highlights[0].title}</h4>
                                        <span>{content.highlights[0].subtitle}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="first-image">
                                        <img src="assets/images/explore-image-01.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="second-image">
                                        <img src="assets/images/explore-image-02.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="types">
                                        <h4>{content.highlights[1].title}</h4>
                                        <span>{content.highlights[1].subtitle}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
