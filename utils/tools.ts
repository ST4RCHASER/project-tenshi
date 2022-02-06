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
        case GameType.VOLLEYBALL:
            return 'วอลเลย์บอล'
        case GameType.PETANQUE:
            return 'เปตอง'
        case GameType.MUZZLE:
            return 'ตะกร้อ'
        case GameType.BADMINTON:
            return 'แบดมินตัน'
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
        case GameState.ENDED:
            return 'bg-red-400'
        default:
            return 'bg-blue-400'
    }
}
export function toHHMMSS(sec_num: number): string {
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
}