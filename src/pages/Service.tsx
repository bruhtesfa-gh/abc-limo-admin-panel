//@ts-nocheck
import { getBlog, postService, updateService } from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogPostSchema, blogUpdateSchema } from "../utils/schema";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { showImagePreview } from "../utils";
import placeHolderImage from "../assets/img/placeholder-image.png";
import { FullScreenSpinner } from "../components/Spinner";
function Service() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    ["service", id],
    () => getBlog(id as string),
    {
      enabled: Boolean(id),
    }
  );
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      blogTitle: "",
      blogImg: "",
      blogContent: "",
    },
    resolver: yupResolver(id ? blogUpdateSchema : blogPostSchema),
  });
  useEffect(() => {
    //THIS IS FOR UPDATE FORM
    setValue("blogTitle", data ? data?.title : "");
    setValue("blogContent", data ? data?.content : "");
  }, [data]);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register("blogImg");
  const postMutation = useMutation("postblog", postService);
  const updateMutation = useMutation("updateblog", updateService);
  if (postMutation.data || updateMutation.data) {
    (async () => {
      await queryClient.refetchQueries("services");
      navigate("/services");
    })();
  }
  useEffect(() => {
    if (fileRef.current) {
      showImagePreview(fileRef.current, imgRef.current!);
    }
  }, [fileRef.current]);
  const onSubmit = (data: any) => {
    const { blogTitle, blogContent, blogImg } = data as {
      blogTitle: string;
      blogContent: string;
      blogImg: FileList;
    };
    if (id) {
      updateMutation.mutate({
        id,
        title: blogTitle,
        content: blogContent,
        img: blogImg[0],
      });
    } else {
      postMutation.mutate({
        title: blogTitle,
        content: blogContent,
        img: blogImg[0],
      });
    }
  };
  if (postMutation.isLoading || updateMutation.isLoading || isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Admin/</span> Service
      </h4>

      {/* <!-- Basic Layout & Basic with Icons --> */}
      <div className="row">
        {/* <!-- Basic with Icons --> */}
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0"></h5>
              <small className="text-muted float-end"> </small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-start align-items-sm-center gap-4">
                  <img
                    style={{ objectFit: "contain" }}
                    src={data ? data.img : placeHolderImage}
                    alt="service image"
                    ref={imgRef}
                    className="d-block rounded"
                    height="100"
                    width="100"
                    id="uploadedAvatar"
                  />
                  <div className="button-wrapper">
                    <label
                      htmlFor="upload"
                      className="btn btn-primary me-2 mb-4"
                      tabIndex={0}
                    >
                      <span className="d-none d-sm-block">
                        Choose Service Image
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
                          errors.blogImg ? "border-danger" : ""
                        }`}
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                        accept="image/*"
                        hidden
                      />
                    </label>
                  </div>
                </div>
                <div className=" mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-icon-default-fullname"
                  >
                    Title
                  </label>

                  <div className="input-group">
                    <div className="input-group input-group-merge">
                      {" "}
                      <input
                        {...register("blogTitle")}
                        type="text"
                        className={`form-control ${
                          errors.blogTitle ? "border-danger" : ""
                        }`}
                        id="basic-icon-default-fullname"
                        placeholder="service title"
                        aria-label="service title"
                        aria-describedby="basic-icon-default-fullname2"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    content
                  </label>
                  <textarea
                    {...register("blogContent")}
                    className={`form-control  ${
                      errors.blogContent ? "border-danger" : ""
                    }`}
                    id="exampleFormControlTextarea1"
                    rows={23}
                    placeholder="service content here...."
                  ></textarea>
                </div>
                <div className="row justify-content-end">
                  <div className="col-sm-3">
                    <button type="submit" className="btn px-5 btn-primary">
                      {id ? "Update" : "Post"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
