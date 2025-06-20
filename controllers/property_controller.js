import { Property } from "../models/properties_model.js"
import { propertiesSchema } from "../schemas/property_schema.js";


// this is to create properties in a database 
export const createProperty = async (req, res) => {

  console.log('uhuyftdtfdt')
  try {
    const {error, value} = propertiesSchema.validate(req.body)
  

    if(error){
      return res.status(400).json(error.details[0].message)
    }

    const image = req.file
    // let imagePath = ""

    // images.forEach(element => {
    //   return imagePath = element.path
    // });

    // console.log('file',images)
    
    // if (req.file) {
    //   req.body.image = req.file.path;
    // }
    const property = await Property.create({
      name: value.name,
      address: value.address,
      type: value.type,
      description: value.description,
      user: req.user.id,
      image: image.path
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error});
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
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true }.populate('user'));
    if (!property) return res.status(404).json({ message: 'Property cannot be found' });
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: 'server error' });
  }
};


// get property by a specific user
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ user: req.user.id }.populate('user'));
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

// to delete property only owned by a specific user 
export const deleteMyProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('user');
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