export default function HeroBackground({
  title,
  classroomId,
}: {
  title: string;
  classroomId: number;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto relative overflow-hidden">
      <div
        className="h-48 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url(./classcover.png)" }}
      >
        <div className="absolute flex items-center justify-center">
          <h1 className="text-4xl font-bold text-left mt-[130px] mx-2">
            {title ?? `classroom ${classroomId}`}
          </h1>
        </div>
      </div>
    </div>
  );
}
