import { Loader } from "@mantine/core";

import { useGetTeacherQuery } from "@/shared/redux/rtk-apis/teachers/teachers.api";

import SelfUserDetail from "../selfUserDetail";

export default function TeacherDetail({ id }: { id: number }) {
  const { data, isLoading, isError } = useGetTeacherQuery(id);
  if (isLoading) return <Loader />;
  if (data) {
    return (
      <div className="flex flex-row justify-between gap-2">
        <p>
          {data.data?.userProfile?.firstName ?? ""} {data.data?.userProfile?.lastName ?? ""}{" "}
          <SelfUserDetail id={id} />
        </p>
        <div className="flex flex-row justify-between gap-2">
          <p>{data.data?.email ?? ""}</p>
        </div>
      </div>
    );
  }
  if (isError) return <p>error</p>;
  else return <p>loading</p>;
}
