import BlogList from "./BlogList";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const Home = () => {
    const [blogs, isPending, error] = useFetch("http://localhost:8000/blogs");

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div className="mx-80 my-4">Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="Your blogs" />}
            {!isPending && !error && blogs && blogs.length === 0 &&
                <div className="mx-80 my-8 flex flex-col">
                    <p className="text-xl">You have no blogs currently</p>
                    <Link className="text-red-600 underline hover:no-underline text-lg" to="/create">Create your first blog</Link>
                </div>
            }
        </div>
    );
}

export default Home;