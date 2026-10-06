export default function PageHeading({
    title,
    subtitle,
    className = "page-heading"
}) {
    return (
        <div className={className} id="top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="inner-content">
                            <h2>{title}</h2>
                            {subtitle && <span>{subtitle}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}