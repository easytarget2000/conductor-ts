import { BeatInterval } from "./beat-interval";

export class Conductor {

	bpm: number = 150;

	private startMillis: number = this.nowMillis();

	private numberOfAcknowledgedTicks = 0;

	private tickLengthMillis: number;

	private static INTERVALS: [BeatInterval] = [
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
	]

	private static MILLIS_PER_MINUTE = 60_000;

	start(): void {
		this.intervalNumbers = Conductor.INTERVALS.map { it to 0 }.toMap();
		this.startMillis = this.nowMillis();
		this.initTickLengthMillis();
	}

	update(): Map<BeatInterval, number> {
		return new Map()
	}

	private nowMillis(): number {
		return Date.now();
	}

	private initTickLengthMillis() {
		this.tickLengthMillis = (Conductor.MILLIS_PER_MINUTE / this.bpm)
			/ BeatInterval.Whole;
	}

}
