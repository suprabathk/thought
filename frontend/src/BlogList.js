import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
    return (
        <div className="blog-list mx-80 my-4">
            <h2 className="text-3xl font-semibold mb-4">{title}</h2>
            {blogs.map((blog) => (
                <Link to={`/blogs/${blog.id}`} key={blog.id}>
                    <div className="blog-preivew rounded-md transition-all px-4 py-2 hover:bg-gray-200 flex flex-col justify-between items-start">
                        <h2 className="font-medium">{blog.title}</h2>
                        <p>Written by {blog.author}</p>
                    </div>
                </Link >
            ))}
        </div>
    );
}

export default BlogList;