import { useQuery } from "react-query";
import { getMe } from "./api";
import Router from "./router/index.routes";
import { FullScreenSpinner } from "./components/Spinner";

function App() {
  const { isError, data, isLoading, error, isSuccess } = useQuery(
    "getme",
    getMe,
    {
      retry: false,
      onSuccess: (data) => { },
      onError(err) {
        // if (err instanceof AxiosError) {
        //   showErrorToast(err.response?.data["message"]);
        // }
      },
    }
  );
  if (isLoading) return <FullScreenSpinner />;
  return (
    <>
      <Router isAuth={isSuccess} />
    </>
  );
}

export default App;
