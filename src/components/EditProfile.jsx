import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { USER } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    // Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        USER + "/profile/update",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              
              {/* A vertical stack for all form fields */}
              <div className="flex flex-col">
                {/* First Name */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                
                {/* Last Name */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                {/* Photo URL */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL:</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                {/* Age */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                {/* Gender */}
                <label className="form-control w-full max-w-xs my-2 ">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <div className="dropdown dropdown-start">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-outline w-full text-left"
                    >
                      {gender || "Select Gender"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box w-52  p-2 shadow"
                    >
                      <li onClick={() => setGender("Male")}>
                        <a>Male</a>
                      </li>
                      <li onClick={() => setGender("Female")}>
                        <a>Female</a>
                      </li>
                      <li onClick={() => setGender("Other")}>
                        <a>Other</a>
                      </li>
                    </ul>
                  </div>
                </label>

                {/* About */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <textarea
                    value={about}
                    className="textarea textarea-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                    rows={3}
                  />
                </label>
              </div>

              {/* Display an error message if present */}
              {error && (
                <p className="text-red-500 mt-2">
                  {error}
                </p>
              )}

              {/* Save Button */}
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
