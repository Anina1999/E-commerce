import styles from "./SectionHeading.module.css";

export default function SectionHeading({ eyebrow, title, subtitle, variant, className }) {
    const rootClassName = [styles.sectionHeading, styles[variant], className].filter(Boolean).join(" ");

    return (
        <div className={rootClassName}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2>{title}</h2>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
    );
}
