// defining the structure for card data
interface CardData {
  last4?: string;
  cvc?: string;
  expiryMonth?: string | number;
  expiryYear?: string | number;
  brand?: string;
}

interface CardInfoProps {
  cardData: CardData;
}

const CardInfo: React.FC<CardInfoProps> = ({ cardData }) => {
  return (
    <div className="max-w-md mx-auto h-auto py-10">
      <h2 className="text-lg font-semibold mb-4 text-left">Card Info</h2>

      {/* Card Number */}
      <div className="border border-grey-400 bg-gray-200 shadow-lg rounded-md p-6 max-w-md mx-auto h-auto">
        <div className="mb-6">
          <input
            type="text"
            id="cardNumber"
            value={cardData?.last4 ? `**** **** **** ${cardData.last4}` : "********************"}
            readOnly
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CVC & Expiry date */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              id="cvc"
              value={cardData?.cvc || "CVC"}
              readOnly
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              id="expiry"
              value={
                cardData?.expiryMonth && cardData?.expiryYear
                  ? `${cardData.expiryMonth}/${cardData.expiryYear}`
                  : "MM/YY"
              }
              readOnly
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Card Brand */}
        <div className="flex justify-end">
          <input
            type="text"
            id="brand"
            value={cardData?.brand || "Brand"}
            readOnly
            className="w-[30%] border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
