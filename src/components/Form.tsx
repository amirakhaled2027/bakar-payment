import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  cardType: string;
  billingAddress?: string; // optional coz it depends on card type
  phone: string;
}

// props for the Form component
interface FormProps {
  onDataChange: (data: FormData) => void;
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onDataChange, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [cardType, setCardType] = useState<string>("physical");
  const [showBillingAddress, setShowBillingAddress] = useState<boolean>(true);

  const handleCardTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCardType(value);
    setShowBillingAddress(value === "physical");
    onDataChange({ cardType: value } as FormData);
  };

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
    onDataChange(data); // passing the data back to PaymentForm
    onSubmit(data); // submitting to API in PaymentForm
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full border border-gray-300 rounded-xl p-8">
      {/* Name */}
      <div className="mb-5">
        <label className="flex flex-start mb-2 text-sm font-medium text-gray-900">Name</label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Name must have at least 3 characters" },
          })}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Enter your name..."
        />
        {errors.name && <div className="text-red-500 text-sm text-left">{errors.name.message}</div>}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="flex flex-start mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            validate: (value) => value.includes("@") || "Email must include @",
          })}
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Enter your email..."
        />
        {errors.email && <div className="text-red-500 text-sm text-left">{errors.email.message}</div>}
      </div>

      {/* Card Type */}
      <div className="mb-5">
        <label className="flex flex-start mb-2 text-sm font-medium text-gray-900">Card Type</label>
        <select
          {...register("cardType")}
          value={cardType}
          onChange={handleCardTypeChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value="physical">Physical</option>
          <option value="virtual">Virtual</option>
        </select>
      </div>

      {/* Billing Address */}
      {showBillingAddress && (
        <div className="mb-5">
          <label htmlFor="billingAddress" className="flex flex-start mb-2 text-sm font-medium text-gray-900">
            Billing Address
          </label>
          <input
            {...register("billingAddress", {
              required: "Billing address is required",
              pattern: {
                value: /^[a-zA-Z0-9\s,.-]+$/,
                message: "Invalid billing address format",
              },
            })}
            type="text"
            placeholder="Enter your billing address..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.billingAddress && (
            <div className="text-red-500 text-sm text-left">{errors.billingAddress.message}</div>
          )}
        </div>
      )}

      {/* Phone */}
      <div className="mb-5">
        <label className="flex flex-start mb-2 text-sm font-medium text-gray-900">Phone</label>
        <input
          {...register("phone", {
            required: "Phone is required",
            minLength: { value: 3, message: "Phone must have at least 3 characters" },
          })}
          type="text"
          placeholder="Enter your phone number..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
        {errors.phone && <div className="text-red-500 text-sm text-left">{errors.phone.message}</div>}
      </div>

      {/* Submit Button */}
      <div className="flex sm:flex-start">
        <button
          type="submit"
          className="text-white bg-blue-700 disabled:bg-gray-500 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-40 px-5 py-2.5 mt-8"
        >
            Submit
        </button>
      </div>
    </form>
  );
};

export default Form;