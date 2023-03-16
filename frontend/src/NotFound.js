import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found lg:mx-60 md:mx-40 mx-10 my-40 text-white">
            <h1 className="text-6xl text-purple-500">404</h1>
            <p className="mb-10">We looked far...<br />We didn't the page you're looking for!</p>
            <Link className="text-purple-500 underline text-2xl" to="/">Back to Homepage</Link>
        </div>
    );
}

export default NotFound;