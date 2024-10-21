export class ContainerModule {
  protected static datasources() {}
  protected static services() {}
  protected static controllers() {}
  protected static others() {}

  public static export() {
    this.datasources();
    this.services();
    this.controllers();
    this.others();
  }
}
