export default function InstagramCard({
    title,
    image,
    link
}) {
    return (
        <div className="col-3">
            <div className="thumb">
                <div className="icon">
                    <a href={link}>
                        <h6>{title}</h6>
                        <i className="fa fa-instagram" />
                    </a>
                </div>
                <img src={image} alt={title} />
            </div>
        </div>
    );
}
