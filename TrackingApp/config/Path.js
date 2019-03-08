export default class path {
    static BASE_URL = 'localhost:3001';
  
    static SIGNUP = path.BASE_URL + '/signup';

    static LOGIN = path.BASE_URL + '/signin';
    
    static GET_ALL_CIRCLES = path.BASE_URL + '/user/circle/getall';
    
    static CREATE_CIRCLE = path.BASE_URL + '/user/circle/create';
    
    static INVITE_USER = path.BASE_URL + '/user/invite/send';
    
    static JOIN_CIRCLE = path.BASE_URL + '/user/circle/join';

    static UPDATE_LOCATION = path.BASE_URL + '/user/location/update';

  }