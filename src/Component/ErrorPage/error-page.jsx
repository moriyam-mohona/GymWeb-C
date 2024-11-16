import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="text-xl font-out text-white flex justify-center items-center min-h-screen w-full"
    >
      <div className="bg-footer-bg flex flex-col justify-center items-center min-h-screen bg-cover w-full">
        <h1 className="font-orbitron font-bold mb-5 text-3xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-2xl">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
