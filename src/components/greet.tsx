import ErrorMessage from "./errorMessage";
import Loader from "./loader";

type GreetProps = {
  name?: string;
};

const Greet = ({ name }: GreetProps) => {
  return (
    <>
      <h1>Good Morning, {name ? name : "User"}</h1>
      <Loader />
      <ErrorMessage />
    </>
  );
};

export default Greet;
