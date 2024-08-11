import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlchemySigner } from "@alchemy/aa-alchemy";

// Supposons que ces composants existent dans votre projet
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";

// Composant pour la pop-up
const Popup = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Verification Required</h3>
            <p className="mb-4">{message}</p>
            <Button onClick={onClose} className="w-full">
                Close
            </Button>
        </div>
    </div>
);

// Nouveau composant pour gérer l'authentification en arrière-plan
const BackgroundAuthProcess = ({
    signer,
    authMethod,
    email,
    fullName,
    onSuccess,
    onError,
}) => {
    useEffect(() => {
        const authenticate = async () => {
            try {
                if (authMethod === "email") {
                    await signer.authenticate({
                        type: "email",
                        createNew: true,
                        email,
                    });
                } else if (authMethod === "passkey") {
                    const result = await signer.authenticate({
                        type: "passkey",
                        createNew: true,
                        username: email || fullName || "PASSKEY_USER",
                    });
                    onSuccess(result);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                onError(
                    `An error occurred during ${authMethod} authentication. Please try again.`
                );
            }
        };

        authenticate();
    }, [signer, authMethod, email, fullName, onSuccess, onError]);

    return null;
};

export default function Register() {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [signer, setSigner] = useState(null);
    const [authMethod, setAuthMethod] = useState("email");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const iframeContainerRef = useRef(null);

    const cards = [
        {
            title: "Easy Payments",
            description: "Send and receive money with just a few taps.",
        },
        {
            title: "Quick Loans",
            description: "Access funds when you need them most.",
        },
        {
            title: "Financial Insights",
            description: "Gain valuable insights into your spending habits.",
        },
    ];

    useEffect(() => {
        if (iframeContainerRef.current) {
            const newSigner = new AlchemySigner({
                client: {
                    connection: {
                        jwt: "alcht_pCS3yiQOLFjkEaPx1kovImplHSce0t", // Remplacez par votre JWT réel
                    },
                    iframeConfig: {
                        iframeContainerId: "turnkey-iframe-container",
                    },
                },
            });
            setSigner(newSigner);
        }

        return () => {
            if (iframeContainerRef.current) {
                iframeContainerRef.current.innerHTML = "";
            }
        };
    }, []);

    useEffect(() => {
        if (!signer) return;

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("bundle")) {
            signer
                .authenticate({
                    type: "email",
                    bundle: urlParams.get("bundle"),
                })
                .then(() => navigate("/"))
                .catch((error) => {
                    console.error("Authentication error:", error);
                    setError(
                        "An error occurred during email authentication. Please try again."
                    );
                });
        }
    }, [signer, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!signer) return;

        setShowPopup(true);
        setIsAuthenticating(true);
        setError(null);
    };

    const handleAuthSuccess = (result) => {
        setUser(result);
        setIsAuthenticating(false);
    };

    const handleAuthError = (errorMessage) => {
        setError(errorMessage);
        setIsAuthenticating(false);
    };

    return (
        <main className="min-h-screen flex flex-col justify-center md:flex-row">
            <div className="w-full md:w-1/2 p-8 hidden md:flex items-center justify-center order-2 bg-pink-200 bg-one md:order-1">
                {/* ... (le contenu de cette section reste inchangé) ... */}
            </div>
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center order-1 md:order-2">
                <section className="max-w-md w-full">
                    <h2 className="text-3xl font-bold mb-6 text-[#47227f] font-orbitron">
                        Register
                    </h2>
                    {user ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                User Information
                            </h2>
                            <p className="mb-2">
                                <strong>Address:</strong> {user.address}
                            </p>
                            <p className="mb-2">
                                <strong>Email:</strong> {user.email}
                            </p>
                            <Button
                                className="w-full mt-4"
                                onClick={() => navigate("/dashboard")}
                            >
                                Go to Dashboard
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                label="Full Name"
                                onChange={(e) => setFullName(e.target.value)}
                                className="block mb-4"
                                name="fullName"
                                value={fullName}
                                required
                            />
                            <TextInput
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                className="block mb-4"
                                value={email}
                                required
                                type="email"
                            />
                            <div className="mb-4">
                                <label className="block mb-2">
                                    Authentication Method
                                </label>
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setAuthMethod("email")}
                                        className={`px-4 py-2 rounded ${
                                            authMethod === "email"
                                                ? "bg-[#47227f] text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        Email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAuthMethod("passkey")}
                                        className={`px-4 py-2 rounded ${
                                            authMethod === "passkey"
                                                ? "bg-[#47227f] text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        Passkey
                                    </button>
                                </div>
                            </div>
                            <label className="mb-3 block">
                                <input type="checkbox" required /> By checking
                                this box, you agree to our Terms and Conditions
                                and Privacy Policy.
                            </label>
                            {error && (
                                <div className="text-red-500 mb-4">{error}</div>
                            )}
                            <Button
                                className="w-full mb-3"
                                type="submit"
                                disabled={!signer}
                            >
                                {`Sign up with ${authMethod}`}
                            </Button>
                            <div>
                                If you already have an account,{" "}
                                <a className="text-purple-500" href="/login">
                                    click here
                                </a>{" "}
                                to login
                            </div>
                        </form>
                    )}
                </section>
            </div>
            <div
                id="turnkey-iframe-container"
                ref={iframeContainerRef}
                style={{ display: "none" }}
            />
            {showPopup && (
                <Popup
                    message={`Please check your email (${email}) for verification instructions.`}
                    onClose={() => setShowPopup(false)}
                />
            )}
            {isAuthenticating && (
                <BackgroundAuthProcess
                    signer={signer}
                    authMethod={authMethod}
                    email={email}
                    fullName={fullName}
                    onSuccess={handleAuthSuccess}
                    onError={handleAuthError}
                />
            )}
        </main>
    );
}
