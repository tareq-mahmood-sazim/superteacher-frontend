import React from "react";

import Link from "next/link";

import { TextInput, PasswordInput, Button, Select, Group, Container, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { studentFormSchema } from "./helpers/register.validation";
import useStudentRegistration from "./hooks/submission.hook";

export default function RegisterStudentForm() {
  const { handleSubmit, isCreatingStudent } = useStudentRegistration();
  const textColor = { color: "green" };
  const educationLevelMapping: Record<string, string> = {
    SCHOOL: "1",
    COLLEGE: "2",
    UNIVERSITY: "3",
  };

  const mediumMapping: Record<string, string> = {
    ENGLISH: "1",
    BANGLA: "2",
  };

  const educationLevelOptions = Object.keys(educationLevelMapping).map((key) => ({
    value: educationLevelMapping[key] as string,
    label: key.charAt(0) + key.slice(1).toLowerCase(),
  }));

  const mediumOptions = Object.keys(mediumMapping).map((key) => ({
    value: mediumMapping[key] as string,
    label: key.charAt(0) + key.slice(1).toLowerCase(),
  }));

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      profileInput: {
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        phoneNumber: "",
        educationLevel: "1",
        majorSubject: "",
        medium: "1",
        classLevel: "",
        degree: "",
        semesterOrYear: "",
        role: 2,
      },
    },
    validate: zodResolver(studentFormSchema),
  });

  return (
    <Container size="sm" px="xs" className="p-[20px] rounded-sm mt-[2rem]">
      <Title order={2} align="center" className="text-[#5CAA70] mb-[20px]">
        REGISTER AS A STUDENT
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full mr-4">
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              {...form.getInputProps("profileInput.firstName")}
              styles={{ label: textColor }}
              required
            />
          </div>
          <div className="w-full mr-4">
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              {...form.getInputProps("profileInput.lastName")}
              styles={{ label: textColor }}
              required
            />
          </div>
          <div className="w-full">
            <Select
              label="Gender"
              placeholder="Select your gender"
              data={["MALE", "FEMALE", "OTHERS"]}
              {...form.getInputProps("profileInput.gender")}
              styles={{ label: textColor }}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full md:w-3/5">
            <TextInput
              label="Address"
              placeholder="Enter your address"
              {...form.getInputProps("profileInput.address")}
              required
              styles={{ label: textColor }}
            />
          </div>
          <div className="w-full md:w-2/5">
            <TextInput
              label="Phone number"
              placeholder="Enter your phone number"
              {...form.getInputProps("profileInput.phoneNumber")}
              required
              styles={{ label: textColor }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full">
            <Select
              label="Education level"
              placeholder="Select your education level"
              data={educationLevelOptions}
              {...form.getInputProps("profileInput.educationLevel")}
              required
              styles={{ label: textColor }}
            />
          </div>
          <div className="w-full">
            <Select
              label="Medium"
              placeholder="Select medium"
              data={mediumOptions}
              {...form.getInputProps("profileInput.medium")}
              required
              styles={{ label: textColor }}
            />
          </div>
        </div>

        {form.values.profileInput.educationLevel === "3" && (
          <div className="flex flex-col md:flex-row gap-2">
            <Select
              label="Degree"
              placeholder="Select your degree"
              data={["BACHELORS", "MASTERS"]}
              {...form.getInputProps("profileInput.degree")}
              required
              styles={{ label: textColor }}
            />
            <TextInput
              label="Major Subject"
              placeholder="Type your major subject"
              {...form.getInputProps("profileInput.majorSubject")}
              required
              styles={{ label: textColor }}
            />
          </div>
        )}

        <TextInput
          label="Class"
          placeholder="Select class"
          {...form.getInputProps("profileInput.classLevel")}
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

        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-3/6">
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
              required
              styles={{ label: textColor }}
            />
          </div>
          <div className="w-full md:w-3/6">
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
          <Button type="submit" color="green" disabled={isCreatingStudent}>
            Submit
          </Button>
        </Group>
      </form>

      <Group position="center" mt="md">
        <div style={{ color: "green", fontSize: "14px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "#aaaaaa" }}>
            Login
          </Link>
        </div>
      </Group>
    </Container>
  );
}
