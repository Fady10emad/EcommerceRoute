import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input, Button, Card, SectionContainer } from "../UI";

export default function Register() {
  const nagivate = useNavigate();
  const [ErrorMes, setErrorMes] = useState(null);
  const [isSucsses, setisSucsses] = useState(null);
  const [isClicked, setisClicked] = useState(false);

  const user = {
    name: "",
    phone: "",
    password: "",
    rePassword: "",
    email: "",
  };

  function submitFunction(values) {
    // console.log(values)
    setisClicked(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(function (x) {
        console.log(x.data.message);
        setisSucsses(x.data.message);
        setErrorMes(null);
        setisClicked(false);
        setTimeout(() => {
          nagivate("/login");
        }, 3000);
      })
      .catch(function (x) {
        console.log(x.response.data.message);
        setisSucsses(null);
        setErrorMes(x.response.data.message);
        setisClicked(false);
        setTimeout(() => {
          setErrorMes(null);
        }, 2000);
      });
  }

  const resgisterForm = useFormik({
    initialValues: user,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is Required")
        .min(3, "min must be 3 chars")
        .max(12, "max must be 12 chars"),
      email: yup.string().email("invalid Email"),
      phone: yup
        .string()
        .required("phone req")
        .matches(/^(20)?01[0125][0-9]{8}$/),
      password: yup.string().min(6).max(12).required(),
      rePassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "must match"),
    }),
    onSubmit: submitFunction,
  });

  return (
    <SectionContainer
      title="Create an account"
      subtitle="Join us and start shopping"
    >
      <Card className="max-w-lg mx-auto p-8">
        {ErrorMes && (
          <div
            className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-4 py-2"
            role="alert"
          >
            {ErrorMes}
          </div>
        )}
        {isSucsses && (
          <div
            className="mb-4 rounded-md bg-green-50 text-green-700 text-sm px-4 py-2"
            role="alert"
          >
            {isSucsses}
          </div>
        )}
        <form onSubmit={resgisterForm.handleSubmit} className="space-y-5">
          <Input
            label="Name"
            name="name"
            id="name"
            value={resgisterForm.values.name}
            onBlur={resgisterForm.handleBlur}
            onChange={resgisterForm.handleChange}
            error={resgisterForm.touched.name && resgisterForm.errors.name}
            placeholder="John"
          />
          <Input
            label="Email"
            name="email"
            id="email"
            type="email"
            value={resgisterForm.values.email}
            onBlur={resgisterForm.handleBlur}
            onChange={resgisterForm.handleChange}
            error={resgisterForm.touched.email && resgisterForm.errors.email}
            placeholder="you@example.com"
          />
          <Input
            label="Phone"
            name="phone"
            id="phone"
            type="tel"
            value={resgisterForm.values.phone}
            onBlur={resgisterForm.handleBlur}
            onChange={resgisterForm.handleChange}
            error={resgisterForm.touched.phone && resgisterForm.errors.phone}
            placeholder="010..."
          />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            value={resgisterForm.values.password}
            onBlur={resgisterForm.handleBlur}
            onChange={resgisterForm.handleChange}
            error={
              resgisterForm.touched.password && resgisterForm.errors.password
            }
          />
          <Input
            label="Confirm Password"
            name="rePassword"
            id="rePassword"
            type="password"
            value={resgisterForm.values.rePassword}
            onBlur={resgisterForm.handleBlur}
            onChange={resgisterForm.handleChange}
            error={
              resgisterForm.touched.rePassword &&
              resgisterForm.errors.rePassword
            }
          />
          <Button
            type="submit"
            variant="primary"
            loading={isClicked}
            className="w-full"
          >
            Create account
          </Button>
        </form>
      </Card>
    </SectionContainer>
  );
}
