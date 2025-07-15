// db/schemas/PlayerInventory.js

const mongoose = require('mongoose');

const PlayerInventorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  scrap: {
    type: Number,
    default: 0,
  },
  consumableModules: [
    {
      moduleType: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model('PlayerInventory', PlayerInventorySchema);
