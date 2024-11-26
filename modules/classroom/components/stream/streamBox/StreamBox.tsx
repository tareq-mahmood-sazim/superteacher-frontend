import { Button, Textarea } from "@mantine/core";

export default function StreamBox() {
  return (
    <div className="flex-1 space-y-4 bg-white p-4 rounded-lg">
      <Textarea
        placeholder="Announce something to your class"
        size="md"
        autosize
        minRows={3}
        classNames={{
          input: "bg-white text-black placeholder-gray-400",
        }}
      />

      <div className="flex justify-end space-x-2">
        <Button className="bg-black hover:text-black hover:bg-white outline duration-300">
          Reset
        </Button>
        <Button className="bg-black hover:text-black hover:bg-white outline duration-300">
          Post
        </Button>
      </div>

      <div className="bg-white text-center my-8">
        <p className="text-lg font-medium my-8 text-black">
          This is where you share things with the class.
        </p>
      </div>
    </div>
  );
}
