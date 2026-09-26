export default function CommunityCard({
    title,
    imageUrl,
    link
}) {
    return (
        <div className="col-2">
            <div className="thumb">
                <div className="icon">
                    <a href={link}>
                        <h6>{title}</h6>
                        <i className="fa fa-instagram" />
                    </a>
                </div>
                <img src={imageUrl} alt={title} />
            </div>
        </div>
    );
}