import { Alert } from "@heroui/alert";
import "./AuthTemplate.css";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

function AuthTemplate({ children, errorTitle, errorDesc }) {
  return (
    <div className="AuthTemplate-container bg-gradient-to-b from-[rgba(100,254,254,0)] to-[rgba(60,152,152,0.28)]">
      <div className="AuthTemplate-component">
        <div className="Content">{children}</div>
        <div className="Image-Place-Holder">
          <img src="./public/LOGO.png" alt="gambar" />
        </div>
      </div>
      <AnimatePresence>
        {errorDesc && (
          <motion.div
            // Add a key so Framer knows this is a unique element
            key="error-alert"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[400px]"
          >
            <Alert
              type="danger"
              color="danger"
              onClose={true}
              title={errorTitle}
              description={errorDesc}
              className="w-full shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AuthTemplate;
// End of file: frontend/src/component/AuthTemplate.jsx
