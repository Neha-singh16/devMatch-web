

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { USER } from "../utils/constants";

const ConnectionList = () => {
  // Safely retrieve connections; default to empty array if null/undefined
  const rawConnections = useSelector((store) => store.connection);
  const connections = Array.isArray(rawConnections) ? rawConnections : [];

  // Replace with your actual user slice or auth context
  // const user = { firstName: "Elon", photoUrl: "https://i.pravatar.cc/40?img=5" };
  const dispatch = useDispatch();

  async function fetchConnections() {
    try {
      const response = await axios.get( USER + "/user/connections" , {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
      console.log(response?.data);
      
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Main Content */}
      <main className="flex-grow px-6 py-8">
        <h1 className="text-center text-3xl font-semibold mb-8">Connections</h1>

        {/* Guard against empty or loading state */}
        {connections.length > 0 ? (
          <div className="flex flex-col space-y-4 max-w-xl mx-auto">
            {connections.map((conn, idx) => {
              const { firstName, lastName, photoUrl, age, gender, about } = conn;
              return (
                <div
                  key={idx}
                  className="flex bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-red-50">
                      {firstName + " " + lastName}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {/* {age}, {gender} */} {age && gender && `${age}, ${gender}`}
                    </p>
                    <p className="mt-2 text-gray-300 text-sm">{about}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No connections found.</p>
        )}
      </main>
    </div>
  );
};

export default ConnectionList;

