export interface IUser {
    userId?: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    passwordHash: string
}