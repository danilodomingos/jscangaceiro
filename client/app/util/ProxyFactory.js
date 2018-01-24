class ProxyFactory{
    
    static create(objeto, props, aramadilha){
        
        return new Proxy(objeto, {
            get(target, prop, receiver){
                if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)){
                    return function(){
                        target[prop].apply(target, arguments);   
                        aramadilha(target);
                    }
                }else
                    return target[prop];
            },

            set(target, prop, value, receiver){
                
                const updated = Reflect.set(target, prop, value);
                if(props.includes(prop)) aramadilha(target);
                    return updated;
            }
        });
    }

    static _ehFuncao(fn){
        return typeof(fn) == typeof(Function);
    }
}