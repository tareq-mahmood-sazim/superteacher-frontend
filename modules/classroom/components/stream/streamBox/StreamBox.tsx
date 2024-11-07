import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Button, Card, Textarea } from "@mantine/core";
import { useSelector } from "react-redux";

import { useWebsocket } from "@/shared/hooks/useWebsocket";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import { useProfileQuery } from "@/shared/redux/rtk-apis/profiles/profiles.api";
import { TRootState } from "@/shared/redux/store";

type MessageData = {
  content: string;
  classroomId: string;
  senderType: EUserRole;
  userId: number;
  sender: number;
  createdAt: string;
};

export default function StreamBox() {
  const router = useRouter();
  const classroomId = router.query["id"] as string;
  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);

  const socket = useWebsocket({
    path: "/",
    shouldAuthenticate: true,
    autoConnect: true,
  });

  useEffect(() => {
    if (socket) {
      socket.on("PONG", (data: Omit<MessageData, "sender">) => {
        console.log("Message received from server:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...data,
            sender: 0,
          },
        ]);
      });
    }

    return () => {
      if (socket) {
        socket.off("PONG");
      }
    };
  }, [socket, claim]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("PING", { content: message, classroomId, senderType: claim });
      console.log("Message sent:", { content: message, classroomId });
      setMessage("");
    }
  };

  return (
    <div className="flex-1 space-y-4 bg-white p-4 rounded-lg">
      <Textarea
        placeholder="Announce something to your class"
        size="md"
        autosize
        minRows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        classNames={{
          input: "bg-white text-black placeholder-gray-400",
        }}
      />
      <div className="flex justify-end space-x-2">
        <Button
          onClick={() => setMessage("")}
          className="bg-black hover:text-black hover:bg-white outline duration-300"
        >
          Reset
        </Button>
        <Button
          onClick={sendMessage}
          className="bg-black hover:text-black hover:bg-white outline duration-300"
        >
          Post
        </Button>
      </div>

      <div className=" p-4 rounded-lg space-y-2">
        {messages.map((msg, index) => (
          <Card className="h-32 my-8 shadow-lg" key={index}>
            <UserMessageDetail id={msg.userId} msg={msg} />
            <span className="text-black"> {msg.content}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
function UserMessageDetail({ id, msg }: { id: number; msg: MessageData }) {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useProfileQuery(id.toString());
  console.log(userData, "map this");
  if (userData && msg) {
    return (
      <div className="flex space-x-2 my-2">
        <div className="flex-1">
          <strong className="text-black">
            {msg.senderType === EUserRole.TEACHER ? (
              <span className="text-green-600">
                {userData.userProfile.firstName} {userData.userProfile.lastName}
              </span>
            ) : (
              <span className="text-black">
                {userData.userProfile.firstName} {userData.userProfile.lastName}
              </span>
            )}
          </strong>
        </div>
      </div>
    );
  }
  if (userLoading) {
    return <div>Loading...</div>;
  }
  if (userError) {
    return <div>Error...</div>;
  }
  return null;
}
