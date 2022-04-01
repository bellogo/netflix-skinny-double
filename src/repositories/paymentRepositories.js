import { BaseRepository } from "./BaseRepository";
import PaymentModel from "../models/payment";

class PaymentRepository extends BaseRepository {
  constructor() {
    super();
    this.model = PaymentModel;
  }
}

export default PaymentRepository;
