import { Link } from "react-router-dom";
import Input from "../components/input";
import ButtonPrimary from "../components/button";
import { useState } from "react";
import DangerAlert from "../components/dangerAlert";
import axios from "axios";

const Register = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const createAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      if (
        !formValues.firstname ||
        !formValues.lastname ||
        !formValues.email ||
        !formValues.password ||
        !formValues.password_confirm
      ) {
        setErrorMessage("All fields are required!");
        return;
      }

      if (formValues.password !== formValues.password_confirm) {
        setErrorMessage("Passwords do not match!");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        {
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          email: formValues.email,
          password: formValues.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorMessage && <DangerAlert message={errorMessage} />}
        <form method="POST" className="space-y-6" noValidate>
          <Input
            label="Firstname"
            htmlfor="firstname"
            id="firstname"
            name="firstname"
            type="text"
            onChange={(e) =>
              setFormValues({ ...formValues, firstname: e.target.value })
            }
          />
          <Input
            label="Lastname"
            htmlfor="lastname"
            id="lastname"
            name="lastname"
            type="text"
            onChange={(e) =>
              setFormValues({ ...formValues, lastname: e.target.value })
            }
          />
          <Input
            label="Email"
            htmlfor="email"
            id="email"
            name="email"
            type="email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
          <Input
            label="Password"
            htmlfor="password"
            id="password"
            name="password"
            type="password"
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
          <Input
            label="Password confirm"
            htmlfor="password_confirm"
            id="password_confirm"
            name="password_confirm"
            type="password"
            onChange={(e) =>
              setFormValues({ ...formValues, password_confirm: e.target.value })
            }
          />
          <ButtonPrimary
            onClick={createAccount}
            type="submit"
            label="Sign in"
          />
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
