import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <main className="flex flex-col items-center justify-center w-full h-screen shadow-xl">
    <h1 className="p-3 text-9xl font-extrabold text-white tracking-widest bg-[#1A2238] rounded-lg">
      404
    </h1>
    <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <button type="button" className="mt-5">
      <span className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
        <span className="relative block px-8 py-3 bg-[#1A2238] border rounded-lg">
          <Link to="/">Go Home</Link>
        </span>
      </span>
    </button>
  </main>
)

export default NotFoundPage
