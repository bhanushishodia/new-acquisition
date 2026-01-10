import React from "react";

const AffiliateTerms = () => {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                {/* HEADER */}
                {/* TERMS */}
                <div className="row justify-content-center">

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-md-5">
                            <div className="text-start text-justify mb-5">
                                <h2 className="fw-bold text-center">🎯 Buy It. Use It. Earn from It.</h2>
                                <p className="lead mt-3">
                                    Why just use it for your business when you can earn from it too?
                                </p>
                                <p>Become a part of the <b>Anantya Affiliate or White-Label Reseller Program</b> and unlock a new income stream while
                                    empowering others to grow their communication capabilities.</p>

                                <p>📢 Refer your clients, contacts, or network — and let Anantya handle the rest while you earn commissions or build your
                                    brand.</p>
                            </div>
                            <h4 className="fw-bold mb-4">
                                📜 Terms of Service <span className="text-muted">(Key Points)</span>
                            </h4>

                            {/* Platform Control */}
                            <h6 className="fw-semibold mt-4 text-start">
                                Platform Control & Verification:
                            </h6>
                            <ul className="mt-2 text-justify text-start">
                                <li>
                                    The verification of business accounts on WhatsApp (including Facebook Business Verification and Green Tick approval) and
                                    all associated restrictions or template pauses are solely governed by Meta Platforms Inc. While we will provide full
                                    assistance in submitting required documentation, the outcome remains at Meta’s discretion.Message delivery depends on
                                    recipient device, network conditions, and Meta’s systems. 100% delivery is not guaranteed.
                                </li>

                            </ul>

                            {/* Messaging Policy */}
                            <h6 className="fw-semibold mt-4 text-start">
                                Messaging Policy & Charges:
                            </h6>
                            <ul className="mt-2 text-start">
                                <li>
                                    WhatsApp and RCS pricing structures may be revised by Meta or telecom partners without prior notice. All platform-related
                                    rate changes will directly affect billing.
                                </li>
                                <li>
                                    WhatsApp campaigns sent outside agreed countries will incur Global Conversational Pricing.
                                </li>
                                <li>
                                    RCS messages are categorized as Basic (≤160 chars), Rich (media & carousel), and Conversation-based (24-hour sessions
                                    triggered on brand replies). Charges apply based on message type and engagement logic.
                                </li>
                            </ul>

                            {/* Currency */}
                            <h6 className="fw-semibold mt-4 text-start text-justify">
                                Currency & Invoicing
                            </h6>
                            <ul className="mt-2 text-start">
                                <li>
                                    All prices are quoted in INR and exclusive of applicable taxes, which will be charged additionally.
                                </li>
                                <li>
                                    The billing cycle is monthly, starting from the 1st day of each month. The first billing cycle begins on the service
                                    commencement date.
                                </li>
                                <li>
                                    ● Invoices are based on usage logs (sent, delivered, read) from the Anantya.ai panel. Internal customer logs will not override
                                    Supplier logs.
                                </li>
                                <li>
                                    Rates per message will be shared via email in the form of a coverage list.
                                </li>
                                <li>
                                    A 10% annual increment will be applied to all base platform packages and service fees, effective on the anniversary of the
                                    onboarding/start date
                                </li>
                                <li>
                                    The Supplier may revise prices in response to market dynamics, platform policy changes, operator rate updates, legal
                                    obligations, or other external cost changes. Notification will be given via email, and if the Client disagrees, the agreement
                                    may be terminated per the agreed terms.
                                </li>
                            </ul>

                            {/* Payment */}
                            <h6 className="fw-semibold mt-4 text-start">
                                Payment Terms
                            </h6>
                            <ul className="mt-2 text-start">
                                <li>
                                    All invoices must be paid within 15 days of the issue date.
                                </li>
                                <li>
                                    Failure to make timely payments may result in service suspension without further notice.
                                </li>
                                <li>
                                    Partial payments do not waive the right to collect full dues. Any legal, bank, or collection charges incurred due to late
                                    payment will be borne by the Client.
                                </li>
                            </ul>

                            {/* Support */}
                            <h6 className="fw-semibold mt-4 text-start  ">
                                Support & SLA
                            </h6>
                            <ul className="mt-2 text-start">
                                <li>
                                    Standard support is available via Email, Call & Chat during working hours (Mon–Fri).
                                </li>
                                <li>
                                    Critical support issues are addressed within 4–6 hours; non-critical queries within 48 hours.
                                </li>

                            </ul>

                            {/* FOOTER */}
                            <hr className="my-4" />

                            <p className="text-center small text-muted mb-0">
                                <a
                                    href="https://www.anantya.ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted text-decoration-none me-2"
                                >
                                    www.anantya.ai
                                </a>
                                |
                                <a
                                    href="mailto:info@anantya.ai"
                                    className="text-muted text-decoration-none ms-2"
                                >
                                    info@anantya.ai
                                </a>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AffiliateTerms;
