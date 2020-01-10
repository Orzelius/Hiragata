import * as React from 'react'

const StylePractice:React.FC = () => {
  return (
    <div className="container">
      <div className="my-4"></div>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Find buddies change text</button>
      <div className="my-4"></div>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert">
        <strong className="font-bold mr-0 sm:mr-2">Alert!</strong>
        <span className="block sm:inline">Please update your pw</span>
      </div>
      {/* <!-- CARD COLUMNS --> */}
    <div className="container mt-5 mx-auto px-2">
      {/* <!-- Flex on med screens and up --> */}
      <div className="md:flex">
        <div
        // flex-1: make them the same size
          className="flex-1 text-gray-700 text-center bg-gray-100 px-5 py-5 m-2 rounded border border-gray-300 hover:border-gray-500"
        >
          {/* lg:flex makes it so the text is side by side on large screens */}
          <div className="lg:flex lg:items-center">
            <div className="lg:flex-shrink-0">
              <img className="rounded-lg lg:w-64" src="https://i.ibb.co/mJJNkTJ/img2.jpg" alt="" />
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <div
                className="uppercase tracking-wide text-sm text-gray-900 font-bold"
              >
                Networking
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight text-gray-800"
                >Finding connections to help your business grow</a
              >
            </div>
          </div>
        </div>
        <div
          className="flex-1 text-gray-700 text-center bg-gray-400 px-5 py-5 m-2 rounded"
        >
          <div className="lg:flex lg:items-center">
            <div className="lg:flex-shrink-0">
              <img className="rounded-lg lg:w-64" src="https://i.ibb.co/w4wGYvQ/img1.jpg" alt="" />
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <div
                className="uppercase tracking-wide text-sm text-indigo-600 font-bold"
              >
                Marketing
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
                >Finding customers for your new business</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default StylePractice;
