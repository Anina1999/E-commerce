export default function NewArrivalsProducts({ productName, productPrice, productImage }) {
    return (
        <div className="item">
            <div className="thumb">
                <div className="hover-content">
                    <ul>
                        <li>
                            <a href="single-product.html">
                                <i className="fa fa-eye" />
                            </a>
                        </li>
                        <li>
                            <a href="single-product.html">
                                <i className="fa fa-star" />
                            </a>
                        </li>
                        <li>
                            <a href="single-product.html">
                                <i className="fa fa-shopping-cart" />
                            </a>
                        </li>
                    </ul>
                </div>
                <img src={productImage} alt={productName} />
            </div>
            <div className="down-content">
                <h4>{productName}</h4>
                <span>${productPrice.toFixed(2)}</span>
                <ul className="stars">
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                </ul>
            </div>
        </div>
    );
}