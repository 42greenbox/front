import { ScanData, SupportedImageDataTypes } from "./Scanner";

export interface IScannerRepository {
  scanBarcode(imageData: SupportedImageDataTypes): Promise<ScanData>;
}
