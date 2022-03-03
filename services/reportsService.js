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

const reportsService = {
    create
}
export default reportsService;