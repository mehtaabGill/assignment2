import React from 'react'
import Header from '../components/Header'

function About() {
  return (
    <div className="min-h-screen max-w-[1800px] mx-auto">
      <Header />
      <div className="w-full flex flex-col max-w-[50%] mx-auto gap-4">
        <div className="w-full rounded shadow flex flex-col p-4">
          <h2 className='text-xl font-semibold mb-4'>Group Members 💪</h2>
          <ol className='list-decimal mx-4'>
            <li>Mehtaab Gill <a href="mailto:mgill543@mtroyal.ca" className='underline'>{"<mgill543@mtroyal.ca>"}</a></li>
          </ol>
        </div>

        <div className="w-full rounded shadow flex flex-col p-4">
          <h2 className='text-xl font-semibold mb-4'>URLs 🔗</h2>
          <ul className='list-disc mx-4'>
            <li><a href="https://github.com/mehtaabGill/assignment2" target="_blank" className='underline'>GitHub</a></li>
            <li><a href="/login" className='underline'>Login Page</a></li>
          </ul>
        </div>

        <div className="w-full rounded shadow flex flex-col p-4">
          <h2 className='text-xl font-semibold mb-4'>Challenges 🏋️‍♂️</h2>

          <ul className='list-disc mx-4'>
            <li className='py-1'>I opted to not use state management such as Redux or Zustand. While I initially thought this was a good idea, I quickly realized how it could have came in use and would have used it if I had time to start over from scratch.</li>
            <li className='py-1'>The router and navbar was a challenge to configure in regards to checking login status and disabling the favourites tab when it is empty. Perhaps state management could have made this easier as well.</li>
            <li className='py-1'>Since I mainly focus on the backend, it was a bit diffucult for me to image a good UI/UX at times that looks appealing.</li>
          </ul>
        </div>

        <div className="w-full rounded shadow flex flex-col p-4">
          <h2 className='text-xl font-semibold mb-4'>Known Bugs 🐛</h2>

          <ul className='list-disc mx-4'>
            <li className='py-1'>The page needs to be refreshed after adding your first favourite to trigger a state change and allow the favourites tab to be accessed.</li>
            <li className='py-1'>Some images did not exist in the folders so they do not appear in the web app.</li>
            <li className='py-1'>For some pages using the <code className='bg-gray-200'>{"<GenericPaintingList />"}</code>, there can be overflow issues due to variance in screen heights of different devices.</li>
          </ul>
        </div>

        <div className="w-full rounded shadow flex flex-col p-4">
          <h2 className='text-xl font-semibold mb-4'>Positives ✅</h2>

          <ul className='list-disc mx-4'>
            <li className='py-1'>I am a big fan of the <code className='bg-gray-200'>FavouritesManager()</code> class I created. with proper separation of concerns and modularity, this class provides a reasonable alternative to a state manager for the time being.</li>
            <li className='py-1'>While I am not the proudest of the design for a few pages, I am super proud of the login, single painting view, and gallery details section.</li>
            <li className='py-1'>It was a really pleasurable experience using Vite. I would love to try it with TypeScript some time.</li>
            <li className='py-1'>This was my first time using the Supabase React package opposed to a typical backend API. Overall a positive experience for simple apps.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About