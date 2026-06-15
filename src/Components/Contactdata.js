
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Contactdata() {
    const [form, setForm] = useState([]);

    console.log(form);

    const contadata = () => {
        axios
            .get("https://678cb478f067bf9e24e7ff6a.mockapi.io/api/v1/info/contact")
            .then((res) => {
                setForm(res.data); // `res.data` is used to set the correct response data.
            })
            .catch((error) => {
                console.error("Error fetching data:", error); // Handle errors
            });
    };

    const deleteContact = (id) => {
        axios
          .delete(`https://678cb478f067bf9e24e7ff6a.mockapi.io/api/v1/info/contact/${id}`)
          .then(() => {
            // Remove the deleted item from the state
            setForm((prevForm) => prevForm.filter((item) => item.id !== id));
            console.log(`Deleted contact with id: ${id}`);
            contadata()
          })
          .catch((error) => {
            console.error("Error deleting contact:", error);
          });
      };


    useEffect(() => {
        contadata(); // Call the function properly
    }, []);
    return (
        <div>
            <Header />
            <main>
                {/* Page banner area start here */}
                <section
                    className="banner__inner-page bg-image pt-100 pb-100 bg-image"
                    // data-background="/assets/images/banner/banner-inner-page.jpg"
                    style={{
                        backgroundImage: `url(${"/assets/images/banner/banner-inner-page.jpg"})`,
                    }}
                >
                    <div
                        className="shape2 wow slideInLeft"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms"
                    >
                        <img src="/assets/images/banner/inner-banner-shape2.png" alt="shape" />
                    </div>
                    <div
                        className="shape1 wow slideInLeft"
                        data-wow-delay="200ms"
                        data-wow-duration="1500ms"
                    >
                        <img src="/assets/images/banner/inner-banner-shape1.png" alt="shape" />
                    </div>
                    <div
                        className="shape3 wow slideInRight"
                        data-wow-delay="200ms"
                        data-wow-duration="1500ms"
                    >
                        <img
                            className="sway__animationX"
                            src="/assets/images/banner/inner-banner-shape3.png"
                            alt="shape"
                        />
                    </div>
                    <div className="container">
                        <h2
                            className="wow fadeInUp"
                            data-wow-delay="00ms"
                            data-wow-duration="1500ms"
                        >
                            Form Data
                        </h2>
                        <div
                            className="breadcrumb-list wow fadeInUp"
                            data-wow-delay="200ms"
                            data-wow-duration="1500ms"
                        >
                            <Link to="/">Home</Link>
                            <span>
                                <i className="fa-regular fa-angles-right mx-2" />
                                Form Data
                            </span>
                        </div>
                    </div>
                </section>
                <>
                    {/* Contact area start here */}
                    <section className="contact-area pb-20">
                        <div className="container-fluid">
                        <div className=' mt-5'>
            <div className=''>
               
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">slno</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                        <th scope='col'>Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {form.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.subject}</td>
                            <td>{item.createdAt.slice(0, 10)}</td>
                            <td>{item.message}</td>
                            <td>
                            <button onClick={()=>{deleteContact(item.id)}} type="button" className="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          </div>
                        </div>
                    </section>
                    {/* Contact area end here */}
                </>

            </main>
            <Footer />
        </div>
    )
}

export default Contactdata