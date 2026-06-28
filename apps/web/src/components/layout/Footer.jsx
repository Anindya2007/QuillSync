export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#d8d6ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              QuillSync
            </h2>

            <p className="text-gray-600 mt-2">
              Collaborate. Document. Evolve.
            </p>
          </div>

          <div className="flex gap-8 text-gray-600 font-medium">

            <a
              href="https://github.com/CWAbhi/QuillSync"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 transition"
            >
              GitHub
            </a>

            <a
              href="#"
              className="hover:text-indigo-600 transition"
            >
              Sign Up
            </a>

            <a
              href="#"
              className="hover:text-indigo-600 transition"
            >
              Sign In
            </a>

          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/30 text-center text-sm text-gray-500">
          © 2026 QuillSync Team. All rights reserved.
        </div>

      </div>
    </footer>
  );
}