import type { User } from '@pages/cycleParking/types';

const registeredUsersDB: User[] = [
    {
        id: 'USER-001',
        name: 'new Zoho employee praveen',
        email: 'Praveen@gmail.com',
        verified: true,
        vehicleRegistration: 'ABC-123',
        contactNumber: '111-222-3333',
    },
    {
        id: 'USER-002',
        name: 'New Zoho User',
        email: 'Praveen@gail.com',
        verified: false,
        vehicleRegistration: 'XYZ-789',
        contactNumber: '444-555-6666',
    },
];

export const addRegisteredUser = async (user: Omit<User, 'id' | 'verified'>): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newUser: User = {
                ...user,
                id: `USER-${Date.now()}`,
                verified: false, 
            };
            registeredUsersDB.push(newUser);
            console.log('User registered:', newUser);
            resolve(newUser);
        }, 500);
    });
};

export const fetchRegisteredUsers = async (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(registeredUsersDB);
        }, 500);
    });
};

export const verifyUser = async (email: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = registeredUsersDB.findIndex(user => user.email === email);
            if (userIndex > -1) {
                registeredUsersDB[userIndex].verified = true;
                console.log('User verified:', registeredUsersDB[userIndex]);
                resolve(true);
            } else {
                reject(new Error('User not found'));
            }
        }, 500);
    });
};

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = registeredUsersDB.find(user => user.email === email);
            resolve(user);
        }, 500);
    });
};