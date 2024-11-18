import dynamic from "next/dynamic";

const FaFileDownload = dynamic(() => import("react-icons/fa").then((mod) => mod.FaFileDownload), {
  ssr: false,
});

export default function DownloadAttachments({ link }: { link: string }) {
  return (
    <a
      href={link ?? "#"}
      target="_blank"
      className="flex text-center items-center justify-center gap-2 my-2 md:my-0 md:mx-2 text-white hover:text-black bg-black hover:bg-white border-1 border-white hover:border-black px-2 py-1 rounded-sm duration-300 "
      rel="noreferrer"
    >
      {" "}
      Download <FaFileDownload />
    </a>
  );
}
