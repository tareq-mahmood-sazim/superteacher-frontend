import { Modal, Button, Container, Card, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GoDownload } from "react-icons/go";

import { useGetStudentQuery } from "@/shared/redux/rtk-apis/students/students.api";

type TSubmissionProps = {
  attachment: string[];
  createdAt: string;
  id: number;
  isLate: boolean;
  materials: number;
  submittedAt: string;
  updatedAt: string;
  userProfile: number;
};

export default function GetSubmissions({ list }: { list: TSubmissionProps[] }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <SubmissionList list={list} />
      </Modal>

      <Button
        onClick={open}
        className="bg-white border-2 border-black text-black hover:bg-black hover:text-white duration-300"
      >
        Submissions
      </Button>
    </>
  );
}

function UserFullName({ id }: { id: number }) {
  const { data, isLoading, isError } = useGetStudentQuery(id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(data);
  return (
    <div>
      {data?.data?.firstName} {data?.data?.lastName}
    </div>
  );
}

function SubmissionList({ list }: { list: TSubmissionProps[] }) {
  if (list) {
    return (
      <Container className="mb-8">
        <p className="text-2xl font-bold my-4 text-green-500">Submissions</p>
        <div>
          {list.map((submission) => (
            <Card shadow="sm" key={submission.id} className="my-2">
              <Card.Section>
                <div className="flex flex-row my-4 justify-between mx-4">
                  <div className="text-lg font-bold">
                    <UserFullName id={submission.userProfile} />
                  </div>
                  <div className="flex flex-row gap-4 mt-2">
                    {submission.isLate && (
                      <Badge variant="light" color="red">
                        Late
                      </Badge>
                    )}
                    <a
                      href={submission.attachment[0] ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GoDownload className="text-xl" />
                    </a>
                  </div>
                </div>
              </Card.Section>
            </Card>
          ))}
        </div>
      </Container>
    );
  } else return <div>No Submissions Found</div>;
}
