// models/Inventory.js
import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  GroupName: String,
  CompanyName: String,
  ProjectName: String,
  CapacityMW: Number,
  DeviceID: String,
  CoD: String,
  DeviceType: String,
  Registered: String,
});

const Inventory = mongoose.model('Inventory', InventorySchema);

export default Inventory;
