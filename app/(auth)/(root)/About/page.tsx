export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            About Court Connect
          </h1>
          <p className="text-gray-500 text-lg">
            Bringing order to the chaos of local courts.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Creating a game post is easy! Head over to the{" "}
            <a
              href="/Create"
              className="text-indigo-600 font-medium underline hover:text-indigo-800 transition-colors"
            >
              Create
            </a>{" "}
            page and fill in the necessary details. Let us know how many players
            you have and how many are needed so that others can plan
            accordingly.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Once a game post is made, everyone can view it and see the scheduled
            time and location for the game, ensuring that you’re always in the
            loop.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to organize the chaos of the courts by connecting
            players and ensuring that you never end up at an empty court. We’re
            here to make it simple and efficient for you to find games, know
            where they are being played, and join in on the fun.
          </p>
        </section>
      </div>
      </div>  
      );
}
