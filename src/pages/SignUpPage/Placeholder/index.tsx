import { useNavigate } from "react-router-dom";

const Placeholder = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate("/");
  };

  return (
    <div className="max-w-md w-full mx-auto text-center font-medium text-l">
      <h1 className="text-xl">You have been successfully signed up!</h1>
      <p>
        Please check your inbox and confirm an email address to be able to sign
        in.
      </p>
      <br />
      <button
        className="bg-blue-600 hover:bg-blue-600 w-full py-2 px-4 rounded-md text-white text-sm"
        onClick={handleClick}
      >
        Go to the Home page
      </button>
    </div>
  );
};

export default Placeholder;
