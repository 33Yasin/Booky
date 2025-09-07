 import React, { useState } from "react";
 import Navbar from "../components/Navbar";
 import Headline from "../components/Headline";
 import Footer from "../components/Footer";
 import LoginCard from "../components/LoginCard";
 import RegisterCard from "../components/RegisterCard";

 const LandingPage = () => {
   const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'

   const openLogin = () => setAuthModal('login');
  //  const openRegister = () => setAuthModal('register');
   const closeModal = () => setAuthModal(null);

   return (
     <div>
         <Navbar onLoginClick={openLogin} />
         <Headline />
         <Footer />

         {authModal === 'login' && (
           <LoginCard
             onClose={closeModal}
             onSwitchToRegister={() => setAuthModal('register')}
           />
         )}

         {authModal === 'register' && (
           <RegisterCard
             onClose={closeModal}
             onSwitchToLogin={() => setAuthModal('login')}
           />
         )}
     </div>
   )
 }

export default LandingPage;

