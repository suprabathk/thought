import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="Navbar mb-10 py-4 border-b border-gray-600 bg-black">
            <div className="flex justify-between  lg:mx-60 md:mx-40 mx-10 items-center">
                <Link to="/" className="text-2xl font-medium text-purple-500">The Times</Link>
                <div className="flex gap-8 justify-between text-white">
                    <Link className="hover:text-purple-600 hover:border-purple-600 transition-all ease-linear border rounded-md px-3 py-1" to="/">Home</Link>
                    <Link className="hover:text-purple-600 hover:border-purple-600 transition-all ease-linear border rounded-md px-3 py-1" to="/create">New Blog</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;