"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SignInForm from "../_components/signInForm";

export default function page() {
  const router = useRouter();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) {
    event.preventDefault();

    let headersList = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmdyYW1qaXRkdXR0YUBnbWFpbC5jb20iLCJpZCI6IjU1ODVhOGM3LTE2MDEtNGVkZC1iMThjLTFlNDBjYjhhYThjNCJ9.QqFryE7jWJMibGijl_CpFevvKajYJBipyDyQKPgGFHo",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: "sangramjitdutta@gmail.com",
      password: "notasecurepassword",
    });

    let reqOptions = {
      url: "https://my-app.blogen.workers.dev/api/user/signin",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
  }
  return <SignInForm handleSubmit={handleSubmit} />;
}
