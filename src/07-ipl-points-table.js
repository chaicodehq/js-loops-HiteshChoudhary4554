/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  let teams = {};

  for (const object of matches) {
    if (!teams.hasOwnProperty(object.team1)) {
      teams[object.team1] = {
        team: "",
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    if (!teams.hasOwnProperty(object.team2)) {
      teams[object.team2] = {
        team: "",
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
  }

  for (const object of matches) {
    if (object.result === "win") {
      let findTeam =
        object.winner === object.team1 ? object.team1 : object.team2;
      const winTeam = teams[findTeam];
      winTeam.team = findTeam;
      winTeam.played += 1;
      winTeam.won += 1;
      winTeam.points += 2;

      let searchTeam =
        object.winner === object.team1 ? object.team2 : object.team1;
      const lostTeam = teams[searchTeam];
      ((lostTeam.team = searchTeam), (lostTeam.played += 1));
      lostTeam.lost += 1;
    } else if (object.result === "tie") {
      let findTeam = object.team2;
      const team1 = teams[findTeam];
      team1.team = findTeam;
      team1.played += 1;
      team1.points += 1;
      team1.tied += 1;

      let searchTeam = object.team1;
      const team2 = teams[searchTeam];
      team2.team = searchTeam;
      team2.played += 1;
      team2.points += 1;
      team2.tied += 1;
      
    } else if (object.result === "no_result") {
      let findTeam = object.team1;
      const team1 = teams[findTeam];
      team1.team = findTeam;
      team1.played += 1;
      team1.points += 1;
      team1.noResult += 1;

      let searchTeam = object.team2;
      const team2 = teams[searchTeam];
      team2.team = searchTeam;
      team2.played += 1;
      team2.points += 1;
      team2.noResult += 1;
    }
  }

  const matchRecord = [];
  for (const element of Object.keys(teams)) {
    matchRecord.push(teams[element]);
  }

  return matchRecord.sort((a,b)=> {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    else{
      return a.team.localeCompare(b.team);
    }
  });
}
