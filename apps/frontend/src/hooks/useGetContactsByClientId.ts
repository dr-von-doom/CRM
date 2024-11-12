import { useState, useEffect } from "react";
import { ContactType } from "../types/client.types";
import { getContactsByClientId } from "../services/contact.services";

const useGetContactsByClientId = (clientId: string) => {
  const [data, setData] = useState<ContactType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getContactsByClientId(clientId);
        setData(response);
      } catch (err) {
        setError("Error fetching contacts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [clientId]);

  return { data, isLoading, error };
};

export default useGetContactsByClientId;
