import { Router } from 'express';
import { createProperty,getAllProperties,getPropertyById,patchProperty,deleteProperty, getMyProperties, deleteMyProperty } from '../controllers/property_controller.js';
import { authenticate } from '../middlewares/auth.js';
import { upload } from '../middlewares/image_upload.js';

export const PropertyRouter = Router()

PropertyRouter.post('/', authenticate, upload.single('image'), createProperty); 
PropertyRouter.get('/', getAllProperties); 
PropertyRouter.get('/my/properties', getMyProperties);      
PropertyRouter.get('/:id', getPropertyById);            
PropertyRouter.patch('/:id', patchProperty); 
PropertyRouter.delete('/:id', authenticate, deleteMyProperty);            
PropertyRouter.delete('/:id', deleteProperty);          
