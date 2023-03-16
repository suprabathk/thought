import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="Navbar mb-10">
            <div className="flex justify-between my-4 mx-80 items-center">
                <h2 className="text-lg font-medium text-red-500">Thought</h2>
                <div className="flex gap-8 justify-between">
                    <Link className="hover:text-red-600 transition-all ease-linear" to="/">Home</Link>
                    <Link className="hover:text-red-600 transition-all ease-linear" to="/create">New Blog</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;