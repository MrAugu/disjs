const Request = require("./Request");
const { FetchError } = require("./Errors");

class RequestManager {
  constructor (client, authorizationPrefix) {
    this.client = client;
    this.authorizationPrefix = authorizationPrefix;
    this.idle = true;
    this.queue = [];
  }

  push (request) {
    return new Promise((resolve, reject) => {
      this.queue({
        request,
        resolve,
        reject
      });
    });
  }

  queue(request) {
    if (!this.idle) {
      this.queue.push(request);
      return this.tick();
    } else {
      return this.handle(request);
    }
  }

  tick() {
    if (this.queue.length < 1) return Promise.resolve();
    return this.handle(this.queue.shift);
  }

  async handle (request) {

  }
}