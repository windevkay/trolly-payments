import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@stagefirelabs/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
