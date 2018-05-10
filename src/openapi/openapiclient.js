import OpenApiBody from './openapibody'

class OpenApiClient{
    
    constructor(host, customer, site, service){
        this.host = host;
        this.customer = customer;
        this.site = site;
        this.service = service;
        this.baseURL = this.host + '/openapi/' + this.customer + '/' + this.site + '/' + this.service;
    }

    getBaseUrl(){
        return (encodeURI(this.baseURL));
    }

    getUrl(entities = [], parameters = {}){
        console.log(entities, parameters);
        var url = this.baseURL;
        entities.forEach(entity => {
            url += '/' + entity;
        });
        var first = true;

        for(var key in parameters){
            if(first){
                url += '?';
                first = false;
            }   
            else{
                url += '&';
            }
            url += key+ '=' + parameters[key];
        }

        return(encodeURI(url));
    }

    verifyParamIsInteger(par, allowNull = false){
        console.log(par,allowNull,'asd');
        if(par === null || par === undefined){
            
           return (allowNull ? true : false);
        }
        if(Number.isInteger(parseInt(par))){
            console.log('in');
            return true;
        }
        else{
            return false;
        }
    }

    verifyParamIsString(par, allowNull){
        if(par === null || par === undefined){
           return (allowNull ? true : false);
        }
        if(typeof par === 'string'){
            return true;
        }
    }

    verifyBody(body, allowedMimeTypes = []){
        console.log(body.getMimeType(), allowedMimeTypes);
        var returnValue = false;
        allowedMimeTypes.forEach(element => {
            if(body.getMimeType() === element){
                returnValue = true;
            }
        });
        return returnValue;
    }

}

export default OpenApiClient;