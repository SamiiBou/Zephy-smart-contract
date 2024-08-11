import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlchemySigner } from "@alchemy/aa-alchemy";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";

export default function Register() {
    const router = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [signer, setSigner] = useState(null);
    const [authMethod, setAuthMethod] = useState("email");
    const [user, setUser] = useState(null);
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
                        jwt: "alcht_pCS3yiQOLFjkEaPx1kovImplHSce0t",
                    },
                    iframeConfig: {
                        iframeContainerId: "turnkey-iframe-container",
                    },
                },
            });
            setSigner(newSigner);
        }
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
                .then(() => router("/"))
                .catch((error) =>
                    console.error("Authentication error:", error)
                );
        }
    }, [signer, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signer) return;

        setIsLoading(true);
        try {
            if (authMethod === "email") {
                await signer.authenticate({
                    type: "email",
                    createNew: true,
                    email,
                });
                console.log("Authentication email sent");
            } else if (authMethod === "passkey") {
                const result = await signer.authenticate({
                    type: "passkey",
                    createNew: true,
                    username: email || "PASSKEY_USER",
                });
                setUser(result);
            }
        } catch (error) {
            console.error("Authentication error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify-center md:flex-row">
            <div className="w-full md:w-1/2 p-8 hidden md:flex items-center justify-center order-2 bg-pink-200 bg-one md:order-1">
                <section className="max-w-lg">
                    <h1 className="text-3xl font-bold font-orbitron text-white px-4 pt-12 mb-6">
                        Simplify Your Finances
                    </h1>
                    <p className="font-inter text-gray-500 text-sm sm:text-base md:text-lg px-4 mb-12">
                        Get more from your money. Create an account to
                        effortlessly send and receive payments and access
                        convenient loans.
                    </p>
                    <div className="relative w-full pt-8">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{
                                    transform: `translateX(-${
                                        activeCard * 100
                                    }%)`,
                                }}
                            >
                                {cards.map((card, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex-shrink-0 p-4"
                                    >
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-[#47227f]">
                                                {card.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            {cards.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                                        index === activeCard
                                            ? "bg-[#47227f]"
                                            : "bg-purple-300"
                                    }`}
                                    onClick={() => setActiveCard(index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center order-1 md:order-2">
                <section className="max-w-md w-full">
                    <h2 className="text-3xl font-bold mb-6 text-[#47227f] font-orbitron">
                        Register
                    </h2>
                    {user ? (
                        <div>
                            <h2>User Information</h2>
                            <p>Address: {user.address}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="authMethod"
                                    className="block mb-2"
                                >
                                    Authentication Method
                                </label>
                                <select
                                    id="authMethod"
                                    value={authMethod}
                                    onChange={(e) =>
                                        setAuthMethod(e.target.value)
                                    }
                                    disabled={isLoading}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="email">Email</option>
                                    <option value="passkey">Passkey</option>
                                </select>
                            </div>
                            <TextInput
                                label="Full Name"
                                onChange={(e) => setFullName(e.target.value)}
                                className="block mb-4"
                                name="fullName"
                                value={fullName}
                            />
                            <TextInput
                                label={
                                    authMethod === "email"
                                        ? "Email"
                                        : "Username for Passkey"
                                }
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                className="block mb-4"
                                value={email}
                            />
                            <label className="mb-3 block">
                                <input type="checkbox" /> By checking this box,
                                you agree to our Terms and Conditions and
                                Privacy Policy.
                            </label>
                            <Button
                                className="w-full mb-3"
                                type="submit"
                                disabled={isLoading || !signer}
                            >
                                {isLoading
                                    ? "Loading..."
                                    : `Sign up with ${authMethod}`}
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
        </main>
    );
}
