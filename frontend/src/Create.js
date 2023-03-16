import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Anonymous');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            history.push("/");
        })
    }

    return (
        <div className="create lg:mx-60 md:mx-40 mx-10 my-4 text-white">
            <h2 className="text-3xl font-semibold mb-4">Add a new blog</h2>
            <form className="flex flex-col my-8" onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} required type="text" id="title" className="border bg-black border-gray-600 hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-white " />
                <label htmlFor="author">Author: </label>
                <input value={author} onChange={(e) => { setAuthor(e.target.value) }} required type="text" id="author" className="border bg-black border-gray-600 hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-white " />
                <label htmlFor="body">Blog: </label>
                <textarea value={body} onChange={(e) => { setBody(e.target.value) }} required id="body" className="border bg-black border-gray-600 hover:border-purple-500 focus:border-purple-500 w-full h-40 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-white " />
                {!isPending && <button className="transition-all w-full border border-white hover:border-purple-600 hover:text-purple-600 py-3 rounded-md mt-6">Add blog</button>}
                {isPending && <button disabled className="transition-all w-full border border-purple-400 cursor-not-allowed text-purple-600 py-3 rounded-md mt-6">Adding blog...</button>}
            </form>
        </div>
    );
}

export default Create;