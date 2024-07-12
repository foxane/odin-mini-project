/**
 * Get shortest path to target position
 * @param {array} start Starting postition i.e [0,1]
 * @param {array} end Target position i.e [7,7]
 * @returns {string} Formatted string, human readable
 */
const knightMoves = (start, end) => {
    /**
     * Helper function, get valid pos and prevent out of bound
     * @param {array} start Start position
     * @returns {array} Array containing all possible move from stating position
     *                  with format of [[1,2],[3,1],[3,4]..]
     */

    const _getValidMoves = (start) => {
        const result = [];
        const moves = [
            [2, 1],
            [1, 2],
            [-1, 2],
            [-2, 1],
            [-2, -1],
            [-1, -2],
            [1, -2],
            [2, -1],
        ];

        for (const [mX, mY] of moves) {
            const x = start[0] + mX;
            const y = start[1] + mY;
            if (x >= 0 && y >= 0 && x < 8 && y < 8) {
                result.push([x, y]);
            }
        }

        return result;
    };

    const queue = [[start]];
    const visited = new Set();
    visited.add(start.toString());

    /**
     * Process current item in queue
     */
    while (queue.length > 0) {
        const path = queue.shift();

        /**
         * Process possible moves inside current item
         */
        const possibleMoves = _getValidMoves(path[path.length - 1]);
        for (const move of possibleMoves) {
            const newPath = [...path, move]; // Add current move to new path;

            // Compare current move
            if (move[0] === end[0] && move[1] === end[1]) {
                let str = `You made it in ${
                    newPath.length - 1
                } moves, Here's your path:`;
                newPath.forEach((e) => (str += `\n[${e}]`));

                return str;
            }

            // Checking path to avoid cycle
            if (!visited.has(newPath.toString())) {
                visited.add(newPath.toString());
                queue.push(newPath);
            }
        }
    }
};

console.log(knightMoves([0, 0], [0, 0]));
