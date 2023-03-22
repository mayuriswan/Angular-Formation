export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    address: string;
    account: Account;
    image: string;
    
    
    
}

interface Account {
    accountNumber: number;
    type: string;
    balance: number;
}