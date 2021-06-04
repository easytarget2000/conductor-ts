export enum BeatInterval {
  Sixteenth = "1/16",
  Eigth = "1/8",
  Quarter = "1/4",
  Half = "1/2",
  Whole = "1",
  TwoWhole = "2",
  FourWhole = "4",
  EightWhole = "8",
  SixteenWhole = "16",
  ThirtyTwoWhole = "32",
}

function ticksForInterval(interval: BeatInterval): BigInt {
  switch (interval) {
    case BeatInterval.Sixteenth:
      return BigInt(1);
    case BeatInterval.Eigth:
      return BigInt(2);
    case BeatInterval.Quarter:
      return BigInt(4);
    case BeatInterval.Half:
      return BigInt(8);
    case BeatInterval.Whole:
      return BigInt(16);
    case BeatInterval.TwoWhole:
      return BigInt(32);
    case BeatInterval.FourWhole:
      return BigInt(64);
    case BeatInterval.EightWhole:
      return BigInt(128);
    case BeatInterval.SixteenWhole:
      return BigInt(256);
    case BeatInterval.ThirtyTwoWhole:
      return BigInt(512);
  }
}