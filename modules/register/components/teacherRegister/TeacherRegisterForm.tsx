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
  MultiSelect,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { teacherFormSchema } from "./helpers/register.validation";
import useTeacherRegistration from "./hooks/submission.hook";

export default function RegisterTeacherForm() {
  const textColor = { color: "green" };
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      profileInput: {
        uniquecode: "",
        firstName: "",
        lastName: "",
        gender: "",
        role: 1,
        highestEducationLevel: "",
        majorSubject: "",
        subjectsToTeach: [],
        major: "",
      },
    },
    validate: zodResolver(teacherFormSchema),
  });

  const { handleSubmit, isCreatingTeacher, attemptsLeft, isDisabled } = useTeacherRegistration();

  return (
    <Container size="md" px="xs" className="p-[20px] rounded-sm mt-[2rem]">
      <Title
        order={2}
        align="center"
        style={{ color: "#5CAA70", marginBottom: "20px" }}
        className="mb-[20px] text-green-500"
      >
        REGISTER AS A TEACHER
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Unique Code"
          placeholder="Unique Code"
          {...form.getInputProps("profileInput.uniquecode")}
          disabled={isDisabled}
          required
          mt="sm"
          styles={{ label: textColor }}
        />
        <div style={{ color: isDisabled ? "red" : "white", marginBottom: "10px" }}>
          {isDisabled ? "No attempts left" : `Attempts remaining: ${attemptsLeft}`}
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 mr-2">
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              {...form.getInputProps("profileInput.firstName")}
              styles={{ label: textColor }}
              required
            />
          </div>
          <div className="w-full md:w-1/3 mr-1">
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              {...form.getInputProps("profileInput.lastName")}
              styles={{ label: textColor }}
              required
            />
          </div>
          <div className="w-full md:w-1/3 md:ml-1">
            <Select
              label="Gender"
              placeholder="Select your gender"
              data={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
                { value: "OTHERS", label: "Others" },
              ]}
              {...form.getInputProps("profileInput.gender")}
              styles={{ label: textColor }}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-2">
          <div className="w-full md:w-1/2">
            <TextInput
              label="Major Subject"
              placeholder="Enter your major subject"
              {...form.getInputProps("profileInput.majorSubject")}
              styles={{ label: textColor }}
              required={false}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Select
              label="Highest Education Level"
              placeholder="Select education level"
              data={[
                { value: "1", label: "Bachelors" },
                { value: "2", label: "Masters" },
              ]}
              {...form.getInputProps("profileInput.highestEducationLevel")}
              styles={{ label: textColor }}
              required
            />
          </div>
        </div>

        <MultiSelect
          label="Subjects to teach"
          placeholder="Select subjects"
          data={["Math", "Physics", "Computer Science", "English"]}
          searchable
          styles={{ label: textColor }}
          {...form.getInputProps("profileInput.subjectsToTeach")}
          required={false}
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
          required
          styles={{ label: textColor }}
        />

        <div className="flex flex-col md:flex-row md:gap-2">
          <div className="w-full md:w-1/2">
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
              required
              styles={{ label: textColor }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              {...form.getInputProps("confirmPassword")}
              required
              styles={{ label: textColor }}
            />
          </div>
        </div>

        <Group position="center" mt="md">
          <Button type="reset" color="gray" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" color="green" disabled={isCreatingTeacher || isDisabled}>
            Submit
          </Button>
        </Group>
      </form>

      <Group position="center" mt="md">
        <div className="text-green-500 text-[14px] text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-slate-400">
            Login
          </Link>
        </div>
      </Group>
    </Container>
  );
}
