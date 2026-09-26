/* No Brand Baseball Analytics - analyst notes. Hand-written. Update the "through" date whenever games are added. */
window.NB_NOTES = {
  through: "2026-09-20",
  steady: [
    {h: "The chain fires in order, every game",
     p: "Pelvis, trunk, elbow, shoulder, hand. Same order in all seven games, and foot strike to release takes 133 to 137 ms every time. The timing of the delivery has never been the question."},
    {h: "The sweeper comes out of its own window",
     p: "Lowest arm slot of the five pitches in all seven games (2.2° to 3.3° under the next-lowest pitch), lowest release (1.1 to 1.8 in lower) and widest release (1.8 to 2.4 in wider). This is how he makes it sweep, and it is the same every night."},
    {h: "Four-seam carries the most elbow load",
     p: "Highest peak elbow varus torque of any pitch in all seven games (133.6 to 136.7 N·m). It has drifted down, not up: 9/20's 133.6 was the lowest four-seam of the seven."},
    {h: "Arm speed never moved",
     p: "Peak elbow extension 2,952 to 2,993°/s across the six Trop games, and peak shoulder rotation 5,475 to 5,616. Neither one dipped through the IL. Four-seam velocity has held between 95.0 and 96.3 all summer, and 9/20's 95.7 was his best start average since 7/17."}
  ],
  moved: [
    {h: "The pelvis is the fastest it has been",
     p: "Peak pelvis speed 607°/s on 9/20, above the 593 to 599 band from before the IL and the quickest of the seven games. All five pitch types beat their own pre-IL best (599 to 615, against 528 to 553 on 9/2). One caveat: it peaks a little later now, 18.8 ms after foot strike against 16.4 to 17.5 before the IL (21.1 on 9/2)."},
    {h: "The trunk came back up, which undoes the 9/15 read",
     p: "9/15 had the quietest trunk of the seven games. On 9/20 it was the busiest: peak trunk rotation acceleration 16,397°/s² against 15,023 to 16,152 in the other six, and 1,119°/s peak speed, the fastest of the six Trop games. The slow trunk on 9/15 was a one-game reading, not a new way of throwing."},
    {h: "Shoulder load at layback came back, and evened out",
     p: "Shoulder rotation torque at layback 73.6 N·m, back to the 7/11 level (73.8) after 50.8 on 9/2 and 61.5 on 9/15. The spread matters more than the average: all five pitch types sat between 72.3 and 77.7 N·m on 9/20, a 5 N·m range, against 20 on 9/15 (53.8 to 74.0). The changeup's 73.9 is the highest of the seven games."},
    {h: "The deep scap load from 9/15 did not stay",
     p: "Max horizontal abduction -42.4° on 9/20, the shallowest of the six Trop games, against -46.3° on 9/15. Every pitch type came back 2.8 to 4.9° shallower. Whatever he did to load that deep on 9/15, he did not repeat it."},
    {h: "Arm slot is at a seven-game high on every pitch",
     p: "37.2° overall, and all five pitch types set their highest slot of the seven games (four-seam 37.7, sinker 36.4, sweeper 33.9, changeup 40.2, curve 41.2). Shoulder plane efficiency followed: the last two starts, 42.2% and 42.4%, are the only two above 40.2%."},
    {h: "The shapes that flattened on 9/15 came back",
     p: "On 9/15 the sweeper lost most of its shape (-1.3 in of vertical break and 12.8 in of sweep, against -2.6/15.4 and -2.6/15.6 in the two starts before it) and the curve was the flattest of the season (-11.0 in). On 9/20 both were back: sweeper -2.9/14.9 at a season-high 3,099 rpm, curve -16.0. The four-seam's 19.0 in of ride was his best of the season. The one to watch is the sinker at 12.4 in of ride, its most since May - that pitch is supposed to be his drop."}
  ],
  watching: [
    {h: "Two scoreless starts, two different routes",
     p: "9/15 (5 IP, 0 R, 7 K) was the quietest trunk and the deepest scap load of the seven games. 9/20 (5 IP, 0 R, 5 K) was the fastest pelvis, the busiest trunk and the shallowest scap load. Same result, opposite mechanics. Whatever is driving the good starts, it is not the \"more lower half, less trunk\" pattern we flagged after 9/15 - that needs a third data point before it means anything."},
    {h: "Back hip drifted back toward neutral",
     p: "Back hip rotation at foot strike read -0.9° to -2.2° on all five pitch types on 9/15, a clean reversal of 9/2 (+1.4° to +3.2°). On 9/20 it sat between -2.4° and +1.2°, and the sweeper's +1.2° is the only value above anything he showed before the IL (-3.6° to +0.7°). Not the 9/2 reading, but not all the way back either. Worth a third look."},
    {h: "Higher slot, shorter extension",
     p: "Release extension 73.2 in on 9/20, the shortest of the seven games, on the same night the arm slot was the highest. The four-seam's 72.4 in is the shortest single reading in the file. Release height did not suffer (53.1 in, second-highest of the seven), so the trade is small - but the two are moving in opposite directions and that is worth tracking."},
    {h: "Hand speed has flattened, not recovered",
     p: "Peak hand speed 6,355°/s on 9/20 and 6,352 on 9/15 - two straight starts at the same number, still under 7/11's 6,449 and well under the April bullpen block's 6,602. Peak shoulder rotation torque has climbed in each of the last two starts (84.6 → 86.1 → 89.8) but is short of the 97 to 99 he ran in July."},
    {h: "Burying the changeup is what makes it miss",
     p: "The changeup comes out 1.7° to 2.5° higher than the four-seam in every captured game, so the slot isn't the variable. Height is: on 9/20 he buried 10 of 15 and got 4 swing-and-misses on 7 swings, on 9/15 9 of 15 and 7 on 9, on 9/2 5 of 11 and 2 on 9. One change to log - the release-side gap closed to 0.1 in on 9/20, after running 0.5 to 1.3 in tighter than the four-seam in the first six games. See the Analytics side for the full by-start picture."},
    {h: "Keep Fenway in its own lane",
     p: "7/17 was captured at Fenway. Several values sit well outside the six Trop games (pelvis open 20.8° at release against 10.2 to 14.0, arm abduction 95.2° at release against 86.6 to 91.8, trunk lean vs pelvis -3.4° at release against -19.7 to -27.6). Treat it as its own baseline, not a trend point."},
    {h: "Use the April bullpen block as a reference, not a trend point",
     p: "The 3/30 to 4/12 bullpen block (108 pitches) still has the fastest hand in the file (6,602°/s), a longer stride (92.8% of height against 90.8 to 91.6 in games) and more extension (75.4 in against 73.2 to 74.5 in the Trop games). Its pelvis no longer leads - 9/20 passed it, 607°/s to 605. Several values sit closer to the Fenway game than the Trop games, which points to a different capture setup. Good for the early-season picture; don't read it as a game."}
  ]
};
