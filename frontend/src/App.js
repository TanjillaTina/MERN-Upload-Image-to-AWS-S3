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
  const [mesg, setMessage] = useState(null);
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
    setIsLoading(true);
    let imgType = formState.inputs.image.value.type;
    let rImgType = imgType.slice(imgType.indexOf("/") + 1, imgType.length);
    // console.log("parentPath ", rImgType);
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("image", formState.inputs.image.value);

    // formData.append("creator", auth.userId);
    // console.log("Inputs==>>> ", formState.inputs.image);
    const uploadConfigs = await axios.get(
      "http://localhost:3000/upload/getPresignedPicUrl/" +
        userId +
        "/" +
        rImgType
    );
    if (uploadConfigs.data.url) {
      const uploadFileNow = await axios.put(
        uploadConfigs.data.url,
        formState.inputs.image.value,
        {
          headers: {
            "Content-Type": imgType,
          },
        }
      );
      console.log("Uploaded Status =>> ", uploadFileNow);
    } else {
      toast.error("Failed to Upload Image !!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }

    /*
    axios
      .get(
        //  process.env.BACKEND_URL +
        "http://localhost:3000/upload/getPresignedPicUrl/" +
          userId +
          "/" +
          rImgType
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        toast.success("Fetched Link!!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("Fetched Link!!!", {
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
      */
  };

  const resetValues = () => {
    setIsLoading(false);
    setMessage(null);
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

      {/* {mesg !== null && <ErrorModal error={mesg} onClear={resetValues} />} */}
      <div className="mform">{isLoading ? <LoadingSpinner /> : theForm}</div>
    </div>
  );
};

export default App;
