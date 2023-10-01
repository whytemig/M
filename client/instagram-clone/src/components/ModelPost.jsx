import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      let filename = null;

      if (photo) {
        const formData = new FormData();
        filename = photo.name;
        formData.append("filename", filename);
        formData.append("image", photo);

        await fetch(`http://localhost:5500/upload/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        });
      }

      const res = await fetch(`http://localhost:5500/post/create`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ ...state, photo: filename }),
      });
      const data = await res.json();

      setShowModal(false);

      window.location.reload();
      toast.success("Post!!");
    } catch (error) {
      console.error(error);
      toast.warning(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mx-auto max-w-[1240px] ">
        <button
          className="bg-transparent text-black border-2 
          font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-50 ease-linear transition-all duration-150 w-15"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Post
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Post Your Adventures
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleCreatePost}>
                    <div className="mb-6">
                      <label
                        htmlFor="desc"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        id="desc"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Post your mind...."
                        name="desc"
                        onChange={handleState}
                      />

                      <label
                        htmlFor="location"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="desc"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Where?"
                        name="location"
                        onChange={handleState}
                      />

                      <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Upload
                      </label>

                      <input
                        type="file"
                        id="image"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Post your mind...."
                        name="image"
                        onChange={(e) => {
                          setPhoto(e.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:focus:ring-blue-800 "
                        // onClick={()=> setTimeout(toast.success("Post!!"),5000)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none m-auto ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <ToastContainer />
    </>
  );
}
