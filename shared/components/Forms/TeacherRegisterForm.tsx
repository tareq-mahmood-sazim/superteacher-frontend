import React from "react";

import Link from "next/link";

import {
  TextInput,
  PasswordInput,
  Button,
  Select,
  Group,
  Container,
  Title,
  Grid,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function RegisterTeacherForm() {
  const textColor = { color: "green" };
  const [attemptsLeft, setAttemptsLeft] = React.useState<number>(3);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const form = useForm({
    initialValues: {
      uniqueCode: "",
      firstName: "",
      lastName: "",
      gender: "",
      highestEducationLevel: "School",
      majorsubject: "",
      subjectsToTeach: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      uniqueCode: (value) => {
        if (!value) {
          return "Unique Code is required";
        }
        if (value !== "expectedCode") {
          setAttemptsLeft((prev: number): number => prev - 1);
          if (attemptsLeft - 1 <= 0) {
            setIsDisabled(true);
          }
          return "Invalid Unique Code";
        }
        return null;
      },
      firstName: (value) => (value ? null : "First name is required"),
      lastName: (value) => (value ? null : "Last name is required"),
      gender: (value) => (value ? null : "Gender is required"),
      majorsubject: (value) => (value ? null : "Major subject is required"),
      highestEducationLevel: (value) => (value ? null : "Highest education level is required"),
      subjectsToTeach: (value) => (value ? null : "Subjects to teach is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password must have at least 6 characters"),
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  return (
    <Container
      size="md"
      px="xs"
      style={{ padding: "20px", borderRadius: "8px", marginTop: "2rem" }}
    >
      <Title order={2} align="center" style={{ color: "#5CAA70", marginBottom: "20px" }}>
        REGISTER AS A TEACHER
      </Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Unique Code"
          placeholder="Unique Code"
          {...form.getInputProps("uniqueCode")}
          disabled={isDisabled}
          required
          mt="sm"
          styles={{ label: textColor }}
        />
        <div style={{ color: isDisabled ? "red" : "white", marginBottom: "10px" }}>
          {isDisabled ? "No attempts left" : `Attempts remaining: ${attemptsLeft}`}
        </div>
        <Grid gutter="md" align="center">
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
          <Grid.Col span={6}>
            <TextInput
              label="Major Subject"
              {...form.getInputProps("majorsubject")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Highest Education Level"
              placeholder="Education..."
              data={["Diploma", "Honors", "M.Phil", "Masters", "PhD"]}
              {...form.getInputProps("highestEducationLevel")}
              required
              styles={{ label: textColor }}
            />
          </Grid.Col>
        </Grid>

        <MultiSelect
          label="Subjects to teach"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte", "Math", "Science", "English", "Physics"]}
          searchable
          styles={{ label: textColor }}
          {...form.getInputProps("subjectsToTeach")}
          required
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
          <Button type="submit" color="green">
            Submit
          </Button>
        </Group>
      </form>

      <Group position="center" mt="md">
        <div className="text-green-500 text-[14px] text-center">
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "#aaaaaa" }}>
            Login
          </Link>
        </div>
      </Group>
    </Container>
  );
}
