import {Link} from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="w-full bg-[#D1D0FA]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-6">

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          QuillSync
        </h1>

        <div className="flex items-center gap-4">

          <Link to="/signin">
            <button className="border border-indigo-400 text-indigo-500 px-6 py-3 rounded-xl hover:bg-indigo-500 hover:text-white transition duration-300">
              Sign In
            </button>
          </Link>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300">
            Get Started
          </button>

        </div>
      </div>
    </nav>
  );
}