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

    // State และ Ref สำหรับ Audio Player
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleAudio = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div>
            <div className="aura" />
            <div className="flex justify-center h-auto overflow-y-auto aura">
                <div className="flex flex-col items-center max-w-[350px] py-12 gap-16 relative ">
                    {/* Header */}
                    <Header
                        content={{
                            title: "Happy Anniversary",
                            subtitle: "1460 Days",
                        }}
                    />

                    {/* Album */}
                    <div className="w-[245px] h-[320px] rounded-lg shadow-lg mb-12">
                        <img
                            src={_albums}
                            alt={`image_${_albums}`}
                            onClick={() => openModal(_albums)}
                            loading="lazy"
                            className="border-none bg-[#a7e6f76b] rounded-lg cursor-pointer"
                        />
                    </div>

                    {/* Message Section */}
                    <MessageSection
                        data={_messages}
                        ref={messageRef}
                        isInView={isInViewMessageRef}
                    />

                    {/* Audio Player */}
                    <div className="mt-4 bg-white shadow-lg rounded-lg p-4 w-[300px] flex flex-col items-center text-center">
                        <h3 className="text-lg font-semibold text-pink-600">
                            เพลง: Your Special Song
                        </h3>
                        <audio ref={audioRef} src="/music/song.mp3" className="hidden" />
                        <button
                            onClick={toggleAudio}
                            className={`mt-4 px-6 py-2 rounded-full font-medium ${
                                isPlaying ? "bg-red-500 text-white" : "bg-green-500 text-white"
                            } hover:opacity-90`}
                        >
                            {isPlaying ? "Pause Music" : "Play Music"}
                        </button>
                    </div>

                    {/* Memory Zone */}
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

            {/* Modal */}
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
