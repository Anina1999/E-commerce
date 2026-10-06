import { Link } from "react-router";
import styles from "./ExploreSection.module.css";

const content = {
    eyebrow: "Why Tourashop",
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

export default function ExploreSection({ ref }) {
    return (
        <section ref={ref} className={`ridge-section ${styles.explore}`} id="explore">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={styles.leftContent}>
                            <span className="eyebrow">{content.eyebrow}</span>
                            <h2>{content.title}</h2>
                            <span className={styles.intro}>{content.intro}</span>
                            <div className={styles.quote}>
                                <i className="fa fa-quote-left" />
                                <p>{content.quote}</p>
                            </div>
                            {content.paragraphs.map((text) => (
                                <p key={text}>{text}</p>
                            ))}
                            <div className={`main-border-button main-teal-button ${styles.button}`}>
                                <Link to="/catalog">{content.buttonText}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className={`${styles.highlight} ${styles.firstHighlight}`}>
                                        <h4>{content.highlights[0].title}</h4>
                                        <span>{content.highlights[0].subtitle}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className={styles.firstImage}>
                                        <img src="assets/images/explore-store.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div>
                                        <img src="assets/images/explore-backpacks.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className={`${styles.highlight} ${styles.secondHighlight}`}>
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
