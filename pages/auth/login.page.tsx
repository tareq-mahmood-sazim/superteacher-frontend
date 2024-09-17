import React from "react";

import Link from "next/link";

import { TextInput, PasswordInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

import RegistrationModalAsLink from "@/shared/components/Modals/RegistrationModalAsLink";
const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? null
          : "Password must be stronger",
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Login values:", values);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#141A32]">
      <div className="w-full max-w-md p-6 bg-[#141A32] rounded-lg">
        <h2 className="text-center text-2xl font-semibold text-green-500 mb-6">Login</h2>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            classNames={{ label: "text-green-500" }}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
            classNames={{ label: "text-green-500" }}
            required
          />

          <Group position="center" mt="xl">
            <Button type="submit" color="green">
              Submit
            </Button>
          </Group>

          <div className="flex flex-col items-center mt-6">
            <Link href="/auth/forgotPassword" className="text-green-500">
              Forgot Password?
            </Link>
            <p className="text-green-500 mt-8">
              Don&apos;t have an account? <RegistrationModalAsLink />
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
