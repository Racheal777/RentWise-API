
 
export const permission = {
    admin:[
        'signUp',
        'loginUser',
        'postUnit',
        'getUnit',
        'getUnitById',
        'getAllProperties',
        'getPropertyById',
        'createProperty',
        'patchProperty',
        'deleteProperty'
    ],
    tenant:[
        'signUp',
        'loginUser',
        'getUnit',
        'getUnitById',
        'getAllProperties',
        'getPropertyById'
    ]
};

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