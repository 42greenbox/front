import { IScannerRepository } from "@/domain/IScannerRepository";
import { ScanData, SupportedImageDataTypes } from "@/domain/Scanner";

class ZxingScannerRepository implements IScannerRepository {
  private readonly zxing: any; //TODO: 실제로 필요한지 확인하고 쓰든 말든 하자. 아마 constructor에서 쓸 수 있게 initialize 하는 일을 하면 될듯
  constructor() {
    this.zxing = {};
  }

  public scanBarcode<T extends SupportedImageDataTypes>(
    imageData: T
  ): Promise<ScanData> {
    const data: ScanData = { result: "result" };
    return Promise.resolve(data);
  }
}

export default ZxingScannerRepository;
