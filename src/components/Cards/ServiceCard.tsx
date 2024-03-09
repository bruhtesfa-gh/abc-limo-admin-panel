import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Service } from "../Model/Service";
function ServiceCard({
    service,
    setDeleteModalId,
}: {
    service: Service;
    setDeleteModalId: Dispatch<SetStateAction<string | undefined>>;
}) {
    return (
        <div className="col-md-6 col-lg-4 mt-4">
            <div className="card">
                <img
                    className="card-img-top"
                    style={{ height: "329px" }}
                    src={service.img}
                    alt="Card image cap"
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {" "}
                        {service?.title?.length > 20
                            ? service?.title?.substr(0, 20)
                            : service?.title}
                    </h5>
                    {/* TODO fix the number of words limit and elipses */}
                    <p className="card-text">
                        {service?.content?.length > 50
                            ? service?.content?.substr(0, 50)
                            : service?.content}
                    </p>
                </div>
                <div className="card-body">
                    <Link to={`/services/${service.id}`} className="card-link">
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="card-link text-danger"
                        data-bs-toggle="modal"
                        onClick={() => setDeleteModalId(service.id)}
                        style={{ backgroundColor: "transparent", border: "none" }}
                        data-bs-target="#modalToggle"
                    // className=" "
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ServiceCard;
