import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {

    const { id } = useParams();
    const [blog, isPending, error] = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();
    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: "DELETE"
        }).then(() => {
            history.push("/");
        });
    }

    return (
        <div className="blog-details mx-80 my-4">

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blog && (
                <article>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-lg mb-6">Written by {blog.author}</p>
                        </div>
                        <button onClick={handleDelete} className="transition-all px-4 border border-red-400 hover:bg-red-400 hover:text-white py-1 rounded-md flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Delete blog
                        </button>
                    </div>
                    <div className="my-4">
                        <p>{blog.body}</p>
                    </div>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;