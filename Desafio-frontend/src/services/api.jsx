import axios from "axios";

export default axios.create({
    baseURL: 'https://lazy-teal-caridea-sock.cyclic.app/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})