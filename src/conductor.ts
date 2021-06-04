import { BeatInterval, BeatIntervalUpdate } from ".";

export class Conductor {

	private _bpm: number = 120;

	private startMillis: bigint;

	private numberOfAcknowledgedTicks = BigInt(0);

	private tickLengthMillis: number;

	private intervalNumbers: Map<BeatInterval, bigint>;

	private timeSource: TimeSource;

	verbose = true;

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

	get bpm() {
		return this._bpm;
	}

	set bpm(value: number) {
		this._bpm = value;
		this.initTickLengthMillis();

		if (this.verbose) {
			console.log("Conductor: set bpm: " + this._bpm);
		}
	}

	start(): void {
		this.intervalNumbers = Object.assign(
			{},
			...Conductor.INTERVALS.map((interval) => ({ [interval]: 0 }))
		);
		this.startMillis = this.timeSource.currentMillis;
		this.initTickLengthMillis();
	}

	update(): Map<BeatInterval, BeatIntervalUpdate> {
		const nowMillis = this.timeSource.currentMillis;
		const numberOfTicks = BigInt(
			Number(nowMillis - this.startMillis) / this.tickLengthMillis
		);

		let changes: Map<BeatInterval, boolean>;

		if (numberOfTicks == this.numberOfAcknowledgedTicks) {
			changes = Object.assign(
				{},
				...Conductor.INTERVALS.map(
					(interval) => ({ [interval]: false })
				)
			);
		} else {
			this.numberOfAcknowledgedTicks = numberOfTicks

			const numberOfAcknowledgedTicks
				= Number(this.numberOfAcknowledgedTicks)

			const newIntervalNumbers = Object.assign(
				{},
				...Conductor.INTERVALS.map(
					(interval, numberOfTicks) => ({
						[interval]: (numberOfAcknowledgedTicks / numberOfTicks)
					})
				)
			);

			changes = newIntervalNumbers.map(
				(interval: BeatInterval, newTicks: number) => ({
					[interval]: (this.intervalNumbers[interval] != newTicks)
				})
			);

			this.intervalNumbers = newIntervalNumbers;
		}

		var updates = new Map<BeatInterval, BeatIntervalUpdate>();

		this.intervalNumbers.forEach(
			(numberOfIntervals, interval) => {
				const didChange = changes[interval];
				updates[interval] = {
					numberOfIntervals: numberOfIntervals,
					didChange: didChange
				};
			}
		);

		return updates;
	}

	private initTickLengthMillis() {
		this.tickLengthMillis = (Conductor.MILLIS_PER_MINUTE / this.bpm)
			/ BeatInterval.Whole;
	}

}
