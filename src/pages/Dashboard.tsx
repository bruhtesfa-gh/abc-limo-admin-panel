import React from "react";
import paypalImg from "../assets/img/icons/unicons/chart.png";
import { getDashboardStat } from "../api";
import { useQuery } from "react-query";
import Spinner, { FullScreenSpinner } from "../components/Spinner";
import { Link } from "react-router-dom";
const keys = [
  {
    key: "numberOfNewReservation",
    label: "New Reservations",
  },
  {
    key: "numberOfReservation",
    label: "Total Reservations",
  },
  {
    key: "numberOfPendingReservation",
    label: "Pending Reservations",
  },
  {
    key: "numberOfCompletedReservation",
    label: "Completed Reservations",
  },
  {
    key: "numberOfRejectedReservation",
    label: "Rejected Reservations",
  },
  {
    key: "numberOfBlogs",
    label: "Blogs",
  },
  {
    key: "numberOfVehicle",
    label: "Vehicles",
  },
];
const NewNotificationIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" style={{ fill: "#00ff4c" }}><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
}

const BlogIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" style={{ fill: "#6c4747" }}><path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z" /></svg>
}

const VehicleIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" style={{ fill: "#6c4747" }}><path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" /></svg>
}

const CheckIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512" style={{ fill: "#00ff4c" }}><path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" /></svg>
}

const ListIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" style={{ fill: "#6c4747" }}><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
}

const TrashIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512" style={{ fill: "#FF4747" }}><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
}

const ClockIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" style={{ fill: "#6c4747" }}><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
}

function Dashboard({ }) {
  const { data, isLoading, isError } = useQuery("stats", getDashboardStat);
  if (isLoading) return <FullScreenSpinner />;
  return (
    <>
      <div className="row mb-5">
        {keys.map(({ key, label }, index) => {
          return (
            <div className="col-md-6 col-lg-4 mt-4" key={key}>
              <Link to={label.includes("Reservations") ? "/reservations" : label.includes("Blogs") ? "/blogs" : "/vehicles"} style={{ color: "inherit" }}>
                <div className="card">
                  {index === 0 && data[key] > 0 && <div style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                  }}>
                    <NewNotificationIcon />
                  </div>}
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        {
                          label.includes("Blogs") ? <BlogIcon /> : label.includes("Vehicles") ? <VehicleIcon /> :
                            (label.includes("New") || label.includes("Total")) ? <ListIcon /> :
                              label.includes("Completed") ? <CheckIcon /> :
                                label.includes("Rejected") ? <TrashIcon /> :
                                  label.includes("Pending") ? <ClockIcon /> :
                                    <img
                                      src={paypalImg}
                                      alt="Credit Card"
                                      className="rounded"
                                    />
                        }
                      </div>
                    </div>
                    <span className="d-block mb-1">{label}</span>
                    <h3 className="card-title text-nowrap mb-2">{data[key]}</h3>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
