import React from "react";
const PurchaseStart = () => {
    return (
        <div>
            {/* HERO SECTION */}
            <section
                className="text-white d-none"
                style={{
                    background: "linear-gradient(180deg, #0b2b4a 0%, #0f766e 60%, #e6fffa 100%)",
                    padding: "40px 0",
                }}
            >
                <div className="container">
                    {/* Top Bar */}
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <div className="fw-bold fs-5"><img src="https://ik.imagekit.io/cloy701fl/images/custom-logo.png" width={200} alt="" /></div>
                        <div className="small">
                            ⚡ Powered by <strong> <img src="https://ik.imagekit.io/cloy701fl/images//whatsapp-pricing/Meta.png" width={20} alt="meta" /> &nbsp;Meta</strong>
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-center  mb-lg-0">
                            <span className="badge bg-light text-dark mb-3">
                                WhatsApp Business API
                            </span>

                            <h1 className="display-5 fw-bold mt-3">
                                Your Complete WhatsApp <br />
                                Engagement Platform
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST STATS */}
            <section className="py-5 bg-light d-none">
                <div className="container">
                    <div className="row  g-4">
                        <p className="mt-4 fs-6 text-dark text-justify  px-md-5">
                            Anantya.ai is a leading CPaaS (Communication Platform as a Service) provider enabling seamless, secure, and
                            scalable communication across multiple channels — including WhatsApp, SMS, RCS— through a unified API and
                            platform. Our goal is to simplify communication for businesses and enhance customer engagement through
                            automation, integrations, and omnichannel support.
                            Our platform also offers businesses a team inbox equipped with smart routing, automated responses, data
                            tagging, and analytics, enabling them to efficiently support their customers. We proudly serve clients in over <strong> 12
                                countries,</strong> offering  <strong> multi-currency</strong> and <strong> multi-language support </strong> to cater to diverse market needs. Additionally,
                            we provide <strong> advanced technical support</strong> to ensure our clients have the assistance they need to thrive in today's
                            competitive environment.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-5 bg-light d-none">
                <div className="container">
                    <div className="row text-center g-4">
                        <div className="col-6 col-md-3">
                            <h2 className="fw-bold">500+</h2>
                            <p className="mb-0">Clients Onboarded</p>
                        </div>
                        <div className="col-6 col-md-3">
                            <h2 className="fw-bold">12+</h2>
                            <p className="mb-0">Countries Served</p>
                        </div>
                        <div className="col-6 col-md-3">
                            <h2 className="fw-bold">50+</h2>
                            <p className="mb-0">Use Cases Discovered</p>
                        </div>
                        <div className="col-6 col-md-3">
                            <h2 className="fw-bold">60M+</h2>
                            <p className="mb-0">Conversations Volume</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PurchaseStart;
