import { useState } from "react";
import Logo from "../components/Logo";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api";
import { showErrorToast } from "../utils/toast";
import { AxiosError } from "axios";
import { FullScreenSpinner } from "../components/Spinner";

function LoginPage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: "login",
    mutationFn: login,
    onError(error: any, variables: any, context: any) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data["message"]);
      }
    },
    onSuccess: async (data: any, variables: any, context: any) => {
      await queryClient.refetchQueries("getme");
    },
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({ email, password });
  }
  function handlePasswordToggle() {
    setShowPassword(!showPassword);
  }
  if (mutation.isLoading) {
    return <FullScreenSpinner />;
  }
  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          {/* <!-- Register --> */}
          <div className="card">
            <div className="card-body">
              {/* <!-- Logo --> */}
              <Logo />
              {/* <!-- /Logo --> */}
              <h4 className="mb-2">Welcome to Limo Seattle! 👋</h4>
              <p className="mb-4">
                Please sign-in to your account and start the journey with us.
              </p>

              <form
                id="formAuthentication"
                className="mb-3"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email-username"
                    placeholder="Enter your email"
                    autoFocus
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    <span
                      onClick={handlePasswordToggle}
                      className="input-group-text cursor-pointer"
                    >
                      {showPassword ? (
                        <i className="bx bx-show"></i>
                      ) : (
                        <i className="bx bx-hide"></i>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-3"></div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- /Register --> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
