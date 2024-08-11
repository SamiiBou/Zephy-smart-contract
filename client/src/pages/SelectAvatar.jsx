import { useState, useMemo } from "react";
import * as avatars_ from "../assets/avatars";
import { randomizeAvatars } from "../utils";
import { useNavigate } from "react-router-dom";

export default function SelectAvatar() {
  const navigate = useNavigate();
  const avatars = useMemo(
    () => randomizeAvatars([...Object.values(avatars_)]).slice(0, 8),
    []
  );
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handleAvatarSelect = (avatar) => () => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectedAvatar(avatar);
      setFadeOut(false);
    }, 500); // Increased timeout for smoother transition
  };

  return (
    <div className="flex items-center bg-one justify-center min-h-screen">
      <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden flex flex-col min-h-[600px]  justify-center items-center">
        {selectedAvatar ? (
          <div className="flex flex-col items-center justify-center h-4/6">
            <img
              src={selectedAvatar}
              alt="Selected Avatar"
              className="h-48 w-48 rounded-full shadow-lg mb-6 transition-opacity duration-500 ease-in-out"
            />
            <button
              onClick={() => navigate("/dashboard")}
              className="px-36 py-2 bg-[#47227f] text-white font-bold rounded-lg "
            >
              Upload
            </button>
          </div>
        ) : (
          <>
            <p className="text-2xl font-bold text-[#47227f] font-orbitron text-center mb-8">
              Choose an avatar that best suits your personality
            </p>
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-opacity duration-500 ease-in-out ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              {avatars.map((avatar, index) => (
                <button key={index} onClick={handleAvatarSelect(avatar)}>
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="h-28 w-28 rounded-full shadow-lg bg-gray-200 cursor-pointer transition-opacity duration-500 ease-in-out"
                    style={{ opacity: fadeOut ? 0 : 1 }}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
