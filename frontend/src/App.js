import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "./util/validators";
import { useForm } from "./hooks/form-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const App = () => {
  let userId = "Tina";
  const [isLoading, setIsLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  // const history = useHistory();
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    let imgType = formState.inputs.image.value.type;
    //console.log("IMGTYPE=>> ", imgType);
    let rImgType = imgType.slice(imgType.indexOf("/") + 1, imgType.length);
    // console.log("parentPath ", rImgType);
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("image", formState.inputs.image);

    const uploadConfigs = await axios.get(
      "http://localhost:3000/upload/getPresignedUrl/" + userId + "/" + rImgType
    );
    console.log(uploadConfigs.data.url);
    if (uploadConfigs.data.url) {
      const uploadFileNow = await axios
        .put(uploadConfigs.data.url, formState.inputs.image.value, {
          headers: {
            "Content-Type": `image/${imgType}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setIsLoading(false);
          toast.success("Successfully Uploaded Image !!!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          resetValues();
        })
        .catch((error) => {
          toast.error("Failed to Upload Image!! Try Again!! ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
          console.log(error);
        });
    } else {
      setIsLoading(false);
      toast.error("Failed to Upload Image !! Try Again!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const resetValues = () => {
    setIsLoading(false);
  };
  let theForm = (
    <form onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <ImageUpload
        center
        id="image"
        onInput={inputHandler}
        errorText="Pleace provide an image"
      />

      <Button type="submit" disabled={!formState.isValid} size="100%">
        Submit
      </Button>
    </form>
  );
  return (
    <div className="bg">
      <ToastContainer position="top-center" theme="colored" />
      <div className="mform">{isLoading ? <LoadingSpinner /> : theForm}</div>
    </div>
  );
};

export default App;
