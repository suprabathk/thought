import BlogList from "./BlogList";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const Home = () => {
    const [blogs, isPending, error] = useFetch("http://localhost:8000/blogs");

    return (
        <div className="home text-white">
            {error && <div>{error}</div>}
            {isPending && <div className="lg:mx-60 md:mx-40 mx-10 my-4">Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="Your blogs" />}
            {!isPending && !error && blogs && blogs.length === 0 &&
                <div className="lg:mx-60 md:mx-40 mx-10 my-8 flex flex-col">
                    <p className="text-xl">You have no blogs currently</p>
                    <Link className="text-purple-600 underline hover:no-underline text-lg" to="/create">Create your first blog</Link>
                </div>
            }
        </div>
    );
}

export default Home;