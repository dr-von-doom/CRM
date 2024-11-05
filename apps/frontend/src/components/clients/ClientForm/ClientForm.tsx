import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { ClientType } from "../../../types/client.types";

export const ClientForm = forwardRef((_, ref) => {
  const { register, getValues } = useForm<ClientType>();

  useImperativeHandle(ref, () => ({
    getValues: () => getValues(),
  }));

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="nit" className="text-xs">
          Nit:
        </label>
        <input
          type="text"
          id="nit"
          {...register("nit")}
          className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
          placeholder="Enter the nit..."
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="full-name" className="text-xs">
          Full Name:
        </label>
        <input
          type="text"
          id="full-name"
          {...register("name")}
          className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
          placeholder="Enter full name..."
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs">
          Address:
        </label>
        <input
          type="text"
          id="address"
          {...register("address")}
          className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
          placeholder="Enter the address..."
        />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="country" className="text-xs">
            Country:
          </label>
          <input
            type="text"
            id="country"
            {...register("country")}
            className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
            placeholder="Enter the country..."
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="city" className="text-xs">
            City:
          </label>
          <input
            type="text"
            id="city"
            {...register("city")}
            className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
            placeholder="Enter the city..."
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-col gap-1 md:w-1/2">
          <label htmlFor="email" className="text-xs">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
            placeholder="Enter the email..."
          />
        </div>
        <div className="flex flex-col gap-1 md:w-1/2">
          <label htmlFor="phone" className="text-xs">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className="border border-black rounded-[4px] shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.9)] text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
            placeholder="Enter the phone..."
          />
        </div>
      </div>
    </form>
  );
});

export default ClientForm;
