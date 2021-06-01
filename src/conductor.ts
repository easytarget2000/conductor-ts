import { BeatInterval } from ".";

export class Conductor {

	bpm: number = 150;

	private startMillis: bigint;

	private numberOfAcknowledgedTicks = BigInt(0);

	private tickLengthMillis: number;

	private intervalNumbers: [BeatInterval: bigint];

	private timeSource: TimeSource;

	private static INTERVALS: BeatInterval[] = [
		BeatInterval.Sixteenth,
		BeatInterval.Eigth,
		BeatInterval.Quarter,
		BeatInterval.Half,
		BeatInterval.Whole,
		BeatInterval.TwoWhole,
		BeatInterval.FourWhole,
		BeatInterval.EightWhole,
		BeatInterval.SixteenWhole,
		BeatInterval.ThirtyTwoWhole
	];

	private static MILLIS_PER_MINUTE = 60_000;

	constructor(timeSource: TimeSource = new SystemTimeSource) {
		this.timeSource = timeSource;
	}

	start(): void {
		this.intervalNumbers = Object.assign(
			{},
			...Conductor.INTERVALS.map((x) => ({[x]: 0}))
			);
		this.startMillis = this.timeSource.currentMillis();
		this.initTickLengthMillis();
	}

	update(): Map<BeatInterval, bigint> {
		return new Map();
	}

	private initTickLengthMillis() {
		this.tickLengthMillis = (Conductor.MILLIS_PER_MINUTE / this.bpm)
			/ BeatInterval.Whole;
	}

}
