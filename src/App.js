import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Header, MessageSection } from "./components/ui/index.jsx";
import { _messages } from "../src/assets/mock/mock.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordFields, setPasswordFields] = useState(['', '', '', '']); // Hook ที่เพิ่มมา

    const handleInputChange = (value, index) => {
        const newFields = [...passwordFields];
        if (value.length <= 1) {
            newFields[index] = value;
            setPasswordFields(newFields);

            // ย้ายไปช่องถัดไปถ้าใส่ตัวเลขแล้ว
            if (value && index < 3) {
                document.getElementById(`field-${index + 1}`).focus();
            }
        }
    };
    const handlePasswordSubmit = () => {
        const enteredPassword = passwordFields.join('');
        if (enteredPassword === '2212') {
            setIsAuthenticated(true);
        } else {
            alert('รหัสผ่านไม่ถูกต้อง');
        }
    };
    const messageRef = useRef(null);
    const isInViewMessageRef = useInView(messageRef, {
        triggerOnce: true,
        amount: 0.2,
    });

    const songs = [
        { title: "คณะขวัญใจ - น่ารักชุบแป้งทอด", src: process.env.PUBLIC_URL +"/music/song1.mp3", caption: "เค้าจีบเธอด้วยเพลงนี้ ยังจำได้ไหม" },
        { title: "โอปอ กิตฐิพงษ์ - ซึ่งแตกต่าง", src: process.env.PUBLIC_URL +"/music/song2.mp3", caption: "สมัยมีสาวเเอบชอบมาฟังเพลงตาม" },
    ];

    const [currentSong, setCurrentSong] = useState(songs[0]);
    const audioRef = useRef(null);

    const playSong = async (song) => {
        setCurrentSong(song);
        if (audioRef.current) {
            try {
                audioRef.current.pause(); // หยุดเพลงที่กำลังเล่นอยู่
                audioRef.current.src = song.src; // ตั้งค่าเพลงใหม่
                await audioRef.current.load(); // รอให้ไฟล์โหลดเสร็จ
                await audioRef.current.play(); // เริ่มเล่นเพลงใหม่
            } catch (error) {
                console.error("Error playing the audio:", error);
            }
        }
    };
    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-blue-300">
                <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                        🎉 Memory Zone
                    </h2>
                    <p className="mb-4 text-gray-600">
                        ใส่รหัสผ่าน 4 หลัก
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                        {passwordFields.map((value, index) => (
                            <input
                                key={index}
                                id={`field-${index}`}
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(e.target.value, index)}
                                maxLength="1"
                                className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>
                    <button
                        onClick={handlePasswordSubmit}
                        className="mt-4 w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        ยืนยัน
                    </button>
                </div>
            </div>
        );
    }
    
    

    return (
        <div>
            <div className="aura" />
            <div className="flex justify-center h-auto overflow-y-auto aura">
                <div className="flex flex-col items-center max-w-[350px] py-12 gap-16 relative">
                    <Header
                        content={{
                            title: "Happy Anniversary",
                            subtitle: "1460 Days",
                        }}
                    />

                    <div className="carousel-section w-full bg-white p-4 rounded-lg shadow-md mt-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">
                            📸 Memories
                        </h3>
                        <Swiper
                            navigation={true}
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/photo1.jpg"}
                                    alt="Memory 1"
                                    className="rounded-lg w-full"
                                />
                                <p className="text-center mt-2 text-gray-600">
                                    อันนี้ตอนอยู่มหาลัย ภาพนี้น่ารักดี บอกว่าจะไม่ดู สุดท้ายก็ดูจนงานจบ 5555
                                </p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/photo2.jpg"}
                                    alt="Memory 2"
                                    className="rounded-lg w-full"
                                />
                                <p className="text-center mt-2 text-gray-600">
                                    อันนี้ก็ช่วงเเรกตอนปฐมนิเทศ เป็นเฟรชชี่น้องใหม่
                                </p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/photo3.jpg"}
                                    alt="Memory 3"
                                    className="rounded-lg w-full"
                                />
                                <p className="text-center mt-2 text-gray-600">
                                    ตอนมาร์กหน้าด้วยกันครั้งเเรก น่ารักดีเลยใส่มา
                                </p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/photo4.jpg"}
                                    alt="Memory 4"
                                    className="rounded-lg w-full"
                                />
                                <p className="text-center mt-2 text-gray-600">
                                    ตอนไปเที่ยว ๆ ด้วยกัน อยู่ด้วยกันมานานเนอะ
                                </p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/photo5.jpg"}
                                    alt="Memory 5"
                                    className="rounded-lg w-full"
                                />
                                <p className="text-center mt-2 text-gray-600">
                                    เติบโตด้วยกันมาเรื่อย ๆ เลย ตั้งเเต่ปวช.ตอนนี้มหาลัย เค้ารักเธอจัง
                                </p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <video
                                    controls
                                    className="rounded-lg w-full"
                                    src={process.env.PUBLIC_URL + "/videos/video1.mp4"}
                                />
                                <p className="text-center mt-4 text-gray-600">
                                    อยู่กันเธอเค้ามีความสุขมากเลย ได้เที่ยว ๆ กินเบิ้มๆ
                                </p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <video
                                    controls
                                    className="rounded-lg w-full"
                                    src={process.env.PUBLIC_URL + "/videos/video2.mp4"}
                                />
                                <p className="text-center mt-4 text-gray-600">
                                    อยู่ด้วยกันเเบบนี้ไปนาน ๆ นะ รักนะคะ
                                </p>
                            </SwiperSlide>
                        </Swiper>
                    </div>

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
                        {currentSong.caption && (
                            <div className="mt-2 text-sm text-gray-500 italic">
                                {currentSong.caption}
                            </div>
                        )}
                    </div>
                    

                    <MessageSection
                        data={_messages}
                        ref={messageRef}
                        isInView={isInViewMessageRef}
                    />
                    
                </div>
            </div>
        </div>
    );
}

export default App;