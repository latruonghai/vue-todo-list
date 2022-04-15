import _ from "lodash";

export function checkExistElement(elements: any, element: any) {
    return _.includes(elements, element);
}

export function numberOfExistElement(elements: any[], el: any){
    return _.filter(elements, (o) =>{
        return o === el;
    }).length;
}

export function numberOfExistObjectElement(elements: any[], el: any, properties: string ){
    return _.filter(elements, (o) =>{
        return o[properties] === el;
    }).length;
}