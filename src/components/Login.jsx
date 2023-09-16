import React, { useState } from "react";
import axios from "axios"; // You may need to install axios if not already installed.

const Login = () => {
  // Initialize state variables for form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    
    try {
      // Send a POST request with formData to your backend server
      const response = await axios.post("http://localhost:8080/signin", formData);

      // Handle the response as needed (e.g., user authentication)
      console.log("Response:", response);

      // Clear the form after submission
      setFormData({ email: "", password: "" });
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Error:", error);
    }
  };

  return (
    <section className="relative isolate w-full min-h-[100vh] bg-slate-200 text-blue-500 dark:bg-neutral-900 dark:text-neutral-100 py-[50px]">
      <div className="max-w-[400px] flex flex-col px-[20px] py-[40px] mx-auto my-auto rounded-md shadow bg-slate-300 dark:bg-neutral-700">
        <h1 className="font-bold text-2xl ml-2.5 mb-[30px]">Welcome back!</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingPassword"
              placeholder="Password"
            />
            <label
              htmlFor="floatingPassword"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] px-3 py-3 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Password
            </label>
          </div>
          <div className="mt-[20px]">
            <button
              type="submit"
              className="inline-block rounded-md max-w-[120px] bg-blue-100/30 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-blue-500/70 focus:ring-0 active:bg-blue-500/30"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
