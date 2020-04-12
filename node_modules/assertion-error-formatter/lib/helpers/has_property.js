"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = hasProperty;function hasProperty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return true;
    }
  }
  return false;
}