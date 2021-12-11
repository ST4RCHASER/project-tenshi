import { GameState, GameType } from ".";

export function addZeroToTime(time: number): string | number {
    return time < 10 ? '0' + time : time
}
export function getGameName(gameType: GameType): string {
    switch (gameType) {
        case GameType.BASKETBALL:
            return 'Basketball'
        default:
            return 'Unknown'
    }
}
export function getStateName(state: GameState): string {
    switch (state) {
        case GameState.NOT_START:
            return 'Not Start'
        case GameState.INGAME:
            return 'Ingame'
        case GameState.ENDED:
            return 'Ended'
        default:
            return 'Unknown'
    }
}
export function getBGStateColor(state: GameState): string {
    switch (state) {
        case GameState.NOT_START:
            return 'bg-yellow-400'
        case GameState.INGAME:
            return 'bg-green-400'
        case GameState.INGAME:
            return 'bg-red-400'
        default:
            return 'bg-blue-400'
    }
}