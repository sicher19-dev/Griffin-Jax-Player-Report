/* No Brand Baseball Analytics - analyst notes. Hand-written. Update the "through" date whenever games are added. */
window.NB_NOTES = {
  through: "2026-09-02",
  steady: [
    {h: "The chain fires in order, every game",
     p: "Pelvis, trunk, elbow, shoulder, hand. Same order in all five games, and foot strike to release takes 133 to 137 ms each time. The timing of the delivery is not the question."},
    {h: "Trunk and elbow speed held through the IL",
     p: "Peak trunk speed 1,097°/s on 9/2 against 1,080, 1,086 and 1,101 in the three Trop games before. Elbow extension 2,974 against 2,952 to 2,957. Four-seam 95.0 and sinker 95.0 on 9/2, in line with 7/28 and 8/2."},
    {h: "The sweeper comes out of its own window",
     p: "Lowest arm slot of the five pitches in all five games (2.2° to 3.3° under the next-lowest pitch), lowest release (1.2 to 1.8 in lower) and widest release (1.9 to 2.4 in wider). This is how he makes it sweep, and it is the same every night."},
    {h: "Four-seam carries the most elbow load",
     p: "Highest peak elbow varus torque of any pitch in all five games (134.3 to 136.7 N·m)."}
  ],
  moved: [
    {h: "Pelvis slower and later off the IL",
     p: "Peak pelvis speed 540°/s on 9/2 against 593, 593 and 599 in the three Trop games before, and every one of the five pitch types was lower (528 to 553, against 587 to 609). It also peaked later after foot strike: 21 ms against 16, 16 and 17."},
    {h: "Back hip turned the other way at foot strike",
     p: "Back hip rotation at foot strike read +1.4° to +3.2° on all five pitch types on 9/2. In the four games before, 19 of 20 pitch-type readings were negative (-0.3° to -3.6°; the lone exception was the 7/11 sweeper at +0.7°). Pelvis was also less open at release (10.2° against 12.5 to 14.0). The only other capture where it read positive was the April bullpen block (+2.3°, four of five pitch types)."},
    {h: "More trunk doing the work",
     p: "About 4° more hip-shoulder separation at foot strike (-72.9° against -68.7 to -69.1; every 9/2 pitch type past -71.9°, every earlier one inside -70.7°), more forward tilt at release (-47.4° against -43.1 to -43.4), more glove-side lean at layback (-35.9° against -31.4 to -33.1), and about 2° more layback (192.2°)."},
    {h: "Changeup elbow load jumped",
     p: "The changeup read 132.8 N·m peak elbow varus on 9/2, the highest changeup of the five games (125.0 to 128.2 before). Overall elbow load per pitch was 132.1, close to 7/11 (131.4) and above 7/28 and 8/2 (128.5, 128.8). Shoulder rotation torque at layback went the other way (50.8 against 68.3 to 73.8) while shoulder force at layback rose (670 N against 569 to 621)."}
  ],
  watching: [
    {h: "Hand speed was sliding before the IL",
     p: "Across the four Trop games, peak hand speed went 6,449 → 6,380 → 6,328 → 6,222°/s, and four-seam velocity went 96.1 → 95.3 → 95.1 → 95.0. Peak shoulder torque followed the same path (98.9 → 97.8 → 90.3 → 84.6). The 9/2 drop isn't only a return-from-IL story; the direction started in July."},
    {h: "Does the pelvis come back?",
     p: "9/2 is one game and 63 pitches. If pelvis speed and the back-hip position stay where they were on 9/2, the trunk and arm are covering for the lower half. The next captured game answers it."},
    {h: "Changeup slot and load",
     p: "The changeup comes out 1.7° to 2.4° higher and 0.5 to 1.3 in tighter than the four-seam in every game. On 9/2 it also carried fastball-level elbow load. Worth reading next to the changeup height and side-to-side run in the Analytics tab."},
    {h: "Use the April bullpen block as a reference, not a trend point",
     p: "The 3/30 to 4/12 bullpen block (108 pitches) has the fastest hand (6,602°/s) and pelvis (605°/s) numbers in the file, a longer stride (92.9% of height against 90.8 to 91.6 in games) and more extension (75.4 in against 73.4 to 74.5). Several values sit closer to the Fenway game than the Trop games (35 ms pelvis-to-trunk gap, 93° arm abduction at release), which points to a different capture setup. Good for the early-season picture; don't read it as a game."},
    {h: "Keep Fenway in its own lane",
     p: "7/17 was captured at Fenway. Several values sit well outside the four Trop games (pelvis open 20.8° at release against 10.2 to 14.0, arm abduction 95° at release against 87 to 90, trunk lean vs pelvis -3° against -20° to -28°). Treat it as its own baseline, not a trend point."}
  ]
};
