import Report from '../models/report.js';

const create = async (name, email, subject, description) => {
    return await Report.create(
        { 
            name: name,
            email: email,
            subject: subject,
            description: description 
        });
}
const getById = async (id) => {
    return await Report.findById(id);
}
const deleteById = async (id) => {
    await Report.findByIdAndDelete(id);
}
const getAll = async () => {
    return await Report.find({});
}
const reportsService = {
    create,
    getById,
    deleteById,
    getAll,
}
export default reportsService;