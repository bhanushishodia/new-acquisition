import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { primaryApiBaseUrl, secondaryApiBaseUrl } from "../utils/constant";
import { getImage } from "../utils/getImage";

import addonData from "./Addon.json";
const addon = getImage("addon.png");
const addonhand = getImage("addonhand.png");  
const skip = getImage("skip.png");
console.log(addonData);
const Addon = ({ onNext, initialPackagePrice, packName}) => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(Number(initialPackagePrice));
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddonSelect = (addonId) => {
    const newSelectedAddons = selectedAddons.includes(addonId)
      ? selectedAddons.filter(id => id !== addonId)
      : [...selectedAddons, addonId];

    setSelectedAddons(newSelectedAddons);

    let newTotalPrice = Number(initialPackagePrice);
    newSelectedAddons.forEach(id => {
      const selectedAddon = addonData[packName].length > 0 && addonData[packName].find(item => item.id === id);
      newTotalPrice += Number(selectedAddon.price);
    });

    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    setTotalPrice(Number(initialPackagePrice));
  }, [initialPackagePrice]);


  // specific popup
  const handleSkipClick = () => {
    setShowConfirmation(true);
  };

  const confirmSkip = () => {
    setShowConfirmation(false);
    nextCall(totalPrice, onNext, 'skip');
  };

  const cancelSkip = () => {
    setShowConfirmation(false);
  };


// console.log(addonData, packName, addonData[packName], "No data available for this packName");

  return (
  <div
  style={{
    maxHeight: 'calc(100vh - 100px)', // Adjust this based on your layout
    overflowY: 'auto', // Enable vertical scrolling
    overflowX: 'hidden', // Prevent horizontal scrolling
    scrollbarWidth: 'thin', // For Firefox
    position: 'relative', // Maintain content flow
  }}
>
    <div className="step-content">
      <p className=" fs-6 py-1 mx-auto">
        Don’t miss out on these deals
        <span>
          &nbsp;<img src={addon} className="img-fluid" alt="addon" style={{ width: "30px", height: "30px", margin: "0 auto", transform: "rotate(44deg)" }} />
        </span>
      </p>

      <div className="row row-cols-2 row-cols-md-2 row-cols-lg-3 g-3 px-2">
        {!! addonData[packName] &&addonData[packName].length > 0 && addonData[packName].map((addon, index) => (
          <div key={addon.id} className="col">
            <div
              className="card h-100 d-flex flex-column"
              style={{
                borderRadius: '20px',
                border: `2px solid ${['#EB5D88', '#37D8A0', '#76D4F5', '#F0E9B9', '#E5A895', '#0BBFB0'][index % 6]}`,
              }}
            >
              <div className="card-body text-start m-0 pb-0 px-0 pt-0 d-flex flex-column">
                <small className="card-title fw-bold  small px-3 ">{addon.name}</small>
                <p className="px-3 mb-1" style={{ lineHeight: '1.1' }}>
                  <strong>₹{addon.price}</strong>{' '}
                  &nbsp;
                  <span style={{ textDecoration: 'line-through', color: 'gray', fontSize: '0.9rem' }}>
                    ₹{addon.originalPrice}
                  </span>
                </p>
                <p className="text-muted feature-description px-3 mb-2 pb-2" style={{ fontSize: '0.85rem', lineHeight: '1.3' }}>
                  {addon.description}
                </p>


                {/* Footer always at the bottom */}
                <div key={index}
                  className="card-footer mt-auto p-2"
                  style={{
                    backgroundColor: `${['#EB5D88', '#37D8A0', '#76D4F5', '#F0E9B9', '#E5A895', '#0BBFB0'][index % 6]}`, // Border color based on index
                    marginBottom: '0',
                    borderRadius: '0 0 15px 15px',
                    textAlign: 'center',
                  }}
                >
                  <div className="form-check d-flex align-items-center justify-content-start ps-3 ">
                    <span>
                      <img
                        src={addonhand}
                        className="img-fluid"
                        alt="addonhand"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "38px", // Gap between image and checkbox
                        }}
                      />
                    </span>
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id={`addon-${addon.id}`}
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleAddonSelect(addon.id)}
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        border: "2px solid rgba(0, 0, 0, 1)",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        verticalAlign: "middle",
                        marginRight: "40px", // Gap between checkbox and text 
                      }}
                    />
                    <label
                      className="form-check-label mt-2 ms-1"
                      htmlFor={`addon-${addon.id}`}
                      style={{ fontWeight: "600", color: "rgba(32, 30, 30, 1)", fontSize: "12px" }}
                    >
                      {selectedAddons.includes(addon.id) ? "Added" : "Yes, I will take it."}
                    </label>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-end mt-2 mb-0 px-1">
        <button
          className="btn btn-secondary me-3"
          onClick={handleSkipClick}
        >
          Skip
        </button>
        <button
          className="btn btn-success"
          onClick={() => nextCall(totalPrice, onNext)}>
          Proceed ₹{totalPrice}</button> </div>
          {showConfirmation && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content"  style={{
        border: '3px solid #22C9B7',
        borderRadius: '25px',
        overflow: 'hidden', // Ensures the border-radius affects the entire modal content
      }}>
              <div className="modal-header border-0 ">
                <h5 className="modal-title text-center">
                  <img
                        src={skip}
                        className="img-fluid"
                        alt="skip"
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    </h5>
                <button type="button" className="btn-close mb-4" onClick={cancelSkip}></button>
              </div>
              <div className="modal-body ">
                Are you sure you don't want to <br/> select any add-ons?
              </div>
              <div className="modal-footer mx-auto border-0">
               
                <button className="btn skip_button_yes me-3" onClick={confirmSkip}>Yes</button>
                <button className="btn skip_button_no" onClick={cancelSkip}>No</button>
              </div>
            </div>
          </div>
        </div>
           )}
    </div>
    </div>
  );
};
function nextCall(totalPrice, onNext) {
  localStorage.setItem("totalPrice", totalPrice); onNext(totalPrice)

}

export default Addon;
