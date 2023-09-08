import { PageWrapper } from "../Assests/Wrappers/index";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <PageWrapper>
      <h1>404 Page Not Found</h1>
      <Link to="/" className="btn">
        Go Back
      </Link>
    </PageWrapper>
  );
};

export default ErrorPage;
