import { Property } from "../models/properties_model.js"


// this is to create properties in a database 
export const createProperty = async (req, res) => {
  try {
    const {name, address, type, description, image} = req.body
    console.log(req.user)
    
    if (req.file?.path) {
      req.body.image = req.file.path;
    }
    const property = await Property.create({name,address,type,description,image:req.body,image,user:req.user.userId});
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: 'ensure all inputs field are populated or entered' });
  }
};

// this is to get all listed properties from the database
export const getAllProperties = async (req, res) => {
    try{
        res.status(200).json( await Property.find().populate('user'));
    } catch (error){
        res.status(500).json({error: 'server error'});
    }

};
// this to get one particular property
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('user');
    if (!property) return res.status(404).json({ message: 'this property is not listed' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
};

// this is to update the details of a property 
export const patchProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).json({ message: 'Property cannot be found' });
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: 'server error' });
  }
};

// this to delete a property 
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server error'});
  }
};

// get property by a specific user
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ user: req.user.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

// to delete property only owned by a specific user 
export const deleteMyProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // to ensure the user owns the property before deletion
    if (property.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to delete this property. this property does not belong to you!!' });
    }

    await property.remove();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};