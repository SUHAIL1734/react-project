import { useState } from "react";

export default function SOSButton({ onActivate }) {
    const [holding, setHolding] = useState(false);

    let timer;

    const handleMouseDown = () => {
        setHolding(true);
        timer = setTimeout(() => {
            onActivate();
        }, 2000);
    };

    const handleMouseUp = () => {
        setHolding(false);
        clearTimeout(timer);
    };

    return (
        <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
        >
            SOS
        </button>
    );
}