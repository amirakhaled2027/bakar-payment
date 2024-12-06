import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "../components/Form";
import CardInfo from "../components/CardInfo";

// defining the structure for card data
interface CardData {
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  brand: string;
}

// defining the structure for form data
interface FormData {
  name: string;
  email: string;
  cardType: string;
  billingAddress?: string; // optional coz it depends on card type
  phone: string;
}

const PaymentForm: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    last4: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    brand: "",
  });

  const handleFormDataChange = (data: FormData) => {
    console.log("Received form data:", data);
  };

  const handleSubmit = async (data: FormData) => {
    try {
      // sending form data to the API endpoint
      const response = await axios.post<CardData>(
        "https://www.bakarcompany.somee.com/api/IssueCard/issue-complete",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // updating the cardData state with API response
      setCardData({
        last4: response.data.last4 || "",
        expiryMonth: response.data.expiryMonth || "",
        expiryYear: response.data.expiryYear || "",
        cvc: response.data.cvc || "",
        brand: response.data.brand || "",
      });

      // showing success toast notification
      toast.success("Card issued successfully!", { position: "top-center" });
    } 
    catch (error) {
      // check if error is an AxiosError and handle appropriately
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
        toast.error("Failed to issue card! Please try again.", {
          position: "top-center",
        });
      } else {
        // handling non-Axios errors
        console.error("Unexpected Error:", error);
        toast.error("An unexpected error occurred.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-white py-10 md:py-20 md:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10">
          <Form onDataChange={handleFormDataChange} onSubmit={handleSubmit} />
          <CardInfo cardData={cardData} />
        </div>
      </section>
    </div>
  );
};

export default PaymentForm;
