import { Message } from "node-nats-streaming";

import {
  Subjects,
  Listener,
  OrderCancelledEvent,
  OrderStatus,
} from "@stagefirelabs/common";

import { Order } from "../../models/order.model";
import { queueGroupName } from "./constants";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { id, version } = data;
    const order = await Order.findOne({
      _id: id,
      version: version - 1,
    });
    if (!order) throw new Error("Order not found");
    order.set({ status: OrderStatus.CANCELLED });
    await order.save();
    msg.ack();
  }
}
