import SectionHeading from "../section-heading/SectionHeading";
import InstagramCard from "../instagram-card/InstagramCard";
import { instagramPosts } from "../../data/instagramPosts";
import styles from "./CommunitySection.module.css";

export default function CommunitySection() {
    return (
        <section className={`ridge-section ${styles.social}`} id="social">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionHeading
                            eyebrow="#Tourashop"
                            title="Follow the Adventure"
                            subtitle="Real adventures from our community — tag us on Instagram to be featured."
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={`row ${styles.images}`}>
                    {instagramPosts.map((post) => (
                        <InstagramCard
                            key={post.id}
                            title={post.title}
                            image={post.image}
                            link={post.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}