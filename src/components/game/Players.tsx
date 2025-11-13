import React from 'react';
import { motion } from 'framer-motion';

// type PlayersProps = {
//     players: {
//         player1: {
//             name: string;
//             progress: number;
//         };
//     };
//     player2: {
//         name: string;
//         progress: number;
//     };
// };

const Players = React.memo(() => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 w-full mb-10"
        >
            {/* Player 1 */}
            <div className="flex-1 bg-[#2c2e31] rounded-xl p-5 border-2 border-[#e2b714]">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[#d1d0c5] font-mono font-bold">나</span>
                    <span className="text-[#e2b714] font-mono font-bold">0 WPM</span>
                </div>
                <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#e2b714] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '45%' }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Player 2 */}
            <div className="flex-1 bg-[#2c2e31] rounded-xl p-5 border-2 border-[#646669]">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[#d1d0c5] font-mono font-bold">상대</span>
                    <span className="text-[#d1d0c5] font-mono font-bold">0 WPM</span>
                </div>
                <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#646669] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '30%' }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </motion.div>
    );
});
export default Players;
