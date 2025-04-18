import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux"; 
import { addFeed } from "../utils/feedSlice"; 
import { USER } from "../utils/constants"; 
import axios from "axios";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      // If feed is already populated, no need to fetch again
      if (feed && feed.length > 0) return;

      const response = await fetch(
        USER + "/user/feed",
        { credentials: "include" } // Note: use "credentials" for fetch
      );

      // Assuming you parse JSON from the response:
      const data = await response.json();

      // Dispatch the feed data to the store
      dispatch(addFeed(data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);  // Empty dependency array ensures this runs on mount

  return (
    <>
      {feed && feed.length > 0 ? (
        <div className="flex justify-center mt-10">
          <UserCard user={feed[0]} />
        </div>
      ) : (
        <div className="flex justify-center mt-10 text-2xl">
          <p>No new users found!!</p>
        </div>
      )}
    </>
  );
};

export default Feed;
