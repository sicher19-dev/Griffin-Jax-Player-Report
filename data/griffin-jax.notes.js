/* No Brand Baseball Analytics - analyst notes. Hand-written. Update the "through" date whenever games are added. */
window.NB_NOTES = {
  through: "2026-10-07",
  steady: [
    {h: "The chain fires in order, every outing",
     p: "Pelvis, trunk, elbow, shoulder, hand. Same order in all nine captures and in the bullpen block. Foot strike to release takes 133 to 137 ms in the six captured at the Trop; the three road captures read 135, 139 and 138, which is the kind of gap the camera setup produces on its own."},
    {h: "The sweeper comes out of its own window",
     p: "Lowest arm slot, lowest release and widest release of his pitches in eight of the nine captures, 2.2° to 3.3° of slot under the next-lowest pitch. The one exception is the playoff game, where the single cutter came out lower and wider still - one pitch, so it proves nothing."},
    {h: "Four-seam and sinker carry the most elbow load",
     p: "One or the other is the top pitch for peak elbow varus torque in all nine captures. Within the six Trop games the four-seam ran 133.6 to 135.6 N·m and the whole-game average never left 127.8 to 132.1. Both road numbers from late September on are well above that - see \"The elbow number is still open\"."},
    {h: "Arm speed never moved",
     p: "Peak elbow extension 2,952 to 2,993°/s across the six Trop games, and peak shoulder rotation 5,475 to 5,616. Neither one dipped through the IL, and the playoff outing sits inside both bands (2,948 and 5,628). Whatever has changed, it is not how fast the arm works."},
    {h: "The changeup is still the out pitch",
     p: "He went to it 38% of the time against the Yankees, the heaviest changeup usage of any outing this year, all 12 to left-handed hitters, and buried 6 of them. 2 misses on 5 swings and .207 expected damage. It is the pitch he trusts when the game is biggest."}
  ],
  moved: [
    {h: "The velocity jumped in relief",
     p: "96.9 on the four-seam and 96.4 on the sinker out of the pen, against 95.0 to 95.7 and 94.6 to 95.2 in his last seven starts. The sinker was the hardest of his season, the four-seam his hardest since 5/26. Two innings of max effort does that - it is the expected shape of a relief move, not a new gear, and it is why this outing is fenced off from the start-to-start numbers everywhere on this page."},
    {h: "Best swing-and-miss outing of the year",
     p: "43.8% called-plus-missed, the highest of his 24 appearances, on a 45.5% miss rate per swing that only his 7/6 start has beaten (45.7%). 4 strikeouts in 8 hitters and .173 expected damage. The one run came on a walk and a single. Short outing, small sample, but nothing about the stuff was soft."},
    {h: "The cutter came back after 110 days",
     p: "One cutter to the Yankees, his first since 6/19 and the only one in 13 appearances. It came in at 89.9 mph against 91.7 to 93.4 for every cutter he threw in the spring. A single pitch tells you he has it available again and nothing more - treat the 89.9 as one look, not a reading."},
    {h: "The arm worked longer and harder in the pen",
     p: "Shoulder rotation torque at layback 83.4 N·m, the highest in the file (previous high 74.2). Peak hand speed 6,534°/s, his fastest in any game but Fenway and 236 above 9/26. Extension 76.3 in and stride 92.5% of height, both the longest of any capture including the April bullpen block. All of it points the same way: he let it eat for two innings."},
    {h: "The pelvis stays quick, but it fires later now",
     p: "Peak pelvis speed has sat at 607, 615 and 592°/s over the last three outings against 593 to 599 before the IL. The timing is the part that moved: foot strike to pelvis peak went 16.1 ms on 9/15, 18.8 on 9/20, 19.4 on 9/26 and 30.2 on 10/7, against 13.7 to 21.1 in everything before. Four outings, one direction."}
  ],
  watching: [
    {h: "The back hip keeps opening earlier",
     p: "Back hip rotation at foot strike: 0.1° on 9/20, 3.9° on 9/26, 5.2° on 10/7, against -2.3° to 3.2° across every prior capture. Hip-shoulder separation shrank with it - -65.9° and -65.1° in the last two, against -68.3° to -72.9° in everything before. This one is not a park artifact: Fenway reads the back hip at -2.2° and separation at -69.9°, both normal. Three outings in two parks moving the same direction, and it is the same value that jumped on 9/2, his worst start. This is the thing to look at first on the next capture."},
    {h: "The elbow number is still open",
     p: "Peak elbow varus torque read 138.0 N·m on 9/26 and 142.4 on 10/7, against 127.8 to 132.1 in all six Trop games. On 10/7 every pitch type was 137 or higher. I said in September this was probably the camera install and I am not able to say that any more: Fenway, the third road capture, read 131.9 - right in the normal band - so the road does not inflate this on its own. Velocity does not close the gap either; inside the Trop games it barely tracks varus at all (r +0.21). The playoff outing at least has max-effort relief velocity behind it. 9/26 does not, and that is the one that still does not add up. A Trop capture settles it, and this was his sixth outing back from an elbow IL, so it is worth getting."},
    {h: "Keep all three road captures in their own lane",
     p: "Fenway (7/17), Citizens Bank Park (9/26) and Yankee Stadium (10/7) are his only captures outside the Trop, and they sit outside his Trop range on 84, 78 and 81 of 126 metrics. 40 metrics are outside on all three, and 36 of those move the same direction, which is a camera-install signature rather than three unrelated games. Forearm pronation at release is the clearest tell: 78.2°, 69.5° and 78.9°, against 61.9 to 63.8 in all six Trop games. Treat each road capture as its own baseline."},
    {h: "The relief outing is not a start",
     p: "2.0 IP on 32 pitches with the velocity up more than a mph. Only 3 four-seams, 4 curveballs and 1 cutter were captured, so most of the per-pitch numbers from that night rest on a handful of pitches. It is kept out of every season total on the Analytics side and marked everywhere it appears. Compare it with his other relief work, not with his starts."},
    {h: "Burying the changeup is what makes it miss",
     p: "The changeup comes out 1.7° to 2.7° higher than the four-seam in every captured outing, so the slot isn't the variable. Height is: 6 of 12 buried on 10/7, 9 of 10 on 9/26, 10 of 15 on 9/20, 9 of 15 on 9/15, against 5 of 11 on 9/2. The 10/7 changeup also came in 1.6 mph harder and 2.4 in flatter than 9/20's, and still got misses - worth watching whether the harder version holds its shape over a longer outing."},
    {h: "Use the April bullpen block as a reference, not a trend point",
     p: "The 3/30 to 4/12 bullpen block (108 pitches) still has the fastest hand in the file (6,602°/s) and a long stride (92.8% of height against 90.0 to 92.5 in games). Its extension no longer leads - the playoff outing passed it, 76.3 in to 75.4 - and its pelvis no longer leads either. Several values sit closer to the road games than the Trop games, which points to a different capture setup. Good for the early-season picture; don't read it as a game."}
  ]
};
