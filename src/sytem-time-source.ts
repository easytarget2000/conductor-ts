class SystemTimeSource implements TimeSource {

    get currentMillis(): bigint {
        return BigInt(Date.now);
    }

}