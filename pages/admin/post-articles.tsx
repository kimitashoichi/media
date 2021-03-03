import React from "react";
import { useForm } from "react-hook-form";

import { AddCardBody } from "../api/articles/index";


const PostArticles: React.FC = () => {
  const {register, handleSubmit, watch, errors} = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    AddCardBody(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="article" defaultValue="input your text" ref={register} />
        <input name="another" defaultValue="input your another" ref={register({required: true})} />
        {errors.another && <span>This filed is required.</span>}
        <input type="submit" />
      </form>
    </>
  )
};

export default PostArticles;