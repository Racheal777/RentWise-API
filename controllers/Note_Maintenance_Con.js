import { Maintenance } from "../models/Maintenance_model";

// Controller function to notify tenants about maintenance
const notifyMaintenance = async (req, res) => {
  try {
     
    const tenants = await Maintenance.find();

    tenants.forEach(tenant => {
      console.log(`[Maintenance Notice] Hello ${tenant.name}, please be informed that scheduled maintenance will occur for unit ${tenant.unit}. Kindly prepare accordingly.`);
    });

    res.json({ message: 'Maintenance notifications sent successfully.' });
  } catch (error) {
    console.error('Error sending maintenance notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default notifyMaintenance;