import styles from "./PageHeading.module.css";

export default function PageHeading({
    title,
    subtitle,
    variant,
    className
}) {
    const rootClassName = [styles.pageHeading, styles[variant], className].filter(Boolean).join(" ");

    return (
        <div className={rootClassName} id="top">
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
