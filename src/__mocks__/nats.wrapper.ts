/**
 * This mock is used in place of imports to the actual nats wrapper
 * when running unit tests
 *
 * remember to add this to tbe top of the route handler test file or in jest setup
 * jest.mock(..path to actual wrapper)
 *
 * to assert that publish is being called in the route handlers
 * import the actual natsWrapper into the test file
 * expect(natsWrapper.client.publish).toHaveBeenCalled()
 */
export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation(() => {
      (subject: string, data: string, callback: () => void) => callback();
    }),
  },
};
