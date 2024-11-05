import Link from "next/link";

import { Card } from "@mantine/core";

export default function MeetLinkCard({ meetLink }: { meetLink: string }) {
  return (
    <Card>
      <Card.Section>
        <div className="flex flex-col text-center h-8 md:h-16 mt-12 mb-16 md:my-6">
          <h2>Meet link</h2>
          <Link
            href={meetLink}
            className="text-blue-500 underline hover:text-blue-700 duration-300"
          >
            {meetLink}
          </Link>
        </div>
      </Card.Section>
    </Card>
  );
}
