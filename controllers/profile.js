const { query } = require('../database/db.js');

const getProfile = async (request, reply) => {
    try {
        const profile = await query('SELECT * FROM profile');
        reply.send(profile);
    } catch (error) {
        console.log(error);
        return error;
    }
}

const createProfile = async (request, reply) => {
    try {
        const { name, email, password } = request.body;
        const profile = await query('INSERT INTO profile (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        reply.send(profile);
    } catch (error) {
        console.log(error);
        return error;
    }
}

const updateProfile = async (request, reply) => {
    try {
        const { name, email, password } = request.body;
        const profile = await query('UPDATE profile SET name = ?, email = ?, password = ?', [name, email, password]);
        reply.send(profile);
    } catch (error) {
        console.log(error);
        return error;
    }
}

const deleteProfile = async (request, reply) => {
    try {
        const { id } = request.body;
        const profile = await query('DELETE FROM profile WHERE id = ?', [id]);
        reply.send(profile);
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
}