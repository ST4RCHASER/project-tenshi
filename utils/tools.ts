import { GameState, GameType } from ".";

export function addZeroToTime(time: number): string | number {
    return time < 10 ? '0' + time : time
}
export function getGameName(gameType: GameType): string {
    switch (gameType) {
        case GameType.BASKETBALL:
            return 'บาสเกตบอล'
        case GameType.FOOTBALL:
            return 'ฟุตบอล'
        default:
            return 'ไม่ทราบ'
    }
}
export function getStateName(state: GameState): string {
    switch (state) {
        case GameState.NOT_START:
            return 'ยังไม่เริ่ม'
        case GameState.INGAME:
            return 'กำลังเล่น'
        case GameState.ENDED:
            return 'จบแล้ว'
        default:
            return 'ไม่ทราบ'
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