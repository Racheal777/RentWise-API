import { Unit } from "../models/unit_models.js";
import { User } from "../models/user_model.js";
import { Tenant } from "../models/tenant_model.js";

export const assignUnit = async (req, res) => {
    try {
        const { unitId, tenantId, period} = req.body;
    
        const unit = await Unit.findById(unitId);
        const tenant = await User.findById(tenantId);
    
        // check unit and tenant validity
        if (!unit || !tenant) {
            if (!unit) {
                res.status(201).json({message: "Unit not found"});
            } else {
                res.status(201).json({message: "Tenant not found"});
            }
            return;
        }
        
        // check unit status
        if (unit.status !== 'available') {
            res.status(201).json({message: "Unit currently unavailabe"});
            return;
        }
    
        // assign unit to tenant
        const date = new Date();
        const startDate = `${date.toLocaleString('default', {month: 'long'})} ${date.getDay()}, ${date.getFullYear()}`
        const endDate = `${date.toLocaleString('default', {month: 'long'})} ${date.getDay()-1}, ${date.getFullYear() + parseInt(period)}`;
    
        const newTenant = await Tenant.create({
            fullName: `${tenant.firstName} ${tenant.lastName}`,
            email: tenant.email,
            propertyId: unit.propertyId,
            unitNumber: unit.unitNumber,
            startDate: startDate,
            endDate: endDate
        })
    
        // update unit status
        await Unit.findByIdAndUpdate(unitId, {status: "occupied"});
    
        res.status(201).json({
            message: "Unit assigned successfully", 
            unitInfo: newTenant
        });
    } catch (error) {
        res.status(401).json({error: error});
    }

}


export const getTenants = async (req, res) => {
    try {
        const { role } = req.body;
    
        if (role !== 'admin') {
            return res.status(401).json({error: "unathorized access"});
        }
    
        const tenants = await Tenant.find();
        res.status(201).json({"Tenants": tenants});
    } catch (error) {
        res.status(401).json({error: error});
    }
}