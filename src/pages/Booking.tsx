import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, getReservation, updateReservation } from "../api";
import { FullScreenSpinner } from "../components/Spinner";
import axios from "axios";
type Status = "PENDING" | "COMPLETED" | "REJECTED";

const statusList = ["PENDING", "COMPLETED", "REJECTED"];
const vehicle = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Price per day",
    key: "pricePerDay",
  },
  {
    title: "Type",
    key: "type",
  },
  {
    title: "Passenger Size",
    key: "passengerSize",
  },
  {
    title: "Description",
    key: "description",
  },
];
const customer = [
  {
    title: "First Name",
    key: "firstName",
  },
  {
    title: "Last Name",
    key: "lastName",
  },
  {
    title: "Phone Number",
    key: "phoneNumber",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "from Address",
    key: "fromAddress",
  },
  {
    title: "to Address",
    key: "toAddress",
  },
  {
    title: "Driver Gender Preference",
    key: "driverGender",
  },
  {
    title: "Lugggage Count",
    key: "luggageCount",
  },
  {
    title: "Person Count",
    key: "personCount",
  },
  {
    title: "journeyDate",
    key: "journeyDate",
  },
  {
    title: "Description",
    key: "description",
  },
];

function Booking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const mutation = useMutation(["reservation", id], updateReservation);
  const [status, setStatus] = useState<Status>();
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [journeyDate, setJourneyDate] = useState<string>("");

  const { data, isLoading } = useQuery(
    ["reservation", id],
    () => getReservation(id as string),
    {
      enabled: Boolean(id),
    }
  );

  function handeChange(e: ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value as Status);
  }

  const handleUpdate = async () => {
    try {
      let updateData = {} as any;
      if (status) updateData.status = status;
      if (fromAddress !== "") updateData.fromAddress = fromAddress;
      if (toAddress !== "") updateData.toAddress = toAddress;
      if (journeyDate !== "") updateData.journeyDate = journeyDate;
      //console.log(updateData);
      if (Object.keys(updateData).length === 0) {
        return;
      }
      const response = await axios.patch(`${BASE_URL}/book/${id}`, updateData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/reservations");
      }
      // mutation.mutate(updateData);
      //return data;
    } catch (error: any) {}
  };
  useEffect(() => {
    if (data) {
      setStatus(data["status"]);
    }
  }, [data]);
  if (mutation.isSuccess) {
    (async () => {
      await queryClient.refetchQueries(["reservation", id]);
      await queryClient.refetchQueries(["reservations"]);
      mutation.reset();
      navigate("/reservations");
    })();
  }
  if (isLoading || mutation.isLoading) return <FullScreenSpinner />;
  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Admin /</span> Reservation
      </h4>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="mb-3 col-md-2">
                  <Select
                    handleChange={handeChange}
                    value={status}
                    selectLabel="Select"
                    options={statusList}
                    label="Reservation Status"
                  />
                </div>
                {/* lets add pick-up address inpute */}
                <div className="mb-3 col-md-2">
                  <label className="form-label">Pick-up Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pick-up Address"
                    onChange={(e) => setFromAddress(e.target.value)}
                    defaultValue={data?.fromAddress}
                  />
                </div>
                {/* lets add drop-off address inpute */}
                <div className="mb-3 col-md-2">
                  <label className="form-label">Drop-off Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Drop-off Address"
                    onChange={(e) => setToAddress(e.target.value)}
                    defaultValue={data?.toAddress}
                  />
                </div>
                {/* lets add pick-up date inpute */}
                <div className="mb-3 col-md-2">
                  <label className="form-label">Pick-up Date</label>
                  {/* disable time before now */}
                  <input
                    type="datetime-local"
                    className="form-control"
                    placeholder="Pick-up Date"
                    min={new Date().toISOString().split(".")[0]}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    defaultValue={
                      new Date(data?.journeyDate).toISOString().split(".")[0]
                    }
                  />
                </div>
              </div>
              <div className="mb-3 col-md-2">
                <button
                  className="btn btn-primary"
                  disabled={mutation.isLoading || !status}
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
              <div id="formAccountSettings" className="row">
                <div className="col">
                  <h5 className="fw-bold py-3 mb-2">Customer Detail</h5>
                  {customer.map(({ title, key }) => {
                    return (
                      <DetailRow key={key} title={title} value={data[key]} />
                    );
                  })}
                </div>
                <div className="col">
                  <h5 className="fw-bold py-3 mb-2">Vehicle Detail</h5>
                  {vehicle.map(({ title, key }) => {
                    return (
                      <DetailRow
                        key={key}
                        title={title}
                        value={data["vehicle"][key]}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <!-- /Account --> */}
          </div>
        </div>
      </div>
    </>
  );
}
function DetailRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="col-md-10">
      <hr />
      <span className="fw-bold">
        {title} :<span className="text-muted fw-light"> {value}</span>{" "}
      </span>
    </div>
  );
}
function Select({
  options,
  label,
  selectLabel,
  value,
  handleChange,
}: {
  options: string[];
  label: string;
  value: Status | undefined;
  selectLabel: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <label htmlFor="currency" className="form-label">
        {label}
      </label>
      <select
        onChange={handleChange}
        id="country"
        value={value}
        className={`select2  form-select `}
      >
        {options.map((opt: string) => {
          return (
            <option
              key={opt}
              style={{ textTransform: "capitalize" }}
              value={opt}
            >
              {opt}
            </option>
          );
        })}
      </select>
    </>
  );
}
export default Booking;
