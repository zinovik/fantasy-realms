export interface MainInterface {
  processMessage(message: string): Promise<void>;
}
