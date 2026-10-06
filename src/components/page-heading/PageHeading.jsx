import styles from "./PageHeading.module.css";

// variant: "about", "contact" or "notFound" swaps the background photo; leave it out for the default one
export default function PageHeading({
    title,
    subtitle,
    variant
}) {
    const className = [styles.pageHeading, styles[variant]].filter(Boolean).join(" ");

    return (
        <div className={className} id="top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className={styles.innerContent}>
                            <h2>{title}</h2>
                            {subtitle && <span>{subtitle}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
