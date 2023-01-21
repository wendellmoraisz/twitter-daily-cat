class MessageWriter {
  private static referenceDay: Date = new Date("03-05-2022");

  private static getDaysQuantity(): number {
    return Math.ceil(
      (Number(new Date()) - Number(this.referenceDay)) / (1000 * 60 * 60 * 24)
    );
  }

  public static getMessage(): string {
    return `Já são ${this.getDaysQuantity()}`;
  }
}

export default MessageWriter;
