import styles from "./SectionHeading.module.css";

// variant: "about" or "subscribe" changes the look; className is for the parent's spacing (margins) only
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
