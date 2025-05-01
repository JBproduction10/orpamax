"use client";
import React, { useState, useEffect } from "react";
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
import { ClientSafeProvider } from "next-auth/react";
import Link from "next/link";
import { signIn, getSession, getProviders, getCsrfToken } from "next-auth/react";
import axios from "axios";
import Router from "next/router";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useSearchParams,useRouter   } from "next/navigation";

// Initial state for form values
const initialValues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    success: "",
    error: "",
    login_error: ""
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

// Page component using async functions for fetching session and providers
const Page = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialValues);
    // const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
    // const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);
    // const [session, setSession] = useState<any>(null);
  
    const { login_email, login_password, name, email, password, success, error, login_error } = user;
    const router = useRouter();
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    // Fetch session and provider data
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const sessionData = await getSession();
    //         setSession(sessionData);
    //         const csrfTokenData = await getCsrfToken();
    //         setCsrfToken(csrfTokenData);
    //         const providersData = await getProviders();
    //         setProviders(Object.values(providersData || {}));
    //     };
    //     fetchData();
    // }, []);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
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
            .min(2, "First name must be between 2 and 16 characters.")
            .max(16, "First name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
        email: Yup.string()
            .required(
                "You will need this when you log in and if you ever need to reset your password"
            )
            .email("Enter a valid email address."),
        password: Yup.string()
            .required(
                "Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)."
            )
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
    });

    const signUpHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/sign-up", { name, email, password });
            setUser({ ...user, error: "", success: data.message });
            setLoading(false);
            setTimeout(async () => {
                let options = {
                    redirect: false,
                    email: email,
                    password: password,
                };
                const res = await signIn("credentials", options);
                router.push("/");
            }, 2000);
        } catch (error) {
            setLoading(false);
            setUser({ ...user, success: "", error: "Something went wrong" });
        }
    };

    const signInHandler = async () => {
        setLoading(true);
        let options = {
            redirect: false,
            email: login_email,
            password: login_password,
        };
        const res = await signIn("credentials", options);
        setUser({ ...user, success: "", error: "" });
        setLoading(false);
        if (res?.error) {
            setUser({ ...user, login_error: res?.error });
        } else {
            return router.push(callbackUrl || "/");
        }
    };

    const [activeTab, setActiveTab] = useState<string>("signin");
    const isMobile = useIsMobile();

    // if (!csrfToken || !providers.length || session === null) return <div>Loading...</div>;

    return (
        <div className="min-h-screen pt-42 pb-4 bg-gradient-to-br from-blue-50 to-white flex flex-col items-center">
            <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 flex items-center">
                    <button className="rounded-full p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                        <FaArrowLeft className="text-gray-500" />
                    </button>
                    <div className="ml-4">
                        <p className="text-gray-800 font-medium">
                            We'd be happy to have you onboard with us!{" "}
                            <Link href="/" className="text-blue-500 hover:underline cursor-pointer">Go Home</Link>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row min-h-[600px]">
                    {(activeTab === "signin" || !isMobile) && (
                        <div className="w-full md:w-1/2 p-8 md:border-r border-gray-100 flex items-center">
                            <div className="max-w-md mx-auto w-full">
                                <h1 className="text-4xl font-bold mb-3">Sign in</h1>
                                <p className="text-gray-500 mb-8">
                                    Get access to one of the best Cleaning & Translation services in the world.
                                </p>
                                <Formik
                                    enableReinitialize
                                    initialValues={{ login_email, login_password }}
                                    validationSchema={loginValidation}
                                    onSubmit={() => {
                                        signInHandler();
                                    }}
                                >
                                    {(form) => (
                                        <Form method="post" action="/api/auth/sign-in/email">
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
                                                <Button className="w-full py-6 !rounded-button whitespace-nowrap bg-blue-500 hover:bg-blue-600" type="submit">
                                                    Sign in <FaArrowRight className="ml-2" />
                                                </Button>
                                                <div className="text-center">
                                                    <Link href="/auth/forgot-password" className="text-blue-500 hover:underline text-sm">
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <div className="space-y-4">
                                    <div className="flex items-center my-6">
                                        <Separator className="flex-grow" />
                                        <span className="px-4 text-sm text-gray-500">Or continue with</span>
                                        <Separator className="flex-grow" />
                                    </div>
                                    <div className="flex space-x-3">
                                        <div>
                                            <Button
                                                variant="outline"
                                                className="flex-1 !rounded-button whitespace-nowrap"
                                                onClick={() => signIn("google")}
                                            >
                                                <FaGoogle className="mr-2" /> Google
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1 !rounded-button whitespace-nowrap"
                                                onClick={() => signIn("facebook")}
                                            >
                                                <FaFacebook className="mr-2" /> Facebook
                                            </Button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {(activeTab === "signup" || !isMobile) && (
            <div className="w-full md:w-1/2 p-8 flex items-center">
              <div className="max-w-md mx-auto w-full">
                <h1 className="text-4xl font-bold mb-3">Sign up</h1>
                <p className="text-gray-500 mb-8">
                  Get access to one of the best Cleaning & Translation services
                  in the world.
                </p>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name,
                        email,
                        password
                    }}
                    validationSchema={registerValidation}
                    onSubmit={() => {
                        signUpHandler();
                    }}
                >
                    {(form) => (
                        <Form>
                            <div className="space-y-4">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        className="pl-10 py-6 bg-gray-50 border-none text-sm"
                                        onChange={handleChange}
                                    />
                                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        name="email"
                                        placeholder="Email address"
                                        onChange={handleChange}
                                    className="pl-10 py-6 bg-gray-50 border-none text-sm"
                                    />
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="pl-10 py-6 bg-gray-50 border-none text-sm"
                                        onChange={handleChange}
                                    />
                                    <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Confirm Password"
                                        className="pl-10 py-6 bg-gray-50 border-none text-sm"
                                        onChange={handleChange}
                                    />
                                    <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <Button type="submit" className="w-full py-6 !rounded-button whitespace-nowrap bg-blue-500 hover:bg-blue-600">
                                    Sign up
                                    <FaArrowRight className="ml-2" />
                                </Button>
                                <div className="text-center text-sm text-gray-500 mt-4">
                                    By signing up, you agree to our
                                    <Link
                                    href="/terms-of-service"
                                    className="text-blue-500 hover:underline mx-1"
                                    >
                                    Terms of Service
                                    </Link>
                                    and
                                    <Link
                                    href="/privacy-policy"
                                    className="text-blue-500 hover:underline ml-1"
                                    >
                                    Privacy Policy
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div>
                    {success && <span className="text-green-600">{success}</span>}
                </div>
                <div>{error && <span className="text-red-600">{error}</span>}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Tabs only */}
      <div className="md:hidden w-full max-w-md mt-6">
        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="!rounded whitespace-nowrap">
              Sign in
            </TabsTrigger>
            <TabsTrigger value="signup" className="!rounded whitespace-nowrap">
              Sign up
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
