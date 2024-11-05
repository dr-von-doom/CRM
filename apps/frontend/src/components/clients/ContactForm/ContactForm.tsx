import { Contact } from "../../types/api.types";
import { FiPlus } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

type ContactFormProps = {
  contacts: Contact[];
  handleContactChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveContact: (index: number) => void;
  handleAddContact: () => void;
};

const ContactForm = ({
  contacts,
  handleContactChange,
  handleRemoveContact,
  handleAddContact,
}: ContactFormProps) => {
  return (
    <div className="flex flex-col gap-3" id="contact-info">
      {contacts.map((contact, index) => (
        <div key={index} className="flex flex-col gap-3 mb-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor={`first-name-${index}`} className="text-xs">
                First name:
              </label>
              <input
                type="text"
                id={`first-name-${index}`}
                name="firstName"
                value={contact.firstName}
                onChange={(e) => handleContactChange(index, e)}
                className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Enter the first name..."
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor={`last-name-${index}`} className="text-xs">
                Last name:
              </label>
              <input
                type="text"
                id={`last-name-${index}`}
                name="lastName"
                value={contact.lastName}
                onChange={(e) => handleContactChange(index, e)}
                className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Enter the last name..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-col gap-1 md:w-1/2">
              <label htmlFor={`email-${index}`} className="text-xs">
                Email:
              </label>
              <input
                type="email"
                id={`email-${index}`}
                name="email"
                value={contact.email}
                onChange={(e) => handleContactChange(index, e)}
                className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Enter the email..."
              />
            </div>
            <div className="flex flex-col gap-1 md:w-1/2">
              <label htmlFor={`phone-${index}`} className="text-xs">
                Phone:
              </label>
              <input
                type="tel"
                id={`phone-${index}`}
                name="phone"
                value={contact.phone}
                onChange={(e) => handleContactChange(index, e)}
                className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Enter the phone..."
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveContact(index)}
            className="text-red-500 flex items-center gap-2 transition-all hover:font-semibold"
          >
            <FaTrashAlt />
            Delete contact
          </button>
        </div>
      ))}
      <div className="flex flex-col items-center mt-10">
        <hr className="border-black w-[400px] md:w-[700px]" />
        <button
          type="button"
          onClick={handleAddContact}
          className="mt-4 relative -top-[41px] bg-black text-white p-3 rounded-full text-lg transition-all hover:scale-110"
        >
          <FiPlus className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
