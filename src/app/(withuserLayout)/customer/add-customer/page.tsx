"use client";

import { useSubmitCustomerFormMutation } from "@/redux/api/customerApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";


// Define TypeScript interface for form fields
interface FormFields {
  customerID: string;
  firstName: string;
  lastName: string;
  companyName: string;
  designation: string;
  department: string;
  industry: string;
  email?: string;
  mobileNumber: string;
  phoneNumber: string;
  fax?: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  taxNumber?: string;
  gstNumber?: string;
  previousDue?: string;
  customerType: string;
  sellType: string;
  currency: string;
  paymentTerms: string;
  image: string;
  alternativeContact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  bankDetails?: {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    routingNumber?: string;
    branchName?: string;
  };
  billingAddress?: string;
  shippingAddress?: string;
}
const AddCustomer: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>();
  const [submitCustomerForm, { }] = useSubmitCustomerFormMutation(); // Destructure isLoading and error

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    submitCustomerForm(data)
      .then(() => {
        reset(); // Reset the form after successful submission
        console.log("Form Data:", data);
      })
      .catch((err) => {
        console.error("Submission Error:", err);
      });
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Customer Information Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        {[{ label: "Customer ID", name: "customerID" }, { label: "First Name", name: "firstName" }, { label: "Last Name", name: "lastName" }, { label: "Company Name", name: "companyName" }, { label: "Designation", name: "designation" }, { label: "Department", name: "department" }, { label: "Industry", name: "industry" }, { label: "Email", name: "email", type: "email" }, { label: "Mobile Number", name: "mobileNumber" }, { label: "Phone Number", name: "phoneNumber" }, { label: "Fax", name: "fax" }, { label: "Country", name: "country" }, { label: "Address", name: "address" }, { label: "City", name: "city" }, { label: "State", name: "state" }, { label: "ZIP Code", name: "zipCode" }, { label: "Tax Number", name: "taxNumber" }, { label: "GST Number", name: "gstNumber" }, { label: "Previous Due", name: "previousDue" }, { label: "Currency", name: "currency" }, { label: "Payment Terms", name: "paymentTerms" }].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label htmlFor={name} className="block mb-2 text-sm font-medium">
              {label}
            </label>
            <input
              type={type}
              id={name}
              {...register(name as keyof FormFields)}
              className={`bg-gray-50 border ${errors[name as keyof FormFields] ? "border-red-500" : "border-gray-300"} rounded-lg text-sm w-full p-2.5`}
              placeholder={`Enter ${label}`}
            />
            {errors[name as keyof FormFields] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name as keyof FormFields]?.message as string}
              </p>
            )}
          </div>
        ))}

        {/* Customer Type Select */}
        <div>
          <label htmlFor="customerType" className="block mb-2 text-sm font-medium">
            Customer Type
          </label>
          <select
            id="customerType"
            {...register("customerType")}
            className={`bg-gray-50 border ${errors.customerType ? "border-red-500" : "border-gray-300"} rounded-lg text-sm w-full p-2.5`}
          >
            <option value="">Select Customer Type</option>
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
          {errors.customerType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customerType?.message as string}
            </p>
          )}
        </div>

        {/* Sell Type Select */}
        <div>
          <label htmlFor="sellType" className="block mb-2 text-sm font-medium">
            Sell Type
          </label>
          <select
            id="sellType"
            {...register("sellType")}
            className={`bg-gray-50 border ${errors.sellType ? "border-red-500" : "border-gray-300"} rounded-lg text-sm w-full p-2.5`}
          >
            <option value="">Select Sell Type</option>
            <option value="Retailer">Retailer</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Dealer">Dealer</option>
          </select>
          {errors.sellType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sellType?.message as string}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            {...register("image")}
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
          />
        </div>

        {/* Optional Fields Section */}
        <div className="col-span-2 mt-6">
          <h2 className="text-xl font-semibold mb-4">Optional Fields</h2>

          {/* Alternative Contact */}
          <div>
            <h3 className="font-medium text-sm mb-2">Alternative Contact</h3>
            <label htmlFor="alternativeContact.name" className="block text-sm">Name</label>
            <input
              type="text"
              id="alternativeContact.name"
              {...register("alternativeContact.name")}
              className="bg-gray-50 border border-gray-300 rounded-lg text-sm w-full p-2.5"
              placeholder="Enter Name"
            />
            <label htmlFor="alternativeContact.phone" className="block text-sm mt-4">Phone</label>
            <input
              type="text"
              id="alternativeContact.phone"
              {...register("alternativeContact.phone")}
              className="bg-gray-50 border border-gray-300 rounded-lg text-sm w-full p-2.5"
              placeholder="Enter Phone"
            />
            <label htmlFor="alternativeContact.email" className="block text-sm mt-4">Email</label>
            <input
              type="email"
              id="alternativeContact.email"
              {...register("alternativeContact.email")}
              className="bg-gray-50 border border-gray-300 rounded-lg text-sm w-full p-2.5"
              placeholder="Enter Email"
            />
          </div>

          {/* Bank Account Details in 2-Column Grid */}
          <h3 className="font-medium text-sm mt-4">Bank Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="bankDetails.bankName" className="block text-sm">Bank Name</label>
              <input
                type="text"
                placeholder="Enter Bank Name"
                id="bankDetails.bankName"
                {...register("bankDetails.bankName")}
                className="bg-gray-50 border border-gray-300 rounded-lg text-sm w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="bankDetails.accountName" className="block text-sm">Account Name</label>
              <input
                type="text"
                id="bankDetails.accountName"
                placeholder="Enter Account Name"
                {...register("bankDetails.accountName")}
                className="bg-gray-50 border border-gray-300 rounded-lg text-sm w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="bankDetails.accountNumber" className="block text-sm">Account Number</label>
              <input
                type="text"
                id="bankDetails.accountNumber"
                placeholder="Enter Account Number"
                {...register("bankDetails.accountNumber")}
                className="bg-gray-50 border border-gray-300 rounded-lg text-sm w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="bankDetails.routingNumber" className="block text-sm">Routing Number</label>
              <input
                type="text"
                id="bankDetails.routingNumber"
                placeholder="Enter Routing Number"
                {...register("bankDetails.routingNumber")}
                className="bg-gray-50 border border-gray-300 rounded-lg text-sm w-full p-2.5"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 text-center mt-6">
          <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;