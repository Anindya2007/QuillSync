export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 ">

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
        Collaborate.
        <br />
        Document.
        <br />
        Evolve.
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-gray-600 leading-8">
        A collaborative knowledge platform for teams to create,
        organize and share information.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
          Get Started
        </button>

        <button className="border border-indigo-500 text-indigo-500 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition duration-300">
          Sign In
        </button>
      </div>

    </section>
  );
}