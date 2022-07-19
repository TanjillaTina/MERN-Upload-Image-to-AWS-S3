import "./ViewAll.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { BTK_URL } from "../../keys/config";
const ViewAll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/all-para")
      .then(function (response) {
        // handle success
        console.log(response);
        setAllImages(response.data.imagess);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setMessage(
          error.response.data.error || "Something Went Wrong!! Try Again!!"
        );
        setIsLoading(false);
      });
  }, []);
  const hfBody = (
    <div>
      {allImages.map((i) => (
        <div className="card">
          <div className="container">
            <h2>
              <b>{i.title}</b>
            </h2>
          </div>
          <img
            src={`${BTK_URL}${i.imgUrl}`}
            alt={i.title}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
  return (
    <div className="va">
      {isLoading ? <LoadingSpinner /> : ""}
      {!isLoading && allImages.length === 0 ? (
        <h1>No Images Found !!</h1>
      ) : (
        hfBody
      )}
    </div>
  );
};

export default ViewAll;
