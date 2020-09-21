import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-burger-fb977.firebaseio.com/'
});


export default instance;

