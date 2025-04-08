import React from 'react'

function Login() {
  const fakeLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.replace('/galleries')
  }

  if (localStorage.getItem('isLoggedIn') === 'true') {
    if (confirm('You are already logged in. Click OK to redirect or Cancel to logout.'))
      fakeLogin();
    else
      localStorage.removeItem('isLoggedIn')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: 'url(/abstract.jpg)' }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">
        Gallery Archive
      </h1>

      <div className="bg-white/90 rounded-md shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between pt-4 space-x-2">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
              onClick={fakeLogin}
            >
              Login
            </button>
            <button
              className="w-full text-center bg-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-400 transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <p className="mt-10 text-white italic text-sm drop-shadow">
        Hero image credit
      </p>
    </div>
  )
}

export default Login;