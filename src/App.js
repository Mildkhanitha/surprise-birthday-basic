import { _birthdayMessages, _messages } from "../src/assets/mock/mock";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { _albums } from "./assets/mock/mock";
import { useModal } from "./hooks/useModal";
import { Header, MessageSection } from "./components/ui";
import { MemoryZone } from "./components/common";

function App() {
    const { isModalVisible, currentImage, openModal, closeModal } = useModal();

    const messageRef = useRef(null);
    const memoryZoneRef = useRef(null);

    const isInViewMessageRef = useInView(messageRef, {
        once: true,
        amount: 0.2,
    });
    const isInViewMemoryZoneRef = useInView(memoryZoneRef, {
        once: true,
        amount: 0.2,
    });

    // เพลงทั้งหมดในระบบ
    const songs = [
        { title: "คณะขวัญใจ - น่ารักชุบแป้งทอด", src: "/music/song1.mp3" },
        { title: "Song 2", src: "/music/song2.mp3" },
        { title: "Song 3", src: "/music/song3.mp3" },
    ];

    // State สำหรับเพลงที่กำลังเล่น
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const audioRef = useRef(null);

    // ฟังก์ชันเล่นเพลง
    const playSong = (song) => {
        setCurrentSong(song);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            audioRef.current.play();
        }
    };

    return (
        <div>
            <div className="aura" />
            <div className="flex justify-center h-auto overflow-y-auto aura">
                <div className="flex flex-col items-center max-w-[350px] py-12 gap-16 relative ">
                    <Header
                        content={{
                            title: "Happy Anniversary",
                            subtitle: "1460 Days",
                        }}
                    />
                    <div className="w-[245px] h-[320px] rounded-lg shadow-lg mb-12">
                        <img
                            src={_albums}
                            alt={`image_${_albums}`}
                            onClick={() => openModal(_albums)}
                            loading="lazy"
                            className="border-none bg-[#a7e6f76b] rounded-lg cursor-pointer"
                        />
                    </div>

                    {/* ส่วนจัดการเพลง */}
                    <div className="music-section w-full flex flex-col items-center gap-4 mt-6 bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-700">
                            🎵 Select Your Song
                        </h3>
                        <ul className="w-full">
                            {songs.map((song, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer p-2 text-gray-800 hover:bg-gray-200 rounded-md"
                                    onClick={() => playSong(song)}
                                >
                                    {song.title}
                                </li>
                            ))}
                        </ul>
                        <audio
                            ref={audioRef}
                            src={currentSong.src}
                            controls
                            className="w-full mt-4"
                        />
                    </div>

                    <MessageSection
                        data={_messages}
                        ref={messageRef}
                        isInView={isInViewMessageRef}
                    />
                    <MemoryZone
                        ref={memoryZoneRef}
                        isInView={isInViewMemoryZoneRef}
                        data={_birthdayMessages}
                    />
                    <div className={`pb-20 font-bold text-[#f78da4] text-3xl`}>
                        Captions 💕
                    </div>
                </div>
            </div>

            {isModalVisible && (
                <div className="modal show" onClick={closeModal}>
                    <div className="modal-content">
                        {currentImage && (
                            <img
                                src={currentImage}
                                alt="Preview"
                                className="modal-image"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
