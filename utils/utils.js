export const getRandomUsername = (usernames) => {
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
};
