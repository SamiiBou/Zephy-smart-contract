import { useLoaderData } from "react-router-dom";

export async function Loader({ params }) {
  return params.ref + 677;
}

export default function Invoice() {
  const ref = useLoaderData();

  return (
    <div>
      <h1>Ref</h1>
      {ref}
    </div>
  )
}
