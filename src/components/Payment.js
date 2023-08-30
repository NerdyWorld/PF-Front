import { Wallet } from "@mercadopago/sdk-react";
import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [mpLoading, setMpLoading] = useState(false);
  const [showPreferenceButton, setShowPreferenceButton] = useState(true);

  // Mercado Pago calcula el precio total sumando la cantidad de Items y su unit_price. Por eso tenemos que agregar a "Items" el ShippingFee.
  const getPreferenceId = () => {
    fetch("http://localhost:3001/api/mp/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "BLS",
            unit_price: 333,
            quantity: 28,
            currency_id: "USD",
          },
        ],
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
        setMpLoading(false);        
      })
      .catch((error) => {
        console.error(error);
      })
      
  };

  const handleMp = () => {
    fetch("http://localhost:3001/api/mp/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "BLS",
            unit_price: 333,
            quantity: 28,
            currency_id: "USD",
          },
        ],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
        <PayPalButtons 
            style={{layout: "horizontal", color:"silver", shape: "pill"}}
            createOrder={(data, actions) => {
              return actions.order.create({
                  purchase_units: [
                      {
                          amount: {
                              value: 333
                          },
                      },
                  ],
              });
            }}
            onApprove={(data, actions) => {
              // Once the payment is approved
              // Redirect to Home for example

            }}

            onError={(data, actions)=>{

            }}

            onCancel={(data, actions)=> {
              return;
            }}

            showSpinner={true}
        />

      {!preferenceId && !mpLoading && (
        <button onClick={getPreferenceId}>
          {mpLoading ? "Getting started..." : "Pay with Mercado Pago"}
        </button>
      )}
      {preferenceId && (
        <div id="wallet_container" onClick={handleMp}>
          <Wallet initialization={{ preferenceId, redirectMode: "blank" }} />
        </div>
      )}
    </div>
  );
};

export default Payment;
