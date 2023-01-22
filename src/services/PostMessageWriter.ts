class PostMessageWriter {
  private static referenceDate: Date = new Date("03-05-2022");

  public static getPostMessage(): string {
    return this.formatMessageToUrl(`${this.getDaysQuantity()} dias`);
  }

  private static formatMessageToUrl(message: string): string {
    return message.replaceAll(" ", "%20");
  }

  private static getDaysQuantity(): number {
    return Math.ceil(
      (Number(new Date()) - Number(this.referenceDate)) / (1000 * 60 * 60 * 24)
    );
  }
}

export default PostMessageWriter;
