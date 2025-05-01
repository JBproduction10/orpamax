"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaFacebook,
  FaGoogle,
  FaKey,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form } from "formik";

// Initial state for form values
const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  success: "",
  error: "",
  login_error: "",
};

// Custom hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

const SignInPageClient = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password, name, email, password, success, error, login_error } = user;
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [activeTab, setActiveTab] = useState<string>("signin");
  const isMobile = useIsMobile();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What is your name?")
      .min(2, "Name must be between 2 and 16 characters.")
      .max(16, "Name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required("You will need this for login and password recovery.")
      .email("Enter a valid email address."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/sign-up", { name, email, password });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: "Something went wrong" });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: login_email,
      password: login_password,
    });
    setLoading(false);
    if (res?.error) {
      setUser({ ...user, login_error: res.error });
    } else {
      router.push(callbackUrl || "/");
    }
  };

  return (
    <div className="min-h-screen pt-42 pb-4 bg-gradient-to-br from-blue-50 to-white flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 flex items-center">
          <button className="rounded-full p-3 hover:bg-gray-100 transition-colors cursor-pointer">
            <FaArrowLeft className="text-gray-500" />
          </button>
          <div className="ml-4">
            <p className="text-gray-800 font-medium">
              We'd be happy to have you onboard!{" "}
              <Link href="/" className="text-blue-500 hover:underline">Go Home</Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          {(activeTab === "signin" || !isMobile) && (
            <div className="w-full md:w-1/2 p-8 md:border-r border-gray-100 flex items-center">
              <div className="max-w-md mx-auto w-full">
                <h1 className="text-4xl font-bold mb-3">Sign in</h1>
                <p className="text-gray-500 mb-8">Access premium Cleaning & Translation services.</p>
                <Formik
                  enableReinitialize
                  initialValues={{ login_email, login_password }}
                  validationSchema={loginValidation}
                  onSubmit={() => signInHandler()}
                >
                  <Form method="post">
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          type="text"
                          name="login_email"
                          placeholder="Email Address"
                          className="pl-10 py-6 bg-gray-50 border-none text-sm"
                          onChange={handleChange}
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <div className="relative">
                        <Input
                          type="password"
                          name="login_password"
                          placeholder="Password"
                          className="pl-10 py-6 bg-gray-50 border-none text-sm"
                          onChange={handleChange}
                        />
                        <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      {login_error && <span className="text-red-700">{login_error}</span>}
                      <Button className="w-full py-6 !rounded-button bg-blue-500 hover:bg-blue-600" type="submit">
                        Sign in <FaArrowRight className="ml-2" />
                      </Button>
                      <div className="text-center">
                        <Link href="/auth/forgot-password" className="text-blue-500 hover:underline text-sm">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                  </Form>
                </Formik>

                <div className="flex items-center my-6">
                  <Separator className="flex-grow" />
                  <span className="px-4 text-sm text-gray-500">Or continue with</span>
                  <Separator className="flex-grow" />
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => signIn("google")}>
                    <FaGoogle className="mr-2" /> Google
                  </Button>
                  <Button variant="outline" onClick={() => signIn("facebook")}>
                    <FaFacebook className="mr-2" /> Facebook
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "signup" || !isMobile) && (
            <div className="w-full md:w-1/2 p-8 flex items-center">
              <div className="max-w-md mx-auto w-full">
                <h1 className="text-4xl font-bold mb-3">Sign up</h1>
                <p className="text-gray-500 mb-8">
                  Get access to one of the best Cleaning & Translation services in the world.
                </p>
                <Formik
                  enableReinitialize
                  initialValues={{ name, email, password }}
                  validationSchema={registerValidation}
                  onSubmit={() => signUpHandler()}
                >
                  <Form>
                    <div className="space-y-4">
                      <div className="relative">
                        <Input type="text" name="name" placeholder="Full Name" onChange={handleChange}
                          className="pl-10 py-6 bg-gray-50 border-none text-sm" />
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <div className="relative">
                        <Input type="text" name="email" placeholder="Email" onChange={handleChange}
                          className="pl-10 py-6 bg-gray-50 border-none text-sm" />
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <div className="relative">
                        <Input type="password" name="password" placeholder="Password" onChange={handleChange}
                          className="pl-10 py-6 bg-gray-50 border-none text-sm" />
                        <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <Button type="submit" className="w-full py-6 !rounded-button bg-blue-500 hover:bg-blue-600">
                        Sign up <FaArrowRight className="ml-2" />
                      </Button>
                      <div className="text-center text-sm text-gray-500 mt-4">
                        By signing up, you agree to our{" "}
                        <Link href="/terms-of-service" className="text-blue-500 hover:underline">Terms</Link> and{" "}
                        <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>
                      </div>
                    </div>
                  </Form>
                </Formik>
                {success && <div className="text-green-600 mt-2">{success}</div>}
                {error && <div className="text-red-600 mt-2">{error}</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden w-full max-w-md mt-6">
        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SignInPageClient;
