import { useRef, useState } from "react";
import { ClientForm } from "../../components/clients/ClientForm";
import { ContactForm } from "../../components/clients/ContactForm";
import { useCreateClient } from "../../hooks/useCreateClients";
import BaseLayout from "../../layout/BaseLayout";
import { ClientType, ContactType } from "../../types/client.types";

const CreateClientPage = () => {
  const formRef = useRef<{ getValues: () => ClientType }>(null);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const createClient = useCreateClient();

  const handleSubmit = () => {
    if (formRef.current) {
      const clientData = formRef.current.getValues();
      createClient.mutate(clientData);
    }
  };

  const handleContactChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [name]: value };
    setContacts(newContacts);
  };

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleAddContact = () => {
    setContacts([
      ...contacts,
      { firstName: "", lastName: "", email: "", phone: "" },
    ]);
  };

  return (
    <BaseLayout>
      <section className="flex py-12">
        <div className="mx-auto w-[400px] flex flex-col gap-4 justify-center md:w-[700px]">
          <h1 className="font-bold text-2xl">Add new client</h1>
          <p className="font-light text-sm">
            Please fill out the form below to create a new client profile.
          </p>
          <ClientForm ref={formRef} />
          <h2 className="font-semibold mt-10 mb-1 text-xl">Contact info</h2>
          <hr className="border-black mb-4" />
          <ContactForm
            contacts={contacts}
            handleContactChange={handleContactChange}
            handleRemoveContact={handleRemoveContact}
            handleAddContact={handleAddContact}
          />
          <button
            onClick={handleSubmit}
            className="mt-8 rounded-md bg-neutral-700 text-white py-3 font-semibold transition-all hover:scale-105 hover:bg-black"
          >
            Submit
          </button>

          {createClient.isSuccess && (
            <div className="text-green-500 mt-4 bg-green-200 border-2 border-green-500 rounded-lg py-2 text-center">
              Client created successfully!
            </div>
          )}
          {createClient.isError && (
            <div className="text-red-500 mt-4 bg-red-200 border-2 border-red-500 rounded-lg py-2 text-center">
              An error occurred. Please try again.
            </div>
          )}
        </div>
      </section>
    </BaseLayout>
  );
};

export default CreateClientPage;
