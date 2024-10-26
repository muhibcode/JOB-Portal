import axios from "axios";
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'GET') {
        const cookies = cookie.parse(req.headers.cookie || '');
        const access = cookies.access || false;

        if (!access) {
            return res.json({
                error: 'Login first to load user'
            })
        }
        try {
            const { data, status } = await axios.get(`${process.env.API_URL}/me/`, {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            })

            if (data) {
                return res.status(status).json({
                    user: data
                })
            }
        } catch (error) {
            res.status(error.response.status).json({
                error: 'something went worng while retrieving user'
            })
        }

    }
}