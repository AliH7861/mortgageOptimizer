

export const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-8xl font-extrabold mb-4 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-green-500 via-green-400 to-green-300 
          drop-shadow-[0_0_20px_rgba(0,255,100,0.7)]">
          404
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-400">
          Oops! The page you are looking for does not exist.
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold 
          text-green-400 drop-shadow-[0_0_10px_rgba(0,255,100,0.5)]">
          Not Found
        </h2>
      </main>
    </div>
  );
};
