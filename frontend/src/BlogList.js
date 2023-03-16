import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
    return (
        <div className="blog-list lg:mx-60 md:mx-40 mx-10 my-4">
            <h2 className="text-4xl font-semibold mb-4">{title}</h2>
            {blogs.map((blog) => (
                <Link to={`/blogs/${blog.id}`} key={blog.id}>
                    <div className="bg-black my-4 border border-gray-600 blog-preivew rounded-md transition-all px-4 py-2 hover:border-gray-200 flex flex-col justify-between items-start">
                        <h2 className="font-medium">{blog.title}</h2>
                        <p>Written by {blog.author}</p>
                    </div>
                </Link >
            ))}
        </div>
    );
}

export default BlogList;