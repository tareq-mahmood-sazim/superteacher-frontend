import { useSelector } from "react-redux";

import { TRootState } from "@/shared/redux/store";

export default function SelfUserDetail({ id }: { id: number }) {
  const userId = useSelector((state: TRootState) => state.authenticatedUser.userId);
  if (userId === id) return <span>(You)</span>;
  else {
    return null;
  }
}
