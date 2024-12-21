import { forwardRef } from "react";
import { motion } from "framer-motion";

const MessageSection = forwardRef(({ isInView, data }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 1,transform: "translateY(20px)", scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.2 }}
        className="bg-white shadow-sm rounded-lg p-2"
    >
        {Array.isArray(data) ? (
            <ul>
                {data.map((message, index) => (
                    <li key={index} className="text-lg p-2 text-start">
                        {message}
                    </li>
                ))}
            </ul>
        ) : null}
    </motion.div>
));

export default MessageSection;
