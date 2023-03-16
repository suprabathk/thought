import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found mx-80 my-40">
            <h1 className="text-4xl text-red-500">404</h1>
            <p className="mb-10">We looked far...<br />We didn't the page you're looking for!</p>
            <Link className="text-red-500 underline" to="/">Back to Homepage</Link>
        </div>
    );
}

export default NotFound;