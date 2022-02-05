import { GameState, GameType, Team } from "..";
export interface Score {
    id: string,
    gameType: GameType,
    name: string,
    stamp: Date | number,
    state: GameState,
    teams: Team[],
    timer: number,
    gameMeta?: any,
    timerState: number
}