import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DeleteAccount.css";

const API_BASE_URL = "http://localhost:4478";

const DeleteAccountConfirmation = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmDeletion = async () => {
    if (!id) {
      setError("The account ID is missing or invalid.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/email/delete-account/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to delete the account. Please try again."
        );
      }

      setDeleted(true);
    } catch (err) {
      setError(
        err.message ||
          "Unable to confirm deletion. Please try again."
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
            <div className="delete-account-card text-center">
              <div
                className={
                  deleted ? "confirmation-icon" : "delete-icon"
                }
              >
                <i
                  className={
                    deleted ? "bi bi-check-lg" : "bi bi-person-x"
                  }
                />
              </div>

              {deleted ? (
                <>
                  <h1 className="fw-bold mb-3">
                    Account Deleted
                  </h1>

                  <p className="text-muted">
                    Your PMS Partner account has been deleted
                    successfully.
                  </p>

                  <div className="alert alert-success text-start">
                    Your account access has been removed.
                    Certain records may be retained where required
                    by applicable law.
                  </div>

                  <Link
                    to="/"
                    className="btn btn-primary w-100 py-2 mt-3"
                  >
                    Back to Home
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="fw-bold mb-3">
                    Confirm Account Deletion
                  </h1>

                  <p className="text-muted mb-4">
                    Are you sure you want to permanently delete
                    your PMS Partner account? This action may
                    remove your access to referrals, projects,
                    and partner services.
                  </p>

                  {!id && (
                    <div className="alert alert-danger text-start">
                      The account ID is missing. Please open the
                      correct account deletion link.
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger text-start">
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn-danger w-100 py-2 fw-semibold"
                    onClick={handleConfirmDeletion}
                    disabled={!id || loading}
                  >
                    {loading
                      ? "Deleting Account..."
                      : "Confirm Permanent Deletion"}
                  </button>

                  <p className="small text-muted mt-3 mb-0">
                    Continue only if you want to permanently
                    delete your account.
                  </p>
                </>
              )}

              <div className="text-center mt-4">
                <Link
                  to="/privacy-policy"
                  className="privacy-link"
                >
                  Privacy Policy
                </Link>

                <span className="mx-2 text-muted">|</span>

                <Link to="/" className="privacy-link">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountConfirmation;