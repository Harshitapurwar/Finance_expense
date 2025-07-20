import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';

function Logout() {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token on mount
    localStorage.removeItem('token');

    const timer = setTimeout(() => {
      setShowPopup(false);
      navigate('/auth'); // redirect to login
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {showPopup && (
        <div className="logout-popup">
          ✅ Logout successful
        </div>
      )}
    </>
  );
}

export default Logout;
