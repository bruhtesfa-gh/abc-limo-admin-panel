//@ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import userAvatar from "../assets/img/avatar.png";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api";
import { FullScreenSpinner } from "./Spinner";
function Search() {
  const mutation = useMutation("logout", logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const me = queryClient.getQueriesData("getme");
  async function handleLogout() {
    mutation.mutate();
  }
  if (mutation.isLoading) {
    return <FullScreenSpinner />;
  }
  if (mutation.isSuccess) {
    (async () => {
      await queryClient.refetchQueries("getme");
    })();
  }
  return (
    <nav
      style={{
        position: "sticky",
        top: "0",
      }}
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <button
          onClick={(e) => {
            document.documentElement.classList.toggle("layout-menu-expanded");
          }}
          className="nav-item nav-link px-0 me-xl-4 btn"

        >
          <i className="bx bx-menu bx-sm"></i>
        </button>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        {/* <!-- Search --> */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center"></div>
        </div>
        {/* <!-- /Search --> */}

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* <!-- Place this tag where you want the button to render. --> */}

          {/* <!-- User --> */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <button
              className="nav-link dropdown-toggle hide-arrow btn"
              data-bs-toggle="dropdown"
            >
              <div className="avatar border-dark border-1">
                <img
                  src={me[0][1]["img"] ? me[0][1]["img"] : userAvatar}
                  alt=""
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link to="/account" className="dropdown-item">
                  <i className="bx bx-user me-2"></i>
                  <span className="align-middle">My Profile</span>
                </Link>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <button onClick={handleLogout} className="dropdown-item">
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </button>
              </li>
            </ul>
          </li>
          {/* <!--/ User --> */}
        </ul>
      </div>
    </nav>
  );
}

export default Search;
