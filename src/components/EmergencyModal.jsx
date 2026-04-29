export default function EmergencyModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-white text-black p-6 rounded-lg text-center">
                <h2 className="text-lg font-bold mb-2">🚨 Emergency Activated</h2>
                <p className="mb-4">Help is on the way!</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}