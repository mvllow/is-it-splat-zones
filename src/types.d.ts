interface Results {
  modes: {
    gachi: ResultDetail[];
  };
}
interface ResultDetail {
  startTime: number;
  endTime: number;
  rule: { name: string };
}
interface Modes {
  currentRankedMode: ModeDetail;
  upcomingRankedModes: ModeDetail[];
}
interface ModeDetail {
  name: string;
  startTime: number;
  endTime: number;
}
