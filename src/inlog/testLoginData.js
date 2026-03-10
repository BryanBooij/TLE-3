
export const testUsers = [
    {
        id: 1,
        username: "admin",
        password: "admin123"
    },
    {
        id: 2,
        username: "user",
        password: "user123"
    },
];

export const validateLogin = (username, password) => {
    return testUsers.find(u => u.username === username && u.password === password);
};
