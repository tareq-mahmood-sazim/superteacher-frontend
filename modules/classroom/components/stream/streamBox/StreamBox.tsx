import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Button, Card, Loader, Textarea } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";

import UserMessageDetail from "@/modules/classroom/components/stream/userMessageDetail";
import { useWebsocket } from "@/shared/hooks/useWebsocket";
import { useGetMessagesQuery } from "@/shared/redux/rtk-apis/messages/messages.api";
import type { IMessageType } from "@/shared/redux/rtk-apis/messages/messages.types";
import { TRootState } from "@/shared/redux/store";

dayjs.extend(relativeTime);

export default function StreamBox() {
  const router = useRouter();
  const classroomId = router.query["id"] as string;
  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);

  const {
    data: classroomMessages,
    isLoading: classroomMessagesLoading,
    isError: classroomMessagesError,
  } = useGetMessagesQuery(classroomId);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessageType[]>([]);

  const socket = useWebsocket({
    path: "/",
    shouldAuthenticate: true,
    autoConnect: true,
  });

  useEffect(() => {
    if (classroomMessages) {
      const sortedMessages = [...classroomMessages].sort(
        (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
      );
      setMessages(sortedMessages);
    }

    if (socket) {
      socket.on("PONG", (data: Omit<IMessageType, "sender">) => {
        if (data.classroomId === classroomId) {
          setMessages((prevMessages) => [{ ...(data as IMessageType) }, ...prevMessages]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("PONG");
      }
    };
  }, [socket, classroomId, classroomMessages]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("PING", { content: message, classroomId, senderType: claim });
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

      {classroomMessagesLoading ? (
        <Loader color="green" />
      ) : classroomMessagesError ? (
        <div>Error loading messages. Please try again.</div>
      ) : (
        <div className="p-4 rounded-lg space-y-2">
          {messages.map((msg, index) => (
            <Card className="h-32 my-8 shadow-lg" key={index}>
              <UserMessageDetail id={msg.sender} msg={msg} />
              <span className="text-black"> {msg.content}</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
