import { useState } from 'react';
import avatar1 from '../assets/avataaars1.svg';
import avatar2 from '../assets/avataaars2.svg';
import avatar3 from '../assets/avataaars3.svg';
import avatar4 from '../assets/avataaars4.svg';
import avatar5 from '../assets/avataaars5.svg';
import avatar6 from '../assets/avataaars6.svg';
import avatar7 from '../assets/avataaars7.svg';
import avatar8 from '../assets/avataaars8.svg';
import avatar9 from '../assets/avataaars9.svg';
import avatar10 from '../assets/avataaars10.svg';
import avatar11 from '../assets/avataaars11.svg';
import avatar12 from '../assets/avataaars12.svg';
import avatar13 from '../assets/avataaars13.svg';
import avatar14 from '../assets/avataaars14.svg';
import avatar15 from '../assets/avataaars15.svg';
import avatar16 from '../assets/avataaars16.svg';
import avatar17 from '../assets/avataaars17.svg';
import avatar18 from '../assets/avataaars18.svg';
import avatar20 from '../assets/avataaars20.svg';

export default function SelectAvatar() {
    const avatars = [
      avatar1, avatar2, avatar3, avatar4, avatar5,
      avatar6, avatar7, avatar8, avatar9, avatar10,
      avatar11, avatar12, avatar13, avatar14, avatar15,
      avatar16, avatar17, avatar18, avatar20
    ];
  
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [fadeOut, setFadeOut] = useState(false);
  
    function randomizeAvatars(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function handleAvatarSelect(avatar) {
      setFadeOut(true);
      setTimeout(() => {
        setSelectedAvatar(avatar);
        setFadeOut(false);
      }, 500); // Increased timeout for smoother transition
    }
  
    function generateAvatars() {
      const shuffledAvatars = randomizeAvatars([...avatars]).slice(0, 8);
      return shuffledAvatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          className="h-28 w-28 rounded-full shadow-lg bg-gray-200 cursor-pointer transition-opacity duration-500 ease-in-out"
          onClick={() => handleAvatarSelect(avatar)}
          style={{ opacity: fadeOut ? 0 : 1 }}
        />
      ));
    }
  
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[600px] pt-20 justify-center items-center">
          {selectedAvatar ? (
            <div className="flex flex-col items-center justify-center h-4/6">
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                className="h-48 w-48 rounded-full shadow-lg mb-6 transition-opacity duration-500 ease-in-out"
              />
              <button className="px-36 py-2 bg-[#47227f] text-white font-bold rounded-lg " onClick={{}}>
                Upload
              </button>
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-[#47227f] font-orbitron text-center mb-8">
                Choose an avatar that best suits your personality
              </p>
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                {generateAvatars()}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }