import { GameType } from ".";

export function addZeroToTime(time: number): string | number {
    return time < 10 ? '0' + time : time
}
export function getGameName(gameType: GameType): string {
    console.log(gameType)
    switch (gameType) {
        case GameType.BASKETBALL:
            return 'Basketball'
        default: 
            return 'Unknown'
    }
}