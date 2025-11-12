import { useState } from "react";
import { Alert } from "@heroui/alert";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alertvariant, setAlertVariant] = useState("danger");

    // Dummy credentials
    const adminEmail = "admin";
    const adminPassword = "admin123";

    const handleLogin = () => {
        setIsLoading(true);
        setError("");

        setTimeout(() => {
            if (email === adminEmail && password === adminPassword) {
                setAlertVariant("success");
                setError("benar"); // tidak ada error
                console.log("Login berhasil!");
            } else {
                setAlertVariant("danger");
                setError("Email atau password salah.");
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="w-[350px] mx-auto mt-40 flex flex-col gap-4">
            <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border px-3 py-2 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleLogin}
                disabled={isLoading}
                className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                {isLoading ? "Loading..." : "Login"}
            </button>

            <AnimatePresence>
                {error && (
                    <motion.div
                        key="alert"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Alert color={alertvariant} title="Gagal Login" description={error} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
