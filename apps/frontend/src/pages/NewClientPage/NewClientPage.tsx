import React, { useState } from "react";
import ClientForm from "../../components/ClientForm/ClientForm";
import ContactForm from "../../components/ContactForm/ContactForm";
import { Client, Contact } from "../../types/api.types";


const NewClientPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [client, setClient] = useState<Client>({
    nit: "",
    fullName: "",
    address: "",
    country: "",
    city: "",
    email: "",
    phone: "",
    isActive: true,
  });

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section className="flex py-12">
      <div className="mx-auto w-[400px] flex flex-col gap-4 justify-center md:w-[700px]">
        <div>
          <h1 className="font-bold text-2xl">Add new client</h1>
          <p className="font-light text-sm">
            Please fill out the form below to create a new client profile.
          </p>
        </div>
        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
          <h2 className="font-semibold mb-1 text-xl">Personal info</h2>
          <hr className="border-black mb-4" />
          <ClientForm client={client} onChange={handleClientChange} />
          <h2 className="font-semibold mt-10 mb-1 text-xl">Contact info</h2>
          <hr className="border-black mb-4" />
          <ContactForm
            contacts={contacts}
            handleContactChange={handleContactChange}
            handleRemoveContact={handleRemoveContact}
            handleAddContact={handleAddContact}
          />
          <button
            type="submit"
            className="mt-8 rounded-md bg-neutral-800 text-white py-3 font-semibold transition-all hover:scale-105 hover:bg-black"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewClientPage;
