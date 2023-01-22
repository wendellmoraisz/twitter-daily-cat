class PostMessageWriter {
  private static referenceDate = new Date("03-05-2022");

  public static getPostMessage() {
    return this.formatMessageToUrl(`${this.getDaysQuantity()} dias`);
  }

  private static formatMessageToUrl(message: string) {
    return message.replaceAll(" ", "%20");
  }

  private static getDaysQuantity() {
    return Math.ceil(
      (Number(new Date()) - Number(this.referenceDate)) / (1000 * 60 * 60 * 24)
    );
  }
}

export default PostMessageWriter;
