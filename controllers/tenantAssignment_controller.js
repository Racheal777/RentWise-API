import { Unit } from "../models/unit_models.js";
import { Tenant } from "../models/tenant_model.js";

export const assignUnit = async (req, res) => {
    try {
        const { unitId,  period } = req.body;
    
        const unit = await Unit.findById(unitId);
    
        // check unit validity
        if (!unit) {
           res.status(201).json({message: "Unit not found"});
            return;
        }
        
        // check unit status
        if (unit.status !== 'available') {
            res.status(201).json({message: "Unit currently unavailabe"});
            return;
        }
    
        // assign unit to tenant
        const date = new Date();
        console.log('date', date, date.toISOString())
        const startDate = `${date.toLocaleString('default', {month: 'long'})} ${date.getDay()}, ${date.getFullYear()}`
        const endDate = `${date.toLocaleString('default', {month: 'long'})} ${date.getDay()-1}, ${date.getFullYear() + parseInt(period)}`;
    
        const newTenant = await Tenant.create({
            tenantId: req.user.id,
            propertyId: unit.propertyId,
            unitId: unit.id,
            startDate: startDate,
            endDate: endDate,
            amount: unit.rentAmount * parseInt(period)
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
        

        const tenants = await Tenant.find();
        res.status(201).json({"Tenants": tenants});
    } catch (error) {
        res.status(401).json({error: error});
    }
}