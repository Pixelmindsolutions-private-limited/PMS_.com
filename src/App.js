import logo from './logo.svg';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import About from './Components/About';
import Services from './Components/Services';
import Contact from './Components/Contact';
import Appdevelopment from './Components/Appdevelopment';
import Design from './Components/Design';
import Webdevelopment from './Components/Webdevelopment';
import Digitalmarketing from './Components/Digitalmarketing';
import Contactdata from './Components/Contactdata';
import Blog from './Components/Blogs';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getDateParts, getAllBlogPosts } from './Components/blogData';

import Blog1 from './blogs/Blog1';
import Blog2 from './blogs/Blog2';
import Blog3 from './blogs/Blog3';
import Portfolio from './Components/Portfolio';
import GlobalTracker from './utils/GlobalTracker';
import AdminVisitors from './utils/AdminVisitors';


function App() {
  return (
    <>
      <HelmetProvider>
        <GlobalTracker />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appdevelopment" element={<Appdevelopment />} />
          <Route path="/uiuxdesign" element={<Design />} />
          <Route path="/webdevelopment" element={<Webdevelopment />} />
          <Route path="/digitalmarketing" element={<Digitalmarketing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/formdata" element={<Contactdata />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/empowering-businesses-through-it-services" element={<Blog1 />} />
          <Route path="/blog/professional-it-consulting-and-app-development" element={<Blog2 />} />
          <Route path="/blog/application-maintainence-and-digital-growth-strategy" element={<Blog3 />} />

          {/* <Route path="/data" element={<AdminVisitors />} /> */}

          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
