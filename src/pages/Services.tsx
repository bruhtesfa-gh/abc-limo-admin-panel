import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { deleteService, getServices } from "../api";
import { useInView } from "react-intersection-observer";
import DeleteConfirmationModal from "../components/Menu/DeleteConfirmationModal";
import BlogCard from "../components/Cards/BlogCard";
import { Blog } from "../components/Model/Blog";
import { FullScreenSpinner } from "../components/Spinner";

function Services() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [deleteModalId, setDeleteModalId] = useState<string>();
  const { data, fetchNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery(
      ["services"],
      ({ pageParam = 1 }) => {
        return getServices(pageParam);
      },
      {
        getNextPageParam: (lastPage, pages) => {
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
        mutationFunction={deleteService}
        mutationName="delete-service"
        queryName="services"
        id={deleteModalId}
      />
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Admin /</span> Services
      </h4>
      <ul className="nav nav-pills flex-column flex-md-row mb-3">
        <li className="nav-item">
          <Link to="/service" className="nav-link active">
            <i className="bx bx-plus me-1"></i> Post
          </Link>
        </li>
      </ul>
      <div className="row mb-5">
        {data?.pages.map((blogs: Blog[]) => {
          return blogs.map((blog: Blog) => {
            return (
              <BlogCard
                key={blog.id}
                blog={blog}
                setDeleteModalId={setDeleteModalId}
              />
            );
          });
        })}
      </div>
      {(isFetching || isLoading) && <FullScreenSpinner />}
      <div ref={ref}></div>
    </>
  );
}

export default Services;
