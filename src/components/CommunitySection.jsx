import SectionHeading from "./SectionHeading";
import InstagramCard from "./InstagramCard";
import { instagramPosts } from "../data/instagramPosts";

export default function CommunitySection() {
    return (
        <section className="section" id="social">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionHeading
                            title="Follow the Adventure"
                            subtitle="Real adventures from our community — tag us on Instagram to be featured."
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row images">
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