"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const SearchParams = useSearchParams();
  const token = SearchParams.get("token");
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/success`, { params: { token } })
        .then((response) => setCustomerData(response.data))
        .catch((error) => console.log(error));
    }
  }, [token]);

  if (!token) {
    return <div>Loading..</div>;
  }

  return (
    <div className="w-full h-screnn flex items-center justify-center flex-col gap-3 text-center">
      <h1>✅ Paiment réussi !</h1>

      {customerData ? <div>
        <p>Merci pour votre achat, {customerData?.name}</p>
        <ul>
          <li>
            <strong>Email:</strong> {customerData?.email}
          </li>
          </ul>
      </div> : <p>Loading data..</p>}
    </div>
  );
}
