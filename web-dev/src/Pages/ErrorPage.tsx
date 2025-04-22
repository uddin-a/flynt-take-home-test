import { useRouteError } from "react-router-dom";

export function ErrorPage(): JSX.Element {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i></i>
      </p>
    </div>
  );
}
