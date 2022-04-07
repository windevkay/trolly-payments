import { Message } from "node-nats-streaming";

import { Subjects, Listener, OrderCreatedEvent } from "@stagefirelabs/common";

import { Order } from "../../models/order.model";
import { queueGroupName } from "./constants";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, ticket, status, userId, version } = data;
    const order = Order.build({
      id,
      price: ticket.price,
      status,
      userId,
      version,
    });
    await order.save();
    msg.ack();
  }
}
