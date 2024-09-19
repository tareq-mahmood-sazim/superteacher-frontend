import React from "react";

import {
  TextInput,
  PasswordInput,
  Button,
  Select,
  Group,
  Container,
  Title,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { useCreateStudentMutation } from "@/shared/redux/rtk-apis/students/students.api";

export default function RegisterStudentForm() {
  const [createStudent, { isLoading: isCreatingStudent }] = useCreateStudentMutation();
  const textColor = { color: "green" };
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
      phoneNumber: "",
      educationLevel: "School",
      medium: "",
      class: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: (value) => (value ? null : "First name is required"),
      lastName: (value) => (value ? null : "Last name is required"),
      gender: (value) => (value ? null : "Gender is required"),
      address: (value) => (value ? null : "Address is required"),
      phoneNumber: (value) =>
        /^\d+$/.test(value) ? null : "Phone number is required and should be digits only",
      medium: (value) => (value ? null : "Medium is required"),
      class: (value) => (value ? null : "Class is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password must have at least 6 characters"),
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });
  const handleSubmit = async (values: typeof form.values) => {
    try {
      // Call the RTK mutation
      const response = await createStudent(values).unwrap();

      // Show success notification
      showNotification({
        title: "Success",
        message: response?.message ?? "Teacher registered successfully",
        color: "green",
      });

      console.log("Teacher created:", response);
    } catch (error) {
      // Show error notification
      showNotification({
        title: "Error",
        message: "Failed to register the teacher.",
        color: "red",
      });

      console.error("Error registering teacher:", error);
    }
  };

  return (
    <Container
      size="sm"
      px="xs"
      style={{ padding: "20px", borderRadius: "8px", marginTop: "2rem" }}
    >
      <Title order={2} align="center" style={{ color: "#5CAA70", marginBottom: "20px" }}>
        REGISTER AS A STUDENT
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter="sm" align="center">
          <Grid.Col span={4}>
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              {...form.getInputProps("firstName")}
              styles={{ label: textColor }}
              required
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              {...form.getInputProps("lastName")}
              styles={{ label: textColor }}
              required
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Gender"
              placeholder="Select your gender"
              data={["Male", "Female", "Other"]}
              {...form.getInputProps("gender")}
              styles={{ label: textColor }}
              required
            />
          </Grid.Col>
        </Grid>
        <Grid gutter="sm">
          <Grid.Col span={8}>
            <TextInput
              label="Address"
              placeholder="Enter your address"
              {...form.getInputProps("address")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Phone number"
              placeholder="Enter your phone number"
              {...form.getInputProps("phoneNumber")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter="sm">
          <Grid.Col span={6}>
            <Select
              label="Education level"
              data={["School", "College", "University"]}
              {...form.getInputProps("educationLevel")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="English/Bangla Medium"
              placeholder="Select medium"
              data={["English", "Bangla"]}
              {...form.getInputProps("medium")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
        </Grid>

        <TextInput
          label="Class"
          placeholder="Select class"
          {...form.getInputProps("class")}
          required
          mt="sm"
          styles={{ label: textColor }}
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
          required
          mt="sm"
          styles={{ label: textColor }}
        />

        <Grid gutter="sm">
          <Grid.Col span={6}>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              {...form.getInputProps("confirmPassword")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
        </Grid>

        <Group position="center" mt="md">
          <Button type="reset" color="gray" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" color="green" disabled={isCreatingStudent}>
            Submit
          </Button>
        </Group>
      </form>

      <Group position="center" mt="md">
        <div style={{ color: "green", fontSize: "14px", textAlign: "center" }}>
          Already have an account?{" "}
          <a href="/auth/login" style={{ color: "#aaaaaa" }}>
            Login
          </a>
        </div>
      </Group>
    </Container>
  );
}
