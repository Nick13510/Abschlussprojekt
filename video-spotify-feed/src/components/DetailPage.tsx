import { useParams } from "react-router";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detailseite für Video {id}</h1>
    </div>
  );
}
