import { Link } from "react-router-dom";

<div className="card h-100">
    <div className="card-body">

        <h5 className="card-title">
            <i className="bi bi-laptop me-2"></i>
            {laptop.title}
        </h5>

        <p className="card-text">
            Categoria: {laptop.category}
        </p>

        <Link
            to={`/laptop/${laptop.id}`}
            className="btn btn-primary"
        >
            Dettagli
        </Link>

    </div>
</div>