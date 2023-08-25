//@ts-nocheck
import { Controller, useForm } from "react-hook-form";
import placeHolderImage from "../assets/img/placeholder-image.png";
import Select from "../components/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { getVehicle, postVehicle, updateVehicle } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useRef } from "react";
import { showImagePreview } from "../utils";
import { vehiclePostSchema, vehicleUpdateSchema } from "../utils/schema";
import { FullScreenSpinner } from "../components/Spinner";
const vechielType = ["SUV", "SEDAN", "VAN", "BUS"];
function Vehicle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    ["vehicle", id],
    () => getVehicle(id as string),
    {
      enabled: Boolean(id),
    }
  );
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      model: "",
      description: "",
      speed: "",
      type: "",
      pricePerDay: "",
      passengerSize: "",
      img: "",
    },
    resolver: yupResolver(id ? vehicleUpdateSchema : vehiclePostSchema),
  });
  useEffect(() => {
    //THIS IS FOR UPDATE FORM
    if (data) {
      setValue("name", data ? data?.name : "");
      setValue("description", data ? data?.description : "");
      setValue("type", data ? data?.type : "");
      setValue("pricePerDay", data ? data?.pricePerDay : "");
      setValue("passengerSize", data ? data?.passengerSize : "");
    }
  }, [data]);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register("img");
  const postMutation = useMutation("postvechile", postVehicle);
  const updateMutation = useMutation("updatevehicle", updateVehicle);
  if (postMutation.data || updateMutation.data) {
    (async () => {
      await queryClient.refetchQueries("vehicles");
      navigate("/vehicles");
    })();
  }
  useEffect(() => {
    if (fileRef.current) {
      showImagePreview(fileRef.current, imgRef.current!);
    }
  }, [fileRef.current]);
  const onSubmit = (data: any) => {
    const { name, description, type, pricePerDay, passengerSize, img } =
      data as {
        name: string;
        description: string;
        type: string;
        pricePerDay: string;
        passengerSize: string;
        img: FileList;
      };
    if (id) {
      updateMutation.mutate({
        id,
        name,
        description,
        type,
        pricePerDay,
        passengerSize,
        img: img[0],
      });
    } else {
      postMutation.mutate({
        name,
        description,
        type,
        pricePerDay,
        passengerSize,
        img: img[0],
      });
    }
  };
  if (postMutation.isLoading || updateMutation.isLoading || isLoading) {
    return <FullScreenSpinner />;
  }
  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Admin/</span> Vehicle
      </h4>

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            {/* <!-- Account --> */}

            <hr className="my-0" />
            <div className="card-body">
              <form
                id="formAccountSettings"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="card-body">
                  <div className="d-flex align-items-start align-items-sm-center gap-4">
                    <img
                      style={{ objectFit: "contain" }}
                      src={data ? data.img : placeHolderImage}
                      alt="blog image"
                      ref={imgRef}
                      className="d-block rounded"
                      height="100"
                      width="100"
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        htmlFor="upload"
                        className={`btn ${
                          errors.img ? "btn-danger" : "btn-primary"
                        }  me-2 mb-4`}
                        tabIndex={0}
                      >
                        <span className="d-none d-sm-block">
                          Choose Vehicle Image
                        </span>
                        <i className="bx bx-upload d-block d-sm-none"></i>
                        <input
                          id="upload"
                          type="file"
                          {...rest}
                          ref={(iref) => {
                            ref(iref);
                            fileRef.current = iref;
                          }}
                          // ref={fileRef}
                          className={`form-control ${
                            errors.img ? "border-danger" : ""
                          }`}
                          aria-describedby="inputGroupFileAddon04"
                          aria-label="Upload"
                          accept="image/*"
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Vehicle Name
                    </label>
                    <input
                      className={`form-control ${
                        errors.name ? "border-danger" : ""
                      }`}
                      type="text"
                      id="name"
                      {...register("name")}
                      name="name"
                      placeholder="enter vehicle name"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Type"
                          error={errors.type}
                          selectLabel="Select Type"
                          options={vechielType}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="costPerday" className="form-label">
                      Hourly Rate
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.pricePerDay ? "border-danger" : ""
                      }`}
                      {...register("pricePerDay")}
                      id="costPerday"
                      placeholder="231$"
                      maxLength={6}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="passengerSize" className="form-label">
                      Passenger size
                    </label>
                    <input
                      type="text"
                      {...register("passengerSize")}
                      className={`form-control ${
                        errors.passengerSize ? "border-danger" : ""
                      }`}
                      id="passengerSize"
                      placeholder="20"
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className={`form-control ${
                      errors.description ? "border-danger" : ""
                    }`}
                    id="exampleFormControlTextarea1"
                    rows={5}
                    placeholder="vehicle description here...."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <button type="submit" className="btn btn-primary me-2">
                    {id ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
            {/* <!-- /Account --> */}
          </div>
        </div>
      </div>
    </>
  );
}
function CheckBox({ id, label, ...rest }: { id: string; label: string }) {
  return (
    <div className="form-check mt-3">
      <input
        {...rest}
        className="form-check-input"
        type="checkbox"
        value=""
        id={id}
      />
      <label className="form-check-label" htmlFor={id}>
        {" "}
        {label}{" "}
      </label>
    </div>
  );
}
export default Vehicle;
