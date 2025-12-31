import Navbar from "../ReuseableComponents/navbar";
import Footer from "../ReuseableComponents/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function MainTemplate({ title, children, isSearchbar = true, targetID, SearchData }) {
  const [isBorder, setBorder] = useState(true);
  const [navbarWhite, setNavbarWhite] = useState(false);

  function Assist() {
    setBorder(!isBorder);
    document.documentElement.classList.toggle("assist", !isBorder);
  }

  const CurrentLocation = useLocation().pathname;
  console.log(CurrentLocation);

  useEffect(() => {
    // 1. We do not get the element here. We get it inside the scroll function.
    
    const handleScroll = () => {
      // 2. Fetch the element dynamically on every scroll
      const target = document.getElementById(targetID);

      // If target doesn't exist yet, do nothing
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top;
      
      // 3. Logic: If the 'content' div hits the Navbar area (e.g., 80px from top)
      // Change '80' to the approximate height of your navbar for a smoother transition
      if (targetPosition <= 80) {
        setNavbarWhite(true);
      } else {
        setNavbarWhite(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case the user refreshes halfway down the page
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetID]); // Dependencies

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col">
      <div
        className={`${
          navbarWhite
            ? "fixed bg-white"
            : CurrentLocation === "/"
            ? "fixed bg-white/20 backdrop-blur-md shadow-sm"
            : "fixed bg-white"
        } top-0 left-0 z-50 w-full transition-colors duration-300 ease-in-out`}
      >
        <Navbar title={CurrentLocation} isSearchbar={isSearchbar} SearchData={SearchData} />
      </div>
      <div className="relative pt-0 flex-1 flex flex-col">{children}</div>
      <div className="relative w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default MainTemplate;
