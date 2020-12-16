export const getRankedModes = async (): Promise<Modes> => {
  let resp = await fetch("https://splatoon.ink/schedule2.json");
  let data = await resp.json();

  let currentRankedMode = {} as ModeDetail;
  let upcomingRankedModes = [] as ModeDetail[];

  // milliseconds -> seconds
  let now = Date.now() / 1000;

  data.modes.gachi.map((mode: ResultDetail) => {
    let { startTime, endTime } = mode;

    let isCurrentTimeSlot = startTime < now && endTime > now;
    let isUpcomingTimeSlot = startTime >= now;

    if (isCurrentTimeSlot) {
      currentRankedMode = {
        name: mode.rule.name,
        startTime,
        endTime,
      };
    } else if (isUpcomingTimeSlot) {
      upcomingRankedModes.push({
        name: mode.rule.name,
        startTime,
        endTime,
      });
    }
  });

  return { currentRankedMode, upcomingRankedModes };
};
