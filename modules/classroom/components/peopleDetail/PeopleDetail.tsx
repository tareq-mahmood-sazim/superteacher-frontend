export default function PeopleDetail({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex flex-row justify-between gap-2">
      <p>{name}</p>
      <div className="flex flex-row justify-between gap-2">
        <p>{email}</p>
      </div>
    </div>
  );
}
