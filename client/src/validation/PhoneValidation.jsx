export const phoneValidator = phoneNumber => {
    if (!phoneNumber || phoneNumber.length <= 0) return "Phone number cannot be empty.";
    var phoneno = /^\d{10}$/;
    // var regex = /^[\+]?[0-9]$/im
    if(!phoneno.test(phoneNumber)) {
        return "Invalid Phone Number";
    } 
    
    return "";
   
}