import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "./../../context/AuthContextProvider";
import { Input, Button, Card, SectionContainer } from "../UI";

export default function Login() {
  const navigate = useNavigate();
  const [errorMes, setErrorMes] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const { token, setToken } = useContext(AuthContext);

  const user = {
    email: "",
    password: "",
  };

  async function loginFormUser(values) {
    setIsClicked(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setToken(response.data.token);
      localStorage.setItem("tkn", response.data.token);
      setIsSuccess(response.data.message);
      setErrorMes(null);
      setTimeout(() => navigate("/Products"), 3000);
    } catch (error) {
      setIsSuccess(null);
      setErrorMes(error.response?.data?.message || "An error occurred");
      setTimeout(() => setErrorMes(null), 2000);
    } finally {
      setIsClicked(false);
    }
  }

  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: loginFormUser,
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid Email").required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password can't be more than 12 characters")
        .required("Password is required"),
    }),
  });

  return (
    <SectionContainer title="Sign in" subtitle="Access your account">
      <Card className="max-w-lg mx-auto p-8">
        {errorMes && (
          <div
            className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-4 py-2"
            role="alert"
          >
            {errorMes}
          </div>
        )}
        {isSuccess && (
          <div
            className="mb-4 rounded-md bg-green-50 text-green-700 text-sm px-4 py-2"
            role="alert"
          >
            {isSuccess}
          </div>
        )}
        <form onSubmit={loginFormik.handleSubmit} className="space-y-5">
          <Input
            label="Email"
            name="email"
            id="email"
            type="email"
            value={loginFormik.values.email}
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            error={loginFormik.touched.email && loginFormik.errors.email}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            value={loginFormik.values.password}
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            error={loginFormik.touched.password && loginFormik.errors.password}
            required
          />
          <Button
            type="submit"
            variant="primary"
            loading={isClicked}
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </Card>
    </SectionContainer>
  );
}
