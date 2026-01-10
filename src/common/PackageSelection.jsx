import React from "react";

import { primaryApiBaseUrl, secondaryApiBaseUrl } from "../utils/constant";
import { getImage } from "../utils/getImage";

const whatsappImg = getImage("whatsapp.png");

const row1 = getImage("/whatsapp-pricing/Integration.png");
const row2 = getImage("/whatsapp-pricing/Automated.png");
const row3 = getImage("/whatsapp-pricing/Shield.png");
const row4 = getImage("/whatsapp-pricing/Message.png");
const row5 = getImage("/whatsapp-pricing/Hired.png");
const row6 = getImage("/whatsapp-pricing/Gallery.png");

const PackageSelection = ({ onNext }) => {
  const packageId = localStorage.getItem("packageSelected");
  const packageDetails = {
    "899": {
      title: "Promo Pack",
      discount: "43.78%",
      originalPrice: "1599",
      discountAmount: "700",
      totalPrice: "899",
      features: [
        {
          title: "Smart messaging tools",
          description: "Engage your customers with welcome and away messages, and  quick replies tailored to their needs.",
          icon: row4
        },
        {
          title: "Hassle-free onboarding",
          description: "Simplify your journey with seamless onboarding setup and Facebook Business Verification.",
          icon: row5
        },
        {
          title: "Engaging campaign features",
          description: "Drive results with interactive templates and carousel messages.",
          icon: row6
        }
      ]
    },
    "1999": {
      title: "Starter Pack",
      discount: "43.78%",
      originalPrice: "3499",
      discountAmount: "1500",
      totalPrice: "1999",
      features: [
        {
          title: "Smart messaging tools",
          description: "Engage your customers with welcome and away messages, and  quick replies tailored to their needs.",
          icon: row4
        },
        {
          title: "Hassle-free onboarding",
          description: "Simplify your journey with seamless onboarding setup and Facebook Business Verification.",
          icon: row5
        },
        {
          title: "Engaging campaign features",
          description: "Drive results with interactive templates and carousel messages.",
          icon: row6
        }
      ]
    },
    "3499": {
      title: "Growth Pack",
      discount: "50.01%",
      originalPrice: "6999",
      discountAmount: "3500",
      totalPrice: "3499",
      features: [
        {
          title: "Seamless omnichannel integration",
          description: "Combine multiple engagement channels into one powerful platform",
          icon: row1
        },
        {
          title: "Customisable Automation",
          description: "Create tailored workflows and chatbots to streamline your operations.",
          icon: row2
        },
        {
          title: "Reliable scalability",
          description: "Handle n number of messages monthly with 99.99% uptime.",
          icon: row3
        }
      ]
    },
    "12999": {
      title: "Advanced Pack",
      discount: "50.01%",
      originalPrice: "21999",
      discountAmount: "9000",
      totalPrice: "12999",
      features: [
        {
          title: "Seamless omnichannel integration",
          description: "Combine multiple engagement channels into one powerful platform",
          icon: row1
        },
        {
          title: "Customisable Automation",
          description: "Create tailored workflows and chatbots to streamline your operations.",
          icon: row2
        },
        {
          title: "Reliable scalability",
          description: "Handle n number of messages monthly with 99.99% uptime.",
          icon: row3
        }
      ]
    },
    "9999": {
      title: "Promo Pack",
      discount: "50%",
      originalPrice: "19999",
      discountAmount: "10000",
      totalPrice: "9999",
      features: [
        {
          title: "Smart messaging tools",
          description: "Engage your customers with welcome and away messages, and quick replies tailored to their needs.",
          icon: row4
        },
        {
          title: "Hassle-free onboarding",
          description: "Simplify your journey with seamless onboarding setup and Facebook Business Verification.",
          icon: row5
        },
        {
          title: "Engaging campaign features",
          description: "Drive results with interactive templates and carousel messages.",
          icon: row6
        }
      ]
    },
    "19999": {
      title: "Starter Pack",
      discount: "50%",
      originalPrice: "39,999",
      discountAmount: "20000",
      totalPrice: "19999",
      features: [
        {
          title: "Smart messaging tools",
          description: "Engage your customers with welcome and away messages, and quick replies tailored to their needs.",
          icon: row4
        },
        {
          title: "Hassle-free onboarding",
          description: "Simplify your journey with seamless onboarding setup and Facebook Business Verification.",
          icon: row5
        },
        {
          title: "Engaging campaign features",
          description: "Drive results with interactive templates and carousel messages.",
          icon: row6
        }
      ]
    },
    "37999": {
      title: "Growth Pack",
      discount: "40%",
      originalPrice: "63,999",
      discountAmount: "26000",
      totalPrice: "37999",
      features: [
        {
          title: "Smart messaging tools",
          description: "Engage your customers with welcome and away messages, and quick replies tailored to their needs.",
          icon: row4
        },
        {
          title: "Hassle-free onboarding",
          description: "Simplify your journey with seamless onboarding setup and Facebook Business Verification.",
          icon: row5
        },
        {
          title: "Engaging campaign features",
          description: "Drive results with interactive templates and carousel messages.",
          icon: row6
        }
      ]
    },
    "151999": {
      title: "Advanced Pack",
      discount: "50%",
      originalPrice: "179999",
      discountAmount: "40000",
      totalPrice: "151999",
      features: [
        {
          title: "Seamless omnichannel integration",
          description: "Combine multiple engagement channels into one powerful platform",
          icon: row1
        },
        {
          title: "Customisable Automation",
          description: "Create tailored workflows and chatbots to streamline your operations.",
          icon: row2
        },
        {
          title: "Reliable scalability",
          description: "Handle n number of messages monthly with 99.99% uptime.",
          icon: row3
        }
      ]
    }

  };

  const packageInfo = packageDetails[packageId];

  if (!packageInfo) {
    return <p className="text-danger">Invalid Package ID!</p>;
  }
  // Handle the transition to the Addon step
  // Inside PackageSelection component
  const handleNextStep = () => {
    onNext(packageInfo.totalPrice);  // Pass the total price as the argument
  };
  return (
    <div className="container">
      <div className="card  rounded border-0 mt-2">
        <div className="card-body p-0">
        
          <h6 className=" text-start ms-3 px-1 my-2">Your Packages includes top Features :</h6>
          <ul className="list-group list-group-flush px-1 mt-0">
            {packageInfo.features.map((feature, index) => (
              <li key={index} className="list-group-item d-flex align-items-center text-start">
                <img
                  src={feature.icon}
                  alt="Feature Icon"
                  className="me-3 fe-icon"
                  style={{ width: "35px", height: "35px" }}
                />
                <div>
                  <span className="feature-title">{feature.title}:</span><br />
                  <span className="feature-description">{feature.description}</span>
                </div>
              </li>

            ))}
          </ul>
          <div className="order-summary p-1">
            <div
              className="order-summary-container"
              style={{
                borderLeft: '4px solid #fff', // 4px border on the left
                borderRadius: '4px', // 12px border radius for all corners
                margin: '10px 10px'

              }}
            >
              <div className="d-flex justify-content-between align-items-center ps-2 pe-2">
                {/* Order Summary on the Left */}
                <h5 className="card-title fs-6  text-start mb-0">Package Details</h5>

                {/* WhatsApp Icon on the Right */}
                <div className="whatsapplogo">
                  <a
                    href="https://wa.link/bifqu5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-icon"
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      src={whatsappImg}
                      alt="WhatsApp"
                      style={{
                        width: '30px',
                        height: '30px',
                      }}
                    />
                  </a>
                </div>
              </div>
              {/* Prices Below Order Summary */}
              <div className="d-flex flex-row mt-0 ps-2 pe-2">
                <h3 className="h4 w-bold">₹{packageInfo.totalPrice}</h3> &nbsp; &nbsp;
                <h3 className="h5 text-muted text-decoration-line-through">₹{packageInfo.originalPrice}</h3>
              </div>
            </div>
            <div className="d-flex justify-content-between px-4">
              {/* Discount Text on the Left */}
              <p className="text-success fw-bold mb-0"> {packageInfo.title}</p>

              {/* Discount Amount on the Right */}
              <p className="text-success fw-bold mb-0"> ₹{packageInfo.originalPrice}</p>
            </div>
            <div className="d-flex justify-content-between px-4" style={{ borderTop: '1.5px dashed white' }}>
              {/* Discount Text on the Left */}
              <p className="text-danger fw-bold mb-0">Discount ({packageInfo.discount})</p>

              {/* Discount Amount on the Right */}
              <p className="text-danger fw-bold mb-0"> -₹{packageInfo.discountAmount}</p>
            </div>
            <div className="d-flex justify-content-between px-4" style={{ borderTop: '1.5px dashed white' }}>
              {/* Discount Text on the Left */}
              <p className="text-success fw-bold mb-1">Total Payable </p>

              {/* Discount Amount on the Right */}
              <p className="text-success fw-bold mb-1"> ₹{packageInfo.totalPrice}</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {/* <button className="btn  btn-graident-pay me-3 btn-lg" onClick={handleNextStep}>
              Proceed ₹{packageInfo.totalPrice}
            </button> */}
            <button className="btn  btn-graident-pay me-3 mt-2 btn-lg" onClick={handleNextStep}>
              Proceed 
            </button>
          </div>
        </div>
      </div>

    </div>

  );
};

export default PackageSelection;
