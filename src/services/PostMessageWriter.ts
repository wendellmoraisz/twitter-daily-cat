class PostMessageWriter {
  private static referenceDate = new Date("03-05-2022");

  public static getPostMessage() {
    return `${this.getDaysQuantity()} dias`;
  }

  private static getDaysQuantity() {
    return Math.ceil(
      (Number(new Date()) - Number(this.referenceDate)) / (1000 * 60 * 60 * 24) - 1
    );
  }
}

export default PostMessageWriter;
