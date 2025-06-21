import { Property } from '../models/properties_model.js';
import { Tenant } from '../models/tenant_model.js';
import { MaintenanceRequest } from '../models/maintenance_model.js';
import { Payment } from '../models/payment_model.js';

export const getDashboardSummary = async (req, res) => {
    try {
        // Fetch summary stats using Promise.all to run all queries at the same time
        const [totalProperties, totalTenants, openMaintenanceRequests, unpaidRentCount] = await Promise.all([
            Property.countDocuments(),
            Tenant.countDocuments(),
            MaintenanceRequest.countDocuments({ status: 'open' }),
            Payment.countDocuments({ status: 'unpaid' })
        ]);

        // Send the response in JSON format
        res.json({ totalProperties, totalTenants, openMaintenanceRequests, unpaidRentCount });
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};