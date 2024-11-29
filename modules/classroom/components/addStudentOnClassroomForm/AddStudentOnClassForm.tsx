import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { Loader, MultiSelect, Text, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useAddStudentInClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { IUserProfile } from "@/shared/redux/rtk-apis/profiles/profiles.types";
import { useLazySearchStudentsByNameQuery } from "@/shared/redux/rtk-apis/students/students.api";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

interface Option {
  id: string;
  label: string;
}

export default function AddStudentOnClassroomForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { id } = router.query;
  const classroomId = id as string;

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [triggerSearch, { data, isLoading, isError }] = useLazySearchStudentsByNameQuery();
  const [
    addStudentOnClassroom,
    { data: addedOnClassroom, isLoading: isAddingStudent, isError: isAddingStudentError },
  ] = useAddStudentInClassroomMutation();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 800);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      triggerSearch(debouncedQuery);
    }
  }, [debouncedQuery, triggerSearch]);

  useEffect(() => {
    if (data?.data) {
      const newOptions = data.data.map((student: IUserProfile) => ({
        id: student.id.toString(),
        label: `${student.firstName} ${student.lastName}`,
      }));
      setOptions((prevOptions) => {
        const updatedOptions = [...prevOptions, ...newOptions];
        const uniqueOptions = Array.from(
          new Map(updatedOptions.map((opt) => [opt.id, opt])).values(),
        );
        return uniqueOptions;
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    const parsedSelectedOptions = selectedOptions.map((id) => parseInt(id, 10));
    console.log(parsedSelectedOptions);
    try {
      await addStudentOnClassroom({
        classroomId: parseInt(classroomId, 10),
        studentIds: parsedSelectedOptions,
      }).unwrap();
      setSelectedOptions([]);
      console.log(addedOnClassroom);
      showNotification(NotificationMessage("success", addedOnClassroom?.message ?? ""));
    } catch (error) {
      console.error("Error adding students:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="w-full max-w-md mx-auto pb-12">
        <MultiSelect
          data={options.map((option) => ({ value: option.id, label: option.label }))}
          value={selectedOptions}
          onChange={setSelectedOptions}
          searchable
          onSearchChange={setQuery}
          placeholder="Start typing..."
          nothingFound={isLoading ? <Loader size="xs" /> : "No results found"}
          label="Type a name"
          classNames={{
            label: "text-green-500",
            item: "text-green-500",
            input:
              "p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-green-500",
          }}
        />

        {selectedOptions.length > 0 && (
          <div className="mt-4">
            <Text className="text-sm font-medium text-gray-700">Selected Options:</Text>
            <div className="flex flex-wrap mt-2">
              {selectedOptions.map((id, idx) => (
                <span
                  key={idx}
                  className="bg-green-500 text-white px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {options.find((opt) => opt.id === id)?.label ?? id}
                </span>
              ))}
            </div>
          </div>
        )}

        {isError && (
          <Text color="red" size="sm">
            Error fetching data.
          </Text>
        )}
        {isAddingStudentError && (
          <Text color="red" size="sm">
            Error adding students to the classroom.
          </Text>
        )}

        <div className="flex justify-end flex-row gap-2 mt-4">
          <Button className="mt-4 bg-green-500 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="mt-4 bg-green-500 text-white" loading={isAddingStudent}>
            Enroll
          </Button>
        </div>
      </div>
    </form>
  );
}
