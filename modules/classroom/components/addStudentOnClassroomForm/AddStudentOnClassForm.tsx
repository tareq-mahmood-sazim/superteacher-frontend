import React, { useState, useEffect } from "react";

import { Loader, MultiSelect, Text } from "@mantine/core";

import { useLazySearchStudentsByNameQuery } from "@/shared/redux/rtk-apis/students/students.api";

interface Option {
  id: string;
  label: string;
}
interface IStudentProfile {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
  };
}

export default function AddStudentOnClassroomForm() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [triggerSearch, { data, isLoading, isError }] = useLazySearchStudentsByNameQuery();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      triggerSearch(debouncedQuery);
    }
  }, [debouncedQuery, triggerSearch]);

  useEffect(() => {
    if (data?.data) {
      setOptions(
        data.data.map((student: IStudentProfile) => ({
          id: student.id.toString(),
          label: `${student.firstName} ${student.lastName}`,
        })),
      );
    }
  }, [data]);

  const selectedLabels = selectedOptions.map((id) => {
    const option = options.find((opt) => opt.id === id);
    return option ? option.label : "";
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <MultiSelect
        data={options.map((option) => ({ value: option.id, label: option.label }))}
        value={selectedOptions}
        onChange={setSelectedOptions}
        searchable
        onSearchChange={(val) => setQuery(val)}
        placeholder="Start typing..."
        nothingFound={isLoading ? <Loader size="xs" /> : "No results found"}
        label="Search and Select Options"
        classNames={{
          input:
            "p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
        }}
      />

      {selectedOptions.length > 0 && (
        <div className="mt-4">
          <Text className="text-sm font-medium text-gray-700 h-[180px]">Selected Options:</Text>
          <div className="flex flex-wrap mt-2">
            {selectedLabels.map((label, idx) => (
              <span
                key={idx}
                className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
              >
                {label}
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
    </div>
  );
}
