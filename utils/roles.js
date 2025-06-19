
 
export const roles = [

   {
    role: "admin",
    permissions:[
        'postUnit',
        'getUnit',
        'getUnitById',
        'getMyProperties',
        'getPropertyById',
        'createProperty',
        'patchProperty',
        'deleteProperty',
        'viewTenants'
    ],
   },
   {

    role: "tenant",
    permissions:[
        'getUnit',
        'getUnitById',
        'getAllProperties',
        'getPropertyById'
    ]
   }
];

export function checkPermission (role, action){
    if (role === 'admin') {
        return permission.admin.includes(action);
    } else if (role === 'tenant') {
        return permission.tenant.includes(action);
    }
    return false;
}

// using the ternary operation
// export function checkPermission(role, action) {
//   return permission[role]?.includes(action) || false;
// }
