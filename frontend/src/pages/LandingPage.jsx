import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Headline from "../components/Headline";
import Footer from "../components/Footer";
import LoginCard from "../components/LoginCard";
import RegisterCard from "../components/RegisterCard";

const LandingPage = () => {
  // State to manage which authentication modal is open (null, 'login', or 'register')
  const [authModal, setAuthModal] = useState(null);

  // Helper functions to open specific modals
  const openLogin = () => setAuthModal("login");
  //  const openRegister = () => setAuthModal('register');

  // Function to close any open modal
  const closeModal = () => setAuthModal(null);

  return (
    <div>
      <Navbar onLoginClick={openLogin} />
      <Headline />
      <Footer />

      {authModal === "login" && (
        <LoginCard
          onClose={closeModal}
          onSwitchToRegister={() => setAuthModal("register")}
        />
      )}

      {authModal === "register" && (
        <RegisterCard
          onClose={closeModal}
          onSwitchToLogin={() => setAuthModal("login")}
        />
      )}
    </div>
  );
};

export default LandingPage;
