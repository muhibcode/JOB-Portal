import axios from "axios";
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        try {
            const { data } = await axios.post(`${process.env.API_URL}/token/`,
                { username, password },
            )
            // console.log('login data is ', data);
            if (data.access) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access,
                        {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24 * 15,
                            sameSite: "lax",
                            path: '/'
                        })

                ])
                return res.json({
                    success: true
                })
            } else {
                res.json({
                    error: 'Authentication Failed'
                })
            }
        } catch (error) {
            res.status(error.response.status).json({
                error: error.response && error.response.data.error
            })
        }

    }
}