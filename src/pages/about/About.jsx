import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import SubscribeSection from "../../components/subscribe-section/SubscribeSection";
import { teamMembers } from "../../data/team";
import styles from "./About.module.css";

export default function About() {
    return (
        <>
            <PageHeading
                variant="about"
                title="About Tourashop"
                subtitle="Outdoor gear chosen by people who actually use it"
            />

            <div className={`ridge-section ${styles.aboutUs}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={styles.leftImage}>
                                <img src="/assets/images/explore-store.jpg" alt="Tourashop store" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.rightContent}>
                                <h4>About Us &amp; Our Story</h4>
                                <span>We started in Boulder with one idea: good gear makes every trail better.</span>
                                <div className={styles.quote}>
                                    <i className="fa fa-quote-left" />
                                    <p>Every product in our store is tested on real trails, roads and walls before it reaches you.</p>
                                </div>
                                <p>From hiking boots to climbing harnesses, we pick gear for hikers, runners, bikers and climbers of every level.</p>
                                <ul>
                                    <li><a href="https://www.instagram.com"><i className="fa fa-instagram" /></a></li>
                                    <li><a href="https://www.facebook.com"><i className="fa fa-facebook" /></a></li>
                                    <li><a href="https://www.youtube.com"><i className="fa fa-youtube-play" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className={`ridge-section ${styles.ourTeam}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <SectionHeading
                                variant="about"
                                className={styles.heading}
                                title="Our Amazing Team"
                                subtitle="The people who test our gear on the trail before it reaches you."
                            />
                        </div>
                        {teamMembers.map((member) => (
                            <div className="col-lg-4" key={member.id}>
                                <div className={styles.teamItem}>
                                    <div className={styles.thumb}>
                                        <div className={styles.hoverEffect}>
                                            <div className={styles.innerContent}>
                                                <ul>
                                                    <li><a href="https://www.instagram.com"><i className="fa fa-instagram" /></a></li>
                                                    <li><a href="https://www.facebook.com"><i className="fa fa-facebook" /></a></li>
                                                    <li><a href="https://www.youtube.com"><i className="fa fa-youtube-play" /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                    <div className={styles.downContent}>
                                        <h4>{member.name}</h4>
                                        <span>{member.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`ridge-section ${styles.ourServices}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <SectionHeading
                                variant="about"
                                className={styles.heading}
                                title="Our Services"
                                subtitle="More than a store - we help you get out there."
                            />
                        </div>
                        <div className="col-lg-4">
                            <div className={styles.serviceItem}>
                                <h4>Gear Advice</h4>
                                <p>Not sure what you need? Our team helps you pick the right gear for your next trip.</p>
                                <img src="/assets/images/hero-hiking.jpg" alt="Hiking" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={styles.serviceItem}>
                                <h4>Free Returns</h4>
                                <p>Try it on the trail. If it doesn't fit, send it back within 30 days.</p>
                                <img src="/assets/images/hero-running.jpg" alt="Running" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={styles.serviceItem}>
                                <h4>Group Trips</h4>
                                <p>Join our monthly hikes, runs and climbing days with the Tourashop community.</p>
                                <img src="/assets/images/hero-climbing.jpg" alt="Climbing" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SubscribeSection />
        </>
    );
}