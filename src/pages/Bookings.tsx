import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { deleteReservation, getReservationS } from "../api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import DeleteConfirmationModal from "../components/Menu/DeleteConfirmationModal";
import { Book } from "../components/Model/Book";
import { FullScreenSpinner } from "../components/Spinner";
function Bookings() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const queryClient = useQueryClient();
  const [deleteModalId, setDeleteModalId] = useState<string>();
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    ["reservations"],
    ({ pageParam = 1 }) => {
      return getReservationS(pageParam);
    },
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage.length) {
          return pages.length + 1;
        }
      },
    }
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <DeleteConfirmationModal
        mutationFunction={deleteReservation}
        mutationName="delete-reservation"
        queryName="reservations"
        id={deleteModalId}
      />
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Admin/</span> Book
      </h4>

      <div className="card">
        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Curstomer Email</th>
                <th>Customer Phone </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data?.pages.map((reservations: Book[], i: number) => {
                return reservations.map((reservation: Book, j) => {
                  return (
                    <TableRow
                      key={reservation.id}
                      setDeleteModalId={setDeleteModalId}
                      reservation={reservation}
                    />
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
      {(isFetching || isLoading) && <FullScreenSpinner />}
      <div ref={ref}></div>
    </>
  );
}
function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-label-warning";
    case "COMPLETED":
      return "bg-label-success";
    case "REJECTED":
      return "bg-label-danger";
    default:
      return "bg-label-warning";

    // code block
  }
}
function TableRow({
  reservation,
  setDeleteModalId,
}: {
  reservation: Book;
  setDeleteModalId: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <tr>
      <td>
        {reservation.firstName + " " + reservation.lastName}
      </td>
      <td>{reservation.email}</td>
      <td>{reservation.phoneNumber}</td>
      <td>
        <span className={`badge ${getStatusColor(reservation.status)} me-1`}>
          {reservation.status}
        </span>
      </td>
      <td>
        <div className="d-flex">
          <Link
            to={`/reservation/${reservation.id}`}
            className="btn btn-primary col-auto mx-2"

          >
            <i className="bx bx-edit-alt me-1"></i> Edit
          </Link>
          <button
            onClick={() => setDeleteModalId(reservation.id)}
            className="btn btn-primary col-auto"
          >
            <i className="bx bx-trash me-1"></i> Delete
          </button>
        </div>
        {/* <div className="dropdown">
          <button
            type="button"
            className="btn p-0 dropdown-toggle hide-arrow"
            data-bs-toggle="dropdown"
          >
            <i className="bx bx-dots-vertical-rounded"></i>
          </button>
          <div className="dropdown-menu">
            
          </div>
        </div> */}
      </td>
    </tr>
  );
}
export default Bookings;
