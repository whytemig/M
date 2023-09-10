import React from 'react'

export const SinglePost = ({ post }) => {
    
  return (
    <div className="grid grid-cols-1 ">
      <div className="rounded-md p-2 shadow-2xl ">
        <img
          className="h-56 w-full object-cover"
          src="https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384"
          alt=""
        />

        <div className="flex-1 px-6 py-4 bg-red-600">
          <div class="font-bold text-xl mb-2 ">Card Title</div>
          <p class="text-gray-700  text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla!
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-100">
          <button
            type="button"
            class="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
}
