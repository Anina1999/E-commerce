import { Link } from "react-router";
import styles from "./Pagination.module.css";

export default function Pagination({ page, pageCount, className = "" }) {
    if (pageCount <= 1) {
        return null;
    }

    const pageNumbers = [];
    for (let number = 1; number <= pageCount; number++) {
        pageNumbers.push(number);
    }

    return (
        <nav className={`${styles.pagination} ${className}`}>
            <ul>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <Link to={`?page=${number}`} className={number === page ? styles.active : ""}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
