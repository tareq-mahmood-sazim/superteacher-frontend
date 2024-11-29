import dayjs from "dayjs";

import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import { IMessageType } from "@/shared/redux/rtk-apis/messages/messages.types";
import { useProfileQuery } from "@/shared/redux/rtk-apis/profiles/profiles.api";

export default function UserMessageDetail({ id, msg }: { id: number; msg: IMessageType }) {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useProfileQuery(id.toString());
  const formattedDate = dayjs(msg.createdAt).fromNow();

  if (userLoading) return <div>Loading user data...</div>;
  if (userError) return <div>Error loading user data.</div>;

  if (userData && msg) {
    return (
      <div className="flex space-x-2 my-2">
        <div className="flex-1">
          <strong className="text-black">
            <span
              className={msg.senderType === EUserRole.TEACHER ? "text-green-600" : "text-black"}
            >
              {userData.userProfile.firstName} {userData.userProfile.lastName}
            </span>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
          </strong>
        </div>
      </div>
    );
  }

  return <p>The messages you send in the classroom shows in here</p>;
}
