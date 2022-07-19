//home
import "./home.css";
import React, { useState } from "react";
import axios from "axios";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
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
  const resetValues = () => {
    setIsLoading(false);
  };
  const showErrorMessage = (errorMessage) => {
    toast.error(`${errorMessage} Try Again!!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setIsLoading(false);
  };
  // const history = useHistory();
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    let imgType = formState.inputs.image.value.type;
    let rImgType = imgType.slice(imgType.indexOf("/") + 1, imgType.length);

    const uploadConfigs = await axios.get(
      "http://localhost:3000/upload/getPresignedUrl/" + userId + "/" + rImgType
    );
    // console.log(uploadConfigs.data.url);
    if (uploadConfigs.data.url) {
      const uploadFileNow = await axios
        .put(uploadConfigs.data.url, formState.inputs.image.value, {
          headers: {
            "Content-Type": `image/${imgType}`,
          },
        })
        .then((response) => {
          axios
            .post("http://localhost:3000/save-para", {
              imgUrl: uploadConfigs.data.key,
              title: formState.inputs.title.value,
            })
            .then((response) => {
              setIsLoading(false);
              toast.success(
                "Successfully Added Paragraph and Uploaded Image !!!",
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              resetValues();
            })
            .catch((error) => {
              showErrorMessage("Failed to Add Paragraph and Image!! ");
            });
        })
        .catch((error) => {
          showErrorMessage("Failed to Add Paragraph and Image!! ");
        });
    } else {
      showErrorMessage("Failed to Upload Image!! ");
    }
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
    <React.Fragment>
      <ToastContainer position="top-center" theme="colored" />
      <div className="mform">{isLoading ? <LoadingSpinner /> : theForm}</div>
    </React.Fragment>
  );
};

export default Home;
