import React, { useState } from 'react';
import axios from 'axios';
// import { apiBaseurl } from '../../../utils/constant';
import { primaryApiBaseUrl, secondaryApiBaseUrl } from "../utils/constant";
import { getImage } from "../utils/getImage";



const DigitalSignature = ({ formData, getStatus }) => {
    let  {email}= formData

    let   _email =  email || (!!localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).email) ;
    email = _email;
    const [documentId, setDocumentId] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    // Template ID - Static as per your requirement
    const TEMPLATE_ID = 'a4018bd4-d126-4bbc-a9f7-43823b14e893';
    const API_BASE_URL = secondaryApiBaseUrl;

    // Function to send the document for signature
    const sendForSignature = async () => {
     
        if ( !email) {
            alert('Email is missing. Please complete the first step.');
              // console.log('Validation Error:', { email });
            return;
        }

        setLoading(true);
        try {
            // console.log('Initiating sendForSignature API call...');
            // console.log('API Base URL:', API_BASE_URL);
            // console.log('Payload:', { template_id: TEMPLATE_ID, email});


            const response = await axios.post(
                `${API_BASE_URL}documents/send-for-signature`,
                {
                    template_id: TEMPLATE_ID,
                    email:email,
                  
                }
            );

            // console.log('Response:', response.data);
            setDocumentId(response.data.id); // Assuming backend returns 'id'
            alert('Please check your mail and sign the agreement to continue your purchase!');
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error sending document for signature.';
            console.error('Error Details:', error);
            console.error('Error Message:', errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Function to check document status
    const checkStatus = async () => {
        if (!documentId) {
            alert('Please enter or generate a valid Document ID.');
            // console.log('Validation Error: Document ID is missing.');
            return;
        }

        setLoading(true);
        try {
            // console.log('Initiating checkStatus API call...');
            // console.log('API Base URL:', API_BASE_URL);
            // console.log('Document ID:', documentId);
           
            const response = await axios.get(
                `${API_BASE_URL}documents/check-status/${documentId}`
            );

            // console.log('Response:', response.data);
            setStatus(response.data.status);  // Assuming backend returns 'status'

            getStatus(response.data.status)
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error checking document status.';
            console.error('Error Details:', error);
            console.error('Error Message:', errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
        {/* Buttons Wrapper */}
        <div className="d-flex align-items-center justify-content-center pt-2">
          {/* Send for Signature Button */}
          <button
            onClick={sendForSignature}
            className="btn-next btn text-white btn-graident-pay btn-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send for Signature"}
          </button>
      
          {/* Check Status Button */}
          <button
            onClick={checkStatus}
            className="btn-next btn btn-graident-pay ms-3"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Status"}
          </button>
        </div>
      
        {/* Status Display (Below Buttons) */}
        {status && (
          <p className="status-text pt-2">
            <strong> Status:</strong> <span>{status}</span>
          </p>
        )}
      </div>
      
      
    );
};

export default DigitalSignature;
