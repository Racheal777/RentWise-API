import { Router } from 'express';
import { createProperty,getAllProperties,getPropertyById,patchProperty,deleteProperty } from '../controllers/property_controller.js';
import { authenticate } from '../middlewares/auth.js';

export const PropertyRouter = Router()

PropertyRouter.post('/', authenticate, createProperty); 
PropertyRouter.get('/', getAllProperties);       
PropertyRouter.get('/:id', getPropertyById);            
PropertyRouter.patch('/:id', patchProperty);             
PropertyRouter.delete('/:id', deleteProperty);          
