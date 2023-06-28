import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import { DashboardAdmin, PesananAdmin, BahanBaku } from "./pages/admin";
import { DashboardSupplier, PesananSupplier } from "./pages/supplier";
import { DashboardCustomer, PesananCustomer } from "./pages/customer";
import { SideBar, Navbar, Profile } from "./components";

const App = () => {
  // login state
  const [isLogin, setIsLogin] = useState(true);
  const handleLogin = () => setIsLogin(true);

  // activeUser state
  const [activeUser, setActiveUser] = useState('');
  const handleUser = (activeUser) => setActiveUser(activeUser);

  // notif bar state
  const [isNotifActive, setIsNotifActive] = useState(false);
  const handleNotif = () => {
    setIsNotifActive(!isNotifActive);
    console.log({ isNotifActive });
  }

  return (
    <Router>
      {!isLogin ? (
        <div className="w-full min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <Login handleLogin={handleLogin} handleUser={handleUser} />
              }
            />
            <Route
              path="/register"
              element={
                <Register handleLogin={handleLogin} handleUser={handleUser} />
              }
            />
          </Routes>
        </div>
      ) : (
        <div className="w-full h-screen flex gap-4 relative">
          <SideBar activeUser={activeUser} />
          <main className="flex-auto h-screen overflow-y-scroll">
            <Profile notif={handleNotif} />
            {activeUser === "admin" ? (
              <Routes>
                <Route path="/" element={<DashboardAdmin />} />
                <Route path="/pesanan" element={<PesananAdmin />} />
                <Route path="/bahan" element={<BahanBaku />} />
              </Routes>
            ) : activeUser === "supplier" ? (
              <Routes>
                <Route path="/" element={<DashboardSupplier />} />
                <Route path="/pesanan" element={<PesananSupplier />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<DashboardCustomer />} />
                <Route path="/pesanan" element={<PesananCustomer />} />
              </Routes>
            )}
          </main>
          <div className={`fixed top-0 ${isNotifActive? 'right-0' : '-right-full'} w-60 h-full bg-gray-100 shadow-lg shadow-gray-500 transition-all duration-300`}></div>
        </div>
      )}
    </Router>
  );
}

export default App;
