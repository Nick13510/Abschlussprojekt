import { useParams } from "react-router";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detailseite {id}</h1>
    </div>
  );
}
