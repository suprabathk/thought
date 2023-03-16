import { useHistory, useParams, Link } from "react-router-dom";
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
        <div className="blog-details lg:mx-60 md:mx-40 mx-10 my-4 text-white">

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blog && (
                <article>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-lg mb-6">Written by {blog.author}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link to={`/blogs/${id}/edit`} className="transition-all px-4 border border-gray-400 hover:border-purple-600 hover:text-purple-600 py-1 rounded-md flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                                Edit blog
                            </Link>
                            <button onClick={handleDelete} className="transition-all px-4 border border-gray-400 hover:border-purple-600 hover:text-purple-600 py-1 rounded-md flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Delete blog
                            </button>
                        </div>

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