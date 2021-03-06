import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { AddCardBody } from "../api/articles/index";
import { storage } from "../api/firebase";

const PostArticles: React.FC = () => {
  const {register, handleSubmit, watch, errors} = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    AddCardBody(data);
  }

  const [image, setImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState("");


  const handleImage = (event: any) => {
    if (event.target.files[0]) {
      let image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setImageUrl(reader.result as string);
      }
      setImage(image)
    } else {
      setImage(null);
    }
  }

  const fileOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (image === null) {
      return;
    }
    const ref = storage.ref();
    const imageRef = ref.child(`test/images/${image.name}`);
    await imageRef.put(image);
    setImage(null);
    setImageUrl("");
    return await imageRef.getDownloadURL();
  };

  const handleOnReset = () => {
    setImage(null);
    setImageUrl("");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="article" defaultValue="input your text" ref={register} />
        <input name="another" defaultValue="input your another" ref={register({required: true})} />
        {errors.another && <span>This filed is required.</span>}
        <input type="submit" />
      </form>

      <div className="File">
        <form onSubmit={fileOnSubmit}>
          <input type="file" onChange={handleImage}/>
          <input type="submit" />
          <button onClick={() => handleOnReset()}>Reset</button>
        </form>
      </div>

      <div className="image-display">
        {imageUrl !== "" ? 
          <img src={imageUrl} width="300px"/>
        : 
          <p>No image</p>
        }
      </div>
    </>
  )
};

export default PostArticles;