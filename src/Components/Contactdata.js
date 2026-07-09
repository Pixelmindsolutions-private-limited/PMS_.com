import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Contactdata() {
    const [form, setForm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = form.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(form.length / itemsPerPage);

    const contadata = () => {
        axios
            .get("https://678cb478f067bf9e24e7ff6a.mockapi.io/api/v1/info/contact")
            .then((res) => {
                setForm(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const deleteContact = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            axios
                .delete(`https://678cb478f067bf9e24e7ff6a.mockapi.io/api/v1/info/contact/${id}`)
                .then(() => {
                    setForm((prevForm) => prevForm.filter((item) => item.id !== id));
                    console.log(`Deleted contact with id: ${id}`);
                    contadata();
                })
                .catch((error) => {
                    console.error("Error deleting contact:", error);
                });
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === "Pixelmind@25") {
            setIsAuthenticated(true);
            setPasswordError('');
            setPassword('');
        } else {
            setPasswordError('Invalid password. Please try again.');
            setPassword('');
        }
    };

    // Pagination controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Open modal with contact details
    const openModal = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedContact(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && showModal) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    // Close modal on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            contadata();
        }
    }, [isAuthenticated]);

    // Password protection screen
    if (!isAuthenticated) {
        return (
            <div>
                <section
                    className="banner__inner-page bg-image pt-100 pb-100 bg-image"
                    style={{
                        backgroundImage: `url(${"/assets/images/banner/banner-inner-page.jpg"})`,
                    }}
                >
                    <div className="container">
                        <h2 className="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                            Admin Access
                        </h2>
                        <div className="breadcrumb-list wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <Link to="/">Home</Link>
                            <span>
                                <i className="fa-regular fa-angles-right mx-2" />
                                Admin Access
                            </span>
                        </div>
                    </div>
                </section>

                <section className="contact-area pb-20">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-8 col-12">
                                <div className="password-protection-wrapper p-4 p-md-5 bg-white shadow rounded">
                                    <div className="text-center mb-4">
                                        <i className="fas fa-lock" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                                        <h3 className="mt-3">Admin Authentication Required</h3>
                                        <p className="text-muted">Please enter the password to access contact form data.</p>
                                    </div>
                                    <form onSubmit={handlePasswordSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className={`form-control form-control-lg ${passwordError ? 'is-invalid' : ''}`}
                                                id="password"
                                                placeholder="Enter admin password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoFocus
                                            />
                                            {passwordError && (
                                                <div className="invalid-feedback d-block mt-2">
                                                    {passwordError}
                                                </div>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-lg w-100">
                                            <i className="fas fa-unlock me-2"></i> Unlock Access
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Main content with table
    return (
        <div>
            <main>
                <section
                    className="banner__inner-page bg-image pt-100 pb-100 bg-image"
                    style={{
                        backgroundImage: `url(${"/assets/images/banner/banner-inner-page.jpg"})`,
                    }}
                >
                    <div className="shape2 wow slideInLeft" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <img src="/assets/images/banner/inner-banner-shape2.png" alt="shape" />
                    </div>
                    <div className="shape1 wow slideInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <img src="/assets/images/banner/inner-banner-shape1.png" alt="shape" />
                    </div>
                    <div className="shape3 wow slideInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <img className="sway__animationX" src="/assets/images/banner/inner-banner-shape3.png" alt="shape" />
                    </div>
                    <div className="container">
                        <h2 className="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                            Contact Form Data
                        </h2>
                        <div className="breadcrumb-list wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <Link to="/">Home</Link>
                            <span>
                                <i className="fa-regular fa-angles-right mx-2" />
                                Contact Data
                            </span>
                        </div>
                    </div>
                </section>

                <section className="contact-area pb-20">
                    <div className="container-fluid">
                        <div className='mt-5'>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col" className="text-center">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Subject</th>
                                            <th scope="col" className="text-center">Date</th>
                                            <th scope="col" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length > 0 ? (
                                            currentItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <th scope="row" className="text-center">{indexOfFirstItem + index + 1}</th>
                                                    <td>
                                                        <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                                            {item.name}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                                            {item.email}
                                                        </div>
                                                    </td>
                                                    <td>{item.phone}</td>
                                                    <td>
                                                        <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                                            {item.subject}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        }) : 'N/A'}
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            onClick={() => openModal(item)}
                                                            type="button"
                                                            className="btn btn-info btn-sm me-1"
                                                            title="View Details"
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                            <span className="d-none d-sm-inline ms-1">View</span>
                                                        </button>
                                                        <button
                                                            onClick={() => { deleteContact(item.id) }}
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            title="Delete"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                            <span className="d-none d-sm-inline ms-1">Delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">
                                                    <div className="text-muted">
                                                        <i className="fas fa-inbox fa-2x d-block mb-2"></i>
                                                        No contact data available
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {form.length > 0 && (
                                <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                                    <div className="mb-2 mb-sm-0">
                                        <span className="text-muted">
                                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, form.length)} of {form.length} entries
                                        </span>
                                    </div>
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination pagination-sm flex-wrap mb-0">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={prevPage}>
                                                    <i className="fas fa-chevron-left"></i>
                                                </button>
                                            </li>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                    <button onClick={() => paginate(number)} className="page-link">
                                                        {number}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={nextPage}>
                                                    <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* View Modal */}
            {showModal && selectedContact && (
                <div 
                    className="modal-overlay"
                    onClick={handleBackdropClick}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '20px',
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}
                >
                    <div 
                        className="modal-content"
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            maxWidth: '600px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'hidden',
                            position: 'relative',
                            animation: 'slideUp 0.3s ease-in-out',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{
                            padding: '20px 25px',
                            borderBottom: '1px solid #e9ecef',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#f8f9fa',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px'
                        }}>
                            <h3 className="m-0" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                <i className="fas fa-user-circle me-2" style={{ color: '#0d6efd' }}></i>
                                Contact Details
                            </h3>
                            <button
                                onClick={closeModal}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    padding: '5px',
                                    color: '#6c757d',
                                    transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#000'}
                                onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '25px', overflowY: 'auto', maxHeight: 'calc(90vh - 140px)' }}>
                            <div className="row g-4">
                                {/* Name */}
                                <div className="col-12">
                                    <div style={{
                                        padding: '12px 15px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #0d6efd'
                                    }}>
                                        <small className="text-muted d-block mb-1">
                                            <i className="fas fa-user me-1"></i> Name
                                        </small>
                                        <strong style={{ fontSize: '1.1rem' }}>{selectedContact.name || 'N/A'}</strong>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <div style={{
                                        padding: '12px 15px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #0dcaf0'
                                    }}>
                                        <small className="text-muted d-block mb-1">
                                            <i className="fas fa-envelope me-1"></i> Email
                                        </small>
                                        <strong>{selectedContact.email || 'N/A'}</strong>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="col-md-6">
                                    <div style={{
                                        padding: '12px 15px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #198754'
                                    }}>
                                        <small className="text-muted d-block mb-1">
                                            <i className="fas fa-phone me-1"></i> Phone
                                        </small>
                                        <strong>{selectedContact.phone || 'N/A'}</strong>
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="col-12">
                                    <div style={{
                                        padding: '12px 15px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #ffc107'
                                    }}>
                                        <small className="text-muted d-block mb-1">
                                            <i className="fas fa-tag me-1"></i> Subject
                                        </small>
                                        <strong>{selectedContact.subject || 'N/A'}</strong>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="col-12">
                                    <div style={{
                                        padding: '15px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #dc3545'
                                    }}>
                                        <small className="text-muted d-block mb-2">
                                            <i className="fas fa-comment me-1"></i> Message
                                        </small>
                                        <div style={{
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            fontSize: '0.95rem'
                                        }}>
                                            {selectedContact.message || 'No message provided'}
                                        </div>
                                    </div>
                                </div>

                                {/* Date Created */}
                                <div className="col-12">
                                    <div style={{
                                        padding: '12px 15px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #6f42c1'
                                    }}>
                                        <small className="text-muted d-block mb-1">
                                            <i className="fas fa-calendar-alt me-1"></i> Date Created
                                        </small>
                                        <strong>
                                            {selectedContact.createdAt ? 
                                                new Date(selectedContact.createdAt).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) : 'N/A'
                                            }
                                        </strong>
                                    </div>
                                </div>

                                {/* ID */}
                                {selectedContact.id && (
                                    <div className="col-12">
                                        <div style={{
                                            padding: '8px 15px',
                                            backgroundColor: '#e9ecef',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem'
                                        }}>
                                            <span className="text-muted">ID: </span>
                                            <span className="text-secondary">{selectedContact.id}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div style={{
                            padding: '15px 25px',
                            borderTop: '1px solid #e9ecef',
                            backgroundColor: '#f8f9fa',
                            borderBottomLeftRadius: '12px',
                            borderBottomRightRadius: '12px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px'
                        }}>
                            <button
                                onClick={closeModal}
                                className="btn btn-secondary"
                            >
                                <i className="fas fa-times me-1"></i> Close
                            </button>
                            <button
                                onClick={() => {
                                    closeModal();
                                    deleteContact(selectedContact.id);
                                }}
                                className="btn btn-danger"
                            >
                                <i className="fas fa-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes slideUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .modal-overlay {
                    animation: fadeIn 0.3s ease-in-out;
                }
                .modal-content {
                    animation: slideUp 0.3s ease-in-out;
                }
                /* Responsive adjustments */
                @media (max-width: 576px) {
                    .modal-content {
                        margin: 10px;
                        max-height: 95vh;
                    }
                    .modal-content > div:first-child {
                        padding: 15px 20px;
                    }
                    .modal-content > div:nth-child(2) {
                        padding: 20px;
                    }
                }
            `}</style>
        </div>
    )
}

export default Contactdata