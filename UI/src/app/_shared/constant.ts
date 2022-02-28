export class Constants {

    // public static BASE_URL = 'http://10.25.1.69:86/api/';
    // public static BASE_URL = 'http://10.25.1.69:92/api/';
    public static BASE_URL = 'http://localhost:59751/api/';
    //public static BASE_URL = 'http://10.25.1.69:70/VAVEPortal_API/api/';
    // public static BASE_URL = ' http://localhost:55609/api/';

    public static toastrConfig: any = {
        positionClass: 'toast-top-center',
        closeButton: true,
        progressBar: true,
        timeOut: 2000
    };

    public static MaxLengthConstants = {
        Name: 25,
        CompanyName: 25,
        PropertyName: 25,
        Street: 25,
        City: 15,
        State: 15,
        Email: 50,
        Phone: 15,
        Zip: 10,
        Password: 15,
        OTP: 8,
        UserName: 20,
        Website: 100,
        Fax: 50
    };
    public static ReservationMaxLengthonstants = {
        Name: 25,
        Email: 50,
        ZipCode: 10,
        Mobile: 15,
        City: 50,
        Address: 100,
        ReservationNo: 15
    };
    public static USERNAME = /^\S*$/;
    public static DateFormat = 'MM/dd/yyyy';
    public static EMAIL_REGEXP = '^[a-z0-9!#$%&\'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$';
    public static NAME_REGEXP = '^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$';
    public static NUMBER_REGEXP = '^[a-zA-Z0-9]+$';
    public static ALPHANUMRIC_REGEXP = /^[A-Za-z\d\s]+$/;
    public static PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    public static PASSWORD_REGEXP = /^[a-zA-Z0-9!#$%&/\@=?^_`{|}~.]{6,20}$/;
    public static ZIP_REGEXP = '^[0-9]{5}(\-[0-9]{4})?$';
    public static FAX_REGEXP = '^(?=(?:\D*\d){10,12}\D*$)[0-9 \-()\\\/]{1,16}$';
    public static WEBSITE_REGEXP = '^([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$';

}
