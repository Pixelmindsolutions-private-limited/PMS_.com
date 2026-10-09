import React, { useState } from "react";
import "./DeleteAccount.css";

const API_BASE_URL = "http://localhost:4478";

const DeleteAccount = ({ userId }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (!userId) {
        throw new Error(
          "Unable to identify your partner account. Please log in again."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/email/send-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            message: `Please delete my account. Registered email: ${email
              .trim()
              .toLowerCase()}`,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit your account deletion request."
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-account-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="delete-account-card">
              <div className="delete-icon">
                <i className="bi bi-person-x" />
              </div>

              {!submitted ? (
                <>
                  <h1 className="text-center fw-bold mb-3">
                    Delete Account
                  </h1>

                  <p className="text-center text-muted mb-4">
                    PMS Partner Application
                  </p>

                  <p className="text-muted">
                    Enter the email address associated with your
                    partner account to request account deletion.
                    Your request will be sent to our support team.
                  </p>

                  <div className="alert alert-warning">
                    Deleting your account may remove access to
                    referrals, projects, and partner services.
                    Certain records may be retained where legally
                    required.
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label fw-semibold"
                      >
                        Registered Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>

                    {error && (
                      <div className="alert alert-danger">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-danger w-100 py-2"
                      disabled={loading}
                    >
                      {loading
                        ? "Submitting Request..."
                        : "Request Account Deletion"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="confirmation-icon">
                    <i className="bi bi-envelope-check" />
                  </div>

                  <h2 className="fw-bold mb-3">
                    Request Submitted
                  </h2>

                  <p className="text-muted">
                    Your account deletion request has been sent
                    successfully. Our team will review your request
                    and contact you if necessary.
                  </p>

                  <p className="small text-muted">
                    Please note that submitting a request does
                    not necessarily mean your account has already
                    been deleted.
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-3"
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                      setError("");
                    }}
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;