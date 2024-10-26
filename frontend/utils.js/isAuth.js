import axios from "axios";

export default async function isAuth(token) {
    try {
        const res = await axios.post(`${process.env.API_URL}/token/verify/`, {
            token: token
        });

        // console.log(token);
        if (res.status == 200) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
        // res.json({
        //     error: error.response && error.response.data.error
        // })
    }

};