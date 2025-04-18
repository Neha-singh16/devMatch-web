

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { USER } from "../utils/constants";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${USER}/user/request/received`,
        { withCredentials: true }
      );
      dispatch(addRequest(response.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReview = async (id, action) => {
    try {
      await axios.post(
        `${USER}/request/review/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      // Optimistically remove the request from UI
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-center text-4xl font-bold mb-8">
          Connection Requests
        </h1>

        {requests.length > 0 ? (
          <ul className="space-y-6">
            {requests.map((conn) => {
              const { _id, fromUserId: user } = conn;
              const { firstName, lastName, photoUrl, age, gender, about } = user || {};

              return (
                <li
                  key={_id}
                  className="flex items-center bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-indigo-500"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-sm text-gray-400">
                        {gender}, {age}
                      </p>
                    )}
                    <p className="mt-1 text-gray-300 text-sm italic">
                      {about}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleReview(_id, "accepted")}
                      className="btn btn-sm btn-primary rounded-full px-4"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReview(_id, "rejected")}
                      className="btn btn-sm btn-outline btn-error rounded-full px-4"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-16">
            No connection requests at the moment.
          </p>
        )}
      </main>
    </div>
  );
};

export default Request;
