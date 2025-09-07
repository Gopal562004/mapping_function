import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        🚀 Welcome to Our App
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-xl">
        Discover powerful features and an intuitive dashboard to manage your
        work efficiently.
      </p>
      <p className="text-lg text-gray-400 text-center max-w-xl mt-2">
        Navigate through the app to explore Gemini insights, powerful features,
        and more.
      </p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-8">
        <a
          href="/feature"
          className="bg-white text-black hover:bg-gray-300 transition rounded-lg px-6 py-3 font-semibold shadow-lg text-center"
        >
          🔧 Go to Feature
        </a>
        <a
          href="/dashboard"
          className="bg-white text-black hover:bg-gray-300 transition rounded-lg px-6 py-3 font-semibold shadow-lg text-center"
        >
          📊 Go to Dashboard
        </a>
        <a
          href="/gemini_res"
          className="bg-white text-black hover:bg-gray-300 transition rounded-lg px-6 py-3 font-semibold shadow-lg text-center"
        >
          🤖 Go to Gemini Response
        </a>
      </div>

      <footer className="mt-12 text-gray-500 text-sm">
        © 2025 Your App Name. All rights reserved.
      </footer>
    </div>
  );
};

export default page;
