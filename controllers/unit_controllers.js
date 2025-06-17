import { Unit } from "../models/unit_models.js";

export const postUnit = async (req, res) => {
    try{
         const { propertyId, UnitNumber, rentAmount, Status } = req.body;
         const unit = await Unit.create({propertyId, UnitNumber, rentAmount, Status, tenantId:req.user.userId});
         res.status(201).json(unit);

    } catch(error) {
        res.status(500).json({error: error.message});
    }
   
};

export const getUnit = async(req, res) =>{
    try{
        const unit = await Unit.find();
    res.status(200).json(unit);

  } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await Unit.findById(id);

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
