class SystemTimeSource implements TimeSource {

    currentMillis(): bigint {
        return BigInt(Date.now);
    }

}