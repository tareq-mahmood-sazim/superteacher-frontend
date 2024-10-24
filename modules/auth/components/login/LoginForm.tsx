import React from "react";

import Link from "next/link";

import { TextInput, PasswordInput, Button, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import RegistrationModalAsLink from "@/shared/components/Modals/RegistrationModalAsLink";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";

import { loginSchema } from "./helpers/login.validation";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      await login({ email, password }).unwrap();
      showNotification({
        title: "Login Successful",
        message: "You have successfully logged in",
        color: "green",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
      });
    } catch (error) {
      showNotification({
        title: "Login Failed",
        message: "Invalid email or password",
        color: "red",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-full max-w-md p-6 rounded-lg">
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
            <Button type="submit" color="green" disabled={isLoading}>
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
}
