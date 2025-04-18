import React from "react";
import { USER } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handlefeed = async (status, id) => {
    try {
      const res = await axios.post(
        `${USER}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(removeFeed(id));
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={photoUrl} alt="User" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handlefeed("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handlefeed("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
